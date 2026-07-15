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
  const token = window.Clerk ? await window.Clerk.session?.getToken() : null;
  await fetch('/api/audit/consent', {
  method: 'POST',
  headers: {
  'Content-Type': 'application/json',
  ...(token ? { Authorization: `Bearer ${token}` } : {}),
  },
  body: JSON.stringify({ consent }),
  });
} catch {
  // Silent fail — audit logging should never block UX
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
className={`fixed bottom-0 left-0 right-0 z-50 p-4 ${!visible ? 'hidden' : ''}`}
dir={locale === 'ar' ? 'rtl' : 'ltr'}
>
<div className="mx-auto max-w-4xl bg-[#F8F9FB] border border-[#141F33]/10 rounded-[40px] shadow-2xl p-8">
{!showPrefs ? (
<>
<div className="flex flex-col sm:flex-row items-start sm:items-center gap-8">
<div className="flex-1 text-sm text-[#141F33]/60 leading-relaxed">
<p className="font-bold text-[#141F33] mb-1">
{t({ en: 'We respect your privacy.', ar: 'نحن نحترم خصوصيتك.' })}
</p>
<p>
{t({
en: 'SAQYN RABT uses cookies to enhance your experience, secure your data, and analyze site traffic in compliance with global data protection standards. By clicking "Accept", you consent to our use of essential and analytics cookies.',
ar: 'يستخدم SAQYN RABT ملفات تعريف الارتباط لتحسين تجربتك وتأمين بياناتك وتحليل حركة مرور الموقع وفقًا لمعايير حماية البيانات العالمية. بالنقر على "قبول"، فإنك توافق على استخدامنا لملفات تعريف الارتباط الأساسية والتحليلية.',
})}
</p>
</div>
<div className="flex items-center gap-3 shrink-0 flex-wrap">
<button
type="button"
onClick={handleRejectNonEssential}
className="min-h-[44px] px-4 py-2.5 rounded-[40px] text-xs font-bold text-[#141F33]/50 hover:text-[#141F33] hover:underline transition-all"
>
{t({ en: 'Reject Non-Essential', ar: 'رفض غير الأساسي' })}
</button>
<button
type="button"
onClick={handleManagePrefs}
className="min-h-[44px] px-4 py-2.5 rounded-[40px] border border-[#141F33]/10 text-xs font-bold text-[#141F33] hover:bg-[#141F33] transition-all"
>
{t({ en: 'Manage Preferences', ar: 'إدارة التفضيلات' })}
</button>
<button
type="button"
onClick={handleAcceptAll}
className="min-h-[44px] px-6 py-2.5 rounded-[40px] bg-[#141F33] text-[#F8F9FB] text-xs font-bold hover:bg-[#141F33] transition-all"
>
{t({ en: 'Accept All', ar: 'قبول الكل' })}
</button>
</div>
</div>
</>
) : (
<div className="space-y-4">
<h3 className="text-sm font-bold text-[#141F33]">
{t({ en: 'Cookie Preferences', ar: 'تفضيلات ملفات تعريف الارتباط' })}
</h3>
<p className="text-xs text-[#141F33]/60">
{t({
en: 'You can choose which cookies to allow. Essential cookies are required for the platform to function.',
ar: 'يمكنك اختيار ملفات تعريف الارتباط التي تسمح بها. ملفات تعريف الارتباط الأساسية مطلوبة لكي تعمل المنصة.',
})}
</p>
<div className="space-y-2">
<label className="flex items-center gap-4 p-3 rounded-[40px] border border-[#141F33]/10 bg-[#F8F9FB]">
<input type="checkbox" checked disabled className="accent-[#141F33]" />
<div>
<p className="text-xs font-bold text-[#141F33]">
{t({ en: 'Essential Cookies', ar: 'ملفات تعريف الارتباط الأساسية' })}
</p>
<p className="text-xs text-[#141F33]/60">
{t({ en: 'Required for authentication (Clerk) and platform security. Cannot be disabled.', ar: 'مطلوبة للمصادقة (Clerk) وأمان المنصة. لا يمكن تعطيلها.' })}
</p>
</div>
</label>
<label className="flex items-center gap-4 p-3 rounded-[40px] border border-[#141F33]/10">
<input type="checkbox" defaultChecked className="accent-[#141F33]" id="analytics-cookies" />
<div>
<p className="text-xs font-bold text-[#141F33]">
{t({ en: 'Analytics Cookies', ar: 'ملفات تعريف الارتباط التحليلية' })}
</p>
<p className="text-xs text-[#141F33]/60">
{t({ en: 'Cloudflare Insights and Vercel Analytics for traffic monitoring.', ar: 'Cloudflare Insights و Vercel Analytics لمراقبة حركة المرور.' })}
</p>
</div>
</label>
</div>
<div className="flex items-center gap-3 justify-end">
<button
type="button"
onClick={() => setShowPrefs(false)}
className="min-h-[44px] px-4 py-2.5 rounded-[40px] border border-[#141F33]/10 text-xs font-bold text-[#141F33] hover:bg-[#141F33] transition-all"
>
{t({ en: 'Cancel', ar: 'إلغاء' })}
</button>
<button
type="button"
onClick={handleAcceptAll}
className="min-h-[44px] px-6 py-2.5 rounded-[40px] bg-[#141F33] text-[#F8F9FB] text-xs font-bold hover:bg-[#141F33] transition-all"
>
{t({ en: 'Save Preferences', ar: 'حفظ التفضيلات' })}
</button>
</div>
</div>
)}
</div>
</div>
);
}
