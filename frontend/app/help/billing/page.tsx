'use client';

import React from 'react';
import { useLocale } from '../../providers';
import Link from 'next/link';
import { Header } from '../../../components/Header';
import { Footer } from '../../../components/Footer';

export default function BillingHelpPage() {
  const { locale } = useLocale();
  const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';

  const sidebarLinks = [
    { name: { en: 'Getting Started', ar: 'دليل البداية' }, path: '/help/getting-started' },
    { name: { en: 'Call Automation', ar: 'أتمتة المكالمات' }, path: '/help/automation' },
    { name: { en: 'RAG Chatbot Help', ar: 'مساعدة المساعد الذكي' }, path: '/help/chatbot' },
    { name: { en: 'Pricing & Billing', ar: 'الأسعار والفوترة' }, path: '/help/billing' },
  ];

  return (
    <div className="bg-[#F8F9FB] text-[#1A202C] min-h-screen flex flex-col font-sans" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <Header />

      <main className="flex-1 max-w-6xl mx-auto py-16 px-6 w-full flex flex-col md:flex-row gap-12">
        {/* Help Center Sidebar */}
        <aside className="w-full md:w-64 shrink-0 space-y-2">
          <h3 className="text-xs font-extrabold text-[#718096] uppercase tracking-widest px-4 mb-4">
            {t({ en: 'Help Categories', ar: 'أقسام المساعدة' })}
          </h3>
          {sidebarLinks.map((link) => {
            const isActive = link.path === '/help/billing';
            return (
              <Link
                key={link.path}
                href={link.path}
                className={`flex items-center px-4 rounded-xl text-xs font-extrabold transition-all ${
                  isActive
                    ? 'bg-[#141F33] text-white'
                    : 'text-[#718096] hover:bg-white hover:text-[#141F33] border border-transparent hover:border-gray-200'
                }`}
                style={{ minHeight: '44px' }}
              >
                {t(link.name)}
              </Link>
            );
          })}
        </aside>

        {/* Content Panel */}
        <div className="flex-1 bg-white border border-gray-200 rounded-2xl p-8 md:p-12 shadow-sm space-y-6">
          <div>
            <span className="text-[10px] font-extrabold tracking-widest text-[#2A5CFF] uppercase">{t({ en: 'Documentation', ar: 'الوثائق والكتيبات' })}</span>
            <h1 className="text-3xl font-extrabold text-[#141F33] tracking-tight mt-2">
              {t({ en: 'Pricing & Overage Policies', ar: 'سياسات الأسعار والتجاوز' })}
            </h1>
            <p className="text-xs font-semibold text-[#718096] mt-2">
              {t({ en: 'Configure auto-overage limits, verify monthly metrics, and review billing prorations.', ar: 'تهيئة حدود التجاوز التلقائي، التحقق من المقاييس الشهرية، ومراجعة الحسابات.' })}
            </p>
          </div>

          <div className="border-t border-gray-100 pt-6 space-y-6 text-xs text-slate-700 font-semibold leading-relaxed">
            <div>
              <h2 className="text-sm font-extrabold text-[#141F33] mb-2">Monthly Subscriptions</h2>
              <p>SAQYN RABT subscriptions are billed monthly at the beginning of each cycle. Active plans include fixed allotments of text requests, voice minutes, and indexed files.</p>
            </div>

            <div>
              <h2 className="text-sm font-extrabold text-[#141F33] mb-2">Automatic Overage Consent</h2>
              <p>To prevent operations from pausing when plan capacity hits 100%, check the "I approve automatic billing overages" toggle in Settings. Overages are billed at metered rates directly to your card.</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
