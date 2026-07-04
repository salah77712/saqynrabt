export async function checkRegionHealth(regionUrl: string): Promise<boolean> {
  try {
    const response = await fetch(`${regionUrl}/api/wakeup`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    return response.ok;
  } catch {
    return false;
  }
}

export function determineActiveRegion(
  primaryHealthy: boolean,
  secondaryHealthy: boolean,
  primaryUrl: string,
  secondaryUrl: string
): string {
  if (primaryHealthy) return primaryUrl;
  if (secondaryHealthy) return secondaryUrl;
  throw new Error('All regions are offline. Critical service degradation.');
}
