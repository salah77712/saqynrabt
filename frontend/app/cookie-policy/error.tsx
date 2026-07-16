'use client';

import { useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';
import { useLocale } from '../providers';

export default function CookieError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => { console.error(error); }, [error]);
  const { locale } = useLocale();
  const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';

  return (
    <div className="min-h-screen bg-[#F8F9FB] flex flex-col">
      <header className="sticky top-0 z-50 w-full border-b border-[#141F33]/10/80 bg-[#F8F9FB] backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-semibold text-[#F8F9FB]">S</div>
          <div className="ml-3">
            <p className="text-sm font-semibold tracking-[0.2em] text-primary">SAQYN RABT</p>
            <p className="text-[10px] uppercase tracking-[0.35em] text-[#141F33]">Connecting teams, automating workflows</p>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-4xl px-6 py-20 lg:px-8 w-full text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#141F33]"><AlertTriangle className="w-6 h-6 text-[#141F33]" /></div>
        <h1 className="text-2xl font-bold text-primary mb-2">{t({ en: 'Cookie policy unavailable', ar: 'سياسة ملفات تعريف الارتباط غير متوفرة' })}</h1>
        <p className="text-[#141F33] mb-2">{t({ en: "We couldn&apos;t load the cookie policy.", ar: 'تعذر تحميل سياسة ملفات تعريف الارتباط.' })}</p>
        <p className="text-sm text-[#141F33]/40 mb-8">{t({ en: 'Please try again.', ar: 'يرجى المحاولة مرة أخرى.' })}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button onClick={() => reset()} className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-[#F8F9FB] hover:opacity-90 transition-all focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2">{t({ en: 'Try again', ar: 'حاول مرة أخرى' })}</button>
          <a href="/" className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-[#141F33]/20 px-6 py-3 text-sm font-semibold text-primary hover:bg-[#F8F9FB] transition-all focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2">{t({ en: 'Back to Home', ar: 'العودة إلى الرئيسية' })}</a>
        </div>
      </main>
    </div>
  );
}
