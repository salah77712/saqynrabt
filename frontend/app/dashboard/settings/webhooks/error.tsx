'use client';

import { useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';
import { useLocale } from '../../../providers';

export default function WebhooksError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const { locale } = useLocale();
  const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';

  return (
    <div className="flex items-center justify-center py-20">
      <div className="text-center max-w-md">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-surface">
          <AlertTriangle className="w-6 h-6 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-primary mb-3">{t({ en: 'Something hiccupped', ar: 'حدث خطأ غير متوقع' })}</h2>
        <p className="text-primary mb-8 leading-relaxed">
          {t({ en: "This section didn't load properly. Don't worry — your data hasn't gone anywhere.", ar: 'يرجى المحاولة مرة أخرى أو العودة إلى لوحة التحكم.' })}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-surface hover:opacity-90 transition-all focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
          >
            {t({ en: 'Try again', ar: 'حاول مرة أخرى' })}
          </button>
          <a
            href="/dashboard"
            className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-primary/10 px-6 py-3 text-sm font-semibold text-primary hover:bg-primary transition-all"
          >
            {t({ en: 'Back to Dashboard', ar: 'العودة للوحة التحكم' })}
          </a>
        </div>
      </div>
    </div>
  );
}