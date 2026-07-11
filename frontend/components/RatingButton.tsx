'use client';

import React, { useState } from 'react';
import { useLocale } from '../app/providers';

interface RatingButtonProps {
  chatMessageId: string;
}

export function RatingButton({ chatMessageId }: RatingButtonProps) {
  const { locale } = useLocale();
  const t = (obj: Record<string, string>) => locale === 'ar' ? obj.ar : obj.en;

  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleRate = (value: number) => {
    setRating(value);
    if (value === 5) {
      // Good rating sends directly
      submitFeedback(value, 'Good answer rating');
    } else {
      // Bad rating opens detail dialog comment box
      setIsOpen(true);
    }
  };

  const submitFeedback = (val: number, msg: string) => {
    setSubmitted(true);
    setIsOpen(false);

    fetch('/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_message_id: chatMessageId,
        rating: val,
        comment: msg,
      }),
    })
      .then(res => res.json())
      .catch(err => console.error('Feedback submit failed:', err));
  };

  return (
    <div className="mt-3 flex flex-col items-start gap-2 text-[10px] font-bold text-slate-400 select-none">
      {!submitted ? (
        <div className="flex items-center gap-2">
          <span>{t({ en: 'Was this helpful?', ar: 'هل كانت هذه الإجابة مفيدة؟' })}</span>
          <button
            onClick={() => handleRate(5)}
            className="hover:text-green-600 transition-colors p-1 border border-slate-200 hover:border-green-200 rounded"
            title="Good Answer"
          >
            {t({ en: 'Yes', ar: 'نعم' })}
          </button>
          <button
            onClick={() => handleRate(1)}
            className="hover:text-red-600 transition-colors p-1 border border-slate-200 hover:border-red-200 rounded"
            title="Bad Answer"
          >
            {t({ en: 'No', ar: 'لا' })}
          </button>
        </div>
      ) : (
        <span className="text-emerald-600 font-extrabold flex items-center gap-1">
          {t({ en: 'Thank you for your feedback!', ar: 'نشكرك على تقييمك!' })}
        </span>
      )}

      {isOpen && (
        <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl w-full max-w-xs space-y-2 mt-2">
          <label className="block text-[9px] uppercase tracking-wider text-slate-500">{t({ en: 'Provide feedback (optional)', ar: 'أضف تعليقًا (اختياري)' })}</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={2}
            className="w-full bg-white border border-slate-200 rounded-lg p-2 text-[10px] text-[#141F33] focus:outline-none focus:ring-1 focus:ring-[#141F33] resize-none"
            placeholder={t({ en: 'E.g. Out of date policy...', ar: 'مثال: سياسة قديمة...' })}
          />
          <div className="flex gap-2 justify-end">
            <button
              onClick={() => submitFeedback(rating || 1, comment || 'No comment provided')}
              className="bg-[#141F33] text-white px-3 py-1 rounded-lg hover:opacity-95"
            >
              {t({ en: 'Submit', ar: 'إرسال' })}
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="bg-white border border-slate-200 text-[#141F33] px-3 py-1 rounded-lg hover:bg-slate-50"
            >
              {t({ en: 'Cancel', ar: 'إلغاء' })}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
