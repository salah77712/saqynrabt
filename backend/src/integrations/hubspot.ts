export async function syncHubspotContacts(
  accessToken: string
): Promise<{ success: boolean; count: number }> {
  if (!accessToken) {
    throw new Error('HubSpot access token is required');
  }

  try {
    const response = await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error('HubSpot API rejected:', await response.text());
      throw new Error('HubSpot API rejected request');
    }

    const data: { results?: unknown[] } = await response.json();
    const list = data.results || [];
    return { success: true, count: list.length };
  } catch (err) {
    console.error('HubSpot sync failed:', err);
    throw err;
  }
}
