'use client';

import Link from 'next/link';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { useLocale } from './providers';
import { Bug } from 'lucide-react';

const suggestions = [
  { href: '/', en: 'Homepage', ar: 'Ø§Ù„Ø±Ø¦ÙŠØ³ÙŠØ©' },
  { href: '/features', en: 'Features', ar: 'Ø§Ù„Ù…ÙŠØ²Ø§Øª' },
  { href: '/pricing', en: 'Pricing', ar: 'Ø§Ù„Ø£Ø³Ø¹Ø§Ø±' },
  { href: '/help/getting-started', en: 'Help Center', ar: 'Ù…Ø±ÙƒØ² Ø§Ù„Ù…Ø³Ø§Ø¹Ø¯Ø©' },
  { href: '/contact', en: 'Contact Us', ar: 'Ø§ØªØµÙ„ Ø¨Ù†Ø§' },
];

export default function NotFound() {
  const { locale } = useLocale();
  const t = (en: string, ar: string) => locale === 'ar' ? (ar || en) : en;

  return (
    <div
      className="bg-surface min-h-screen flex flex-col font-sans"
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
    >
      <Header />

      <main
        id="main-content"
        className="flex-1 flex items-center justify-center px-6 py-20"
      >
        <div className="text-center max-w-lg animate-slideUp">
          {/* Large 404 with gradient */}
          <div className="relative mb-8">
            <span className="text-[140px] lg:text-[180px] font-extrabold leading-none r    bg-clip-text text-transparent select-none">
              404
            </span>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="h-24 w-24 rounded-full bg-accent/10 animate-pulse-soft" />
            </div>
          </div>

          <h1 className="text-2xl md:text-3xl font-extrabold text-primary mb-3">
            {t('Page not found', 'Ø§Ù„ØµÙØ­Ø© ØºÙŠØ± Ù…ÙˆØ¬ÙˆØ¯Ø©')}
          </h1>

          <p className="text-primary/60 text-base mb-10 leading-relaxed max-w-md mx-auto">
            {t(
              "The page you're looking for doesn't exist or has been moved. Try one of these instead:",
              'Ø§Ù„ØµÙØ­Ø© Ø§Ù„ØªÙŠ ØªØ¨Ø­Ø« Ø¹Ù†Ù‡Ø§ ØºÙŠØ± Ù…ÙˆØ¬ÙˆØ¯Ø© Ø£Ùˆ ØªÙ… Ù†Ù‚Ù„Ù‡Ø§. Ø¬Ø±Ø¨ ÙˆØ§Ø­Ø¯Ø© Ù…Ù† Ù‡Ø°Ù‡ Ø¨Ø¯Ù„Ø§Ù‹ Ù…Ù† Ø°Ù„Ùƒ:'
            )}
          </p>

          {/* Suggestion Links */}
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            {suggestions.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="rounded-xl border border-[rgba(20,31,51,0.1)] bg-surface px-4 py-2.5 text-sm font-semibold text-primary hover:border-accent hover:bg-accent/5 hover:text-accent transition-all shadow-sm"
              >
                {t(s.en, s.ar)}
              </Link>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/"
              className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-primary px-8 py-3 text-sm font-bold text-surface hover:bg-primary hover:shadow-lg hover:scale-[1.02] active:scale-95 transition-all"
            >
              {t('Back to Home', 'Ø§Ù„Ø¹ÙˆØ¯Ø© Ù„Ù„Ø±Ø¦ÙŠØ³ÙŠØ©')}
            </Link>
            <button
              onClick={() => {
                window.location.href = `mailto:support@saqynrabt.com?subject=404%20Report&body=URL:${encodeURIComponent(window.location.href)}`;
              }}
              className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-[rgba(20,31,51,0.1)] px-6 py-3 text-sm font-semibold text-primary hover:bg-primary transition-all"
            >
              <Bug className="w-4 h-4" />
              {t('Report broken link', 'Ø§Ø¨Ù„Ø§Øº Ø¹Ù† Ø±Ø§Ø¨Ø· Ù…Ø¹Ø·Ù„')}
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}