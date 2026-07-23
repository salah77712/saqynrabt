'use client';

import React from 'react';
import { useLocale } from '../../providers';
import { Badge } from '../../../components/ui/Badge';

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

  const clients: ClientItem[] = [];

  return (
    <main id="main-content" className="p-8 space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-primary dark:text-surface">{t({en: 'Customer Success Console', ar: 'وحدة تحكم نجاح العملاء'})}</h1>
          <p className="text-xs text-primary font-medium">{t({en: 'Monitor account health indexes and retention risks.', ar: 'مراقبة مؤشرات صحة الحساب ومخاطر الاحتفاظ.'})}</p>
        </div>
        <Badge variant="warning">{t({en: '0 Accounts Need Attention', ar: '0 حسابات تحتاج إلى انتباه'})}</Badge>
      </div>

      {/* Empty State */}
      <div className="bg-surface border border-primary/10 rounded-xl p-12 shadow-sm text-center">
        <p className="text-sm font-bold text-primary/60">{t({en: 'No client success data yet — we are in pilot phase.', ar: 'لا توجد بيانات نجاح عملاء بعد — نحن في المرحلة التجريبية.'})}</p>
        <p className="text-xs text-primary/40 mt-2">{t({en: 'Health scores and usage data will appear once tenants are onboarded.', ar: 'ستظهر درجات الصحة وبيانات الاستخدام بعد تسجيل العملاء.'})}</p>
      </div>
    </main>
  );
}
