'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { UserButton } from '@clerk/nextjs';
import { useLocale } from '../../app/providers';
import { useEntitlements } from '../../app/providers';
import { Home, MessageSquare, FileText, Users, Settings, ArrowRight, ArrowLeft, Lock, Zap, Phone, PhoneCall, CheckCircle, Inbox, Puzzle, BarChart3, ScrollText, CreditCard, Shield, UserCircle, LayoutDashboard } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  LayoutDashboard: <LayoutDashboard className="w-5 h-5" />,
  MessageSquare: <MessageSquare className="w-5 h-5" />,
  FileText: <FileText className="w-5 h-5" />,
  Phone: <Phone className="w-5 h-5" />,
  Zap: <Zap className="w-5 h-5" />,
  PhoneCall: <PhoneCall className="w-5 h-5" />,
  Users: <Users className="w-5 h-5" />,
  CheckCircle: <CheckCircle className="w-5 h-5" />,
  Inbox: <Inbox className="w-5 h-5" />,
  Puzzle: <Puzzle className="w-5 h-5" />,
  BarChart3: <BarChart3 className="w-5 h-5" />,
  ScrollText: <ScrollText className="w-5 h-5" />,
  Settings: <Settings className="w-5 h-5" />,
  CreditCard: <CreditCard className="w-5 h-5" />,
  Shield: <Shield className="w-5 h-5" />,
  UserCircle: <UserCircle className="w-5 h-5" />,
};

interface NavModule {
  key: string;
  path: string;
  label: Record<string, string>;
  icon: string;
  visible: boolean;
  locked: boolean;
  lockedReason: string | null;
  badge?: boolean;
}

interface DashboardSidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  isSidebarOpen: boolean;
  onClose: () => void;
  pendingCount: number;
  currentRole: string;
  navModules: NavModule[];
}

export function DashboardSidebar({ isCollapsed, onToggleCollapse, isSidebarOpen, onClose, pendingCount, currentRole, navModules }: DashboardSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { locale } = useLocale();
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
        </div>

        <nav className="px-3 py-6 space-y-1.5 flex-1">
          {navModules.map((item) => {
            const isActive = pathname === item.path || (item.path !== '/dashboard' && pathname.startsWith(item.path));
            const icon = iconMap[item.icon] || <div className="w-5 h-5" />;
            return (
              <Link
                key={item.key}
                href={item.locked ? pathname : item.path}
                onClick={item.locked ? undefined : onClose}
                title={isCollapsed ? t(item.label) : undefined}
                className={`flex items-center rounded-xl text-sm font-bold transition-all relative ${
                  isCollapsed ? 'justify-center px-0' : 'px-4 gap-4.5'
                } ${
                  item.locked
                    ? 'opacity-50 cursor-not-allowed'
                    : isActive
                      ? 'bg-primary border-s-4 border-accent text-surface'
                      : 'border-s-4 border-transparent text-primary hover:bg-primary hover:text-surface'
                }`}
                style={{ minHeight: '44px' }}
                onClickCapture={item.locked ? (e) => e.preventDefault() : undefined}
              >
                <span className="text-lg relative">
                  {icon}
                  {item.locked && (
                    <Lock className="w-3 h-3 absolute -top-1 -end-1 text-accent" />
                  )}
                </span>
                {!isCollapsed && <span className="truncate">{t(item.label)}</span>}

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
        <div className={`flex items-center p-1 rounded-xl min-w-0 ${isCollapsed ? 'justify-center' : 'gap-4'}`}>
          <UserButton showName={!isCollapsed} />
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-primary uppercase tracking-wider truncate">{t(dashboardContent.activeClient)}</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
export default DashboardSidebar;
