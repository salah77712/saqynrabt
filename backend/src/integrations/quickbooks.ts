export async function syncQuickbooksInvoices(
  accessToken: string,
  realmId: string
): Promise<{ success: boolean; count: number }> {
  if (!accessToken) {
    throw new Error('QuickBooks access token is required');
  }
  if (!realmId) {
    throw new Error('QuickBooks realm ID is required');
  }

  try {
    const response = await fetch(
      `https://sandbox-quickbooks.api.intuit.com/v3/company/${realmId}/query?query=select * from Invoice`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: 'application/json',
        },
      }
    );

    if (!response.ok) {
      console.error('QuickBooks API rejected:', await response.text());
      throw new Error('QuickBooks API rejected request');
    }

    const data: { QueryResponse?: { Invoice?: unknown[] } } = await response.json();
    const list = data.QueryResponse?.Invoice || [];
    return { success: true, count: list.length };
  } catch (err) {
    console.error('QuickBooks sync failed:', err);
    throw err;
  }
}
