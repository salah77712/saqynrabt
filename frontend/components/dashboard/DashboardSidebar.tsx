'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { UserButton } from '@clerk/nextjs';
import { useLocale } from '../../app/providers';
import { useEntitlements } from '../../app/providers';
import { Home, MessageSquare, FileText, Users, Settings, ArrowRight, ArrowLeft } from 'lucide-react';

interface DashboardSidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  isSidebarOpen: boolean;
  onClose: () => void;
  pendingCount: number;
  currentRole: string;
  filteredMenuItems: Array<{ name: Record<string, string>; path: string; icon: React.ReactNode; badge?: boolean }>;
}

export function DashboardSidebar({ isCollapsed, onToggleCollapse, isSidebarOpen, onClose, pendingCount, currentRole, filteredMenuItems }: DashboardSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { locale } = useLocale();
  const { mockMode, setMockMode } = useEntitlements();
  const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';

  const dashboardContent = {
    clientPortal: { en: 'Client Portal', ar: 'بوابة العميل' },
    sandbox: { en: 'Sandbox', ar: 'وضع الرمل' },
    demo: { en: 'Demo', ar: 'عرض توضيحي' },
    exit: { en: 'Exit', ar: 'خروج' },
    activeClient: { en: 'Active Client Admin', ar: 'مسؤول العميل النشط' },
  };

  return (
    <aside className={`fixed inset-y-0 start-0 z-50 bg-surface/95 dark:bg-background/95 backdrop-blur-xl border-e border-primary/10 flex flex-col justify-between transition-all duration-300 md:translate-x-0 md:static ${
      isCollapsed ? 'md:w-20' : 'md:w-64'
    } ${
      isSidebarOpen
        ? locale === 'ar'
          ? 'translate-x-0 end-0 start-auto w-64'
          : 'translate-x-0 w-64'
        : locale === 'ar'
          ? 'translate-x-full end-0 start-auto md:translate-x-0'
          : '-translate-x-full md:translate-x-0'
    }`}>
      <div className="flex flex-col overflow-y-auto flex-1">
        <div className="flex items-center justify-between px-6 py-6 border-b border-surface min-h-[80px]">
          <Link href="/" className="flex flex-col items-start gap-0.5 min-w-0">
            <span className={`text-primary font-extrabold tracking-tight transition-colors hover:text-accent truncate ${
              isCollapsed ? 'text-sm' : 'text-xl'
            }`}>
              {isCollapsed ? 'SR' : 'SAQYN RABT'}
            </span>
            {!isCollapsed && (
              <span className="text-xs uppercase tracking-[0.15em] text-primary font-bold truncate">{t(dashboardContent.clientPortal)}</span>
            )}
          </Link>
          {mockMode && !isCollapsed && (
            <span className="rounded-full bg-primary px-2 py-0.5 text-xs font-extrabold uppercase tracking-widest text-primary border border-primary/20 shrink-0">
              {t(dashboardContent.sandbox)}
            </span>
          )}
        </div>

        <nav className="px-3 py-6 space-y-1.5 flex-1">
          {filteredMenuItems.map((item) => {
            const isActive = pathname === item.path || (item.path !== '/dashboard' && pathname.startsWith(item.path));
            return (
              <Link
                key={item.path}
                href={item.path}
                onClick={onClose}
                title={isCollapsed ? t(item.name) : undefined}
                className={`flex items-center rounded-xl text-sm font-bold transition-all relative ${
                  isCollapsed ? 'justify-center px-0' : 'px-4 gap-4.5'
                } ${
                  isActive
? 'bg-primary border-s-4 border-accent text-surface'
: 'border-s-4 border-transparent text-primary hover:bg-primary hover:text-surface'
                }`}
                style={{ minHeight: '44px' }}
              >
                <span className="text-lg">{item.icon}</span>
                {!isCollapsed && <span className="truncate">{t(item.name)}</span>}

                {item.badge && pendingCount > 0 && (
                  <span className={`absolute bg-primary text-surface rounded-full text-xs font-extrabold flex items-center justify-center ${
                    isCollapsed ? '-top-1 -end-1 h-4 w-4' : 'end-4 px-2 py-0.5'
                  }`}>
                    {pendingCount}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="hidden md:flex justify-end px-4 py-2 border-t border-primary/10">
        <button
          type="button"
          onClick={onToggleCollapse}
className="h-8 w-8 rounded-lg border border-primary/10 flex items-center justify-center text-primary hover:text-surface hover:bg-primary transition-colors min-h-[44px] min-w-[44px]"
          title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {isCollapsed ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
        </button>
      </div>

      <div className="p-4 border-t border-surface bg-surface">
        {mockMode ? (
          <div className="rounded-xl border border-primary/10 bg-surface p-3 flex flex-col gap-3 min-w-0">
            <div className="flex items-center justify-between gap-3 min-w-0">
              <div className="min-w-0">
                <p className="text-xs font-extrabold text-primary truncate">Salah ({t(dashboardContent.demo)})</p>
                {!isCollapsed && <p className="text-xs font-medium text-primary truncate">admin@alsafa.qa</p>}
              </div>
              <button
                onClick={() => {
                  setMockMode(false);
                  router.push('/');
                }}
                className="text-xs font-bold text-accent hover:underline shrink-0"
              >
                {t(dashboardContent.exit)}
              </button>
            </div>
          </div>
        ) : (
          <div className={`flex items-center p-1 rounded-xl min-w-0 ${isCollapsed ? 'justify-center' : 'gap-4'}`}>
            <UserButton showName={!isCollapsed} />
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-primary uppercase tracking-wider truncate">{t(dashboardContent.activeClient)}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </aside>
  );
}
export default DashboardSidebar;
