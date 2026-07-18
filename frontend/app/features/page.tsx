'use client';

import React from 'react';
import { useLocale } from '../providers';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import Link from 'next/link';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { Zap, MessageSquare, Wrench, BarChart3 } from 'lucide-react';

export default function FeaturesPage() {
  const { locale } = useLocale();
  const { ref: featureGridRef, isVisible: featureGridVisible } = useScrollReveal<HTMLDivElement>();
  const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';

  const content = {
    title: { en: 'Two tools. One platform. Zero missed calls.', fr: 'Deux outils. Une plateforme. ZÃ©ro appel manquÃ©.', ar: 'Ø£Ø¯Ø§ØªØ§Ù†. Ù…Ù†ØµØ© ÙˆØ§Ø­Ø¯Ø©. Ø¨Ø¯ÙˆÙ† Ù…ÙƒØ§Ù„Ù…Ø§Øª Ø¶Ø§Ø¦Ø¹Ø©.', hi: 'à¤¦à¥‹ à¤‰à¤ªà¤•à¤°à¤£à¥¤ à¤à¤• à¤®à¤‚à¤šà¥¤ à¤¶à¥‚à¤¨à¥à¤¯ à¤®à¤¿à¤¸à¥à¤¡ à¤•à¥‰à¤²à¥¤' },
    subtitle: { en: 'Handle calls, messages, and employee questions automatically â€” built for how teams actually work, anywhere in the world.', fr: 'GÃ©rez les appels, les messages et les questions des employÃ©s automatiquement â€” conÃ§u pour le fonctionnement rÃ©el des Ã©quipes, partout dans le monde.', ar: 'ØªØ¹Ø§Ù…Ù„ Ù…Ø¹ Ø§Ù„Ù…ÙƒØ§Ù„Ù…Ø§Øª ÙˆØ§Ù„Ø±Ø³Ø§Ø¦Ù„ ÙˆØ£Ø³Ø¦Ù„Ø© Ø§Ù„Ù…ÙˆØ¸ÙÙŠÙ† ØªÙ„Ù‚Ø§Ø¦ÙŠØ§Ù‹ â€” Ù…Ø¨Ù†ÙŠ Ù„ÙƒÙŠÙÙŠØ© Ø¹Ù…Ù„ Ø§Ù„ÙØ±Ù‚ ÙÙŠ Ø£ÙŠ Ù…ÙƒØ§Ù† ÙÙŠ Ø§Ù„Ø¹Ø§Ù„Ù….', hi: 'à¤•à¥‰à¤², à¤¸à¤‚à¤¦à¥‡à¤¶ à¤”à¤° à¤•à¤°à¥à¤®à¤šà¤¾à¤°à¥€ à¤•à¥‡ à¤¸à¤µà¤¾à¤²à¥‹à¤‚ à¤•à¥‹ à¤¸à¥à¤µà¤šà¤¾à¤²à¤¿à¤¤ à¤°à¥‚à¤ª à¤¸à¥‡ à¤¸à¤‚à¤­à¤¾à¤²à¥‡à¤‚ â€” à¤Ÿà¥€à¤®à¥‹à¤‚ à¤•à¥‡ à¤µà¤¾à¤¸à¥à¤¤à¤µ à¤®à¥‡à¤‚ à¤•à¤¾à¤® à¤•à¤°à¤¨à¥‡ à¤•à¥‡ à¤¤à¤°à¥€à¤•à¥‡ à¤•à¥‡ à¤²à¤¿à¤ à¤¬à¤¨à¤¾à¤¯à¤¾ à¤—à¤¯à¤¾ à¤¹à¥ˆ, à¤¦à¥à¤¨à¤¿à¤¯à¤¾ à¤®à¥‡à¤‚ à¤•à¤¹à¥€à¤‚ à¤­à¥€à¥¤' },
    automationTitle: { en: 'Never miss a call or booking', fr: 'Ne manquez jamais un appel ou une rÃ©servation', ar: 'Ù„Ø§ ØªÙÙˆØª Ø£ÙŠ Ù…ÙƒØ§Ù„Ù…Ø© Ø£Ùˆ Ø­Ø¬Ø²', hi: 'à¤•à¥‰à¤² à¤¯à¤¾ à¤¬à¥à¤•à¤¿à¤‚à¤— à¤•à¤­à¥€ à¤¨ à¤šà¥‚à¤•à¥‡à¤‚' },
    automationDesc: { en: 'Your AI front-desk answers calls, reads messages, and routes requests to the right person â€” even at 3 AM.', fr: 'Votre rÃ©ception IA rÃ©pond aux appels, lit les messages et achemine les demandes vers la bonne personne â€” mÃªme Ã  3h du matin.', ar: 'Ù…ÙƒØªØ¨ Ø§Ù„Ø§Ø³ØªÙ‚Ø¨Ø§Ù„ Ø§Ù„Ø°ÙƒÙŠ Ù„Ø¯ÙŠÙƒ ÙŠØ±Ø¯ Ø¹Ù„Ù‰ Ø§Ù„Ù…ÙƒØ§Ù„Ù…Ø§ØªØŒ ÙŠÙ‚Ø±Ø£ Ø§Ù„Ø±Ø³Ø§Ø¦Ù„ØŒ ÙˆÙŠÙˆØ¬Ù‡ Ø§Ù„Ø·Ù„Ø¨Ø§Øª Ù„Ù„Ø´Ø®Øµ Ø§Ù„Ù…Ù†Ø§Ø³Ø¨ â€” Ø­ØªÙ‰ ÙÙŠ Ø§Ù„Ø«Ø§Ù„Ø«Ø© ÙØ¬Ø±Ø§Ù‹.', hi: 'à¤†à¤ªà¤•à¤¾ à¤à¤†à¤ˆ à¤«à¥à¤°à¤‚à¤Ÿ-à¤¡à¥‡à¤¸à¥à¤• à¤•à¥‰à¤² à¤•à¤¾ à¤œà¤µà¤¾à¤¬ à¤¦à¥‡à¤¤à¤¾ à¤¹à¥ˆ, à¤¸à¤‚à¤¦à¥‡à¤¶ à¤ªà¤¢à¤¼à¤¤à¤¾ à¤¹à¥ˆ, à¤”à¤° à¤…à¤¨à¥à¤°à¥‹à¤§à¥‹à¤‚ à¤•à¥‹ à¤¸à¤¹à¥€ à¤µà¥à¤¯à¤•à¥à¤¤à¤¿ à¤¤à¤• à¤ªà¤¹à¥à¤‚à¤šà¤¾à¤¤à¤¾ à¤¹à¥ˆ â€” à¤¸à¥à¤¬à¤¹ 3 à¤¬à¤œà¥‡ à¤­à¥€à¥¤' },
    chatbotTitle: { en: 'Your documents, now searchable by your team', fr: 'Vos documents, dÃ©sormais consultables par votre Ã©quipe', ar: 'Ù…Ø³ØªÙ†Ø¯Ø§ØªÙƒØŒ Ù‚Ø§Ø¨Ù„Ø© Ù„Ù„Ø¨Ø­Ø« Ø§Ù„Ø¢Ù† Ù…Ù† Ù‚Ø¨Ù„ ÙØ±ÙŠÙ‚Ùƒ', hi: 'à¤†à¤ªà¤•à¥‡ à¤¦à¤¸à¥à¤¤à¤¾à¤µà¥‡à¤œà¤¼, à¤…à¤¬ à¤†à¤ªà¤•à¥€ à¤Ÿà¥€à¤® à¤¦à¥à¤µà¤¾à¤°à¤¾ à¤–à¥‹à¤œà¥‡ à¤œà¤¾ à¤¸à¤•à¤¤à¥‡ à¤¹à¥ˆà¤‚' },
    chatbotDesc: { en: 'Upload your handbooks, policies, and manuals. Staff ask questions in plain language â€” the AI answers from your documents only.', fr: 'TÃ©lÃ©chargez vos manuels, politiques et guides. Le personnel pose des questions en langage clair â€” l\'IA rÃ©pond uniquement Ã  partir de vos documents.', ar: 'Ø­Ù…Ù‘Ù„ ÙƒØªÙŠØ¨Ø§ØªÙƒ ÙˆØ³ÙŠØ§Ø³Ø§ØªÙƒ ÙˆØ£Ø¯Ù„ØªÙƒ. ÙŠØ³Ø£Ù„ Ø§Ù„Ù…ÙˆØ¸ÙÙˆÙ† Ø¨Ù„ØºØ© Ø¨Ø³ÙŠØ·Ø© â€” ÙˆØ§Ù„Ø°ÙƒØ§Ø¡ Ø§Ù„Ø§ØµØ·Ù†Ø§Ø¹ÙŠ ÙŠØ¬ÙŠØ¨ Ù…Ù† Ù…Ø³ØªÙ†Ø¯Ø§ØªÙƒ ÙÙ‚Ø·.', hi: 'à¤…à¤ªà¤¨à¥€ à¤¹à¥ˆà¤‚à¤¡à¤¬à¥à¤•, à¤¨à¥€à¤¤à¤¿à¤¯à¤¾à¤‚ à¤”à¤° à¤¨à¤¿à¤¯à¤®à¤¾à¤µà¤²à¥€ à¤…à¤ªà¤²à¥‹à¤¡ à¤•à¤°à¥‡à¤‚à¥¤ à¤•à¤°à¥à¤®à¤šà¤¾à¤°à¥€ à¤¸à¤°à¤² à¤­à¤¾à¤·à¤¾ à¤®à¥‡à¤‚ à¤ªà¥à¤°à¤¶à¥à¤¨ à¤ªà¥‚à¤›à¤¤à¥‡ à¤¹à¥ˆà¤‚ â€” à¤à¤†à¤ˆ à¤•à¥‡à¤µà¤² à¤†à¤ªà¤•à¥‡ à¤¦à¤¸à¥à¤¤à¤¾à¤µà¥‡à¤œà¤¼à¥‹à¤‚ à¤¸à¥‡ à¤‰à¤¤à¥à¤¤à¤° à¤¦à¥‡à¤¤à¤¾ à¤¹à¥ˆà¥¤' },
    customTitle: { en: 'Built for your specific needs', fr: 'ConÃ§u pour vos besoins spÃ©cifiques', ar: 'Ù…Ø¨Ù†ÙŠ Ù„Ø§Ø­ØªÙŠØ§Ø¬Ø§ØªÙƒ Ø§Ù„Ø®Ø§ØµØ©', hi: 'à¤†à¤ªà¤•à¥€ à¤µà¤¿à¤¶à¤¿à¤·à¥à¤Ÿ à¤†à¤µà¤¶à¥à¤¯à¤•à¤¤à¤¾à¤“à¤‚ à¤•à¥‡ à¤²à¤¿à¤ à¤¨à¤¿à¤°à¥à¤®à¤¿à¤¤' },
    customDesc: { en: 'Custom routing, private integrations, unique workflows â€” we build what your operations actually require.', fr: 'Routage personnalisÃ©, intÃ©grations privÃ©es, flux de travail uniques â€” nous construisons ce dont vos opÃ©rations ont rÃ©ellement besoin.', ar: 'ØªÙˆØ¬ÙŠÙ‡ Ù…Ø®ØµØµØŒ ØªÙƒØ§Ù…Ù„Ø§Øª Ø®Ø§ØµØ©ØŒ Ø³ÙŠØ± Ø¹Ù…Ù„ ÙØ±ÙŠØ¯Ø© â€” Ù†Ø¨Ù†ÙŠ Ù…Ø§ ØªØ­ØªØ§Ø¬Ù‡ Ø¹Ù…Ù„ÙŠØ§ØªÙƒ ÙØ¹Ù„Ø§Ù‹.', hi: 'à¤•à¤¸à¥à¤Ÿà¤® à¤°à¥‚à¤Ÿà¤¿à¤‚à¤—, à¤¨à¤¿à¤œà¥€ à¤à¤•à¥€à¤•à¤°à¤£, à¤…à¤¦à¥à¤µà¤¿à¤¤à¥€à¤¯ à¤µà¤°à¥à¤•à¤«à¤¼à¥à¤²à¥‹ â€” à¤¹à¤® à¤µà¤¹à¥€ à¤¬à¤¨à¤¾à¤¤à¥‡ à¤¹à¥ˆà¤‚ à¤œà¥‹ à¤†à¤ªà¤•à¥‡ à¤¸à¤‚à¤šà¤¾à¤²à¤¨ à¤•à¥‡ à¤²à¤¿à¤ à¤µà¤¾à¤¸à¥à¤¤à¤µ à¤®à¥‡à¤‚ à¤†à¤µà¤¶à¥à¤¯à¤• à¤¹à¥ˆà¥¤' },
    reportingTitle: { en: "See what's happening, in real time", fr: "Voyez ce qui se passe, en temps rÃ©el", ar: "Ø´Ø§Ù‡Ø¯ Ù…Ø§ ÙŠØ­Ø¯Ø« ÙÙŠ Ø§Ù„ÙˆÙ‚Øª Ø§Ù„ÙØ¹Ù„ÙŠ", hi: "à¤¦à¥‡à¤–à¥‡à¤‚ à¤•à¤¿ à¤µà¤¾à¤¸à¥à¤¤à¤µà¤¿à¤• à¤¸à¤®à¤¯ à¤®à¥‡à¤‚ à¤•à¥à¤¯à¤¾ à¤¹à¥‹ à¤°à¤¹à¤¾ à¤¹à¥ˆ" },
    reportingDesc: { en: 'Track calls, messages, and team activity from one dashboard. No spreadsheets needed.', fr: 'Suivez les appels, les messages et l\'activitÃ© de l\'Ã©quipe Ã  partir d\'un seul tableau de bord. Pas besoin de feuilles de calcul.', ar: 'ØªØªØ¨Ø¹ Ø§Ù„Ù…ÙƒØ§Ù„Ù…Ø§Øª ÙˆØ§Ù„Ø±Ø³Ø§Ø¦Ù„ ÙˆÙ†Ø´Ø§Ø· Ø§Ù„ÙØ±ÙŠÙ‚ Ù…Ù† Ù„ÙˆØ­Ø© ØªØ­ÙƒÙ… ÙˆØ§Ø­Ø¯Ø©. Ù„Ø§ Ø­Ø§Ø¬Ø© Ù„Ø¬Ø¯Ø§ÙˆÙ„ Ø§Ù„Ø¨ÙŠØ§Ù†Ø§Øª.', hi: 'à¤à¤• à¤¹à¥€ à¤¡à¥ˆà¤¶à¤¬à¥‹à¤°à¥à¤¡ à¤¸à¥‡ à¤•à¥‰à¤², à¤¸à¤‚à¤¦à¥‡à¤¶ à¤”à¤° à¤Ÿà¥€à¤® à¤—à¤¤à¤¿à¤µà¤¿à¤§à¤¿ à¤•à¥‹ à¤Ÿà¥à¤°à¥ˆà¤• à¤•à¤°à¥‡à¤‚à¥¤ à¤¸à¥à¤ªà¥à¤°à¥‡à¤¡à¤¶à¥€à¤Ÿà¥à¤¸ à¤•à¥€ à¤•à¥‹à¤ˆ à¤†à¤µà¤¶à¥à¤¯à¤•à¤¤à¤¾ à¤¨à¤¹à¥€à¤‚ à¤¹à¥ˆà¥¤' },
  };

  return (
    <div className="bg-surface text-primary min-h-screen flex flex-col font-sans" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <Header />

      <main className="flex-1 max-w-6xl mx-auto py-24 px-6 lg:px-12 flex flex-col items-center">
        {/* Hero Section */}
        <div className="text-center max-w-2xl mb-16">
          <span className="text-xs font-extrabold tracking-widest text-accent uppercase">{t({ en: 'Features & Capabilities', fr: 'FonctionnalitÃ©s & CapacitÃ©s', ar: 'Ø§Ù„Ù…ÙŠØ²Ø§Øª ÙˆØ§Ù„Ù‚Ø¯Ø±Ø§Øª', hi: 'à¤¸à¥à¤µà¤¿à¤§à¤¾à¤à¤ à¤”à¤° à¤•à¥à¤·à¤®à¤¤à¤¾à¤à¤‚' })}</span>
          <h1 className="text-4xl lg:text-5xl font-extrabold text-primary leading-tight tracking-tight mt-3">
            {t(content.title)}
          </h1>
          <p className="text-sm font-medium text-primary mt-4 leading-relaxed">
            {t(content.subtitle)}
          </p>
        </div>

        {/* 2x2 Feature Grid */}
        <div ref={featureGridRef} className={`grid grid-cols-1 md:grid-cols-2 gap-12 w-full animate-stagger ${featureGridVisible ? 'revealed' : ''}`}>
          {/* Card 1: Automation */}
          <div className="bg-[#F8F9FB] border border-primary/10 rounded-xl p-8 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 shadow-card">
            <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center mb-6"><Zap className="w-6 h-6 text-accent" /></div>
            <h3 className="text-xl font-extrabold text-primary">{t(content.automationTitle)}</h3>
            <p className="text-xs font-normal text-primary leading-relaxed mt-3">{t(content.automationDesc)}</p>
          </div>

          {/* Card 2: Chatbot */}
          <div className="bg-[#F8F9FB] border border-primary/10 rounded-xl p-8 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 shadow-card">
            <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center mb-6"><MessageSquare className="w-6 h-6 text-accent" /></div>
            <h3 className="text-xl font-extrabold text-primary">{t(content.chatbotTitle)}</h3>
            <p className="text-xs font-normal text-primary leading-relaxed mt-3">{t(content.chatbotDesc)}</p>
          </div>

          {/* Card 3: Custom */}
          <div className="bg-[#F8F9FB] border border-primary/10 rounded-xl p-8 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 shadow-card">
            <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center mb-6"><Wrench className="w-6 h-6 text-accent" /></div>
            <h3 className="text-xl font-extrabold text-primary">{t(content.customTitle)}</h3>
            <p className="text-xs font-normal text-primary leading-relaxed mt-3">{t(content.customDesc)}</p>
          </div>

          {/* Card 4: Reporting */}
          <div className="bg-[#F8F9FB] border border-primary/10 rounded-xl p-8 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 shadow-card">
            <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center mb-6"><BarChart3 className="w-6 h-6 text-accent" /></div>
            <h3 className="text-xl font-extrabold text-primary">{t(content.reportingTitle)}</h3>
            <p className="text-xs font-normal text-primary leading-relaxed mt-3">{t(content.reportingDesc)}</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
