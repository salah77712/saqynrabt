'use client';

import React, { useEffect, useState } from 'react';
import { useLocale } from '../../providers';
import { Card } from '@/components/shadcn/card';
import { Badge } from '../../../components/ui/Badge';
import { TrendingUp } from 'lucide-react';
import { EmptyState } from '../../../components/ui/EmptyState';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';interface UsageStats {
  mrr: number;
  arr: number;
  active_companies: number;
  questions_used: number;
  questions_limit: number;
  mrr_growth: number;
  arr_growth: number;
  usage_pct: number;
}

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
const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';const [stats, setStats] = useState<UsageStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<number | null>(null);

  const fetchStats = () => {
    setFetchError(false);
    fetch('/api/usage-stats')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then((data) => {
        setStats(data);
        setLastUpdated(Date.now());
      })
      .catch(() => {
        setFetchError(true);
        setLastUpdated(Date.now());
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 60000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <main id="main-content" className="p-8 space-y-6 animate-fadeIn">
        <div className="flex justify-center items-center h-64">
<p className="text-xs text-primary font-bold">{t({en: 'Loading metrics...', ar: 'جاري تحميل المقاييس...'})}</p>
</div>
</main>
);
  }

  if (fetchError || !stats) {
    return (
      <main id="main-content" className="p-8 space-y-6 animate-fadeIn">
        <EmptyState
          title={t({en: 'Could not load analytics', ar: 'تعذر تحميل التحليلات'})}
          description={t({en: 'Backend analytics service may be unavailable. Click retry.', ar: 'قد تكون خدمة تحليلات الخلفية غير متوفرة. انقر لإعادة المحاولة.'})}
          retry={fetchStats}
        />
      </main>
    );
  }

  const s = stats;

return (
<main id="main-content" className="p-8 space-y-6 animate-fadeIn">
<div className="flex justify-between items-center mb-6">
<div>
<h1 className="text-2xl md:text-3xl font-extrabold text-primary dark:text-surface tracking-tight">{t({en: 'Analytics', ar: 'وحة تحليلات الأداء'})}</h1>
<p className="text-xs text-primary font-bold">{t({en: 'Usage stats, billing overview, and key metrics.', ar: 'مقاييس الاستخدام، نظرة عامة على الفوترة، والمؤشرات الرئيسية.'})}</p>
</div>
<div className="flex items-center gap-4">
{lastUpdated && (
<span className="text-xs font-bold text-primary/60 flex items-center gap-1">
{t({en: 'Last updated:', ar: 'آخر تحديث:'})} {new Date(lastUpdated).toLocaleTimeString()}
</span>
)}
<Badge variant="success">{t({en: 'Active Nodes', ar: 'العقد النشطة'})}</Badge>
</div>
</div>

<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
      <Card className="p-8 rounded-xl">
<p className="text-xs uppercase font-bold text-primary">{t({en: 'Monthly Recurring Revenue', ar: 'الإيرادات الشهرية المتكررة'})}</p>
<p className="text-3xl font-extrabold text-primary dark:text-surface mt-1">QAR {formatNumber(s.mrr)}</p>
<p className="text-xs text-accent font-bold mt-2"><TrendingUp className="w-3.5 h-3.5 inline text-accent" /> {s.mrr_growth}% {t({en: 'from last month', ar: 'من الشهر الماضي'})}</p>
</Card>
      <Card className="p-8 rounded-xl">
        <p className="text-xs uppercase font-bold text-primary">{t({en: 'Annual Run Rate', ar: 'معدل التشغيل السنوي'})}</p>
<p className="text-3xl font-extrabold text-primary dark:text-surface mt-1">QAR {formatArr(s.arr)}</p>
<p className="text-xs text-accent font-bold mt-2"><TrendingUp className="w-3.5 h-3.5 inline text-accent" /> {s.arr_growth}% {t({en: 'YoY growth', ar: 'نمو سنوي'})}</p>
</Card>
      <Card className="p-8 rounded-xl">
        <p className="text-xs uppercase font-bold text-primary">{t({en: 'Active Companies', ar: 'الشركات النشطة'})}</p>
<p className="text-3xl font-extrabold text-primary dark:text-surface mt-1">{formatNumber(s.active_companies)}</p>
<p className="text-xs text-primary font-bold mt-2">{t({en: '0 churn cases', ar: '0 حالات انسحاب'})}</p>
</Card>
      <Card className="p-8 rounded-xl">
        <p className="text-xs uppercase font-bold text-primary">{t({en: 'Monthly Questions Usage', ar: 'استخدام الأسئلة الشهري'})}</p>
<p className="text-3xl font-extrabold text-primary dark:text-surface mt-1">{formatNumber(s.questions_used)}</p>
<p className="text-xs text-accent font-bold mt-2">{t({en: `${s.usage_pct}% of total capacity`, ar: `${s.usage_pct}% من السعة الإجمالية`})}</p>
</Card>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
<Card className="p-8 rounded-xl">
<h3 className="font-bold text-navy dark:text-surface mb-4">{t({en: 'Traffic (Last 24 Hours)', ar: 'حركة المرور وارتفاعات الذكاء الاصطناعي (آخر 24 ساعة)'})}</h3>
<div className="flex items-center justify-center h-[256px] text-primary/40 text-sm font-semibold">
{t({en: 'No traffic data yet — analytics will populate as you onboard customers.', ar: 'لا توجد بيانات حركة مرور بعد — سيتم تعبئة التحليلات عند تسجيل العملاء.'})}
</div>
</Card>
<Card className="p-8 rounded-xl">
<h3 className="font-bold text-navy dark:text-surface mb-4">{t({en: 'Monthly Breakdown', ar: 'التوزيع الشهري'})}</h3>
<div className="flex items-center justify-center h-[256px] text-primary/40 text-sm font-semibold">
{t({en: 'No monthly data yet — will populate as you onboard customers.', ar: 'لا توجد بيانات شهرية بعد — سيتم تعبئتها عند تسجيل العملاء.'})}
</div>
</Card>
</div>
</main>
);
}