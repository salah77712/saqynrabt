'use client';

import React from 'react';
import { useLocale } from '../../providers';

export default function AdminMetricsPage() {
  const { locale } = useLocale();
  const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-primary">{t({ en: 'Real-Time Health & Metrics Telemetry', ar: 'مؤشرات الصحة والأداء الفوري للشبكة' })}</h1>
        <p className="text-xs text-primary/60 font-medium mt-0.5">{t({ en: 'Expose live container status, connection pools, and downstream response delays.', ar: 'عرض حالة الحاوية الفورية، تجمعات الاتصال، وتأخير استجابة OpenAI.' })}</p>
      </div>

      {/* Empty State */}
      <div className="bg-surface border border-primary/10 rounded-xl p-12 shadow-sm text-center">
        <p className="text-sm font-bold text-primary/60">{t({ en: 'No metrics data yet — we are in pilot phase.', ar: 'لا توجد بيانات مقاييس بعد — نحن في المرحلة التجريبية.' })}</p>
        <p className="text-xs text-primary/40 mt-2">{t({ en: 'Real-time telemetry will appear once the platform has active traffic.', ar: 'ستظهر المقاييس الفورية بعد وجود حركة مرور نشطة على المنصة.' })}</p>
      </div>

    </div>
  );
}
