'use client';

import React from 'react';
import { useLocale } from '../providers';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { MarketplaceCard } from '../../components/MarketplaceCard';

export default function GlobalMarketplacePage() {
  const { locale } = useLocale();
  const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';

    const plugins = [
    { 
      name: t({ en: 'Slack Sync', fr: 'Synchronisation Slack', ar: 'Ù…Ø²Ø§Ù…Ù†Ø© Ø³Ù„Ø§Ùƒ', hi: 'à¤¸à¥à¤²à¥ˆà¤• à¤¸à¤¿à¤‚à¤•' }), 
      desc: t({ en: 'Dispatches chat messages and summaries to custom Slack channel targets.', fr: 'Distribue les messages de discussion et les rÃ©sumÃ©s vers des canaux Slack personnalisÃ©s.', ar: 'ÙŠØ±Ø³Ù„ Ø±Ø³Ø§Ø¦Ù„ Ø§Ù„Ù…Ø­Ø§Ø¯Ø«Ø© ÙˆØ§Ù„Ù…Ù„Ø®ØµØ§Øª Ø¥Ù„Ù‰ Ù‚Ù†ÙˆØ§Øª Ø³Ù„Ø§Ùƒ Ø§Ù„Ù…Ø®ØµØµØ©.', hi: 'à¤šà¥ˆà¤Ÿ à¤¸à¤‚à¤¦à¥‡à¤¶à¥‹à¤‚ à¤”à¤° à¤¸à¤¾à¤°à¤¾à¤‚à¤¶à¥‹à¤‚ à¤•à¥‹ à¤•à¤¸à¥à¤Ÿà¤® à¤¸à¥à¤²à¥ˆà¤• à¤šà¥ˆà¤¨à¤² à¤²à¤•à¥à¤·à¥à¤¯à¥‹à¤‚ à¤ªà¤° à¤­à¥‡à¤œà¤¤à¤¾ à¤¹à¥ˆà¥¤' }), 
      developer: t({ en: 'SAQYN core', fr: 'SAQYN core', ar: 'Ù†ÙˆØ§Ø© Ø³Ø§ÙƒÙ†', hi: 'SAQYN ÙƒÙˆØ±' }) 
    },
    { 
      name: t({ en: 'BambooHR Connector', fr: 'Connecteur BambooHR', ar: 'Ø±Ø§Ø¨Ø· BambooHR', hi: 'BambooHR à¤•à¤¨à¥‡à¤•à¥à¤Ÿà¤°' }), 
      desc: t({ en: 'Automatically syncs employee lists and leaves balances to active company tables.', fr: 'Synchronise automatiquement les listes d\'employÃ©s et les soldes de congÃ©s avec les tables actives de l\'entreprise.', ar: 'ÙŠØ­Ø¯Ø« ØªÙ„Ù‚Ø§Ø¦ÙŠØ§Ù‹ Ù‚ÙˆØ§Ø¦Ù… Ø§Ù„Ù…ÙˆØ¸ÙÙŠÙ† ÙˆØ£Ø±ØµØ¯Ø© Ø§Ù„Ø¥Ø¬Ø§Ø²Ø§Øª Ù„Ø¬Ø¯Ø§ÙˆÙ„ Ø§Ù„Ø´Ø±ÙƒØ© Ø§Ù„Ù†Ø´Ø·Ø©.', hi: 'à¤•à¤°à¥à¤®à¤šà¤¾à¤°à¥€ à¤¸à¥‚à¤šà¤¿à¤¯à¥‹à¤‚ à¤”à¤° à¤›à¥à¤Ÿà¥à¤Ÿà¥€ à¤¶à¥‡à¤· à¤•à¥‹ à¤¸à¤•à¥à¤°à¤¿à¤¯ à¤•à¤‚à¤ªà¤¨à¥€ à¤¤à¤¾à¤²à¤¿à¤•à¤¾à¤“à¤‚ à¤®à¥‡à¤‚ à¤¸à¥à¤µà¤šà¤¾à¤²à¤¿à¤¤ à¤°à¥‚à¤ª à¤¸à¥‡ à¤¸à¤¿à¤‚à¤• à¤•à¤°à¤¤à¤¾ à¤¹à¥ˆà¥¤' }), 
      developer: t({ en: 'SAQYN core', fr: 'SAQYN core', ar: 'Ù†ÙˆØ§Ø© Ø³Ø§ÙƒÙ†', hi: 'SAQYN ÙƒÙˆØ±' }) 
    },
  ];

  return (
    <div className="bg-surface text-primary min-h-screen flex flex-col font-sans animate-fadeIn" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <Header />

      <main className="flex-1 max-w-4xl mx-auto py-24 px-6 w-full space-y-12">
        {/* Header */}
        <div>
          <span className="text-xs font-extrabold tracking-widest text-accent uppercase">{t({ en: 'Integration Hub', fr: 'Hub d\'intÃ©gration', ar: 'Ù…Ø±ÙƒØ² Ø§Ù„ØªÙƒØ§Ù…Ù„Ø§Øª Ø§Ù„Ø¨Ø±Ù…Ø¬ÙŠØ©', hi: 'à¤à¤•à¥€à¤•à¤°à¤£ à¤¹à¤¬' })}</span>
          <h1 className="text-2xl md:text-4xl font-extrabold text-primary tracking-tight mt-2">
            {t({ en: 'SAQYN Marketplace Extensions', fr: 'Extensions du SAQYN Marketplace', ar: 'Ù…ØªØ¬Ø± Ø¥Ø¶Ø§ÙØ§Øª SAQYN', hi: 'SAQYN à¤®à¤¾à¤°à¥à¤•à¥‡à¤Ÿà¤ªà¥à¤²à¥‡à¤¸ à¤à¤•à¥à¤¸à¤Ÿà¥‡à¤‚à¤¶à¤¨' })}
          </h1>
          <p className="text-xs font-semibold text-primary mt-2">
            {t({ en: 'Integrate external CRM, ERP, and chat channels into your active workspace.', fr: 'IntÃ©grez des canaux externes CRM, ERP et de discussion dans votre espace de travail actif.', ar: 'Ø±Ø¨Ø· Ø£Ù†Ø¸Ù…Ø© CRM Ùˆ ERP ÙˆÙ‚Ù†ÙˆØ§Øª Ø§Ù„Ù…Ø­Ø§Ø¯Ø«Ø© Ø§Ù„Ø®Ø§Ø±Ø¬ÙŠØ© Ø¨Ù…Ø³Ø§Ø­Ø© Ø¹Ù…Ù„Ùƒ.', hi: 'à¤…à¤ªà¤¨à¥‡ à¤¸à¤•à¥à¤°à¤¿à¤¯ à¤•à¤¾à¤°à¥à¤¯à¤•à¥à¤·à¥‡à¤¤à¥à¤° à¤®à¥‡à¤‚ à¤¬à¤¾à¤¹à¤°à¥€ à¤¸à¥€à¤†à¤°à¤à¤®, à¤ˆà¤†à¤°à¤ªà¥€ à¤”à¤° à¤šà¥ˆà¤Ÿ à¤šà¥ˆà¤¨à¤²à¥‹à¤‚ à¤•à¥‹ à¤à¤•à¥€à¤•à¥ƒà¤¤ à¤•à¤°à¥‡à¤‚à¥¤' })}
          </p>
        </div>

        {/* Plugin Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          {plugins.map((p, idx) => (
            <MarketplaceCard key={idx} name={p.name} desc={p.desc} developer={p.developer} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
