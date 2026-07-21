'use client';

import { useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';
import { useLocale } from '../providers';

export default function MarketingError({
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
    <div className="min-h-screen bg-surface flex flex-col">
      <header className="sticky top-0 z-50 w-full border-b border-primary/10 bg-surface backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-semibold text-surface">
              S
            </div>
            <div>
              <p className="text-sm font-semibold tracking-[0.2em] text-primary">SAQYN RABT</p>
              <p className="text-xs uppercase tracking-[0.35em] text-primary">Private AI operations</p>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center px-6">
        <div className="text-center max-w-md">
<div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-surface border border-primary/10"><AlertTriangle className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-xl md:text-3xl font-bold text-primary mb-3">{t({ en: 'Something went wrong', ar: 'حدث خطأ غير متوقع' })}</h1>
          <p className="text-sm text-primary mb-8 leading-relaxed">
            {t({ en: 'We encountered an error loading this page. Please try again.', ar: 'يرجى المحاولة مرة أخرى أو العودة إلى الصفحة الرئيسية.' })}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => reset()}
              className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-surface hover:opacity-90 transition-all focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
            >
              {t({ en: 'Try again', ar: 'حاول مرة أخرى' })}
            </button>
            <a
              href="/"
              className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-primary/10 px-6 py-3 text-sm font-semibold text-primary hover:bg-surface transition-all focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
            >
              {t({ en: 'Back to Home', ar: 'العودة إلى الرئيسية' })}
            </a>
          </div>
          {error.digest && (
            <p className="mt-6 text-xs text-primary font-mono">{t({ en: 'Error ID:', ar: 'معرف الخطأ:' })} {error.digest}</p>
          )}
        </div>
      </div>
    </div>
  );
}
