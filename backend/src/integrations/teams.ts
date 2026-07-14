export async function sendTeamsNotification(
  webhookUrl: string,
  event: string,
  data: Record<string, unknown>
): Promise<Response> {
  if (!webhookUrl || !webhookUrl.startsWith('https://')) {
    throw new Error('Invalid or missing Teams webhook URL');
  }
  if (!event) {
    throw new Error('Event name is required');
  }
  if (!data || typeof data !== 'object') {
    throw new Error('Data payload must be a non-null object');
  }

  const facts = Object.entries(data).map(([key, val]) => ({
    name: key,
    value: typeof val === 'object' ? JSON.stringify(val) : String(val),
  }));

  const payload = {
    '@type': 'MessageCard',
    '@context': 'http://schema.org/extensions',
    themeColor: '2A5CFF',
    summary: 'SAQYN RABT Teams Notification',
    sections: [{ activityTitle: `SAQYN Alert: ${event}`, facts, markdown: true }],
  };

  try {
    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      console.error('Teams notification rejected:', await res.text());
      throw new Error('Teams notification rejected');
    }
    return res;
  } catch (err) {
    console.error('Teams notification failed:', err);
    throw err;
  }
}
