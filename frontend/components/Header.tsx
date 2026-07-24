'use client';

import React, { useState, useCallback, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UserButton, useAuth } from '@clerk/nextjs';
import { useLocale } from '../app/providers';
import { LanguageSwitcher } from './LanguageSwitcher';
import { DarkModeToggle } from './DarkModeToggle';

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
const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const lastFocusedElementRef = useRef<HTMLElement | null>(null);

useEffect(() => {
  if (!mobileMenuOpen) return;
  lastFocusedElementRef.current = document.activeElement as HTMLElement;
  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      closeMenu();
    }
  };
  const focusableSelector = 'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
  const handleTab = (e: KeyboardEvent) => {
    if (e.key !== 'Tab') return;
    const container = menuRef.current;
    if (!container) return;
    const focusable = Array.from<HTMLElement>(container.querySelectorAll<HTMLElement>(focusableSelector)).filter(
      (el) => el.offsetParent !== null
    );
    if (focusable.length === 0) return;
    const firstEl = focusable[0];
    const lastEl = focusable[focusable.length - 1];
    if (e.shiftKey) {
      if (document.activeElement === firstEl || !container.contains(document.activeElement)) {
        e.preventDefault();
        lastEl.focus();
      }
    } else {
      if (document.activeElement === lastEl || !container.contains(document.activeElement)) {
        e.preventDefault();
        firstEl.focus();
      }
    }
  };
  document.addEventListener('keydown', handleEscape);
  document.addEventListener('keydown', handleTab);
  const firstEl = menuRef.current?.querySelector<HTMLElement>(focusableSelector);
  if (firstEl) setTimeout(() => firstEl.focus(), 0);
  return () => {
    document.removeEventListener('keydown', handleEscape);
    document.removeEventListener('keydown', handleTab);
    lastFocusedElementRef.current?.focus();
  };
}, [mobileMenuOpen, closeMenu]);

return (
<header
role="banner"
aria-label="Main navigation"
className={`sticky top-0 z-50 h-14 md:h-16 bg-surface backdrop-blur-xl shadow-lg border-b border-surface/20 shrink-0 transition-transform duration-300 ${isHeaderVisible ? 'translate-y-0' : '-translate-y-full'}`}
style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}
>
<div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 flex items-center justify-between w-full h-full">
<Link href="/" className="flex items-center gap-3 md:gap-4 hover:opacity-80 transition-opacity min-h-[44px]">
<div className="w-7 h-7 md:w-8 md:h-8 bg-primary rounded-md flex items-center justify-center text-surface font-bold text-sm md:text-base shrink-0">
S
</div>
<span className="text-primary font-black text-sm md:text-lg tracking-[0.05em]">
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
aria-current={isActive ? "page" : undefined}
className={`relative px-3 py-2 text-sm font-medium transition-all duration-300 rounded-full hover:bg-primary hover:text-surface min-h-[44px] flex items-center ${
      isActive ? 'text-primary' : 'text-primary/70'
    }`}
>
{t(link.label.en, link.label.fr, link.label.ar, link.label.hi)}
{isActive && (
<span className="absolute -bottom-1 start-0 w-full h-0.5 bg-primary rounded-full scale-x-100" />
)}
</Link>
);
})}
</nav>

<div className="flex items-center gap-2 md:gap-3">
<DarkModeToggle />
<LanguageSwitcher />

<div className="flex items-center gap-3">
<Link
href="/contact"
  className="hidden md:inline-flex bg-primary hover:bg-primary text-surface font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-full transition-all duration-300 hover:shadow-md hover:scale-[1.02] active:scale-95 shadow-sm min-h-[44px] items-center"
>
{t('See how it works', 'Voir comment ça marche', 'شاهد كيف يعمل', 'यह कैसे काम करता है देखें')}
</Link>

{isSignedIn ? (
<div className="flex items-center gap-4">
<Link
href="/dashboard"
className="hidden md:inline-flex bg-primary hover:bg-primary text-surface font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-full transition-all duration-300 hover:shadow-md hover:scale-[1.02] active:scale-95 shadow-sm min-h-[44px] items-center"
>
{t('Dashboard', 'Tableau de Bord', 'لوحة التحكم', 'डैशबोर्ड')}
</Link>
<UserButton showName={false} userProfileMode="navigation" userProfileUrl="https://accounts.saqynrabt.com/user">
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
<div className="flex items-center gap-3">
<Link href="/sign-in" className="text-xs font-extrabold text-primary hover:underline min-h-[44px] flex items-center px-2">
{t('Sign In', 'Connexion', 'تسجيل الدخول', 'साइन इन करें')}
</Link>
<Link
href="/sign-up"
className="hidden md:inline-flex bg-primary hover:bg-primary text-surface font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-full transition-all duration-300 hover:shadow-md hover:scale-[1.02] active:scale-95 shadow-sm min-h-[44px] items-center"
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
className="md:hidden w-10 h-10 flex items-center justify-center rounded-full hover:bg-primary hover:shadow-md hover:scale-[1.02] active:scale-95 text-primary min-h-[44px] min-w-[44px] transition-all duration-300"
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
className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ease-in-out"
onClick={closeMenu}
/>
<div
className={`relative w-72 max-w-[85vw] bg-surface backdrop-blur-md shadow-2xl flex flex-col animate-slide-in-left ${
locale === 'ar' ? 'me-auto' : 'ms-0'
}`}
style={{
animation: 'slideInLeft 0.3s ease-out',
}}
>
<div className="flex items-center justify-between px-5 py-4 border-b border-primary/10">
<span className="text-sm font-extrabold text-primary uppercase tracking-wider">
{t('Menu', 'Menu', 'القائمة', 'मेन्यू')}
</span>
<button
onClick={closeMenu}
aria-label="Close navigation menu"
className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-primary text-primary/50 min-h-[44px] min-w-[44px]"
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
aria-current={isActive ? "page" : undefined}
className={`flex items-center min-h-[44px] px-3 py-2.5 text-base font-semibold rounded-full transition-colors ${
isActive
        ? 'text-surface bg-primary'
        : 'text-primary/70 hover:text-surface hover:bg-primary'
}`}
>
{t(link.label.en, link.label.fr, link.label.ar, link.label.hi)}
</Link>
);
})}
</nav>

<div className="px-4 py-4 border-t border-primary/10 space-y-3">
<div className="flex items-center justify-between">
<span className="text-xs font-bold text-primary/50">{t('Language', 'Langue', 'اللغة', 'भाषा')}</span>
<LanguageSwitcher />
</div>

<Link
href="/contact"
onClick={closeMenu}
  className="flex min-h-[44px] w-full items-center justify-center rounded-full bg-primary text-surface font-bold text-sm py-3"
>
{t('See how it works', 'Voir comment ça marche', 'شاهد كيف يعمل', 'यह कैसे काम करता है देखें')}
</Link>
</div>
</div>
</div>
)}

<style jsx>{`
@keyframes slideInLeft {
from { transform: translateX(-100%); }
to { transform: translateX(0); }
}
`}</style>
</header>
);
}

export default Header;
