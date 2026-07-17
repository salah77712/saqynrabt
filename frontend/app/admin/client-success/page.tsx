'use client';

import React from 'react';
import { useLocale } from '../../providers';
import { Badge } from '../../../components/ui/Badge';
import { HealthScore } from '../../../components/HealthScore';

interface ClientItem {
  id: string;
  name: string;
  score: number;
  status: 'active' | 'churn_risk';
  usage: string;
}

export default function ClientSuccessPage() {
  const { locale } = useLocale();
  const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';

  const clients: ClientItem[] = [
    { id: '1', name: 'Qatar Medical Center', score: 94, status: 'active', usage: '82% quota' },
    { id: '2', name: 'Doha Service Workshop', score: 78, status: 'active', usage: '45% quota' },
    { id: '3', name: 'Al-Sadd Retail Mall', score: 45, status: 'churn_risk', usage: '10% quota' },
  ];

  return (
    <main id="main-content" className="p-8 space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-xl font-extrabold text-primary dark:text-surface">{t({en: 'Customer Success Console', ar: 'ÙˆØ­Ø¯Ø© ØªØ­ÙƒÙ… Ù†Ø¬Ø§Ø­ Ø§Ù„Ø¹Ù…Ù„Ø§Ø¡'})}</h1>
          <p className="text-xs text-primary font-medium">{t({en: 'Monitor account health indexes and retention risks.', ar: 'Ù…Ø±Ø§Ù‚Ø¨Ø© Ù…Ø¤Ø´Ø±Ø§Øª ØµØ­Ø© Ø§Ù„Ø­Ø³Ø§Ø¨ ÙˆÙ…Ø®Ø§Ø·Ø± Ø§Ù„Ø§Ø­ØªÙØ§Ø¸.'})}</p>
        </div>
        <Badge variant="warning">{t({en: '3 Accounts Need Attention', ar: '3 Ø­Ø³Ø§Ø¨Ø§Øª ØªØ­ØªØ§Ø¬ Ø¥Ù„Ù‰ Ø§Ù†ØªØ¨Ø§Ù‡'})}</Badge>
      </div>

      <div className="space-y-4">
        {clients.map((client) => (
          <div key={client.id} className="bg-surface border border-primary/10 rounded-xl p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h4 className="font-bold text-navy dark:text-surface text-base">{client.name}</h4>
              <p className="text-xs text-primary mt-1">{t({en: 'Resource consumption:', ar: 'Ø§Ø³ØªÙ‡Ù„Ø§Ùƒ Ø§Ù„Ù…ÙˆØ§Ø±Ø¯:'})} {client.usage}</p>
            </div>

            <div className="flex items-center gap-8">
              <HealthScore score={client.score} />
              <Badge variant={client.status === 'active' ? 'success' : 'danger'}>
                {client.status === 'active' ? t({en: 'Healthy', ar: 'Ø³Ù„ÙŠÙ…'}) : t({en: 'Retention Warning', ar: 'ØªØ­Ø°ÙŠØ± Ø§Ù„Ø§Ø­ØªÙØ§Ø¸'})}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
