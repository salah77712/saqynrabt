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
<div className="mt-3 flex flex-col items-start gap-3 text-[10px] font-bold text-primary/40 select-none">
{!submitted ? (
<div className="flex items-center gap-3">
<span>{t({ en: 'Was this helpful?', ar: 'Ù‡Ù„ ÙƒØ§Ù†Øª Ù‡Ø°Ù‡ Ø§Ù„Ø¥Ø¬Ø§Ø¨Ø© Ù…ÙÙŠØ¯Ø©ØŸ' })}</span>
<button
onClick={() => handleRate(5)}
className="hover:text-accent transition-all duration-300 p-1 border border-primary/10 hover:border-accent rounded-xl min-h-[44px] min-w-[44px] flex items-center justify-center"
title="Good Answer"
>
{t({ en: 'Yes', ar: 'Ù†Ø¹Ù…' })}
</button>
<button
onClick={() => handleRate(1)}
className="hover:text-primary transition-all duration-300 p-1 border border-primary/10 hover:border-primary rounded-xl min-h-[44px] min-w-[44px] flex items-center justify-center"
title="Bad Answer"
>
{t({ en: 'No', ar: 'Ù„Ø§' })}
</button>
</div>
) : (
<span className="text-accent font-extrabold flex items-center gap-1">
{t({ en: 'Thank you for your feedback!', ar: 'Ù†Ø´ÙƒØ±Ùƒ Ø¹Ù„Ù‰ ØªÙ‚ÙŠÙŠÙ…Ùƒ!' })}
</span>
)}

{isOpen && (
<div className="p-3 bg-surface border border-primary/10 rounded-xl w-full max-w-xs space-y-2 mt-2">
<label className="block text-[10px] uppercase tracking-wider text-primary">{t({ en: 'Provide feedback (optional)', ar: 'Ø£Ø¶Ù ØªØ¹Ù„ÙŠÙ‚Ù‹Ø§ (Ø§Ø®ØªÙŠØ§Ø±ÙŠ)' })}</label>
<textarea
value={comment}
onChange={(e) => setComment(e.target.value)}
rows={2}
className="w-full bg-surface border border-primary/10 rounded-xl p-2 text-[10px] text-primary focus:outline-none focus:ring-1 focus:ring-2 focus:ring-royal resize-none"
placeholder={t({ en: 'E.g. Out of date policy...', ar: 'Ù…Ø«Ø§Ù„: Ø³ÙŠØ§Ø³Ø© Ù‚Ø¯ÙŠÙ…Ø©...' })}
/>
<div className="flex gap-3 justify-end">
<button
onClick={() => submitFeedback(rating || 1, comment || 'No comment provided')}
className="bg-primary text-surface px-3 py-1 rounded-xl hover:opacity-95"
>
{t({ en: 'Submit', ar: 'Ø¥Ø±Ø³Ø§Ù„' })}
</button>
<button
onClick={() => setIsOpen(false)}
className="bg-surface border border-primary/10 text-primary px-3 py-1 rounded-xl hover:bg-primary"
>
{t({ en: 'Cancel', ar: 'Ø¥Ù„ØºØ§Ø¡' })}
</button>
</div>
</div>
)}
</div>
);
}
