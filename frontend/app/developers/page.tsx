'use client';

import React from 'react';
import { useLocale } from '../providers';
import Link from 'next/link';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { Code, Terminal, Radio } from 'lucide-react';

export default function DevelopersLandingPage() {
  const { locale } = useLocale();
  const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';

  return (
    <div className="bg-surface text-primary min-h-screen flex flex-col font-sans" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <Header />

      <main className="flex-1 max-w-4xl mx-auto py-24 px-6 text-center space-y-8 animate-fadeIn">
        
        <div>
          <span className="text-xs font-extrabold tracking-widest text-accent uppercase">{t({ en: 'Developer Platform', fr: 'Plateforme pour dÃ©veloppeurs', ar: 'منصة المطورين', hi: 'à¤¡à¥à¤µà¤²à¤ªà¤° à¤ªà¥à¤²à¥à¤à¤«à¤¼à¥à¤°à¥à¤®' })}</span>
          <h1 className="text-4xl lg:text-5xl font-extrabold text-primary leading-tight tracking-tight mt-3">
            {t({ en: 'Build Custom AI Operations Pipelines', fr: 'Construire des pipelines d\'opÃ©rations d\'IA personnalisÃ©s', ar: 'بناء مسارات عمل مخصصة للذكاء الاصطناعي', hi: 'à¤à¤¸à¥à¤à¤® à¤à¤à¤ à¤à¤ªà¤°à¥à¤¶à¤à¤¸ à¤ªà¤¾à¤à¤ªà¤²à¤¾à¤à¤¨ à¤¬à¤¨à¤¾à¤à¤' })}
          </h1>
          <p className="text-sm font-semibold text-primary mt-4 leading-relaxed max-w-2xl mx-auto">
            {t({ en: 'Integrate SAQYN RABT into your active ERP, CRM, and Property Management Systems (PMS). Read API guidelines and SDK references.', fr: 'IntÃ©grez SAQYN RABT dans vos systÃ¨mes ERP, CRM et de gestion immobiliÃ¨re (PMS) actifs. Lisez les directives de l\'API et les rÃ©fÃ©rences SDK.', ar: 'قم بدمج SAQYN RABT مع أنظمة ERP و CRM و PMS الخاصة بشركتك. اقرأ إرشادات واجهة البرمجة ومراجع الـ SDK.', hi: 'SAQYN RABT à¤à¥ à¤à¤ªà¤¨à¥ à¤¸à¤à¥à¤°à¤¿à¤¯ à¤à¤à¤°à¤ªà¥, à¤¸à¥à¤à¤°à¤à¤® à¤à¤° à¤¸à¤à¤ªà¤¤à¥à¤¤à¤¿ à¤ªà¥à¤°à¤¬à¤à¤§à¤¨ à¤ªà¥à¤°à¤£à¤¾à¤²à¥ (à¤ªà¥à¤à¤®à¤à¤¸) à¤®à¥à¤ à¤à¤à¥à¤à¥à¤¤ à¤à¤°à¥à¤à¥¤ à¤à¤ªà¥à¤à¤ à¤¦à¤¿à¤¶à¤¾à¤¨à¤¿à¤°à¥à¤¦à¥à¤¶ à¤à¤° à¤à¤¸à¤¡à¥à¤à¥ à¤¸à¤à¤¦à¤°à¥à¤­ à¤ªà¤¢à¤¼à¥à¤à¥¤' })}
          </p>
        </div>

        <div className="flex gap-8 justify-center">
          <Link
            href="/developers/api-docs"
            className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-primary px-8 py-3 text-xs font-bold text-surface shadow-md hover:opacity-95 transition-all hover:scale-[1.01] hover:shadow-md"
          >
            {t({ en: 'API Reference Swagger', fr: 'RÃ©fÃ©rence API Swagger', ar: 'مرجع واجهة التطبيقات Swagger', hi: 'à¤à¤ªà¥à¤à¤ à¤¸à¤à¤¦à¤°à¥à¤­ à¤¸à¥à¤µà¥à¤à¤°' })}
          </Link>
          <Link
            href="/dashboard"
            className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-surface border border-primary/10 px-8 py-3 text-xs font-bold text-primary shadow-sm hover:bg-surface transition-all hover:scale-[1.01] hover:shadow-md"
          >
            {t({ en: 'Manage API Keys', fr: 'GÃ©rer les clÃ©s API', ar: 'إدارة مفاتيح الـ API', hi: 'à¤à¤ªà¥à¤à¤ à¤à¥à¤à¤à¥ à¤ªà¥à¤°à¤¬à¤à¤§à¤¿à¤¤ à¤à¤°à¥à¤' })}
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-primary/10 text-start">
          <div className="bg-surface border border-primary/10 rounded-xl p-8 shadow-sm hover:shadow-md hover:scale-[1.01] transition-all">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center mb-4">
              <Code className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-sm font-extrabold text-primary">JavaScript SDK</h3>
            <p className="text-xs text-primary font-semibold mt-2">Install our lightweight npm package to run chat streams and log usage data directly.</p>
          </div>

          <div className="bg-surface border border-primary/10 rounded-xl p-8 shadow-sm hover:shadow-md hover:scale-[1.01] transition-all">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center mb-4">
              <Terminal className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-sm font-extrabold text-primary">Python Library</h3>
            <p className="text-xs text-primary font-semibold mt-2">Fetch company request queues and automate data ingestion processes using our PyPI helper client.</p>
          </div>

          <div className="bg-surface border border-primary/10 rounded-xl p-8 shadow-sm hover:shadow-md hover:scale-[1.01] transition-all">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center mb-4">
              <Radio className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-sm font-extrabold text-primary">Outbound Webhooks</h3>
            <p className="text-xs text-primary font-semibold mt-2">Subscribe to real-time webhook dispatches to notify your Slack or customized backend servers on events.</p>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
