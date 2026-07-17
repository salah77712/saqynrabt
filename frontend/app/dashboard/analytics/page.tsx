'use client';

import React, { useEffect, useState } from 'react';
import { useLocale } from '../../providers';
import { Card } from '@/components/shadcn/card';
import { Badge } from '../../../components/ui/Badge';
import { TrendingUp } from 'lucide-react';

interface UsageStats {
mrr: number;
arr: number;
active_companies: number;
questions_used: number;
questions_limit: number;
mrr_growth: number;
arr_growth: number;
usage_pct: number;
}

const MOCK_STATS: UsageStats = {
mrr: 189450,
arr: 2270000,
active_companies: 114,
questions_used: 482900,
questions_limit: 670000,
mrr_growth: 14,
arr_growth: 18.2,
usage_pct: 72,
};

function formatNumber(n: number) {
return n.toLocaleString('en-US');
}

function formatArr(n: number) {
if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2)}M`;
if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
return n.toString();
}

export default function AnalyticsPage() {
const { locale } = useLocale();
const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';
const [stats, setStats] = useState<UsageStats | null>(null);
const [loading, setLoading] = useState(true);

useEffect(() => {
fetch('/api/usage-stats')
.then((res) => {
if (!res.ok) throw new Error('Failed to fetch');
return res.json();
})
.then((data) => setStats(data))
.catch((err) => {
console.error('Usage stats fetch failed, using fallback:', err);
setStats(MOCK_STATS);
})
.finally(() => setLoading(false));
}, []);

const s = stats ?? MOCK_STATS;

if (loading) {
return (
      <main id="main-content" className="p-8 space-y-6 animate-fadeIn">
        <div className="flex justify-center items-center h-64">
<p className="text-primary font-bold">{t({en: 'Loading metrics...', ar: 'Ø¬Ø§Ø±Ù ØªØ­Ù…ÙŠÙ„ Ø§Ù„Ù…Ù‚Ø§ÙŠÙŠØ³...'})}</p>
</div>
</main>
);
}

return (
<main id="main-content" className="p-8 space-y-6 animate-fadeIn">
<div className="flex justify-between items-center mb-6">
<div>
<h1 className="text-2xl font-black text-primary dark:text-surface">{t({en: 'Analytics', ar: 'ÙˆØ­Ø¯Ø© ØªØ­ÙƒÙ… Ø§Ù„Ø¹Ù…Ù„ÙŠØ§Øª Ø§Ù„Ø¥Ø¯Ø§Ø±ÙŠØ©'})}</h1>
<p className="text-xs text-primary font-bold">{t({en: 'Usage stats, billing overview, and key metrics.', ar: 'Ù…Ù‚Ø§ÙŠÙŠØ³ ÙÙˆØ±ÙŠØ©ØŒ ÙÙˆØ§ØªÙŠØ± Ø§Ù„Ø¹Ù…Ù„Ø§Ø¡ Ø§Ù„Ù†Ø´Ø·ÙŠÙ† ÙˆØªØªØ¨Ø¹ Ø§Ù„Ø¥ÙŠØ±Ø§Ø¯Ø§Øª Ø§Ù„Ø³Ù†ÙˆÙŠØ©.'})}</p>
</div>
<Badge variant="success">{t({en: 'Active Nodes', ar: 'Ø§Ù„Ø¹Ù‚Ø¯ Ø§Ù„Ø·Ø±ÙÙŠØ© Ù†Ø´Ø·Ø©'})}</Badge>
</div>

<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
      <Card className="p-8 rounded-xl">
<p className="text-[10px] uppercase font-bold text-primary">{t({en: 'Monthly Recurring Revenue', ar: 'Ø§Ù„Ø¥ÙŠØ±Ø§Ø¯Ø§Øª Ø§Ù„Ø´Ù‡Ø±ÙŠØ© Ø§Ù„Ù…ØªÙƒØ±Ø±Ø©'})}</p>
<p className="text-3xl font-black text-primary dark:text-surface mt-1">QAR {formatNumber(s.mrr)}</p>
<p className="text-xs text-accent font-bold mt-2"><TrendingUp className="w-3.5 h-3.5 inline text-accent" /> {s.mrr_growth}% {t({en: 'from last month', ar: 'Ø¹Ù† Ø§Ù„Ø´Ù‡Ø± Ø§Ù„Ù…Ø§Ø¶ÙŠ'})}</p>
</Card>
      <Card className="p-8 rounded-xl">
        <p className="text-[10px] uppercase font-bold text-primary">{t({en: 'Annual Run Rate', ar: 'Ù…Ø¹Ø¯Ù„ Ø§Ù„ØªØ´ØºÙŠÙ„ Ø§Ù„Ø³Ù†ÙˆÙŠ'})}</p>
<p className="text-3xl font-black text-primary dark:text-surface mt-1">QAR {formatArr(s.arr)}</p>
<p className="text-xs text-accent font-bold mt-2"><TrendingUp className="w-3.5 h-3.5 inline text-accent" /> {s.arr_growth}% {t({en: 'YoY growth', ar: 'Ù†Ù…Ùˆ Ø³Ù†ÙˆÙŠ'})}</p>
</Card>
      <Card className="p-8 rounded-xl">
        <p className="text-[10px] uppercase font-bold text-primary">{t({en: 'Active Companies', ar: 'Ø§Ù„Ø´Ø±ÙƒØ§Øª Ø§Ù„Ù†Ø´Ø·Ø©'})}</p>
<p className="text-3xl font-black text-primary dark:text-surface mt-1">{formatNumber(s.active_companies)}</p>
<p className="text-xs text-primary font-bold mt-2">{t({en: '0 churn cases', ar: '0 Ø­Ø§Ù„Ø§Øª Ø§Ù†Ø³Ø­Ø§Ø¨'})}</p>
</Card>
      <Card className="p-8 rounded-xl">
        <p className="text-[10px] uppercase font-bold text-primary">{t({en: 'Monthly Questions Usage', ar: 'Ø§Ø³ØªØ®Ø¯Ø§Ù… Ø§Ù„Ø£Ø³Ø¦Ù„Ø© Ø§Ù„Ø´Ù‡Ø±ÙŠ'})}</p>
<p className="text-3xl font-black text-primary dark:text-surface mt-1">{formatNumber(s.questions_used)}</p>
<p className="text-xs text-accent font-bold mt-2">{t({en: `${s.usage_pct}% of total capacity`, ar: `${s.usage_pct}% Ù…Ù† Ø§Ù„Ø³Ø¹Ø© Ø§Ù„Ø¥Ø¬Ù…Ø§Ù„ÙŠØ©`})}</p>
</Card>
</div>

<Card className="mt-6 p-8 rounded-xl">
<h3 className="font-bold text-navy dark:text-surface mb-4">{t({en: 'Traffic (Last 24 Hours)', ar: 'Ø­Ø±ÙƒØ© Ø§Ù„Ù…Ø±ÙˆØ± ÙˆØ§Ø±ØªÙØ§Ø¹Ø§Øª Ø§Ù„Ø°ÙƒØ§Ø¡ Ø§Ù„Ø§ØµØ·Ù†Ø§Ø¹ÙŠ (Ø¢Ø®Ø± 24 Ø³Ø§Ø¹Ø©)'})}</h3>
<div className="h-64 flex items-end justify-between gap-3 bg-surface dark:bg-primary p-4 rounded-xl border border-primary/10 dark:border-primary">
{[40, 65, 30, 85, 45, 95, 70, 55, 90, 100, 35, 60].map((h, i) => (
<div key={i} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
<div className="bg-primary dark:bg-accent w-full rounded-t-md transition-all hover:scale-[1.05]" style={{ height: `${h}%` }} />
<span className="text-[9px] font-bold text-primary">{i * 2}h</span>
</div>
))}
</div>
</Card>
</main>
);
}