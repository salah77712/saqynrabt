export async function sendDiscordNotification(
  webhookUrl: string,
  event: string,
  data: Record<string, unknown>
): Promise<Response> {
  if (!webhookUrl || !webhookUrl.startsWith('https://')) {
    throw new Error('Invalid or missing Discord webhook URL');
  }
  if (!event) {
    throw new Error('Event name is required');
  }
  if (!data || typeof data !== 'object') {
    throw new Error('Data payload must be a non-null object');
  }

  const fields = Object.entries(data).map(([key, val]) => ({
    name: key,
    value: typeof val === 'object' ? JSON.stringify(val) : String(val),
    inline: true,
  }));

  const payload = {
    content: `📢 **SAQYN Event Alert: ${event}**`,
    embeds: [{ title: 'Details', color: 2776319, fields }],
  };

  try {
    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      console.error('Discord notification rejected:', await res.text());
      throw new Error('Discord notification rejected');
    }
    return res;
  } catch (err) {
    console.error('Discord notification failed:', err);
    throw err;
  }
}
