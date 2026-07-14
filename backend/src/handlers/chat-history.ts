import { neon } from '@neondatabase/serverless';
import type { RequestWithContext } from '../utils';
import { corsHeaders } from '../utils';

export async function handleGetChatHistory(request: RequestWithContext): Promise<Response> {
  const headers = corsHeaders(request, request.env);
  headers['Content-Type'] = 'application/json';
  const jwt = request.jwt;
  if (!jwt) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers });
  }
  const company_id = jwt.company_id;

  try {
    const sql = neon(request.env.DATABASE_URL);
    const messages = await sql`
      SELECT id, role, content, created_at
      FROM chat_history
      WHERE company_id = ${company_id}
      ORDER BY created_at DESC
      LIMIT 100
    `;

    return new Response(JSON.stringify({ messages: messages || [] }), { headers });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: 'Internal server error', messages: [] }), { status: 500, headers });
  }
}
