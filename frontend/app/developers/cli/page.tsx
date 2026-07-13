'use client';

import React from 'react';
import { useLocale } from '../../providers';
import { Header } from '../../../components/Header';
import { Footer } from '../../../components/Footer';

export default function DevelopersCliDocsPage() {
  const { locale } = useLocale();
  const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';

  const commands = [
    { cmd: 'saqyn login', desc: t({ en: 'Authenticate CLI with your Clerk developer account credentials.', ar: 'تسجيل الدخول للمطور باستخدام بيانات Clerk.' }) },
    { cmd: 'saqyn chat "Is early checkout allowed?"', desc: t({ en: 'Send a prompt query and retrieve streaming RAG answers directly.', ar: 'إرسال سؤال واستلام إجابة المساعد الذكي فوريًا.' }) },
    { cmd: 'saqyn upload handbook.pdf', desc: t({ en: 'Upload and index a PDF file into the vector knowledge base.', ar: 'تحميل وفهرسة ملف PDF في قاعدة المعرفة.' }) },
  ];

  return (
    <div className="bg-[#F8F9FB] text-[#1A202C] min-h-screen flex flex-col font-sans" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <Header />

      <main className="flex-1 max-w-4xl mx-auto py-24 px-6 w-full space-y-12 animate-fadeIn">
        {/* Header */}
        <div>
          <span className="text-xs font-extrabold tracking-widest text-[#2A5CFF] uppercase">{t({ en: 'Command-Line Tools', ar: 'أدوات واجهة الأوامر CLI' })}</span>
          <h1 className="text-3xl font-extrabold text-[#141F33] tracking-tight mt-2">
            {t({ en: 'Official SAQYN CLI Guide', ar: 'دليل أداة CLI الرسمية لـ SAQYN' })}
          </h1>
          <p className="text-xs font-semibold text-[#718096] mt-2">
            {t({ en: 'Manage documents, index files, and run chat integrations directly from your terminal.', ar: 'إدارة المستندات، وفهرسة الملفات، وتشغيل محادثات المساعد مباشرة من التيرمينال.' })}
          </p>
        </div>

        {/* CLI Steps */}
        <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm space-y-6">
          <h3 className="text-sm font-extrabold text-[#141F33]">{t({ en: 'Core CLI Command Reference', ar: 'مرجع أوامر CLI الأساسية' })}</h3>

          <div className="space-y-4">
            {commands.map((c, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-slate-100 bg-slate-50 space-y-2">
                <code className="text-xs font-mono font-bold text-[#2A5CFF]">{c.cmd}</code>
                <p className="text-[11px] font-semibold text-slate-500 leading-normal">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
