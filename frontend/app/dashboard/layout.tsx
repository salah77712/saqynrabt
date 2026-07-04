'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { UserButton } from '@clerk/nextjs';
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
  const t = (obj: Record<string, string>) => locale === 'ar' ? obj.ar : obj.en;

  const isVoiceActivated = process.env.NEXT_PUBLIC_VOICE_AI_ACTIVATED === 'true';

  const dashboardContent = {
    overview: { en: 'Overview', ar: 'نظرة عامة' },
    staffKnowledge: { en: 'Staff Knowledge Hub', ar: 'مركز معرفة الموظفين' },
    guestQueue: { en: 'Guest & Client Queue', ar: 'طابور الضيوف والعملاء' },
    documents: { en: 'Documents Hub', ar: 'مركز المستندات' },
    approvals: { en: 'Pending Approvals', ar: 'الموافقات المعلقة' },
    settings: { en: 'Usage & Settings', ar: 'الاستخدام والإعدادات' },
    voice: { en: 'Voice Dispatch Hub', ar: 'مركز توزيع الصوت' },
    clientPortal: { en: 'Client Portal', ar: 'بوابة العميل' },
    sandbox: { en: 'Sandbox', ar: 'وضع الرمل' },
    demo: { en: 'Demo', ar: 'عرض توضيحي' },
    exit: { en: 'Exit', ar: 'خروج' },
    activeClient: { en: 'Active Client Admin', ar: 'مسؤول العميل النشط' },
    demoSandbox: { en: '⚠️ Demo sandbox mode is active for fast review.', ar: '⚠️ وضع رمل العرض النشط للمراجعة السريعة.' },
    configure: { en: 'Configure environment', ar: 'تكوين البيئة' },
    clientDashboard: { en: 'Client Dashboard', ar: 'لوحة تحكم العميل' },
    live: { en: 'Live', ar: 'مباشر' },
  };

  const menuItems = [
    { name: dashboardContent.overview, path: '/dashboard', icon: '◉' },
    { name: dashboardContent.staffKnowledge, path: '/dashboard/chat', icon: '💬' },
    { name: dashboardContent.guestQueue, path: '/dashboard/automation', icon: '⚡' },
    { name: dashboardContent.documents, path: '/dashboard/documents', icon: '📁' },
    { name: dashboardContent.approvals, path: '/dashboard/approvals', icon: '👤' },
    { name: dashboardContent.settings, path: '/dashboard/settings', icon: '⚙️' },
  ];

  if (isVoiceActivated) {
    menuItems.push({ name: dashboardContent.voice, path: '/dashboard/voice', icon: '📞' });
  }

  const currentTitle = pathname === '/dashboard'
    ? t(dashboardContent.overview)
    : menuItems.find((item) => item.path !== '/dashboard' && pathname.startsWith(item.path)) ? t(menuItems.find((item) => item.path !== '/dashboard' && pathname.startsWith(item.path))!.name) : t(dashboardContent.clientDashboard);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <div className="flex min-h-screen flex-col md:flex-row">
        <aside className="w-full border-b border-slate-200 bg-slate-950 text-slate-100 md:w-72 md:border-b-0 md:border-r md:border-slate-800">
          <div className="flex items-center justify-between px-6 py-5">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500 font-bold text-dark-900">
                SR
              </div>
              <div>
                <p className="text-sm font-semibold tracking-[0.25em]">SAQYN RABT</p>
                <p className="text-[11px] uppercase tracking-[0.3em] text-slate-400">{t(dashboardContent.clientPortal)}</p>
              </div>
            </Link>
            {mockMode && (
              <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-amber-300">
                {t(dashboardContent.sandbox)}
              </span>
            )}
          </div>

          <nav className="space-y-1 px-3 py-2">
            {menuItems.map((item) => {
              const isActive = pathname === item.path || (item.path !== '/dashboard' && pathname.startsWith(item.path));
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`flex items-center gap-3 rounded-2xl px-4 text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-brand-500 text-dark-900 shadow-lg shadow-brand-500/20'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                  style={{ minHeight: '44px' }}
                >
                  <span className="text-base">{item.icon}</span>
                  <span>{t(item.name)}</span>
                </Link>
              );
            })}
          </nav>

          <div className="mt-6 border-t border-slate-800 p-4">
            {mockMode ? (
              <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-3">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-white">Salah ({t(dashboardContent.demo)})</p>
                    <p className="text-[11px] text-slate-400">admin@alsafa.qa</p>
                  </div>
                  <button
                    onClick={() => {
                      setMockMode(false);
                      router.push('/');
                    }}
                    className="text-xs font-semibold text-brand-400 hover:text-white"
                  >
                    {t(dashboardContent.exit)}
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3 rounded-2xl border border-slate-800 bg-slate-900/80 p-3">
                <UserButton afterSignOutUrl="/" />
                <div>
                  <p className="text-sm font-semibold text-slate-100">Salah Al-Qahtani</p>
                  <p className="text-[11px] text-slate-400">{t(dashboardContent.activeClient)}</p>
                </div>
              </div>
            )}
          </div>
        </aside>

        <main className="flex min-w-0 flex-1 flex-col">
          {mockMode && (
            <div className="flex items-center justify-between border-b border-amber-200 bg-amber-50 px-6 py-2 text-xs font-semibold text-amber-700">
              <span>{t(dashboardContent.demoSandbox)}</span>
              <button onClick={() => router.push('/dashboard/settings')} className="underline hover:text-amber-900">
                {t(dashboardContent.configure)}
              </button>
            </div>
          )}

          <header className="border-b border-slate-200 bg-white/80 px-6 py-4 backdrop-blur">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-primary">{t(dashboardContent.clientDashboard)}</p>
                <h2 className="text-xl font-semibold text-slate-900">{currentTitle}</h2>
              </div>
              <div className="flex items-center gap-3">
                <LanguageSwitcher />
                <div className="flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  {t(dashboardContent.live)}
                </div>
              </div>
            </div>
          </header>


          <div className="flex-1 overflow-auto p-6 md:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
