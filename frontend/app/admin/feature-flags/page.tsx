'use client';

import React, { useState } from 'react';
import { useLocale } from '../../providers';

interface FlagItem {
  id: string;
  name: string;
  enabled: boolean;
}

export default function AdminFeatureFlagsPage() {
  const { locale } = useLocale();
  const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';

  const [flags, setFlags] = useState<FlagItem[]>([
    { id: 'f-1', name: 'voice_ai_enabled', enabled: true },
    { id: 'f-2', name: 'fine_tuning_enabled', enabled: false },
    { id: 'f-3', name: 'advanced_analytics_enabled', enabled: false },
  ]);

  const handleToggle = (id: string) => {
    setFlags(prev => prev.map(f => f.id === id ? { ...f, enabled: !f.enabled } : f));
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-xl py-12 px-6 mx-auto">

      {/* Header */}
      <div>
        <h1 className="text-xl font-extrabold text-primary">{t({ en: 'Global Feature Flag Manager', ar: 'Ø¥Ø¯Ø§Ø±Ø© Ù…Ø¤Ø´Ø±Ø§Øª Ø§Ù„Ù…ÙŠØ²Ø§Øª Ø§Ù„Ø¨Ø±Ù…Ø¬ÙŠØ©' })}</h1>
        <p className="text-xs text-primary/60 font-medium mt-0.5">{t({ en: 'SAQYN staff administrative panel. Toggle beta feature scopes.', ar: 'Ø´Ø§Ø´Ø© Ø§Ù„ØªØ­ÙƒÙ… Ù„Ù…ÙˆØ¸ÙÙŠ SAQYN. ØªØ¹Ø¯ÙŠÙ„ ÙˆØªÙØ¹ÙŠÙ„ ØµÙ„Ø§Ø­ÙŠØ§Øª Ø§Ù„Ù…ÙŠØ²Ø§Øª Ø§Ù„ØªØ¬Ø±ÙŠØ¨ÙŠØ©.' })}</p>
      </div>

      {/* Flags table */}
      <div className="bg-surface border border-primary/10 rounded-xl p-8 shadow-sm">
        <div className="divide-y divide-[#141F33]/10">
          {flags.map((flag) => (
            <div key={flag.id} className="py-4 flex justify-between items-center gap-8 first:pt-0 last:pb-0">
              <span className="text-xs font-mono font-bold text-primary">{flag.name}</span>

              <label className="relative inline-flex items-center cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={flag.enabled}
                  onChange={() => handleToggle(flag.id)}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-primary peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-surface after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-surface after:border-primary/10 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary" />
              </label>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
