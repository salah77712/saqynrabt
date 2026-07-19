'use client';

import React from 'react';
import { useLocale } from '../../providers';
import { Card } from '@/components/shadcn/card';
import { Badge } from '../../../components/ui/Badge';

export default function AIGovernancePage() {
const { locale } = useLocale();
const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';

return (
<main id="main-content" className="p-8 space-y-6 animate-fadeIn">
<div className="flex justify-between items-center mb-6">
<div>
<h1 className="text-2xl md:text-3xl font-extrabold text-primary dark:text-surface tracking-tight">{t({en: 'Model Oversight', ar: 'Ø­ÙˆÙƒÙ…Ø© Ø§Ù„Ø°ÙƒØ§Ø¡ Ø§Ù„Ø§ØµØ·Ù†Ø§Ø¹ÙŠ ÙˆØ§Ù„Ø´ÙØ§ÙÙŠØ©'})}</h1>
<p className="text-xs text-primary font-bold">{t({en: 'Track model performance, audit decisions, and check for bias.', ar: 'ØªØªØ¨Ø¹ ØªÙˆØ§ÙÙ‚ Ø§Ù„Ø§Ù…ØªØ«Ø§Ù„ ÙˆØªØ¯Ù‚ÙŠÙ‚ Ø§Ù„Ù†Ù…Ø§Ø°Ø¬ ÙˆÙ…Ù‚Ø§ÙŠÙŠØ³ Ø¹Ø¯Ø§Ù„Ø© Ø§Ù„Ø£Ù†Ø§Ø¨ÙŠØ¨.'})}</p>
</div>
<Badge variant="success">{t({en: 'ISO 42001 Standard', ar: 'Ù…Ø¹ÙŠØ§Ø± ISO 42001'})}</Badge>
</div>

<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
<Card className="p-8">
<h3 className="font-bold text-navy dark:text-surface text-sm mb-2">{t({en: 'Model Inventory', ar: 'Ø¬Ø±Ø¯ Ø§Ù„Ù†Ù…Ø§Ø°Ø¬'})}</h3>
<ul className="space-y-2 text-xs">
<li className="flex justify-between border-b border-primary/10 pb-1">
<span className="text-primary">{t({en: 'RAG Prompt Model', ar: 'Ù†Ù…ÙˆØ°Ø¬ Ø§Ø³ØªØ¹Ù„Ø§Ù… RAG'})}</span>
<span className="font-bold">gpt-4o-mini v1.2</span>
</li>
<li className="flex justify-between border-b border-primary/10 pb-1">
<span className="text-primary">{t({en: 'Vector Embeddings', ar: 'Ø§Ù„ØªØ¶Ù…ÙŠÙ†Ø§Øª Ø§Ù„Ù…ØªØ¬Ù‡Ø©'})}</span>
<span className="font-bold">text-embedding-3-small</span>
</li>
<li className="flex justify-between">
<span className="text-primary">{t({en: 'Last Fine-Tuning', ar: 'Ø¢Ø®Ø± Ø¶Ø¨Ø· Ø¯Ù‚ÙŠÙ‚'})}</span>
<span className="font-bold">2026-07-01</span>
</li>
</ul>
</Card>

<Card className="p-8">
<h3 className="font-bold text-navy dark:text-surface text-sm mb-2">{t({en: 'Decisions Audit', ar: 'ØªØ¯Ù‚ÙŠÙ‚ Ø§Ù„Ù‚Ø±Ø§Ø±Ø§Øª'})}</h3>
<ul className="space-y-2 text-xs">
<li className="flex justify-between border-b border-primary/10 pb-1">
<span className="text-primary">{t({en: 'Decisions Logged (90d)', ar: 'Ø§Ù„Ù‚Ø±Ø§Ø±Ø§Øª Ø§Ù„Ù…Ø³Ø¬Ù„Ø© (90 ÙŠÙˆÙ…)'})}</span>
<span className="font-bold">12,400</span>
</li>
<li className="flex justify-between border-b border-primary/10 pb-1">
<span className="text-primary">{t({en: 'Safety Policy Matches', ar: 'Ù…Ø·Ø§Ø¨Ù‚Ø§Øª Ø³ÙŠØ§Ø³Ø© Ø§Ù„Ø³Ù„Ø§Ù…Ø©'})}</span>
<span className="font-bold text-accent">{t({en: 'All Passed', ar: 'Ø¬Ù…ÙŠØ¹Ù‡Ø§ Ù†Ø§Ø¬Ø­Ø©'})}</span>
</li>
<li className="flex justify-between">
<span className="text-primary">{t({en: 'Average Confidence', ar: 'Ù…ØªÙˆØ³Ø· Ø§Ù„Ø«Ù‚Ø©'})}</span>
<span className="font-bold">0.96 / 1.0</span>
</li>
</ul>
</Card>

<Card className="p-8">
<h3 className="font-bold text-navy dark:text-surface text-sm mb-2">{t({en: 'Bias Evaluation', ar: 'ØªÙ‚ÙŠÙŠÙ… Ø§Ù„ØªØ­ÙŠØ²'})}</h3>
<ul className="space-y-2 text-xs">
<li className="flex justify-between border-b border-primary/10 pb-1">
<span className="text-primary">{t({en: 'Fairness Score', ar: 'ØªØµÙ†ÙŠÙ Ø§Ù„Ø¹Ø¯Ø§Ù„Ø©'})}</span>
<span className="font-bold text-accent">99.8%</span>
</li>
<li className="flex justify-between border-b border-primary/10 pb-1">
<span className="text-primary">{t({en: 'Gender Balance', ar: 'Ø§Ù„ØªÙƒØ§ÙØ¤ Ø¨ÙŠÙ† Ø§Ù„Ø¬Ù†Ø³ÙŠÙ†'})}</span>
<span className="font-bold">{t({en: 'Neutral', ar: '1.0 (Ù…Ø­Ø§ÙŠØ¯)'})}</span>
</li>
<li className="flex justify-between">
<span className="text-primary">{t({en: 'Age Balance', ar: 'Ø«Ø¨Ø§Øª Ø§Ù„Ø¹Ù…Ø±'})}</span>
<span className="font-bold">{t({en: 'Neutral', ar: '1.0 (Ù…Ø­Ø§ÙŠØ¯)'})}</span>
</li>
</ul>
</Card>
</div>
</main>
);
}