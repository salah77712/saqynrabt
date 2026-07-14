'use client';

import { useEffect, useState } from 'react';

function getCookieConsent(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem('cookie_consent_accepted') === 'accepted';
}

/**
 * AnalyticsGate conditionally loads third-party analytics and tracking scripts
 * only after the user has accepted cookies, as required by applicable privacy regulations.
 *
 * This runs as a client component in <head> to prevent tracking before consent.
 */
export function AnalyticsGate() {
  const [consented, setConsented] = useState(false);

  useEffect(() => {
    setConsented(getCookieConsent());

    const handler = (e: CustomEvent) => {
      setConsented(e.detail === 'accepted');
    };
    window.addEventListener('cookie-consent-changed', handler as EventListener);
    return () => window.removeEventListener('cookie-consent-changed', handler as EventListener);
  }, []);

  useEffect(() => {
    if (!consented) return;

    // Load Cloudflare Insights beacon
    const existing = document.querySelector('script[data-cf-beacon]');
    if (!existing) {
      const script = document.createElement('script');
      script.setAttribute('data-cf-beacon', '');
      script.setAttribute('data-cf-beacon-key', '');
      script.defer = true;
      script.src = 'https://static.cloudflareinsights.com/beacon.min.js';
      script.setAttribute('data-cf-nonce', '');
      document.head.appendChild(script);
    }
  }, [consented]);

  return null;
}
