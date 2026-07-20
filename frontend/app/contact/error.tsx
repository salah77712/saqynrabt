'use client';

import { useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';
import { useLocale } from '../providers';

export default function ContactError({
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
    <div className="min-h-screen bg-surface flex flex-col">
      <header className="sticky top-0 z-50 w-full border-b border-primary/10/80 bg-surface backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-semibold text-surface">S</div>
          <div className="ms-3">
            <p className="text-sm font-semibold tracking-[0.2em] text-primary">SAQYN RABT</p>
            <p className="text-xs uppercase tracking-[0.35em] text-primary">Private AI operations</p>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-4xl px-6 py-20 lg:px-8 w-full text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary"><AlertTriangle className="w-6 h-6 text-primary" /></div>
        <h1 className="text-2xl font-bold text-primary mb-2">{t({ en: 'Contact page unavailable', ar: 'ØµÙØ­Ø© Ø§Ù„Ø§ØªØµØ§Ù„ ØºÙŠØ± Ù…ØªÙˆÙØ±Ø©' })}</h1>
        <p className="text-primary mb-2">{t({ en: "We couldn&apos;t load the contact form.", ar: 'ØªØ¹Ø°Ø± ØªØ­Ù…ÙŠÙ„ Ù†Ù…ÙˆØ°Ø¬ Ø§Ù„Ø§ØªØµØ§Ù„.' })}</p>
        <p className="text-sm text-primary/40 mb-8">{t({ en: 'Please email us directly at saqynrabt@gmail.com while we fix this.', ar: 'ÙŠØ±Ø¬Ù‰ Ù…Ø±Ø§Ø³Ù„ØªÙ†Ø§ Ø¹Ù„Ù‰ Ø§Ù„Ø¨Ø±ÙŠØ¯ Ø§Ù„Ø¥Ù„ÙƒØªØ±ÙˆÙ†ÙŠ saqynrabt@gmail.com Ø¨ÙŠÙ†Ù…Ø§ Ù†Ù‚ÙˆÙ… Ø¨Ø¥ØµÙ„Ø§Ø­ Ù‡Ø°Ø§.' })}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button onClick={() => reset()} className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-surface hover:opacity-90 transition-all focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2">{t({ en: 'Try again', ar: 'Ø­Ø§ÙˆÙ„ Ù…Ø±Ø© Ø£Ø®Ø±Ù‰' })}</button>
          <a href="/" className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-primary/20 px-6 py-3 text-sm font-semibold text-primary hover:bg-surface transition-all focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2">{t({ en: 'Back to Home', ar: 'Ø§Ù„Ø¹ÙˆØ¯Ø© Ø¥Ù„Ù‰ Ø§Ù„Ø±Ø¦ÙŠØ³ÙŠØ©' })}</a>
        </div>
      </main>
    </div>
  );
}
