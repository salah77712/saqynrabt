'use client';

import React, { useState } from 'react';
import { useLocale } from '../../providers';

interface IncidentItem {
  id: string;
  title: string;
  severity: 'High' | 'Medium' | 'Low';
  status: 'Investigating' | 'Resolved';
}

export default function AdminIncidentsPage() {
  const { locale } = useLocale();
  const t = (obj: Record<string, string>) => locale === 'ar' ? obj.ar : obj.en;

  const [incidents, setIncidents] = useState<IncidentItem[]>([
    { id: 'i-1', title: 'Stripe webhook retry timeouts', severity: 'Medium', status: 'Investigating' },
    { id: 'i-2', title: 'Pinecone query payload overflow', severity: 'High', status: 'Resolved' },
  ]);

  const handleResolve = (id: string) => {
    setIncidents(prev =>
      prev.map(i => i.id === id ? { ...i, status: 'Resolved' } : i)
    );
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-xl py-12 px-6 mx-auto">
      
      {/* Header */}
      <div>
        <h1 className="text-xl font-extrabold text-[#141F33]">{t({ en: 'Active System Incidents', ar: 'الحوادث والتقارير الفنية النشطة' })}</h1>
        <p className="text-xs text-[#718096] font-medium mt-0.5">{t({ en: 'SAQYN operations console. Track outages and runtime errors.', ar: 'شاشة العمليات لمتابعة الأعطال وتصحيح الأخطاء التشغيلية.' })}</p>
      </div>

      {/* Incidents List */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <div className="divide-y divide-gray-100">
          {incidents.map((inc) => (
            <div key={inc.id} className="py-4 flex justify-between items-center gap-4 first:pt-0 last:pb-0">
              <div>
                <p className="text-xs font-extrabold text-[#141F33]">{inc.title}</p>
                <div className="flex gap-2 items-center mt-1">
                  <span className="text-[10px] text-slate-400 font-bold">Severity: {inc.severity}</span>
                  <span className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                    inc.status === 'Resolved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {inc.status}
                  </span>
                </div>
              </div>

              {inc.status === 'Investigating' && (
                <button
                  onClick={() => handleResolve(inc.id)}
                  className="bg-emerald-600 text-white font-bold px-3 py-1.5 rounded-lg text-xs"
                >
                  Resolve
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
