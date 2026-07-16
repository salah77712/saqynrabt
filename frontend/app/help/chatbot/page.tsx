'use client';

import React from 'react';
import { useLocale } from '../../providers';
import Link from 'next/link';
import { Header } from '../../../components/Header';
import { Footer } from '../../../components/Footer';

export default function ChatbotHelpPage() {
  const { locale } = useLocale();
  const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';

  const sidebarLinks = [
    { name: { en: 'Getting Started', fr: 'Pour commencer', ar: 'دليل البداية', hi: 'शुरुआत करना' }, path: '/help/getting-started' },
    { name: { en: 'Call Automation', fr: 'Automatisation des appels', ar: 'أتمتة المكالمات', hi: 'कॉल ऑटोमेशन' }, path: '/help/automation' },
    { name: { en: 'RAG Chatbot Help', fr: 'Aide au chatbot RAG', ar: 'مساعدة المساعد الذكي', hi: 'आरएजी चैटबॉट सहायता' }, path: '/help/chatbot' },
    { name: { en: 'Pricing & Billing', fr: 'Tarification & Facturation', ar: 'الأسعار والفوترة', hi: 'मूल्य निर्धारण और बिलिंग' }, path: '/help/billing' },
  ];

  return (
    <div className="bg-[#F8F9FB] text-[#141F33] min-h-screen flex flex-col font-sans" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <Header />

      <main className="flex-1 max-w-6xl mx-auto py-16 px-6 w-full flex flex-col md:flex-row gap-16">
        {/* Help Center Sidebar */}
        <aside className="w-full md:w-64 shrink-0 space-y-2">
          <h3 className="text-xs font-extrabold text-[#141F33] uppercase tracking-widest px-4 mb-4">
            {t({ en: 'Help Categories', fr: 'Catégories d\'aide', ar: 'أقسام المساعدة', hi: 'सहायता श्रेणियाँ' })}
          </h3>
          {sidebarLinks.map((link) => {
            const isActive = link.path === '/help/chatbot';
            return (
              <Link
                key={link.path}
                href={link.path}
                className={`flex items-center px-4 rounded-xl text-xs font-extrabold transition-all min-h-[44px] ${
                  isActive
                    ? 'bg-[#141F33] text-[#F8F9FB]'
: 'text-[#141F33] hover:bg-[#F8F9FB] hover:text-[#141F33] border border-transparent hover:border-[#141F33]/10'
}`}>
</Link>
            );
          })}
        </aside>

        {/* Content Panel */}
        <div className="flex-1 bg-[#F8F9FB] border border-[#141F33]/10 rounded-xl p-8 shadow-sm space-y-6">
          <div>
            <span className="text-[10px] font-extrabold tracking-widest text-[#2A5CFF] uppercase">{t({ en: 'Documentation', fr: 'Documentation', ar: 'الوثائق والكتيبات', hi: 'दस्तावेज़ीकरण' })}</span>
            <h1 className="text-3xl font-extrabold text-[#141F33] tracking-tight mt-2">
              {t({ en: 'RAG Knowledge Chatbot Help', fr: 'Aide au chatbot de connaissances RAG', ar: 'مساعدة المساعد الذكي المعتمد على الـ RAG', hi: 'आरएजी नॉलेज चैटबॉट सहायता' })}
            </h1>
            <p className="text-xs font-semibold text-[#141F33] mt-2">
              {t({ en: 'Learn about indexed document search, citations, and unanswered gaps.', fr: 'En savoir plus sur la recherche de documents indexés, les citations et les lacunes non résolues.', ar: 'تعرف على البحث في المستندات المفهرسة، والاقتباسات، والفجوات المعرفية.', hi: 'अनुक्रमित दस्तावेज़ खोज, उद्धरण और अनुत्तरित अंतरालों के बारे में जानें।' })}
            </p>
          </div>

          <div className="border-t border-[#141F33]/10 pt-6 space-y-6 text-xs text-[#141F33] font-semibold leading-relaxed">
            <div>
              <h2 className="text-sm font-extrabold text-[#141F33] mb-2">How RAG Retrieval Works</h2>
              <p>When employees query the chatbot, the platform embeds their question and fetches the most relevant text from your indexed documents. This prevents hallucinations by ensuring all answers strictly cite your uploaded files.</p>
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
