'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale } from '../app/providers';
import { Home, Zap, MessageSquare, Users, Settings, Lock } from 'lucide-react';

const fallbackIcons: Record<string, React.ReactNode> = {
  overview: <Home className="w-5 h-5" />,
  chatbot: <MessageSquare className="w-5 h-5" />,
  workflows: <Zap className="w-5 h-5" />,
  team: <Users className="w-5 h-5" />,
  settings: <Settings className="w-5 h-5" />,
  profile: <Users className="w-5 h-5" />,
};

interface NavModule {
  key: string;
  path: string;
  label: Record<string, string>;
  icon: string;
  visible: boolean;
  locked: boolean;
}

interface MobileBottomNavProps {
  userRole?: string;
  navModules?: NavModule[];
}

export function MobileBottomNav({ userRole = 'employee', navModules = [] }: MobileBottomNavProps) {
  const pathname = usePathname();
  const { locale } = useLocale();
  const t = (en: string, ar: string) => locale === 'ar' ? (ar || en) : en;

  const mobileItems = navModules.length > 0
    ? navModules.filter((m) => m.visible && !m.locked && m.path !== '/dashboard')
    : userRole === 'employee'
      ? [
          { key: 'chatbot', label: { en: 'Chat', ar: 'المحادثة' }, path: '/dashboard/chat', icon: 'MessageSquare', visible: true, locked: false },
          { key: 'workflows', label: { en: 'Workflows', ar: 'سير العمل' }, path: '/dashboard/workflows', icon: 'Zap', visible: true, locked: false },
        ]
      : [
          { key: 'overview', label: { en: 'Home', ar: 'الرئيسية' }, path: '/dashboard', icon: 'LayoutDashboard', visible: true, locked: false },
          { key: 'chatbot', label: { en: 'Chat', ar: 'المحادثة' }, path: '/dashboard/chat', icon: 'MessageSquare', visible: true, locked: false },
          { key: 'team', label: { en: 'Team', ar: 'الفريق' }, path: '/dashboard/team', icon: 'Users', visible: true, locked: false },
          { key: 'settings', label: { en: 'Settings', ar: 'الإعدادات' }, path: '/dashboard/settings', icon: 'Settings', visible: true, locked: false },
        ];

  const topItems = mobileItems.slice(0, 5);

  return (
    <nav
      aria-label="Mobile navigation"
      className="fixed bottom-0 start-0 end-0 z-50 bg-surface/80 dark:bg-background/80 backdrop-blur-xl border-t border-primary/10 md:hidden shadow-lg"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)', height: 'calc(64px + env(safe-area-inset-bottom, 0px))' }}
    >
      <div className="flex justify-around items-center h-16 px-2">
        {topItems.map((item) => {
          const isActive = pathname === item.path || (item.path !== '/dashboard' && pathname.startsWith(item.path));
          return (
            <Link
              key={item.key}
              href={item.path}
              aria-label={t(item.label.en, item.label.ar)}
              className={`relative flex flex-1 flex-col items-center justify-center h-full min-h-[44px] min-w-[44px] gap-0.5 rounded-lg transition-colors ${
                isActive ? 'text-primary' : 'text-primary/40'
              }`}
            >
              {isActive && (
                <span className="absolute top-0 start-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" />
              )}
              {item.locked ? <Lock className="w-4 h-4" /> : (fallbackIcons[item.key] || <div className="w-5 h-5" />)}
              <span className={`text-xs font-bold uppercase tracking-wider ${
                isActive ? 'text-primary' : 'text-primary/40'
              }`}>
                {t(item.label.en, item.label.ar)}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export default MobileBottomNav;
