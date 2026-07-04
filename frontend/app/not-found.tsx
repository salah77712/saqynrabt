'use client';

import Link from 'next/link';
import { MarketingHeader } from '../components/MarketingHeader';
import { Footer } from '../components/Footer';
import { useLocale } from './providers';

const suggestions = [
  { href: '/', en: 'Homepage', ar: 'الرئيسية' },
  { href: '/features', en: 'Features', ar: 'الميزات' },
  { href: '/pricing', en: 'Pricing', ar: 'الأسعار' },
  { href: '/help/getting-started', en: 'Help Center', ar: 'مركز المساعدة' },
  { href: '/contact', en: 'Contact Us', ar: 'اتصل بنا' },
];

export default function NotFound() {
  const { locale } = useLocale();
  const t = (en: string, ar: string) => (locale === 'ar' ? ar : en);

  return (
    <div
      className="bg-surface min-h-screen flex flex-col font-sans"
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
    >
      <MarketingHeader />

      <main
        id="main-content"
        className="flex-1 flex items-center justify-center px-6 py-20"
      >
        <div className="text-center max-w-lg animate-slideUp">
          {/* Large 404 with gradient */}
          <div className="relative mb-8">
            <span className="text-[140px] lg:text-[180px] font-extrabold leading-none bg-gradient-to-br from-navy via-royal to-navy bg-clip-text text-transparent select-none">
              404
            </span>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="h-24 w-24 rounded-full bg-royal/10 animate-pulse-soft" />
            </div>
          </div>

          <h1 className="text-2xl md:text-3xl font-extrabold text-navy mb-3">
            {t('Page not found', 'الصفحة غير موجودة')}
          </h1>

          <p className="text-muted text-base mb-10 leading-relaxed max-w-md mx-auto">
            {t(
              "The page you're looking for doesn't exist or has been moved. Try one of these instead:",
              'الصفحة التي تبحث عنها غير موجودة أو تم نقلها. جرب واحدة من هذه بدلاً من ذلك:'
            )}
          </p>

          {/* Suggestion Links */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {suggestions.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-navy hover:border-royal hover:bg-royal/5 hover:text-royal transition-all shadow-sm"
              >
                {t(s.en, s.ar)}
              </Link>
            ))}
          </div>

          {/* Primary CTA */}
          <Link
            href="/"
            className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-navy px-8 py-3 text-sm font-bold text-white hover:bg-navy/90 hover:shadow-lg hover:scale-[1.02] active:scale-95 transition-all"
          >
            {t('Back to Home', 'العودة للرئيسية')}
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
