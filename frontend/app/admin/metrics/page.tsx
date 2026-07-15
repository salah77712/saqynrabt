'use client';

import React, { useState, useEffect } from 'react';
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

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Header */}
      <div>
        <h1 className="text-xl font-extrabold text-[#141F33]">{t({ en: 'Real-Time Health & Metrics Telemetry', ar: 'مؤشرات الصحة والأداء الفوري للشبكة' })}</h1>
        <p className="text-xs text-[#141F33]/60 font-medium mt-0.5">{t({ en: 'Expose live container status, connection pools, and downstream response delays.', ar: 'عرض حالة الحاوية الفورية، تجمعات الاتصال، وتأخير استجابة OpenAI.' })}</p>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {/* Metric 1 */}
        <div className="bg-[#F8F9FB] border border-[#141F33]/10 rounded-[40px] p-8 shadow-sm flex flex-col justify-between h-32">
          <p className="text-[10px] font-extrabold uppercase text-[#141F33]/60 tracking-wider">{t({ en: 'Requests / Sec', ar: 'الطلبات في الثانية' })}</p>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-3xl font-black text-[#141F33]">{metrics.requestsPerSecond}</span>
            <span className="text-[9px] font-extrabold text-[#2A5CFF] bg-[#F8F9FB] px-2 py-0.5 rounded-full uppercase tracking-wider">{t({ en: 'Healthy', ar: 'سليم' })}</span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-[#F8F9FB] border border-[#141F33]/10 rounded-[40px] p-8 shadow-sm flex flex-col justify-between h-32">
          <p className="text-[10px] font-extrabold uppercase text-[#141F33]/60 tracking-wider">{t({ en: 'Total OpenAI Calls', ar: 'إجمالي طلبات OpenAI' })}</p>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-3xl font-black text-[#141F33]">{metrics.openaiCalls}</span>
            <span className="text-[9px] font-extrabold text-[#141F33]/40 uppercase tracking-wider">Accumulated</span>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-[#F8F9FB] border border-[#141F33]/10 rounded-[40px] p-8 shadow-sm flex flex-col justify-between h-32">
          <p className="text-[10px] font-extrabold uppercase text-[#141F33]/60 tracking-wider">{t({ en: 'Active DB Pools', ar: 'اتصالات قاعدة البيانات النشطة' })}</p>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-3xl font-black text-[#141F33]">{metrics.dbConnections}</span>
            <span className="text-[9px] font-extrabold text-[#2A5CFF] bg-[#F8F9FB] px-2 py-0.5 rounded-full uppercase tracking-wider">Neon Serverless</span>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-[#F8F9FB] border border-[#141F33]/10 rounded-[40px] p-8 shadow-sm flex flex-col justify-between h-32">
          <p className="text-[10px] font-extrabold uppercase text-[#141F33]/60 tracking-wider">{t({ en: 'Response Delay', ar: 'تأخر الاستجابة' })}</p>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-3xl font-black text-[#141F33]">{metrics.responseTimeMs} ms</span>
            <span className="text-[9px] font-extrabold text-[#2A5CFF] bg-[#F8F9FB] px-2 py-0.5 rounded-full uppercase tracking-wider">Avg Latency</span>
          </div>
        </div>

      </div>

    </div>
  );
}
