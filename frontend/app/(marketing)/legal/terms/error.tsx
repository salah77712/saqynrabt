'use client';

import { useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';
import { useT } from '@/lib/i18n';

export default function TermsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { t } = useT();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center px-6" dir="auto">
      <div className="text-center max-w-md">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary">
          <AlertTriangle className="w-6 h-6 text-surface" />
        </div>
        <h1 className="text-xl md:text-3xl font-bold text-primary mb-4 leading-snug">
          {t({ en: 'Something went wrong', ar: 'حدث خطأ غير متوقع' })}
        </h1>
        <p className="text-primary/60 mb-3 leading-relaxed">
          {t({ en: 'We encountered an unexpected error. Please try again, or return to the homepage.', ar: 'حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى أو العودة إلى الصفحة الرئيسية.' })}
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
            className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-primary/10 px-6 py-3 text-sm font-semibold text-primary hover:bg-primary transition-all"
          >
            {t({ en: 'Back to Home', ar: 'العودة للرئيسية' })}
          </a>
        </div>
      </div>
    </div>
  );
}
