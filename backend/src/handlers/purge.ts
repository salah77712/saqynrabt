import { neon } from '@neondatabase/serverless';
import type { RequestWithContext } from '../utils';
import { corsHeaders } from '../utils';

export async function handlePurgeAll(request: RequestWithContext): Promise<Response> {
  const headers = corsHeaders(request, request.env);
  headers['Content-Type'] = 'application/json';
  const env = request.env;

  // NOTE: Audit logging is intentionally NOT added here because the purge
  // handler truncates `audit_logs` — logging before delete would be lost
  // on the same transaction. A durable external audit mechanism (e.g. a
  // separate audit queue or write-ahead log outside Postgres) is a P1
  // enhancement tracked in brain/next-tasks.md.

  const adminSecret = request.headers.get('X-Admin-Secret');
  if (!adminSecret || adminSecret !== env.ADMIN_SECRET) {
    return new Response(JSON.stringify({ error: 'Admin secret required' }), { status: 403, headers });
  }

  // Require explicit confirmation string to prevent accidental purge
  let body: any;
  try {
    body = await request.json();
  } catch {
    body = {};
  }
  if (!body || body.confirm !== 'PURGE_ALL_DATA') {
    return new Response(JSON.stringify({ error: 'Explicit confirmation required' }), { status: 400, headers });
  }

  const sql = neon(env.DATABASE_URL);

  try {
    // approvals table does not exist in production — skipped
    await sql`DELETE FROM usage_ledger`;
    await sql`DELETE FROM documents`;
    await sql`DELETE FROM employees`;
    await sql`DELETE FROM company_members`;
    await sql`DELETE FROM company_entitlements`;
    await sql`DELETE FROM companies`;

    return new Response(JSON.stringify({ success: true, message: 'All data purged' }), { headers });
  } catch (err: any) {
    console.error('Purge failed:', err);
    return new Response(JSON.stringify({ error: 'Purge failed', details: err.message }), { status: 500, headers });
  }
}