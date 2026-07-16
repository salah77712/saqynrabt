'use client';

import * as React from 'react';
import { useLocale } from '../app/providers';
import { industryList, IndustryCopy } from '../lib/industryCopy';

interface IndustrySwitcherProps {
activeId: string;
onChange: (id: string) => void;
}

export function IndustrySwitcher({ activeId, onChange }: IndustrySwitcherProps) {
const { locale } = useLocale();
const t = (en: string, ar: string) => locale === 'ar' ? (ar || en) : en;

return (
<div className="flex flex-col items-center gap-8">
<p className="text-xs font-extrabold tracking-widest text-[#141F33]/60 dark:text-[#F8F9FB]/60 uppercase text-center">
{t('Engineered for Global Operations — Select Your Industry', 'مصمم خصيصًا للعمليات العالمية - اختر قطاعك')}
</p>

<div className="w-full flex flex-wrap justify-center gap-8 py-2">
{industryList.map((ind) => (
<button
key={ind.id}
onClick={() => onChange(ind.id)}
className={`min-h-[44px] px-6 py-3 rounded-xl border text-xs font-bold transition-all hover:shadow-md hover:scale-[1.02] active:scale-95 cursor-pointer ${
activeId === ind.id
? 'bg-[#141F33] text-[#F8F9FB] border-[#141F33] dark:border-[#F8F9FB] shadow-md dark:bg-[#2A5CFF]'
: 'bg-[#F8F9FB] text-[#141F33] border-[#141F33]/10 shadow-sm hover:shadow-md dark:bg-[#141F33] dark:text-[#F8F9FB] dark:border-[#141F33]/30'
}`}
>
{locale === 'ar' && ind.id === 'default' ? 'كل القطاعات' : ind.label}
</button>
))}
</div>
</div>
);
}
export default IndustrySwitcher;
