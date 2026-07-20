'use client';

import React from 'react';
import { useLocale } from '../../providers';
import { Header } from '../../../components/Header';
import { Footer } from '../../../components/Footer';

export default function DevelopersApiDocsPage() {
  const { locale } = useLocale();
  const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';

  const endpoints = [
    {
      method: 'POST',
      path: '/api/v1/chat',
      desc: t({ en: 'Send queries to RAG Assistant. Returns JSON answers and citations.', fr: 'Envoyer des requÃªtes Ã  l\'assistant RAG. Renvoie des rÃ©ponses JSON et des citations.', ar: 'Ø¥Ø±Ø³Ø§Ù„ Ø³Ø¤Ø§Ù„ Ù„Ù„Ù…Ø³Ø§Ø¹Ø¯. ÙŠØ¹ÙŠØ¯ Ø§Ù„Ø¥Ø¬Ø§Ø¨Ø© ÙˆØ§Ù„Ø§Ù‚ØªØ¨Ø§Ø³Ø§Øª.', hi: 'à¤†à¤°à¤à¤œà¥€ à¤¸à¤¹à¤¾à¤¯à¤• à¤•à¥‹ à¤ªà¥à¤°à¤¶à¥à¤¨ à¤­à¥‡à¤œà¥‡à¤‚à¥¤ JSON à¤‰à¤¤à¥à¤¤à¤° à¤”à¤° à¤‰à¤¦à¥à¤§à¤°à¤£ à¤²à¥Œà¤Ÿà¤¾à¤¤à¤¾ à¤¹à¥ˆà¥¤' }),
      headers: [
        { name: 'x-api-key', desc: 'Active developer API key token' },
        { name: 'Content-Type', desc: 'application/json' },
      ],
      body: JSON.stringify({ message: 'What are the check-in rules?' }, null, 2),
    },
    {
      method: 'POST',
      path: '/api/v1/automation',
      desc: t({ en: 'Create call dispatches directly inside the queue.', fr: 'CrÃ©er des rÃ©partitions d\'appels directement dans la file d\'attente.', ar: 'Ø¥Ø¶Ø§ÙØ© Ù…Ù‡Ø§Ù… Ø£ØªÙ…ØªØ© Ø¬Ø¯ÙŠØ¯Ø© Ù…Ø¨Ø§Ø´Ø±Ø© ÙÙŠ Ø·Ø§Ø¨ÙˆØ± Ø§Ù„Ø¹Ù…Ù„ÙŠØ§Øª.', hi: 'à¤•à¥‰à¤² à¤¡à¤¿à¤¸à¥à¤ªà¥ˆà¤š à¤¸à¥€à¤§à¥‡ à¤•à¤¤à¤¾à¤° à¤•à¥‡ à¤…à¤‚à¤¦à¤° à¤¬à¤¨à¤¾à¤à¤‚à¥¤' }),
      headers: [
        { name: 'x-api-key', desc: 'Active developer API key token' },
        { name: 'Content-Type', desc: 'application/json' },
      ],
      body: JSON.stringify({ customer_name: 'Karim', request_type: 'Booking' }, null, 2),
    },
  ];

  return (
    <div className="bg-surface text-primary min-h-screen flex flex-col font-sans" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <Header />

      <main className="flex-1 max-w-4xl mx-auto py-24 px-6 w-full space-y-12">
        {/* Header */}
        <div>
          <span className="text-xs font-extrabold tracking-widest text-accent uppercase">{t({ en: 'API Portal', fr: 'Portail API', ar: 'Ù…Ù†ØµØ© Ø§Ù„Ù€ API', hi: 'à¤à¤ªà¥€à¤†à¤ˆ à¤ªà¥‹à¤°à¥à¤Ÿà¤²' })}</span>
          <h1 className="text-3xl font-extrabold text-primary tracking-tight mt-2">
            {t({ en: 'Interactive Swagger Playground', fr: 'Aire de jeux Swagger interactive', ar: 'Ù…Ù†ØµØ© ØªÙØ§Ø¹Ù„ÙŠØ© Ù„Ø§Ø®ØªØ¨Ø§Ø± ÙˆØ§Ø¬Ù‡Ø© Ø¨Ø±Ù…Ø¬Ø© Ø§Ù„ØªØ·Ø¨ÙŠÙ‚Ø§Øª', hi: 'à¤‡à¤‚à¤Ÿà¤°à¤à¤•à¥à¤Ÿà¤¿à¤µ à¤¸à¥à¤µà¥ˆà¤—à¤° à¤ªà¥à¤²à¥‡à¤—à¥à¤°à¤¾à¤‰à¤‚à¤¡' })}
          </h1>
          <p className="text-xs font-semibold text-primary mt-2">
            {t({ en: 'Test endpoints with live API tokens inside the sandbox.', fr: 'Tester les points de terminaison avec des jetons API en direct dans le bac Ã  sable.', ar: 'Ø§Ø®ØªØ¨Ø± ÙˆØ§Ø¬Ù‡Ø§Øª Ø§Ù„Ø¨Ø±Ù…Ø¬Ø© Ù…Ø¹ Ù…ÙØ§ØªÙŠØ­ Ø§Ù„ÙˆØµÙˆÙ„ Ø§Ù„Ø­ÙŠØ© ÙÙŠ ÙˆØ¶Ø¹ Ø§Ù„Ø±Ù…Ù„.', hi: 'à¤¸à¥ˆà¤‚à¤¡à¤¬à¥‰à¤•à¥à¤¸ à¤•à¥‡ à¤…à¤‚à¤¦à¤° à¤²à¤¾à¤‡à¤µ à¤à¤ªà¥€à¤†à¤ˆ à¤Ÿà¥‹à¤•à¤¨ à¤•à¥‡ à¤¸à¤¾à¤¥ à¤à¤‚à¤¡à¤ªà¥‰à¤‡à¤‚à¤Ÿà¥à¤¸ à¤•à¤¾ à¤ªà¤°à¥€à¤•à¥à¤·à¤£ à¤•à¤°à¥‡à¤‚à¥¤' })}
          </p>
        </div>

        {/* Endpoints */}
        <div className="space-y-8">
          {endpoints.map((ep, idx) => (
            <div key={idx} className="bg-surface border border-primary/10 rounded-xl p-8 shadow-sm space-y-6">
              
              <div className="flex items-center gap-4">
                <span className="bg-accent text-surface text-xs font-extrabold px-3 py-1 rounded-lg uppercase tracking-wider">
                  {ep.method}
                </span>
                <span className="text-xs font-mono font-bold text-primary bg-surface border border-primary/10 px-3 py-1 rounded-lg">
                  {ep.path}
                </span>
              </div>

              <p className="text-xs font-semibold text-primary">{ep.desc}</p>

              <div>
                <h4 className="text-xs font-extrabold text-primary mb-2">Request Headers</h4>
                <div className="space-y-1.5">
                  {ep.headers.map((h, i) => (
                    <div key={i} className="flex justify-between items-center text-xs font-bold py-2 border-b border-primary/10">
                      <span className="font-mono text-accent">{h.name}</span>
                      <span className="text-primary">{h.desc}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-extrabold text-primary mb-2">JSON Request Example</h4>
                <pre className="bg-primary text-primary/20 rounded-xl p-4 text-xs font-mono overflow-x-auto leading-relaxed">
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
