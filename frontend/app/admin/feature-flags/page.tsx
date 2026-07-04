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
  const t = (obj: Record<string, string>) => locale === 'ar' ? obj.ar : obj.en;

  const [flags, setFlags] = useState<FlagItem[]>([
    { id: 'f-1', name: 'voice_ai_enabled', enabled: true },
    { id: 'f-2', name: 'fine_tuning_enabled', enabled: false },
    { id: 'f-3', name: 'advanced_analytics_enabled', enabled: false },
  ]);

  const handleToggle = (id: string) => {
    setFlags(prev =>
      prev.map(f => f.id === id ? { ...f, enabled: !f.enabled } : f)
    );
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-xl py-12 px-6 mx-auto">
      
      {/* Header */}
      <div>
        <h1 className="text-xl font-extrabold text-[#141F33]">{t({ en: 'Global Feature Flag Manager', ar: 'إدارة مؤشرات الميزات البرمجية' })}</h1>
        <p className="text-xs text-[#718096] font-medium mt-0.5">{t({ en: 'SAQYN staff administrative panel. Toggle beta feature scopes.', ar: 'شاشة التحكم لموظفي SAQYN. تعديل وتفعيل صلاحيات الميزات التجريبية.' })}</p>
      </div>

      {/* Flags table */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <div className="divide-y divide-gray-100">
          {flags.map((flag) => (
            <div key={flag.id} className="py-4 flex justify-between items-center gap-4 first:pt-0 last:pb-0">
              <span className="text-xs font-mono font-bold text-slate-800">{flag.name}</span>

              <label className="relative inline-flex items-center cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={flag.enabled}
                  onChange={() => handleToggle(flag.id)}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#141F33]" />
              </label>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
