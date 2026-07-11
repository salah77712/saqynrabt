/**
 * Outgoing Webhook Retry Overseer with Exponential Backoff
 */
export async function dispatchWebhookWithRetry(
  url: string,
  event: string,
  payload: any,
  maxAttempts = 5,
  signingSecret = ''
): Promise<boolean> {
  let attempt = 1;
  let delay = 1000; // start with 1 second delay

  while (attempt <= maxAttempts) {
    try {
      console.log(`[Webhook Overseer] Sending ${event} to ${url}. Attempt ${attempt}/${maxAttempts}`);
      const encoder = new TextEncoder();
      const payloadStr = JSON.stringify({ event, payload, timestamp: new Date().toISOString(), attempt });
      let signature = '';
      if (signingSecret) {
        const key = await crypto.subtle.importKey('raw', encoder.encode(signingSecret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
        const sigBuffer = await crypto.subtle.sign('HMAC', key, encoder.encode(payloadStr));
        const sigArray = Array.from(new Uint8Array(sigBuffer));
        signature = sigArray.map(b => b.toString(16).padStart(2, '0')).join('');
      }
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Saqyn-Signature': signature ? `sha256=${signature}` : '',
        },
        body: payloadStr,
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
