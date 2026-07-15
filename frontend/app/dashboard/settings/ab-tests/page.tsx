'use client';

import React, { useState } from 'react';
import { useLocale } from '../../../providers';
import { useGlobalToast } from '../../../../lib/toast';

interface TestRecord {
  id: string;
  metric: string;
  modelA: string;
  modelB: string;
  result: string;
}

export default function ABTestingSettingsPage() {
  const { locale } = useLocale();
  const { addToast } = useGlobalToast();
  const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';

  const [activeTest, setActiveTest] = useState({
    model_a: 'gpt-4o-mini',
    model_b: 'gpt-4o-mini-finetuned-alsafa',
    split_pct_a: 50,
  });

  const [history] = useState<TestRecord[]>([
    { id: 't-1', metric: 'Chat Accuracy Scopes', modelA: 'gpt-4o-mini (89%)', modelB: 'gpt-4o-mini-finetuned (94%)', result: 'Model B outperformed by +5%' },
  ]);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    addToast('A/B traffic split settings updated successfully!', 'success');
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-xl">
      
      {/* Header */}
      <div>
        <h1 className="text-xl font-extrabold text-[#141F33]">{t({ en: 'A/B Testing', ar: 'اختبارات A/B للموديلات' })}</h1>
        <p className="text-xs text-[#141F33] font-medium mt-0.5">{t({ en: 'Compare model versions by splitting traffic between them.', ar: 'تكوين تقسيم الزوار بين الموديل القياسي والموديل المخصص.' })}</p>
      </div>

      {/* Form config */}
      <form onSubmit={handleUpdate} className="bg-[#F8F9FB] border border-[#141F33]/10 rounded-2xl p-6 shadow-sm flex flex-col gap-6">
        
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label htmlFor="model_a" className="block text-xs font-bold text-[#141F33] mb-1.5">{t({ en: 'Model A (Control)', ar: 'الموديل أ (القياسي)' })}</label>
            <select
              id="model_a"
              value={activeTest.model_a}
              onChange={(e) => setActiveTest(prev => ({ ...prev, model_a: e.target.value }))}
              className="w-full min-h-[44px] bg-[#F8F9FB] border border-[#141F33]/10 rounded-xl px-4 py-2 text-xs font-bold text-[#141F33]"
            >
              <option value="gpt-4o-mini">gpt-4o-mini</option>
              <option value="gpt-4o">gpt-4o</option>
            </select>
          </div>

          <div>
            <label htmlFor="model_b" className="block text-xs font-bold text-[#141F33] mb-1.5">{t({ en: 'Model B (Treatment)', ar: 'الموديل ب (المعدل)' })}</label>
            <select
              id="model_b"
              value={activeTest.model_b}
              onChange={(e) => setActiveTest(prev => ({ ...prev, model_b: e.target.value }))}
              className="w-full min-h-[44px] bg-[#F8F9FB] border border-[#141F33]/10 rounded-xl px-4 py-2 text-xs font-bold text-[#141F33]"
            >
              <option value="gpt-4o-mini-finetuned-alsafa">gpt-4o-mini-finetuned-alsafa</option>
              <option value="gpt-4o-finetuned">gpt-4o-finetuned</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="split_pct_a" className="block text-xs font-bold text-[#141F33] mb-1.5">{t({ en: 'Model A Traffic Split', ar: 'نسبة توجيه الزوار للموديل أ' })} ({activeTest.split_pct_a}%)</label>
          <input
            type="range"
            id="split_pct_a"
            min="0"
            max="100"
            value={activeTest.split_pct_a}
            onChange={(e) => setActiveTest(prev => ({ ...prev, split_pct_a: parseInt(e.target.value) }))}
            className="w-full h-2 bg-[#F8F9FB] rounded-lg appearance-none cursor-pointer accent-[#141F33]"
          />
          <div className="flex justify-between text-[10px] text-[#141F33] font-bold mt-1">
            <span>Model A: {activeTest.split_pct_a}%</span>
            <span>Model B: {100 - activeTest.split_pct_a}%</span>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-[#141F33] text-[#F8F9FB] font-bold py-3 px-6 rounded-xl text-xs min-h-[44px] flex items-center justify-center transition-all duration-300 hover:shadow-md hover:scale-[1.02] active:scale-95"
        >
          {t({ en: 'Update Split Testing Settings', ar: 'تحديث إعدادات تقسيم الزوار' })}
        </button>

      </form>

      {/* History */}
      <div className="bg-[#F8F9FB] border border-[#141F33]/10 rounded-2xl p-6 shadow-sm">
        <h3 className="text-xs font-extrabold text-[#141F33] uppercase tracking-wider mb-4">{t({ en: 'Evaluation History & Results', ar: 'سجل التقييم والنتائج' })}</h3>

        <div className="divide-y divide-[#141F33]/10">
          {history.map((h) => (
            <div key={h.id} className="py-3 first:pt-0 last:pb-0 space-y-1.5">
              <div className="flex justify-between text-xs font-extrabold text-[#141F33]">
                <span>{h.metric}</span>
                <span className="text-[#2A5CFF]">{h.result}</span>
              </div>
              <p className="text-[10px] text-[#141F33] font-semibold">
                Control: {h.modelA} | Treatment: {h.modelB}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}


