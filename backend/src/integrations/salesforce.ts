export async function syncSalesforceLeads(
  instanceUrl: string,
  accessToken: string
): Promise<{ success: boolean; count: number }> {
  if (!instanceUrl || !instanceUrl.startsWith('https://')) {
    throw new Error('Invalid or missing Salesforce instance URL');
  }
  if (!accessToken) {
    throw new Error('Salesforce access token is required');
  }

  try {
    const response = await fetch(
      `${instanceUrl}/services/data/v58.0/query?q=SELECT+Id,Name,Email+FROM+Lead`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      console.error('Salesforce API rejected:', await response.text());
      throw new Error('Salesforce API rejected request');
    }

    const data: { records?: unknown[] } = await response.json();
    const list = data.records || [];
    return { success: true, count: list.length };
  } catch (err) {
    console.error('Salesforce sync failed:', err);
    throw err;
  }
}
