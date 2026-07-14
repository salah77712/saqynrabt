'use client';

import React, { useState } from 'react';
import { useLocale } from '../app/providers';
import { AlertTriangle, X } from 'lucide-react';

export function AnomalyAlert() {
  const { locale } = useLocale();
  const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';

  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex justify-between items-center gap-4 animate-slideDown">
      <div className="flex items-center gap-2">
        <AlertTriangle className="w-5 h-5 text-amber-500" />
        <div>
          <p className="text-xs font-bold text-amber-800">{t({ en: 'Suspicious API Usage Spike Detected', ar: 'تم رصد قفزة مشبوهة في استخدام الـ API' })}</p>
          <p className="text-[10px] text-amber-600 font-semibold mt-0.5">
            {t({ en: 'API requests are 4x higher than standard thresholds. Review key credentials.', ar: 'طلبات الـ API أعلى بـ 4 أضعاف من المعدل الطبيعي. يرجى مراجعة مفاتيح الوصول.' })}
          </p>
        </div>
      </div>
      
      <button
        onClick={() => setVisible(false)}
        className="text-[10px] font-bold text-amber-600 hover:text-amber-800"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
