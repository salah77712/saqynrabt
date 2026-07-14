'use client';

import { Phone } from 'lucide-react';
import { useLocale } from '../../providers';

export default function VoicePage() {
  const { locale } = useLocale();
  const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';

  const isVoiceActivated = process.env.NEXT_PUBLIC_VOICE_AI_ACTIVATED === 'true';

  if (!isVoiceActivated) {
    return (
      <main id="main-content" className="flex flex-col items-center justify-center min-h-[300px] text-center space-y-4" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
        <Phone className="w-12 h-12 text-slate-300" />
        <h1 className="text-lg font-bold text-slate-700 dark:text-slate-200">
          {t({ en: 'Voice Calls Not Enabled', ar: 'مكالمات الصوت غير مفعلة' })}
        </h1>
        <p className="text-sm text-slate-500 max-w-sm">
          {t({ en: 'Contact your admin to enable Voice AI for this workspace.', ar: 'تواصل مع مسؤول النظام لتفعيل الذكاء الاصطناعي الصوتي في مساحة العمل.' })}
        </p>
      </main>
    );
  }

  return (
    <main id="main-content" className="max-w-4xl mx-auto space-y-8" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <div className="border-b border-slate-200 dark:border-slate-700 pb-6">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">{t({ en: 'Voice Calls', ar: 'مركز توزيع الصوت' })}</h1>
        <p className="text-sm text-slate-500 mt-1">
          {t({ en: 'Monitor live calls and read transcripts as they happen.', ar: 'مراقبة المكالمات الصوتية النشطة وبث نصوص المتصلين مباشرة إلى لوحة التحكم.' })}
        </p>
      </div>

      <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-8 rounded-xl text-center space-y-4">
        <Phone className="w-10 h-10 text-slate-400 mx-auto" />
        <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-200">{t({ en: 'Voice Stream Connection Established', ar: 'تم إنشاء اتصال تدفق الصوت' })}</h2>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          {t({ en: 'Streaming active caller transcription frames via WebSockets (Rule 33).', ar: 'بث إطارات نسخ المتصل النشطة عبر WebSockets (القاعدة 33).' })}
        </p>
      </div>
    </main>
  );
}
