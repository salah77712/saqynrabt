'use client';

import React, { useState } from 'react';
import { useLocale } from '../../providers';
import { MarketingHeader } from '../../../components/MarketingHeader';
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
  const t = (obj: Record<string, string>) => locale === 'ar' ? obj.ar : obj.en;

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
    <div className="bg-[#F8F9FB] text-[#1A202C] min-h-screen flex flex-col font-sans" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <MarketingHeader />

      <main className="flex-1 max-w-4xl mx-auto py-24 px-6 w-full space-y-12">
        {/* Header */}
        <div>
          <span className="text-xs font-extrabold tracking-widest text-[#2A5CFF] uppercase">{t({ en: 'Community Ecosystem', ar: 'المنظومة البرمجية للمجتمع' })}</span>
          <h1 className="text-3xl font-extrabold text-[#141F33] tracking-tight mt-2">
            {t({ en: 'Integration Plugin Marketplace', ar: 'متجر إضافات التكامل البرمجي' })}
          </h1>
          <p className="text-xs font-semibold text-[#718096] mt-2">
            {t({ en: 'Expand your company workspace with customized plugins and templates.', ar: 'وسّع مساحة عمل شركتك باستخدام الإضافات والقوالب المخصصة.' })}
          </p>
        </div>

        {/* Plugin Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {plugins.map((plugin) => (
            <div key={plugin.id} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md hover:scale-[1.02] transition-all duration-300">
              <div className="space-y-2">
                <span className="text-[10px] font-extrabold text-[#2A5CFF] uppercase tracking-wider">by {plugin.author}</span>
                <h3 className="text-base font-extrabold text-[#141F33]">{plugin.name}</h3>
                <p className="text-xs text-slate-500 font-semibold leading-relaxed">{plugin.desc}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                <span className={`text-[9px] font-extrabold uppercase px-2.5 py-0.5 rounded-full ${
                  plugin.installed ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-700'
                }`}>
                  {plugin.installed ? t({ en: 'Installed', ar: 'مثبّت' }) : t({ en: 'Available', ar: 'متاح' })}
                </span>
                
                <button
                  onClick={() => handleInstall(plugin.id)}
                  className={`font-bold px-4 py-2 rounded-xl text-xs ${
                    plugin.installed ? 'bg-red-50 text-red-600 hover:bg-red-100' : 'bg-[#141F33] hover:opacity-95 text-white'
                  }`}
                >
                  {plugin.installed ? t({ en: 'Uninstall', ar: 'إلغاء التثبيت' }) : t({ en: 'Install', ar: 'تثبيت' })}
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
