'use client';

import React, { useState } from 'react';
import { useLocale } from '../../../providers';

export default function ReportBuilderSettingsPage() {
  const { locale } = useLocale();
  const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';

  const [metric, setMetric] = useState('automation_calls');
  const [period, setPeriod] = useState('last_30_days');
  const [generating, setGenerating] = useState(false);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setGenerating(true);

    // Simulate exporting reports download stream
    setTimeout(() => {
      setGenerating(false);
      const csvContent = "data:text/csv;charset=utf-8,Metric,Period,Value\nAutomation Calls,Last 30 Days,87\nChatbot Queries,Last 30 Days,1204";
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `saqyn_report_${metric}_${period}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    }, 1000);
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-xl">
      
      {/* Header */}
      <div>
        <h1 className="text-xl font-extrabold text-[#141F33]">{t({ en: 'Reports', ar: 'منشئ تقارير ذكاء الأعمال المخصصة' })}</h1>
        <p className="text-xs text-[#718096] font-medium mt-0.5">{t({ en: 'Combine activity data and export as CSV.', ar: 'تجميع أنشطة مساحة العمل وتصدير سجلات القياس بصيغة CSV.' })}</p>
      </div>

      {/* Form Report Parameter Builder */}
      <form onSubmit={handleGenerate} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-4">
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="metric" className="block text-xs font-bold text-[#141F33] mb-1.5">{t({ en: 'Aggregate Metric', ar: 'مقياس التجميع' })}</label>
            <select
              id="metric"
              value={metric}
              onChange={(e) => setMetric(e.target.value)}
              className="w-full min-h-[44px] bg-slate-50 border border-gray-200 rounded-xl px-4 py-2 text-xs font-bold text-[#141F33]"
            >
              <option value="automation_calls">Automation Calls count</option>
              <option value="chatbot_queries">Chatbot RAG Questions</option>
              <option value="employee_actions">Active Employee actions</option>
            </select>
          </div>

          <div>
            <label htmlFor="period" className="block text-xs font-bold text-[#141F33] mb-1.5">{t({ en: 'Reporting Period', ar: 'فترة التقرير' })}</label>
            <select
              id="period"
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="w-full min-h-[44px] bg-slate-50 border border-gray-200 rounded-xl px-4 py-2 text-xs font-bold text-[#141F33]"
            >
              <option value="last_7_days">Last 7 Days</option>
              <option value="last_30_days">Last 30 Days</option>
              <option value="last_90_days">Last 90 Days</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={generating}
          className="w-full bg-[#141F33] text-white font-bold py-4 rounded-xl text-xs hover:opacity-95 transition-all min-h-[44px] flex items-center justify-center disabled:opacity-40"
        >
          {generating ? t({ en: 'Generating...', ar: 'جاري الإنشاء...' }) : t({ en: 'Generate and Download Report (CSV)', ar: 'إنشاء وتنزيل التقرير (CSV)' })}
        </button>

      </form>

    </div>
  );
}
