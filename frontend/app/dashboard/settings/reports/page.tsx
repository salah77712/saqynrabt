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
        <h1 className="text-2xl md:text-3xl font-extrabold text-primary">{t({ en: 'Reports', ar: 'Ù…Ù†Ø´Ø¦ ØªÙ‚Ø§Ø±ÙŠØ± Ø°ÙƒØ§Ø¡ Ø§Ù„Ø£Ø¹Ù…Ø§Ù„ Ø§Ù„Ù…Ø®ØµØµØ©' })}</h1>
        <p className="text-xs text-primary font-medium mt-0.5">{t({ en: 'Combine activity data and export as CSV.', ar: 'ØªØ¬Ù…ÙŠØ¹ Ø£Ù†Ø´Ø·Ø© Ù…Ø³Ø§Ø­Ø© Ø§Ù„Ø¹Ù…Ù„ ÙˆØªØµØ¯ÙŠØ± Ø³Ø¬Ù„Ø§Øª Ø§Ù„Ù‚ÙŠØ§Ø³ Ø¨ØµÙŠØºØ© CSV.' })}</p>
      </div>

      {/* Form Report Parameter Builder */}
      <form onSubmit={handleGenerate} className="bg-surface border border-primary/10 rounded-xl p-8 shadow-sm flex flex-col gap-8">
        
        <div className="grid grid-cols-2 gap-8">
          <div>
            <label htmlFor="metric" className="block text-xs font-bold text-primary mb-1.5">{t({ en: 'Aggregate Metric', ar: 'Ù…Ù‚ÙŠØ§Ø³ Ø§Ù„ØªØ¬Ù…ÙŠØ¹' })}</label>
            <select
              id="metric"
              value={metric}
              onChange={(e) => setMetric(e.target.value)}
              className="w-full min-h-[44px] bg-surface border border-primary/10 rounded-xl px-4 py-2 text-xs font-semibold text-primary"
            >
              <option value="automation_calls">Automation Calls count</option>
              <option value="chatbot_queries">Chatbot RAG Questions</option>
              <option value="employee_actions">Active Employee actions</option>
            </select>
          </div>

          <div>
            <label htmlFor="period" className="block text-xs font-bold text-primary mb-1.5">{t({ en: 'Reporting Period', ar: 'ÙØªØ±Ø© Ø§Ù„ØªÙ‚Ø±ÙŠØ±' })}</label>
            <select
              id="period"
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="w-full min-h-[44px] bg-surface border border-primary/10 rounded-xl px-4 py-2 text-xs font-semibold text-primary"
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
          className="w-full bg-primary text-surface font-bold py-3 px-6 rounded-xl text-xs min-h-[44px] flex items-center justify-center transition-all duration-300 hover:shadow-md hover:scale-[1.02] active:scale-95 disabled:opacity-40"
        >
          {generating ? t({ en: 'Generating...', ar: 'Ø¬Ø§Ø±ÙŠ Ø§Ù„Ø¥Ù†Ø´Ø§Ø¡...' }) : t({ en: 'Generate and Download Report (CSV)', ar: 'Ø¥Ù†Ø´Ø§Ø¡ ÙˆØªÙ†Ø²ÙŠÙ„ Ø§Ù„ØªÙ‚Ø±ÙŠØ± (CSV)' })}
        </button>

      </form>

    </div>
  );
}


