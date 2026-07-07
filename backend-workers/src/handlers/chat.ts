import { neon } from '@neondatabase/serverless';
import type { RequestWithContext, Env } from '../utils';
import { corsHeaders, initRedis, checkRateLimit, checkUsageLimit, logAudit, generateEmbedding, chunkText } from '../utils';

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

    let retrievedContext = '';
    if (env.OPENAI_API_KEY) {
      try {
        const queryEmb = await generateEmbedding(message, env.OPENAI_API_KEY);
        const pineconeHost = env.PINECONE_INDEX_HOST || 'saqyn-index';
        const pineconeRes = await fetch(`https://${pineconeHost}/query`, {
          method: 'POST',
          headers: { 'Api-Key': env.PINECONE_API_KEY, 'Content-Type': 'application/json' },
          body: JSON.stringify({ vector: queryEmb, topK: 3, includeMetadata: true }),
        });
        if (pineconeRes.ok) {
          const pineconeData: any = await pineconeRes.json();
          retrievedContext = (pineconeData.matches || []).filter((m: any) => m.score > 0.7).map((m: any) => m.metadata?.text || '').join('\n\n');
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
          { role: 'user', content: `${ragContext}User question: ${message}` }
        ],
        max_tokens: 500,
      }),
    });
    const aiData: any = await aiRes.json();
    aiResponse = aiData.choices?.[0]?.message?.content || `Echo: "${message}" (AI service responded)`;

    await logAudit(env, company_id!, userId, 'chat_message', { message_length: message.length, response_length: aiResponse.length }, ip, ua);
    request.ctx?.waitUntil(
      sql`UPDATE usage_ledger SET questions_used = questions_used + 1, questions_count = questions_count + 1 WHERE company_id = ${company_id}`
    );

    return new Response(JSON.stringify({ response: aiResponse }), { headers });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500, headers });
  }
}
