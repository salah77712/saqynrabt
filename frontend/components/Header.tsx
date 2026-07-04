'use client';

import * as React from 'react';
import { Logo } from './Header/Logo';
import { NavLinks } from './Header/NavLinks';
import { MobileMenu } from './Header/MobileMenu';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useLocale } from '../app/providers';
import { SearchOverlay } from './SearchOverlay';
import Link from 'next/link';

const navItems = [
  { href: '/features', en: 'Features', ar: 'الميزات' },
  { href: '/industries', en: 'Industries', ar: 'الصناعات' },
  { href: '/how-it-works', en: 'How It Works', ar: 'كيف يعمل' },
  { href: '/pricing', en: 'Pricing', ar: 'الأسعار' },
  { href: '/dashboard', en: 'Dashboard Demo', ar: 'عرض لوحة التحكم' },
];

const moreLinks = [
  { href: '/about', en: 'About Us', ar: 'من نحن' },
  { href: '/case-studies', en: 'Case Studies', ar: 'دراسات الحالة' },
  { href: '/faq', en: 'FAQ', ar: 'الأسئلة الشائعة' },
  { href: '/contact', en: 'Contact', ar: 'اتصل بنا' },
];

export function Header() {
  const { locale } = useLocale();
  const t = (en: string, ar: string) => (locale === 'ar' ? ar : en);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/saqynrabt/demo';

  return (
    <>
      <a href="#main-content" className="skip-to-content">
        {t('Skip to main content', 'تخطي إلى المحتوى الرئيسي')}
      </a>

      <header
        className={`sticky top-0 z-50 w-full h-16 flex items-center justify-between px-6 border-b border-gray-100/50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md transition-all ${
          isScrolled ? 'shadow-sm' : ''
        }`}
      >
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between">
          {/* Logo */}
          <Logo />

          {/* Navigation Links */}
          <NavLinks navItems={navItems} />

          {/* Desktop Right Actions */}
          <div className="hidden items-center gap-4 lg:flex">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-slate-500 hover:text-navy dark:hover:text-white transition-colors"
              aria-label={t('Search', 'بحث')}
            >
              🔍
            </button>
            <LanguageSwitcher />
            <a
              href={calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center justify-center rounded-xl bg-[#141F33] dark:bg-royal px-6 text-sm font-bold text-white transition-all hover:opacity-95 active:scale-95 shadow-sm"
            >
              {t('Book a 15-Min Demo', 'احجز عرضًا لمدة 15 دقيقة')}
            </a>
          </div>

          {/* Mobile hamburger menu button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-slate-500"
              aria-label={t('Search', 'بحث')}
            >
              🔍
            </button>
            <button
              onClick={() => setIsMenuOpen(true)}
              className="p-2 text-[#141F33] dark:text-white"
              aria-label="Open navigation menu"
            >
              ☰
            </button>
          </div>
        </div>
      </header>

      {/* Global Search Overlay */}
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Mobile Drawer Menu */}
      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        navItems={navItems}
        moreLinks={moreLinks}
        calendlyUrl={calendlyUrl}
      />
    </>
  );
}
export default Header;
