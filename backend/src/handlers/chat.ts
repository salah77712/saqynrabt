import { neon } from '@neondatabase/serverless';
import type { RequestWithContext, Env } from '../utils';
import { corsHeaders, initRedis, checkRateLimit, checkUsageLimit, logAudit, generateEmbedding, chunkText } from '../utils';
import { runInputGuardrails } from '../guardrails';
import { rerankWithCrossEncoder } from '../rerank';
import type { ChunkResult } from '../rerank';

export async function handleChat(request: RequestWithContext): Promise<Response> {
  const headers = corsHeaders(request, request.env);
  headers['Content-Type'] = 'application/json';
  const env = request.env;
  const jwt = request.jwt;
  if (!jwt) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers });
  }
  const company_id = jwt.company_id;
  const userId = jwt.sub;
  const ip = request.headers.get('CF-Connecting-IP') || request.headers.get('x-forwarded-for');
  const ua = request.headers.get('User-Agent') || '';

  const sql = neon(env.DATABASE_URL);

  if (env.REDIS_URL) {
    const redis = initRedis(env);
    const rl = await checkRateLimit(redis, company_id!);
    if (!rl.allowed) {
      return new Response(JSON.stringify({ error: 'Rate limit exceeded. Try again soon.' }), {
        status: 429, headers: { ...headers, 'Retry-After': String(rl.retryAfter) },
      });
    }
  }

  const usageCheck = await checkUsageLimit(sql, company_id!, 'questions');
  if (usageCheck.limitReached) {
    return new Response(JSON.stringify({ error: 'Question limit reached', usage: { current: usageCheck.current, limit: usageCheck.limit } }), { status: 403, headers });
  }

  try {
    const body: any = await request.json();
    const message = body.message || '';
    if (!message.trim()) {
      return new Response(JSON.stringify({ error: 'Message is required' }), { status: 400, headers });
    }

    // Run security guardrails
    const guardrailConfig = {
      pii_redaction_enabled: true,
      jailbreak_detection_enabled: true,
      toxicity_filter_enabled: true,
    };
    const guardrailResult = await runInputGuardrails(message, guardrailConfig, env.OPENAI_API_KEY);
    if (!guardrailResult.passed) {
      await logAudit(env, company_id!, userId, 'guardrail_blocked', { reason: guardrailResult.reason, message_length: message.length }, ip, ua);
      return new Response(JSON.stringify({ error: 'Message blocked by security filters.', reason: guardrailResult.reason }), { status: 403, headers });
    }
    const safeMessage = guardrailResult.cleanQuery;

  let retrievedContext = '';
  if (env.OPENAI_API_KEY) {
    try {
      const queryEmb = await generateEmbedding(safeMessage, env.OPENAI_API_KEY);
      const pineconeHost = env.PINECONE_INDEX_HOST || 'saqyn-index';
      const pineconeRes = await fetch(`${pineconeHost}/query`, {
        method: 'POST',
        headers: { 'Api-Key': env.PINECONE_API_KEY, 'Content-Type': 'application/json' },
        body: JSON.stringify({ vector: queryEmb, topK: 10, includeMetadata: true, namespace: company_id }),
      });
        if (pineconeRes.ok) {
          const pineconeData: any = await pineconeRes.json();
          const matches: ChunkResult[] = (pineconeData.matches || [])
            .filter((m: any) => m.score > 0.7)
            .map((m: any) => ({
              id: m.id,
              document_id: m.metadata?.docId || '',
              content: m.metadata?.text || '',
              metadata: m.metadata || {},
              score: m.score,
            }));
          if (matches.length > 0) {
            const best = await rerankWithCrossEncoder(env, safeMessage, matches);
            retrievedContext = best?.content || matches[0].content;
          }
        }
      } catch { /* context retrieval failure is non-fatal */ }
    }

    const systemPrompt = `You are an HR assistant for SAQYN. Help employees with HR questions. Be concise and professional. Use only the context provided. If unsure, say so.`;
    const ragContext = retrievedContext ? `Relevant context:\n${retrievedContext}\n\n` : '';

    let aiResponse: string;
    const gatewayUrl = env.CF_AI_GATEWAY || 'https://api.openai.com/v1/chat/completions';
    const aiRes = await fetch(gatewayUrl, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${env.OPENAI_API_KEY || ''}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `${ragContext}User question: ${safeMessage}` }
        ],
        max_tokens: 500,
      }),
    });
    const aiData: any = await aiRes.json();
    aiResponse = aiData.choices?.[0]?.message?.content || `Echo: "${safeMessage}" (AI service responded)`;

    await logAudit(env, company_id!, userId, 'chat_message', { message_length: safeMessage.length, response_length: aiResponse.length }, ip, ua);
    await sql`UPDATE usage_ledger SET questions_used = questions_used + 1 WHERE company_id = ${company_id}`;

    return new Response(JSON.stringify({ response: aiResponse }), { headers });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500, headers });
  }
}
