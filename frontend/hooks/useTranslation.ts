'use client';

import { useLocale } from '../app/providers';
import en from '../messages/en.json';
import ar from '../messages/ar.json';
import fr from '../messages/fr.json';
import hi from '../messages/hi.json';

type Messages = Record<string, any>;

const messages: Record<string, Messages> = { en, ar, fr, hi };

export function useTranslation() {
  const { locale } = useLocale();

  const t = (key: string, fallback?: string): string => {
    const keys = key.split('.');
    let value: any = messages[locale] || messages.en;
    for (const k of keys) {
      if (value == null) return fallback || key;
      value = value[k];
    }
    return typeof value === 'string' ? value : (fallback || key);
  };

  return { t, locale };
}
