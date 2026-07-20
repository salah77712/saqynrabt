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
            const isActive = link.path === '/help/chatbot';
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
            <span className="text-xs font-extrabold tracking-widest text-accent uppercase">{t({ en: 'Documentation', fr: 'Documentation', ar: 'Ø§Ù„ÙˆØ«Ø§Ø¦Ù‚ ÙˆØ§Ù„ÙƒØªÙŠØ¨Ø§Øª', hi: 'à¤¦à¤¸à¥à¤¤à¤¾à¤µà¥‡à¤œà¤¼à¥€à¤•à¤°à¤£' })}</span>
            <h1 className="text-3xl font-extrabold text-primary tracking-tight mt-2">
              {t({ en: 'RAG Knowledge Chatbot Help', fr: 'Aide au chatbot de connaissances RAG', ar: 'Ù…Ø³Ø§Ø¹Ø¯Ø© Ø§Ù„Ù…Ø³Ø§Ø¹Ø¯ Ø§Ù„Ø°ÙƒÙŠ Ø§Ù„Ù…Ø¹ØªÙ…Ø¯ Ø¹Ù„Ù‰ Ø§Ù„Ù€ RAG', hi: 'à¤†à¤°à¤à¤œà¥€ à¤¨à¥‰à¤²à¥‡à¤œ à¤šà¥ˆà¤Ÿà¤¬à¥‰à¤Ÿ à¤¸à¤¹à¤¾à¤¯à¤¤à¤¾' })}
            </h1>
            <p className="text-xs font-semibold text-primary mt-2">
              {t({ en: 'Learn about indexed document search, citations, and unanswered gaps.', fr: 'En savoir plus sur la recherche de documents indexÃ©s, les citations et les lacunes non rÃ©solues.', ar: 'ØªØ¹Ø±Ù Ø¹Ù„Ù‰ Ø§Ù„Ø¨Ø­Ø« ÙÙŠ Ø§Ù„Ù…Ø³ØªÙ†Ø¯Ø§Øª Ø§Ù„Ù…ÙÙ‡Ø±Ø³Ø©ØŒ ÙˆØ§Ù„Ø§Ù‚ØªØ¨Ø§Ø³Ø§ØªØŒ ÙˆØ§Ù„ÙØ¬ÙˆØ§Øª Ø§Ù„Ù…Ø¹Ø±ÙÙŠØ©.', hi: 'à¤…à¤¨à¥à¤•à¥à¤°à¤®à¤¿à¤¤ à¤¦à¤¸à¥à¤¤à¤¾à¤µà¥‡à¤œà¤¼ à¤–à¥‹à¤œ, à¤‰à¤¦à¥à¤§à¤°à¤£ à¤”à¤° à¤…à¤¨à¥à¤¤à¥à¤¤à¤°à¤¿à¤¤ à¤…à¤‚à¤¤à¤°à¤¾à¤²à¥‹à¤‚ à¤•à¥‡ à¤¬à¤¾à¤°à¥‡ à¤®à¥‡à¤‚ à¤œà¤¾à¤¨à¥‡à¤‚à¥¤' })}
            </p>
          </div>

          <div className="border-t border-primary/10 pt-6 space-y-6 text-xs text-primary font-semibold leading-relaxed">
            <div>
              <h2 className="text-sm font-extrabold text-primary mb-2">How RAG Retrieval Works</h2>
              <p>When employees query the chatbot, the platform embeds their question and fetches the most relevant text from your indexed documents. This prevents hallucinations by ensuring all answers strictly cite your uploaded files.</p>
            </div>

            <div>
              <h2 className="text-sm font-extrabold text-primary mb-2">Document Citations</h2>
              <p>Every response displays a citation indicator listing reference files used. Click these indicators to open the source text extractor dialog and view exact passages.</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
