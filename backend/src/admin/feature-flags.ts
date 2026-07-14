/**
 * SAQYN Admin Panel Feature Flags configuration API
 */
export async function updateClientFeatureFlags(
  companyId: string,
  flags: any,
  sql: any
): Promise<{ success: boolean }> {
  try {
    await sql`
      UPDATE companies
      SET feature_flags = ${JSON.stringify(flags)}
      WHERE id = ${companyId}
    `;

    return { success: true };
  } catch (err: any) {
    console.error('Failed to save company feature flags overrides:', err);
    return { success: false };
  }
}
