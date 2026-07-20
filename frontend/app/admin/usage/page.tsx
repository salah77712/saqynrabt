'use client';

import React, { useCallback } from 'react';
import { useLocale } from '../../providers';

export default function AdminUsagePage() {
  const { locale } = useLocale();
  const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';

  const cards = [
    { title: t({ en: 'Total Active Tenants', ar: 'إجمالي الشركات النشطة' }), value: '184', change: '+12%', color: 'text-accent bg-surface' },
    { title: t({ en: 'Daily Chat Requests', ar: 'طلبات المحادثة اليومية' }), value: '8,402', change: '+18%', color: 'text-accent bg-surface' },
    { title: t({ en: 'Daily Voice Minutes', ar: 'دقائق الصوت اليومية' }), value: '3,892', change: '+5%', color: 'text-accent bg-surface' },
    { title: t({ en: 'Average Text API Loads', ar: 'متوسط استهلاك النصوص' }), value: '420', change: '-2%', color: 'text-accent bg-surface' },
  ];

  const chartData = [
    { day: 'Sun', value: 120 },
    { day: 'Mon', value: 250 },
    { day: 'Tue', value: 190 },
    { day: 'Wed', value: 380 },
    { day: 'Thu', value: 310 },
    { day: 'Fri', value: 450 },
    { day: 'Sat', value: 410 },
  ];

  const handleExportCSV = useCallback(() => {
    const rows = [
      ['Metric', 'Value', 'Change'],
      ...cards.map(c => [c.title, c.value, c.change]),
    ];
    const csv = rows.map(r => r.map(c => `"${c.replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `platform_usage_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }, []);

  return (
    <div className="space-y-8 animate-fadeIn">

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-primary">{t({ en: 'Live Platform Usage & Telemetry', ar: 'استهلاك المنصة وقياس العمليات' })}</h1>
          <p className="text-xs text-primary font-medium mt-0.5">{t({ en: 'Track system API loads, active voice channels, and monthly trends.', ar: 'تتبع أحمال واجهة برمجة التطبيقات، قنوات الصوت، والاتجاهات الشهرية.' })}</p>
        </div>
        <button
          onClick={handleExportCSV}
          className="inline-flex items-center gap-2 min-h-[44px] px-4 py-2 rounded-xl bg-surface border border-primary/10 text-xs font-bold text-primary hover:bg-primary transition-all"
        >
          Export CSV
        </button>
      </div>

      {/* Grid Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {cards.map((card, idx) => (
          <div key={idx} className="bg-surface border border-primary/10 rounded-xl p-8 shadow-sm">
            <p className="text-xs font-extrabold uppercase text-primary/60 tracking-wider">{card.title}</p>
            <div className="flex items-baseline justify-between mt-3">
              <span className="text-2xl font-black text-primary">{card.value}</span>
              <span className={`text-xs font-extrabold px-2 py-0.5 rounded-full ${
                card.change.startsWith('+') ? 'bg-surface text-accent' : 'bg-surface text-primary'
              }`}>
                {card.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Premium SVG/CSS Line Chart */}
      <div className="bg-surface border border-primary/10 rounded-xl p-8 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-sm font-extrabold text-primary">{t({ en: '7-Day Platform Request Load', ar: 'أحمال طلبات المنصة خلال 7 أيام' })}</h3>
          <span className="text-xs font-bold text-accent">{t({ en: 'Updated 2 min ago', ar: 'تم التحديث منذ دقيقتين' })}</span>
        </div>

        {/* SVG Vector Graph */}
        <div className="relative w-full h-64 border-b border-s border-primary/10 flex items-end">
          <svg aria-hidden="true" className="absolute inset-0 w-full h-full p-4" viewBox="0 0 700 200" preserveAspectRatio="none">
            <line x1="0" y1="50" x2="700" y2="50" stroke="var(--color-border)" strokeWidth="1" />
            <line x1="0" y1="100" x2="700" y2="100" stroke="var(--color-border)" strokeWidth="1" />
            <line x1="0" y1="150" x2="700" y2="150" stroke="var(--color-border)" strokeWidth="1" />
            <path
              d="M 50 160 C 120 120, 180 140, 250 80 C 320 100, 380 40, 450 60 C 520 20, 580 40, 650 30"
              fill="none"
              stroke="var(--color-accent)"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <circle cx="50" cy="160" r="5" fill="var(--color-accent)" />
            <circle cx="250" cy="80" r="5" fill="var(--color-accent)" />
            <circle cx="450" cy="60" r="5" fill="var(--color-accent)" />
            <circle cx="650" cy="30" r="5" fill="var(--color-accent)" />
          </svg>

          {/* X Axis Labels */}
          <div className="absolute inset-x-0 bottom-0 flex justify-between px-6 translate-y-6 text-xs font-extrabold text-primary uppercase tracking-widest">
            {chartData.map((d, idx) => (
              <span key={idx}>{d.day}</span>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
