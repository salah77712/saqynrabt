'use client';

import React from 'react';
import { useLocale } from '../providers';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';

export default function ChangelogPage() {
  const { locale } = useLocale();
  const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';

  const logs = [
    {
      version: 'v1.2.0',
      date: 'July 4, 2026',
      title: t({ en: 'Collapsible Sidebars & Limit Monitors', fr: 'Barres latÃ©rales repliables & Moniteurs de limites', ar: 'Ø§Ù„Ù‚ÙˆØ§Ø¦Ù… Ø§Ù„Ù‚Ø§Ø¨Ù„Ø© Ù„Ù„Ø·ÙŠ ÙˆÙ…Ø±Ø§Ù‚Ø¨Ø© Ø­Ø¯ÙˆØ¯ Ø§Ù„Ø§Ø³ØªÙ‡Ù„Ø§Ùƒ', hi: 'à¤¬à¤‚à¤§à¤¨à¥‡à¤µà¤¾à¤²à¤¾ à¤¸à¤¾à¤‡à¤¡à¤¬à¤¾à¤° à¤”à¤° à¤¸à¥€à¤®à¤¾ à¤®à¥‰à¤¨à¤¿à¤Ÿà¤°' }),
      changes: [
        t({ en: 'Implemented collapsible sidebar with icon-only hovers and tooltips.', fr: 'ImplÃ©mentation d\'une barre latÃ©rale repliable avec survol d\'icÃ´nes uniquement et infobulles.', ar: 'ØªÙ†ÙÙŠØ° Ø´Ø±ÙŠØ· Ø¬Ø§Ù†Ø¨ÙŠ Ù‚Ø§Ø¨Ù„ Ù„Ù„Ø·ÙŠ Ù…Ø¹ ØªÙ„Ù…ÙŠØ­Ø§Øª Ù„Ù„Ø£ÙŠÙ‚ÙˆÙ†Ø§Øª.', hi: 'à¤•à¥‡à¤µà¤² à¤†à¤‡à¤•à¤¨ à¤¹à¥‹à¤µà¤° à¤”à¤° à¤Ÿà¥‚à¤²à¤Ÿà¤¿à¤ªà¥à¤¸ à¤•à¥‡ à¤¸à¤¾à¤¥ à¤¬à¤‚à¤§à¤¨à¥‡à¤µà¤¾à¤²à¤¾ à¤¸à¤¾à¤‡à¤¡à¤¬à¤¾à¤° à¤²à¤¾à¤—à¥‚ à¤•à¤¿à¤¯à¤¾ à¤—à¤¯à¤¾à¥¤' }),
        t({ en: 'Added settings progress bars for metered text, voice, and RAG usage.', fr: 'Ajout de barres de progression des paramÃ¨tres pour l\'utilisation du texte, de la voix et du RAG.', ar: 'Ø¥Ø¶Ø§ÙØ© Ø£Ø´Ø±Ø·Ø© Ù‚ÙŠØ§Ø³ Ø§Ù„Ø§Ø³ØªÙ‡Ù„Ø§Ùƒ Ù„Ù„Ù†ØµÙˆØµØŒ Ø¯Ù‚Ø§Ø¦Ù‚ Ø§Ù„ØµÙˆØªØŒ ÙˆØ£Ø³Ø¦Ù„Ø© Ø§Ù„Ù€ RAG.', hi: 'à¤®à¥€à¤Ÿà¤°à¥à¤¡ à¤Ÿà¥‡à¤•à¥à¤¸à¥à¤Ÿ, à¤µà¥‰à¤¯à¤¸ à¤”à¤° à¤†à¤°à¤à¤œà¥€ à¤‰à¤ªà¤¯à¥‹à¤— à¤•à¥‡ à¤²à¤¿à¤ à¤¸à¥‡à¤Ÿà¤¿à¤‚à¤— à¤ªà¥à¤°à¥‹à¤—à¥à¤°à¥‡à¤¸ à¤¬à¤¾à¤° à¤œà¥‹à¤¡à¤¼à¥‡ à¤—à¤à¥¤' }),
        t({ en: 'Integrated employee approvals capacity blocks.', fr: 'IntÃ©gration de blocs de capacitÃ© pour les approbations des employÃ©s.', ar: 'Ø¯Ù…Ø¬ Ø§Ù„ØªØ­Ù‚Ù‚ Ù…Ù† Ø§Ù„Ø³Ø¹Ø© ÙˆØ§Ù„Ø­Ø¯ Ø§Ù„Ø£Ù‚ØµÙ‰ Ù„Ù„Ù…ÙˆØ§ÙÙ‚Ø© Ø¹Ù„Ù‰ Ø§Ù„Ù…ÙˆØ¸ÙÙŠÙ†.', hi: 'à¤à¤•à¥€à¤•à¥ƒà¤¤ à¤•à¤°à¥à¤®à¤šà¤¾à¤°à¥€ à¤…à¤¨à¥à¤®à¥‹à¤¦à¤¨ à¤•à¥à¤·à¤®à¤¤à¤¾ à¤¬à¥à¤²à¥‰à¤•à¥¤' }),
      ],
    },
    {
      version: 'v1.1.0',
      date: 'June 29, 2026',
      title: t({ en: 'Stripe Webhooks & Overage Logs', fr: 'Webhooks Stripe & Journaux de dÃ©passement', ar: 'Ù…Ø¯ÙÙˆØ¹Ø§Øª Stripe ÙˆØ³Ø¬Ù„Ø§Øª Ø§Ù„ØªØ¬Ø§ÙˆØ²', hi: 'à¤¸à¥à¤Ÿà¥à¤°à¤¾à¤‡à¤ª à¤µà¥‡à¤¬à¤¹à¥à¤•à¥à¤¸ à¤”à¤° à¤“à¤µà¤°à¤à¤œ à¤²à¥‰à¤—à¥à¤¸' }),
      changes: [
        t({ en: 'Configured automated Stripe Checkout triggers and billing callbacks.', fr: 'Configuration des dÃ©clencheurs Stripe Checkout automatisÃ©s et des rappels de facturation.', ar: 'ØªÙ‡ÙŠØ¦Ø© Ù…Ø¯ÙÙˆØ¹Ø§Øª Stripe ÙˆØ¨ÙˆØ§Ø¨Ø§Øª Ø§Ù„ØªØ­Ù‚Ù‚ Ø§Ù„ØªÙ„Ù‚Ø§Ø¦ÙŠ.', hi: 'à¤¸à¥à¤µà¤šà¤¾à¤²à¤¿à¤¤ à¤¸à¥à¤Ÿà¥à¤°à¤¾à¤‡à¤ª à¤šà¥‡à¤•à¤†à¤‰à¤Ÿ à¤Ÿà¥à¤°à¤¿à¤—à¤° à¤”à¤° à¤¬à¤¿à¤²à¤¿à¤‚à¤— à¤•à¥‰à¤²à¤¬à¥ˆà¤• à¤•à¥‰à¤¨à¥à¤«à¤¼à¤¿à¤—à¤° à¤•à¤¿à¤ à¤—à¤à¥¤' }),
        t({ en: 'Added operational logs CSV exporters.', fr: 'Ajout d\'exportateurs CSV pour les journaux opÃ©rationnels.', ar: 'Ø¥Ø¶Ø§ÙØ© Ø£Ø¯ÙˆØ§Øª ØªØµØ¯ÙŠØ± Ø³Ø¬Ù„Ø§Øª Ø§Ù„ØªØ´ØºÙŠÙ„ Ø¨ØµÙŠØºØ© CSV.', hi: 'à¤ªà¤°à¤¿à¤šà¤¾à¤²à¤¨ à¤²à¥‰à¤— à¤¸à¥€à¤à¤¸à¤µà¥€ à¤¨à¤¿à¤°à¥à¤¯à¤¾à¤¤à¤• à¤œà¥‹à¤¡à¤¼à¥‡ à¤—à¤à¥¤' }),
      ],
    },
  ];

  return (
    <div className="bg-surface text-primary min-h-screen flex flex-col font-sans" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <Header />

      <main className="flex-1 max-w-3xl mx-auto py-24 px-6 w-full space-y-12 animate-fadeIn">
        {/* Header */}
        <div>
          <span className="text-xs font-extrabold tracking-widest text-accent uppercase">{t({ en: 'Platform Updates', fr: 'Mises Ã  jour de la plateforme', ar: 'ØªØ­Ø¯ÙŠØ«Ø§Øª Ø§Ù„Ù…Ù†ØµØ©', hi: 'à¤ªà¥à¤²à¥‡à¤Ÿà¤«à¤¼à¥‰à¤°à¥à¤® à¤…à¤ªà¤¡à¥‡à¤Ÿ' })}</span>
          <h1 className="text-3xl font-extrabold text-primary tracking-tight mt-2">
            {t({ en: 'System Changelog', fr: 'Journal des modifications du systÃ¨me', ar: 'Ø³Ø¬Ù„ Ø§Ù„ØªØºÙŠÙŠØ±Ø§Øª ÙˆØªØ­Ø¯ÙŠØ«Ø§Øª Ø§Ù„Ù†Ø¸Ø§Ù…', hi: 'à¤¸à¤¿à¤¸à¥à¤Ÿà¤® à¤šà¥‡à¤‚à¤œà¤²à¥‰à¤—' })}
          </h1>
          <p className="text-xs font-semibold text-primary mt-2">
            {t({ en: 'Follow our development path as we roll out new B2B private AI features.', fr: 'Suivez notre parcours de dÃ©veloppement alors que nous dÃ©ployons de nouvelles fonctionnalitÃ©s d\'IA privÃ©e B2B.', ar: 'ØªØ§Ø¨Ø¹ Ù…Ø³Ø§Ø± Ø§Ù„ØªØ·ÙˆÙŠØ± Ø§Ù„Ø®Ø§Øµ Ø¨Ù†Ø§ Ø¨ÙŠÙ†Ù…Ø§ Ù†Ø·Ù„Ù‚ Ù…ÙŠØ²Ø§Øª Ø§Ù„Ø°ÙƒØ§Ø¡ Ø§Ù„Ø§ØµØ·Ù†Ø§Ø¹ÙŠ Ø§Ù„Ø®Ø§Øµ Ø¨Ø§Ù„Ø´Ø±ÙƒØ§Øª.', hi: 'à¤¹à¤®à¤¾à¤°à¥‡ à¤µà¤¿à¤•à¤¾à¤¸ à¤ªà¤¥ à¤•à¤¾ à¤…à¤¨à¥à¤¸à¤°à¤£ à¤•à¤°à¥‡à¤‚ à¤•à¥à¤¯à¥‹à¤‚à¤•à¤¿ à¤¹à¤® à¤¨à¤ˆ à¤¬à¥€2à¤¬à¥€ à¤¨à¤¿à¤œà¥€ à¤à¤†à¤ˆ à¤¸à¥à¤µà¤¿à¤§à¤¾à¤“à¤‚ à¤•à¥‹ à¤ªà¥‡à¤¶ à¤•à¤° à¤°à¤¹à¥‡ à¤¹à¥ˆà¤‚à¥¤' })}
          </p>
        </div>

        {/* Changelog Timeline */}
        <div className="space-y-12 relative border-s border-primary/10 ps-6 md:ps-10">
          {logs.map((log, idx) => (
            <div key={idx} className="relative space-y-3">
              
              {/* Timeline Bullet */}
              <div className="absolute -inset-inline-start-[31px] md:-inset-inline-start-[47px] top-1.5 h-4 w-4 rounded-full bg-primary border-4 border-surface shadow-sm" />

              <div className="flex items-center gap-4">
                <span className="text-xs font-extrabold uppercase bg-surface text-accent px-2.5 py-0.5 rounded-full border border-primary/10">
                  {log.version}
                </span>
                <span className="text-xs text-primary font-bold">{log.date}</span>
              </div>

              <h3 className="text-lg font-extrabold text-primary">{log.title}</h3>
              
              <ul className="list-disc ps-5 text-xs font-semibold text-primary space-y-2 leading-relaxed">
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
