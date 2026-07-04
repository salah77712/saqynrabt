/**
 * SAQYN Admin Panel Client Management API
 */
export async function updateClientStatus(
  companyId: string,
  status: 'active' | 'suspended' | 'canceled',
  sql: any
): Promise<{ success: boolean }> {
  try {
    await sql`
      UPDATE companies
      SET status = ${status}
      WHERE id = ${companyId}
    `;

    return { success: true };
  } catch (err: any) {
    console.error('Failed to update company status:', err);
    return { success: false };
  }
}
