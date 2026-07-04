/**
 * QuickBooks Integration Connector
 */
export async function syncQuickbooksInvoices(
  accessToken: string,
  realmId: string,
  sql: any,
  companyId: string
): Promise<{ success: boolean; count: number }> {
  try {
    const response = await fetch(`https://sandbox-quickbooks.api.intuit.com/v3/company/${realmId}/query?query=select * from Invoice`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/json'
      }
    });

    if (!response.ok) throw new Error('QuickBooks API rejected request');
    const data: any = await response.json();
    const list = data.QueryResponse?.Invoice || [];

    return { success: true, count: list.length };
  } catch (err) {
    console.error('Quickbooks sync failed:', err);
    return { success: false, count: 0 };
  }
}
