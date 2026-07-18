'use client';

import React, { useState } from 'react';
import { useLocale } from '../../providers';

interface AuditItem {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  ipAddress: string;
}

export default function AdminAuditPage() {
  const { locale } = useLocale();
  const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';

  const [search, setSearch] = useState('');
  const [logs, setLogs] = useState<AuditItem[]>([
    { id: 'log-1', timestamp: '2026-07-04T16:35:12Z', user: 'admin@alsafa.qa', action: 'Approved Employee Access (ahmed@alsafa.qa)', ipAddress: '82.148.97.10' },
    { id: 'log-2', timestamp: '2026-07-04T16:22:45Z', user: 'admin@alsafa.qa', action: 'Uploaded private document (front_desk_sop.pdf)', ipAddress: '82.148.97.10' },
    { id: 'log-3', timestamp: '2026-07-04T14:10:02Z', user: 'sara@alsafa.qa', action: 'Requested chatbot answer (rollover vacation)', ipAddress: '89.211.23.104' },
    { id: 'log-4', timestamp: '2026-07-03T11:45:19Z', user: 'admin@alsafa.qa', action: 'Toggled au overage settings', ipAddress: '82.148.97.12' },
  ]);

  const filteredLogs = logs.filter(log =>
    log.user?.toLowerCase().includes(search?.toLowerCase()) ||
    log.action?.toLowerCase().includes(search?.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fadeIn">

      {/* Page Header and Search */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
        <div>
          <h1 className="text-xl font-extrabold text-primary">{t({ en: 'Security & Audit Logs', ar: 'Ø³Ø¬Ù„Ø§Øª Ø§Ù„Ø£Ù…Ù† ÙˆØ§Ù„ØªØ¯Ù‚ÙŠÙ‚' })}</h1>
          <p className="text-xs text-primary font-medium mt-0.5">{t({ en: 'Audit all platform events, tenant activity, and security changes.', ar: 'Ù…Ø±Ø§Ø¬Ø¹Ø© Ø¬Ù…ÙŠØ¹ Ø£Ø­Ø¯Ø§Ø« Ø§Ù„Ù…Ù†ØµØ©ØŒ Ù†Ø´Ø§Ø· Ø§Ù„Ø´Ø±ÙƒØ§ØªØŒ ÙˆØ§Ù„ØªØºÙŠÙŠØ±Ø§Øª Ø§Ù„Ø£Ù…Ù†ÙŠØ©.' })}</p>
        </div>

        <div>
          <input
            type="text"
            placeholder={t({ en: 'Filter logs...', ar: 'ØªØµÙÙŠØ© Ø§Ù„Ø³Ø¬Ù„Ø§Øª...' })}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="min-h-[44px] bg-surface border border-primary/10 rounded-xl px-4 py-2 text-xs font-semibold shadow-sm focus:outline-none focus:ring-2 focus:ring-accent focus:ring-royal w-64"
          />
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="bg-[#F8F9FB] border border-primary/10 rounded-xl shadow-sm overflow-hidden shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
            <thead>
              <tr className="bg-surface border-b border-primary/10 text-xs font-extrabold text-primary uppercase tracking-wider">
                <th className="px-6 py-4">{t({ en: 'Timestamp', ar: 'Ø§Ù„ÙˆÙ‚Øª ÙˆØ§Ù„Ø´Ø¨ÙƒØ©' })}</th>
                <th className="px-6 py-4">{t({ en: 'Operator User', ar: 'Ø§Ù„Ù…Ø³ØªØ®Ø¯Ù… Ø§Ù„Ù…Ø´ØºÙ„' })}</th>
                <th className="px-6 py-4">{t({ en: 'Action Performed', ar: 'Ø§Ù„Ø¥Ø¬Ø±Ø§Ø¡ Ø§Ù„Ù…Ù†ÙØ°' })}</th>
                <th className="px-6 py-4">{t({ en: 'IP Address', ar: 'Ø¹Ù†ÙˆØ§Ù† Ø§Ù„Ù€ IP' })}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#141F33]/10 text-xs font-semibold text-primary">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-primary transition-colors">
                  <td className="px-6 py-4 text-primary font-bold">{new Date(log.timestamp).toLocaleString()}</td>
                  <td className="px-6 py-4 font-bold text-primary">{log.user}</td>
                  <td className="px-6 py-4 text-primary">{log.action}</td>
                  <td className="px-6 py-4 font-mono text-primary font-bold">{log.ipAddress}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
