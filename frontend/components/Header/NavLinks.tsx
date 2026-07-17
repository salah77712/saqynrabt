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
    <nav className="hidden items-center gap-8 lg:flex">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`text-sm font-semibold transition-colors relative py-1 rounded-xl px-3 ${
            isActive(item.href)
? 'text-primary dark:text-surface bg-surface dark:bg-primary'
: 'text-primary dark:text-primary hover:text-primary dark:hover:text-surface'
          }`}
        >
          {t(item.en, item.ar)}
        </Link>
      ))}
    </nav>
  );
}
