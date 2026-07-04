'use client';

import React, { useState } from 'react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';

export function OnboardingTour() {
  const [step, setStep] = useState(1);
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  const steps = [
    { title: 'Welcome to SAQYN', body: 'The consolidated AI command center for your business operations.' },
    { title: 'Knowledge Base Catalog', body: 'Upload standard operating files to train your private RAG assistant.' },
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
      <Card className="w-80 shadow-2xl border border-gray-200">
        <span className="text-[10px] font-black uppercase text-royal">Onboarding Guide</span>
        <h4 className="font-bold text-navy dark:text-white text-sm mt-1">{current.title}</h4>
        <p className="text-xs text-slate-500 mt-2 leading-relaxed">{current.body}</p>

        <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-100">
          <button className="text-[10px] font-extrabold text-slate-400 hover:text-slate-600" onClick={() => setVisible(false)}>
            Dismiss
          </button>
          <Button variant="primary" size="sm" onClick={handleNext}>
            {step === steps.length ? 'Finish' : 'Next'}
          </Button>
        </div>
      </Card>
    </div>
  );
}
export default OnboardingTour;
