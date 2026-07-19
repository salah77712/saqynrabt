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
        <h1 className="text-2xl md:text-3xl font-extrabold text-primary">{t({ en: 'A/B Testing', ar: 'Ø§Ø®ØªØ¨Ø§Ø±Ø§Øª A/B Ù„Ù„Ù…ÙˆØ¯ÙŠÙ„Ø§Øª' })}</h1>
        <p className="text-xs text-primary font-medium mt-0.5">{t({ en: 'Compare model versions by splitting traffic between them.', ar: 'ØªÙƒÙˆÙŠÙ† ØªÙ‚Ø³ÙŠÙ… Ø§Ù„Ø²ÙˆØ§Ø± Ø¨ÙŠÙ† Ø§Ù„Ù…ÙˆØ¯ÙŠÙ„ Ø§Ù„Ù‚ÙŠØ§Ø³ÙŠ ÙˆØ§Ù„Ù…ÙˆØ¯ÙŠÙ„ Ø§Ù„Ù…Ø®ØµØµ.' })}</p>
      </div>

      {/* Form config */}
      <form onSubmit={handleUpdate} className="bg-surface border border-primary/10 rounded-xl p-8 shadow-sm flex flex-col gap-8">
        
        <div className="grid grid-cols-2 gap-8">
          <div>
            <label htmlFor="model_a" className="block text-xs font-bold text-primary mb-1.5">{t({ en: 'Model A (Control)', ar: 'Ø§Ù„Ù…ÙˆØ¯ÙŠÙ„ Ø£ (Ø§Ù„Ù‚ÙŠØ§Ø³ÙŠ)' })}</label>
            <select
              id="model_a"
              value={activeTest.model_a}
              onChange={(e) => setActiveTest(prev => ({ ...prev, model_a: e.target.value }))}
              className="w-full min-h-[44px] bg-surface border border-primary/10 rounded-xl px-4 py-2 text-xs font-bold text-primary"
            >
              <option value="gpt-4o-mini">gpt-4o-mini</option>
              <option value="gpt-4o">gpt-4o</option>
            </select>
          </div>

          <div>
            <label htmlFor="model_b" className="block text-xs font-bold text-primary mb-1.5">{t({ en: 'Model B (Treatment)', ar: 'Ø§Ù„Ù…ÙˆØ¯ÙŠÙ„ Ø¨ (Ø§Ù„Ù…Ø¹Ø¯Ù„)' })}</label>
            <select
              id="model_b"
              value={activeTest.model_b}
              onChange={(e) => setActiveTest(prev => ({ ...prev, model_b: e.target.value }))}
              className="w-full min-h-[44px] bg-surface border border-primary/10 rounded-xl px-4 py-2 text-xs font-bold text-primary"
            >
              <option value="gpt-4o-mini-finetuned-alsafa">gpt-4o-mini-finetuned-alsafa</option>
              <option value="gpt-4o-finetuned">gpt-4o-finetuned</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="split_pct_a" className="block text-xs font-bold text-primary mb-1.5">{t({ en: 'Model A Traffic Split', ar: 'Ù†Ø³Ø¨Ø© ØªÙˆØ¬ÙŠÙ‡ Ø§Ù„Ø²ÙˆØ§Ø± Ù„Ù„Ù…ÙˆØ¯ÙŠÙ„ Ø£' })} ({activeTest.split_pct_a}%)</label>
          <input
            type="range"
            id="split_pct_a"
            min="0"
            max="100"
            value={activeTest.split_pct_a}
            onChange={(e) => setActiveTest(prev => ({ ...prev, split_pct_a: parseInt(e.target.value) }))}
            className="w-full h-2 bg-surface rounded-lg appearance-none cursor-pointer accent-[#141F33]"
          />
          <div className="flex justify-between text-[10px] text-primary font-bold mt-1">
            <span>Model A: {activeTest.split_pct_a}%</span>
            <span>Model B: {100 - activeTest.split_pct_a}%</span>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-primary text-surface font-bold py-3 px-6 rounded-xl text-xs min-h-[44px] flex items-center justify-center transition-all duration-300 hover:shadow-md hover:scale-[1.02] active:scale-95"
        >
          {t({ en: 'Update Split Testing Settings', ar: 'ØªØ­Ø¯ÙŠØ« Ø¥Ø¹Ø¯Ø§Ø¯Ø§Øª ØªÙ‚Ø³ÙŠÙ… Ø§Ù„Ø²ÙˆØ§Ø±' })}
        </button>

      </form>

      {/* History */}
      <div className="bg-surface border border-primary/10 rounded-xl p-8 shadow-sm">
        <h3 className="text-xs font-extrabold text-primary uppercase tracking-wider mb-4">{t({ en: 'Evaluation History & Results', ar: 'Ø³Ø¬Ù„ Ø§Ù„ØªÙ‚ÙŠÙŠÙ… ÙˆØ§Ù„Ù†ØªØ§Ø¦Ø¬' })}</h3>

        <div className="divide-y divide-[#141F33]/10">
          {history.map((h) => (
            <div key={h.id} className="py-3 first:pt-0 last:pb-0 space-y-1.5">
              <div className="flex justify-between text-xs font-extrabold text-primary">
                <span>{h.metric}</span>
                <span className="text-accent">{h.result}</span>
              </div>
              <p className="text-[10px] text-primary font-semibold">
                Control: {h.modelA} | Treatment: {h.modelB}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}


