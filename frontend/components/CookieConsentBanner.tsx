'use client';

import { useState, useEffect, useCallback } from 'react';
import { useLocale } from '../app/providers';

const COOKIE_CONSENT_KEY = 'cookie_consent_accepted';

type ConsentStatus = 'accepted' | 'declined' | null;

export function CookieConsentBanner() {
const { locale } = useLocale();
const [consent, setConsent] = useState<ConsentStatus>(null);
const [visible, setVisible] = useState(false);
const [showPrefs, setShowPrefs] = useState(false);

const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';

useEffect(() => {
const stored = localStorage.getItem(COOKIE_CONSENT_KEY) as ConsentStatus;
if (!stored) {
  const timer = setTimeout(() => setVisible(true), 1000);
  return () => clearTimeout(timer);
}
setConsent(stored);
}, []);

useEffect(() => {
if (consent === 'accepted') {
  document.cookie = `${COOKIE_CONSENT_KEY}=accepted; path=/; max-age=31536000; SameSite=Lax; Secure`;
  window.dispatchEvent(new CustomEvent('cookie-consent-changed', { detail: 'accepted' }));
} else if (consent === 'declined') {
  document.cookie = `${COOKIE_CONSENT_KEY}=declined; path=/; max-age=31536000; SameSite=Lax; Secure`;
  window.dispatchEvent(new CustomEvent('cookie-consent-changed', { detail: 'declined' }));
}
}, [consent]);

const recordConsentAudit = async (consent: 'accepted' | 'declined') => {
try {
  const clerk = (window as any).Clerk;
  const token = clerk ? await clerk.session?.getToken() : null;
  await fetch('/api/audit/consent', {
  method: 'POST',
  headers: {
  'Content-Type': 'application/json',
  ...(token ? { Authorization: `Bearer ${token}` } : {}),
  },
  body: JSON.stringify({ consent }),
  });
} catch {
  // Silent fail â€” audit logging should never block UX
}
};

const handleAcceptAll = useCallback(() => {
localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted');
setConsent('accepted');
setVisible(false);
setShowPrefs(false);
recordConsentAudit('accepted');
}, []);

const handleRejectNonEssential = useCallback(() => {
localStorage.setItem(COOKIE_CONSENT_KEY, 'declined');
setConsent('declined');
setVisible(false);
setShowPrefs(false);
recordConsentAudit('declined');
}, []);

const handleManagePrefs = useCallback(() => {
setShowPrefs(true);
}, []);

if (!visible && !showPrefs) return null;

const bannerId = 'cookie-consent-banner';

return (
<div
id={bannerId}
className={`fixed bottom-0 start-0 end-0 z-50 p-4 ${!visible ? 'hidden' : ''}`}
dir={locale === 'ar' ? 'rtl' : 'ltr'}
>
<div className="mx-auto max-w-4xl bg-surface dark:bg-primary border border-primary/10 dark:border-surface/10 rounded-xl shadow-2xl p-8">
{!showPrefs ? (
<>
<div className="flex flex-col sm:flex-row items-start sm:items-center gap-8">
<div className="flex-1 text-sm text-primary/60 dark:text-surface/60 leading-relaxed">
<p className="font-bold text-primary dark:text-surface mb-1">
{t({ en: 'We respect your privacy.', ar: 'Ù†Ø­Ù† Ù†Ø­ØªØ±Ù… Ø®ØµÙˆØµÙŠØªÙƒ.' })}
</p>
<p>
{t({
en: 'SAQYN RABT uses cookies to enhance your experience, secure your data, and analyze site traffic in compliance with global data protection standards. By clicking "Accept", you consent to our use of essential and analytics cookies.',
ar: 'ÙŠØ³ØªØ®Ø¯Ù… SAQYN RABT Ù…Ù„ÙØ§Øª ØªØ¹Ø±ÙŠÙ Ø§Ù„Ø§Ø±ØªØ¨Ø§Ø· Ù„ØªØ­Ø³ÙŠÙ† ØªØ¬Ø±Ø¨ØªÙƒ ÙˆØªØ£Ù…ÙŠÙ† Ø¨ÙŠØ§Ù†Ø§ØªÙƒ ÙˆØªØ­Ù„ÙŠÙ„ Ø­Ø±ÙƒØ© Ù…Ø±ÙˆØ± Ø§Ù„Ù…ÙˆÙ‚Ø¹ ÙˆÙÙ‚Ù‹Ø§ Ù„Ù…Ø¹Ø§ÙŠÙŠØ± Ø­Ù…Ø§ÙŠØ© Ø§Ù„Ø¨ÙŠØ§Ù†Ø§Øª Ø§Ù„Ø¹Ø§Ù„Ù…ÙŠØ©. Ø¨Ø§Ù„Ù†Ù‚Ø± Ø¹Ù„Ù‰ "Ù‚Ø¨ÙˆÙ„"ØŒ ÙØ¥Ù†Ùƒ ØªÙˆØ§ÙÙ‚ Ø¹Ù„Ù‰ Ø§Ø³ØªØ®Ø¯Ø§Ù…Ù†Ø§ Ù„Ù…Ù„ÙØ§Øª ØªØ¹Ø±ÙŠÙ Ø§Ù„Ø§Ø±ØªØ¨Ø§Ø· Ø§Ù„Ø£Ø³Ø§Ø³ÙŠØ© ÙˆØ§Ù„ØªØ­Ù„ÙŠÙ„ÙŠØ©.',
})}
</p>
</div>
<div className="flex items-center gap-3 shrink-0 flex-wrap">
<button
type="button"
onClick={handleRejectNonEssential}
className="min-h-[44px] px-4 py-2.5 rounded-xl text-xs font-bold text-primary/50 dark:text-surface/50 hover:text-primary dark:hover:text-accent hover:underline transition-all"
>
{t({ en: 'Reject Non-Essential', ar: 'Ø±ÙØ¶ ØºÙŠØ± Ø§Ù„Ø£Ø³Ø§Ø³ÙŠ' })}
</button>
<button
type="button"
onClick={handleManagePrefs}
className="min-h-[44px] px-4 py-2.5 rounded-xl border border-primary/10 dark:border-surface/10 text-xs font-bold text-primary dark:text-surface hover:bg-primary dark:hover:bg-accent transition-all"
>
{t({ en: 'Manage Preferences', ar: 'Ø¥Ø¯Ø§Ø±Ø© Ø§Ù„ØªÙØ¶ÙŠÙ„Ø§Øª' })}
</button>
<button
type="button"
onClick={handleAcceptAll}
className="min-h-[44px] px-6 py-2.5 rounded-xl bg-primary text-surface text-xs font-bold hover:bg-primary transition-all"
>
{t({ en: 'Accept All', ar: 'Ù‚Ø¨ÙˆÙ„ Ø§Ù„ÙƒÙ„' })}
</button>
</div>
</div>
</>
) : (
<div className="space-y-4">
<h3 className="text-sm font-bold text-primary dark:text-surface">
{t({ en: 'Cookie Preferences', ar: 'ØªÙØ¶ÙŠÙ„Ø§Øª Ù…Ù„ÙØ§Øª ØªØ¹Ø±ÙŠÙ Ø§Ù„Ø§Ø±ØªØ¨Ø§Ø·' })}
</h3>
<p className="text-xs text-primary/60 dark:text-surface/60">
{t({
en: 'You can choose which cookies to allow. Essential cookies are required for the platform to function.',
ar: 'ÙŠÙ…ÙƒÙ†Ùƒ Ø§Ø®ØªÙŠØ§Ø± Ù…Ù„ÙØ§Øª ØªØ¹Ø±ÙŠÙ Ø§Ù„Ø§Ø±ØªØ¨Ø§Ø· Ø§Ù„ØªÙŠ ØªØ³Ù…Ø­ Ø¨Ù‡Ø§. Ù…Ù„ÙØ§Øª ØªØ¹Ø±ÙŠÙ Ø§Ù„Ø§Ø±ØªØ¨Ø§Ø· Ø§Ù„Ø£Ø³Ø§Ø³ÙŠØ© Ù…Ø·Ù„ÙˆØ¨Ø© Ù„ÙƒÙŠ ØªØ¹Ù…Ù„ Ø§Ù„Ù…Ù†ØµØ©.',
})}
</p>
<div className="space-y-2">
<label className="flex items-center gap-4 p-3 rounded-xl border border-primary/10 dark:border-surface/10 bg-surface dark:bg-primary">
<input type="checkbox" checked disabled className="accent-primary" />
<div>
<p className="text-xs font-bold text-primary dark:text-surface">
{t({ en: 'Essential Cookies', ar: 'Ù…Ù„ÙØ§Øª ØªØ¹Ø±ÙŠÙ Ø§Ù„Ø§Ø±ØªØ¨Ø§Ø· Ø§Ù„Ø£Ø³Ø§Ø³ÙŠØ©' })}
</p>
<p className="text-xs text-primary/60 dark:text-surface/60">
{t({ en: 'Required for authentication (Clerk) and platform security. Cannot be disabled.', ar: 'Ù…Ø·Ù„ÙˆØ¨Ø© Ù„Ù„Ù…ØµØ§Ø¯Ù‚Ø© (Clerk) ÙˆØ£Ù…Ø§Ù† Ø§Ù„Ù…Ù†ØµØ©. Ù„Ø§ ÙŠÙ…ÙƒÙ† ØªØ¹Ø·ÙŠÙ„Ù‡Ø§.' })}
</p>
</div>
</label>
<label className="flex items-center gap-4 p-3 rounded-xl border border-primary/10 dark:border-surface/10">
<input type="checkbox" defaultChecked className="accent-primary" id="analytics-cookies" />
<div>
<p className="text-xs font-bold text-primary dark:text-surface">
{t({ en: 'Analytics Cookies', ar: 'Ù…Ù„ÙØ§Øª ØªØ¹Ø±ÙŠÙ Ø§Ù„Ø§Ø±ØªØ¨Ø§Ø· Ø§Ù„ØªØ­Ù„ÙŠÙ„ÙŠØ©' })}
</p>
<p className="text-xs text-primary/60 dark:text-surface/60">
{t({ en: 'Cloudflare Insights and Vercel Analytics for traffic monitoring.', ar: 'Cloudflare Insights Ùˆ Vercel Analytics Ù„Ù…Ø±Ø§Ù‚Ø¨Ø© Ø­Ø±ÙƒØ© Ø§Ù„Ù…Ø±ÙˆØ±.' })}
</p>
</div>
</label>
</div>
<div className="flex items-center gap-3 justify-end">
<button
type="button"
onClick={() => setShowPrefs(false)}
className="min-h-[44px] px-4 py-2.5 rounded-xl border border-primary/10 dark:border-surface/10 text-xs font-bold text-primary dark:text-surface hover:bg-primary dark:hover:bg-accent transition-all"
>
{t({ en: 'Cancel', ar: 'Ø¥Ù„ØºØ§Ø¡' })}
</button>
<button
type="button"
onClick={handleAcceptAll}
className="min-h-[44px] px-6 py-2.5 rounded-xl bg-primary text-surface text-xs font-bold hover:bg-primary transition-all"
>
{t({ en: 'Save Preferences', ar: 'Ø­ÙØ¸ Ø§Ù„ØªÙØ¶ÙŠÙ„Ø§Øª' })}
</button>
</div>
</div>
)}
</div>
</div>
);
}
