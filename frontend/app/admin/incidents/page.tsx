'use client';

import React, { useState } from 'react';
import { useLocale } from '../../providers';

interface IncidentItem {
  id: string;
  title: string;
  severity: 'High' | 'Medium' | 'Low';
  status: 'Investigating' | 'Identified' | 'Monitoring' | 'Resolved';
}

export default function AdminIncidentsPage() {
  const { locale } = useLocale();
  const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';

  const [incidents] = useState<IncidentItem[]>([]);

  return (
    <div className="space-y-6 animate-fadeIn py-12 px-6">

      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-primary dark:text-surface tracking-tight">{t({ en: 'Active System Incidents', ar: 'الحوادث والتقارير الفنية النشطة' })}</h1>
        <p className="text-xs text-primary font-medium mt-0.5">{t({ en: 'SAQYN operations console. Track outages and runtime errors.', ar: 'شاشة العمليات لمتابعة الأعطال وتصحيح الأخطاء التشغيلية.' })}</p>
      </div>

      {/* Empty State */}
      <div className="bg-surface border border-primary/10 rounded-xl p-12 shadow-sm text-center">
        <p className="text-sm font-bold text-primary/60">{t({ en: 'No incidents reported.', ar: 'لم يتم الإبلاغ عن أي حوادث.' })}</p>
        <p className="text-xs text-primary/40 mt-2">{t({ en: 'Any system incidents will appear here.', ar: 'ستظهر أي حوادث نظام هنا.' })}</p>
      </div>

    </div>
  );
}
