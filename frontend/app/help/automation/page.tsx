'use client';

import React from 'react';
import { useLocale } from '../../providers';
import Link from 'next/link';
import { Header } from '../../../components/Header';
import { Footer } from '../../../components/Footer';

export default function AutomationHelpPage() {
  const { locale } = useLocale();
  const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';

  const sidebarLinks = [
    { name: { en: 'Getting Started', ar: 'دليل البداية' }, path: '/help/getting-started' },
    { name: { en: 'Call Automation', ar: 'أتمتة المكالمات' }, path: '/help/automation' },
    { name: { en: 'RAG Chatbot Help', ar: 'مساعدة المساعد الذكي' }, path: '/help/chatbot' },
    { name: { en: 'Pricing & Billing', ar: 'الأسعار والفوترة' }, path: '/help/billing' },
  ];

  return (
    <div className="bg-surface text-primary min-h-screen flex flex-col font-sans" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <Header />

      <main className="flex-1 max-w-6xl mx-auto py-16 px-6 w-full flex flex-col md:flex-row gap-16">
        {/* Help Center Sidebar */}
        <aside className="w-full md:w-64 shrink-0 space-y-2">
          <h3 className="text-xs font-extrabold text-primary uppercase tracking-widest px-4 mb-4">
            {t({ en: 'Help Categories', ar: 'أقسام المساعدة' })}
          </h3>
          {sidebarLinks.map((link) => {
            const isActive = link.path === '/help/automation';
            return (
              <Link
                key={link.path}
                href={link.path}
                className={`flex items-center px-4 rounded-xl text-xs font-extrabold transition-all min-h-[44px] ${
                  isActive
                    ? 'bg-primary text-surface'
: 'text-primary hover:bg-surface hover:text-primary border border-transparent hover:border-primary/10'
}`}>
</Link>
            );
          })}
        </aside>

        {/* Content Panel */}
        <div className="flex-1 bg-surface border border-primary/10 rounded-xl p-8 shadow-sm space-y-6">
          <div>
            <span className="text-xs font-extrabold tracking-widest text-accent uppercase">{t({ en: 'Documentation', ar: 'الوثائق والكتيبات' })}</span>
            <h1 className="text-3xl font-extrabold text-primary tracking-tight mt-2">
              {t({ en: 'Business Call Automation', ar: 'أتمتة المكالمات الهاتفية' })}
            </h1>
            <p className="text-xs font-semibold text-primary mt-2">
              {t({ en: 'Configure incoming voice dispatches, queue routers, and scheduling integrations.', ar: 'تهيئة وتكوين توزيع المكالمات الصوتية الواردة، وموجهات الطابور.' })}
            </p>
          </div>

          <div className="border-t border-primary/10 pt-6 space-y-6 text-xs text-primary font-semibold leading-relaxed">
            <div>
              <h2 className="text-sm font-extrabold text-primary mb-2">Voice Call Dispatch Routing</h2>
              <p>SAQYN RABT uses Vapi VoIP integrations to answer incoming customer phone bookings. The voice agent listens in real-time, matches queries against company handbook context, and schedules bookings automatically.</p>
            </div>

            <div>
              <h2 className="text-sm font-extrabold text-primary mb-2">Live Queue Monitor</h2>
              <p>Every call is routed and logged in your *Automation Queue* tab. You can filter by request type (e.g., booking, complaint, order) and manually assign departments to handle pending customer files.</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
