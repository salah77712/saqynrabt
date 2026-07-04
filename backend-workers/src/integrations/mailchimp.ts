export async function syncContactToMailchimp(
  apiKey: string,
  listId: string,
  email: string,
  mergeFields: Record<string, string> = {}
) {
  // Extract server data center from API Key e.g. us1
  const datacenter = apiKey.split('-')[1] || 'us1';
  const url = `https://${datacenter}.api.mailchimp.com/3.0/lists/${listId}/members`;

  const payload = {
    email_address: email,
    status: 'subscribed',
    merge_fields: mergeFields,
  };

  return fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${btoa(`anystring:${apiKey}`)}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
}
