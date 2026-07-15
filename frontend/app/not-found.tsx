'use client';

import Link from 'next/link';
import { Header } from '../components/Header';
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
  const t = (en: string, ar: string) => locale === 'ar' ? (ar || en) : en;

  return (
    <div
      className="bg-[#F8F9FB] min-h-screen flex flex-col font-sans"
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
              <div className="h-24 w-24 rounded-full bg-[#2A5CFF]/10 animate-pulse-soft" />
            </div>
          </div>

          <h1 className="text-2xl md:text-3xl font-extrabold text-[#141F33] mb-3">
            {t('Page not found', 'الصفحة غير موجودة')}
          </h1>

          <p className="text-[#141F33]/60 text-base mb-10 leading-relaxed max-w-md mx-auto">
            {t(
              "The page you're looking for doesn't exist or has been moved. Try one of these instead:",
              'الصفحة التي تبحث عنها غير موجودة أو تم نقلها. جرب واحدة من هذه بدلاً من ذلك:'
            )}
          </p>

          {/* Suggestion Links */}
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            {suggestions.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="rounded-[40px] border border-[rgba(20,31,51,0.1)] bg-[#F8F9FB] px-4 py-2.5 text-sm font-semibold text-[#141F33] hover:border-[#2A5CFF] hover:bg-[#2A5CFF]/5 hover:text-[#2A5CFF] transition-all shadow-sm"
              >
                {t(s.en, s.ar)}
              </Link>
            ))}
          </div>

          {/* Primary CTA */}
          <Link
            href="/"
            className="inline-flex min-h-[48px] items-center justify-center rounded-[40px] bg-[#141F33] px-8 py-3 text-sm font-bold text-[#F8F9FB] hover:bg-[#141F33] hover:shadow-lg hover:scale-[1.02] active:scale-95 transition-all"
          >
            {t('Back to Home', 'العودة للرئيسية')}
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}