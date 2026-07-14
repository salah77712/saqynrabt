export async function syncGWorkspaceContacts(
  accessToken: string,
  contacts: Array<{ name: string; email: string }>
) {
  // Edge runtime Google People API sync call integration
  const url = 'https://people.googleapis.com/v1/people:batchCreateContacts';
  
  const payload = {
    contacts: contacts.map((c) => ({
      contactPerson: {
        names: [{ givenName: c.name }],
        emailAddresses: [{ value: c.email }],
      },
    })),
  };

  return fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
}
