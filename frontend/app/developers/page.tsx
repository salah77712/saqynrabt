'use client';

import React from 'react';
import { useLocale } from '../providers';
import Link from 'next/link';
import { MarketingHeader } from '../../components/MarketingHeader';
import { Footer } from '../../components/Footer';

export default function DevelopersLandingPage() {
  const { locale } = useLocale();
  const t = (obj: Record<string, string>) => locale === 'ar' ? obj.ar : obj.en;

  return (
    <div className="bg-[#F8F9FB] text-[#1A202C] min-h-screen flex flex-col font-sans" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <MarketingHeader />

      <main className="flex-1 max-w-4xl mx-auto py-24 px-6 text-center space-y-8 animate-fadeIn">
        
        <div>
          <span className="text-xs font-extrabold tracking-widest text-[#2A5CFF] uppercase">{t({ en: 'Developer Platform', ar: 'منصة المطورين' })}</span>
          <h1 className="text-4xl lg:text-5xl font-extrabold text-[#141F33] leading-tight tracking-tight mt-3">
            {t({ en: 'Build Custom AI Operations Pipelines', ar: 'بناء مسارات عمل مخصصة للذكاء الاصطناعي' })}
          </h1>
          <p className="text-sm font-semibold text-[#718096] mt-4 leading-relaxed max-w-2xl mx-auto">
            {t({ en: 'Integrate SAQYN RABT into your active ERP, CRM, and Property Management Systems (PMS). Read API guidelines and SDK references.', ar: 'قم بدمج SAQYN RABT مع أنظمة ERP و CRM و PMS الخاصة بشركتك. اقرأ إرشادات واجهة البرمجة ومراجع الـ SDK.' })}
          </p>
        </div>

        <div className="flex gap-4 justify-center">
          <Link
            href="/developers/api-docs"
            className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-[#141F33] px-8 py-3 text-xs font-bold text-white shadow-md hover:opacity-95 transition-all hover:scale-[1.02]"
          >
            {t({ en: 'API Reference Swagger', ar: 'مرجع واجهة التطبيقات Swagger' })}
          </Link>
          <Link
            href="/dashboard"
            className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-white border border-gray-200 px-8 py-3 text-xs font-bold text-[#141F33] shadow-sm hover:bg-slate-50 transition-all hover:scale-[1.02]"
          >
            {t({ en: 'Manage API Keys', ar: 'إدارة مفاتيح الـ API' })}
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 border-t border-gray-200 text-start">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-sm font-extrabold text-[#141F33]">JavaScript SDK</h3>
            <p className="text-xs text-[#718096] font-semibold mt-2">Install our lightweight npm package to run chat streams and log telemetry audits directly.</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-sm font-extrabold text-[#141F33]">Python Library</h3>
            <p className="text-xs text-[#718096] font-semibold mt-2">Fetch company request queues and automate data ingestion processes using our PyPI helper client.</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-sm font-extrabold text-[#141F33]">Outbound Webhooks</h3>
            <p className="text-xs text-[#718096] font-semibold mt-2">Subscribe to real-time webhook dispatches to notify your Slack or customized backend servers on events.</p>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
