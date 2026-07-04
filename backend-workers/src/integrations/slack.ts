export async function sendSlackNotification(
  webhookUrl: string,
  event: string,
  data: any
) {
  const payload = {
    text: `*SAQYN Alert:* Event \`${event}\` triggered.`,
    attachments: [
      {
        color: '#141F33',
        fields: Object.entries(data).map(([key, val]) => ({
          title: key,
          value: typeof val === 'object' ? JSON.stringify(val) : String(val),
          short: true,
        })),
      },
    ],
  };

  return fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
}
