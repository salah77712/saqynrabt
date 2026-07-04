/**
 * Client Data Portability Service - Export all workspace structures (GDPR Compliance)
 */
export async function exportFullCompanyData(
  companyId: string,
  sql: any
): Promise<Response> {
  try {
    // 1. Fetch employee credentials
    const employees = await sql`
      SELECT clerk_user_id, email, name, role, status
      FROM company_members
      WHERE company_id = ${companyId}
    `;

    // 2. Fetch indexed PDF metadata
    const documents = await sql`
      SELECT id, name, status, created_at
      FROM company_documents
      WHERE company_id = ${companyId}
    `;

    // 3. Fetch recent automation calls
    const calls = await sql`
      SELECT id, customer_name, request_type, status, created_at
      FROM company_requests
      WHERE company_id = ${companyId}
    `;

    const exportPayload = {
      company_id: companyId,
      exported_at: new Date().toISOString(),
      employees,
      documents,
      automation_calls: calls,
    };

    // Return structured JSON payload representing full backup
    return new Response(JSON.stringify(exportPayload, null, 2), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Content-Disposition': `attachment; filename="saqyn_workspace_export_${companyId}.json"`,
      },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: 'EXPORT_FAILED', message: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
