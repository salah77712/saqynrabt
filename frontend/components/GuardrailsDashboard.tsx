'use client';

import React, { useState } from 'react';
import { useLocale } from '../app/providers';

export function GuardrailsDashboard() {
const { locale } = useLocale();
const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';

const [activeTab, setActiveTab] = useState<'rules' | 'metrics'>('rules');

return (
<div className="bg-surface border border-primary/10 rounded-xl p-8 shadow-sm space-y-6">

{/* Header Tabs */}
<div className="flex justify-between items-center border-b border-primary/10 pb-4">
<div>
<h3 className="text-sm font-extrabold text-primary">{t({ en: 'Guardrails Oversight', ar: 'Ù…Ø±Ø§Ù‚Ø¨Ø© Ø¬Ø¯Ø±Ø§Ù† Ø§Ù„Ø­Ù…Ø§ÙŠØ©' })}</h3>
<p className="text-xs text-primary/40 font-bold mt-0.5">{t({ en: 'Observe blocked jailbreaks and toxicity levels.', ar: 'Ù…Ø±Ø§Ù‚Ø¨Ø© Ù…Ø­Ø§ÙˆÙ„Ø§Øª Ø§Ù„Ø§Ø®ØªØ±Ø§Ù‚ ÙˆÙ†Ø³Ø¨ Ø§Ù„ÙƒÙ„Ù…Ø§Øª Ø§Ù„Ø¶Ø§Ø±Ø©.' })}</p>
</div>

<div className="flex gap-3">
{['rules', 'metrics'].map((tab) => (
<button
key={tab}
onClick={() => setActiveTab(tab as any)}
className={`px-3 py-2 rounded-xl text-xs font-bold min-h-[44px] transition-all duration-300 hover:shadow-md hover:scale-[1.02] active:scale-95 ${
activeTab === tab ? 'bg-primary text-surface' : 'bg-surface text-primary/50 hover:bg-primary'
}`}
>
{tab}
</button>
))}
</div>
</div>

{activeTab === 'rules' ? (
<div className="space-y-3 text-xs font-semibold">
<div className="flex justify-between py-2 border-b border-primary/5">
<span>PII Redactor</span>
<span className="text-accent">Active</span>
</div>
<div className="flex justify-between py-2 border-b border-primary/5">
<span>Prompt injection gates</span>
<span className="text-accent">Active</span>
</div>
<div className="flex justify-between py-2">
<span>Toxic complete filter</span>
<span className="text-accent">Active</span>
</div>
</div>
) : (
<div className="space-y-3">
<div className="p-4 bg-surface rounded-xl text-center space-y-1">
<span className="text-xs font-extrabold uppercase text-primary/40 tracking-wider">Blocked jailbreak attempts</span>
<p className="text-xl font-extrabold text-primary">12</p>
</div>
<div className="p-4 bg-surface rounded-xl text-center space-y-1">
<span className="text-xs font-extrabold uppercase text-primary/40 tracking-wider">Redacted PII fields</span>
<p className="text-xl font-extrabold text-primary">142</p>
</div>
</div>
)}

</div>
);
}
