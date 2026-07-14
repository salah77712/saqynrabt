'use client';

import React, { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UserButton, useAuth } from '@clerk/nextjs';
import { useLocale } from '../app/providers';
import { LanguageSwitcher } from './LanguageSwitcher';

export function Header() {
  const pathname = usePathname();
  const { locale, setLocale } = useLocale();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const { isSignedIn } = useAuth();

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 10) {
        setIsHeaderVisible(true);
      } else if (currentScrollY > lastScrollY) {
        setIsHeaderVisible(false);
      } else {
        setIsHeaderVisible(true);
      }
      lastScrollY = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const t = (en: string, fr: string, ar: string, hi: string) => {
    if (locale === 'ar') return ar || en;
    if (locale === 'fr') return fr || en;
    if (locale === 'hi') return hi || en;
    return en;
  };

  const navLinks = [
    { label: { en: 'Features', fr: 'Fonctionnalités', ar: 'الميزات', hi: 'विशेषताएँ' }, href: '/features' },
    { label: { en: 'Industries', fr: 'Industries', ar: 'الصناعات', hi: 'उद्योग' }, href: '/industries' },
    { label: { en: 'How It Works', fr: 'Comment ça Marche', ar: 'آلية العمل', hi: 'यह कैसे काम करता है' }, href: '/how-it-works' },
    { label: { en: 'Pricing', fr: 'Tarifs', ar: 'الأسعار', hi: 'मूल्य निर्धारण' }, href: '/pricing' },
  ];

  const closeMenu = useCallback(() => setMobileMenuOpen(false), []);

  return (
    <header
      role="banner"
      aria-label="Main navigation"
      className={`sticky top-0 z-50 h-14 md:h-16 bg-white/70 backdrop-blur-xl shadow-lg border-b border-white/20 shrink-0 transition-transform duration-300 ${isHeaderVisible ? 'translate-y-0' : '-translate-y-full'}`}
      style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 flex items-center justify-between w-full h-full">
        <Link href="/" className="flex items-center gap-2 md:gap-3 hover:opacity-80 transition-opacity min-h-[44px]">
          <div className="w-7 h-7 md:w-8 md:h-8 bg-navy rounded-md flex items-center justify-center text-white font-bold text-sm md:text-base shrink-0">
            S
          </div>
          <span className="text-navy font-black text-sm md:text-lg tracking-[0.05em]">
            {locale === 'ar' ? 'سقن' : 'SAQYN'}
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-3 py-2 text-sm font-medium transition-colors rounded-md hover:bg-gray-50 hover:text-navy min-h-[44px] flex items-center ${
                  isActive ? 'text-navy' : 'text-gray-600'
                }`}
              >
                    {t(link.label.en, link.label.fr, link.label.ar, link.label.hi)}
                {isActive && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-navy rounded-full scale-x-100" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 md:gap-4">
          <LanguageSwitcher />

          <div className="flex items-center gap-2">
            <Link
              href="/contact"
              className="hidden md:inline-flex bg-navy hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-xl transition-all duration-300 hover:shadow-md hover:scale-[1.02] active:scale-95 shadow-sm min-h-[44px] items-center"
            >
              {t('See how it works', 'Voir comment ça marche', 'شاهد كيف يعمل', 'यह कैसे काम करता है देखें')}
            </Link>

            {isSignedIn ? (
              <div className="flex items-center gap-3">
                <Link
                  href="/dashboard"
                  className="hidden md:inline-flex bg-navy hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded-xl transition-all duration-300 hover:shadow-md hover:scale-[1.02] active:scale-95 shadow-sm min-h-[40px] items-center"
                >
                  {t('Dashboard', 'Tableau de Bord', 'لوحة التحكم', 'डैशबोर्ड')}
                </Link>
                <UserButton afterSignOutUrl="/" showName={false} userProfileMode="navigation" userProfileUrl="https://accounts.saqynrabt.com/user">
                  <UserButton.MenuItems>
                    <UserButton.Link
                      label={t("Dashboard", "Tableau de Bord", "لوحة التحكم", "डैशबोर्ड")}
                      labelIcon={
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '14px', height: '14px' }} aria-hidden="true">
                          <rect x="3" y="3" width="7" height="9" />
                          <rect x="14" y="3" width="7" height="5" />
                          <rect x="14" y="12" width="7" height="9" />
                          <rect x="3" y="16" width="7" height="5" />
                        </svg>
                      }
                      href="/dashboard"
                    />
                  </UserButton.MenuItems>
                </UserButton>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/sign-in" className="text-xs font-extrabold text-navy hover:underline min-h-[44px] flex items-center px-2">
                  {t('Sign In', 'Connexion', 'تسجيل الدخول', 'साइन इन करें')}
                </Link>
                <Link
                  href="/sign-up"
                  className="hidden md:inline-flex bg-navy hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded-xl transition-all duration-300 hover:shadow-md hover:scale-[1.02] active:scale-95 shadow-sm min-h-[40px] items-center"
                >
                  {t('Register', 'S\'inscrire', 'سجل الآن', 'पंजीकरण करें')}
                </Link>
              </div>
            )}
          </div>

          <button
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav"
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 hover:shadow-md active:scale-95 text-gray-600 min-h-[44px] min-w-[44px] transition-all duration-300"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M2.5 5H17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M2.5 10H17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M2.5 15H17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div
          id="mobile-nav"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation menu"
          className="fixed inset-0 z-50 flex"
        >
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm"
            onClick={closeMenu}
          />
          <div
            className={`relative w-72 max-w-[85vw] bg-white/95 backdrop-blur-md shadow-2xl flex flex-col animate-slide-in-left ${
              locale === 'ar' ? 'mr-auto' : 'ml-0'
            }`}
            style={{
              animation: 'slideInLeft 0.3s ease-out',
            }}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <span className="text-sm font-extrabold text-navy uppercase tracking-wider">
                {t('Menu', 'Menu', 'القائمة', 'मेन्यू')}
              </span>
              <button
                onClick={closeMenu}
                aria-label="Close navigation menu"
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500 min-h-[44px] min-w-[44px]"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M13.5 4.5L4.5 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M4.5 4.5L13.5 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <nav className="flex-1 px-3 py-4 overflow-y-auto">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMenu}
                    className={`flex items-center min-h-[44px] px-3 py-2.5 text-base font-semibold rounded-lg transition-colors ${
                      isActive
                        ? 'text-navy bg-navy/5'
                        : 'text-gray-700 hover:text-navy hover:bg-gray-50'
                    }`}
                  >
                {t(link.label.en, link.label.fr, link.label.ar, link.label.hi)}
                  </Link>
                );
              })}
            </nav>

            <div className="px-4 py-4 border-t border-gray-100 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-500">{t('Language', 'Langue', 'اللغة', 'भाषा')}</span>
                <LanguageSwitcher />
              </div>

              <Link
                href="/contact"
                onClick={closeMenu}
                className="flex min-h-[44px] w-full items-center justify-center rounded-xl bg-navy text-white font-bold text-sm py-3"
              >
                {t('See how it works', 'Voir comment ça marche', 'شاهد كيف يعمل', 'यह कैसे काम करता है देखें')}
              </Link>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slideInLeft {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(0);
          }
        }
      `}</style>
    </header>
  );
}

export default Header;
