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
<div className="bg-[#F8F9FB] border border-[#141F33]/10 rounded-[40px] p-8 shadow-sm space-y-4">
<div>
<h3 className="text-xs font-extrabold text-[#141F33]/60 uppercase tracking-wider">{t({ en: 'HITL System Health', ar: 'مؤشرات المراجعة البشرية HITL' })}</h3>
<p className="text-[10px] text-[#141F33]/50 mt-1">Pending alerts requiring operator review.</p>
</div>

<div className="space-y-3">
{demoTasks.map((t, idx) => (
<div key={idx} className="flex justify-between items-center text-xs font-bold p-3 border border-[#141F33]/10 rounded-[40px] bg-[#F8F9FB]">
<span>{t.request}</span>
<span className="bg-[#F8F9FB] text-[#141F33] text-[8px] font-extrabold uppercase px-2 py-0.5 rounded-full border border-[#141F33]/10">
{t.status}
</span>
</div>
))}
</div>
</div>
);
}
