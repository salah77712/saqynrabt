'use client';

import React, { useState } from 'react';
import { useLocale } from '../../../providers';
import { useGlobalToast } from '../../../../lib/toast';

export default function PromptsSettingsPage() {
  const { locale } = useLocale();
  const { addToast } = useGlobalToast();
  const t = (obj: Record<string, string>) => locale === 'ar' ? obj.ar : obj.en;

  const [prompt, setPrompt] = useState(
    "You are a private AI assistant for Al-Safa Hospitality. Answer queries using the provided handbook context. If you do not know the answer, respond with 'Low confidence'."
  );
  const [saving, setSaving] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    setTimeout(() => {
      setSaving(false);
      addToast('System prompt configurations updated successfully!', 'success');
    }, 800);
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-xl">
      
      {/* Header */}
      <div>
        <h1 className="text-xl font-extrabold text-[#141F33]">{t({ en: 'AI Prompts', ar: 'هندسة النصوص والتعليمات البرمجية' })}</h1>
        <p className="text-xs text-[#718096] font-medium mt-0.5">{t({ en: 'Customize how your AI assistant responds to questions.', ar: 'تعديل التعليمات والتعليمات الفرعية وبارامترات مخرجات الذكاء الاصطناعي.' })}</p>
      </div>

      {/* Editor */}
      <form onSubmit={handleSave} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-4">
        
        <div>
          <label htmlFor="prompt" className="block text-xs font-bold text-[#141F33] mb-1.5">{t({ en: 'Core System Prompt Instruction', ar: 'التعليمات الأساسية للنظام' })}</label>
          <textarea
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={6}
            className="w-full bg-slate-50 border border-gray-200 rounded-xl p-4 text-xs font-mono font-bold text-[#141F33] focus:outline-none focus:ring-1 focus:ring-[#141F33]"
            required
          />
        </div>

        <button
          type="submit"
          disabled={saving}
          className="w-full bg-[#141F33] text-white font-bold py-4 rounded-xl text-xs hover:opacity-95 transition-all min-h-[44px] flex items-center justify-center disabled:opacity-40"
        >
          {saving ? t({ en: 'Saving...', ar: 'جاري الحفظ...' }) : t({ en: 'Save System Prompt overrides', ar: 'حفظ تعديلات تعليمات النظام' })}
        </button>

      </form>

    </div>
  );
}
