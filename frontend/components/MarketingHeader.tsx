'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import { LanguageSwitcher } from './LanguageSwitcher';
import { DarkModeToggle } from './DarkModeToggle';
import { useLocale } from '../app/providers';
import { SearchOverlay } from './SearchOverlay';

const navItems = [
  { href: '/features', en: 'Features', ar: 'الميزات' },
  { href: '/industries', en: 'Industries', ar: 'الصناعات' },
  { href: '/how-it-works', en: 'How It Works', ar: 'كيف يعمل' },
  { href: '/pricing', en: 'Pricing', ar: 'الأسعار' },
  { href: '/dashboard', en: 'Dashboard Demo', ar: 'عرض لوحة التحكم' },
];

const moreLinks = [
  { href: '/about', en: 'About', ar: 'عنا' },
  { href: '/case-studies', en: 'Case Studies', ar: 'دراسات الحالة' },
  { href: '/faq', en: 'FAQ', ar: 'الأسئلة الشائعة' },
  { href: '/contact', en: 'Contact', ar: 'اتصل بنا' },
  { href: '/help/getting-started', en: 'Help Center', ar: 'مركز المساعدة' },
  { href: '/developers', en: 'Developers', ar: 'المطورين' },
  { href: '/changelog', en: 'Changelog', ar: 'سجل التغييرات' },
];

export function MarketingHeader() {
  const pathname = usePathname();
  const { locale } = useLocale();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const t = (en: string, ar: string) => (locale === 'ar' ? ar : en);

  // Close menus on route change
  useEffect(() => {
    setIsMenuOpen(false);
    setIsMoreOpen(false);
  }, [pathname]);

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Global Cmd+K / Ctrl+K shortcut
  const handleGlobalKeydown = useCallback(
    (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    },
    []
  );

  useEffect(() => {
    document.addEventListener('keydown', handleGlobalKeydown);
    return () => document.removeEventListener('keydown', handleGlobalKeydown);
  }, [handleGlobalKeydown]);

  // Close "More" dropdown on outside click
  useEffect(() => {
    if (!isMoreOpen) return;
    const handleClick = () => setIsMoreOpen(false);
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [isMoreOpen]);

  const calendlyUrl =
    process.env.NEXT_PUBLIC_CALENDLY_URL ||
    'https://calendly.com/saqynrabt/demo';

  const isActive = (href: string) =>
    pathname === href || (href !== '/' && pathname.startsWith(href));

  return (
    <>
      {/* Skip to content (accessibility) */}
      <a href="#main-content" className="skip-to-content">
        {t('Skip to content', 'تخطي إلى المحتوى')}
      </a>

      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-xl border-b border-gray-100/60 shadow-sm'
            : 'bg-white/80 backdrop-blur-md border-b border-gray-100/30'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group select-none"
            aria-label="SAQYN RABT home"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy text-sm font-bold text-white shadow-sm group-hover:scale-105 transition-transform">
              S
            </div>
            <div>
              <p className="text-sm font-bold tracking-[0.15em] text-navy group-hover:text-royal transition-colors">
                SAQYN RABT
              </p>
              <p className="text-[10px] uppercase tracking-[0.3em] text-muted font-semibold">
                {t('Private AI Ops', 'عمليات AI خاصة')}
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-6 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-semibold transition-colors relative py-1 ${
                  isActive(item.href)
                    ? 'text-navy after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-royal after:rounded-full'
                    : 'text-muted hover:text-navy'
                }`}
              >
                {t(item.en, item.ar)}
              </Link>
            ))}

            {/* "More" dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMoreOpen(!isMoreOpen);
                }}
                className="flex items-center gap-1 text-sm font-semibold text-muted hover:text-navy transition-colors py-1"
                aria-expanded={isMoreOpen}
                aria-haspopup="true"
              >
                {t('More', 'المزيد')}
                <svg
                  className={`h-4 w-4 transition-transform ${isMoreOpen ? 'rotate-180' : ''}`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {isMoreOpen && (
                <div className="absolute top-full right-0 rtl:right-auto rtl:left-0 mt-2 w-56 rounded-xl bg-white border border-gray-100 shadow-xl py-2 animate-slideDown z-50">
                  {moreLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`block px-4 py-2.5 text-sm font-medium transition-colors ${
                        isActive(link.href)
                          ? 'text-navy bg-royal/5'
                          : 'text-slate-600 hover:bg-slate-50 hover:text-navy'
                      }`}
                    >
                      {t(link.en, link.ar)}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Desktop Right Actions */}
          <div className="hidden items-center gap-3 lg:flex">
            {/* Search button */}
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50/50 px-3 py-2 text-sm text-muted hover:bg-gray-100 hover:text-navy transition-all"
              aria-label={t('Search', 'بحث')}
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" strokeLinecap="round" />
              </svg>
              <span className="hidden xl:inline">{t('Search', 'بحث')}</span>
              <kbd className="hidden xl:inline-flex items-center rounded border border-gray-200 bg-white px-1.5 py-0.5 text-[10px] font-bold text-slate-400">
                ⌘K
              </kbd>
            </button>

            <LanguageSwitcher />

            <DarkModeToggle />

            <a
              href={calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-navy px-5 py-2.5 text-sm font-bold text-white transition-all hover:bg-navy/90 hover:shadow-lg hover:scale-[1.02] active:scale-95"
            >
              {t('Book a 15-Min Demo', 'احجز عرضًا لمدة 15 دقيقة')}
            </a>
          </div>

          {/* Mobile: Search + Menu */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-muted hover:bg-gray-50"
              aria-label={t('Search', 'بحث')}
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" strokeLinecap="round" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => setIsMenuOpen((value) => !value)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-navy hover:bg-gray-50 transition-colors"
              aria-label="Toggle navigation"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : (
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="border-t border-gray-100 bg-white px-4 py-5 lg:hidden shadow-lg animate-slideDown">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors ${
                    isActive(item.href)
                      ? 'bg-royal/5 text-navy'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {t(item.en, item.ar)}
                </Link>
              ))}

              <div className="my-2 border-t border-gray-100" />

              <p className="px-3 text-[10px] font-extrabold uppercase tracking-widest text-muted mb-1">
                {t('More', 'المزيد')}
              </p>
              {moreLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive(link.href)
                      ? 'bg-royal/5 text-navy'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {t(link.en, link.ar)}
                </Link>
              ))}

              <div className="mt-3 border-t border-gray-100 pt-4 flex flex-col gap-3">
                <div className="flex items-center justify-between px-1">
                  <span className="text-xs font-bold text-muted">
                    {t('Language', 'اللغة')}
                  </span>
                  <LanguageSwitcher />
                </div>
                <a
                  href={calendlyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-navy px-4 py-3 text-sm font-bold text-white text-center"
                >
                  {t('Book a Demo', 'احجز عرضًا')}
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Search Overlay */}
      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
}
