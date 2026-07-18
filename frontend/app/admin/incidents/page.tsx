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
  const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';

  const [incidents, setIncidents] = useState<IncidentItem[]>([
    { id: 'i-1', title: 'Stripe webhook retry timeouts', severity: 'Medium', status: 'Investigating' },
    { id: 'i-2', title: 'Vector query payload overflow', severity: 'High', status: 'Resolved' },
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
        <h1 className="text-xl font-extrabold text-primary">{t({ en: 'Active System Incidents', ar: 'Ø§Ù„Ø­ÙˆØ§Ø¯Ø« ÙˆØ§Ù„ØªÙ‚Ø§Ø±ÙŠØ± Ø§Ù„ÙÙ†ÙŠØ© Ø§Ù„Ù†Ø´Ø·Ø©' })}</h1>
        <p className="text-xs text-primary font-medium mt-0.5">{t({ en: 'SAQYN operations console. Track outages and runtime errors.', ar: 'Ø´Ø§Ø´Ø© Ø§Ù„Ø¹Ù…Ù„ÙŠØ§Øª Ù„Ù…ØªØ§Ø¨Ø¹Ø© Ø§Ù„Ø£Ø¹Ø·Ø§Ù„ ÙˆØªØµØ­ÙŠØ­ Ø§Ù„Ø£Ø®Ø·Ø§Ø¡ Ø§Ù„ØªØ´ØºÙŠÙ„ÙŠØ©.' })}</p>
      </div>

      {/* Incidents List */}
      <div className="bg-[#F8F9FB] border border-primary/10 rounded-xl p-8 shadow-sm shadow-card">
        <div className="divide-y divide-[#141F33]/10">
          {incidents.map((inc) => (
            <div key={inc.id} className="py-4 flex justify-between items-center gap-8 first:pt-0 last:pb-0">
              <div>
                <p className="text-xs font-extrabold text-primary">{inc.title}</p>
                <div className="flex gap-3 items-center mt-1">
                  <span className="text-[10px] text-primary/40 font-bold">Severity: {inc.severity}</span>
                  <span className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                    inc.status === 'Resolved' ? 'bg-surface text-accent' : 'bg-surface text-accent'
                  }`}>
                    {inc.status}
                  </span>
                </div>
              </div>

              {inc.status === 'Investigating' && (
                <button
                  onClick={() => handleResolve(inc.id)}
                  className="px-6 py-3 rounded-xl text-xs font-bold min-h-[44px] transition-all duration-300 hover:shadow-md hover:scale-[1.02] active:scale-95"
                >
                  {t({ en: 'Resolve', ar: 'Ø­Ù„' })}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
