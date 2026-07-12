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
  const t = (obj: Record<string, string>) => locale === 'ar' ? obj.ar : obj.en;

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
        <p className="text-xs text-[#718096] font-medium mt-0.5">{t({ en: 'Check and override AI responses that need a human touch.', ar: 'مراجعة مخرجات المساعد الذكي منخفضة الثقة وتعديلها يدويًا.' })}</p>
      </div>

      {/* Queue list */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <h3 className="text-xs font-extrabold text-[#718096] uppercase tracking-wider mb-4">{t({ en: 'Pending Review Tasks', ar: 'مهام المراجعة المعلقة' })}</h3>

        {tasks.length === 0 ? (
          <p className="text-xs text-slate-400 font-semibold text-center py-6">Nothing needs review right now.</p>
        ) : (
          <div className="divide-y divide-gray-100">
            {tasks.map((task) => (
              <div key={task.id} className="py-4 first:pt-0 last:pb-0 flex justify-between items-center gap-4">
                <div className="min-w-0 space-y-1">
                  <p className="text-xs font-extrabold text-[#141F33]">"{task.request}"</p>
                  <p className="text-[10px] text-slate-500 font-semibold leading-normal">{task.context}</p>
                  <span className={`inline-block text-[8px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                    task.status === 'pending' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {task.status}
                  </span>
                </div>
                
                <div className="flex gap-2 shrink-0">
                  {task.status === 'pending' ? (
                    <button
                      onClick={() => handleClaim(task.id)}
                      className="bg-[#141F33] text-white font-bold px-3 py-1.5 rounded-lg text-xs"
                    >
                      Claim
                    </button>
                  ) : (
                    <button
                      onClick={() => handleResolve(task.id)}
                      className="bg-emerald-600 text-white font-bold px-3 py-1.5 rounded-lg text-xs"
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
