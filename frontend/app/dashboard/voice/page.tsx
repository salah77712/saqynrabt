'use client';

import { useState, useEffect } from 'react';
import { Phone } from 'lucide-react';
import { useLocale } from '../../providers';

type CallStatus = 'connected' | 'on_hold' | 'disconnected' | 'checking';

export default function VoicePage() {
  const { locale } = useLocale();
  const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';
  const [callStatus, setCallStatus] = useState<CallStatus>('checking');
  const [pollError, setPollError] = useState(false);

  const isVoiceActivated = process.env.NEXT_PUBLIC_VOICE_AI_ACTIVATED === 'true';

  useEffect(() => {
    if (!isVoiceActivated) return;

    let mounted = true;
    const poll = async () => {
      try {
        const res = await fetch('/api/voice/stream?text=status');
        if (res.status === 200) {
          if (mounted) { setCallStatus('connected'); setPollError(false); }
        } else if (res.status === 503) {
          if (mounted) { setCallStatus('on_hold'); setPollError(false); }
        } else {
          if (mounted) { setCallStatus('disconnected'); setPollError(false); }
        }
      } catch {
        if (mounted) { setCallStatus('disconnected'); setPollError(true); }
      }
    };
    poll();
    const interval = setInterval(poll, 5_000);
    return () => { mounted = false; clearInterval(interval); };
  }, [isVoiceActivated]);

if (!isVoiceActivated) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] text-center gap-8 animate-fadeIn">
      <Phone className="w-12 h-12 text-primary/30" />
      <h1 className="text-lg font-bold text-primary dark:text-surface">
        {t({ en: 'Voice Calls Not Enabled', ar: 'مكالمات الصوت غير مفعلة' })}
      </h1>
      <p className="text-sm text-primary max-w-sm">
        {t({ en: 'Contact your admin to enable Voice AI for this workspace.', ar: 'تواصل مع مسؤول النظام لتفعيل الذكاء الاصطناعي الصوتي في مساحة العمل.' })}
      </p>
    </div>
  );
}

const statusConfig: Record<CallStatus, { label: Record<string, string>; color: string; pulse: boolean }> = {
  connected: { label: { en: 'Connected — Voice AI Ready', ar: 'متصل — الذكاء الصوتي جاهز' }, color: '#22C55E', pulse: true },
  on_hold: { label: { en: 'On Hold — TTS Service Unavailable', ar: 'معلق — خدمة TTS غير متاحة' }, color: '#F59E0B', pulse: false },
  disconnected: { label: { en: 'Disconnected — No Active Call', ar: 'غير متصل — لا توجد مكالمة نشطة' }, color: '#EF4444', pulse: false },
  checking: { label: { en: 'Checking Service Status...', ar: 'جار التحقق من حالة الخدمة...' }, color: '#6B7280', pulse: false },
};

const cfg = statusConfig[callStatus];

return (
  <div className="mx-auto space-y-6 animate-fadeIn">
<div className="border-b border-primary/10 dark:border-primary pb-6">
<h1 className="text-2xl md:text-3xl font-extrabold text-primary dark:text-surface tracking-tight">{t({ en: 'Voice Calls', ar: 'مركز توزيع الصوت' })}</h1>
<p className="text-sm text-primary mt-1">
{t({ en: 'Monitor live calls and read transcripts as they happen.', ar: 'مراقبة المكالمات الصوتية النشطة وبث نصوص المتصلين مباشرة إلى لوحة التحكم.' })}
</p>
</div>

<div className="bg-surface dark:bg-primary border border-primary/10 dark:border-primary p-8 rounded-xl text-center gap-6 animate-fadeIn flex flex-col items-center">
<Phone className="w-10 h-10 mx-auto" style={{ color: cfg.color }} />
<span className="relative flex h-3 w-3 mx-auto">
{cfg.pulse && (
<span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: cfg.color }} />
)}
<span className="relative inline-flex rounded-full h-3 w-3" style={{ backgroundColor: cfg.color }} />
</span>
<h2 className="text-sm font-semibold text-primary dark:text-surface">{t(cfg.label)}</h2>
<p className="text-xs text-primary max-w-sm mx-auto">
{t({ en: 'Live call status refreshes every 5 seconds. Status reflects the current voice AI service health.', ar: 'يتم تحديث حالة المكالمة المباشرة كل 5 ثوانٍ. يعكس الحالة الصحية الحالية لخدمة الذكاء الصوتي.' })}
</p>

{pollError && (
<div className="bg-surface border border-primary/10 rounded-xl p-4 text-xs text-primary text-center">
{t({ en: 'Could not reach voice service. Retrying automatically...', ar: 'تعذر الوصول إلى خدمة الصوت. جاري إعادة المحاولة تلقائياً...' })}
</div>
)}
</div>
</div>
  );
}