'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { UserButton, useAuth } from '@clerk/nextjs';
import { useEntitlements, useLocale } from '../providers';
import { LanguageSwitcher } from '../../components/LanguageSwitcher';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { mockMode, setMockMode } = useEntitlements();
  const { locale } = useLocale();
  const { getToken, isLoaded: authLoaded } = useAuth();
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);
  const [jwtToken, setJwtToken] = useState<string | null>(null);

  const t = (obj: Record<string, string>) => locale === 'ar' ? obj.ar : obj.en;

  const dashboardContent = {
    overview: { en: 'Overview', ar: 'نظرة عامة' },
    staffKnowledge: { en: 'Staff Knowledge Hub', ar: 'مركز معرفة الموظفين' },
    guestQueue: { en: 'Guest & Client Queue', ar: 'طابور الضيوف والعملاء' },
    documents: { en: 'Documents Hub', ar: 'مركز المستندات' },
    approvals: { en: 'Pending Approvals', ar: 'الموافقات المعلقة' },
    settings: { en: 'Usage & Settings', ar: 'الاستخدام والإعدادات' },
    clientPortal: { en: 'Client Portal', ar: 'بوابة العميل' },
    sandbox: { en: 'Sandbox', ar: 'وضع الرمل' },
    demo: { en: 'Demo', ar: 'عرض توضيحي' },
    exit: { en: 'Exit', ar: 'خروج' },
    activeClient: { en: 'Active Client Admin', ar: 'مسؤول العميل النشط' },
    clientDashboard: { en: 'Client Dashboard', ar: 'لوحة تحكم العميل' },
    live: { en: 'Live', ar: 'مباشر' },
  };

  const menuItems = [
    { name: dashboardContent.overview, path: '/dashboard', icon: '🏠' },
    { name: { en: 'Automation', ar: 'الأتمتة' }, path: '/dashboard/automation', icon: '📞' },
    { name: { en: 'Chatbot', ar: 'المساعد الذكي' }, path: '/dashboard/chat', icon: '💬' },
    { name: { en: 'Documents', ar: 'المستندات' }, path: '/dashboard/documents', icon: '📄' },
    { name: { en: 'Approvals', ar: 'الموافقات' }, path: '/dashboard/approvals', icon: '👥', badge: true },
    { name: { en: 'Settings', ar: 'الإعدادات' }, path: '/dashboard/settings', icon: '⚙️' },
  ];

  const currentTitle = pathname === '/dashboard'
    ? t(dashboardContent.overview)
    : menuItems.find((item) => item.path !== '/dashboard' && pathname.startsWith(item.path))
      ? t(menuItems.find((item) => item.path !== '/dashboard' && pathname.startsWith(item.path))!.name)
      : t(dashboardContent.clientDashboard);

  // Fetch JWT Token
  useEffect(() => {
    if (authLoaded && !mockMode) {
      getToken({ template: 'saqyn-jwt' })
        .then(token => setJwtToken(token))
        .catch(err => console.error('Failed to get token:', err));
    }
  }, [authLoaded, mockMode, getToken]);

  // Fetch pending approval count (Section 1.2)
  useEffect(() => {
    const apiBase = process.env.NEXT_PUBLIC_API_URL || '';
    const headers: Record<string, string> = {};
    if (jwtToken) {
      headers['Authorization'] = `Bearer ${jwtToken}`;
    } else {
      headers['Authorization'] = 'Bearer mock-token-salah-admin';
    }

    fetch(`${apiBase}/api/employees`, { headers })
      .then(res => res.json())
      .then((data: any) => {
        const list = Array.isArray(data) ? data : data?.employees || [];
        const pending = list.filter((e: any) => e.status === 'pending').length;
        setPendingCount(pending);
      })
      .catch(err => {
        console.warn('Failed to load pending count, using mock:', err);
        setPendingCount(2); // Fallback mock value
      });
  }, [jwtToken]);

  return (
    <div className="min-h-screen bg-[#F8F9FB] text-[#1A202C] flex flex-col font-sans selection:bg-[#2A5CFF] selection:text-white" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      
      {/* Mobile Top Nav Bar */}
      <header className="flex h-16 w-full items-center justify-between border-b border-gray-200 bg-white px-6 md:hidden sticky top-0 z-40 shadow-sm">
        <Link href="/" className="flex items-baseline gap-2">
          <span className="text-[#141F33] font-extrabold text-lg tracking-tight">SAQYN RABT</span>
          <span className="text-[8px] uppercase tracking-[0.2em] text-[#718096] font-bold">PRIVATE AI OPS</span>
        </Link>
        <button
          type="button"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-[#141F33] min-h-[44px] min-w-[44px]"
        >
          <span className="text-lg">☰</span>
        </button>
      </header>

      <div className="flex flex-1 relative h-screen overflow-hidden">
        
        {/* Sidebar Navigation */}
        <aside className={`fixed inset-y-0 left-0 z-50 bg-white border-r border-gray-200 flex flex-col justify-between transition-all duration-300 md:translate-x-0 md:static md:h-screen ${
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
            {/* Sidebar Logo Header */}
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

            {/* Navigation links */}
            <nav className="px-3 py-6 space-y-1.5 flex-1">
              {menuItems.map((item) => {
                const isActive = pathname === item.path || (item.path !== '/dashboard' && pathname.startsWith(item.path));
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    onClick={() => setIsSidebarOpen(false)}
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
                    
                    {/* Approvals Red Badge (Section 1.2) */}
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

          {/* Desktop Collapse Trigger Button */}
          <div className="hidden md:flex justify-end px-4 py-2 border-t border-gray-50 bg-white">
            <button
              type="button"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="h-8 w-8 rounded-lg border border-gray-200 flex items-center justify-center text-slate-400 hover:text-[#141F33] hover:bg-slate-50 transition-colors"
              title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
            >
              {isCollapsed ? '→' : '←'}
            </button>
          </div>

          {/* User Profile Section at Bottom */}
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

        {/* Backdrop for mobile menu */}
        {isSidebarOpen && (
          <div
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 z-40 bg-slate-900/40 md:hidden backdrop-blur-sm"
          />
        )}

        {/* Page Content Column */}
        <main className="flex min-w-0 flex-1 flex-col h-full overflow-hidden">
          
          {/* Top Page Header */}
          <header className="border-b border-gray-200 bg-white px-8 py-5 sticky top-0 z-30 shadow-sm shrink-0">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[10px] font-extrabold uppercase tracking-widest text-[#718096]">{t(dashboardContent.clientDashboard)}</p>
                <h2 className="text-2xl font-extrabold text-[#141F33] tracking-tight mt-0.5">{currentTitle}</h2>
              </div>
              <div className="flex items-center gap-4">
                <LanguageSwitcher />
                <div className="flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-xs font-bold text-emerald-700">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  {t(dashboardContent.live)}
                </div>
              </div>
            </div>
          </header>

          {/* Main Dashboard Child Pages */}
          <div className="flex-1 overflow-y-auto p-6 md:p-8">
            <div className="max-w-7xl mx-auto w-full">
              {children}
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}
