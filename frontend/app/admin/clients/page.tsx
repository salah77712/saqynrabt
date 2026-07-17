'use client';

import React, { useState } from 'react';
import { useLocale } from '../../providers';

interface ClientItem {
id: string;
name: string;
plan: string;
status: 'active' | 'suspended';
healthScore: number;
}

export default function AdminClientsPage() {
const { locale } = useLocale();
const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';

const [clients, setClients] = useState<ClientItem[]>([
{ id: 'c-1', name: 'Al-Safa Hospitality', plan: 'Enterprise Plus', status: 'active', healthScore: 94 },
{ id: 'c-2', name: 'Al-Rayyan Clinical Clinic', plan: 'Growth Plan', status: 'active', healthScore: 78 },
]);

const handleToggleStatus = (id: string) => {
setClients(prev => prev.map(c => {
if (c.id === id) {
const nextStatus = c.status === 'active' ? 'suspended' : 'active';
return { ...c, status: nextStatus };
}
return c;
}));
};

return (
<div className="space-y-6 animate-fadeIn">
{/* Header */}
<div className="mb-6">
<h1 className="text-xl font-extrabold text-primary">{t({ en: 'Global Client Accounts', ar: 'Ø­Ø³Ø§Ø¨Ø§Øª Ø§Ù„Ø¹Ù…Ù„Ø§Ø¡ Ø§Ù„Ø´Ø§Ù…Ù„Ø©' })}</h1>
<p className="text-xs text-primary font-medium mt-0.5">{t({ en: 'SAQYN staff administrative panel. Suspend/enable tenant access.', ar: 'Ù„ÙˆØ­Ø© Ø¥Ø¯Ø§Ø±Ø© Ù…ÙˆØ¸ÙÙŠ SAQYN. Ø¥ÙŠÙ‚Ø§Ù ÙˆØªÙØ¹ÙŠÙ„ ØµÙ„Ø§Ø­ÙŠØ§Øª ÙˆØµÙˆÙ„ Ø§Ù„Ø¹Ù…Ù„Ø§Ø¡.' })}</p>
</div>

{/* Clients list */}
<div className="bg-surface border border-primary/10 rounded-xl shadow-sm overflow-hidden">
<div className="p-8 divide-y divide-[#141F33]/10">
{clients.map((c) => (
<div key={c.id} className="py-4 flex justify-between items-center gap-8 first:pt-0 last:pb-0">
<div>
<p className="text-xs font-extrabold text-primary">{c.name}</p>
<div className="flex gap-3 items-center mt-1">
<span className="text-[10px] text-primary font-bold">{c.plan}</span>
<span className="text-[10px] text-accent font-bold">CHS: {c.healthScore}%</span>
</div>
</div>

<div className="flex items-center gap-4">
<span className={`text-[8px] font-extrabold uppercase px-2 py-0.5 rounded-full ${c.status === 'active' ? 'bg-surface text-accent' : 'bg-surface text-primary'}`}>
{c.status}
</span>

<button
onClick={() => handleToggleStatus(c.id)}
className={`px-6 py-3 rounded-xl text-xs font-bold min-h-[44px] transition-all duration-300 hover:shadow-md hover:scale-[1.02] active:scale-95 ${c.status === 'active' ? 'bg-surface text-primary border border-primary/10 hover:bg-primary' : 'bg-accent text-surface hover:bg-accent/90'}`}
>
{c.status === 'active' ? 'Suspend' : 'Activate'}
</button>
</div>
</div>
))}
</div>
</div>
</div>
);
}
