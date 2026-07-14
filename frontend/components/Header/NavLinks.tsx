'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale } from '../../app/providers';

interface NavLinksProps {
  navItems: Array<{ href: string; en: string; ar: string }>;
}

export function NavLinks({ navItems }: NavLinksProps) {
  const pathname = usePathname();
  const { locale } = useLocale();

  const t = (en: string, ar: string) => locale === 'ar' ? (ar || en) : en;
  const isActive = (href: string) => pathname === href || (href !== '/' && pathname.startsWith(href));

  return (
    <nav className="hidden items-center gap-6 lg:flex">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`text-sm font-semibold transition-colors relative py-1 rounded-md px-3 ${
            isActive(item.href)
? 'text-[#141F33] dark:text-[#F8F9FB] bg-[#F8F9FB] dark:bg-[#141F33]/50'
: 'text-[#141F33] dark:text-[#141F33] hover:text-[#141F33] dark:hover:text-[#F8F9FB]'
          }`}
        >
          {t(item.en, item.ar)}
        </Link>
      ))}
    </nav>
  );
}
