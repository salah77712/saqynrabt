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
    { name: { en: 'Getting Started', fr: 'Pour commencer', ar: 'دليل البداية', hi: 'à¤¶à¥à¤°à¥à¤à¤¤ à¤à¤°à¤¨à¤¾' }, path: '/help/getting-started' },
    { name: { en: 'Call Automation', fr: 'Automatisation des appels', ar: 'أتمتة المكالمات', hi: 'à¤à¥à¤² à¤à¤à¥à¤®à¥à¤¶à¤¨' }, path: '/help/automation' },
    { name: { en: 'RAG Chatbot Help', fr: 'Aide au chatbot RAG', ar: 'مساعدة المساعد الذكي', hi: 'à¤à¤°à¤à¤à¥ à¤à¥à¤à¤¬à¥à¤ à¤¸à¤¹à¤¾à¤¯à¤¤à¤¾' }, path: '/help/chatbot' },
    { name: { en: 'Pricing & Billing', fr: 'Tarification & Facturation', ar: 'الأسعار والفوترة', hi: 'à¤®à¥à¤²à¥à¤¯ à¤¨à¤¿à¤°à¥à¤§à¤¾à¤°à¤£ à¤à¤° à¤¬à¤¿à¤²à¤¿à¤à¤' }, path: '/help/billing' },
  ];

  return (
    <div className="bg-surface text-primary min-h-screen flex flex-col font-sans" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <Header />

      <main className="flex-1 max-w-6xl mx-auto py-16 px-6 w-full flex flex-col md:flex-row gap-16">
        {/* Help Center Sidebar */}
        <aside className="w-full md:w-64 shrink-0 space-y-2">
          <h3 className="text-xs font-extrabold text-primary uppercase tracking-widest px-4 mb-4">
            {t({ en: 'Help Categories', fr: 'CatÃ©gories d\'aide', ar: 'أقسام المساعدة', hi: 'à¤¸à¤¹à¤¾à¤¯à¤¤à¤¾ à¤¶à¥à¤°à¥à¤£à¤¿à¤¯à¤¾à¤' })}
          </h3>
          {sidebarLinks.map((link) => {
            const isActive = link.path === '/help/billing';
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
            <span className="text-xs font-extrabold tracking-widest text-accent uppercase">{t({ en: 'Documentation', fr: 'Documentation', ar: 'الوثائق والكتيبات', hi: 'à¤¦à¤¸à¥à¤¤à¤¾à¤µà¥à¤à¤¼à¥à¤à¤°à¤£' })}</span>
            <h1 className="text-3xl font-extrabold text-primary tracking-tight mt-2">
              {t({ en: 'Pricing & Overage Policies', fr: 'Tarification & Politiques de dÃ©passement', ar: 'سياسات الأسعار والتجاوز', hi: 'à¤®à¥à¤²à¥à¤¯ à¤¨à¤¿à¤°à¥à¤§à¤¾à¤°à¤£ à¤à¤° à¤à¤µà¤°à¤à¤ à¤¨à¥à¤¤à¤¿à¤¯à¤¾à¤' })}
            </h1>
            <p className="text-xs font-semibold text-primary mt-2">
              {t({ en: 'Configure au limits, verify monthly metrics, and review billing prorations.', fr: 'Configurez les limites de dÃ©passement automatique, vÃ©rifiez les mesures mensuelles et examinez les prorations de facturation.', ar: 'تهيئة حدود التجاوز التلقائي، التحقق من المقاييس الشهرية، ومراجعة الحسابات.', hi: 'à¤à¤à¥-à¤à¤µà¤°à¤à¤ à¤¸à¥à¤®à¤¾à¤à¤ à¤à¥à¤¨à¥à¤«à¤¼à¤¿à¤à¤° à¤à¤°à¥à¤, à¤®à¤¾à¤¸à¤¿à¤ à¤®à¥à¤à¥à¤°à¤¿à¤ à¤¸à¤¤à¥à¤¯à¤¾à¤ªà¤¿à¤¤ à¤à¤°à¥à¤, à¤à¤° à¤¬à¤¿à¤²à¤¿à¤à¤ à¤ªà¥à¤°à¥à¤°à¥à¤à¥à¤¶à¤¨ à¤à¥ à¤¸à¤®à¥à¤à¥à¤·à¤¾ à¤à¤°à¥à¤à¥¤' })}
            </p>
          </div>

          <div className="border-t border-primary/10 pt-6 space-y-6 text-xs text-primary font-semibold leading-relaxed">
            <div>
              <h2 className="text-sm font-extrabold text-primary mb-2">Monthly Subscriptions</h2>
              <p>SAQYN RABT subscriptions are billed monthly at the beginning of each cycle. Active plans include fixed allotments of text requests, voice minutes, and indexed files.</p>
            </div>

            <div>
              <h2 className="text-sm font-extrabold text-primary mb-2">Automatic Overage Consent</h2>
              <p>To prevent operations from pausing when plan capacity hits 100%, check the "I approve automatic billing overages" toggle in Settings. Overages are billed at metered rates directly to your card.</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
