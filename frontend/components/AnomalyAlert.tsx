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
<div className="bg-surface dark:bg-primary border border-accent/20 rounded-xl p-4 flex justify-between items-center gap-8 animate-slideDown">
<div className="flex items-center gap-3">
<AlertTriangle className="w-5 h-5 text-accent" />
<div>
<p className="text-xs font-bold text-primary dark:text-surface">{t({ en: 'Suspicious API Usage Spike Detected', ar: 'تم رصد قفزة مشبوهة في استخدام الـ API' })}</p>
<p className="text-xs text-primary/60 dark:text-surface/60 font-semibold mt-0.5">
{t({ en: 'API requests are 4x higher than standard thresholds. Review key credentials.', ar: 'طلبات الـ API أعلى بـ 4 أضعاف من المعدل الطبيعي. يرجى مراجعة مفاتيح الوصول.' })}
</p>
</div>
</div>

<button
onClick={() => setVisible(false)}
className="text-xs font-bold text-accent hover:text-primary dark:hover:text-surface min-h-[44px] min-w-[44px] flex items-center justify-center"
>
<X className="w-4 h-4" />
</button>
</div>
);
}
