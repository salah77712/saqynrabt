'use client';

import React, { useState } from 'react';
import { useLocale } from '../app/providers';

interface CSATWidgetProps {
  requestId: string;
  onSubmitted?: () => void;
}

export function CSATWidget({ requestId, onSubmitted }: CSATWidgetProps) {
  const { locale } = useLocale();
  const t = (en: string, ar: string) => (locale === 'ar' ? ar : en);

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
            ⭐
          </button>
        ))}
      </div>
    </div>
  );
}
