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
  title: t({ en: '1. Sidebar Navigation', ar: '1. Ø§Ù„Ù‚Ø§Ø¦Ù…Ø© Ø§Ù„Ø¬Ø§Ù†Ø¨ÙŠØ© Ù„Ù„ØªÙ†Ù‚Ù„' }),
  body: t({ en: 'Access your Overview metrics, Call Automation triggers, RAG Chatbot support, and Documents catalog.', ar: 'Ø§Ù„ÙˆØµÙˆÙ„ Ø¥Ù„Ù‰ Ù…Ù‚Ø§ÙŠÙŠØ³ Ù„ÙˆØ­Ø© Ø§Ù„ØªØ­ÙƒÙ…ØŒ Ø£ØªÙ…ØªØ© Ø§Ù„Ù…ÙƒØ§Ù„Ù…Ø§ØªØŒ Ø§Ù„Ù…Ø³Ø§Ø¹Ø¯ Ø§Ù„Ø°ÙƒÙŠØŒ ÙˆØ§Ù„Ù…Ø³ØªÙ†Ø¯Ø§Øª.' }),
},
{
  title: t({ en: '2. Upload Your Documents', ar: '2. ØªØ­Ù…ÙŠÙ„ Ø§Ù„Ù…Ø³ØªÙ†Ø¯Ø§Øª Ø§Ù„Ø®Ø§ØµØ© Ø¨Ùƒ' }),
  body: t({ en: 'Drag policy manuals into the Documents zone. The system indexes text blocks so the assistant can answer correctly.', ar: 'Ø§Ø³Ø­Ø¨ ÙƒØªÙŠØ¨Ø§Øª Ø§Ù„Ø³ÙŠØ§Ø³Ø§Øª ÙÙŠ Ù‚Ø³Ù… Ø§Ù„Ù…Ø³ØªÙ†Ø¯Ø§Øª. ÙŠÙ‚ÙˆÙ… Ø§Ù„Ù†Ø¸Ø§Ù… Ø¨ÙÙ‡Ø±Ø³ØªÙ‡Ø§ Ù„ÙŠØªÙ…ÙƒÙ† Ø§Ù„Ù…Ø³Ø§Ø¹Ø¯ Ù…Ù† Ø§Ù„Ø¥Ø¬Ø§Ø¨Ø©.' }),
},
{
  title: t({ en: '3. Au Consent', ar: '3. Ø®ÙŠØ§Ø±Ø§Øª Ø§Ù„ØªØ¬Ø§ÙˆØ² Ø§Ù„ØªÙ„Ù‚Ø§Ø¦ÙŠ' }),
  body: t({ en: 'Enable the au toggle under Settings to ensure operations continue beyond monthly limits.', ar: 'Ù‚Ù… Ø¨ØªÙØ¹ÙŠÙ„ Ø®ÙŠØ§Ø± Ø§Ù„ØªØ¬Ø§ÙˆØ² ÙÙŠ Ø§Ù„Ø¥Ø¹Ø¯Ø§Ø¯Ø§Øª Ù„Ø¶Ù…Ø§Ù† Ø§Ø³ØªÙ…Ø±Ø§Ø± Ø§Ù„Ø¹Ù…Ù„ÙŠØ§Øª Ø¹Ù†Ø¯ Ù†ÙØ§Ø¯ Ø§Ù„Ø¨Ø§Ù‚Ø©.' }),
},
];

const current = tourSteps[step - 1];

return (
<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary backdrop-blur-sm animate-fadeIn">
<div className="bg-surface dark:bg-primary border border-primary/10 dark:border-surface/10 rounded-xl max-w-sm w-full p-8 shadow-2xl space-y-6 relative" dir={locale === 'ar' ? 'rtl' : 'ltr'}>

<div>
<span className="text-[10px] font-extrabold uppercase tracking-widest text-accent">{t({ en: 'Quick Workspace Tour', ar: 'Ø¬ÙˆÙ„Ø© Ø³Ø±ÙŠØ¹Ø© ÙÙŠ Ù…Ø³Ø§Ø­Ø© Ø§Ù„Ø¹Ù…Ù„' })}</span>
<h3 className="text-lg font-extrabold text-primary dark:text-surface mt-1.5">{current.title}</h3>
<p className="text-xs font-semibold text-primary/60 dark:text-surface/60 mt-3 leading-relaxed">{current.body}</p>
</div>

<div className="flex justify-between items-center pt-4 border-t border-primary/10 dark:border-surface/10">
<button
onClick={handleSkip}
className="text-[10px] font-bold text-primary/40 dark:text-surface/40 hover:text-primary dark:hover:text-surface"
>
{t({ en: 'Skip Tour', ar: 'ØªØ®Ø·ÙŠ Ø§Ù„Ø¬ÙˆÙ„Ø©' })}
</button>

<div className="flex items-center gap-8">
<span className="text-[10px] font-bold text-primary/50 dark:text-surface/50">{step} / 3</span>
<button
onClick={handleNext}
className="bg-primary hover:opacity-95 text-surface font-bold px-6 py-3 rounded-xl text-xs min-h-[44px] transition-all duration-300 hover:shadow-md hover:scale-[1.02] active:scale-95"
>
{step === 3 ? t({ en: 'Finish', ar: 'Ø¥Ù†Ù‡Ø§Ø¡' }) : t({ en: 'Next', ar: 'Ø§Ù„ØªØ§Ù„ÙŠ' })}
</button>
</div>
</div>

</div>
</div>
);
}
