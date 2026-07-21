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
    { id: 'p-2', name: 'BambooHR sync', desc: 'Au employee lists and leaves balances to Postgres tables.', author: 'SAQYN core', installed: true },
    { id: 'p-3', name: 'Calendar Bookings', desc: 'Hooks into Google & Outlook calendars to insert scheduling details.', author: 'Community', installed: false },
  ]);

  const handleInstall = (id: string) => {
    setPlugins(prev =>
      prev.map(p => p.id === id ? { ...p, installed: !p.installed } : p)
    );
  };

  return (
    <div className="bg-surface text-primary min-h-screen flex flex-col font-sans" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <Header />

      <main className="flex-1 max-w-4xl mx-auto py-24 px-6 w-full space-y-12">
        {/* Header */}
        <div>
          <span className="text-xs font-extrabold tracking-widest text-accent uppercase">{t({ en: 'Community Ecosystem', fr: 'ÃcosystÃ¨me communautaire', ar: 'المنظومة البرمجية للمجتمع', hi: 'à¤¸à¤¾à¤®à¥à¤¦à¤¾à¤¯à¤¿à¤ à¤ªà¤¾à¤°à¤¿à¤¸à¥à¤¥à¤¿à¤¤à¤¿à¤à¥ à¤¤à¤à¤¤à¥à¤°' })}</span>
          <h1 className="text-xl md:text-3xl font-extrabold text-primary tracking-tight mt-2">
            {t({ en: 'Integration Plugin Marketplace', fr: 'Marketplace de plugins d\'intÃ©gration', ar: 'متجر إضافات التكامل البرمجي', hi: 'à¤à¤à¥à¤à¤°à¤£ à¤ªà¥à¤²à¤à¤à¤¨ à¤®à¤¾à¤°à¥à¤à¥à¤à¤ªà¥à¤²à¥à¤¸' })}
          </h1>
          <p className="text-xs font-semibold text-primary mt-2">
            {t({ en: 'Expand your company workspace with customized plugins and templates.', fr: 'DÃ©veloppez l\'espace de travail de votre entreprise avec des plugins et des modÃ¨les personnalisÃ©s.', ar: 'وسّع مساحة عمل شركتك باستخدام الإضافات والقوالب المخصصة.', hi: 'à¤à¤¸à¥à¤à¤® à¤ªà¥à¤²à¤à¤à¤¨à¥à¤¸ à¤à¤° à¤à¥à¤®à¥à¤ªà¥à¤²à¥à¤ à¤à¥ à¤¸à¤¾à¤¥ à¤à¤ªà¤¨à¥ à¤à¤à¤ªà¤¨à¥ à¤à¥ à¤à¤¾à¤°à¥à¤¯à¤à¥à¤·à¥à¤¤à¥à¤° à¤à¤¾ à¤µà¤¿à¤¸à¥à¤¤à¤¾à¤° à¤à¤°à¥à¤à¥¤' })}
          </p>
        </div>

        {/* Plugin Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          {plugins.map((plugin) => (
            <div key={plugin.id} className="bg-surface border border-primary/10 rounded-xl p-8 shadow-sm flex flex-col justify-between hover:shadow-md hover:scale-[1.02] transition-all duration-300">
              <div className="space-y-2">
                <span className="text-xs font-extrabold text-accent uppercase tracking-wider">by {plugin.author}</span>
                <h3 className="text-base font-extrabold text-primary">{plugin.name}</h3>
                <p className="text-xs text-primary font-semibold leading-relaxed">{plugin.desc}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-primary/10 flex items-center justify-between">
                <span className={`text-xs font-extrabold uppercase px-2.5 py-0.5 rounded-full ${
                  plugin.installed ? 'bg-surface text-accent' : 'bg-surface text-primary'
                }`}>
                  {plugin.installed ? t({ en: 'Installed', fr: 'InstallÃ©', ar: 'مثبّت', hi: 'à¤¸à¥à¤¥à¤¾à¤ªà¤¿à¤¤' }) : t({ en: 'Available', fr: 'Disponible', ar: 'متاح', hi: 'à¤à¤ªà¤²à¤¬à¥à¤§' })}
                </span>
                
                <button
                  onClick={() => handleInstall(plugin.id)}
                  className={`font-bold px-4 py-2 rounded-xl text-xs ${
                    plugin.installed ? 'bg-surface text-primary hover:bg-surface' : 'bg-primary hover:opacity-95 text-surface'
                  }`}
                >
                  {plugin.installed ? t({ en: 'Uninstall', fr: 'DÃ©sinstaller', ar: 'إلغاء التثبيت', hi: 'à¤à¤¨à¤à¤à¤¸à¥à¤à¥à¤² à¤à¤°à¥à¤' }) : t({ en: 'Install', fr: 'Installer', ar: 'تثبيت', hi: 'à¤¸à¥à¤¥à¤¾à¤ªà¤¿à¤¤ à¤à¤°à¥à¤' })}
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
