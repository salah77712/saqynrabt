/**
 * Client side helper to log rating feedback logs to PostgreSQL
 */
export async function sendChatMessageFeedback(
  chatMessageId: string,
  rating: number,
  comment: string,
  token?: string
): Promise<boolean> {
  try {
    const apiBase = process.env.NEXT_PUBLIC_API_URL || '';
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${apiBase}/api/feedback`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        chat_message_id: chatMessageId,
        rating,
        comment,
      }),
    });

    return response.ok;
  } catch (err) {
    console.error('Failed to dispatch rating log telemetry:', err);
    return false;
  }
}
