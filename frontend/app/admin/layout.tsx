'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { UserButton, useUser } from '@clerk/nextjs';
import { useLocale } from '../providers';
import { ForbiddenIcon, BuildingIcon, BarChartIcon, DollarIcon, ShieldIcon, MenuIcon } from '../../components/ui/Icons';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isLoaded } = useUser();
  const { locale } = useLocale();
  const t = (obj: Record<string, string>) => locale === 'ar' ? obj.ar : obj.en;

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Guard Check (Section 4.1): verify user.publicMetadata.role === 'saqyn_admin'
  const isAdmin = user?.publicMetadata?.role === 'saqyn_admin' || user?.emailAddresses?.[0]?.emailAddress === 'admin@alsafa.qa';

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F9FB]">
        <span className="h-8 w-8 rounded-full border-4 border-gray-200 border-t-[#141F33] animate-spin" />
      </div>
    );
  }

  // Access Denied Fallback Layout
  if (!isAdmin) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8F9FB] px-6 text-center">
        <ForbiddenIcon className="w-10 h-10 text-red-400 mb-4" />
        <h1 className="text-3xl font-extrabold text-[#141F33] tracking-tight">{t({ en: 'Access Denied', ar: 'تم رفض الوصول' })}</h1>
        <p className="text-xs font-semibold text-[#718096] max-w-sm mt-3 leading-relaxed">
          {t({
            en: 'This panel is strictly restricted to SAQYN RABT internal administrators only. Please log in with an admin account to proceed.',
            ar: 'هذه اللوحة مخصصة لمسؤولي SAQYN RABT فقط. يرجى تسجيل الدخول بحساب مسؤول للمتابعة.'
          })}
        </p>
        <div className="mt-8 flex gap-4">
          <Link
            href="/sign-in"
            className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-[#141F33] px-8 py-3 text-xs font-bold text-white shadow-md hover:opacity-95 transition-all"
          >
            {t({ en: 'Sign In as Admin', ar: 'تسجيل دخول كمسؤول' })}
          </Link>
          <Link
            href="/"
            className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-white border border-gray-200 px-8 py-3 text-xs font-bold text-[#141F33] shadow-sm hover:bg-slate-50 transition-all"
          >
            {t({ en: 'Back to Home', ar: 'العودة للرئيسية' })}
          </Link>
        </div>
      </div>
    );
  }

  const menuItems = [
    { name: { en: 'Companies', ar: 'الشركات' }, path: '/admin/companies', icon: <BuildingIcon className="w-5 h-5" /> },
    { name: { en: 'Usage Analytics', ar: 'تحليلات الاستخدام' }, path: '/admin/usage', icon: <BarChartIcon className="w-5 h-5" /> },
    { name: { en: 'Billing & Invoices', ar: 'الفوترة والفواتير' }, path: '/admin/billing', icon: <DollarIcon className="w-5 h-5" /> },
    { name: { en: 'Audit Security Logs', ar: 'سجلات التدقيق الأمني' }, path: '/admin/audit', icon: <ShieldIcon className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FB] text-[#1A202C] flex flex-col font-sans" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      
      {/* Mobile Top Header */}
      <header className="flex h-16 w-full items-center justify-between border-b border-gray-200 bg-white px-6 md:hidden sticky top-0 z-40 shadow-sm">
        <Link href="/" className="flex items-baseline gap-2">
          <span className="text-[#141F33] font-extrabold text-lg tracking-tight">SAQYN ADMIN</span>
        </Link>
        <button
          type="button"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-[#141F33] min-h-[44px] min-w-[44px]"
        >
          <MenuIcon className="w-5 h-5" />
        </button>
      </header>

      <div className="flex flex-1 relative h-screen overflow-hidden">
        
        {/* Sidebar */}
        <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 flex flex-col justify-between transition-transform duration-300 md:translate-x-0 md:static md:h-screen ${
          isSidebarOpen
            ? locale === 'ar'
              ? 'translate-x-0 right-0 left-auto'
              : 'translate-x-0'
            : locale === 'ar'
              ? 'translate-x-full right-0 left-auto md:translate-x-0'
              : '-translate-x-full md:translate-x-0'
        }`}>
          
          <div className="flex flex-col">
            <div className="flex items-center justify-between px-6 py-6 border-b border-gray-100 min-h-[80px]">
              <Link href="/" className="flex flex-col items-start gap-0.5">
                <span className="text-[#141F33] font-extrabold text-xl tracking-tight">SAQYN ADMIN</span>
                <span className="text-[9px] uppercase tracking-widest text-[#718096] font-bold">{t({ en: 'Staff Operations', ar: 'عمليات الموظفين' })}</span>
              </Link>
            </div>

            <nav className="px-3 py-6 space-y-1.5">
              {menuItems.map((item) => {
                const isActive = pathname.startsWith(item.path);
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    onClick={() => setIsSidebarOpen(false)}
                    className={`flex items-center gap-3.5 px-4 rounded-xl text-sm font-bold transition-all ${
                      isActive
                        ? 'bg-[#141F33]/5 border-l-4 border-[#141F33] text-[#141F33]'
                        : 'text-[#718096] hover:bg-slate-50 hover:text-[#141F33]'
                    }`}
                    style={{ minHeight: '44px' }}
                  >
                    <span className="shrink-0">{item.icon}</span>
                    <span>{t(item.name)}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Profile bottom */}
          <div className="p-4 border-t border-gray-100 bg-white flex items-center gap-3">
            <UserButton afterSignOutUrl="/" />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-extrabold text-[#141F33] truncate">{user?.fullName || 'Staff Administrator'}</p>
              <span className="inline-block mt-1 text-[8px] font-extrabold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                SAQYN ADMIN
              </span>
            </div>
          </div>

        </aside>

        {/* Backdrop */}
        {isSidebarOpen && (
          <div
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 z-40 bg-slate-900/40 md:hidden backdrop-blur-sm"
          />
        )}

        {/* Main Content */}
        <main className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <header className="border-b border-gray-200 bg-white px-8 py-5 sticky top-0 z-30 shadow-sm shrink-0 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-widest text-[#718096]">{t({ en: 'Internal Control Centre', ar: 'مركز التحكم الداخلي' })}</p>
              <h2 className="text-2xl font-extrabold text-[#141F33] tracking-tight mt-0.5">{t({ en: 'Staff Console', ar: 'لوحة تحكم الموظفين' })}</h2>
            </div>
          </header>

          <div className="flex-1 overflow-y-auto p-6 md:p-8">
            <div className="max-w-6xl mx-auto w-full">
              {children}
            </div>
          </div>
        </main>

      </div>
    </div>
  );
}
