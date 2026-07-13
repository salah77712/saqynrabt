'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { UserButton } from '@clerk/nextjs';
import { useLocale } from '../../app/providers';
import { useEntitlements } from '../../app/providers';
import { HomeIcon, PhoneIcon, ChatIcon, DocumentIcon, TeamIcon, SettingsIcon, ArrowRightIcon, ArrowLeftIcon } from '../ui/Icons';

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
  const t = (obj: Record<string, string>) => locale === 'ar' ? obj.ar : obj.en;

  const dashboardContent = {
    clientPortal: { en: 'Client Portal', ar: 'بوابة العميل' },
    sandbox: { en: 'Sandbox', ar: 'وضع الرمل' },
    demo: { en: 'Demo', ar: 'عرض توضيحي' },
    exit: { en: 'Exit', ar: 'خروج' },
    activeClient: { en: 'Active Client Admin', ar: 'مسؤول العميل النشط' },
  };

  return (
    <aside className={`fixed inset-y-0 left-0 z-50 bg-white border-r border-gray-200 flex flex-col justify-between transition-all duration-300 md:translate-x-0 md:static ${
      isCollapsed ? 'md:w-20' : 'md:w-64'
    } ${
      isSidebarOpen
        ? locale === 'ar'
          ? 'translate-x-0 right-0 left-auto w-64'
          : 'translate-x-0 w-64'
        : locale === 'ar'
          ? 'translate-x-full right-0 left-auto md:translate-x-0'
          : '-translate-x-full md:translate-x-0'
    }`}>
      <div className="flex flex-col overflow-y-auto flex-1">
        <div className="flex items-center justify-between px-6 py-6 border-b border-gray-100 min-h-[80px]">
          <Link href="/" className="flex flex-col items-start gap-0.5 min-w-0">
            <span className={`text-[#141F33] font-extrabold tracking-tight transition-colors hover:text-[#2A5CFF] truncate ${
              isCollapsed ? 'text-sm' : 'text-xl'
            }`}>
              {isCollapsed ? 'SR' : 'SAQYN RABT'}
            </span>
            {!isCollapsed && (
              <span className="text-[9px] uppercase tracking-[0.15em] text-[#718096] font-bold truncate">{t(dashboardContent.clientPortal)}</span>
            )}
          </Link>
          {mockMode && !isCollapsed && (
            <span className="rounded-full bg-amber-500/10 px-2 py-0.5 text-[8px] font-extrabold uppercase tracking-widest text-amber-600 border border-amber-500/20 shrink-0">
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
                  isCollapsed ? 'justify-center px-0' : 'px-4 gap-3.5'
                } ${
                  isActive
                    ? 'bg-[#141F33]/5 border-l-4 border-[#141F33] text-[#141F33]'
                    : 'border-l-4 border-transparent text-[#718096] hover:bg-slate-50 hover:text-[#141F33]'
                }`}
                style={{ minHeight: '44px' }}
              >
                <span className="text-lg">{item.icon}</span>
                {!isCollapsed && <span className="truncate">{t(item.name)}</span>}

                {item.badge && pendingCount > 0 && (
                  <span className={`absolute bg-red-500 text-white rounded-full text-[9px] font-extrabold flex items-center justify-center ${
                    isCollapsed ? '-top-1 -right-1 h-4 w-4' : 'right-4 px-2 py-0.5'
                  }`}>
                    {pendingCount}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="hidden md:flex justify-end px-4 py-2 border-t border-gray-50 bg-white">
        <button
          type="button"
          onClick={onToggleCollapse}
          className="h-8 w-8 rounded-lg border border-gray-200 flex items-center justify-center text-slate-400 hover:text-[#141F33] hover:bg-slate-50 transition-colors"
          title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {isCollapsed ? <ArrowRightIcon className="w-4 h-4" /> : <ArrowLeftIcon className="w-4 h-4" />}
        </button>
      </div>

      <div className="p-4 border-t border-gray-100 bg-white">
        {mockMode ? (
          <div className="rounded-xl border border-gray-200 bg-[#F8F9FB] p-3 flex flex-col gap-2 min-w-0">
            <div className="flex items-center justify-between gap-2 min-w-0">
              <div className="min-w-0">
                <p className="text-xs font-extrabold text-[#141F33] truncate">Salah ({t(dashboardContent.demo)})</p>
                {!isCollapsed && <p className="text-[10px] font-medium text-[#718096] truncate">admin@alsafa.qa</p>}
              </div>
              <button
                onClick={() => {
                  setMockMode(false);
                  router.push('/');
                }}
                className="text-[10px] font-bold text-[#2A5CFF] hover:underline shrink-0"
              >
                {t(dashboardContent.exit)}
              </button>
            </div>
          </div>
        ) : (
          <div className={`flex items-center p-1 rounded-xl min-w-0 ${isCollapsed ? 'justify-center' : 'gap-3'}`}>
            <UserButton afterSignOutUrl="/" showName={!isCollapsed} />
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-semibold text-[#718096] uppercase tracking-wider truncate">{t(dashboardContent.activeClient)}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </aside>
  );
}
export default DashboardSidebar;
