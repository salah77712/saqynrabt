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
  const t = (en: string, ar: string) => (locale === 'ar' ? ar : en);

  return (
    <div className="flex flex-col items-center gap-6">
      <p className="text-xs font-extrabold tracking-widest text-[#718096] uppercase text-center">
        {t('Engineered for Qatar & Middle East Operations — Select Your Industry', 'مصمم خصيصًا للعمليات في قطر والشرق الأوسط - اختر قطاعك')}
      </p>

      <div className="w-full flex flex-wrap justify-center gap-4 py-2">
        {industryList.map((ind) => (
          <button
            key={ind.id}
            onClick={() => onChange(ind.id)}
            className={`min-h-[44px] px-6 py-3 rounded-full border text-sm font-semibold transition-all hover:scale-[1.05] hover:border-[#141F33] cursor-pointer ${
              activeId === ind.id
                ? 'bg-[#141F33] text-white border-[#141F33] shadow-md dark:bg-royal'
                : 'bg-white text-[#141F33] border-gray-200 shadow-sm hover:shadow-md dark:bg-slate-800 dark:text-white dark:border-slate-700'
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
