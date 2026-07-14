/**
 * Client Custom Branding configuration and Redis caching
 */
export interface BrandingConfig {
  logo_url?: string;
  primary_color_hex?: string;
  secondary_color_hex?: string;
  font_family?: string;
  chat_bot_name?: string;
  chat_bot_avatar_url?: string;
}

/**
 * Returns branding config for a client company, fallback default if missing
 */
export async function getCompanyBranding(
  companyId: string,
  sql: any,
  redis?: any
): Promise<BrandingConfig> {
  const cacheKey = `branding:${companyId}`;

  // 1. Try Upstash Redis cache first (TTL 24 hours)
  if (redis) {
    try {
      const cached = await redis.get(cacheKey);
      if (cached) {
        return typeof cached === 'string' ? JSON.parse(cached) : cached;
      }
    } catch (err) {
      console.warn('Failed to retrieve branding from Redis cache:', err);
    }
  }

  // 2. Fallback query database
  try {
    const [row] = await sql`
      SELECT branding FROM companies WHERE id = ${companyId}
    `;

    const branding: BrandingConfig = row?.branding || {
      logo_url: '',
      primary_color_hex: '#141F33',
      secondary_color_hex: '#2A5CFF',
      font_family: 'Inter',
      chat_bot_name: 'SAQYN Assistant',
      chat_bot_avatar_url: ''
    };

    // 3. Cache results
    if (redis) {
      await redis.setex(cacheKey, 86400, JSON.stringify(branding));
    }

    return branding;
  } catch (err) {
    console.error('Failed to load company branding details:', err);
    return {
      primary_color_hex: '#141F33',
      secondary_color_hex: '#2A5CFF',
    };
  }
}
