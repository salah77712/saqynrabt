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
    <main id="main-content" className="p-6 space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-xl font-extrabold text-[#141F33] dark:text-[#F8F9FB]">{t({en: 'Customer Success Console', ar: 'وحدة تحكم نجاح العملاء'})}</h1>
          <p className="text-xs text-[#141F33] font-medium">{t({en: 'Monitor account health indexes and retention risks.', ar: 'مراقبة مؤشرات صحة الحساب ومخاطر الاحتفاظ.'})}</p>
        </div>
        <Badge variant="warning">{t({en: '3 Accounts Need Attention', ar: '3 حسابات تحتاج إلى انتباه'})}</Badge>
      </div>

      <div className="space-y-4">
        {clients.map((client) => (
          <div key={client.id} className="bg-[#F8F9FB] border border-[#141F33]/10 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="font-bold text-navy dark:text-[#F8F9FB] text-base">{client.name}</h4>
              <p className="text-xs text-[#141F33] mt-1">{t({en: 'Resource consumption:', ar: 'استهلاك الموارد:'})} {client.usage}</p>
            </div>

            <div className="flex items-center gap-6">
              <HealthScore score={client.score} />
              <Badge variant={client.status === 'active' ? 'success' : 'danger'}>
                {client.status === 'active' ? t({en: 'Healthy', ar: 'سليم'}) : t({en: 'Retention Warning', ar: 'تحذير الاحتفاظ'})}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
