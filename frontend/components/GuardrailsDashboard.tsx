'use client';

import React, { useState } from 'react';
import { useLocale } from '../app/providers';

export function GuardrailsDashboard() {
  const { locale } = useLocale();
  const t = (obj: Record<string, string>) => locale === 'ar' ? obj.ar : obj.en;

  const [activeTab, setActiveTab] = useState<'rules' | 'metrics'>('rules');

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-6">
      
      {/* Header Tabs */}
      <div className="flex justify-between items-center border-b border-slate-100 pb-4">
        <div>
          <h3 className="text-sm font-extrabold text-[#141F33]">{t({ en: 'Guardrails Oversight', ar: 'مراقبة جدران الحماية' })}</h3>
          <p className="text-[10px] text-slate-400 font-bold mt-0.5">{t({ en: 'Observe blocked jailbreaks and toxicity levels.', ar: 'مراقبة محاولات الاختراق ونسب الكلمات الضارة.' })}</p>
        </div>

        <div className="flex gap-2">
          {['rules', 'metrics'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                activeTab === tab ? 'bg-[#141F33] text-white' : 'bg-slate-50 text-slate-650 hover:bg-slate-100'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'rules' ? (
        <div className="space-y-3 text-xs font-semibold">
          <div className="flex justify-between py-2 border-b border-slate-50">
            <span>PII Redactor</span>
            <span className="text-emerald-600">Active</span>
          </div>
          <div className="flex justify-between py-2 border-b border-slate-50">
            <span>Prompt injection gates</span>
            <span className="text-emerald-600">Active</span>
          </div>
          <div className="flex justify-between py-2">
            <span>Toxic complete filter</span>
            <span className="text-emerald-600">Active</span>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="p-4 bg-slate-50 rounded-xl text-center space-y-1">
            <span className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider">Blocked jailbreak attempts</span>
            <p className="text-xl font-extrabold text-[#141F33]">12</p>
          </div>
          <div className="p-4 bg-slate-50 rounded-xl text-center space-y-1">
            <span className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider">Redacted PII fields</span>
            <p className="text-xl font-extrabold text-[#141F33]">142</p>
          </div>
        </div>
      )}

    </div>
  );
}
