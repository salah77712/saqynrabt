'use client';

import { useLocale } from '../../providers';
import { PhoneIcon } from '../../../components/ui/Icons';

export default function VoicePage() {
  const { locale } = useLocale();
  const t = (obj: Record<string, string>) => locale === 'ar' ? obj.ar : obj.en;

  const isVoiceActivated = process.env.NEXT_PUBLIC_VOICE_AI_ACTIVATED === 'true';

  if (!isVoiceActivated) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <div className="border-b border-dark-700 pb-6">
        <h1 className="text-2xl font-bold text-white">{t({en: 'Voice Calls', ar: 'مركز توزيع الصوت'})}</h1>
        <p className="text-sm text-slate-400 mt-1">
          {t({en: 'Monitor live calls and read transcripts as they happen.', ar: 'مراقبة المكالمات الصوتية النشطة وبث نصوص المتصلين مباشرة إلى لوحة التحكم.'})}
        </p>
      </div>

      <div className="bg-dark-800 border border-dark-700 p-8 rounded-xl text-center space-y-4">
        <PhoneIcon className="w-10 h-10 text-slate-400 block mb-2" />
        <h3 className="text-sm font-semibold text-slate-200">{t({en: 'Voice Stream Connection Established', ar: 'تم إنشاء اتصال تدفق الصوت'})}</h3>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          {t({en: 'Streaming active caller transcription frames via WebSockets (Rule 33).', ar: 'بث إطارات نسخ المتصل النشطة عبر WebSockets (القاعدة 33).'})}
        </p>
      </div>
    </div>
  );
}
