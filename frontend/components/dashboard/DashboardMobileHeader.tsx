'use client';

import React from 'react';
import Link from 'next/link';
import { useLocale } from '../../app/providers';

interface DashboardMobileHeaderProps {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
}

export function DashboardMobileHeader({ isSidebarOpen, onToggleSidebar }: DashboardMobileHeaderProps) {
  const { locale } = useLocale();
  const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';

  const dashboardContent = {
    live: { en: 'Live', ar: 'مباشر' },
  };

  return (
    <header className="flex h-14 w-full items-center justify-between border-b border-surface bg-surface px-4 md:hidden sticky top-0 z-30 shadow-sm shrink-0"
      style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}>
      <Link href="/" className="flex items-center gap-3 min-h-[44px]">
        <div className="w-7 h-7 bg-primary rounded-md flex items-center justify-center text-surface font-bold text-xs">
          S
        </div>
        <span className="text-primary font-extrabold text-sm tracking-tight">SAQYN</span>
      </Link>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 rounded-full border border-primary/20 bg-surface px-2.5 py-1 text-[8px] font-bold text-primary">
          <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
          {t(dashboardContent.live)}
        </div>
        <button
          type="button"
          onClick={onToggleSidebar}
          aria-label={isSidebarOpen ? 'Close sidebar menu' : 'Open sidebar menu'}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-primary/10 text-primary min-h-[44px] min-w-[44px]"
        >
          <svg aria-hidden="true" width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.5 5H17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M2.5 10H17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M2.5 15H17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </header>
  );
}

export default DashboardMobileHeader;
