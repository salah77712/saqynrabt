'use client';

import React from 'react';
import { useLocale } from '../../providers';
import Link from 'next/link';
import { MarketingHeader } from '../../../components/MarketingHeader';
import { Footer } from '../../../components/Footer';

export default function ChatbotHelpPage() {
  const { locale } = useLocale();
  const t = (obj: Record<string, string>) => locale === 'ar' ? obj.ar : obj.en;

  const sidebarLinks = [
    { name: { en: '🚀 Getting Started', ar: '🚀 دليل البداية' }, path: '/help/getting-started' },
    { name: { en: '🤖 Call Automation', ar: '🤖 أتمتة المكالمات' }, path: '/help/automation' },
    { name: { en: '🧠 RAG Chatbot Help', ar: '🧠 مساعدة المساعد الذكي' }, path: '/help/chatbot' },
    { name: { en: '💳 Pricing & Billing', ar: '💳 الأسعار والفوترة' }, path: '/help/billing' },
  ];

  return (
    <div className="bg-[#F8F9FB] text-[#1A202C] min-h-screen flex flex-col font-sans" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <MarketingHeader />

      <main className="flex-1 max-w-6xl mx-auto py-16 px-6 w-full flex flex-col md:flex-row gap-12">
        {/* Help Center Sidebar */}
        <aside className="w-full md:w-64 shrink-0 space-y-2">
          <h3 className="text-xs font-extrabold text-[#718096] uppercase tracking-widest px-4 mb-4">
            {t({ en: 'Help Categories', ar: 'أقسام المساعدة' })}
          </h3>
          {sidebarLinks.map((link) => {
            const isActive = link.path === '/help/chatbot';
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
              {t({ en: 'RAG Knowledge Chatbot Help', ar: 'مساعدة المساعد الذكي المعتمد على الـ RAG' })}
            </h1>
            <p className="text-xs font-semibold text-[#718096] mt-2">
              {t({ en: 'Learn about indexed document search, citations, and unanswered gaps.', ar: 'تعرف على البحث في المستندات المفهرسة، والاقتباسات، والفجوات المعرفية.' })}
            </p>
          </div>

          <div className="border-t border-gray-100 pt-6 space-y-6 text-xs text-slate-700 font-semibold leading-relaxed">
            <div>
              <h2 className="text-sm font-extrabold text-[#141F33] mb-2">How RAG Retrieval Works</h2>
              <p>When employees query the chatbot, the platform embeds their question and fetches the most relevant text chunks from the Pinecone vector database. This prevents hallucinations by ensuring all answers strictly cite your uploaded documents.</p>
            </div>

            <div>
              <h2 className="text-sm font-extrabold text-[#141F33] mb-2">Document Citations</h2>
              <p>Every response displays a citation indicator listing reference files used. Click these indicators to open the source text extractor dialog and view exact passages.</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
