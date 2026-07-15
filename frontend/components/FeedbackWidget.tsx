'use client';

import React, { useState } from 'react';
import { Card } from '@/components/shadcn/card';
import { Button } from '@/components/shadcn/button';
import { X, Star } from 'lucide-react';

export function FeedbackWidget() {
const [isOpen, setIsOpen] = useState(false);
const [rating, setRating] = useState<number | null>(null);
const [comment, setComment] = useState('');
const [submitted, setSubmitted] = useState(false);

const handleSubmit = () => {
if (!rating) return;
setSubmitted(true);
setTimeout(() => {
  setIsOpen(false);
  setSubmitted(false);
  setRating(null);
  setComment('');
}, 2000);
};

return (
<div className="fixed bottom-6 right-6 z-50">
{!isOpen ? (
<button
onClick={() => setIsOpen(true)}
className="bg-[#141F33] hover:bg-[#141F33]/90 text-[#F8F9FB] font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-2xl shadow-2xl transition-all duration-300 min-h-[44px] hover:shadow-md hover:scale-[1.02] active:scale-95"
>
Feedback
</button>
) : (
<Card className="w-80 shadow-2xl border border-[#141F33]/10 p-6 animate-slideUp">
<div className="flex justify-between items-center mb-4">
<h4 className="font-bold text-[#141F33] dark:text-[#F8F9FB] text-sm">Rate Your Experience</h4>
<button onClick={() => setIsOpen(false)} className="text-[#141F33]/40 hover:text-[#141F33] min-h-[44px] min-w-[44px] flex items-center justify-center transition-colors">
<X className="w-4 h-4" />
</button>
</div>

{submitted ? (
<p className="text-xs text-[#2A5CFF] font-bold text-center py-4">Thank you for your feedback!</p>
) : (
<div className="space-y-4">
<div className="flex justify-around">
{[1, 2, 3, 4, 5].map((star) => (
<button
key={star}
onClick={() => setRating(star)}
className={`transition-transform hover:scale-125 ${
rating && rating >= star ? 'text-[#2A5CFF]' : 'text-[#141F33]/20'
}`}>
<Star className="w-5 h-5" />
</button>
))}
</div>
<textarea
value={comment}
onChange={(e) => setComment(e.target.value)}
placeholder="Any suggestions or requests?"
className="w-full text-xs p-2.5 border border-[#141F33]/10 rounded-xl focus:ring-1 focus:ring-[#141F33] focus:outline-none dark:bg-[#141F33] dark:border-[#141F33]/30"
rows={3}
/>
<Button variant="default" className="w-full" onClick={handleSubmit} disabled={!rating}>
Submit Review
</Button>
</div>
)}
</Card>
)}
</div>
);
}

export default FeedbackWidget;
