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
    { name: { en: 'Getting Started', fr: 'Pour commencer', ar: 'Ø¯Ù„ÙŠÙ„ Ø§Ù„Ø¨Ø¯Ø§ÙŠØ©', hi: 'à¤¶à¥à¤°à¥à¤†à¤¤ à¤•à¤°à¤¨à¤¾' }, path: '/help/getting-started' },
    { name: { en: 'Call Automation', fr: 'Automatisation des appels', ar: 'Ø£ØªÙ…ØªØ© Ø§Ù„Ù…ÙƒØ§Ù„Ù…Ø§Øª', hi: 'à¤•à¥‰à¤² à¤‘à¤Ÿà¥‹à¤®à¥‡à¤¶à¤¨' }, path: '/help/automation' },
    { name: { en: 'RAG Chatbot Help', fr: 'Aide au chatbot RAG', ar: 'Ù…Ø³Ø§Ø¹Ø¯Ø© Ø§Ù„Ù…Ø³Ø§Ø¹Ø¯ Ø§Ù„Ø°ÙƒÙŠ', hi: 'à¤†à¤°à¤à¤œà¥€ à¤šà¥ˆà¤Ÿà¤¬à¥‰à¤Ÿ à¤¸à¤¹à¤¾à¤¯à¤¤à¤¾' }, path: '/help/chatbot' },
    { name: { en: 'Pricing & Billing', fr: 'Tarification & Facturation', ar: 'Ø§Ù„Ø£Ø³Ø¹Ø§Ø± ÙˆØ§Ù„ÙÙˆØªØ±Ø©', hi: 'à¤®à¥‚à¤²à¥à¤¯ à¤¨à¤¿à¤°à¥à¤§à¤¾à¤°à¤£ à¤”à¤° à¤¬à¤¿à¤²à¤¿à¤‚à¤—' }, path: '/help/billing' },
  ];

  return (
    <div className="bg-surface text-primary min-h-screen flex flex-col font-sans" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <Header />

      <main className="flex-1 max-w-6xl mx-auto py-16 px-6 w-full flex flex-col md:flex-row gap-16">
        {/* Help Center Sidebar */}
        <aside className="w-full md:w-64 shrink-0 space-y-2">
          <h3 className="text-xs font-extrabold text-primary uppercase tracking-widest px-4 mb-4">
            {t({ en: 'Help Categories', fr: 'CatÃ©gories d\'aide', ar: 'Ø£Ù‚Ø³Ø§Ù… Ø§Ù„Ù…Ø³Ø§Ø¹Ø¯Ø©', hi: 'à¤¸à¤¹à¤¾à¤¯à¤¤à¤¾ à¤¶à¥à¤°à¥‡à¤£à¤¿à¤¯à¤¾à¤' })}
          </h3>
          {sidebarLinks.map((link) => {
            const isActive = link.path === '/help/getting-started';
            return (
              <Link
                key={link.path}
                href={link.path}
                className={`flex items-center px-4 rounded-xl text-xs font-extrabold transition-all min-h-[44px] ${
                  isActive
                    ? 'bg-primary text-surface'
                    : 'text-primary hover:bg-surface hover:text-primary border border-transparent hover:border-primary/10'
      }`}
      >
        {t(link.name)}
              </Link>
            );
          })}
        </aside>

        {/* Content Panel */}
        <div className="flex-1 bg-surface border border-primary/10 rounded-xl p-8 shadow-sm space-y-6">
          <div>
            <span className="text-xs font-extrabold tracking-widest text-accent uppercase">{t({ en: 'Documentation', fr: 'Documentation', ar: 'Ø§Ù„ÙˆØ«Ø§Ø¦Ù‚ ÙˆØ§Ù„ÙƒØªÙŠØ¨Ø§Øª', hi: 'à¤¦à¤¸à¥à¤¤à¤¾à¤µà¥‡à¤œà¤¼à¥€à¤•à¤°à¤£' })}</span>
            <h1 className="text-3xl font-extrabold text-primary tracking-tight mt-2">
              {t({ en: 'Getting Started Guide', fr: 'Guide de dÃ©marrage', ar: 'Ø¯Ù„ÙŠÙ„ Ø§Ù„Ø¨Ø¯Ø§ÙŠØ© Ø§Ù„Ø³Ø±ÙŠØ¹', hi: 'à¤¶à¥à¤°à¥à¤†à¤¤ à¤—à¤¾à¤‡à¤¡' })}
            </h1>
            <p className="text-xs font-semibold text-primary mt-2">
              {t({ en: 'Learn how to set up your SAQYN RABT workspace in less than 5 minutes.', fr: 'DÃ©couvrez comment configurer votre espace de travail SAQYN RABT en moins de 5 minutes.', ar: 'ØªØ¹Ø±Ù Ø¹Ù„Ù‰ ÙƒÙŠÙÙŠØ© ØªÙ‡ÙŠØ¦Ø© Ù…Ø³Ø§Ø­Ø© Ø§Ù„Ø¹Ù…Ù„ Ø§Ù„Ø®Ø§ØµØ© Ø¨Ùƒ ÙÙŠ Ø£Ù‚Ù„ Ù…Ù† 5 Ø¯Ù‚Ø§Ø¦Ù‚.', hi: 'à¤œà¤¾à¤¨à¥‡à¤‚ à¤•à¤¿ 5 à¤®à¤¿à¤¨à¤Ÿ à¤¸à¥‡ à¤­à¥€ à¤•à¤® à¤¸à¤®à¤¯ à¤®à¥‡à¤‚ à¤…à¤ªà¤¨à¤¾ SAQYN RABT à¤•à¤¾à¤°à¥à¤¯à¤•à¥à¤·à¥‡à¤¤à¥à¤° à¤•à¥ˆà¤¸à¥‡ à¤¸à¥‡à¤Ÿà¤…à¤ª à¤•à¤°à¥‡à¤‚à¥¤' })}
            </p>
          </div>

          <div className="border-t border-primary/10 pt-6 space-y-6 text-xs text-primary font-semibold leading-relaxed">
            <div>
              <h2 className="text-sm font-extrabold text-primary mb-2">1. Access Your Workspace Dashboard</h2>
              <p>Sign in using your account at the sign-in portal. Once authenticated, you will be redirected to your company dashboard.</p>
            </div>

            <div>
              <h2 className="text-sm font-extrabold text-primary mb-2">2. Upload Operational SOPs</h2>
              <p>Navigate to the *Documents* tab. Drag and drop any corporate policy, staff FAQ handbook, or scheduling PDF files. The engine will process and index your files for AI search.</p>
            </div>

            <div>
              <h2 className="text-sm font-extrabold text-primary mb-2">3. Invite Staff & Employees</h2>
              <p>Go to the *Approvals* section. Send employee requests to your desk receptionists. They must create standard member accounts, which you can activate directly from the panel limits.</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
