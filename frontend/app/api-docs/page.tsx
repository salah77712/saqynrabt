'use client';

import React from 'react';
import { useLocale } from '../providers';
import { MarketingHeader } from '../../components/MarketingHeader';
import { Footer } from '../../components/Footer';

export default function ApiDocsPage() {
  const { locale } = useLocale();
  const t = (obj: Record<string, string>) => locale === 'ar' ? obj.ar : obj.en;

  const endpoints = [
    {
      method: 'POST',
      path: '/api/chat',
      desc: t({ en: 'Send a prompt to the RAG knowledge chatbot. Returns streaming AI replies.', ar: 'إرسال سؤال إلى المساعد الذكي المعتمد على الـ RAG. يعيد ردود البث.' }),
      headers: [
        { name: 'Authorization', desc: 'Bearer <SAQYN-JWT-TOKEN>' },
        { name: 'Content-Type', desc: 'application/json' },
      ],
      body: JSON.stringify({ message: 'What is the check-in time?' }, null, 2),
    },
    {
      method: 'POST',
      path: '/api/webhook',
      desc: t({ en: 'Clerk user webhook receiver. Processes auth registrations and edits.', ar: 'مستقبل ويب هوك Clerk. يعالج عمليات التسجيل والتعديل للحسابات.' }),
      headers: [
        { name: 'svix-id', desc: 'Svix unique message ID' },
        { name: 'svix-signature', desc: 'HMAC validation signature' },
      ],
      body: JSON.stringify({ type: 'user.created', data: { id: 'user_123', email: 'ahmed@alsafa.qa' } }, null, 2),
    },
  ];

  return (
    <div className="bg-[#F8F9FB] text-[#1A202C] min-h-screen flex flex-col font-sans" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <MarketingHeader />

      <main className="flex-1 max-w-4xl mx-auto py-24 px-6 w-full space-y-12">
        {/* Header */}
        <div>
          <span className="text-xs font-extrabold tracking-widest text-[#2A5CFF] uppercase">{t({ en: 'Developer API Console', ar: 'منصة واجهة برمجة التطبيقات للمطورين' })}</span>
          <h1 className="text-3xl font-extrabold text-[#141F33] tracking-tight mt-2">
            {t({ en: 'Public API Documentation', ar: 'توثيق واجهة برمجة التطبيقات العامة' })}
          </h1>
          <p className="text-xs font-semibold text-[#718096] mt-2">
            {t({ en: 'Integrate your existing company systems with SAQYN RABT webhook triggers and chat streams.', ar: 'قم بدمج أنظمة شركتك الحالية مع مشغلات الويب هوك وبث المحادثات لـ SAQYN RABT.' })}
          </p>
        </div>

        {/* Endpoints List */}
        <div className="space-y-8">
          {endpoints.map((ep, idx) => (
            <div key={idx} className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm space-y-6">
              
              {/* Method and Path */}
              <div className="flex items-center gap-3">
                <span className="bg-[#141F33] text-white text-[10px] font-extrabold px-3 py-1 rounded-lg uppercase tracking-wider">
                  {ep.method}
                </span>
                <span className="text-xs font-mono font-bold text-slate-800 bg-slate-50 border border-slate-100 px-3 py-1 rounded-lg">
                  {ep.path}
                </span>
              </div>

              {/* Desc */}
              <p className="text-xs font-semibold text-[#718096] leading-relaxed">
                {ep.desc}
              </p>

              {/* Headers */}
              <div>
                <h4 className="text-xs font-extrabold text-[#141F33] mb-2">{t({ en: 'Required Headers', ar: 'الهيدرز المطلوبة' })}</h4>
                <div className="space-y-1.5">
                  {ep.headers.map((h, i) => (
                    <div key={i} className="flex justify-between items-center text-[10px] font-bold py-2 border-b border-gray-100">
                      <span className="font-mono text-[#2A5CFF]">{h.name}</span>
                      <span className="text-slate-500">{h.desc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Body Schema */}
              <div>
                <h4 className="text-xs font-extrabold text-[#141F33] mb-2">{t({ en: 'Request JSON Body Schema', ar: 'هيكل طلب الـ JSON' })}</h4>
                <pre className="bg-slate-950 text-slate-200 rounded-xl p-4 text-[10px] font-mono overflow-x-auto leading-relaxed">
                  {ep.body}
                </pre>
              </div>

            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
