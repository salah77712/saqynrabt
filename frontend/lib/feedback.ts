/**
 * Client side helper to log rating feedback logs to PostgreSQL
 */
export async function sendChatMessageFeedback(
  chatMessageId: string,
  rating: number,
  comment: string,
  _token?: string
): Promise<boolean> {
  try {
    const response = await fetch('/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
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
