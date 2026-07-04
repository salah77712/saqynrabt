'use client';

import { useLocale } from '../app/providers';

const languages = [
  { code: 'en', label: 'EN' },
  { code: 'ar', label: 'العربية' },
] as const;

export function LanguageSwitcher() {
  const { locale, setLocale } = useLocale();

  return (
    <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-2 py-1 shadow-sm">
      {languages.map((item) => (
        <button
          key={item.code}
          onClick={() => setLocale(item.code)}
          className={`rounded-full px-3 py-1.5 text-sm font-semibold transition-all ${
            locale === item.code
              ? 'bg-primary text-white'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
