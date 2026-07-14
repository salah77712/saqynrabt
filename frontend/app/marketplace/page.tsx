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
      name: t({ en: 'Slack Sync', fr: 'Synchronisation Slack', ar: 'مزامنة سلاك', hi: 'स्लैक सिंक' }), 
      desc: t({ en: 'Dispatches chat messages and summaries to custom Slack channel targets.', fr: 'Distribue les messages de discussion et les résumés vers des canaux Slack personnalisés.', ar: 'يرسل رسائل المحادثة والملخصات إلى قنوات سلاك المخصصة.', hi: 'चैट संदेशों और सारांशों को कस्टम स्लैक चैनल लक्ष्यों पर भेजता है।' }), 
      developer: t({ en: 'SAQYN core', fr: 'SAQYN core', ar: 'نواة ساكن', hi: 'SAQYN कोर' }) 
    },
    { 
      name: t({ en: 'BambooHR Connector', fr: 'Connecteur BambooHR', ar: 'رابط BambooHR', hi: 'BambooHR कनेक्टर' }), 
      desc: t({ en: 'Automatically syncs employee lists and leaves balances to active company tables.', fr: 'Synchronise automatiquement les listes d\'employés et les soldes de congés avec les tables actives de l\'entreprise.', ar: 'يحدث تلقائياً قوائم الموظفين وأرصدة الإجازات لجداول الشركة النشطة.', hi: 'कर्मचारी सूचियों और छुट्टी शेष को सक्रिय कंपनी तालिकाओं में स्वचालित रूप से सिंक करता है।' }), 
      developer: t({ en: 'SAQYN core', fr: 'SAQYN core', ar: 'نواة ساكن', hi: 'SAQYN कोर' }) 
    },
  ];

  return (
    <div className="bg-[#F8F9FB] text-[#141F33] min-h-screen flex flex-col font-sans" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <Header />

      <main className="flex-1 max-w-4xl mx-auto py-24 px-6 w-full space-y-12">
        {/* Header */}
        <div>
          <span className="text-xs font-extrabold tracking-widest text-[#2A5CFF] uppercase">{t({ en: 'Integration Hub', fr: 'Hub d\'intégration', ar: 'مركز التكاملات البرمجية', hi: 'एकीकरण हब' })}</span>
          <h1 className="text-3xl font-extrabold text-[#141F33] tracking-tight mt-2">
            {t({ en: 'SAQYN Marketplace Extensions', fr: 'Extensions du SAQYN Marketplace', ar: 'متجر إضافات SAQYN', hi: 'SAQYN मार्केटप्लेस एक्सटेंशन' })}
          </h1>
          <p className="text-xs font-semibold text-[#141F33] mt-2">
            {t({ en: 'Integrate external CRM, ERP, and chat channels into your active workspace.', fr: 'Intégrez des canaux externes CRM, ERP et de discussion dans votre espace de travail actif.', ar: 'ربط أنظمة CRM و ERP وقنوات المحادثة الخارجية بمساحة عملك.', hi: 'अपने सक्रिय कार्यक्षेत्र में बाहरी सीआरएम, ईआरपी और चैट चैनलों को एकीकृत करें।' })}
          </p>
        </div>

        {/* Plugin Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {plugins.map((p, idx) => (
            <MarketplaceCard key={idx} name={p.name} desc={p.desc} developer={p.developer} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
