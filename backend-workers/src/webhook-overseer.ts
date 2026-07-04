/**
 * Outgoing Webhook Retry Overseer with Exponential Backoff
 */
export async function dispatchWebhookWithRetry(
  url: string,
  event: string,
  payload: any,
  maxAttempts = 5
): Promise<boolean> {
  let attempt = 1;
  let delay = 1000; // start with 1 second delay

  while (attempt <= maxAttempts) {
    try {
      console.log(`[Webhook Overseer] Sending ${event} to ${url}. Attempt ${attempt}/${maxAttempts}`);
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Saqyn-Signature': `sha256=${Math.random().toString(36).substring(2, 18)}`
        },
        body: JSON.stringify({
          event,
          payload,
          timestamp: new Date().toISOString(),
          attempt
        })
      });

      if (res.status >= 200 && res.status < 300) {
        console.log(`[Webhook Overseer] Delivery successful for ${url}`);
        return true;
      }
    } catch (err) {
      console.error(`[Webhook Overseer] Connection failed on attempt ${attempt}:`, err);
    }

    // Exponential Backoff
    attempt++;
    if (attempt <= maxAttempts) {
      console.log(`[Webhook Overseer] Retrying in ${delay}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));
      delay *= 2; // double the delay time
    }
  }

  console.error(`[Webhook Overseer] Delivery failed after ${maxAttempts} attempts for ${url}`);
  return false;
}
