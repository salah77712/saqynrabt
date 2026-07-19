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
<div className="bg-surface border border-primary/10 rounded-xl p-8 shadow-sm space-y-4">
<div>
<h3 className="text-xs font-extrabold text-primary/60 uppercase tracking-wider">{t({ en: 'HITL System Health', ar: 'Ù…Ø¤Ø´Ø±Ø§Øª Ø§Ù„Ù…Ø±Ø§Ø¬Ø¹Ø© Ø§Ù„Ø¨Ø´Ø±ÙŠØ© HITL' })}</h3>
<p className="text-[10px] text-primary/50 mt-1">Pending alerts requiring operator review.</p>
</div>

<div className="space-y-3">
{demoTasks.map((t, idx) => (
<div key={idx} className="flex justify-between items-center text-xs font-bold p-3 border border-primary/10 rounded-xl bg-surface">
<span>{t.request}</span>
<span className="bg-surface text-primary text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full border border-primary/10">
{t.status}
</span>
</div>
))}
</div>
</div>
);
}
