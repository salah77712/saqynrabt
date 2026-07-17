'use client';

import React, { useState, useEffect } from 'react';
import { useLocale } from '../app/providers';

export function GuidedTour() {
const { locale } = useLocale();
const [isOpen, setIsOpen] = useState(false);
const [step, setStep] = useState(1);

useEffect(() => {
const completed = localStorage.getItem('saqyn_tour_completed');
if (!completed) {
  setIsOpen(true);
}
}, []);

const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';

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
  title: t({ en: '2. Upload Your Documents', ar: '2. تحميل المستندات الخاصة بك' }),
  body: t({ en: 'Drag policy manuals into the Documents zone. The system indexes text blocks so the assistant can answer correctly.', ar: 'اسحب كتيبات السياسات في قسم المستندات. يقوم النظام بفهرستها ليتمكن المساعد من الإجابة.' }),
},
{
  title: t({ en: '3. Au Consent', ar: '3. خيارات التجاوز التلقائي' }),
  body: t({ en: 'Enable the au toggle under Settings to ensure operations continue beyond monthly limits.', ar: 'قم بتفعيل خيار التجاوز في الإعدادات لضمان استمرار العمليات عند نفاد الباقة.' }),
},
];

const current = tourSteps[step - 1];

return (
<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#141F33] backdrop-blur-sm animate-fadeIn">
<div className="bg-[#F8F9FB] dark:bg-[#141F33] border border-[#141F33]/10 dark:border-[#F8F9FB]/10 rounded-xl max-w-sm w-full p-8 shadow-2xl space-y-6 relative" dir={locale === 'ar' ? 'rtl' : 'ltr'}>

<div>
<span className="text-[9px] font-extrabold uppercase tracking-widest text-[#2A5CFF]">{t({ en: 'Quick Workspace Tour', ar: 'جولة سريعة في مساحة العمل' })}</span>
<h3 className="text-lg font-extrabold text-[#141F33] dark:text-[#F8F9FB] mt-1.5">{current.title}</h3>
<p className="text-xs font-semibold text-[#141F33]/60 dark:text-[#F8F9FB]/60 mt-3 leading-relaxed">{current.body}</p>
</div>

<div className="flex justify-between items-center pt-4 border-t border-[#141F33]/10 dark:border-[#F8F9FB]/10">
<button
onClick={handleSkip}
className="text-[10px] font-bold text-[#141F33]/40 dark:text-[#F8F9FB]/40 hover:text-[#141F33] dark:hover:text-[#F8F9FB]"
>
{t({ en: 'Skip Tour', ar: 'تخطي الجولة' })}
</button>

<div className="flex items-center gap-8">
<span className="text-[10px] font-bold text-[#141F33]/50 dark:text-[#F8F9FB]/50">{step} / 3</span>
<button
onClick={handleNext}
className="bg-[#141F33] hover:opacity-95 text-[#F8F9FB] font-bold px-6 py-3 rounded-xl text-xs min-h-[44px] transition-all duration-300 hover:shadow-md hover:scale-[1.02] active:scale-95"
>
{step === 3 ? t({ en: 'Finish', ar: 'إنهاء' }) : t({ en: 'Next', ar: 'التالي' })}
</button>
</div>
</div>

</div>
</div>
);
}
