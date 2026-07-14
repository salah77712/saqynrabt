/**
 * Public REST API V1 - Chatbot RAG endpoint
 */
export async function handlePublicV1Chat(
  request: Request,
  env: any,
  sql: any,
  redis?: any
): Promise<Response> {
  const apiKey = request.headers.get('x-api-key');
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'UNAUTHORIZED_MISSING_API_KEY' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // 1. Verify API key hash in database
  const [keyRow] = await sql`
    SELECT company_id, permissions FROM api_keys
    WHERE key_hash = ${apiKey}
  `;

  if (!keyRow) {
    return new Response(JSON.stringify({ error: 'INVALID_API_KEY' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // 2. Simple Redis Rate Limiter (100 requests per minute)
  if (redis) {
    const rateKey = `rate:v1chat:${keyRow.company_id}`;
    try {
      const current = await redis.incr(rateKey);
      if (current === 1) {
        await redis.expire(rateKey, 60);
      }
      if (current > 100) {
        return new Response(JSON.stringify({ error: 'RATE_LIMIT_EXCEEDED' }), {
          status: 429,
          headers: { 'Content-Type': 'application/json', 'Retry-After': '60' },
        });
      }
    } catch (err) {
      console.warn('Rate limiter failed, proceeding:', err);
    }
  }

  try {
    const body: any = await request.json();
    const query = body.message;

    if (!query) {
      return new Response(JSON.stringify({ error: 'MESSAGE_REQUIRED' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Process mock RAG retrieval logic for public api
    return new Response(JSON.stringify({
      response: `Thank you for contacting SAQYN. This is a public API response for: "${query}".`,
      citations: []
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
