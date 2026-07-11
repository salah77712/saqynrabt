'use client';

import Link from 'next/link';
import { useLocale } from '../providers';
import { MarketingHeader } from '../../components/MarketingHeader';
import { Footer } from '../../components/Footer';
import { PricingCards } from '../../components/PricingCards';
import { CheckIcon, PhoneIcon, ArrowRightIcon } from '../../components/ui/Icons';
import { PRICING_TIERS } from '../../lib/pricing-config';

export default function PricingPage() {
  const { locale } = useLocale();
  const t = (obj: Record<string, string>) => locale === 'ar' ? obj.ar : obj.en;
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/saqynrabt/demo';

  return (
    <div className="bg-white min-h-screen flex flex-col font-sans" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <MarketingHeader />

      <section className="bg-gradient-to-b from-slate-50 to-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="inline-block bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
            {t({ en: 'Pricing', ar: 'الأسعار' })}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-primary leading-tight max-w-3xl mx-auto">
            {t({ en: 'Transparent Pricing for Every Business', ar: 'أسعار شفافة لكل الأعمال' })}
          </h1>
          <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto">
            {t({ en: 'Three tiers. Unlimited potential. No hidden fees.', ar: 'ثلاث خطط. إمكانيات غير محدودة. لا رسوم خفية.' })}
          </p>
        </div>
      </section>

      <div className="bg-emerald-50 border-y border-emerald-200 py-4 px-6 text-center">
        <p className="text-emerald-700 font-semibold text-sm">
          <span><CheckIcon className="w-4 h-4 text-emerald-600 inline" /> {t({ en: 'No surprise bills. Fixed monthly price. Overages only if you enable them.', ar: 'لا فواتير مفاجئة. سعر شهري ثابت. الاستخدام الزائد فقط إذا فعّلته.' })}</span>
        </p>
      </div>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-8 pb-4 border-b-2 border-blue-600">
            <PhoneIcon className="w-6 h-6 text-slate-600" />
            <div>
              <h2 className="text-xl font-extrabold text-primary">
                {t({ en: 'Platform Pricing', ar: 'أسعار المنصة' })}
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                {t({ en: 'Call automation, chatbot RAG, and team management.', ar: 'أتمتة المكالمات، المساعد الذكي RAG، وإدارة الفريق.' })}
              </p>
            </div>
            <Link href="/features" className="ml-auto text-xs text-blue-600 font-semibold hover:underline whitespace-nowrap">
              {t({ en: 'View features', ar: 'عرض الميزات' })} <ArrowRightIcon className="w-3.5 h-3.5 inline" />
            </Link>
          </div>
          <PricingCards tiers={PRICING_TIERS} />
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
          <Link
            href="/contact"
            className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white hover:opacity-90 transition-all"
          >
            {t({ en: 'Contact Sales', ar: 'اتصل بالمبيعات' })}
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
