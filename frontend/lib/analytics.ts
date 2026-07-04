export function trackEvent(eventName: string, params: Record<string, any> = {}) {
  // Safe abstraction for gtag, pixel or internal data logs
  console.log(`[Analytics] Track: ${eventName}`, params);
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, params);
  }
}
