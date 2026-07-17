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
    { name: { en: 'Overview', ar: 'Ù†Ø¸Ø±Ø© Ø¹Ø§Ù…Ø©' }, path: '/dashboard', icon: <Home className="w-5 h-5" /> },
    { name: { en: 'Automation', ar: 'Ø§Ù„Ø£ØªÙ…ØªØ©' }, path: '/dashboard/automation', icon: <Zap className="w-5 h-5" /> },
    { name: { en: 'Chat', ar: 'Ø§Ù„Ù…Ø­Ø§Ø¯Ø«Ø©' }, path: '/dashboard/chat', icon: <MessageSquare className="w-5 h-5" /> },
    { name: { en: 'Documents', ar: 'Ø§Ù„Ù…Ø³ØªÙ†Ø¯Ø§Øª' }, path: '/dashboard/documents', icon: <FileText className="w-5 h-5" /> },
    { name: { en: 'Team', ar: 'Ø§Ù„ÙØ±ÙŠÙ‚' }, path: '/dashboard/team', icon: <Users className="w-5 h-5" />, badge: true },
    { name: { en: 'Settings', ar: 'Ø§Ù„Ø¥Ø¹Ø¯Ø§Ø¯Ø§Øª' }, path: '/dashboard/settings', icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 bg-surface dark:bg-primary border-r border-surface dark:border-primary flex flex-col justify-between transition-all duration-300 md:static h-full ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div className="flex flex-col flex-1 overflow-y-auto">
        <div className="px-6 py-6 border-b border-surface dark:border-primary flex items-center justify-between min-h-[80px]">
          <Link href="/" className="font-extrabold text-navy dark:text-surface text-lg">
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
? 'bg-primary border-s-4 border-primary text-primary dark:text-surface dark:bg-royal/10 dark:border-royal'
: 'border-s-4 border-transparent text-primary hover:bg-primary dark:hover:bg-primary'
                }`}
                style={{ minHeight: '44px' }}
              >
                {item.icon}
                {!isCollapsed && <span className="truncate">{t(item.name.en, item.name.ar)}</span>}

                {item.badge && pendingCount > 0 && (
                  <span className={`absolute bg-primary text-surface rounded-full text-[9px] font-bold flex items-center justify-center ${
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

      <div className="flex justify-end p-4 border-t border-surface dark:border-primary">
        <button
          onClick={onToggle}
          className="h-8 w-8 rounded-lg border border-surface dark:border-primary flex items-center justify-center text-primary hover:scale-[1.02] min-h-[44px] min-w-[44px] rounded-xl"
        >
          {isCollapsed ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
        </button>
      </div>
    </aside>
  );
}
export default Sidebar;
