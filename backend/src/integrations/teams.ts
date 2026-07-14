export async function sendTeamsNotification(
  webhookUrl: string,
  event: string,
  data: any
) {
  const payload = {
    '@type': 'MessageCard',
    '@context': 'http://schema.org/extensions',
    themeColor: '2A5CFF',
    summary: 'SAQYN RABT Teams Notification',
    sections: [
      {
        activityTitle: `SAQYN Alert: ${event}`,
        facts: Object.entries(data).map(([key, val]) => ({
          name: key,
          value: typeof val === 'object' ? JSON.stringify(val) : String(val),
        })),
        markdown: true,
      },
    ],
  };

  return fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
}
