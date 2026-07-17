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
{ label: { en: 'Features', fr: 'FonctionnalitÃ©s', ar: 'Ø§Ù„Ù…ÙŠØ²Ø§Øª', hi: 'à¤µà¤¿à¤¶à¥‡à¤·à¤¤à¤¾à¤à¤' }, href: '/features' },
{ label: { en: 'Industries', fr: 'Industries', ar: 'Ø§Ù„ØµÙ†Ø§Ø¹Ø§Øª', hi: 'à¤‰à¤¦à¥à¤¯à¥‹à¤—' }, href: '/industries' },
{ label: { en: 'How It Works', fr: 'Comment Ã§a Marche', ar: 'Ø¢Ù„ÙŠØ© Ø§Ù„Ø¹Ù…Ù„', hi: 'à¤¯à¤¹ à¤•à¥ˆà¤¸à¥‡ à¤•à¤¾à¤® à¤•à¤°à¤¤à¤¾ à¤¹à¥ˆ' }, href: '/how-it-works' },
{ label: { en: 'Pricing', fr: 'Tarifs', ar: 'Ø§Ù„Ø£Ø³Ø¹Ø§Ø±', hi: 'à¤®à¥‚à¤²à¥à¤¯ à¤¨à¤¿à¤°à¥à¤§à¤¾à¤°à¤£' }, href: '/pricing' },
];

const closeMenu = useCallback(() => setMobileMenuOpen(false), []);

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
{locale === 'ar' ? 'Ø³Ù‚Ù†' : 'SAQYN'}
</span>
</Link>

<nav className="hidden md:flex items-center gap-1">
{navLinks.map((link) => {
const isActive = pathname === link.href;
return (
<Link
key={link.href}
href={link.href}
className={`relative px-3 py-2 text-sm font-medium transition-all duration-300 rounded-full hover:bg-primary hover:text-primary min-h-[44px] flex items-center ${
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

<div className="flex items-center gap-3 md:gap-4">
<LanguageSwitcher />

<div className="flex items-center gap-3">
<Link
href="/contact"
className="hidden md:inline-flex bg-primary hover:bg-primary text-surface font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-full transition-all duration-300 hover:shadow-md hover:scale-[1.02] active:scale-95 shadow-sm min-h-[44px] items-center"
>
{t('See how it works', 'Voir comment Ã§a marche', 'Ø´Ø§Ù‡Ø¯ ÙƒÙŠÙ ÙŠØ¹Ù…Ù„', 'à¤¯à¤¹ à¤•à¥ˆà¤¸à¥‡ à¤•à¤¾à¤® à¤•à¤°à¤¤à¤¾ à¤¹à¥ˆ à¤¦à¥‡à¤–à¥‡à¤‚')}
</Link>

{isSignedIn ? (
<div className="flex items-center gap-4">
<Link
href="/dashboard"
className="hidden md:inline-flex bg-primary hover:bg-primary text-surface font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-full transition-all duration-300 hover:shadow-md hover:scale-[1.02] active:scale-95 shadow-sm min-h-[44px] items-center"
>
{t('Dashboard', 'Tableau de Bord', 'Ù„ÙˆØ­Ø© Ø§Ù„ØªØ­ÙƒÙ…', 'à¤¡à¥ˆà¤¶à¤¬à¥‹à¤°à¥à¤¡')}
</Link>
<UserButton showName={false} userProfileMode="navigation" userProfileUrl="https://accounts.saqynrabt.com/user">
<UserButton.MenuItems>
<UserButton.Link
label={t("Dashboard", "Tableau de Bord", "Ù„ÙˆØ­Ø© Ø§Ù„ØªØ­ÙƒÙ…", "à¤¡à¥ˆà¤¶à¤¬à¥‹à¤°à¥à¤¡")}
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
{t('Sign In', 'Connexion', 'ØªØ³Ø¬ÙŠÙ„ Ø§Ù„Ø¯Ø®ÙˆÙ„', 'à¤¸à¤¾à¤‡à¤¨ à¤‡à¤¨ à¤•à¤°à¥‡à¤‚')}
</Link>
<Link
href="/sign-up"
className="hidden md:inline-flex bg-primary hover:bg-primary text-surface font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-full transition-all duration-300 hover:shadow-md hover:scale-[1.02] active:scale-95 shadow-sm min-h-[44px] items-center"
>
{t('Register', 'S\'inscrire', 'Ø³Ø¬Ù„ Ø§Ù„Ø¢Ù†', 'à¤ªà¤‚à¤œà¥€à¤•à¤°à¤£ à¤•à¤°à¥‡à¤‚')}
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
className="fixed inset-0 bg-primary backdrop-blur-sm"
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
{t('Menu', 'Menu', 'Ø§Ù„Ù‚Ø§Ø¦Ù…Ø©', 'à¤®à¥‡à¤¨à¥à¤¯à¥‚')}
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
className={`flex items-center min-h-[44px] px-3 py-2.5 text-base font-semibold rounded-full transition-colors ${
isActive
? 'text-primary bg-primary'
: 'text-primary/70 hover:text-primary hover:bg-primary'
}`}
>
{t(link.label.en, link.label.fr, link.label.ar, link.label.hi)}
</Link>
);
})}
</nav>

<div className="px-4 py-4 border-t border-primary/10 space-y-3">
<div className="flex items-center justify-between">
<span className="text-xs font-bold text-primary/50">{t('Language', 'Langue', 'Ø§Ù„Ù„ØºØ©', 'à¤­à¤¾à¤·à¤¾')}</span>
<LanguageSwitcher />
</div>

<Link
href="/contact"
onClick={closeMenu}
className="flex min-h-[44px] w-full items-center justify-center rounded-full bg-primary text-surface font-bold text-sm py-3"
>
{t('See how it works', 'Voir comment Ã§a marche', 'Ø´Ø§Ù‡Ø¯ ÙƒÙŠÙ ÙŠØ¹Ù…Ù„', 'à¤¯à¤¹ à¤•à¥ˆà¤¸à¥‡ à¤•à¤¾à¤® à¤•à¤°à¤¤à¤¾ à¤¹à¥ˆ à¤¦à¥‡à¤–à¥‡à¤‚')}
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
