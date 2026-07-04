/**
 * SOC2 / GDPR Security Audit Logging Helper
 */
export async function writeAuditLog(
  sql: any,
  companyId: string,
  userEmail: string,
  action: 'CREATE' | 'READ' | 'UPDATE' | 'DELETE' | 'EXPORT',
  resource: string,
  request: Request
): Promise<void> {
  try {
    const ipAddress = request.headers.get('cf-connecting-ip') || '127.0.0.1';
    const userAgent = request.headers.get('user-agent') || 'Unknown';
    const country = request.headers.get('cf-ipcountry') || 'QA';

    // Insert structured immutable audit log row into NeonDB
    await sql`
      INSERT INTO audit_logs (
        company_id,
        operator_email,
        action,
        resource,
        ip_address,
        user_agent,
        geo_location,
        retention_date,
        created_at
      ) VALUES (
        ${companyId},
        ${userEmail},
        ${action},
        ${resource},
        ${ipAddress},
        ${userAgent},
        ${country},
        NOW() + INTERVAL '7 years', -- SOC2 7-year retention rule
        NOW()
      )
    `;
  } catch (err) {
    console.error('Failed to write security audit log row:', err);
  }
}
