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
          className="bg-[#141F33] hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-full shadow-2xl transition-all"
        >
          Feedback
        </button>
      ) : (
        <Card className="w-80 shadow-2xl border border-gray-200 p-6 animate-slideUp">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-bold text-navy dark:text-white text-sm">Rate Your Experience</h4>
            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-slate-600">
              <X className="w-4 h-4" />
            </button>
          </div>

          {submitted ? (
            <p className="text-xs text-emerald-500 font-bold text-center py-4">Thank you for your feedback!</p>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-around">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className={`transition-transform hover:scale-125 ${
                      rating && rating >= star ? 'text-amber-500' : 'text-slate-200'
                    }`}
                  >
                    <Star className="w-5 h-5" />
                  </button>
                ))}
              </div>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Any suggestions or requests?"
                className="w-full text-xs p-2.5 border border-gray-200 rounded-xl focus:ring-1 focus:ring-navy focus:outline-none dark:bg-slate-800 dark:border-slate-700"
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
