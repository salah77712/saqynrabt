'use client';

import * as React from 'react';
import Link from 'next/link';
import { useLocale } from '../../app/providers';
import { LanguageSwitcher } from '../LanguageSwitcher';
import { XIcon } from '../ui/Icons';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: Array<{ href: string; en: string; ar: string }>;
  moreLinks: Array<{ href: string; en: string; ar: string }>;
  calendlyUrl: string;
}

export function MobileMenu({ isOpen, onClose, navItems, moreLinks, calendlyUrl }: MobileMenuProps) {
  const { locale } = useLocale();
  const t = (en: string, ar: string) => locale === 'ar' ? (ar || en) : en;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md px-6 py-6 flex flex-col justify-between animate-fadeIn">
      <div>
        <div className="flex items-center justify-between mb-8">
          <span className="text-sm font-black text-navy dark:text-white uppercase tracking-wider">
            {t('Navigation', 'التنقل')}
          </span>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-800 dark:hover:text-white text-lg font-bold p-1"
            aria-label="Close menu"
          >
            <XIcon className="w-4 h-4" />
          </button>
        </div>

        <nav className="flex flex-col gap-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className="text-base font-bold text-navy dark:text-white py-2 hover:text-royal"
            >
              {t(item.en, item.ar)}
            </Link>
          ))}
          <div className="my-2 border-t border-gray-100 dark:border-slate-800" />
          {moreLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className="text-sm font-semibold text-slate-500 dark:text-slate-400 py-1.5 hover:text-royal"
            >
              {t(item.en, item.ar)}
            </Link>
          ))}
        </nav>
      </div>

      <div className="border-t border-gray-100 dark:border-slate-800 pt-6 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-500">{t('Select Language', 'اختر اللغة')}</span>
          <LanguageSwitcher />
        </div>
        <a
          href={calendlyUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onClose}
          className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-[#141F33] dark:bg-royal text-white font-bold text-sm text-center py-3"
        >
          {t('See how it works', 'شاهد كيف يعمل')}
        </a>
      </div>
    </div>
  );
}
