'use client';

import React from 'react';
import { useLocale } from '../providers';
import Link from 'next/link';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { PartyPopper } from 'lucide-react';

export default function ThankYouPage() {
const { locale } = useLocale();
const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';

return (
<div className="bg-surface text-primary dark:text-surface min-h-screen flex flex-col font-sans" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
<Header />

<main className="flex-1 flex flex-col items-center justify-center py-24 px-6 text-center max-w-2xl mx-auto animate-fadeIn">

{/* Confetti SVG Icon */}
<div className="h-24 w-24 rounded-full bg-primary flex items-center justify-center mb-8 animate-bounce shadow-sm">
<PartyPopper className="w-12 h-12 text-accent" />
</div>

<span className="text-xs font-extrabold tracking-widest text-accent uppercase">{t({ en: 'Submission Received', ar: 'ØªÙ… Ø§Ø³ØªÙ„Ø§Ù… Ø§Ù„Ø·Ù„Ø¨' })}</span>

<h1 className="text-4xl lg:text-5xl font-extrabold text-primary dark:text-surface leading-tight tracking-tight mt-3">
{t({ en: "We'll be in touch shortly.", ar: 'Ø³Ù†ØªÙˆØ§ØµÙ„ Ù…Ø¹Ùƒ Ù‚Ø±ÙŠØ¨Ù‹Ø§.' })}
</h1>

<p className="text-sm font-semibold text-primary/70 mt-4 leading-relaxed max-w-md mx-auto">
{t({
en: 'A member of the SAQYN RABT team will contact you within 24 hours to schedule your customized operational workflow demo.',
ar: 'Ø³ÙŠØªØµÙ„ Ø¨Ùƒ Ù…Ù…Ø«Ù„ Ù…Ù† ÙØ±ÙŠÙ‚ SAQYN RABT Ø®Ù„Ø§Ù„ 24 Ø³Ø§Ø¹Ø© Ù„Ø¬Ø¯ÙˆÙ„Ø© Ø§Ù„Ø¹Ø±Ø¶ Ø§Ù„ØªÙˆØ¶ÙŠØ­ÙŠ Ø§Ù„Ù…Ø®ØµØµ Ù„Ø³ÙŠØ± Ø§Ù„Ø¹Ù…Ù„ Ø§Ù„Ø®Ø§Øµ Ø¨Ùƒ.'
})}
</p>

<div className="mt-10 flex gap-8">
<Link
href="/"
className="btn-primary text-xs"
>
{t({ en: 'Back to Home', ar: 'Ø§Ù„Ø¹ÙˆØ¯Ø© Ù„Ù„Ø±Ø¦ÙŠØ³ÙŠØ©' })}
</Link>
<Link
href="/dashboard"
className="btn-secondary text-xs"
>
{t({ en: 'Explore Dashboard', ar: 'Ø§Ø³ØªÙƒØ´Ù Ù„ÙˆØ­Ø© Ø§Ù„ØªØ­ÙƒÙ…' })}
</Link>
</div>

</main>

<Footer />
</div>
);
}
