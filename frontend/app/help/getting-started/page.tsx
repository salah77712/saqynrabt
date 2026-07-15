'use client';

import React from 'react';
import { useLocale } from '../../providers';
import Link from 'next/link';
import { Header } from '../../../components/Header';
import { Footer } from '../../../components/Footer';

export default function GettingStartedHelpPage() {
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

      <main className="flex-1 max-w-6xl mx-auto py-16 px-6 w-full flex flex-col md:flex-row gap-12">
        {/* Help Center Sidebar */}
        <aside className="w-full md:w-64 shrink-0 space-y-2">
          <h3 className="text-xs font-extrabold text-[#141F33] uppercase tracking-widest px-4 mb-4">
            {t({ en: 'Help Categories', fr: 'Catégories d\'aide', ar: 'أقسام المساعدة', hi: 'सहायता श्रेणियाँ' })}
          </h3>
          {sidebarLinks.map((link) => {
            const isActive = link.path === '/help/getting-started';
            return (
              <Link
                key={link.path}
                href={link.path}
                className={`flex items-center px-4 rounded-xl text-xs font-extrabold transition-all min-h-[44px] ${
                  isActive
                    ? 'bg-[#141F33] text-[#F8F9FB]'
                    : 'text-[#141F33] hover:bg-[#F8F9FB] hover:text-[#141F33] border border-transparent hover:border-[#141F33]/10'
      }`}
      >
        {t(link.name)}
              </Link>
            );
          })}
        </aside>

        {/* Content Panel */}
        <div className="flex-1 bg-[#F8F9FB] border border-[#141F33]/10 rounded-2xl p-6 shadow-sm space-y-6">
          <div>
            <span className="text-[10px] font-extrabold tracking-widest text-[#2A5CFF] uppercase">{t({ en: 'Documentation', fr: 'Documentation', ar: 'الوثائق والكتيبات', hi: 'दस्तावेज़ीकरण' })}</span>
            <h1 className="text-3xl font-extrabold text-[#141F33] tracking-tight mt-2">
              {t({ en: 'Getting Started Guide', fr: 'Guide de démarrage', ar: 'دليل البداية السريع', hi: 'शुरुआत गाइड' })}
            </h1>
            <p className="text-xs font-semibold text-[#141F33] mt-2">
              {t({ en: 'Learn how to set up your SAQYN RABT workspace in less than 5 minutes.', fr: 'Découvrez comment configurer votre espace de travail SAQYN RABT en moins de 5 minutes.', ar: 'تعرف على كيفية تهيئة مساحة العمل الخاصة بك في أقل من 5 دقائق.', hi: 'जानें कि 5 मिनट से भी कम समय में अपना SAQYN RABT कार्यक्षेत्र कैसे सेटअप करें।' })}
            </p>
          </div>

          <div className="border-t border-[#141F33]/10 pt-6 space-y-6 text-xs text-[#141F33] font-semibold leading-relaxed">
            <div>
              <h2 className="text-sm font-extrabold text-[#141F33] mb-2">1. Access Your Workspace Dashboard</h2>
              <p>Sign in using your account at the sign-in portal. Once authenticated, you will be redirected to your company dashboard.</p>
            </div>

            <div>
              <h2 className="text-sm font-extrabold text-[#141F33] mb-2">2. Upload Operational SOPs</h2>
              <p>Navigate to the *Documents* tab. Drag and drop any corporate policy, staff FAQ handbook, or scheduling PDF files. The engine will process and index your files for AI search.</p>
            </div>

            <div>
              <h2 className="text-sm font-extrabold text-[#141F33] mb-2">3. Invite Staff & Employees</h2>
              <p>Go to the *Approvals* section. Send employee requests to your desk receptionists. They must create standard member accounts, which you can activate directly from the panel limits.</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
