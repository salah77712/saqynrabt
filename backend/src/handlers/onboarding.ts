import { neon } from '@neondatabase/serverless';
import type { RequestWithContext } from '../utils';
import { corsHeaders, logAudit } from '../utils';

export async function handleGetOnboardingStatus(request: RequestWithContext): Promise<Response> {
  const headers = corsHeaders(request, request.env);
  headers['Content-Type'] = 'application/json';
  const jwt = request.jwt;
  if (!jwt) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers });
  }
  const userId = jwt.sub;

  try {
    const sql = neon(request.env.DATABASE_URL);
    const [employee] = await sql`
      SELECT company_id, role, is_active FROM employees WHERE clerk_user_id = ${userId}
    `;
    if (!employee) {
      return new Response(JSON.stringify({ onboarded: false, company: null }), { headers });
    }
    const [company] = await sql`
      SELECT id, name, slug, created_at FROM companies WHERE id = ${employee.company_id}
    `;
    return new Response(JSON.stringify({
      onboarded: !!company,
      company: company || null,
    }), { headers });
  } catch (err: any) {
    console.error('GET /onboarding error:', err);
    return new Response(JSON.stringify({ error: 'Internal server error', onboarded: false }), { status: 500, headers });
  }
}

export async function handlePostOnboarding(request: RequestWithContext): Promise<Response> {
  const headers = corsHeaders(request, request.env);
  headers['Content-Type'] = 'application/json';
  const jwt = request.jwt;
  if (!jwt) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers });
  }
  const userId = jwt.sub;
  const email = jwt.email || '';

  try {
    const sql = neon(request.env.DATABASE_URL);

    const [existing] = await sql`SELECT company_id, role FROM employees WHERE clerk_user_id = ${userId}`;
    if (existing) {
      return new Response(JSON.stringify({ success: true, company_id: existing.company_id, already_existed: true }), { headers });
    }

    const body: any = await request.json();
    const { companyName, industry, size, setupPreference, teamInvites } = body || {};

    // Check if there is a pending invite in company_members by email
    if (email) {
      const [member] = await sql`
        SELECT company_id, role, status FROM company_members WHERE LOWER(email) = LOWER(${email})
      `;
      if (member) {
        const isActive = member.status === 'active';
        const inviteRole = member.role || 'employee';

        await sql`
          INSERT INTO employees (company_id, clerk_user_id, email, first_name, last_name, role, is_active)
          VALUES (${member.company_id}, ${userId}, ${email}, ${companyName || ''}, '', ${inviteRole}, ${isActive})
          ON CONFLICT (clerk_user_id)
          DO UPDATE SET company_id = ${member.company_id}, role = ${inviteRole}, is_active = ${isActive}, updated_at = NOW()
        `;

        await sql`
          UPDATE company_members
          SET clerk_user_id = ${userId}, status = ${member.status}
          WHERE LOWER(email) = LOWER(${email}) AND company_id = ${member.company_id}
        `;

        try {
          const clerkRes = await fetch(`https://api.clerk.com/v1/users/${userId}/metadata`, {
            method: 'PATCH',
            headers: {
              'Authorization': `Bearer ${request.env.CLERK_SECRET_KEY}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              public_metadata: {
                company_id: member.company_id,
                role: inviteRole
              }
            })
          });
          if (!clerkRes.ok) {
            console.error('Failed to update Clerk user metadata:', await clerkRes.text());
          }
        } catch (clerkErr) {
          console.error('Error updating Clerk user metadata:', clerkErr);
        }

        await logAudit(request.env, member.company_id, userId, 'accept_invite', { email, role: inviteRole });
        return new Response(JSON.stringify({ success: true, company_id: member.company_id, from_invite: true }), { headers });
      }
    }

    if (!companyName) {
      return new Response(JSON.stringify({ error: 'companyName is required' }), { status: 400, headers });
    }

    const company_id = crypto.randomUUID();

    await sql`
      INSERT INTO companies (id, name, slug)
      VALUES (${company_id}, ${companyName}, ${companyName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')})
    `;

    await sql`
      INSERT INTO employees (company_id, clerk_user_id, email, first_name, role, is_active)
      VALUES (${company_id}, ${userId}, ${email}, ${companyName}, 'admin', TRUE)
    `;

    await sql`
      INSERT INTO company_members (company_id, clerk_user_id, email, name, status, role)
      VALUES (${company_id}, ${userId}, ${email}, ${companyName}, 'active', 'admin')
    `;

    await sql`
      INSERT INTO company_entitlements (company_id, max_employees, max_documents, max_questions, dept_limit, automation_texts_limit, voice_minutes_limit, auto_overage_enabled, plan_key)
      VALUES (${company_id}, 50, 1, 15, 3, 300, 5, FALSE, 'platform')
    `;

    await sql`
      INSERT INTO usage_ledger (company_id, questions_used, questions_count, automation_texts_used, voice_minutes_used)
      VALUES (${company_id}, 0, 0, 0, 0)
    `;

    try {
      const clerkRes = await fetch(`https://api.clerk.com/v1/users/${userId}/metadata`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${request.env.CLERK_SECRET_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          public_metadata: {
            company_id,
            role: 'admin'
          }
        })
      });
      if (!clerkRes.ok) {
        console.error('Failed to update Clerk user metadata:', await clerkRes.text());
      }
    } catch (clerkErr) {
      console.error('Error updating Clerk user metadata:', clerkErr);
    }

    await logAudit(request.env, company_id, userId, 'complete_onboarding', { companyName, industry, size, setupPreference });
    return new Response(JSON.stringify({ success: true, company_id }), { headers });
  } catch (err: any) {
    console.error('POST /onboarding error:', err);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500, headers });
  }
}
