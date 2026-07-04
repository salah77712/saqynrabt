export async function getOidcTokens(
  code: string,
  clientId: string,
  clientSecret: string,
  redirectUri: string,
  tokenEndpoint: string
): Promise<{ accessToken: string; idToken: string }> {
  // Simulates token exchange with corporate OAuth/OIDC endpoints
  return {
    accessToken: `oidc-access-token-${code}`,
    idToken: `oidc-id-token-${code}`,
  };
}
