'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLocale } from '../providers';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { PricingCards } from '../../components/PricingCards';
import { Check, Zap, MessageSquare } from 'lucide-react';
import { AUTOMATION_TIERS, CHATBOT_TIERS } from '../../lib/pricing-config';
import { RainbowButton } from '@/components/shadcn/rainbow-button';

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
    <div className="bg-white min-h-screen flex flex-col font-sans" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <Header />

      <section className="bg-gradient-to-b from-slate-50 to-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="inline-block bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
            {t({ en: 'Pricing', ar: 'الأسعار' })}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-primary leading-tight max-w-3xl mx-auto">
            {t({ en: 'Pricing that grows with you', ar: 'أسعار تنمو معك' })}
          </h1>
          <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto">
            {t({ en: 'Pick the product and plan that fits. No lock-in contracts.', ar: 'اختر المنتج والخطة المناسبة. بدون عقود إلزامية.' })}
          </p>
        </div>
      </section>

      <div className="bg-emerald-50 border-y border-emerald-200 py-4 px-6 text-center">
        <p className="text-emerald-700 font-semibold text-sm">
          <span><Check className="w-4 h-4 text-emerald-600 inline" /> {t({ en: 'No surprise bills. Everything\'s fixed monthly. Overages only if you want them.', ar: 'لا فواتير مفاجئة. سعر شهري ثابت. الاستخدام الزائد فقط إذا فعّلته.' })}</span>
        </p>
      </div>

      {/* Product Tabs + Currency Toggle */}
      <section className="py-10 bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Product Tabs */}
          <div className="flex bg-slate-100 rounded-xl p-1 gap-1">
            <button
              type="button"
              onClick={() => setProductTab('automation')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold transition-all ${
                productTab === 'automation' ? 'bg-white text-navy shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <Zap className={`w-4 h-4 ${productTab === 'automation' ? 'text-royal' : 'text-slate-500'}`} />
              {t({ en: 'Business Automation', ar: 'أتمتة الأعمال' })}
            </button>
            <button
              type="button"
              onClick={() => setProductTab('chatbot')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold transition-all ${
                productTab === 'chatbot' ? 'bg-white text-navy shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <MessageSquare className={`w-4 h-4 ${productTab === 'chatbot' ? 'text-royal' : 'text-slate-500'}`} />
              {t({ en: 'Internal Chatbot', ar: 'المساعد الداخلي' })}
            </button>
          </div>

          {/* Currency Toggle */}
          <div className="flex items-center gap-4">
            <span className={`text-xs font-bold select-none ${currency === 'USD' ? 'text-navy' : 'text-slate-400'}`}>USD</span>
            <button
              type="button"
              onClick={() => setCurrency(currency === 'USD' ? 'QAR' : 'USD')}
              className={`relative w-14 h-7 rounded-full transition-colors ${
                currency === 'QAR' ? 'bg-navy' : 'bg-slate-300'
              }`}
            >
              <span
                className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow-sm transition-all ${
                  currency === 'QAR' ? 'ltr:right-1 rtl:left-1' : 'ltr:left-1 rtl:right-1'
                }`}
              />
            </button>
            <span className={`text-xs font-bold select-none ${currency === 'QAR' ? 'text-navy' : 'text-slate-400'}`}>QAR</span>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6">
          <PricingCards tiers={activeTiers} currency={currency} locale={locale} />
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold text-primary mb-4">
            {t({ en: 'Need a custom plan?', ar: 'هل تحتاج إلى خطة مخصصة؟' })}
          </h2>
          <p className="text-slate-500 mb-8">
            {t({ en: 'Enterprise pricing, dedicated infrastructure, custom SLAs, and tailored onboarding for larger teams.', ar: 'أسعار المؤسسات، بنية تحتية مخصصة، اتفاقيات مستوى خدمة مخصصة، وإعداد مصمم للفرق الأكبر.' })}
          </p>
          <RainbowButton asChild className="text-white">
            <Link href="/contact">
              {t({ en: 'Contact Sales', ar: 'اتصل بالمبيعات' })}
            </Link>
          </RainbowButton>
        </div>
      </section>

      <Footer />
    </div>
  );
}
