'use client';

import { useLocale } from '../app/providers';

const languages = [
  { code: 'en', label: 'English', native: 'English' },
  { code: 'fr', label: 'French', native: 'Français' },
  { code: 'ar', label: 'Arabic', native: 'العربية' },
  { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
] as const;

export function LanguageSwitcher() {
  const { locale, setLocale } = useLocale();

  return (
    <select
      value={locale}
      onChange={(e) => setLocale(e.target.value)}
      aria-label="Select language"
      className="appearance-none bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-700 cursor-pointer hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#141F33] min-h-[36px] pr-7"
      style={{
        backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 20 20'%3E%3Cpath fill='%234B5563' fill-rule='evenodd' d='M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z' clip-rule='evenodd'/%3E%3C/svg%3E")`,
        backgroundPosition: 'right 0.5rem center',
        backgroundSize: '0.85rem',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {languages.map((item) => (
        <option key={item.code} value={item.code}>
          {item.native}
        </option>
      ))}
    </select>
  );
}
