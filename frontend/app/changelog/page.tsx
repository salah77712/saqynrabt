'use client';

import React from 'react';
import { useLocale } from '../providers';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';

export default function ChangelogPage() {
  const { locale } = useLocale();
  const t = (obj: Record<string, string>) => locale === 'ar' ? obj.ar : obj.en;

  const logs = [
    {
      version: 'v1.2.0',
      date: 'July 4, 2026',
      title: t({ en: 'Collapsible Sidebars & Limit Monitors', ar: 'القوائم القابلة للطي ومراقبة حدود الاستهلاك' }),
      changes: [
        t({ en: 'Implemented collapsible sidebar with icon-only hovers and tooltips.', ar: 'تنفيذ شريط جانبي قابل للطي مع تلميحات للأيقونات.' }),
        t({ en: 'Added settings progress bars for metered text, voice, and RAG usage.', ar: 'إضافة أشرطة قياس الاستهلاك للنصوص، دقائق الصوت، وأسئلة الـ RAG.' }),
        t({ en: 'Integrated employee approvals capacity blocks.', ar: 'دمج التحقق من السعة والحد الأقصى للموافقة على الموظفين.' }),
      ],
    },
    {
      version: 'v1.1.0',
      date: 'June 29, 2026',
      title: t({ en: 'Stripe Webhooks & Overage Logs', ar: 'مدفوعات Stripe وسجلات التجاوز' }),
      changes: [
        t({ en: 'Configured automated Stripe Checkout triggers and billing callbacks.', ar: 'تهيئة مدفوعات Stripe وبوابات التحقق التلقائي.' }),
        t({ en: 'Added operational logs CSV exporters.', ar: 'إضافة أدوات تصدير سجلات التشغيل بصيغة CSV.' }),
      ],
    },
  ];

  return (
    <div className="bg-[#F8F9FB] text-[#1A202C] min-h-screen flex flex-col font-sans" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <Header />

      <main className="flex-1 max-w-3xl mx-auto py-24 px-6 w-full space-y-12 animate-fadeIn">
        {/* Header */}
        <div>
          <span className="text-xs font-extrabold tracking-widest text-[#2A5CFF] uppercase">{t({ en: 'Platform Updates', ar: 'تحديثات المنصة' })}</span>
          <h1 className="text-3xl font-extrabold text-[#141F33] tracking-tight mt-2">
            {t({ en: 'System Changelog', ar: 'سجل التغييرات وتحديثات النظام' })}
          </h1>
          <p className="text-xs font-semibold text-[#718096] mt-2">
            {t({ en: 'Follow our development path as we roll out new B2B private AI features.', ar: 'تابع مسار التطوير الخاص بنا بينما نطلق ميزات الذكاء الاصطناعي الخاص بالشركات.' })}
          </p>
        </div>

        {/* Changelog Timeline */}
        <div className="space-y-12 relative border-l border-gray-200 pl-6 md:pl-10">
          {logs.map((log, idx) => (
            <div key={idx} className="relative space-y-3">
              
              {/* Timeline Bullet */}
              <div className="absolute -left-[31px] md:-left-[47px] top-1.5 h-4 w-4 rounded-full bg-[#141F33] border-4 border-white shadow-sm" />

              <div className="flex items-center gap-3">
                <span className="text-[10px] font-extrabold uppercase bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  {log.version}
                </span>
                <span className="text-xs text-[#718096] font-bold">{log.date}</span>
              </div>

              <h3 className="text-lg font-extrabold text-[#141F33]">{log.title}</h3>
              
              <ul className="list-disc pl-5 text-xs font-semibold text-slate-600 space-y-2 leading-relaxed">
                {log.changes.map((change, cIdx) => (
                  <li key={cIdx}>{change}</li>
                ))}
              </ul>

            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
