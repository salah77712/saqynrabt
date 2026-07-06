'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLocale } from '../app/providers';

const COOKIE_CONSENT_KEY = 'saqyn-cookie-consent';

type ConsentStatus = 'accepted' | 'declined' | null;

export function CookieConsentBanner() {
  const { locale } = useLocale();
  const [consent, setConsent] = useState<ConsentStatus>(null);
  const [visible, setVisible] = useState(false);

  const t = (obj: { en: string; ar: string }) => locale === 'ar' ? obj.ar : obj.en;

  useEffect(() => {
    const stored = localStorage.getItem(COOKIE_CONSENT_KEY) as ConsentStatus;
    if (!stored) {
      const timer = setTimeout(() => setVisible(true), 1000);
      return () => clearTimeout(timer);
    }
    setConsent(stored);
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted');
    setConsent('accepted');
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'declined');
    setConsent('declined');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-slideUp">
      <div className="mx-auto max-w-3xl bg-white border border-gray-200 rounded-2xl shadow-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
        <div className="flex-1 text-xs text-[#718096] leading-relaxed">
          <span className="font-bold text-[#141F33]">
            {t({ en: '🍪 We value your privacy.', ar: '🍪 نحن نقدر خصوصيتك.' })}
          </span>{' '}
          {t({
            en: 'We use cookies to improve your experience and understand site traffic. By clicking "Accept", you consent to our use of cookies.',
            ar: 'نستخدم ملفات تعريف الارتباط لتحسين تجربتك وفهم حركة المرور على الموقع. بالنقر على "قبول"، فإنك توافق على استخدامنا لملفات تعريف الارتباط.',
          })}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Link
            href="/cookie-policy"
            className="text-[10px] font-bold text-[#2A5CFF] hover:underline underline-offset-2 min-h-[44px] inline-flex items-center px-3"
          >
            {t({ en: 'Learn more', ar: 'اعرف المزيد' })}
          </Link>
          <button
            type="button"
            onClick={handleDecline}
            className="min-h-[44px] px-4 py-2 rounded-xl border border-gray-200 text-xs font-bold text-[#718096] hover:bg-gray-50 transition-all"
          >
            {t({ en: 'Decline', ar: 'رفض' })}
          </button>
          <button
            type="button"
            onClick={handleAccept}
            className="min-h-[44px] px-5 py-2 rounded-xl bg-[#141F33] text-white text-xs font-bold hover:bg-[#141F33]/90 transition-all"
          >
            {t({ en: 'Accept', ar: 'قبول' })}
          </button>
        </div>
      </div>
    </div>
  );
}
