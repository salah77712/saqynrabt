'use client';

import React from 'react';
import { useLocale } from '../../providers';

export default function AdminHealthPage() {
  const { locale } = useLocale();
  const t = (obj: Record<string, string>) => locale === 'ar' ? obj.ar : obj.en;

  const services = [
    { name: 'Cloudflare Worker API Server', status: 'Operational', latency: '42ms' },
    { name: 'NeonDB PostgreSQL Database', status: 'Operational', latency: '12ms' },
    { name: 'Pinecone Vector DB', status: 'Operational', latency: '180ms' },
    { name: 'Upstash Redis live cache', status: 'Operational', latency: '5ms' },
  ];

  return (
    <div className="space-y-6 animate-fadeIn max-w-xl py-12 px-6 mx-auto">
      
      {/* Header */}
      <div>
        <h1 className="text-xl font-extrabold text-[#141F33]">{t({ en: 'System Services Health', ar: 'حالة وتواجد الخدمات البرمجية' })}</h1>
        <p className="text-xs text-[#718096] font-medium mt-0.5">{t({ en: 'Uptimes and latency metrics across core infrastructure layers.', ar: 'مؤشرات التواجد وزمن الاستجابة للخدمات الأساسية للبنية التحتية.' })}</p>
      </div>

      {/* Services grid */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-4">
        {services.map((srv, idx) => (
          <div key={idx} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0">
            <div>
              <p className="text-xs font-extrabold text-[#141F33]">{srv.name}</p>
              <p className="text-[10px] text-slate-400 font-bold mt-1">Latency: {srv.latency}</p>
            </div>

            <span className="bg-emerald-100 text-emerald-800 text-[9px] font-extrabold uppercase px-2.5 py-0.5 rounded-full">
              {srv.status}
            </span>
          </div>
        ))}
      </div>

    </div>
  );
}
