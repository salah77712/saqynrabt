'use client';

import React, { useState } from 'react';
import { useLocale } from '../../providers';

export default function GuardrailsSettingsPage() {
  const { locale } = useLocale();
  const t = (obj: Record<string, string>) => locale === 'ar' ? obj.ar : obj.en;

  const [settings, setSettings] = useState({
    pii_redaction: true,
    jailbreak_prevention: true,
    toxicity_filter: true,
  });

  const handleToggle = (key: 'pii_redaction' | 'jailbreak_prevention' | 'toxicity_filter') => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Guardrails configurations updated successfully!');
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-xl">
      
      {/* Header */}
      <div>
        <h1 className="text-xl font-extrabold text-[#141F33]">{t({ en: 'AI Safety Guardrails Console', ar: 'لوحة التحكم في أمان الذكاء الاصطناعي' })}</h1>
        <p className="text-xs text-[#718096] font-medium mt-0.5">{t({ en: 'Enable filters to redact PII, restrict prompt injections, and filter toxicity.', ar: 'تفعيل المرشحات لحجب البيانات الشخصية، ومنع الاختراقات، وتصفية المحتوى الضار.' })}</p>
      </div>

      {/* Config Form */}
      <form onSubmit={handleSave} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-4">
        
        <div className="space-y-3">
          {/* PII */}
          <div className="flex justify-between items-center p-3 border border-slate-100 rounded-xl bg-slate-50">
            <div>
              <p className="text-xs font-bold text-[#141F33]">PII Redaction</p>
              <p className="text-[10px] text-slate-500 font-semibold mt-0.5">Mask emails and phone numbers before querying LLM APIs.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer select-none">
              <input
                type="checkbox"
                checked={settings.pii_redaction}
                onChange={() => handleToggle('pii_redaction')}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#141F33]" />
            </label>
          </div>

          {/* Jailbreak */}
          <div className="flex justify-between items-center p-3 border border-slate-100 rounded-xl bg-slate-50">
            <div>
              <p className="text-xs font-bold text-[#141F33]">Jailbreak & Prompt Injection Filter</p>
              <p className="text-[10px] text-slate-500 font-semibold mt-0.5">Restrict jailbreak attempts ("ignore instructions", "system override").</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer select-none">
              <input
                type="checkbox"
                checked={settings.jailbreak_prevention}
                onChange={() => handleToggle('jailbreak_prevention')}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#141F33]" />
            </label>
          </div>

          {/* Toxicity */}
          <div className="flex justify-between items-center p-3 border border-slate-100 rounded-xl bg-slate-50">
            <div>
              <p className="text-xs font-bold text-[#141F33]">Harmful Output Toxicity Filter</p>
              <p className="text-[10px] text-slate-500 font-semibold mt-0.5">Checks LLM completions for toxic, harassing, or violent outputs.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer select-none">
              <input
                type="checkbox"
                checked={settings.toxicity_filter}
                onChange={() => handleToggle('toxicity_filter')}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#141F33]" />
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-[#141F33] text-white font-bold py-4 rounded-xl text-xs hover:opacity-95 transition-all min-h-[44px] flex items-center justify-center"
        >
          {t({ en: 'Save Guardrail Configurations', ar: 'حفظ إعدادات جدار الحماية' })}
        </button>

      </form>

    </div>
  );
}
