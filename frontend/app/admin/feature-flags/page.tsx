'use client';

import React, { useState } from 'react';
import { useLocale } from '../../providers';

interface FlagItem {
  id: string;
  name: string;
  enabled: boolean;
}

export default function AdminFeatureFlagsPage() {
  const { locale } = useLocale();
  const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';

  const [flags] = useState<FlagItem[]>([]);

  return (
    <div className="space-y-6 animate-fadeIn max-w-xl py-12 px-6 mx-auto">

      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-primary">{t({ en: 'Global Feature Flag Manager', ar: 'إدارة مؤشرات الميزات البرمجية' })}</h1>
        <p className="text-xs text-primary/60 font-medium mt-0.5">{t({ en: 'SAQYN staff administrative panel. Toggle beta feature scopes.', ar: 'شاشة التحكم لموظفي SAQYN. تعديل وتفعيل صلاحيات الميزات التجريبية.' })}</p>
      </div>

      {/* Empty State */}
      <div className="bg-surface border border-primary/10 rounded-xl p-12 shadow-sm text-center">
        <p className="text-sm font-bold text-primary/60">{t({ en: 'No feature flags configured yet.', ar: 'لا توجد مؤشرات ميزات مكونة بعد.' })}</p>
        <p className="text-xs text-primary/40 mt-2">{t({ en: 'Feature flags will appear here once configured.', ar: 'ستظهر مؤشرات الميزات هنا بعد التكوين.' })}</p>
      </div>

    </div>
  );
}
