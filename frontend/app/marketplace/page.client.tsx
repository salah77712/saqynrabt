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
      name: t({ en: 'Slack Sync', fr: 'Synchronisation Slack', ar: 'مزامنة سلاك', hi: 'à¤¸à¥à¤²à¥à¤ à¤¸à¤¿à¤à¤' }), 
      desc: t({ en: 'Dispatches chat messages and summaries to custom Slack channel targets.', fr: 'Distribue les messages de discussion et les rÃ©sumÃ©s vers des canaux Slack personnalisÃ©s.', ar: 'يرسل رسائل المحادثة والملخصات إلى قنوات سلاك المخصصة.', hi: 'à¤à¥à¤ à¤¸à¤à¤¦à¥à¤¶à¥à¤ à¤à¤° à¤¸à¤¾à¤°à¤¾à¤à¤¶à¥à¤ à¤à¥ à¤à¤¸à¥à¤à¤® à¤¸à¥à¤²à¥à¤ à¤à¥à¤¨à¤² à¤²à¤à¥à¤·à¥à¤¯à¥à¤ à¤ªà¤° à¤­à¥à¤à¤¤à¤¾ à¤¹à¥à¥¤' }), 
      developer: t({ en: 'SAQYN core', fr: 'SAQYN core', ar: 'نواة ساكن', hi: 'SAQYN كور' }) 
    },
    { 
      name: t({ en: 'BambooHR Connector', fr: 'Connecteur BambooHR', ar: 'رابط BambooHR', hi: 'BambooHR à¤à¤¨à¥à¤à¥à¤à¤°' }), 
      desc: t({ en: 'Automatically syncs employee lists and leaves balances to active company tables.', fr: 'Synchronise automatiquement les listes d\'employÃ©s et les soldes de congÃ©s avec les tables actives de l\'entreprise.', ar: 'يحدث تلقائياً قوائم الموظفين وأرصدة الإجازات لجداول الشركة النشطة.', hi: 'à¤à¤°à¥à¤®à¤à¤¾à¤°à¥ à¤¸à¥à¤à¤¿à¤¯à¥à¤ à¤à¤° à¤à¥à¤à¥à¤à¥ à¤¶à¥à¤· à¤à¥ à¤¸à¤à¥à¤°à¤¿à¤¯ à¤à¤à¤ªà¤¨à¥ à¤¤à¤¾à¤²à¤¿à¤à¤¾à¤à¤ à¤®à¥à¤ à¤¸à¥à¤µà¤à¤¾à¤²à¤¿à¤¤ à¤°à¥à¤ª à¤¸à¥ à¤¸à¤¿à¤à¤ à¤à¤°à¤¤à¤¾ à¤¹à¥à¥¤' }), 
      developer: t({ en: 'SAQYN core', fr: 'SAQYN core', ar: 'نواة ساكن', hi: 'SAQYN كور' }) 
    },
  ];

  return (
    <div className="bg-surface text-primary min-h-screen flex flex-col font-sans animate-fadeIn" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <Header />

      <main className="flex-1 max-w-4xl mx-auto py-24 px-6 w-full space-y-12">
        {/* Header */}
        <div>
          <span className="text-xs font-extrabold tracking-widest text-accent uppercase">{t({ en: 'Integration Hub', fr: 'Hub d\'intÃ©gration', ar: 'مركز التكاملات البرمجية', hi: 'à¤à¤à¥à¤à¤°à¤£ à¤¹à¤¬' })}</span>
          <h1 className="text-2xl md:text-4xl font-extrabold text-primary tracking-tight mt-2">
            {t({ en: 'SAQYN Marketplace Extensions', fr: 'Extensions du SAQYN Marketplace', ar: 'متجر إضافات SAQYN', hi: 'SAQYN à¤®à¤¾à¤°à¥à¤à¥à¤à¤ªà¥à¤²à¥à¤¸ à¤à¤à¥à¤¸à¤à¥à¤à¤¶à¤¨' })}
          </h1>
          <p className="text-xs font-semibold text-primary mt-2">
            {t({ en: 'Integrate external CRM, ERP, and chat channels into your active workspace.', fr: 'IntÃ©grez des canaux externes CRM, ERP et de discussion dans votre espace de travail actif.', ar: 'ربط أنظمة CRM و ERP وقنوات المحادثة الخارجية بمساحة عملك.', hi: 'à¤à¤ªà¤¨à¥ à¤¸à¤à¥à¤°à¤¿à¤¯ à¤à¤¾à¤°à¥à¤¯à¤à¥à¤·à¥à¤¤à¥à¤° à¤®à¥à¤ à¤¬à¤¾à¤¹à¤°à¥ à¤¸à¥à¤à¤°à¤à¤®, à¤à¤à¤°à¤ªà¥ à¤à¤° à¤à¥à¤ à¤à¥à¤¨à¤²à¥à¤ à¤à¥ à¤à¤à¥à¤à¥à¤¤ à¤à¤°à¥à¤à¥¤' })}
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
