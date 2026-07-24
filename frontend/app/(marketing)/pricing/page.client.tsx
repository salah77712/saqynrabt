'use client';

import { useState } from 'react';
import { useLocale } from '@/app/providers';
import { AUTOMATION_TIERS, CHATBOT_TIERS } from '@/lib/pricing-config';
import { PricingCards } from '@/components/PricingCards';
import Link from 'next/link';

export default function PricingPage() {
  const { locale } = useLocale();
  const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';
  const currency = 'QAR';

  const [activeTab, setActiveTab] = useState<'voice' | 'chat'>('voice');

  return (
    <div className="bg-surface text-primary min-h-screen flex flex-col font-sans">
      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-24 text-center">

        {/* Pricing Header */}
        <div className="mb-16">
          <span className="inline-block bg-primary/5 border border-primary/15 text-primary text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
            {t({ en: 'Transparent Pricing', ar: 'أسعار شفافة' })}
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-primary tracking-tight leading-tight max-w-2xl mx-auto">
            {t({ en: 'Pick the plan that fits your business scale', ar: 'اختر الخطة التي تناسب حجم عملك' })}
          </h1>
          <p className="mt-4 text-xs md:text-sm text-primary/60 font-semibold max-w-xl mx-auto">
            {t({ en: 'Simple monthly flat rates. Setup fees apply for direct hotline trunk provisioning and DB mapping.', ar: 'أسعار شهرية ثابتة. تطبق رسوم الإعداد لتوفير الخط الساخن المباشر وربط قاعدة البيانات.' })}
          </p>
        </div>

        {/* Product Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-primary/5 p-1 rounded-full border border-primary/10">
            <button
              onClick={() => setActiveTab('voice')}
              className={`px-6 py-2.5 rounded-full text-xs font-bold transition-all duration-200 min-h-[44px] ${
                activeTab === 'voice'
                  ? 'bg-primary text-surface shadow-sm'
                  : 'text-primary hover:text-primary/80'
              }`}
            >
              {t({ en: 'Voice Automation', ar: 'الأتمتة الصوتية' })}
            </button>
            <button
              onClick={() => setActiveTab('chat')}
              className={`px-6 py-2.5 rounded-full text-xs font-bold transition-all duration-200 min-h-[44px] ${
                activeTab === 'chat'
                  ? 'bg-primary text-surface shadow-sm'
                  : 'text-primary hover:text-primary/80'
              }`}
            >
              {t({ en: 'Staff Knowledge Hub', ar: 'مركز معرفة الموظفين' })}
            </button>
          </div>
        </div>

        {/* Pricing Cards from pricing-config.ts */}
        <PricingCards
          tiers={activeTab === 'voice' ? AUTOMATION_TIERS : CHATBOT_TIERS}
          currency={currency}
          locale={locale}
        />

        {/* Enterprise Bundle Section */}
<h2 className="text-2xl md:text-3xl font-bold text-primary mb-8">Enterprise Bundle</h2>
        <div className="mt-20">
          <div className="bg-background border border-primary/10 rounded-2xl p-10 max-w-3xl mx-auto relative ring-2 ring-accent">
            <div className="absolute -top-3 start-1/2 -translate-x-1/2 bg-accent text-surface text-xs font-extrabold tracking-widest px-4 py-1.5 rounded-full uppercase shadow-sm">
              {t({ en: 'Recommended', ar: 'مُوصى به' })}
            </div>

            <h3 className="text-2xl font-extrabold text-primary mt-4">
              {t({ en: 'SAQYN RABT Enterprise Bundle', ar: 'الحزمة المتكاملة للمؤسسات' })}
            </h3>
            <p className="text-xs text-primary/60 font-bold uppercase tracking-wider mt-1 mb-6">
              {t({ en: 'Voice Automation + Staff Knowledge Hub', ar: 'الأتمتة الصوتية + مركز معرفة الموظفين' })}
            </p>

            <div className="text-4xl font-extrabold text-primary mb-2">
              {t({ en: 'Custom Quote', ar: 'عرض سعر مخصص' })}
            </div>
            <p className="text-xs text-primary/50 font-bold uppercase tracking-wider mb-8">
              {t({ en: 'Enterprise scale integrations & dedicated support', ar: 'تكاملات على مستوى المؤسسات ودعم مخصص' })}
            </p>

            <ul className="space-y-4 max-w-md mx-auto mb-10 text-left">
              {[
                t({ en: 'Synthetiq Voice + Synthetiq Work', ar: 'الوكيل الصوتي + مساعد المعرفة' }),
                t({ en: 'Dedicated Integration Success Manager', ar: 'مدير نجاح تكامل مخصص' }),
                t({ en: 'Bespoke Database & SSO Custom Link', ar: 'ربط قاعدة بيانات مخصص ودخول موحد SSO' }),
              ].map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3 text-xs font-semibold text-primary/80">
                  <svg className="w-4 h-4 text-accent shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/contact"
              className="inline-block bg-primary hover:bg-primary/90 text-surface text-xs font-bold py-3.5 px-10 rounded-full transition-all duration-200 min-h-[44px] hover:scale-[1.02] hover:shadow-md active:scale-95"
            >
              {t({ en: 'Contact Enterprise Sales', ar: 'اتصل بقسم المؤسسات' })}
            </Link>
          </div>
        </div>

        {/* Bottom Notice */}
        <div className="bg-background border border-primary/10 rounded-xl p-6 shadow-sm mt-16 max-w-3xl mx-auto flex items-center justify-center gap-3">
          <span className="w-2 h-2 rounded-full bg-accent" />
          <span className="text-xs font-bold text-primary/60 uppercase tracking-wider">
            {t({ en: 'Work plan covers up to 150 employees. For 150+ employees, please contact us for an Enterprise quote.', ar: 'تغطي خطة العمل حتى 150 موظفاً. لأكثر من 150 موظفاً، يرجى الاتصال بنا للحصول على عرض سعر للمؤسسات.' })}
          </span>
        </div>

        {/* Compare CTA */}
        <div className="mt-10">
          <a
            href={process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/saqynrabt/demo'}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-primary hover:bg-primary/90 text-surface text-xs font-bold py-3.5 px-8 rounded-full transition-all duration-200 min-h-[44px] hover:scale-[1.02] hover:shadow-md active:scale-95"
          >
            {t({ en: 'Book a Demo to Compare Plans', ar: 'احجز عرضاً توضيحياً لمقارنة الخطط' })}
          </a>
        </div>

      </main>

    </div>
  );
}
