export async function dispatchZapierWebhook(
  targetUrl: string,
  event: 'new_automation_request' | 'employee_pending' | 'overage_warning',
  payload: Record<string, any>
) {
  return fetch(targetUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      event,
      timestamp: new Date().toISOString(),
      data: payload,
    }),
  });
}
