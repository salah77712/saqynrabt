'use client';

import React, { useState } from 'react';
import { Card } from '@/components/shadcn/card';
import { Button } from '@/components/shadcn/button';

export function OnboardingTour() {
const [step, setStep] = useState(1);
const [visible, setVisible] = useState(true);

if (!visible) return null;

const steps = [
{ title: 'Welcome to SAQYN', body: 'Your AI operations hub — all in one place.' },
{ title: 'Knowledge Base Catalog', body: 'Upload your documents so your AI can answer team questions.' },
{ title: 'Client Identity Sync', body: 'Configure enterprise single sign-on properties under Settings.' },
];

const current = steps[step - 1];

const handleNext = () => {
if (step < steps.length) {
  setStep((p) => p + 1);
} else {
  setVisible(false);
}
};

return (
<div className="fixed bottom-6 left-6 z-50 animate-slideUp">
<Card className="w-80 shadow-2xl border border-[#141F33]/10">
<span className="text-[10px] font-black uppercase text-[#2A5CFF]">Onboarding Guide</span>
<h4 className="font-bold text-[#141F33] dark:text-[#F8F9FB] text-sm mt-1">{current.title}</h4>
<p className="text-xs text-[#141F33]/60 mt-3 leading-relaxed">{current.body}</p>

<div className="flex justify-between items-center mt-4 pt-3 border-t border-[#141F33]/10">
<button className="text-[10px] font-bold text-[#141F33]/40 hover:text-[#141F33] min-h-[44px] transition-all duration-300 hover:shadow-md hover:scale-[1.02] active:scale-95" onClick={() => setVisible(false)}>
Dismiss
</button>
<Button variant="default" size="sm" onClick={handleNext}>
{step === steps.length ? 'Finish' : 'Next'}
</Button>
</div>
</Card>
</div>
);
}
export default OnboardingTour;
