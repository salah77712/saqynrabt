import { useLocale } from '@/app/providers';
import messages from '@/messages/en.json';

type Messages = typeof messages;

type TranslationArg = string | Record<string, string>;

export function useT() {
  const { locale } = useLocale();

  function t(arg: TranslationArg): string;
  function t(key: string, fallback?: string): string;
  function t(arg: TranslationArg | string, fallback?: string): string {
    if (typeof arg === 'object' && arg !== null) {
      return arg[locale] || arg.en || fallback || '';
    }

    const keys = (arg as string).split('.');
    let value: any = messages;
    for (const k of keys) {
      if (value == null) return fallback || (arg as string);
      value = (value as any)[k];
    }
    return typeof value === 'string' ? value : (fallback || (arg as string));
  }

  return { t, locale };
}
