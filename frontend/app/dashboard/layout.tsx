'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { UserButton, useUser } from '@clerk/nextjs';
import { useEntitlements, useLocale } from '../providers';
import { LanguageSwitcher } from '../../components/LanguageSwitcher';
import { DarkModeToggle } from '../../components/DarkModeToggle';
import { FeedbackWidget } from '../../components/FeedbackWidget';
import { MobileBottomNav } from '../../components/MobileBottomNav';
import { useSwipe } from '../../hooks/useSwipe';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { mockMode, setMockMode } = useEntitlements();
  const { locale } = useLocale();
  const { user, isLoaded: userLoaded } = useUser();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [verifError, setVerifError] = useState('');
  const [resending, setResending] = useState(false);
  const [resendStatus, setResendStatus] = useState('');
  const [pendingCount, setPendingCount] = useState(0);

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

  const handleVerifyEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setVerifying(true);
    setVerifError('');
    try {
      const emailObj = user.emailAddresses.find(e => e.verification.status !== 'verified');
      if (emailObj) {
        await emailObj.attemptVerification({ code: verificationCode });
        window.location.reload();
      }
    } catch (err: any) {
      console.error(err);
      setVerifError(err.errors?.[0]?.message || err.message || 'Verification failed. Please check the code.');
    } finally {
      setVerifying(false);
    }
  };

  const handleResendCode = async () => {
    if (!user) return;
    setResending(true);
    setResendStatus('');
    try {
      const emailObj = user.emailAddresses.find(e => e.verification.status !== 'verified');
      if (emailObj) {
        await emailObj.prepareVerification({ strategy: 'email_code' });
        setResendStatus('Verification code resent successfully.');
      }
    } catch (err: any) {
      console.error(err);
      setVerifError('Failed to resend code. Please try again.');
    } finally {
      setResending(false);
    }
  };

  const isEmailVerified = mockMode || !userLoaded || !user || user.emailAddresses.some(e => e.verification.status === 'verified');

  if (!isEmailVerified) {
    return (
      <div className="min-h-screen bg-[#F8F9FB] flex items-center justify-center px-4" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-200 w-full max-w-md animate-fadeIn text-center">
          <div className="text-4xl mb-4">✉️</div>
          <h2 className="text-xl font-extrabold text-[#141F33] mb-2">
            {t({ en: 'Verify Your Email', ar: 'تأكيد بريدك الإلكتروني' })}
          </h2>
          <p className="text-xs font-semibold text-[#718096] mb-6 leading-relaxed">
            {t({ 
              en: `Please enter the 6-digit verification code sent to your email.`, 
              ar: `يرجى إدخال رمز التحقق المكون من 6 أرقام المرسل إلى بريدك الإلكتروني.` 
            })}
          </p>

          {verifError && (
            <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-3.5 text-xs font-bold mb-6 text-left">
              ⚠️ {verifError}
            </div>
          )}

          {resendStatus && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-600 rounded-xl p-3.5 text-xs font-bold mb-6 text-left">
              ✅ {resendStatus}
            </div>
          )}

          <form onSubmit={handleVerifyEmail} className="space-y-4">
            <input
              type="text"
              placeholder="123456"
              maxLength={6}
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              className="w-full min-h-[44px] bg-slate-50 border border-gray-200 rounded-xl px-4 py-2 text-center text-lg font-bold tracking-widest focus:outline-none focus:ring-2 focus:ring-[#141F33]"
              required
            />
            <button
              type="submit"
              disabled={verifying}
              className="w-full bg-[#141F33] text-white font-bold py-4 rounded-xl text-xs hover:opacity-95 transition-all min-h-[44px] flex items-center justify-center disabled:opacity-40"
            >
              {verifying ? t({ en: 'Verifying...', ar: 'جاري التحقق...' }) : t({ en: 'Verify & Activate Account', ar: 'التحقق وتنشيط الحساب' })}
            </button>
          </form>

          <div className="mt-6 flex flex-col gap-3">
            <button
              type="button"
              disabled={resending}
              onClick={handleResendCode}
              className="text-xs font-bold text-[#2A5CFF] hover:underline disabled:opacity-40"
            >
              {resending ? t({ en: 'Resending...', ar: 'جاري إعادة الإرسال...' }) : t({ en: 'Resend Verification Code', ar: 'إعادة إرسال رمز التحقق' })}
            </button>
            <div className="pt-4 border-t border-gray-100 flex items-center justify-center gap-2">
              <UserButton afterSignOutUrl="/" />
              <span className="text-[10px] text-slate-400 font-bold">{t({ en: 'Sign Out', ar: 'تسجيل الخروج' })}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  useEffect(() => {
    fetch('/api/employees')
      .then(res => res.json())
      .then((data: any) => {
        const list = Array.isArray(data) ? data : data?.employees || [];
        const pending = list.filter((e: any) => e.status === 'pending').length;
        setPendingCount(pending);
      })
      .catch(err => {
        console.warn('Failed to load pending count, using mock:', err);
        setPendingCount(2);
      });
  }, []);

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

        {/* Sidebar Navigation - Hidden on mobile, visible on md+ */}
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
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="h-8 w-8 rounded-lg border border-gray-200 flex items-center justify-center text-slate-400 hover:text-[#141F33] hover:bg-slate-50 transition-colors"
              title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
            >
              {isCollapsed ? '→' : '←'}
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

        {isSidebarOpen && (
          <div
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 z-40 bg-slate-900/40 md:hidden backdrop-blur-sm"
          />
        )}

        {/* Page Content */}
        <main
          className="flex min-w-0 flex-1 flex-col h-full overflow-hidden"
          {...swipeHandlers}
          style={{ paddingBottom: 'calc(64px + env(safe-area-inset-bottom, 0px))' }}
        >
          {/* Mobile Top Header Bar */}
          <header className="flex h-14 w-full items-center justify-between border-b border-gray-200 bg-white px-4 md:hidden sticky top-0 z-30 shadow-sm shrink-0"
            style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}>
            <Link href="/" className="flex items-center gap-2 min-h-[44px]">
              <div className="w-7 h-7 bg-[#141F33] rounded-md flex items-center justify-center text-white font-bold text-xs">
                S
              </div>
              <span className="text-[#141F33] font-extrabold text-sm tracking-tight">SAQYN</span>
            </Link>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[8px] font-bold text-emerald-700">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                {t(dashboardContent.live)}
              </div>
              <button
                type="button"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                aria-label={isSidebarOpen ? 'Close sidebar menu' : 'Open sidebar menu'}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-[#141F33] min-h-[44px] min-w-[44px]"
              >
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.5 5H17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M2.5 10H17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M2.5 15H17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </header>

          {/* Desktop Page Header */}
          <header className="hidden md:block border-b border-gray-200 bg-white px-6 lg:px-8 py-5 sticky top-0 z-30 shadow-sm shrink-0">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[10px] font-extrabold uppercase tracking-widest text-[#718096]">{t(dashboardContent.clientDashboard)}</p>
                <h2 className="text-2xl font-extrabold text-[#141F33] tracking-tight mt-0.5">{currentTitle}</h2>
              </div>
              <div className="flex items-center gap-4">
                <LanguageSwitcher />
                <DarkModeToggle />
                <div className="flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-xs font-bold text-emerald-700">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  {t(dashboardContent.live)}
                </div>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8"
            style={{ WebkitOverflowScrolling: 'touch' }}>
            <div className="max-w-7xl mx-auto w-full">
              {children}
            </div>
          </div>

          <FeedbackWidget />
          <MobileBottomNav />
        </main>
      </div>
    </div>
  );
}
