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
    <header className="hidden md:block border-b  px-6 lg:px-8 py-5 sticky top-0 z-30 shadow-sm shrink-0">
      <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[10px] font-extrabold uppercase tracking-widest ">{t(dashboardContent.clientDashboard)}</p>
          <h2 className="text-2xl font-extrabold text-[#141F33] tracking-tight mt-0.5">{currentTitle}</h2>
        </div>
        <div className="flex items-center gap-8">
          <LanguageSwitcher />
          <DarkModeToggle />
          <div className="flex items-center gap-3 rounded-full border border-[#141F33]/20 bg-[#F8F9FB] px-4 py-1.5 text-xs font-bold text-[#141F33]">
            <span className="h-2 w-2 rounded-full  animate-pulse" />
            {t(dashboardContent.live)}
          </div>
        </div>
      </div>
    </header>
  );
}
export default DashboardDesktopHeader;
