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
<p className="text-xs font-bold text-primary dark:text-surface">{t({ en: 'Suspicious API Usage Spike Detected', ar: 'ØªÙ… Ø±ØµØ¯ Ù‚ÙØ²Ø© Ù…Ø´Ø¨ÙˆÙ‡Ø© ÙÙŠ Ø§Ø³ØªØ®Ø¯Ø§Ù… Ø§Ù„Ù€ API' })}</p>
<p className="text-[10px] text-primary/60 dark:text-surface/60 font-semibold mt-0.5">
{t({ en: 'API requests are 4x higher than standard thresholds. Review key credentials.', ar: 'Ø·Ù„Ø¨Ø§Øª Ø§Ù„Ù€ API Ø£Ø¹Ù„Ù‰ Ø¨Ù€ 4 Ø£Ø¶Ø¹Ø§Ù Ù…Ù† Ø§Ù„Ù…Ø¹Ø¯Ù„ Ø§Ù„Ø·Ø¨ÙŠØ¹ÙŠ. ÙŠØ±Ø¬Ù‰ Ù…Ø±Ø§Ø¬Ø¹Ø© Ù…ÙØ§ØªÙŠØ­ Ø§Ù„ÙˆØµÙˆÙ„.' })}
</p>
</div>
</div>

<button
onClick={() => setVisible(false)}
className="text-[10px] font-bold text-accent hover:text-primary dark:hover:text-surface min-h-[44px] min-w-[44px] flex items-center justify-center"
>
<X className="w-4 h-4" />
</button>
</div>
);
}
