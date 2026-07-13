'use client';

import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { useEntitlements, useLocale } from '../providers';
import { HomeIcon, PhoneIcon, ChatIcon, DocumentIcon, TeamIcon, SettingsIcon, BoltIcon, WarningIcon } from '../../components/ui/Icons';
import { FeedbackWidget } from '../../components/FeedbackWidget';
import { MobileBottomNav } from '../../components/MobileBottomNav';
import { useSwipe } from '../../hooks/useSwipe';
import { EmailVerificationGate } from '../../components/dashboard/EmailVerificationGate';
import { DashboardSidebar } from '../../components/dashboard/DashboardSidebar';
import { DashboardMobileHeader } from '../../components/dashboard/DashboardMobileHeader';
import { DashboardDesktopHeader } from '../../components/dashboard/DashboardDesktopHeader';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { mockMode } = useEntitlements();
  const { locale } = useLocale();
  const { user, isLoaded: userLoaded } = useUser();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);
  const [userRole, setUserRole] = useState<string>('employee');
  const [roleLoaded, setRoleLoaded] = useState(false);

  const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';

  const dashboardContent = {
    overview: { en: 'Overview', ar: 'نظرة عامة' },
    clientDashboard: { en: 'Client Dashboard', ar: 'لوحة تحكم العميل' },
  };

  const menuItems = [
    { name: dashboardContent.overview, path: '/dashboard', icon: <HomeIcon className="w-5 h-5" /> },
    { name: { en: 'Automation', ar: 'الأتمتة' }, path: '/dashboard/automation', icon: <PhoneIcon className="w-5 h-5" /> },
    { name: { en: 'Chatbot', ar: 'المساعد الذكي' }, path: '/dashboard/chat', icon: <ChatIcon className="w-5 h-5" /> },
    { name: { en: 'Documents', ar: 'المستندات' }, path: '/dashboard/documents', icon: <DocumentIcon className="w-5 h-5" /> },
    { name: { en: 'Team', ar: 'الفريق' }, path: '/dashboard/team', icon: <TeamIcon className="w-5 h-5" />, badge: true },
    { name: { en: 'Settings', ar: 'الإعدادات' }, path: '/dashboard/settings', icon: <SettingsIcon className="w-5 h-5" /> },
  ];

  const currentRole = mockMode ? 'admin' : userRole;

  const filteredMenuItems = currentRole === 'employee'
    ? [
        { name: { en: 'Chatbot', ar: 'المساعد الذكي' }, path: '/dashboard/chat', icon: <ChatIcon className="w-5 h-5" /> },
        { name: { en: 'Workflows', ar: 'سير العمل' }, path: '/dashboard/workflows', icon: <BoltIcon className="w-5 h-5" /> },
      ]
    : menuItems;

  const isEmployeeAllowedPath = (path: string) => {
    return path.startsWith('/dashboard/chat') || path.startsWith('/dashboard/workflows');
  };

  const hasAccess = currentRole !== 'employee' || isEmployeeAllowedPath(pathname);

  const currentTitle = pathname === '/dashboard'
    ? t(dashboardContent.overview)
    : filteredMenuItems.find((item) => item.path !== '/dashboard' && pathname.startsWith(item.path))
      ? t(filteredMenuItems.find((item) => item.path !== '/dashboard' && pathname.startsWith(item.path))!.name)
      : t(dashboardContent.clientDashboard);

  const isEmailVerified = mockMode || !userLoaded || !user || user.emailAddresses.some(e => e.verification.status === 'verified');

  if (!isEmailVerified) {
    return <EmailVerificationGate />;
  }

  useEffect(() => {
    if (!user) return;
    fetch('/api/employees')
      .then(res => res.json())
      .then((data: any) => {
        const list = Array.isArray(data) ? data : data?.employees || [];
        const pending = list.filter((e: any) => e.status === 'pending').length;
        setPendingCount(pending);

        const currentEmp = list.find((e: any) => e.clerk_user_id === user.id);
        if (currentEmp) {
          setUserRole(currentEmp.role || 'employee');
        }
        setRoleLoaded(true);
      })
      .catch(err => {
        console.warn('Failed to load pending count, using mock:', err);
        setPendingCount(2);
        setRoleLoaded(true);
      });
  }, [user]);

  useEffect(() => {
    if (roleLoaded && currentRole === 'employee' && pathname === '/dashboard') {
      router.push('/dashboard/chat');
    }
  }, [roleLoaded, currentRole, pathname, router]);

  const swipeHandlers = useSwipe({
    onSwipeLeft: () => {
      if (window.innerWidth >= 768) setIsSidebarOpen(false);
    },
    onSwipeRight: () => {
      if (window.innerWidth >= 768) setIsSidebarOpen(true);
    },
    threshold: 50,
  });

  return (
    <div className="min-h-screen bg-[#F8F9FB] text-[#1A202C] flex flex-col font-sans selection:bg-[#2A5CFF] selection:text-white" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <div className="flex flex-1 relative" style={{ minHeight: 'calc(100vh - env(safe-area-inset-top, 0px))' }}>

        <DashboardSidebar
          isCollapsed={isCollapsed}
          onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
          isSidebarOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          pendingCount={pendingCount}
          currentRole={currentRole}
          filteredMenuItems={filteredMenuItems}
        />

        {isSidebarOpen && (
          <div
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 z-40 bg-slate-900/40 md:hidden backdrop-blur-sm"
          />
        )}

        <main
          className="flex min-w-0 flex-1 flex-col h-full overflow-hidden"
          {...swipeHandlers}
          style={{ paddingBottom: 'calc(64px + env(safe-area-inset-bottom, 0px))' }}
        >
          <DashboardMobileHeader
            isSidebarOpen={isSidebarOpen}
            onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          />

          <DashboardDesktopHeader currentTitle={currentTitle} />

          <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8"
            style={{ WebkitOverflowScrolling: 'touch' }}>
            <div className="max-w-7xl mx-auto w-full">
              {!hasAccess ? (
                <div className="py-12 flex flex-col items-center justify-center text-center bg-white border border-gray-200 rounded-2xl shadow-sm p-8">
                  <WarningIcon className="w-10 h-10 text-slate-300 mb-4" />
                  <h2 className="text-lg font-extrabold text-[#141F33]">{t({ en: 'Access Denied', ar: 'تم رفض الوصول' })}</h2>
                  <p className="text-xs text-[#718096] font-semibold mt-1">
                    {t({ en: 'You do not have permission to access this page.', ar: 'ليس لديك صلاحية للوصول إلى هذه الصفحة.' })}
                  </p>
                </div>
              ) : (
                children
              )}
            </div>
          </div>

          <FeedbackWidget />
          <MobileBottomNav userRole={currentRole} />
        </main>
      </div>
    </div>
  );
}
