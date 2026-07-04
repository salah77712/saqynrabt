export function initSentry() {
  const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;
  if (!dsn) {
    console.warn('Sentry DSN not found, skipping init.');
    return;
  }
  console.log('Sentry Initialized on Frontend client.');
}

export function setSentryContext(userId: string, companyId: string) {
  console.log(`[Sentry] Context Bind: user=${userId}, company=${companyId}`);
}
