'use client';

import React, { useState, useCallback, useRef } from 'react';
import { Card } from '@/components/shadcn/card';
import { Button } from '@/components/shadcn/button';
import { X, Star } from 'lucide-react';

const STAR_VALUES = [1, 2, 3, 4, 5];

export function FeedbackWidget() {
const [isOpen, setIsOpen] = useState(false);
const [rating, setRating] = useState<number | null>(null);
const [comment, setComment] = useState('');
const [submitted, setSubmitted] = useState(false);
const starRefs = useRef<(HTMLButtonElement | null)[]>([]);

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

const handleStarKeyDown = useCallback((e: React.KeyboardEvent, currentStar: number) => {
  let nextRating = rating || 0;
  if (e.key === 'ArrowRight') {
    e.preventDefault();
    nextRating = Math.min(5, currentStar + 1);
    setRating(nextRating);
    starRefs.current[nextRating - 1]?.focus();
  } else if (e.key === 'ArrowLeft') {
    e.preventDefault();
    nextRating = Math.max(1, currentStar - 1);
    setRating(nextRating);
    starRefs.current[nextRating - 1]?.focus();
  }
}, [rating]);

return (
<div className="fixed bottom-16 md:bottom-6 end-6 z-50">
{!isOpen ? (
<button
onClick={() => setIsOpen(true)}
className="bg-primary hover:bg-primary text-surface font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-xl shadow-2xl transition-all duration-300 min-h-[44px] hover:shadow-md hover:scale-[1.02] active:scale-95"
>
Feedback
</button>
) : (
<Card className="w-[calc(100vw-24px)] max-w-xs shadow-2xl border border-primary/10 dark:border-surface/10 p-8 animate-slideUp">
<div className="flex justify-between items-center mb-4">
<h4 className="font-bold text-primary dark:text-surface text-sm">Rate Your Experience</h4>
<button onClick={() => setIsOpen(false)} className="text-primary/40 dark:text-surface/40 hover:text-primary dark:hover:text-accent min-h-[44px] min-w-[44px] flex items-center justify-center transition-colors">
<X className="w-4 h-4" />
</button>
</div>

{submitted ? (
<p className="text-xs text-accent font-bold text-center py-4">Thank you for your feedback!</p>
) : (
<div className="space-y-4">
<div className="flex justify-around" role="radiogroup" aria-label="Rating">
{STAR_VALUES.map((star) => (
<button
key={star}
ref={(el) => { starRefs.current[star - 1] = el; }}
role="radio"
aria-checked={rating === star}
aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
onClick={() => setRating(star)}
onKeyDown={(e) => handleStarKeyDown(e, star)}
        className={`transition-transform hover:scale-125 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-full ${
rating && rating >= star ? 'text-accent' : 'text-primary/20 dark:text-surface/20'
}`}>
<Star className="w-5 h-5" />
</button>
))}
</div>
<textarea
value={comment}
onChange={(e) => setComment(e.target.value)}
placeholder="Any suggestions or requests?"
className="w-full text-xs p-2.5 border border-primary/10 dark:border-surface/10 rounded-xl focus:ring-1 focus:ring-2 focus:ring-royal focus:outline-none dark:bg-primary"
rows={3}
/>
<Button variant="primary" className="w-full" onClick={handleSubmit} disabled={!rating}>
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
