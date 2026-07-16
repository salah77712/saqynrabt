'use client';

import React, { useState } from 'react';
import { useLocale } from '../app/providers';

export function GuardrailsDashboard() {
const { locale } = useLocale();
const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';

const [activeTab, setActiveTab] = useState<'rules' | 'metrics'>('rules');

return (
<div className="bg-[#F8F9FB] border border-[#141F33]/10 rounded-xl p-8 shadow-sm space-y-6">

{/* Header Tabs */}
<div className="flex justify-between items-center border-b border-[#141F33]/10 pb-4">
<div>
<h3 className="text-sm font-extrabold text-[#141F33]">{t({ en: 'Guardrails Oversight', ar: 'مراقبة جدران الحماية' })}</h3>
<p className="text-[10px] text-[#141F33]/40 font-bold mt-0.5">{t({ en: 'Observe blocked jailbreaks and toxicity levels.', ar: 'مراقبة محاولات الاختراق ونسب الكلمات الضارة.' })}</p>
</div>

<div className="flex gap-3">
{['rules', 'metrics'].map((tab) => (
<button
key={tab}
onClick={() => setActiveTab(tab as any)}
className={`px-3 py-2 rounded-xl text-xs font-bold min-h-[44px] transition-all duration-300 hover:shadow-md hover:scale-[1.02] active:scale-95 ${
activeTab === tab ? 'bg-[#141F33] text-[#F8F9FB]' : 'bg-[#F8F9FB] text-[#141F33]/50 hover:bg-[#141F33]'
}`}
>
{tab}
</button>
))}
</div>
</div>

{activeTab === 'rules' ? (
<div className="space-y-3 text-xs font-semibold">
<div className="flex justify-between py-2 border-b border-[#141F33]/5">
<span>PII Redactor</span>
<span className="text-[#2A5CFF]">Active</span>
</div>
<div className="flex justify-between py-2 border-b border-[#141F33]/5">
<span>Prompt injection gates</span>
<span className="text-[#2A5CFF]">Active</span>
</div>
<div className="flex justify-between py-2">
<span>Toxic complete filter</span>
<span className="text-[#2A5CFF]">Active</span>
</div>
</div>
) : (
<div className="space-y-3">
<div className="p-4 bg-[#F8F9FB] rounded-xl text-center space-y-1">
<span className="text-[10px] font-extrabold uppercase text-[#141F33]/40 tracking-wider">Blocked jailbreak attempts</span>
<p className="text-xl font-extrabold text-[#141F33]">12</p>
</div>
<div className="p-4 bg-[#F8F9FB] rounded-xl text-center space-y-1">
<span className="text-[10px] font-extrabold uppercase text-[#141F33]/40 tracking-wider">Redacted PII fields</span>
<p className="text-xl font-extrabold text-[#141F33]">142</p>
</div>
</div>
)}

</div>
);
}
