'use client';

import React from 'react';
import { useLocale } from '../app/providers';

export function HITLQueue() {
  const { locale } = useLocale();
  const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';

  const demoTasks = [
    { request: 'Discount query', status: 'Pending Review' },
    { request: 'Complaint escalation', status: 'In Progress' }
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-4">
      <div>
        <h3 className="text-xs font-extrabold text-[#718096] uppercase tracking-wider">{t({ en: 'HITL System Health', ar: 'مؤشرات المراجعة البشرية HITL' })}</h3>
        <p className="text-[10px] text-slate-450 mt-1">Pending alerts requiring operator review.</p>
      </div>

      <div className="space-y-3">
        {demoTasks.map((t, idx) => (
          <div key={idx} className="flex justify-between items-center text-xs font-bold p-3 border border-slate-100 rounded-xl bg-slate-50">
            <span>{t.request}</span>
            <span className="bg-amber-100 text-amber-800 text-[8px] font-extrabold uppercase px-2 py-0.5 rounded-full">
              {t.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
