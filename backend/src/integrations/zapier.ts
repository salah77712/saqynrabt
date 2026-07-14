export async function dispatchZapierWebhook(
  targetUrl: string,
  event: 'new_automation_request' | 'employee_pending' | 'overage_warning',
  payload: Record<string, unknown>
): Promise<Response> {
  if (!targetUrl || !targetUrl.startsWith('https://')) {
    throw new Error('Invalid or missing Zapier webhook URL');
  }
  if (!payload || typeof payload !== 'object') {
    throw new Error('Payload must be a non-null object');
  }

  try {
    const res = await fetch(targetUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event,
        timestamp: new Date().toISOString(),
        data: payload,
      }),
    });
    if (!res.ok) {
      console.error('Zapier webhook rejected:', await res.text());
      throw new Error('Zapier webhook rejected');
    }
    return res;
  } catch (err) {
    console.error('Zapier webhook dispatch failed:', err);
    throw err;
  }
}
