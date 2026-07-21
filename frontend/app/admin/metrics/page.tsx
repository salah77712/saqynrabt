'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useLocale } from '../../providers';

export default function AdminMetricsPage() {
  const { locale } = useLocale();
  const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';

  const [metrics, setMetrics] = useState({
    requestsPerSecond: 1.4,
    openaiCalls: 1204,
    dbConnections: 8,
    responseTimeMs: 240,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate real-time metrics fluctuates
      setMetrics(prev => ({
        requestsPerSecond: parseFloat((Math.random() * 2 + 0.5).toFixed(1)),
        openaiCalls: prev.openaiCalls + Math.floor(Math.random() * 2),
        dbConnections: Math.floor(Math.random() * 4 + 6),
        responseTimeMs: Math.floor(Math.random() * 50 + 210),
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleExportCSV = useCallback(() => {
    const rows = [
      ['Metric', 'Value', 'Status'],
      ['Requests / Sec', String(metrics.requestsPerSecond), 'Healthy'],
      ['Total OpenAI Calls', String(metrics.openaiCalls), 'Accumulated'],
      ['Active DB Pools', String(metrics.dbConnections), 'Neon Serverless'],
      ['Response Delay', `${metrics.responseTimeMs} ms`, 'Avg Latency'],
    ];
    const csv = rows.map(r => r.map(c => `"${c.replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sysadmin_metrics_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }, [metrics]);

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-primary">{t({ en: 'Real-Time Health & Metrics Telemetry', ar: 'مؤشرات الصحة والأداء الفوري للشبكة' })}</h1>
          <p className="text-xs text-primary/60 font-medium mt-0.5">{t({ en: 'Expose live container status, connection pools, and downstream response delays.', ar: 'عرض حالة الحاوية الفورية، تجمعات الاتصال، وتأخير استجابة OpenAI.' })}</p>
        </div>
        <button
          onClick={handleExportCSV}
          className="inline-flex items-center gap-2 min-h-[44px] px-4 py-2 rounded-xl bg-surface border border-primary/10 text-xs font-bold text-primary hover:bg-primary transition-all"
        >
          Export CSV
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {/* Metric 1 */}
        <div className="bg-surface border border-primary/10 rounded-xl p-8 shadow-sm flex flex-col justify-between h-32">
          <p className="text-xs font-extrabold uppercase text-primary/60 tracking-wider">{t({ en: 'Requests / Sec', ar: 'الطلبات في الثانية' })}</p>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-3xl font-black text-primary">{metrics.requestsPerSecond}</span>
            <span className="text-xs font-extrabold text-accent bg-surface px-2 py-0.5 rounded-full uppercase tracking-wider">{t({ en: 'Healthy', ar: 'سليم' })}</span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-surface border border-primary/10 rounded-xl p-8 shadow-sm flex flex-col justify-between h-32">
          <p className="text-xs font-extrabold uppercase text-primary/60 tracking-wider">{t({ en: 'Total OpenAI Calls', ar: 'إجمالي طلبات OpenAI' })}</p>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-3xl font-black text-primary">{metrics.openaiCalls}</span>
            <span className="text-xs font-extrabold text-primary/40 uppercase tracking-wider">Accumulated</span>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-surface border border-primary/10 rounded-xl p-8 shadow-sm flex flex-col justify-between h-32">
          <p className="text-xs font-extrabold uppercase text-primary/60 tracking-wider">{t({ en: 'Active DB Pools', ar: 'اتصالات قاعدة البيانات النشطة' })}</p>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-3xl font-black text-primary">{metrics.dbConnections}</span>
            <span className="text-xs font-extrabold text-accent bg-surface px-2 py-0.5 rounded-full uppercase tracking-wider">Neon Serverless</span>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-surface border border-primary/10 rounded-xl p-8 shadow-sm flex flex-col justify-between h-32">
          <p className="text-xs font-extrabold uppercase text-primary/60 tracking-wider">{t({ en: 'Response Delay', ar: 'تأخر الاستجابة' })}</p>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-3xl font-black text-primary">{metrics.responseTimeMs} ms</span>
            <span className="text-xs font-extrabold text-accent bg-surface px-2 py-0.5 rounded-full uppercase tracking-wider">Avg Latency</span>
          </div>
        </div>

      </div>

    </div>
  );
}
