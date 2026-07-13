'use client';

import React, { useState } from 'react';
import { useLocale } from '../app/providers';

interface CSATWidgetProps {
  requestId: string;
  onSubmitted?: () => void;
}

export function CSATWidget({ requestId, onSubmitted }: CSATWidgetProps) {
  const { locale } = useLocale();
  const t = (en: string, ar: string) => locale === 'ar' ? (ar || en) : en;

  const [rating, setRating] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (val: number) => {
    setRating(val);
    // Simulating API POST to /api/feedback/csat
    fetch('/api/feedback/csat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ requestId, rating: val }),
    })
      .catch((e) => console.log('Bypassed api post:', e.message))
      .finally(() => {
        setSubmitted(true);
        if (onSubmitted) onSubmitted();
      });
  };

  if (submitted) {
    return (
      <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3 text-center">
        <p className="text-xs font-bold text-emerald-800">
          {t('Thanks for rating!', 'شكراً لتقييمك!')}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 border border-gray-200/80 rounded-xl p-4 text-center">
      <p className="text-xs font-bold text-navy mb-3">
        {t('How satisfied are you with this resolution?', 'ما مدى رضاك عن حل هذا الطلب؟')}
      </p>
      <div className="flex justify-center gap-1.5">
        {[1, 2, 3, 4, 5].map((val) => (
          <button
            key={val}
            onClick={() => handleSubmit(val)}
            className="text-lg hover:scale-125 transition-transform"
            title={`${val} Stars`}
          >
            <svg className="w-5 h-5 text-amber-400" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
          </button>
        ))}
      </div>
    </div>
  );
}
