'use client';

import * as React from 'react';
import Link from 'next/link';
import { useLocale } from '../../app/providers';
import { LanguageSwitcher } from '../LanguageSwitcher';
import { X } from 'lucide-react';

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
    <div className="fixed inset-0 z-50 bg-surface dark:bg-primary backdrop-blur-md px-6 py-6 flex flex-col justify-between animate-fadeIn">
      <div>
        <div className="flex items-center justify-between mb-8">
          <span className="text-sm font-black text-primary dark:text-surface uppercase tracking-wider">
            {t('Navigation', 'التنقل')}
          </span>
          <button
            onClick={onClose}
            className="text-primary hover:text-primary dark:hover:text-surface text-lg font-bold p-1 min-h-[44px] min-w-[44px] transition-all duration-300 hover:shadow-md hover:scale-[1.02] active:scale-95"
            aria-label="Close menu"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <nav className="flex flex-col gap-3">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className="text-base font-bold text-primary dark:text-surface py-2 hover:text-royal min-h-[44px] flex items-center"
            >
              {t(item.en, item.ar)}
            </Link>
          ))}
          <div className="my-2 border-t border-primary/10" />
          {moreLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className="text-sm font-semibold text-primary dark:text-primary py-3 hover:text-royal min-h-[44px] flex items-center"
            >
              {t(item.en, item.ar)}
            </Link>
          ))}
        </nav>
      </div>

      <div className="border-t border-primary/10 dark:border-primary/30 pt-6 flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-primary">{t('Select Language', 'اختر اللغة')}</span>
          <LanguageSwitcher />
        </div>
        <a
          href={calendlyUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onClose}
          className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-primary dark:bg-primary text-surface font-bold text-sm text-center py-3"
        >
          {t('See how it works', 'شاهد كيف يعمل')}
        </a>
      </div>
    </div>
  );
}
