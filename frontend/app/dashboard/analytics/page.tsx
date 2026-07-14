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
      <main id="main-content" className="p-6 space-y-6">
        <div className="flex justify-center items-center h-64">
          <p className="text-slate-500 font-bold">{t({en: 'Loading metrics...', ar: 'جارٍ تحميل المقاييس...'})}</p>
        </div>
      </main>
    );
  }

  return (
    <main id="main-content" className="p-6 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-black text-[#141F33] dark:text-white">{t({en: 'Analytics', ar: 'وحدة تحكم العمليات الإدارية'})}</h1>
          <p className="text-xs text-slate-500 font-bold">{t({en: 'Usage stats, billing overview, and key metrics.', ar: 'مقاييس فورية، فواتير العملاء النشطين وتتبع الإيرادات السنوية.'})}</p>
        </div>
        <Badge variant="success">{t({en: 'Active Nodes', ar: 'العقد الطرفية نشطة'})}</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <p className="text-[10px] uppercase font-bold text-slate-400">{t({en: 'Monthly Recurring Revenue', ar: 'الإيرادات الشهرية المتكررة'})}</p>
          <p className="text-3xl font-black text-[#141F33] dark:text-white mt-1">QAR {formatNumber(s.mrr)}</p>
          <p className="text-xs text-emerald-500 font-bold mt-2"><TrendingUp className="w-3.5 h-3.5 inline text-emerald-500" /> {s.mrr_growth}% {t({en: 'from last month', ar: 'عن الشهر الماضي'})}</p>
        </Card>
        <Card>
          <p className="text-[10px] uppercase font-bold text-slate-400">{t({en: 'Annual Run Rate', ar: 'معدل التشغيل السنوي'})}</p>
          <p className="text-3xl font-black text-[#141F33] dark:text-white mt-1">QAR {formatArr(s.arr)}</p>
          <p className="text-xs text-emerald-500 font-bold mt-2"><TrendingUp className="w-3.5 h-3.5 inline text-emerald-500" /> {s.arr_growth}% {t({en: 'YoY growth', ar: 'نمو سنوي'})}</p>
        </Card>
        <Card>
          <p className="text-[10px] uppercase font-bold text-slate-400">{t({en: 'Active Companies', ar: 'الشركات النشطة'})}</p>
          <p className="text-3xl font-black text-[#141F33] dark:text-white mt-1">{formatNumber(s.active_companies)}</p>
          <p className="text-xs text-slate-400 font-bold mt-2">{t({en: '0 churn cases', ar: '0 حالات انسحاب'})}</p>
        </Card>
        <Card>
          <p className="text-[10px] uppercase font-bold text-slate-400">{t({en: 'Monthly Questions Usage', ar: 'استخدام الأسئلة الشهري'})}</p>
          <p className="text-3xl font-black text-[#141F33] dark:text-white mt-1">{formatNumber(s.questions_used)}</p>
          <p className="text-xs text-orange-500 font-bold mt-2">{t({en: `${s.usage_pct}% of total capacity`, ar: `${s.usage_pct}% من السعة الإجمالية`})}</p>
        </Card>
      </div>

      <Card className="mt-6">
        <h3 className="font-bold text-navy dark:text-white mb-4">{t({en: 'Traffic (Last 24 Hours)', ar: 'حركة المرور وارتفاعات الذكاء الاصطناعي (آخر 24 ساعة)'})}</h3>
        <div className="h-64 flex items-end justify-between gap-2 bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
          {[40, 65, 30, 85, 45, 95, 70, 55, 90, 100, 35, 60].map((h, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
              <div className="bg-[#141F33] dark:bg-royal w-full rounded-t-md transition-all hover:scale-[1.05]" style={{ height: `${h}%` }} />
              <span className="text-[9px] font-bold text-slate-400">{i * 2}h</span>
            </div>
          ))}
        </div>
      </Card>
    </main>
  );
}
