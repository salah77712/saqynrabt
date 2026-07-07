import { neon } from '@neondatabase/serverless';
import type { RequestWithContext } from '../utils';
import { corsHeaders, logAudit } from '../utils';

export async function handleGetApprovals(request: RequestWithContext): Promise<Response> {
  const headers = corsHeaders(request, request.env);
  headers['Content-Type'] = 'application/json';
  const jwt = request.jwt;
  if (!jwt) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers });
  }
  const company_id = jwt.company_id;

  try {
    const sql = neon(request.env.DATABASE_URL);
    const rows = await sql`
      SELECT id, clerk_user_id, email, first_name, last_name, role, is_active
      FROM employees
      WHERE company_id = ${company_id}
      ORDER BY last_name, first_name
    `;

    const pending: any[] = [];
    const active: any[] = [];

    for (const row of rows) {
      const member = {
        id: row.clerk_user_id || String(row.id),
        name: [row.first_name, row.last_name].filter(Boolean).join(' ').trim() || row.email,
        email: row.email || '',
        role: row.role || 'employee',
        status: row.is_active ? 'active' as const : 'pending' as const,
      };
      if (row.is_active) {
        active.push(member);
      } else {
        pending.push(member);
      }
    }

    return new Response(JSON.stringify({ pending, active }), { headers });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: 'Internal server error', pending: [], active: [] }), { status: 500, headers });
  }
}

export async function handlePostApproval(request: RequestWithContext): Promise<Response> {
  const headers = corsHeaders(request, request.env);
  headers['Content-Type'] = 'application/json';
  const jwt = request.jwt;
  if (!jwt) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers });
  }
  const company_id = jwt.company_id;
  const userId = jwt.sub;

  try {
    const body: any = await request.json();
    const { action, id, name, email } = body || {};

    if (!action) {
      return new Response(JSON.stringify({ error: 'action is required' }), { status: 400, headers });
    }

    const sql = neon(request.env.DATABASE_URL);

    if (action === 'approve') {
      await sql`
        UPDATE employees SET is_active = TRUE, updated_at = CURRENT_TIMESTAMP
        WHERE clerk_user_id = ${id} AND company_id = ${company_id}
      `;
      await logAudit(request.env, company_id!, userId, 'approve_employee', { employee_id: id });
      return new Response(JSON.stringify({ success: true }), { headers });
    }

    if (action === 'suspend') {
      await sql`
        UPDATE employees SET is_active = FALSE, updated_at = CURRENT_TIMESTAMP
        WHERE clerk_user_id = ${id} AND company_id = ${company_id}
      `;
      await logAudit(request.env, company_id!, userId, 'suspend_employee', { employee_id: id });
      return new Response(JSON.stringify({ success: true }), { headers });
    }

    if (action === 'invite') {
      if (!name || !email) {
        return new Response(JSON.stringify({ error: 'name and email are required for invite' }), { status: 400, headers });
      }
      await sql`
        INSERT INTO company_members (company_id, email, name, status, role)
        VALUES (${company_id}, ${email}, ${name}, 'pending', 'employee')
        ON CONFLICT (email) DO NOTHING
      `;
      await logAudit(request.env, company_id!, userId, 'invite_employee', { email, name });
      return new Response(JSON.stringify({ success: true }), { headers });
    }

    return new Response(JSON.stringify({ error: `Unknown action: ${action}` }), { status: 400, headers });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500, headers });
  }
}
