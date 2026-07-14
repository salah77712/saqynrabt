export async function sendDiscordNotification(
  webhookUrl: string,
  event: string,
  data: any
) {
  const payload = {
    content: `📢 **SAQYN Event Alert: ${event}**`,
    embeds: [
      {
        title: 'Details',
        color: 2776319, // Hex color code converted to decimal (#2A5CFF)
        fields: Object.entries(data).map(([key, val]) => ({
          name: key,
          value: typeof val === 'object' ? JSON.stringify(val) : String(val),
          inline: true,
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
