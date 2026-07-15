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
        <h1 className="text-xl font-extrabold text-[#141F33]">{t({ en: 'Review Queue', ar: 'طابور المراجعة البشرية HITL' })}</h1>
        <p className="text-xs text-[#141F33] font-medium mt-0.5">{t({ en: 'Check and override AI responses that need a human touch.', ar: 'مراجعة مخرجات المساعد الذكي منخفضة الثقة وتعديلها يدويًا.' })}</p>
      </div>

      {/* Queue list */}
      <div className="bg-[#F8F9FB] border border-[#141F33]/10 rounded-2xl p-6 shadow-sm">
        <h3 className="text-xs font-extrabold text-[#141F33] uppercase tracking-wider mb-4">{t({ en: 'Pending Review Tasks', ar: 'مهام المراجعة المعلقة' })}</h3>

        {tasks.length === 0 ? (
          <p className="text-xs text-[#141F33] font-semibold text-center py-6">Nothing needs review right now.</p>
        ) : (
          <div className="divide-[#141F33]/10">
            {tasks.map((task) => (
              <div key={task.id} className="py-4 first:pt-0 last:pb-0 flex justify-between items-center gap-4">
                <div className="min-w-0 space-y-1">
                  <p className="text-xs font-extrabold text-[#141F33]">"{task.request}"</p>
                  <p className="text-[10px] text-[#141F33] font-semibold leading-normal">{task.context}</p>
                  <span className={`inline-block text-[8px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                    task.status === 'claimed' ? 'bg-[#141F33] text-[#F8F9FB]' : 'bg-[#2A5CFF] text-[#F8F9FB]'
                  }`}>
                    {task.status}
                  </span>
                </div>

                <div className="flex gap-2 shrink-0">
                  {task.status === 'pending' ? (
                    <button
                      onClick={() => handleClaim(task.id)}
                      className="px-6 py-3 rounded-xl text-xs font-bold min-h-[44px] transition-all duration-300 hover:shadow-md hover:scale-[1.02] active:scale-95 bg-[#141F33] text-[#F8F9FB]"
                    >
                      Claim
                    </button>
                  ) : (
                    <button
                      onClick={() => handleResolve(task.id)}
                      className="px-6 py-3 rounded-xl text-xs font-bold min-h-[44px] transition-all duration-300 hover:shadow-md hover:scale-[1.02] active:scale-95 bg-[#2A5CFF] text-[#F8F9FB]"
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