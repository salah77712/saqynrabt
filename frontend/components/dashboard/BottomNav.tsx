'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale } from '../../app/providers';

export function BottomNav() {
  const pathname = usePathname();
  const { locale } = useLocale();
  const t = (en: string, ar: string) => (locale === 'ar' ? ar : en);

  const navItems = [
    { name: { en: 'Overview', ar: 'نظرة عامة' }, path: '/dashboard', icon: '🏠' },
    { name: { en: 'Automation', ar: 'الأتمتة' }, path: '/dashboard/automation', icon: '📞' },
    { name: { en: 'Chat', ar: 'المحادثة' }, path: '/dashboard/chat', icon: '💬' },
    { name: { en: 'Team', ar: 'الفريق' }, path: '/dashboard/team', icon: '👥' },
    { name: { en: 'Settings', ar: 'الإعدادات' }, path: '/dashboard/settings', icon: '⚙️' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 h-16 bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800 flex justify-around items-center px-4 md:hidden shadow-lg">
      {navItems.map((item) => {
        const isActive = pathname === item.path || (item.path !== '/dashboard' && pathname.startsWith(item.path));
        return (
          <Link
            key={item.path}
            href={item.path}
            className={`flex flex-col items-center justify-center flex-1 h-full py-2 ${
              isActive ? 'text-royal' : 'text-slate-400'
            }`}
          >
            <span className="text-xl mb-1">{item.icon}</span>
            <span className="text-[9px] font-bold uppercase tracking-wider">
              {t(item.name.en, item.name.ar)}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
export default BottomNav;
