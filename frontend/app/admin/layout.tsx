'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { UserButton, useUser } from '@clerk/nextjs';
import { useLocale } from '../providers';
import { Ban, Building2, BarChart3, DollarSign, Shield, Menu } from 'lucide-react';
import NoIndex from '../../components/NoIndex';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isLoaded } = useUser();
  const { locale } = useLocale();
  const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Guard Check (Section 4.1): verify user.publicMetadata.role === 'saqyn_admin'
  const isAdmin = user?.publicMetadata?.role === 'saqyn_admin';

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <span className="h-8 w-8 rounded-full border-4 border-primary/10 border-t-[#141F33] animate-spin" />
      </div>
    );
  }

  // Access Denied Fallback Layout
  if (!isAdmin) {
    return (
<div className="min-h-screen flex flex-col items-center justify-center bg-surface px-6 text-center">
  <Ban className="w-10 h-10 text-primary mb-4" />
        <h1 className="text-3xl font-extrabold text-primary tracking-tight">{t({ en: 'Access Denied', ar: '???? ?????? ????????????' })}</h1>
        <p className="text-xs font-semibold text-primary/60 max-w-sm mt-3 leading-relaxed">
          {t({
            en: 'This panel is strictly restricted to SAQYN RABT internal administrators only. Please log in with an admin account to proceed.',
            ar: '?????? ???????????? ?????????? ?????????????? SAQYN RABT ??????. ???????? ?????????? ???????????? ?????????? ?????????? ????????????????.'
          })}
        </p>
        <div className="mt-8 flex gap-8">
          <Link
            href="/sign-in"
            className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-primary px-8 py-3 text-xs font-bold text-surface shadow-md hover:opacity-95 transition-all"
          >
            {t({ en: 'Sign In as Admin', ar: '?????????? ???????? ????????????' })}
          </Link>
          <Link
            href="/"
            className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-surface border border-primary/10 px-8 py-3 text-xs font-bold text-primary shadow-sm hover:bg-primary transition-all"
          >
            {t({ en: 'Back to Home', ar: '???????????? ????????????????' })}
          </Link>
        </div>
      </div>
    );
  }

  const menuItems = [
    { name: { en: 'Companies', ar: '??????????????' }, path: '/admin/companies', icon: <Building2 className="w-5 h-5" /> },
    { name: { en: 'Usage Analytics', ar: '?????????????? ??????????????????' }, path: '/admin/usage', icon: <BarChart3 className="w-5 h-5" /> },
    { name: { en: 'Billing & Invoices', ar: '?????????????? ??????????????????' }, path: '/admin/billing', icon: <DollarSign className="w-5 h-5" /> },
    { name: { en: 'Audit Security Logs', ar: '?????????? ?????????????? ????????????' }, path: '/admin/audit', icon: <Shield className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-surface text-primary flex flex-col font-sans" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
<NoIndex />
      
      {/* Mobile Top Header */}
      <header className="flex h-16 w-full items-center justify-between border-b border-primary/10 bg-surface px-6 md:hidden sticky top-0 z-40 shadow-sm">
        <Link href="/" className="flex items-baseline gap-3">
          <span className="text-primary font-extrabold text-lg tracking-tight">SAQYN ADMIN</span>
        </Link>
        <button
          type="button"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-primary/10 text-primary min-h-[44px] min-w-[44px]"
        >
          <Menu className="w-5 h-5" />
        </button>
      </header>

      <div className="flex flex-1 relative h-screen overflow-hidden">
        
        {/* Sidebar */}
        <aside className={`fixed inset-y-0 start-0 z-50 w-64 bg-surface border-e border-primary/10 flex flex-col justify-between transition-transform duration-300 md:translate-x-0 md:static md:h-screen ${
          isSidebarOpen
            ? locale === 'ar'
              ? 'translate-x-0 end-0 start-auto'
              : 'translate-x-0'
            : locale === 'ar'
              ? 'translate-x-full end-0 start-auto md:translate-x-0'
              : '-translate-x-full md:translate-x-0'
        }`}>
          
          <div className="flex flex-col">
            <div className="flex items-center justify-between px-6 py-6 border-b border-primary/10 min-h-[80px]">
              <Link href="/" className="flex flex-col items-start gap-0.5">
                <span className="text-primary font-extrabold text-xl tracking-tight">SAQYN ADMIN</span>
                <span className="text-[9px] uppercase tracking-widest text-primary/60 font-bold">{t({ en: 'Staff Operations', ar: '???????????? ????????????????' })}</span>
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
                    className={`flex items-center gap-4.5 px-4 rounded-xl text-sm font-bold transition-all ${
                      isActive
                        ? 'bg-primary border-s-4 border-accent text-surface'
                        : 'text-primary/60 hover:bg-primary hover:text-surface'
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
          <div className="p-4 border-t border-primary/10 bg-surface flex items-center gap-4">
            <UserButton />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-extrabold text-primary truncate">{user?.fullName || 'Staff Administrator'}</p>
<span className="inline-block mt-1 text-[8px] font-extrabold uppercase tracking-widest text-accent bg-surface px-2 py-0.5 rounded-full border border-primary/10">
  SAQYN ADMIN
</span>
            </div>
          </div>

        </aside>

        {/* Backdrop */}
        {isSidebarOpen && (
          <div
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 z-40 bg-primary md:hidden backdrop-blur-sm"
          />
        )}

        {/* Main Content */}
        <main className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <header className="border-b border-primary/10 bg-surface px-8 py-5 sticky top-0 z-30 shadow-sm shrink-0 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-widest text-primary/60">{t({ en: 'Internal Control Centre', ar: '???????? ???????????? ??????????????' })}</p>
              <h2 className="text-2xl font-extrabold text-primary tracking-tight mt-0.5">{t({ en: 'Staff Console', ar: '???????? ???????? ????????????????' })}</h2>
            </div>
          </header>

          <div className="flex-1 overflow-y-auto p-8 md:p-8">
            <div className="max-w-6xl mx-auto w-full">
              {children}
            </div>
          </div>
        </main>

      </div>
    </div>
  );
}
