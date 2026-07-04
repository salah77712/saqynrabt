'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useLocale } from '../app/providers';

const navItems = [
  { href: '/features', en: 'Features', ar: 'الميزات' },
  { href: '/industries', en: 'Industries', ar: 'الصناعات' },
  { href: '/how-it-works', en: 'How It Works', ar: 'كيف يعمل' },
  { href: '/pricing', en: 'Pricing', ar: 'الأسعار' },
  { href: '/dashboard', en: 'Dashboard Demo', ar: 'عرض لوحة التحكم' },
];

export function MarketingHeader() {
  const pathname = usePathname();
  const { locale } = useLocale();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/saqynrabt/demo';
  const t = (en: string, ar: string) => (locale === 'ar' ? ar : en);

  const isActive = (href: string) => {
    return pathname === href || (href !== '/' && pathname.startsWith(href));
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label="SAQYN RABT home">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1A365D] text-sm font-semibold text-white shadow-sm">
            S
          </div>
          <div>
            <p className="text-sm font-semibold tracking-[0.2em] text-[#1A365D]">SAQYN RABT</p>
            <p className="text-[10px] uppercase tracking-[0.35em] text-slate-500">
              Private AI operations
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-medium transition-colors ${
                isActive(item.href)
                  ? 'text-[#1A365D]'
                  : 'text-slate-600 hover:text-[#1A365D]'
              }`}
            >
              {t(item.en, item.ar)}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <LanguageSwitcher />
          <a
            href={calendlyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-[#1A365D] px-5 py-2.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[#15304f]"
          >
            {t('Book a 15-Min Demo', 'احجز عرضًا لمدة 15 دقيقة')}
          </a>
        </div>

        <button
          type="button"
          onClick={() => setIsMenuOpen((value) => !value)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-700 md:hidden"
          aria-label="Toggle navigation"
        >
          <span className="text-lg">☰</span>
        </button>
      </div>

      {isMenuOpen && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-lg px-3 py-2 text-sm font-medium ${
                  isActive(item.href) ? 'bg-slate-100 text-[#1A365D]' : 'text-slate-700'
                }`}
              >
                {t(item.en, item.ar)}
              </Link>
            ))}
            <div className="mt-2 flex items-center justify-between gap-3">
              <LanguageSwitcher />
              <a
                href={calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[40px] items-center justify-center rounded-full bg-[#1A365D] px-4 py-2 text-sm font-semibold text-white"
              >
                {t('Book a Demo', 'احجز عرضًا')}
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
