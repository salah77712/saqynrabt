export async function syncBambooHREmployees(
  apiKey: string,
  subdomain: string
): Promise<{ success: boolean; count: number }> {
  if (!apiKey) {
    throw new Error('BambooHR API key is required');
  }
  if (!subdomain) {
    throw new Error('BambooHR subdomain is required');
  }

  try {
    const encoded = btoa(`${apiKey}:x`);
    const response = await fetch(
      `https://api.bamboohr.com/api/gateway.php/${subdomain}/v1/employees/directory`,
      {
        headers: {
          Authorization: `Basic ${encoded}`,
          Accept: 'application/json',
        },
      }
    );

    if (!response.ok) {
      console.error('BambooHR API rejected:', await response.text());
      throw new Error('BambooHR API rejected request');
    }

    const data: { employees?: unknown[] } = await response.json();
    const list = data.employees || [];
    return { success: true, count: list.length };
  } catch (err) {
    console.error('BambooHR sync failed:', err);
    throw err;
  }
}
