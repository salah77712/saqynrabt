export async function sendSlackNotification(
  webhookUrl: string,
  event: string,
  data: Record<string, unknown>
): Promise<Response> {
  if (!webhookUrl || !webhookUrl.startsWith('https://')) {
    throw new Error('Invalid or missing Slack webhook URL');
  }
  if (!event) {
    throw new Error('Event name is required');
  }
  if (!data || typeof data !== 'object') {
    throw new Error('Data payload must be a non-null object');
  }

  const fields = Object.entries(data).map(([key, val]) => ({
    title: key,
    value: typeof val === 'object' ? JSON.stringify(val) : String(val),
    short: true,
  }));

  const payload = {
    text: `*SAQYN Alert:* Event \`${event}\` triggered.`,
    attachments: [{ color: '#141F33', fields }],
  };

  try {
    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      console.error('Slack notification rejected:', await res.text());
      throw new Error('Slack notification rejected');
    }
    return res;
  } catch (err) {
    console.error('Slack notification failed:', err);
    throw err;
  }
}
