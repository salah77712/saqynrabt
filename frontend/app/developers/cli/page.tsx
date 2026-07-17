'use client';

import React from 'react';
import { useLocale } from '../../providers';
import { Header } from '../../../components/Header';
import { Footer } from '../../../components/Footer';

export default function DevelopersCliDocsPage() {
  const { locale } = useLocale();
  const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';

  const commands = [
    { cmd: 'saqyn login', desc: t({ en: 'Authenticate CLI with your Clerk developer account credentials.', fr: 'Authentifier le CLI avec les identifiants de votre compte dÃ©veloppeur Clerk.', ar: 'ØªØ³Ø¬ÙŠÙ„ Ø§Ù„Ø¯Ø®ÙˆÙ„ Ù„Ù„Ù…Ø·ÙˆØ± Ø¨Ø§Ø³ØªØ®Ø¯Ø§Ù… Ø¨ÙŠØ§Ù†Ø§Øª Clerk.', hi: 'à¤…à¤ªà¤¨à¥‡ à¤•à¥à¤²à¤°à¥à¤• à¤¡à¥‡à¤µà¤²à¤ªà¤° à¤–à¤¾à¤¤à¤¾ à¤•à¥à¤°à¥‡à¤¡à¥‡à¤‚à¤¶à¤¿à¤¯à¤² à¤•à¥‡ à¤¸à¤¾à¤¥ à¤¸à¥€à¤à¤²à¤†à¤ˆ à¤•à¥‹ à¤ªà¥à¤°à¤®à¤¾à¤£à¤¿à¤¤ à¤•à¤°à¥‡à¤‚à¥¤' }) },
    { cmd: 'saqyn chat "Is early checkout allowed?"', desc: t({ en: 'Send a prompt query and retrieve streaming RAG answers directly.', fr: 'Envoyer une requÃªte et rÃ©cupÃ©rer directement les rÃ©ponses RAG en streaming.', ar: 'Ø¥Ø±Ø³Ø§Ù„ Ø³Ø¤Ø§Ù„ ÙˆØ§Ø³ØªÙ„Ø§Ù… Ø¥Ø¬Ø§Ø¨Ø© Ø§Ù„Ù…Ø³Ø§Ø¹Ø¯ Ø§Ù„Ø°ÙƒÙŠ ÙÙˆØ±ÙŠÙ‹Ø§.', hi: 'à¤à¤• à¤¤à¥à¤µà¤°à¤¿à¤¤ à¤ªà¥à¤°à¤¶à¥à¤¨ à¤­à¥‡à¤œà¥‡à¤‚ à¤”à¤° à¤¸à¥€à¤§à¥‡ à¤¸à¥à¤Ÿà¥à¤°à¥€à¤®à¤¿à¤‚à¤— à¤†à¤°à¤à¤œà¥€ à¤‰à¤¤à¥à¤¤à¤° à¤ªà¥à¤°à¤¾à¤ªà¥à¤¤ à¤•à¤°à¥‡à¤‚à¥¤' }) },
    { cmd: 'saqyn upload handbook.pdf', desc: t({ en: 'Upload and index a PDF file into the vector knowledge base.', fr: 'TÃ©lÃ©charger et indexer un fichier PDF dans la base de connaissances vectorielle.', ar: 'ØªØ­Ù…ÙŠÙ„ ÙˆÙÙ‡Ø±Ø³Ø© Ù…Ù„Ù PDF ÙÙŠ Ù‚Ø§Ø¹Ø¯Ø© Ø§Ù„Ù…Ø¹Ø±ÙØ©.', hi: 'à¤µà¥‡à¤•à¥à¤Ÿà¤° à¤œà¥à¤žà¤¾à¤¨ à¤†à¤§à¤¾à¤° à¤®à¥‡à¤‚ à¤à¤• à¤ªà¥€à¤¡à¥€à¤à¤« à¤«à¤¾à¤‡à¤² à¤…à¤ªà¤²à¥‹à¤¡ à¤”à¤° à¤‡à¤‚à¤¡à¥‡à¤•à¥à¤¸ à¤•à¤°à¥‡à¤‚à¥¤' }) },
  ];

  return (
    <div className="bg-surface text-primary min-h-screen flex flex-col font-sans" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <Header />

      <main className="flex-1 max-w-4xl mx-auto py-24 px-6 w-full space-y-12 animate-fadeIn">
        {/* Header */}
        <div>
          <span className="text-xs font-extrabold tracking-widest text-accent uppercase">{t({ en: 'Command-Line Tools', fr: 'Outils en ligne de commande', ar: 'Ø£Ø¯ÙˆØ§Øª ÙˆØ§Ø¬Ù‡Ø© Ø§Ù„Ø£ÙˆØ§Ù…Ø± CLI', hi: 'à¤•à¤®à¤¾à¤‚à¤¡-à¤²à¤¾à¤‡à¤¨ à¤‰à¤ªà¤•à¤°à¤£' })}</span>
          <h1 className="text-3xl font-extrabold text-primary tracking-tight mt-2">
            {t({ en: 'Official SAQYN CLI Guide', fr: 'Guide officiel du CLI SAQYN', ar: 'Ø¯Ù„ÙŠÙ„ Ø£Ø¯Ø§Ø© CLI Ø§Ù„Ø±Ø³Ù…ÙŠØ© Ù„Ù€ SAQYN', hi: 'à¤†à¤§à¤¿à¤•à¤¾à¤°à¤¿à¤• SAQYN CLI à¤—à¤¾à¤‡à¤¡' })}
          </h1>
          <p className="text-xs font-semibold text-primary mt-2">
            {t({ en: 'Manage documents, index files, and run chat integrations directly from your terminal.', fr: 'GÃ©rez les documents, indexez les fichiers et exÃ©cutez les intÃ©grations de chat directement depuis votre terminal.', ar: 'Ø¥Ø¯Ø§Ø±Ø© Ø§Ù„Ù…Ø³ØªÙ†Ø¯Ø§ØªØŒ ÙˆÙÙ‡Ø±Ø³Ø© Ø§Ù„Ù…Ù„ÙØ§ØªØŒ ÙˆØªØ´ØºÙŠÙ„ Ù…Ø­Ø§Ø¯Ø«Ø§Øª Ø§Ù„Ù…Ø³Ø§Ø¹Ø¯ Ù…Ø¨Ø§Ø´Ø±Ø© Ù…Ù† Ø§Ù„ØªÙŠØ±Ù…ÙŠÙ†Ø§Ù„.', hi: 'à¤¦à¤¸à¥à¤¤à¤¾à¤µà¥‡à¤œà¤¼ à¤ªà¥à¤°à¤¬à¤‚à¤§à¤¿à¤¤ à¤•à¤°à¥‡à¤‚, à¤«à¤¼à¤¾à¤‡à¤²à¥‡à¤‚ à¤…à¤¨à¥à¤•à¥à¤°à¤®à¤¿à¤¤ à¤•à¤°à¥‡à¤‚, à¤”à¤° à¤¸à¥€à¤§à¥‡ à¤…à¤ªà¤¨à¥‡ à¤Ÿà¤°à¥à¤®à¤¿à¤¨à¤² à¤¸à¥‡ à¤šà¥ˆà¤Ÿ à¤à¤•à¥€à¤•à¤°à¤£ à¤šà¤²à¤¾à¤à¤‚à¥¤' })}
          </p>
        </div>

        {/* CLI Steps */}
        <div className="bg-surface border border-primary/10 rounded-xl p-8 shadow-sm space-y-6">
          <h3 className="text-sm font-extrabold text-primary">{t({ en: 'Core CLI Command Reference', fr: 'RÃ©fÃ©rence des commandes CLI principales', ar: 'Ù…Ø±Ø¬Ø¹ Ø£ÙˆØ§Ù…Ø± CLI Ø§Ù„Ø£Ø³Ø§Ø³ÙŠØ©', hi: 'à¤®à¥à¤–à¥à¤¯ à¤¸à¥€à¤à¤²à¤†à¤ˆ à¤•à¤®à¤¾à¤‚à¤¡ à¤¸à¤‚à¤¦à¤°à¥à¤­' })}</h3>

          <div className="space-y-4">
            {commands.map((c, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-primary/10 bg-surface space-y-2">
                <code className="text-xs font-mono font-bold text-accent">{c.cmd}</code>
                <p className="text-[11px] font-semibold text-primary leading-normal">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
