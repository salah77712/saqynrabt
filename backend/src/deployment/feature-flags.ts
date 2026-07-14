/**
 * Private AI Feature Flags manager
 */
export interface FeatureFlags {
  voice_ai_enabled: boolean;
  fine_tuning_enabled: boolean;
  advanced_analytics_enabled: boolean;
}

/**
 * Returns active feature flags for a company, checking database overrides
 */
export async function getCompanyFeatureFlags(
  companyId: string,
  sql: any
): Promise<FeatureFlags> {
  try {
    const [row] = await sql`
      SELECT feature_flags FROM companies WHERE id = ${companyId}
    `;

    return row?.feature_flags || {
      voice_ai_enabled: true,
      fine_tuning_enabled: false,
      advanced_analytics_enabled: false
    };
  } catch (err) {
    console.error('Failed to query feature flags overrides:', err);
    return {
      voice_ai_enabled: true,
      fine_tuning_enabled: false,
      advanced_analytics_enabled: false
    };
  }
}
