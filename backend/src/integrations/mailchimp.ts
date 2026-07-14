export async function syncContactToMailchimp(
  apiKey: string,
  listId: string,
  email: string,
  mergeFields: Record<string, string> = {}
): Promise<Response> {
  if (!apiKey || !apiKey.includes('-')) {
    throw new Error('Invalid Mailchimp API key — must contain a data center suffix');
  }
  if (!listId) {
    throw new Error('Mailchimp list ID is required');
  }
  if (!email) {
    throw new Error('Email address is required');
  }

  const datacenter = apiKey.split('-')[1];
  const url = `https://${datacenter}.api.mailchimp.com/3.0/lists/${listId}/members`;

  const payload = {
    email_address: email,
    status: 'subscribed' as const,
    merge_fields: mergeFields,
  };

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${btoa(`anystring:${apiKey}`)}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      console.error('Mailchimp API rejected:', await res.text());
      throw new Error('Mailchimp API rejected request');
    }
    return res;
  } catch (err) {
    console.error('Mailchimp sync failed:', err);
    throw err;
  }
}
