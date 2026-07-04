'use client';

import React, { useState, useEffect } from 'react';
import { useLocale } from '../app/providers';

export function GuidedTour() {
  const { locale } = useLocale();
  const t = (obj: Record<string, string>) => locale === 'ar' ? obj.ar : obj.en;

  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);

  useEffect(() => {
    // Check local storage so it triggers only on first signup onboarding
    const completed = localStorage.getItem('saqyn_tour_completed');
    if (!completed) {
      setIsOpen(true);
    }
  }, []);

  const handleNext = () => {
    if (step < 3) {
      setStep(prev => prev + 1);
    } else {
      localStorage.setItem('saqyn_tour_completed', 'true');
      setIsOpen(false);
    }
  };

  const handleSkip = () => {
    localStorage.setItem('saqyn_tour_completed', 'true');
    setIsOpen(false);
  };

  if (!isOpen) return null;

  const tourSteps = [
    {
      title: t({ en: '1. Sidebar Navigation', ar: '1. القائمة الجانبية للتنقل' }),
      body: t({ en: 'Access your Overview metrics, Call Automation triggers, RAG Chatbot support, and Documents catalog.', ar: 'الوصول إلى مقاييس لوحة التحكم، أتمتة المكالمات، المساعد الذكي، والمستندات.' }),
    },
    {
      title: t({ en: '2. Upload Documents to Pinecone', ar: '2. تحميل المستندات لـ Pinecone' }),
      body: t({ en: 'Drag policy manuals into the Documents zone. The system indexes text blocks so the assistant can answer correctly.', ar: 'اسحب كتيبات السياسات في قسم المستندات. يقوم النظام بفهرستها ليتمكن المساعد من الإجابة.' }),
    },
    {
      title: t({ en: '3. Auto-Overage Consent', ar: '3. خيارات التجاوز التلقائي' }),
      body: t({ en: 'Enable the auto-overage toggle under Settings to ensure operations continue beyond monthly limits.', ar: 'قم بتفعيل خيار التجاوز في الإعدادات لضمان استمرار العمليات عند نفاد الباقة.' }),
    },
  ];

  const current = tourSteps[step - 1];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white border border-gray-200 rounded-2xl max-w-sm w-full p-8 shadow-2xl space-y-6 relative" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
        
        <div>
          <span className="text-[9px] font-extrabold uppercase tracking-widest text-[#2A5CFF]">{t({ en: 'Quick Workspace Tour', ar: 'جولة سريعة في مساحة العمل' })}</span>
          <h3 className="text-lg font-extrabold text-[#141F33] mt-1.5">{current.title}</h3>
          <p className="text-xs font-semibold text-[#718096] mt-3 leading-relaxed">{current.body}</p>
        </div>

        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
          <button
            onClick={handleSkip}
            className="text-[10px] font-bold text-slate-400 hover:text-slate-600"
          >
            {t({ en: 'Skip Tour', ar: 'تخطي الجولة' })}
          </button>
          
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-bold text-slate-400">{step} / 3</span>
            <button
              onClick={handleNext}
              className="bg-[#141F33] hover:opacity-95 text-white font-bold px-5 py-2.5 rounded-xl text-xs"
            >
              {step === 3 ? t({ en: 'Finish', ar: 'إنهاء' }) : t({ en: 'Next', ar: 'التالي' })}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
