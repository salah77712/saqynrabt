import { neon } from '@neondatabase/serverless';
import type { RequestWithContext } from '../utils';
import { corsHeaders, initRedis, checkRateLimit, checkUsageLimit, logAudit } from '../utils';

export async function handleGetAutomations(request: RequestWithContext): Promise<Response> {
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

  try {
    const sql = neon(env.DATABASE_URL);
    const automations = await sql`
      SELECT id, name, trigger_event, action_type, config, is_active, updated_at
      FROM automations
      WHERE company_id = ${company_id}
      ORDER BY updated_at DESC
    `;
    await logAudit(env, company_id!, userId, 'view_automations', { count: automations.length }, ip, ua);
    return new Response(JSON.stringify({ automations: automations || [] }), { headers });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message, automations: [] }), { status: 500, headers });
  }
}

export async function handleCreateAutomation(request: RequestWithContext): Promise<Response> {
  const headers = corsHeaders(request, request.env);
  headers['Content-Type'] = 'application/json';
  const env = request.env;
  const jwt = request.jwt;
  if (!jwt) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers });
  }
  const company_id = jwt.company_id;
  const userId = jwt.sub;

  try {
    const body: any = await request.json();
    const { name, trigger_event, action_type, config } = body;
    if (!name || !trigger_event || !action_type) {
      return new Response(JSON.stringify({ error: 'name, trigger_event, action_type are required' }), { status: 400, headers });
    }

    const sql = neon(env.DATABASE_URL);
    const result = await sql`
      INSERT INTO automations (company_id, name, trigger_event, action_type, config, is_active)
      VALUES (${company_id}, ${name}, ${trigger_event}, ${action_type}, ${config ? JSON.stringify(config) : null}::jsonb, true)
      RETURNING id, name, trigger_event, action_type, config, is_active, updated_at
    `;
    await logAudit(env, company_id!, userId, 'create_automation', { name, trigger_event, action_type });
    return new Response(JSON.stringify({ automation: result[0] }), { status: 201, headers });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500, headers });
  }
}
