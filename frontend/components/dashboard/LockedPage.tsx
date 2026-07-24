'use client';

import { Lock, AlertTriangle } from 'lucide-react';
import { useLocale } from '../../app/providers';

interface LockedPageProps {
  reason: 'plan' | 'role';
  userRole: string;
}

export function LockedPage({ reason, userRole }: LockedPageProps) {
  const { locale } = useLocale();
  const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';

  if (reason === 'plan' && userRole === 'admin') {
    return (
      <div className="py-12 flex flex-col items-center justify-center text-center bg-surface border border-primary/10 rounded-xl shadow-sm p-8">
        <Lock className="w-10 h-10 text-primary mb-4" />
        <h2 className="text-lg font-extrabold text-primary">
          {t({ en: 'Module Not in Plan', ar: 'الوحدة غير مشمولة في خطتك' })}
        </h2>
        <p className="text-xs text-primary font-semibold mt-1 max-w-sm">
          {t({ en: 'This module is not included in your current plan. Book a free demo call to enable it.', ar: 'هذه الوحدة غير مشمولة في خطتك الحالية. احجز مكالمة تجريبية مجانية لتفعيلها.' })}
        </p>
        <a
          href="https://saqynrabt.com/contact"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 px-6 py-3 rounded-xl text-xs font-bold min-h-[44px] transition-all duration-300 hover:shadow-md hover:scale-[1.02] active:scale-95 bg-primary text-surface inline-flex items-center gap-2"
        >
          {t({ en: 'Book a Free Demo Call', ar: 'احجز مكالمة تجريبية مجانية' })}
        </a>
      </div>
    );
  }

  return (
    <div className="py-12 flex flex-col items-center justify-center text-center bg-surface border border-primary/10 rounded-xl shadow-sm p-8">
      <AlertTriangle className="w-10 h-10 text-primary mb-4" />
      <h2 className="text-lg font-extrabold text-primary">
        {t({ en: 'Access Restricted', ar: 'الوصول مقيد' })}
      </h2>
      <p className="text-xs text-primary font-semibold mt-1 max-w-sm">
        {t({ en: 'This module is not available for your account. Contact your admin.', ar: 'هذه الوحدة غير متاحة لحسابك. تواصل مع المسؤول.' })}
      </p>
    </div>
  );
}
