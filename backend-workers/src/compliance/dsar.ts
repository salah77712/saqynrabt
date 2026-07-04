/**
 * Data Subject Access Request (DSAR) processing pipeline (GDPR / privacy compliance)
 */
export async function submitDSAR(
  email: string,
  requestType: 'access' | 'rectification' | 'erasure',
  details: string,
  sql: any
): Promise<{ success: boolean; request_id?: string }> {
  try {
    const [row] = await sql`
      INSERT INTO dsar_requests (email, request_type, details, status, created_at)
      VALUES (${email}, ${requestType}, ${details}, 'pending', NOW())
      RETURNING id
    `;

    return { success: true, request_id: row.id };
  } catch (err: any) {
    console.error('Failed to register DSAR request:', err);
    return { success: false };
  }
}
