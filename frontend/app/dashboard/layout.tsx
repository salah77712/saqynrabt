'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { useEntitlements, useLocale } from '../providers';
import { Home, Zap, MessageSquare, FileText, Users, Settings, AlertTriangle } from 'lucide-react';
import { FeedbackWidget } from '../../components/FeedbackWidget';
import { MobileBottomNav } from '../../components/MobileBottomNav';
import NoIndex from '../../components/NoIndex';
import { useSwipe } from '../../hooks/useSwipe';
import { EmailVerificationGate } from '../../components/dashboard/EmailVerificationGate';
import { DashboardSidebar } from '../../components/dashboard/DashboardSidebar';
import { DashboardMobileHeader } from '../../components/dashboard/DashboardMobileHeader';
import { DashboardDesktopHeader } from '../../components/dashboard/DashboardDesktopHeader';
import { LockedPage } from '../../components/dashboard/LockedPage';
import { MODULES, getModuleVisibility } from '../../lib/module-map';
import type { PlanKey, UserRole } from '../../lib/module-map';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { mockMode, entitlements } = useEntitlements();
  const { locale } = useLocale();
  const { user, isLoaded: userLoaded } = useUser();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);
  const [userRole, setUserRole] = useState<UserRole>('employee');
  const [roleLoaded, setRoleLoaded] = useState(false);

  const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';

  const dashboardContent = {
    overview: { en: 'Overview', ar: 'نظرة عامة' },
    clientDashboard: { en: 'Client Dashboard', ar: 'لوحة تحكم العميل' },
  };

  const currentRole: UserRole = mockMode ? 'admin' : userRole;
  const planKey: PlanKey = mockMode ? 'platform' : (entitlements?.plan_key as PlanKey) || 'platform';

  const navModules = useMemo(() => {
    return MODULES.map((mod) => {
      const vis = getModuleVisibility(mod, currentRole, planKey);
      return { ...mod, ...vis };
    });
  }, [currentRole, planKey]);

  const visibleNavItems = navModules.filter((m) => m.visible);

  const currentModule = navModules.find(
    (m) => m.path !== '/dashboard' && pathname.startsWith(m.path)
  );

  const currentTitle = pathname === '/dashboard'
    ? t(dashboardContent.overview)
    : currentModule
      ? t(currentModule.label)
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

  const isLockedPath = pathname !== '/dashboard' && currentModule?.locked === true;
  const isRestrictedPath = pathname !== '/dashboard' && currentModule?.visible === false;

  return (
    <div className="min-h-screen bg-surface text-primary flex flex-col font-sans selection:bg-accent selection:text-surface" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
<NoIndex />
      <div className="flex flex-1 relative" style={{ minHeight: 'calc(100vh - env(safe-area-inset-top, 0px))' }}>

        <DashboardSidebar
          isCollapsed={isCollapsed}
          onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
          isSidebarOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          pendingCount={pendingCount}
          currentRole={currentRole}
          navModules={navModules}
        />

        {isSidebarOpen && (
          <div
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 z-40 bg-black/60 md:hidden backdrop-blur-sm transition-opacity duration-300"
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

          <div className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-8"
            style={{ WebkitOverflowScrolling: 'touch' }}>
            <div className="max-w-6xl mx-auto w-full">
              {isRestrictedPath ? (
                <div className="py-12 flex flex-col items-center justify-center text-center bg-surface border border-primary/10 rounded-xl shadow-sm p-8">
                  <AlertTriangle className="w-10 h-10 text-primary mb-4" />
                  <h2 className="text-lg font-extrabold text-primary">{t({ en: 'Access Denied', ar: 'تم رفض الوصول' })}</h2>
                  <p className="text-xs text-primary font-semibold mt-1">
                    {t({ en: 'You do not have permission to access this page.', ar: 'ليس لديك إذن للوصول إلى هذه الصفحة.' })}
                  </p>
                </div>
              ) : isLockedPath ? (
                <LockedPage reason={currentModule.lockedReason || 'plan'} userRole={currentRole} />
              ) : (
                children
              )}
            </div>
          </div>

          <FeedbackWidget />
          <MobileBottomNav userRole={currentRole} navModules={navModules} />
        </main>
      </div>
    </div>
  );
}
