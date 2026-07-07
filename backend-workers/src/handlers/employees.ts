import { neon } from '@neondatabase/serverless';
import type { RequestWithContext } from '../utils';
import { corsHeaders, logAudit } from '../utils';

export async function handleGetEmployees(request: RequestWithContext): Promise<Response> {
  const headers = corsHeaders(request, request.env);
  headers['Content-Type'] = 'application/json';
  const env = request.env;
  const jwt = request.jwt;
  if (!jwt) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers });
  }
  const company_id = jwt.company_id;

  try {
    const sql = neon(env.DATABASE_URL);
    const employees = await sql`
      SELECT id, clerk_user_id, email, first_name, last_name, role, department, manager_id, is_active, created_at, updated_at
      FROM employees
      WHERE company_id = ${company_id}
      ORDER BY last_name, first_name
    `;
    return new Response(JSON.stringify({ employees: employees || [] }), { headers });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: 'Internal server error', employees: [] }), { status: 500, headers });
  }
}

export async function handlePatchEmployee(request: RequestWithContext): Promise<Response> {
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
    const url = new URL(request.url);
    const segments = url.pathname.split('/').filter(Boolean);
    const empId = segments[segments.length - 1];
    if (!empId) {
      return new Response(JSON.stringify({ error: 'Employee ID required' }), { status: 400, headers });
    }

    const body: any = await request.json();
    const allowedFields = ['first_name', 'last_name', 'role', 'department', 'manager_id', 'is_active'];
    const updates: Record<string, any> = {};
    for (const field of allowedFields) {
      if (body[field] !== undefined) updates[field] = body[field];
    }
    if (Object.keys(updates).length === 0) {
      return new Response(JSON.stringify({ error: 'No valid fields to update' }), { status: 400, headers });
    }

    const sql = neon(env.DATABASE_URL);
    for (const [field, value] of Object.entries(updates)) {
      const safeField = field.replace(/[^a-z_]/g, '');
      await sql`
        UPDATE employees SET ${sql(safeField)} = ${value} WHERE id = ${empId} AND company_id = ${company_id}
      `;
    }
    const result = await sql`
      SELECT id, email, first_name, last_name, role, department, is_active
      FROM employees WHERE id = ${empId} AND company_id = ${company_id}
    `;
    await logAudit(env, company_id!, userId, 'update_employee', { employee_id: empId, updates });
    return new Response(JSON.stringify({ employee: result[0] }), { headers });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500, headers });
  }
}

export async function handleGetEntitlements(request: RequestWithContext): Promise<Response> {
  const headers = corsHeaders(request, request.env);
  headers['Content-Type'] = 'application/json';
  const env = request.env;
  const jwt = request.jwt;
  if (!jwt) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers });
  }
  const company_id = jwt.company_id;

  try {
    const sql = neon(env.DATABASE_URL);
    const entitlements = await sql`
      SELECT * FROM company_entitlements WHERE company_id = ${company_id}
    `;
    return new Response(JSON.stringify({ entitlements: entitlements?.[0] || null }), { headers });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500, headers });
  }
}

export async function handleGetUsageStats(request: RequestWithContext): Promise<Response> {
  const headers = corsHeaders(request, request.env);
  headers['Content-Type'] = 'application/json';
  const env = request.env;
  const jwt = request.jwt;
  if (!jwt) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers });
  }
  const company_id = jwt.company_id;

  try {
    const sql = neon(env.DATABASE_URL);
    const usage = await sql`
      SELECT questions_used, questions_count, automation_texts_used, voice_minutes_used
      FROM usage_ledger WHERE company_id = ${company_id}
    `;
    const entitlements = await sql`
      SELECT max_questions, automation_texts_limit, voice_minutes_limit, auto_overage_enabled
      FROM company_entitlements WHERE company_id = ${company_id}
    `;
    return new Response(JSON.stringify({
      usage: usage?.[0] || {},
      limits: entitlements?.[0] || {},
    }), { headers });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500, headers });
  }
}

export async function handleFeedback(request: RequestWithContext): Promise<Response> {
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
    const { rating, category, comment } = body;
    const sql = neon(env.DATABASE_URL);
    await sql`
      INSERT INTO feedback (company_id, user_id, rating, category, comment)
      VALUES (${company_id}, ${userId}, ${rating}, ${category || null}, ${comment || null})
    `;
    await logAudit(env, company_id!, userId, 'submit_feedback', { rating, category });
    return new Response(JSON.stringify({ success: true }), { status: 201, headers });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500, headers });
  }
}

export async function handleExportLogs(request: RequestWithContext): Promise<Response> {
  const headers = corsHeaders(request, request.env);
  headers['Content-Type'] = 'text/csv';
  const env = request.env;
  const jwt = request.jwt;
  if (!jwt) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers });
  }
  const company_id = jwt.company_id;

  try {
    const sql = neon(env.DATABASE_URL);
    const logs = await sql`
      SELECT timestamp, action, user_id, details FROM audit_logs
      WHERE company_id = ${company_id}
      ORDER BY timestamp DESC LIMIT 1000
    `;
    const csvRows = ['timestamp,action,user_id,details'];
    for (const log of logs || []) {
      csvRows.push(`"${log.timestamp}","${log.action}","${log.user_id}","${(log.details ? JSON.stringify(log.details) : '').replace(/"/g, '""')}"`);
    }
    return new Response(csvRows.join('\n'), { headers });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500, headers });
  }
}

export async function handleOverageSettings(request: RequestWithContext): Promise<Response> {
  const headers = corsHeaders(request, request.env);
  headers['Content-Type'] = 'application/json';
  const env = request.env;
  const jwt = request.jwt;
  if (!jwt) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers });
  }
  const company_id = jwt.company_id;

  try {
    const body: any = await request.json();
    const { auto_overage_enabled } = body;
    const sql = neon(env.DATABASE_URL);
    const result = await sql`
      INSERT INTO company_entitlements (company_id, auto_overage_enabled)
      VALUES (${company_id}, ${auto_overage_enabled ?? false})
      ON CONFLICT (company_id)
      DO UPDATE SET auto_overage_enabled = ${auto_overage_enabled ?? false}
      RETURNING auto_overage_enabled
    `;
    return new Response(JSON.stringify({ overage: result[0] }), { headers });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500, headers });
  }
}

export async function handleKnowledgeGaps(request: RequestWithContext): Promise<Response> {
  const headers = corsHeaders(request, request.env);
  headers['Content-Type'] = 'application/json';
  const env = request.env;
  const jwt = request.jwt;
  if (!jwt) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers });
  }
  const company_id = jwt.company_id;

  try {
    const sql = neon(env.DATABASE_URL);
    const gaps = await sql`
      SELECT question_text AS question, COUNT(*) AS count, MAX(timestamp) AS last_asked
      FROM knowledge_gaps
      WHERE company_id = ${company_id}
      GROUP BY question_text
      ORDER BY count DESC
      LIMIT 50
    `;
    return new Response(JSON.stringify({ knowledgeGaps: gaps || [] }), { headers });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: 'Internal server error', knowledgeGaps: [] }), { status: 500, headers });
  }
}
