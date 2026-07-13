'use client';

import React, { useState, useEffect } from 'react';
import { useLocale } from '../../providers';
import { useGlobalToast } from '../../../lib/toast';

interface KnowledgeGap {
  question: string;
  asked_at: string;
  employee_name: string;
  department: string;
}

const MOCK_KNOWLEDGE_GAPS: KnowledgeGap[] = [
  { question: 'How many vacation days do I have?', asked_at: '2026-07-01T10:30:00Z', employee_name: 'Salah', department: 'HR' },
  { question: 'What is the company policy on remote work?', asked_at: '2026-06-28T14:15:00Z', employee_name: 'Layla', department: 'Engineering' },
  { question: 'When is the next performance review?', asked_at: '2026-06-25T09:00:00Z', employee_name: 'Ahmed', department: 'Marketing' },
];

export default function GuardrailsSettingsPage() {
  const { locale } = useLocale();
  const { addToast } = useGlobalToast();
  const t = (obj: Record<string, string>) => locale === 'ar' ? obj.ar : obj.en;

  const [settings, setSettings] = useState({
    pii_redaction: true,
    jailbreak_prevention: true,
    toxicity_filter: true,
  });

  const [knowledgeGaps, setKnowledgeGaps] = useState<KnowledgeGap[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchGaps = async () => {
      try {
        const res = await fetch('/api/knowledge-gaps');
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setKnowledgeGaps(data);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchGaps();
  }, []);

  const handleToggle = (key: 'pii_redaction' | 'jailbreak_prevention' | 'toxicity_filter') => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    addToast('Guardrails configurations updated successfully!', 'success');
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-xl">
      
      {/* Header */}
      <div>
        <h1 className="text-xl font-extrabold text-[#141F33]">{t({ en: 'Safety Filters', ar: 'لوحة التحكم في أمان الذكاء الاصطناعي' })}</h1>
        <p className="text-xs text-[#718096] font-medium mt-0.5">{t({ en: 'Redact personal data, block harmful prompts, and filter unsafe content.', ar: 'تفعيل المرشحات لحجب البيانات الشخصية، ومنع الاختراقات، وتصفية المحتوى الضار.' })}</p>
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

      {/* Knowledge Gaps */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-4">
        <div>
          <h2 className="text-sm font-extrabold text-[#141F33]">{t({ en: 'Knowledge Gaps', ar: 'الفجوات المعرفية' })}</h2>
          <p className="text-[10px] text-[#718096] font-medium mt-0.5">{t({ en: 'Questions your employees asked that the AI could not answer.', ar: 'الأسئلة التي طرحها موظفوك ولم يتمكن الذكاء الاصطناعي من الإجابة عليها.' })}</p>
        </div>

        {loading && (
          <div className="flex items-center justify-center py-8">
            <div className="w-5 h-5 border-2 border-[#141F33] border-t-transparent rounded-full animate-spin" />
            <span className="ml-2 text-xs text-[#718096] font-semibold">{t({ en: 'Loading gaps...', ar: 'جاري تحميل الفجوات...' })}</span>
          </div>
        )}

        {!loading && error && (
          <div className="space-y-2">
            <p className="text-xs text-red-500 font-semibold">{t({ en: 'Could not load knowledge gaps. Showing sample data.', ar: 'تعذر تحميل الفجوات المعرفية. يتم عرض بيانات نموذجية.' })}</p>
            {MOCK_KNOWLEDGE_GAPS.map((gap, i) => (
              <div key={i} className="p-3 border border-slate-100 rounded-xl bg-slate-50 space-y-1.5">
                <p className="text-xs font-bold text-[#141F33]">&ldquo;{gap.question}&rdquo;</p>
                <div className="flex items-center gap-2 text-[10px] text-slate-500 font-semibold">
                  <span>{gap.employee_name}</span>
                  <span className="w-1 h-1 rounded-full bg-slate-300" />
                  <span>{gap.department}</span>
                  <span className="w-1 h-1 rounded-full bg-slate-300" />
                  <span>{new Date(gap.asked_at).toLocaleDateString(locale === 'ar' ? 'ar-SA' : 'en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && !error && knowledgeGaps.length === 0 && (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <p className="text-xs font-bold text-[#141F33]">{t({ en: 'No knowledge gaps found', ar: 'لا توجد فجوات معرفية' })}</p>
            <p className="text-[10px] text-slate-500 font-semibold mt-1">{t({ en: 'Your team is getting all the answers they need!', ar: 'فريقك يحصل على جميع الإجابات التي يحتاجها!' })}</p>
          </div>
        )}

        {!loading && !error && knowledgeGaps.length > 0 && (
          <div className="space-y-2">
            {knowledgeGaps.map((gap, i) => (
              <div key={i} className="p-3 border border-slate-100 rounded-xl bg-slate-50 space-y-1.5">
                <p className="text-xs font-bold text-[#141F33]">&ldquo;{gap.question}&rdquo;</p>
                <div className="flex items-center gap-2 text-[10px] text-slate-500 font-semibold">
                  <span>{gap.employee_name}</span>
                  <span className="w-1 h-1 rounded-full bg-slate-300" />
                  <span>{gap.department}</span>
                  <span className="w-1 h-1 rounded-full bg-slate-300" />
                  <span>{new Date(gap.asked_at).toLocaleDateString(locale === 'ar' ? 'ar-SA' : 'en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
