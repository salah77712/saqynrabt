'use client';

import React, { useState } from 'react';
import { useLocale } from '../../providers';

interface HitlTask {
  id: string;
  request: string;
  context: string;
  status: 'pending' | 'claimed' | 'resolved';
}

export default function HitlQueuePage() {
  const { locale } = useLocale();
  const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';

  const [tasks, setTasks] = useState<HitlTask[]>([
    { id: 't-1', request: 'Can I get a discount for my 10-day booking?', context: 'AI suggested 5% off, but confidence score is 0.52', status: 'pending' },
    { id: 't-2', request: 'I want to speak with a physician.', context: 'AI flagged medical request - confidence score 0.40', status: 'pending' },
  ]);

  const handleClaim = (id: string) => {
    setTasks(prev =>
      prev.map(t => t.id === id ? { ...t, status: 'claimed' } : t)
    );
  };

  const handleResolve = (id: string) => {
    setTasks(prev =>
      prev.map(t => t.id === id ? { ...t, status: 'resolved' } : t)
    );
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-xl">

      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-primary dark:text-surface tracking-tight">{t({ en: 'Review Queue', ar: 'Ø·Ø§Ø¨ÙˆØ± Ø§Ù„Ù…Ø±Ø§Ø¬Ø¹Ø© Ø§Ù„Ø¨Ø´Ø±ÙŠØ© HITL' })}</h1>
        <p className="text-xs text-primary font-medium mt-0.5">{t({ en: 'Check and override AI responses that need a human touch.', ar: 'Ù…Ø±Ø§Ø¬Ø¹Ø© Ù…Ø®Ø±Ø¬Ø§Øª Ø§Ù„Ù…Ø³Ø§Ø¹Ø¯ Ø§Ù„Ø°ÙƒÙŠ Ù…Ù†Ø®ÙØ¶Ø© Ø§Ù„Ø«Ù‚Ø© ÙˆØªØ¹Ø¯ÙŠÙ„Ù‡Ø§ ÙŠØ¯ÙˆÙŠÙ‹Ø§.' })}</p>
      </div>

      {/* Queue list */}
      <div className="bg-surface border border-primary/10 rounded-xl p-8 shadow-sm">
        <h3 className="text-lg font-extrabold text-primary mb-4">{t({ en: 'Pending Review Tasks', ar: 'Ù…Ù‡Ø§Ù… Ø§Ù„Ù…Ø±Ø§Ø¬Ø¹Ø© Ø§Ù„Ù…Ø¹Ù„Ù‚Ø©' })}</h3>

        {tasks.length === 0 ? (
          <p className="text-xs text-primary font-semibold text-center py-6">Nothing needs review right now.</p>
        ) : (
          <div className="divide-[#141F33]/10">
            {tasks.map((task) => (
              <div key={task.id} className="py-4 first:pt-0 last:pb-0 flex justify-between items-center gap-8">
                <div className="min-w-0 space-y-1">
                  <p className="text-xs font-extrabold text-primary">"{task.request}"</p>
                  <p className="text-[10px] text-primary font-semibold leading-normal">{task.context}</p>
                  <span className={`inline-block text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                    task.status === 'claimed' ? 'bg-primary text-surface' : 'bg-accent text-surface'
                  }`}>
                    {task.status}
                  </span>
                </div>

                <div className="flex gap-3 shrink-0">
                  {task.status === 'pending' ? (
                    <button
                      onClick={() => handleClaim(task.id)}
                      className="px-6 py-3 rounded-xl text-xs font-bold min-h-[44px] transition-all duration-300 hover:shadow-md hover:scale-[1.02] active:scale-95 bg-primary text-surface"
                    >
                      Claim
                    </button>
                  ) : (
                    <button
                      onClick={() => handleResolve(task.id)}
                      className="px-6 py-3 rounded-xl text-xs font-bold min-h-[44px] transition-all duration-300 hover:shadow-md hover:scale-[1.02] active:scale-95 bg-accent text-surface"
                    >
                      Resolve
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}