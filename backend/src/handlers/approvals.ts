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
    
    // 1. Get signed-up employees
    const employees = await sql`
      SELECT id, clerk_user_id, email, first_name, last_name, role, is_active
      FROM employees
      WHERE company_id = ${company_id}
      ORDER BY last_name, first_name
    `;

    // 2. Get invited members
    const invited = await sql`
      SELECT id, email, name, role, status
      FROM company_members
      WHERE company_id = ${company_id} AND status != 'deleted'
      ORDER BY name
    `;

    const pending: any[] = [];
    const active: any[] = [];
    const processedEmails = new Set<string>();

    // Process employees first (as they have clerk user ids)
    for (const row of employees) {
      if (row.email) processedEmails.add(row.email.toLowerCase());
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

    // Process invited members who haven't completed sign-up (no employee record yet)
    for (const row of invited) {
      if (row.email && processedEmails.has(row.email.toLowerCase())) continue;
      
      const member = {
        id: `invite_${row.id}`,
        name: row.name || row.email,
        email: row.email || '',
        role: row.role || 'employee',
        status: row.status === 'active' ? 'active' as const : 'pending' as const,
      };

      if (row.status === 'active') {
        active.push(member);
      } else {
        pending.push(member);
      }
    }

    return new Response(JSON.stringify({ pending, active }), { headers });
  } catch (err: any) {
    console.error("GET approvals failed:", err);
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
      if (typeof id === 'string' && id.startsWith('invite_')) {
        const inviteId = id.replace('invite_', '');
        await sql`
          UPDATE company_members SET status = 'active'
          WHERE id = ${inviteId} AND company_id = ${company_id}
        `;
        const [invite] = await sql`
          SELECT email FROM company_members WHERE id = ${inviteId}
        `;
        if (invite?.email) {
          await sql`
            UPDATE employees SET is_active = TRUE, updated_at = CURRENT_TIMESTAMP
            WHERE email = ${invite.email} AND company_id = ${company_id}
          `;
        }
      } else {
        await sql`
          UPDATE employees SET is_active = TRUE, updated_at = CURRENT_TIMESTAMP
          WHERE clerk_user_id = ${id} AND company_id = ${company_id}
        `;
        const [emp] = await sql`
          SELECT email FROM employees WHERE clerk_user_id = ${id}
        `;
        if (emp?.email) {
          await sql`
            UPDATE company_members SET status = 'active'
            WHERE email = ${emp.email} AND company_id = ${company_id}
          `;
        }
      }
      await logAudit(request.env, company_id!, userId, 'approve_employee', { employee_id: id });
      return new Response(JSON.stringify({ success: true }), { headers });
    }

    if (action === 'suspend') {
      if (typeof id === 'string' && id.startsWith('invite_')) {
        const inviteId = id.replace('invite_', '');
        await sql`
          UPDATE company_members SET status = 'suspended'
          WHERE id = ${inviteId} AND company_id = ${company_id}
        `;
        const [invite] = await sql`
          SELECT email FROM company_members WHERE id = ${inviteId}
        `;
        if (invite?.email) {
          await sql`
            UPDATE employees SET is_active = FALSE, updated_at = CURRENT_TIMESTAMP
            WHERE email = ${invite.email} AND company_id = ${company_id}
          `;
        }
      } else {
        await sql`
          UPDATE employees SET is_active = FALSE, updated_at = CURRENT_TIMESTAMP
          WHERE clerk_user_id = ${id} AND company_id = ${company_id}
        `;
        const [emp] = await sql`
          SELECT email FROM employees WHERE clerk_user_id = ${id}
        `;
        if (emp?.email) {
          await sql`
            UPDATE company_members SET status = 'suspended'
            WHERE email = ${emp.email} AND company_id = ${company_id}
          `;
        }
      }
      await logAudit(request.env, company_id!, userId, 'suspend_employee', { employee_id: id });
      return new Response(JSON.stringify({ success: true }), { headers });
    }

    if (action === 'invite') {
      if (!name || !email) {
        return new Response(JSON.stringify({ error: 'name and email are required for invite' }), { status: 400, headers });
      }
      const [existing] = await sql`
        SELECT id FROM company_members WHERE email = ${email} AND company_id = ${company_id}
      `;
      if (existing) {
        await sql`
          UPDATE company_members SET status = 'pending', name = ${name} WHERE id = ${existing.id}
        `;
      } else {
        await sql`
          INSERT INTO company_members (company_id, email, name, status, role)
          VALUES (${company_id}, ${email}, ${name}, 'pending', 'employee')
        `;
      }

      // Fetch inviter and company names for personalizing invitation email
      let inviterName = 'A colleague';
      try {
        const [inviter] = await sql`
          SELECT first_name, last_name FROM employees WHERE clerk_user_id = ${userId}
        `;
        if (inviter) {
          inviterName = [inviter.first_name, inviter.last_name].filter(Boolean).join(' ').trim() || 'A colleague';
        }
      } catch (e) {
        console.error('Error fetching inviter details:', e);
      }

      let companyName = 'their company';
      try {
        const [company] = await sql`
          SELECT name FROM companies WHERE id = ${company_id}
        `;
        if (company?.name) {
          companyName = company.name;
        }
      } catch (e) {
        console.error('Error fetching company details:', e);
      }

      await logAudit(request.env, company_id!, userId, 'invite_employee', { email, name });

      return new Response(JSON.stringify({ success: true, companyName, inviterName }), { headers });
    }

    return new Response(JSON.stringify({ error: `Unknown action: ${action}` }), { status: 400, headers });
  } catch (err: any) {
    console.error("Post approval failed:", err);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500, headers });
  }
}

