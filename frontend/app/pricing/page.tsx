'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLocale } from '../providers';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { PricingCards } from '../../components/PricingCards';
import { Check, Zap, MessageSquare } from 'lucide-react';
import { AUTOMATION_TIERS, CHATBOT_TIERS } from '../../lib/pricing-config';

type Currency = 'USD' | 'QAR';
type ProductTab = 'automation' | 'chatbot';

const GULF_TZ_KEYWORDS = ['Doha', 'Riyadh', 'Kuwait', 'Dubai', 'Cairo', 'Bahrain', 'Muscat', 'Baghdad', 'Damascus'];

export default function PricingPage() {
const { locale } = useLocale();
const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';

const [currency, setCurrency] = useState<Currency>('USD');
const [productTab, setProductTab] = useState<ProductTab>('automation');

useEffect(() => {
try {
const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
if (GULF_TZ_KEYWORDS.some((k) => tz.includes(k))) {
setCurrency('QAR');
}
} catch {}
}, []);

const activeTiers = productTab === 'automation' ? AUTOMATION_TIERS : CHATBOT_TIERS;

return (
<div className="bg-[#F8F9FB] min-h-screen flex flex-col font-sans" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
<Header />

<section className="bg-[#F8F9FB] py-20 md:py-28">
<div className="max-w-7xl mx-auto px-6 text-center">
<span className="inline-block bg-[#141F33]/10 text-[#141F33] text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
{t({ en: 'Pricing', ar: 'الأسعار' })}
</span>
<h1 className="text-4xl md:text-5xl font-bold text-[#141F33] leading-tight max-w-3xl mx-auto">
{t({ en: 'Pricing that grows with you', ar: 'أسعار تنمو معك' })}
</h1>
<p className="mt-4 text-lg text-[#141F33] max-w-2xl mx-auto">
{t({ en: 'Pick the product and plan that fits. No lock-in contracts.', ar: 'اختر المنتج والخطة المناسبة. بدون عقود إلزامية.' })}
</p>
</div>
</section>

<div className="bg-[#141F33]/10 border-y border-[#141F33]/20 py-4 px-6 text-center">
<p className="text-[#141F33] font-semibold text-sm">
<span><Check className="w-4 h-4 text-[#2A5CFF] inline" /> {t({ en: 'No surprise bills. Everything\'s fixed monthly. Overages only if you want them.', ar: 'لا فواتير مفاجئة. سعر شهري ثابت. الاستخدام الزائد فقط إذا فعّلته.' })}</span>
</p>
</div>

{/* Product Tabs + Currency Toggle */}
<section className="bg-[#F8F9FB] py-10 border-b border-[#141F33]/10">
<div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
{/* Product Tabs */}
<div className="flex bg-[#F8F9FB] rounded-xl p-1 gap-1">
<button
type="button"
onClick={() => setProductTab('automation')}
className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-xs font-bold transition-all duration-300 hover:shadow-md hover:scale-[1.02] active:scale-95 ${productTab === 'automation' ? 'bg-[#F8F9FB] text-[#141F33] shadow-sm' : 'text-[#141F33] hover:text-[#141F33]'}`}
>
<Zap className={`w-4 h-4 ${productTab === 'automation' ? 'text-[#2A5CFF]' : 'text-[#141F33]'}`} />
{t({ en: 'Business Automation', ar: 'أتمتة الأعمال' })}
</button>
<button
type="button"
onClick={() => setProductTab('chatbot')}
className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-xs font-bold transition-all duration-300 hover:shadow-md hover:scale-[1.02] active:scale-95 ${productTab === 'chatbot' ? 'bg-[#F8F9FB] text-[#141F33] shadow-sm' : 'text-[#141F33] hover:text-[#141F33]'}`}
>
<MessageSquare className={`w-4 h-4 ${productTab === 'chatbot' ? 'text-[#2A5CFF]' : 'text-[#141F33]'}`} />
{t({ en: 'Internal Chatbot', ar: 'المساعد الداخلي' })}
</button>
</div>

{/* Currency Toggle */}
<div className="flex items-center gap-4">
<span className={`text-xs font-bold select-none ${currency === 'USD' ? 'text-[#141F33]' : 'text-[#141F33]/60'}`}>USD</span>
<button
type="button"
onClick={() => setCurrency(currency === 'USD' ? 'QAR' : 'USD')}
className={`relative w-14 h-7 min-h-0 rounded-full transition-colors ${currency === 'QAR' ? 'bg-[#141F33]' : 'bg-[#F8F9FB]'}`}
>
<span
className={`absolute top-1 w-5 h-5 bg-[#F8F9FB] rounded-full shadow-sm transition-all ${currency === 'QAR' ? 'ltr:right-1 rtl:left-1' : 'ltr:left-1 rtl:right-1'}`}
/>
</button>
<span className={`text-xs font-bold select-none ${currency === 'QAR' ? 'text-[#141F33]' : 'text-[#141F33]/60'}`}>QAR</span>
</div>
</div>
</section>

{/* Pricing Cards */}
<section className="py-16">
<div className="max-w-5xl mx-auto px-6">
<PricingCards tiers={activeTiers} currency={currency} locale={locale} />
</div>
</section>

<section className="bg-[#F8F9FB] py-16">
<div className="max-w-3xl mx-auto px-6 text-center">
<h2 className="text-2xl font-bold text-[#141F33] mb-4">
{t({ en: 'Need a custom plan?', ar: 'هل تحتاج إلى خطة مخصصة؟' })}
</h2>
<p className="text-[#141F33] mb-8">
{t({ en: 'Enterprise pricing, dedicated infrastructure, custom SLAs, and tailored onboarding for larger teams.', ar: 'أسعار المؤسسات، بنية تحتية مخصصة، اتفاقيات مستوى خدمة مخصصة، وإعداد مصمم للفرق الأكبر.' })}
</p>
<Link 
  href="/contact"
  className="btn-primary py-3 px-6 rounded-xl text-xs font-bold min-h-[44px]"
>
  {t({ en: 'Contact Sales', ar: 'اتصل بالمبيعات' })}
</Link>
</div>
</section>

<Footer />
</div>
);
}
