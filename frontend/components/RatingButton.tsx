'use client';

import React, { useState } from 'react';
import { useLocale } from '../app/providers';

interface RatingButtonProps {
chatMessageId: string;
}

export function RatingButton({ chatMessageId }: RatingButtonProps) {
const { locale } = useLocale();
const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';

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
<div className="mt-3 flex flex-col items-start gap-3 text-[10px] font-bold text-[#141F33]/40 select-none">
{!submitted ? (
<div className="flex items-center gap-3">
<span>{t({ en: 'Was this helpful?', ar: 'هل كانت هذه الإجابة مفيدة؟' })}</span>
<button
onClick={() => handleRate(5)}
className="hover:text-[#2A5CFF] transition-all duration-300 p-1 border border-[#141F33]/10 hover:border-[#2A5CFF] rounded-xl min-h-[44px] min-w-[44px] flex items-center justify-center"
title="Good Answer"
>
{t({ en: 'Yes', ar: 'نعم' })}
</button>
<button
onClick={() => handleRate(1)}
className="hover:text-[#141F33] transition-all duration-300 p-1 border border-[#141F33]/10 hover:border-[#141F33] rounded-xl min-h-[44px] min-w-[44px] flex items-center justify-center"
title="Bad Answer"
>
{t({ en: 'No', ar: 'لا' })}
</button>
</div>
) : (
<span className="text-[#2A5CFF] font-extrabold flex items-center gap-1">
{t({ en: 'Thank you for your feedback!', ar: 'نشكرك على تقييمك!' })}
</span>
)}

{isOpen && (
<div className="p-3 bg-[#F8F9FB] border border-[#141F33]/10 rounded-xl w-full max-w-xs space-y-2 mt-2">
<label className="block text-[9px] uppercase tracking-wider text-[#141F33]">{t({ en: 'Provide feedback (optional)', ar: 'أضف تعليقًا (اختياري)' })}</label>
<textarea
value={comment}
onChange={(e) => setComment(e.target.value)}
rows={2}
className="w-full bg-[#F8F9FB] border border-[#141F33]/10 rounded-xl p-2 text-[10px] text-[#141F33] focus:outline-none focus:ring-1 focus:ring-2 focus:ring-royal resize-none"
placeholder={t({ en: 'E.g. Out of date policy...', ar: 'مثال: سياسة قديمة...' })}
/>
<div className="flex gap-3 justify-end">
<button
onClick={() => submitFeedback(rating || 1, comment || 'No comment provided')}
className="bg-[#141F33] text-[#F8F9FB] px-3 py-1 rounded-xl hover:opacity-95"
>
{t({ en: 'Submit', ar: 'إرسال' })}
</button>
<button
onClick={() => setIsOpen(false)}
className="bg-[#F8F9FB] border border-[#141F33]/10 text-[#141F33] px-3 py-1 rounded-xl hover:bg-[#141F33]"
>
{t({ en: 'Cancel', ar: 'إلغاء' })}
</button>
</div>
</div>
)}
</div>
);
}
