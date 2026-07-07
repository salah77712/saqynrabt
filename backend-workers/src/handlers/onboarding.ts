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
  const company_id = jwt.company_id;

  try {
    const sql = neon(request.env.DATABASE_URL);
    const [company] = await sql`
      SELECT id, name, slug, created_at FROM companies WHERE id = ${company_id}
    `;
    return new Response(JSON.stringify({
      onboarded: !!company,
      company: company || null,
    }), { headers });
  } catch (err: any) {
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
  const company_id = jwt.company_id;
  const userId = jwt.sub;

  try {
    const body: any = await request.json();
    const { companyName, industry, size, setupPreference, teamInvites } = body || {};

    if (!companyName) {
      return new Response(JSON.stringify({ error: 'companyName is required' }), { status: 400, headers });
    }

    const sql = neon(request.env.DATABASE_URL);

    await sql`
      INSERT INTO companies (id, name, slug)
      VALUES (${company_id}, ${companyName}, ${companyName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')})
      ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, updated_at = CURRENT_TIMESTAMP
    `;

    await sql`
      UPDATE employees SET role = 'admin', is_active = TRUE
      WHERE clerk_user_id = ${userId} AND company_id = ${company_id}
    `;

    await logAudit(request.env, company_id!, userId, 'complete_onboarding', { companyName, industry, size, setupPreference });
    return new Response(JSON.stringify({ success: true, company_id }), { headers });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500, headers });
  }
}
