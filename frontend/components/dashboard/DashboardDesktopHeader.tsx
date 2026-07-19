'use client';

import React from 'react';
import { useLocale } from '../../app/providers';
import { LanguageSwitcher } from '../LanguageSwitcher';
import { DarkModeToggle } from '../DarkModeToggle';

interface DashboardDesktopHeaderProps {
  currentTitle: string;
}

export function DashboardDesktopHeader({ currentTitle }: DashboardDesktopHeaderProps) {
  const { locale } = useLocale();
  const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';

  const dashboardContent = {
    clientDashboard: { en: 'Client Dashboard', ar: 'لوحة تحكم العميل' },
    live: { en: 'Live', ar: 'مباشر' },
  };

  return (
    <header className="hidden md:block border-b border-primary/10 px-6 lg:px-8 py-5 sticky top-0 z-30 bg-surface/80 dark:bg-background/80 backdrop-blur-xl shadow-sm shrink-0">
      <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[10px] font-extrabold uppercase tracking-widest text-primary/50">{t(dashboardContent.clientDashboard)}</p>
          <h2 className="text-2xl font-extrabold text-primary tracking-tight mt-0.5">{currentTitle}</h2>
        </div>
        <div className="flex items-center gap-8">
          <LanguageSwitcher />
          <DarkModeToggle />
          <div className="flex items-center gap-3 rounded-full border border-primary/20 bg-surface dark:bg-surface px-4 py-1.5 text-xs font-bold text-primary dark:text-surface shadow-elevation-low">
            <span className="h-2 w-2 rounded-full bg-accent animate-pulse shadow-glow" />
            {t(dashboardContent.live)}
          </div>
        </div>
      </div>
    </header>
  );
}
export default DashboardDesktopHeader;
