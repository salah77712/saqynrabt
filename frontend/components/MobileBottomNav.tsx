'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale } from '../app/providers';

const navItems = [
  { name: { en: 'Home', ar: 'الرئيسية' }, path: '/dashboard', icon: '🏠' },
  { name: { en: 'Automation', ar: 'الأتمتة' }, path: '/dashboard/automation', icon: '📞' },
  { name: { en: 'Chat', ar: 'المحادثة' }, path: '/dashboard/chat', icon: '💬' },
  { name: { en: 'Team', ar: 'الفريق' }, path: '/dashboard/team', icon: '👥' },
  { name: { en: 'Settings', ar: 'الإعدادات' }, path: '/dashboard/settings', icon: '⚙️' },
];

export function MobileBottomNav() {
  const pathname = usePathname();
  const { locale } = useLocale();
  const t = (en: string, ar: string) => (locale === 'ar' ? ar : en);

  return (
    <nav
      aria-label="Mobile navigation"
      className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 md:hidden shadow-lg"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)', height: 'calc(64px + env(safe-area-inset-bottom, 0px))' }}
    >
      <div className="flex justify-around items-center h-16 px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.path || (item.path !== '/dashboard' && pathname.startsWith(item.path));
          return (
            <Link
              key={item.path}
              href={item.path}
              aria-label={t(item.name.en, item.name.ar)}
              className={`relative flex flex-1 flex-col items-center justify-center h-full min-h-[44px] min-w-[44px] gap-0.5 rounded-lg transition-colors ${
                isActive ? 'text-[#141F33]' : 'text-gray-400'
              }`}
            >
              {isActive && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#141F33]" />
              )}
              <span className="text-xl leading-none">{item.icon}</span>
              <span className={`text-[9px] font-bold uppercase tracking-wider ${
                isActive ? 'text-[#141F33]' : 'text-gray-400'
              }`}>
                {t(item.name.en, item.name.ar)}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export default MobileBottomNav;
