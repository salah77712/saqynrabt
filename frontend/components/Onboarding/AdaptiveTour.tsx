'use client';

import React, { useState } from 'react';
import { useLocale } from '../../app/providers';

export function AdaptiveTour() {
  const { locale } = useLocale();
  const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';

  const [steps, setSteps] = useState([
    { id: '1', label: t({ en: 'Configure system prompt templates', ar: 'تهيئة قوالب نصوص النظام' }), checked: true },
    { id: '2', label: t({ en: 'Upload policy files to Documents hub', ar: 'تحميل ملفات السياسات إلى مركز المستندات' }), checked: false },
    { id: '3', label: t({ en: 'Simulate API Call automation queue', ar: 'اختبار طابور أتمتة المكالمات' }), checked: false },
  ]);

  const handleToggle = (id: string) => {
    setSteps(prev =>
      prev.map(s => s.id === id ? { ...s, checked: !s.checked } : s)
    );
  };

  const completedCount = steps.filter(s => s.checked).length;
  const progressPct = Math.round((completedCount / steps.length) * 100);

  return (
    <div className="bg-[#F8F9FB] border border-[#141F33]/10 rounded-[40px] p-8 shadow-sm space-y-4">
      
      <div>
        <h3 className="text-xs font-extrabold text-[#141F33] uppercase tracking-wider">{t({ en: 'Onboarding Checklist Progress', ar: 'تقدم قائمة متطلبات التهيئة' })}</h3>
        
        {/* Progress Bar */}
        <div className="flex items-center gap-4 mt-2">
          <div className="flex-1 bg-[#F8F9FB] rounded-full h-2 overflow-hidden">
            <div className="bg-[#141F33] h-full transition-all duration-500" style={{ width: `${progressPct}%` }} />
          </div>
          <span className="text-[10px] font-extrabold text-[#141F33]">{progressPct}%</span>
        </div>
      </div>

      <div className="space-y-2 text-xs font-semibold">
        {steps.map((step) => (
          <label key={step.id} className="flex items-center gap-4 cursor-pointer p-2.5 hover:bg-[#141F33] rounded-[40px] transition-colors">
            <input
              type="checkbox"
              checked={step.checked}
              onChange={() => handleToggle(step.id)}
              className="h-4 w-4 rounded border-[#141F33]/30 text-[#141F33] focus:ring-2 focus:ring-royal"
            />
            <span className={step.checked ? 'line-through  font-medium' : 'text-[#141F33]'}>
              {step.label}
            </span>
          </label>
        ))}
      </div>

    </div>
  );
}
