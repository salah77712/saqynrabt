import { neon } from '@neondatabase/serverless';

export async function logAudit(
  env: { DATABASE_URL: string },
  company_id: string,
  user_id: string,
  action: string,
  details?: any,
  ip_address?: string,
  user_agent?: string
): Promise<void> {
  try {
    const sql = neon(env.DATABASE_URL);
    await sql`
      INSERT INTO audit_logs (company_id, user_id, action, details, ip_address, user_agent)
      VALUES (
        ${company_id},
        ${user_id},
        ${action},
        ${details ? JSON.stringify(details) : null}::jsonb,
        ${ip_address || null},
        ${user_agent || null}
      )
    `;
  } catch (err) {
    console.error(`Audit log insert failed for action="${action}":`, err);
  }
}
