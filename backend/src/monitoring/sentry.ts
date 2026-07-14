export function captureException(error: Error, request: Request, env: any) {
  const dsn = env.SENTRY_DSN;
  if (!dsn) {
    console.error('EdgeException:', error);
    return;
  }
  // Simplified edge worker payload post
  fetch(dsn, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message: error.message,
      stack: error.stack,
      url: request.url,
      timestamp: Date.now(),
    }),
  }).catch((err) => console.error('Sentry POST failed:', err));
}
