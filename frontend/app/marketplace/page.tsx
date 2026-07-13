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
    { name: 'Slack Sync', desc: 'Dispatches chat messages and summaries to custom Slack channel targets.', developer: 'SAQYN core' },
    { name: 'BambooHR Connector', desc: 'Automatically syncs employee lists and leaves balances to active company tables.', developer: 'SAQYN core' },
  ];

  return (
    <div className="bg-[#F8F9FB] text-[#1A202C] min-h-screen flex flex-col font-sans" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <Header />

      <main className="flex-1 max-w-4xl mx-auto py-24 px-6 w-full space-y-12">
        {/* Header */}
        <div>
          <span className="text-xs font-extrabold tracking-widest text-[#2A5CFF] uppercase">{t({ en: 'Integration Hub', ar: 'مركز التكاملات البرمجية' })}</span>
          <h1 className="text-3xl font-extrabold text-[#141F33] tracking-tight mt-2">
            {t({ en: 'SAQYN Marketplace Extensions', ar: 'متجر إضافات SAQYN' })}
          </h1>
          <p className="text-xs font-semibold text-[#718096] mt-2">
            {t({ en: 'Integrate external CRM, ERP, and chat channels into your active workspace.', ar: 'ربط أنظمة CRM و ERP وقنوات المحادثة الخارجية بمساحة عملك.' })}
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
