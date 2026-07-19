'use client';

import React from 'react';
import { Phone } from 'lucide-react';
import { useLocale } from '../../providers';

type CallStatus = 'connected' | 'on_hold' | 'disconnected' | 'checking';

export default function VoicePage() {
const { locale } = useLocale();
const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';
const [callStatus, setCallStatus] = React.useState<CallStatus>('checking');

const isVoiceActivated = process.env.NEXT_PUBLIC_VOICE_AI_ACTIVATED === 'true';

React.useEffect(() => {
  if (!isVoiceActivated) return;

  let mounted = true;
  const poll = async () => {
    try {
      const res = await fetch('/api/voice/stream?text=status');
      if (res.status === 200) {
        if (mounted) setCallStatus('connected');
      } else if (res.status === 503) {
        if (mounted) setCallStatus('on_hold');
      } else {
        if (mounted) setCallStatus('disconnected');
      }
    } catch {
      if (mounted) setCallStatus('disconnected');
    }
  };
  poll();
  const interval = setInterval(poll, 5_000);
  return () => { mounted = false; clearInterval(interval); };
}, [isVoiceActivated]);

if (!isVoiceActivated) {
return (
<main id="main-content" className="flex flex-col items-center justify-center min-h-[300px] text-center gap-8 animate-fadeIn" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
<Phone className="w-12 h-12 text-primary/30" />
<h1 className="text-lg font-bold text-primary dark:text-surface">
{t({ en: 'Voice Calls Not Enabled', ar: 'Ù…ÙƒØ§Ù„Ù…Ø§Øª Ø§Ù„ØµÙˆØª ØºÙŠØ± Ù…ÙØ¹Ù„Ø©' })}
</h1>
<p className="text-sm text-primary max-w-sm">
{t({ en: 'Contact your admin to enable Voice AI for this workspace.', ar: 'ØªÙˆØ§ØµÙ„ Ù…Ø¹ Ù…Ø³Ø¤ÙˆÙ„ Ø§Ù„Ù†Ø¸Ø§Ù… Ù„ØªÙØ¹ÙŠÙ„ Ø§Ù„Ø°ÙƒØ§Ø¡ Ø§Ù„Ø§ØµØ·Ù†Ø§Ø¹ÙŠ Ø§Ù„ØµÙˆØªÙŠ ÙÙŠ Ù…Ø³Ø§Ø­Ø© Ø§Ù„Ø¹Ù…Ù„.' })}
</p>
</main>
);
}

const statusConfig: Record<CallStatus, { label: Record<string, string>; color: string; pulse: boolean }> = {
  connected: { label: { en: 'Connected â€” Voice AI Ready', ar: 'Ù…ØªØµÙ„ â€” Ø§Ù„Ø°ÙƒØ§Ø¡ Ø§Ù„ØµÙˆØªÙŠ Ø¬Ø§Ù‡Ø²' }, color: '#22C55E', pulse: true },
  on_hold: { label: { en: 'On Hold â€” TTS Service Unavailable', ar: 'Ù…Ø¹Ù„Ù‚ â€” Ø®Ø¯Ù…Ø© TTS ØºÙŠØ± Ù…ØªØ§Ø­Ø©' }, color: '#F59E0B', pulse: false },
  disconnected: { label: { en: 'Disconnected â€” No Active Call', ar: 'ØºÙŠØ± Ù…ØªØµÙ„ â€” Ù„Ø§ ØªÙˆØ¬Ø¯ Ù…ÙƒØ§Ù„Ù…Ø© Ù†Ø´Ø·Ø©' }, color: '#EF4444', pulse: false },
  checking: { label: { en: 'Checking Service Status...', ar: 'Ø¬Ø§Ø± Ø§Ù„ØªØ­Ù‚Ù‚ Ù…Ù† Ø­Ø§Ù„Ø© Ø§Ù„Ø®Ø¯Ù…Ø©...' }, color: '#6B7280', pulse: false },
};

const cfg = statusConfig[callStatus];

return (
<main id="main-content" className="mx-auto space-y-6 animate-fadeIn" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
<div className="border-b border-primary/10 dark:border-primary pb-6">
<h1 className="text-2xl md:text-3xl font-extrabold text-primary dark:text-surface tracking-tight">{t({ en: 'Voice Calls', ar: 'Ù…Ø±ÙƒØ² ØªÙˆØ²ÙŠØ¹ Ø§Ù„ØµÙˆØª' })}</h1>
<p className="text-sm text-primary mt-1">
{t({ en: 'Monitor live calls and read transcripts as they happen.', ar: 'Ù…Ø±Ø§Ù‚Ø¨Ø© Ø§Ù„Ù…ÙƒØ§Ù„Ù…Ø§Øª Ø§Ù„ØµÙˆØªÙŠØ© Ø§Ù„Ù†Ø´Ø·Ø© ÙˆØ¨Ø« Ù†ØµÙˆØµ Ø§Ù„Ù…ØªØµÙ„ÙŠÙ† Ù…Ø¨Ø§Ø´Ø±Ø© Ø¥Ù„Ù‰ Ù„ÙˆØ­Ø© Ø§Ù„ØªØ­ÙƒÙ….' })}
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
{t({ en: 'Live call status refreshes every 5 seconds. Status reflects the current voice AI service health.', ar: 'ÙŠØªÙ… ØªØ­Ø¯ÙŠØ« Ø­Ø§Ù„Ø© Ø§Ù„Ù…ÙƒØ§Ù„Ù…Ø© Ø§Ù„Ù…Ø¨Ø§Ø´Ø±Ø© ÙƒÙ„ 5 Ø«ÙˆØ§Ù†Ù. ÙŠØ¹ÙƒØ³ Ø§Ù„Ø­Ø§Ù„Ø© Ø§Ù„ØµØ­ÙŠØ© Ø§Ù„Ø­Ø§Ù„ÙŠØ© Ù„Ø®Ø¯Ù…Ø© Ø§Ù„Ø°ÙƒØ§Ø¡ Ø§Ù„ØµÙˆØªÙŠ.' })}
</p>
</div>
</main>
);
}