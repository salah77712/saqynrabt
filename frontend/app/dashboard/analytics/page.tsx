'use client';

import React, { useEffect, useState } from 'react';
import { useLocale } from '../../providers';
import { Card } from '@/components/shadcn/card';
import { Badge } from '../../../components/ui/Badge';
import { TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

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
<h1 className="text-2xl md:text-3xl font-extrabold text-primary dark:text-surface tracking-tight">{t({en: 'Analytics', ar: 'ÙˆØ­Ø¯Ø© ØªØ­ÙƒÙ… Ø§Ù„Ø¹Ù…Ù„ÙŠØ§Øª Ø§Ù„Ø¥Ø¯Ø§Ø±ÙŠØ©'})}</h1>
<p className="text-xs text-primary font-bold">{t({en: 'Usage stats, billing overview, and key metrics.', ar: 'Ù…Ù‚Ø§ÙŠÙŠØ³ ÙÙˆØ±ÙŠØ©ØŒ ÙÙˆØ§ØªÙŠØ± Ø§Ù„Ø¹Ù…Ù„Ø§Ø¡ Ø§Ù„Ù†Ø´Ø·ÙŠÙ† ÙˆØªØªØ¨Ø¹ Ø§Ù„Ø¥ÙŠØ±Ø§Ø¯Ø§Øª Ø§Ù„Ø³Ù†ÙˆÙŠØ©.'})}</p>
</div>
<Badge variant="success">{t({en: 'Active Nodes', ar: 'Ø§Ù„Ø¹Ù‚Ø¯ Ø§Ù„Ø·Ø±ÙÙŠØ© Ù†Ø´Ø·Ø©'})}</Badge>
</div>

<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
      <Card className="p-8 rounded-xl">
<p className="text-[10px] uppercase font-bold text-primary">{t({en: 'Monthly Recurring Revenue', ar: 'Ø§Ù„Ø¥ÙŠØ±Ø§Ø¯Ø§Øª Ø§Ù„Ø´Ù‡Ø±ÙŠØ© Ø§Ù„Ù…ØªÙƒØ±Ø±Ø©'})}</p>
<p className="text-3xl font-extrabold text-primary dark:text-surface mt-1">QAR {formatNumber(s.mrr)}</p>
<p className="text-xs text-accent font-bold mt-2"><TrendingUp className="w-3.5 h-3.5 inline text-accent" /> {s.mrr_growth}% {t({en: 'from last month', ar: 'Ø¹Ù† Ø§Ù„Ø´Ù‡Ø± Ø§Ù„Ù…Ø§Ø¶ÙŠ'})}</p>
</Card>
      <Card className="p-8 rounded-xl">
        <p className="text-[10px] uppercase font-bold text-primary">{t({en: 'Annual Run Rate', ar: 'Ù…Ø¹Ø¯Ù„ Ø§Ù„ØªØ´ØºÙŠÙ„ Ø§Ù„Ø³Ù†ÙˆÙŠ'})}</p>
<p className="text-3xl font-extrabold text-primary dark:text-surface mt-1">QAR {formatArr(s.arr)}</p>
<p className="text-xs text-accent font-bold mt-2"><TrendingUp className="w-3.5 h-3.5 inline text-accent" /> {s.arr_growth}% {t({en: 'YoY growth', ar: 'Ù†Ù…Ùˆ Ø³Ù†ÙˆÙŠ'})}</p>
</Card>
      <Card className="p-8 rounded-xl">
        <p className="text-[10px] uppercase font-bold text-primary">{t({en: 'Active Companies', ar: 'Ø§Ù„Ø´Ø±ÙƒØ§Øª Ø§Ù„Ù†Ø´Ø·Ø©'})}</p>
<p className="text-3xl font-extrabold text-primary dark:text-surface mt-1">{formatNumber(s.active_companies)}</p>
<p className="text-xs text-primary font-bold mt-2">{t({en: '0 churn cases', ar: '0 Ø­Ø§Ù„Ø§Øª Ø§Ù†Ø³Ø­Ø§Ø¨'})}</p>
</Card>
      <Card className="p-8 rounded-xl">
        <p className="text-[10px] uppercase font-bold text-primary">{t({en: 'Monthly Questions Usage', ar: 'Ø§Ø³ØªØ®Ø¯Ø§Ù… Ø§Ù„Ø£Ø³Ø¦Ù„Ø© Ø§Ù„Ø´Ù‡Ø±ÙŠ'})}</p>
<p className="text-3xl font-extrabold text-primary dark:text-surface mt-1">{formatNumber(s.questions_used)}</p>
<p className="text-xs text-accent font-bold mt-2">{t({en: `${s.usage_pct}% of total capacity`, ar: `${s.usage_pct}% Ù…Ù† Ø§Ù„Ø³Ø¹Ø© Ø§Ù„Ø¥Ø¬Ù…Ø§Ù„ÙŠØ©`})}</p>
</Card>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
<Card className="p-8 rounded-xl">
<h3 className="font-bold text-navy dark:text-surface mb-4">{t({en: 'Traffic (Last 24 Hours)', ar: 'حركة المرور وارتفاعات الذكاء الاصطناعي (آخر 24 ساعة)'})}</h3>
<ResponsiveContainer width="100%" height={256}>
<BarChart data={[
{ hour: '0h', value: 40 }, { hour: '2h', value: 65 },
{ hour: '4h', value: 30 }, { hour: '6h', value: 85 },
{ hour: '8h', value: 45 }, { hour: '10h', value: 95 },
{ hour: '12h', value: 70 }, { hour: '14h', value: 55 },
{ hour: '16h', value: 90 }, { hour: '18h', value: 100 },
{ hour: '20h', value: 35 }, { hour: '22h', value: 60 },
]}>
<CartesianGrid strokeDasharray="3 3" stroke="currentColor" opacity={0.1} />
<XAxis dataKey="hour" tick={{ fontSize: 10, fontWeight: 700 }} stroke="currentColor" opacity={0.5} />
<YAxis tick={{ fontSize: 10, fontWeight: 700 }} stroke="currentColor" opacity={0.5} />
<Tooltip
contentStyle={{ borderRadius: 12, border: '1px solid rgba(0,0,0,0.1)', fontSize: 12, fontWeight: 700 }}
/>
<Bar dataKey="value" fill="currentColor" radius={[4, 4, 0, 0]} className="text-primary dark:text-accent" />
</BarChart>
</ResponsiveContainer>
</Card>
<Card className="p-8 rounded-xl">
<h3 className="font-bold text-navy dark:text-surface mb-4">{t({en: 'Monthly Breakdown', ar: 'التوزيع الشهري'})}</h3>
<ResponsiveContainer width="100%" height={256}>
<BarChart data={[
{ month: 'Jan', mrr: 120, arr: 180 }, { month: 'Feb', mrr: 145, arr: 200 },
{ month: 'Mar', mrr: 135, arr: 190 }, { month: 'Apr', mrr: 160, arr: 220 },
{ month: 'May', mrr: 150, arr: 210 }, { month: 'Jun', mrr: 189, arr: 260 },
]}>
<CartesianGrid strokeDasharray="3 3" stroke="currentColor" opacity={0.1} />
<XAxis dataKey="month" tick={{ fontSize: 10, fontWeight: 700 }} stroke="currentColor" opacity={0.5} />
<YAxis tick={{ fontSize: 10, fontWeight: 700 }} stroke="currentColor" opacity={0.5} />
<Tooltip
contentStyle={{ borderRadius: 12, border: '1px solid rgba(0,0,0,0.1)', fontSize: 12, fontWeight: 700 }}
/>
<Bar dataKey="mrr" fill="currentColor" radius={[4, 4, 0, 0]} className="text-primary" opacity={0.7} />
<Bar dataKey="arr" fill="currentColor" radius={[4, 4, 0, 0]} className="text-accent" />
</BarChart>
</ResponsiveContainer>
</Card>
</div>
</main>
);
}