'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale } from '../../app/providers';
import { Home, Zap, MessageSquare, FileText, Users, Settings, ArrowRight, ArrowLeft } from 'lucide-react';

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
  pendingCount?: number;
}

export function Sidebar({ isCollapsed, onToggle, pendingCount = 0 }: SidebarProps) {
  const pathname = usePathname();
  const { locale } = useLocale();
  const t = (en: string, ar: string) => locale === 'ar' ? (ar || en) : en;

  const menuItems = [
    { name: { en: 'Overview', ar: 'نظرة عامة' }, path: '/dashboard', icon: <Home className="w-5 h-5" /> },
    { name: { en: 'Automation', ar: 'الأتمتة' }, path: '/dashboard/automation', icon: <Zap className="w-5 h-5" /> },
    { name: { en: 'Chat', ar: 'المحادثة' }, path: '/dashboard/chat', icon: <MessageSquare className="w-5 h-5" /> },
    { name: { en: 'Documents', ar: 'المستندات' }, path: '/dashboard/documents', icon: <FileText className="w-5 h-5" /> },
    { name: { en: 'Team', ar: 'الفريق' }, path: '/dashboard/team', icon: <Users className="w-5 h-5" />, badge: true },
    { name: { en: 'Settings', ar: 'الإعدادات' }, path: '/dashboard/settings', icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 bg-[#F8F9FB] dark:bg-[#141F33] border-r border-[#F8F9FB] dark:border-[#141F33] flex flex-col justify-between transition-all duration-300 md:static h-full ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div className="flex flex-col flex-1 overflow-y-auto">
        <div className="px-6 py-6 border-b border-[#F8F9FB] dark:border-[#141F33] flex items-center justify-between min-h-[80px]">
          <Link href="/" className="font-extrabold text-navy dark:text-[#F8F9FB] text-lg">
            {isCollapsed ? 'SR' : 'SAQYN RABT'}
          </Link>
        </div>

        <nav className="px-3 py-6 space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.path || (item.path !== '/dashboard' && pathname.startsWith(item.path));
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center rounded-xl text-sm font-bold transition-all duration-300 relative ${
                  isCollapsed ? 'justify-center px-0' : 'px-4 gap-4'
                } ${
                  isActive
? 'bg-[#141F33] border-s-4 border-[#141F33] text-[#141F33] dark:text-[#F8F9FB] dark:bg-royal/10 dark:border-royal'
: 'border-s-4 border-transparent text-[#141F33] hover:bg-[#141F33] dark:hover:bg-[#141F33]'
                }`}
                style={{ minHeight: '44px' }}
              >
                {item.icon}
                {!isCollapsed && <span className="truncate">{t(item.name.en, item.name.ar)}</span>}

                {item.badge && pendingCount > 0 && (
                  <span className={`absolute bg-[#141F33] text-[#F8F9FB] rounded-full text-[9px] font-bold flex items-center justify-center ${
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

      <div className="flex justify-end p-4 border-t border-[#F8F9FB] dark:border-[#141F33]">
        <button
          onClick={onToggle}
          className="h-8 w-8 rounded-lg border border-[#F8F9FB] dark:border-[#141F33] flex items-center justify-center text-[#141F33] hover:scale-[1.02] min-h-[44px] min-w-[44px] rounded-xl"
        >
          {isCollapsed ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
        </button>
      </div>
    </aside>
  );
}
export default Sidebar;
