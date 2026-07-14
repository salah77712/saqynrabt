export async function syncGWorkspaceContacts(
  accessToken: string,
  contacts: Array<{ name: string; email: string }>
): Promise<Response> {
  if (!accessToken) {
    throw new Error('Google Workspace access token is required');
  }
  if (!contacts || contacts.length === 0) {
    throw new Error('Contacts array must not be empty');
  }

  const payload = {
    contacts: contacts.map((c) => ({
      contactPerson: {
        names: [{ givenName: c.name }],
        emailAddresses: [{ value: c.email }],
      },
    })),
  };

  try {
    const res = await fetch('https://people.googleapis.com/v1/people:batchCreateContacts', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      console.error('Google People API rejected:', await res.text());
      throw new Error('Google People API rejected request');
    }
    return res;
  } catch (err) {
    console.error('GWorkspace sync failed:', err);
    throw err;
  }
}
