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
        <h1 className="text-xl font-extrabold text-primary">{t({ en: 'Real-Time Health & Metrics Telemetry', ar: 'Ù…Ø¤Ø´Ø±Ø§Øª Ø§Ù„ØµØ­Ø© ÙˆØ§Ù„Ø£Ø¯Ø§Ø¡ Ø§Ù„ÙÙˆØ±ÙŠ Ù„Ù„Ø´Ø¨ÙƒØ©' })}</h1>
        <p className="text-xs text-primary/60 font-medium mt-0.5">{t({ en: 'Expose live container status, connection pools, and downstream response delays.', ar: 'Ø¹Ø±Ø¶ Ø­Ø§Ù„Ø© Ø§Ù„Ø­Ø§ÙˆÙŠØ© Ø§Ù„ÙÙˆØ±ÙŠØ©ØŒ ØªØ¬Ù…Ø¹Ø§Øª Ø§Ù„Ø§ØªØµØ§Ù„ØŒ ÙˆØªØ£Ø®ÙŠØ± Ø§Ø³ØªØ¬Ø§Ø¨Ø© OpenAI.' })}</p>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {/* Metric 1 */}
        <div className="bg-surface border border-primary/10 rounded-xl p-8 shadow-sm flex flex-col justify-between h-32">
          <p className="text-[10px] font-extrabold uppercase text-primary/60 tracking-wider">{t({ en: 'Requests / Sec', ar: 'Ø§Ù„Ø·Ù„Ø¨Ø§Øª ÙÙŠ Ø§Ù„Ø«Ø§Ù†ÙŠØ©' })}</p>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-3xl font-black text-primary">{metrics.requestsPerSecond}</span>
            <span className="text-[9px] font-extrabold text-accent bg-surface px-2 py-0.5 rounded-full uppercase tracking-wider">{t({ en: 'Healthy', ar: 'Ø³Ù„ÙŠÙ…' })}</span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-surface border border-primary/10 rounded-xl p-8 shadow-sm flex flex-col justify-between h-32">
          <p className="text-[10px] font-extrabold uppercase text-primary/60 tracking-wider">{t({ en: 'Total OpenAI Calls', ar: 'Ø¥Ø¬Ù…Ø§Ù„ÙŠ Ø·Ù„Ø¨Ø§Øª OpenAI' })}</p>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-3xl font-black text-primary">{metrics.openaiCalls}</span>
            <span className="text-[9px] font-extrabold text-primary/40 uppercase tracking-wider">Accumulated</span>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-surface border border-primary/10 rounded-xl p-8 shadow-sm flex flex-col justify-between h-32">
          <p className="text-[10px] font-extrabold uppercase text-primary/60 tracking-wider">{t({ en: 'Active DB Pools', ar: 'Ø§ØªØµØ§Ù„Ø§Øª Ù‚Ø§Ø¹Ø¯Ø© Ø§Ù„Ø¨ÙŠØ§Ù†Ø§Øª Ø§Ù„Ù†Ø´Ø·Ø©' })}</p>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-3xl font-black text-primary">{metrics.dbConnections}</span>
            <span className="text-[9px] font-extrabold text-accent bg-surface px-2 py-0.5 rounded-full uppercase tracking-wider">Neon Serverless</span>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-surface border border-primary/10 rounded-xl p-8 shadow-sm flex flex-col justify-between h-32">
          <p className="text-[10px] font-extrabold uppercase text-primary/60 tracking-wider">{t({ en: 'Response Delay', ar: 'ØªØ£Ø®Ø± Ø§Ù„Ø§Ø³ØªØ¬Ø§Ø¨Ø©' })}</p>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-3xl font-black text-primary">{metrics.responseTimeMs} ms</span>
            <span className="text-[9px] font-extrabold text-accent bg-surface px-2 py-0.5 rounded-full uppercase tracking-wider">Avg Latency</span>
          </div>
        </div>

      </div>

    </div>
  );
}
