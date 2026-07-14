'use client';

import React, { useState } from 'react';
import { useLocale } from '../../providers';
import { Header } from '../../../components/Header';
import { Footer } from '../../../components/Footer';

interface PluginItem {
  id: string;
  name: string;
  desc: string;
  author: string;
  installed: boolean;
}

export default function PluginsMarketplacePage() {
  const { locale } = useLocale();
  const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';

  const [plugins, setPlugins] = useState<PluginItem[]>([
    { id: 'p-1', name: 'Slack Workspaces Sync', desc: 'Dispatches active queue dispatches and call summaries to Slack channels.', author: 'SAQYN core', installed: false },
    { id: 'p-2', name: 'BambooHR sync', desc: 'Auto-syncs employee lists and leaves balances to Postgres tables.', author: 'SAQYN core', installed: true },
    { id: 'p-3', name: 'Calendar Bookings', desc: 'Hooks into Google & Outlook calendars to insert scheduling details.', author: 'Community', installed: false },
  ]);

  const handleInstall = (id: string) => {
    setPlugins(prev =>
      prev.map(p => p.id === id ? { ...p, installed: !p.installed } : p)
    );
  };

  return (
    <div className="bg-[#F8F9FB] text-[#141F33] min-h-screen flex flex-col font-sans" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <Header />

      <main className="flex-1 max-w-4xl mx-auto py-24 px-6 w-full space-y-12">
        {/* Header */}
        <div>
          <span className="text-xs font-extrabold tracking-widest text-[#2A5CFF] uppercase">{t({ en: 'Community Ecosystem', fr: 'Écosystème communautaire', ar: 'المنظومة البرمجية للمجتمع', hi: 'सामुदायिक पारिस्थितिकी तंत्र' })}</span>
          <h1 className="text-3xl font-extrabold text-[#141F33] tracking-tight mt-2">
            {t({ en: 'Integration Plugin Marketplace', fr: 'Marketplace de plugins d\'intégration', ar: 'متجر إضافات التكامل البرمجي', hi: 'एकीकरण प्लगइन मार्केटप्लेस' })}
          </h1>
          <p className="text-xs font-semibold text-[#141F33] mt-2">
            {t({ en: 'Expand your company workspace with customized plugins and templates.', fr: 'Développez l\'espace de travail de votre entreprise avec des plugins et des modèles personnalisés.', ar: 'وسّع مساحة عمل شركتك باستخدام الإضافات والقوالب المخصصة.', hi: 'कस्टम प्लगइन्स और टेम्प्लेट के साथ अपनी कंपनी के कार्यक्षेत्र का विस्तार करें।' })}
          </p>
        </div>

        {/* Plugin Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {plugins.map((plugin) => (
            <div key={plugin.id} className="bg-[#F8F9FB] border border-[#141F33]/10 rounded-2xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md hover:scale-[1.02] transition-all duration-300">
              <div className="space-y-2">
                <span className="text-[10px] font-extrabold text-[#2A5CFF] uppercase tracking-wider">by {plugin.author}</span>
                <h3 className="text-base font-extrabold text-[#141F33]">{plugin.name}</h3>
                <p className="text-xs text-[#141F33] font-semibold leading-relaxed">{plugin.desc}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#141F33]/10 flex items-center justify-between">
                <span className={`text-[9px] font-extrabold uppercase px-2.5 py-0.5 rounded-full ${
                  plugin.installed ? 'bg-[#F8F9FB] text-[#2A5CFF]' : 'bg-[#F8F9FB] text-[#141F33]'
                }`}>
                  {plugin.installed ? t({ en: 'Installed', fr: 'Installé', ar: 'مثبّت', hi: 'स्थापित' }) : t({ en: 'Available', fr: 'Disponible', ar: 'متاح', hi: 'उपलब्ध' })}
                </span>
                
                <button
                  onClick={() => handleInstall(plugin.id)}
                  className={`font-bold px-4 py-2 rounded-xl text-xs ${
                    plugin.installed ? 'bg-[#F8F9FB] text-[#141F33] hover:bg-[#F8F9FB]' : 'bg-[#141F33] hover:opacity-95 text-[#F8F9FB]'
                  }`}
                >
                  {plugin.installed ? t({ en: 'Uninstall', fr: 'Désinstaller', ar: 'إلغاء التثبيت', hi: 'अनइंस्टॉल करें' }) : t({ en: 'Install', fr: 'Installer', ar: 'تثبيت', hi: 'स्थापित करें' })}
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
