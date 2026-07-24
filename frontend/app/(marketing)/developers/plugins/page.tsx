'use client';

import React, { useState } from 'react';
import { useLocale } from '@/app/providers';

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
    <div className="bg-surface text-primary min-h-screen flex flex-col font-sans">
      <main className="flex-1 max-w-4xl mx-auto py-24 px-6 w-full space-y-12">
        {/* Header */}
        <div>
          <span className="text-xs font-extrabold tracking-widest text-accent uppercase">{t({ en: 'Community Ecosystem', ar: 'المنظومة البرمجية للمجتمع' })}</span>
          <h1 className="text-xl md:text-3xl font-extrabold text-primary tracking-tight mt-2">
            {t({ en: 'Integration Plugin Marketplace', ar: 'متجر إضافات التكامل البرمجي' })}
          </h1>
          <p className="text-xs font-semibold text-primary mt-2">
            {t({ en: 'Expand your company workspace with customized plugins and templates.', ar: 'وسّع مساحة عمل شركتك باستخدام الإضافات والقوالب المخصصة.' })}
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
                  {plugin.installed ? t({ en: 'Installed', ar: 'مثبّت' }) : t({ en: 'Available', ar: 'متاح' })}
                </span>
                
                <button
                  onClick={() => handleInstall(plugin.id)}
                  className={`font-bold px-4 py-2 rounded-xl text-xs ${
                    plugin.installed ? 'bg-surface text-primary hover:bg-surface' : 'bg-primary hover:opacity-95 text-surface'
                  }`}
                >
                  {plugin.installed ? t({ en: 'Uninstall', ar: 'إلغاء التثبيت' }) : t({ en: 'Install', ar: 'تثبيت' })}
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

    </div>
  );
}
