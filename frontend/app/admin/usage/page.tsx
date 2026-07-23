'use client';

import React, { useCallback } from 'react';
import { useLocale } from '../../providers';

export default function AdminUsagePage() {
  const { locale } = useLocale();
  const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';

  const handleExportCSV = useCallback(() => {
    const rows = [['Metric', 'Value', 'Change']];
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

      {/* Empty State */}
      <div className="bg-surface border border-primary/10 rounded-xl p-12 shadow-sm text-center">
        <p className="text-sm font-bold text-primary/60">{t({ en: 'No usage data yet — we are in pilot phase.', ar: 'لا توجد بيانات استخدام بعد — نحن في المرحلة التجريبية.' })}</p>
        <p className="text-xs text-primary/40 mt-2">{t({ en: 'Usage metrics will appear once tenants are onboarded.', ar: 'ستظهر مقاييس الاستخدام بعد تسجيل العملاء.' })}</p>
      </div>

    </div>
  );
}
