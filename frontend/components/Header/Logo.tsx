import * as React from 'react';
import Link from 'next/link';
import { useLocale } from '../../app/providers';

export function Logo() {
  const { locale } = useLocale();
  const t = (en: string, ar: string) => (locale === 'ar' ? ar : en);

  return (
    <Link
      href="/"
      className="flex items-center gap-3 group select-none"
      aria-label="SAQYN RABT home"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#141F33] dark:bg-royal text-sm font-bold text-white shadow-sm group-hover:scale-105 transition-transform">
        S
      </div>
      <div>
        <p className="text-sm font-extrabold tracking-[0.15em] text-[#141F33] dark:text-white group-hover:text-royal transition-colors">
          SAQYN RABT
        </p>
        <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-bold mt-0.5">
          {t('Private AI Ops', 'عمليات AI خاصة')}
        </p>
      </div>
    </Link>
  );
}
