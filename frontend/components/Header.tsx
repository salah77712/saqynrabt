'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UserButton, useAuth } from '@clerk/nextjs';
import { useLocale } from '../app/providers';

export function Header() {
  const pathname = usePathname();
  const { locale, setLocale } = useLocale();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isSignedIn } = useAuth();

  const t = (en: string, ar: string) => (locale === 'ar' ? ar : en);

  const navLinks = [
    { label: { en: 'Features', ar: 'الميزات' }, href: '/features' },
    { label: { en: 'Industries', ar: 'الصناعات' }, href: '/industries' },
    { label: { en: 'How It Works', ar: 'آلية العمل' }, href: '/how-it-works' },
    { label: { en: 'Pricing', ar: 'الأسعار' }, href: '/pricing' },
    { label: { en: 'Dashboard Demo', ar: 'العرض التوضيحي' }, href: '/dashboard' },
  ];

  return (
    <header
      role="banner"
      aria-label="Main navigation"
      className="sticky top-0 z-50 h-16 md:h-16 bg-white border-b border-gray-100 shadow-sm shrink-0"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between w-full h-full">
        {/* Brand Lockup logo */}
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 bg-[#141F33] rounded-md flex items-center justify-center text-white font-bold text-base">
            S
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-[#141F33] font-black text-lg tracking-[0.05em]">
              SAQYN RABT
            </span>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mt-0.5">
              PRIVATE AI OPS
            </span>
          </div>
        </Link>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-3 py-2 text-sm font-medium transition-colors rounded-md hover:bg-gray-50 hover:text-[#141F33] ${
                  isActive ? 'text-[#141F33]' : 'text-gray-600'
                }`}
              >
                {t(link.label.en, link.label.ar)}
                {isActive && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#141F33] rounded-full scale-x-100" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Action button pills */}
        <div className="flex items-center gap-4">
          <div className="flex border border-gray-200 rounded-full overflow-hidden divide-x divide-gray-200">
            <button
              onClick={() => setLocale('en')}
              className={`px-3 py-1 text-xs font-bold transition-all ${
                locale === 'en' ? 'bg-[#141F33] text-white' : 'hover:bg-gray-50 text-slate-500'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLocale('ar')}
              className={`px-3 py-1 text-xs font-bold transition-all ${
                locale === 'ar' ? 'bg-[#141F33] text-white' : 'hover:bg-gray-50 text-slate-500'
              }`}
            >
              AR
            </button>
          </div>

          <Link
            href="/contact"
            className="hidden sm:inline-flex bg-[#141F33] hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-xl transition-all hover:scale-[1.02] shadow-sm"
          >
            Book a 15-Min Demo
          </Link>

          {isSignedIn ? (
            <UserButton afterSignOutUrl="/" showName={false} userProfileMode="navigation" />
          ) : (
            <Link href="/sign-in" className="text-xs font-extrabold text-navy hover:underline">
              Sign In
            </Link>
          )}

          {/* Hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open navigation menu"
            className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile drawer overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-white/95 backdrop-blur-sm z-50 flex flex-col p-6 animate-fadeIn">
          <div className="flex justify-between items-center mb-8">
            <span className="font-extrabold text-[#141F33]">SAQYN Navigation</span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="text-2xl p-2 text-slate-600 min-h-[44px] min-w-[44px]"
            >
              ✕
            </button>
          </div>

          <div className="flex flex-col gap-4 flex-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-bold text-navy py-3 border-b border-gray-50"
              >
                {t(link.label.en, link.label.ar)}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="bg-[#141F33] text-white font-bold text-center py-4 rounded-xl mt-6 text-sm"
            >
              Book a 15-Min Demo
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
export default Header;
