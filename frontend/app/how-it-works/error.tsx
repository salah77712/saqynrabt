'use client';

import { useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';
import { useLocale } from '../providers';

export default function HowItWorksError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error(error); }, [error]);
  const { locale } = useLocale();
  const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';
  return (
    <div className="bg-surface text-primary min-h-screen flex flex-col font-sans">
      <header className="sticky top-0 z-50 w-full border-b border-primary/10/80 bg-surface backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-semibold text-surface">S</div>
          <div className="ms-3"><p className="text-sm font-semibold tracking-[0.2em] text-primary">SAQYN RABT</p><p className="text-xs uppercase tracking-[0.35em] text-primary">Connecting teams, automating workflows</p></div>
        </div>
      </header>
      <div className="flex-1 flex items-center justify-center px-6 py-20">
        <div className="text-center max-w-md">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-surface"><AlertTriangle className="w-6 h-6 text-primary" /></div>
          <h1 className="text-2xl font-bold text-primary mb-2">{t({ en: 'How it works unavailable', ar: 'ØµÙØ­Ø© ÙƒÙŠÙ ÙŠØ¹Ù…Ù„ ØºÙŠØ± Ù…ØªÙˆÙØ±Ø©' })}</h1>
          <p className="text-primary mb-8">{t({ en: "We couldn&apos;t load this page. Please try again.", ar: 'ØªØ¹Ø°Ø± ØªØ­Ù…ÙŠÙ„ Ù‡Ø°Ù‡ Ø§Ù„ØµÙØ­Ø©. ÙŠØ±Ø¬Ù‰ Ø§Ù„Ù…Ø­Ø§ÙˆÙ„Ø© Ù…Ø±Ø© Ø£Ø®Ø±Ù‰.' })}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => reset()} className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-surface hover:opacity-90 transition-all focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2">{t({ en: 'Try again', ar: 'Ø­Ø§ÙˆÙ„ Ù…Ø±Ø© Ø£Ø®Ø±Ù‰' })}</button>
            <a href="/" className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-primary/10 px-6 py-3 text-sm font-semibold text-primary hover:bg-surface transition-all focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2">{t({ en: 'Back to Home', ar: 'Ø§Ù„Ø¹ÙˆØ¯Ø© Ø¥Ù„Ù‰ Ø§Ù„Ø±Ø¦ÙŠØ³ÙŠØ©' })}</a>
          </div>
        </div>
      </div>
    </div>
  );
}
