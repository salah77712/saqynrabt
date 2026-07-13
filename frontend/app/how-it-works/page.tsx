'use client';

import * as React from 'react';
import { useLocale } from '../providers';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { GlobeIcon, ClockIcon, DollarIcon, BoxIcon } from '../../components/ui/Icons';

const steps = {
  en: [
    { step: '01', title: 'Book a Discovery Call', desc: 'Schedule a 15-minute call with our team. We learn about your operations, pain points, and goals.' },
    { step: '02', title: 'We Configure Your Workspace', desc: 'Our team sets up your department routing rules, voice scripts, knowledge base, and integrations. No effort required from you.' },
    { step: '03', title: 'Team Training (1 Hour)', desc: 'We walk your team through the dashboard, answer questions, and ensure everyone is comfortable with the system.' },
    { step: '04', title: 'Go Live', desc: 'Within 5–7 business days, your AI front-desk is operational. We monitor the first 48 hours to catch any edge cases.' },
    { step: '05', title: 'Ongoing Optimization', desc: 'We review transcripts, update your knowledge base, and refine routing rules monthly. Your system gets smarter over time.' },
  ],
  ar: [
    { step: '01', title: 'احجز مكالمة اكتشاف', desc: 'احجز مكالمة مدتها 15 دقيقة مع فريقنا. نتعرف على عملياتك ونقاط الألم وأهدافك.' },
    { step: '02', title: 'نقوم بتكوين مساحة عملك', desc: 'فريقنا يضبط قواعد توجيه الأقسام والنصوص الصوتية وقاعدة المعرفة والتكاملات. لا جهد مطلوب منك.' },
    { step: '03', title: 'تدريب الفريق (ساعة واحدة)', desc: 'نرشد فريقك خلال لوحة التحكم ونجيب على الأسئلة ونتأكد من راحة الجميع مع النظام.' },
    { step: '04', title: 'بدء التشغيل', desc: 'خلال 5-7 أيام عمل، يصبح مكتب الاستقبال الذكي جاهزاً. نراقب أول 48 ساعة لالتقاط أي حالات استثنائية.' },
    { step: '05', title: 'تحسين مستمر', desc: 'نراجع النصوص ونحدث قاعدة المعرفة ونحسن قواعد التوجيه شهرياً. نظامك يصبح أذكى بمرور الوقت.' },
  ],
};

const flagIcons: Record<string, React.ReactNode> = {
  globe: <GlobeIcon className="w-8 h-8 text-primary" />,
  clock: <ClockIcon className="w-8 h-8 text-primary" />,
  language: <GlobeIcon className="w-8 h-8 text-primary" />,
  currency: <DollarIcon className="w-8 h-8 text-primary" />,
  data: <BoxIcon className="w-8 h-8 text-primary" />,
};

const globalItems = {
  en: [
    { flag: 'globe', title: 'Global Reach', desc: 'Headquartered in Doha, Qatar — serving clients across the Middle East, Asia, Europe, Africa, and the Americas.' },
    { flag: 'clock', title: '24/7 Across Time Zones', desc: 'Your AI front-desk never sleeps. Handle inquiries from any time zone without hiring night staff.' },
    { flag: 'language', title: 'Multi-Language by Default', desc: 'Arabic, English, and more — your AI speaks your customers\' language, wherever they are.' },
    { flag: 'currency', title: 'Multi-Currency Billing', desc: 'Invoiced in QAR, USD, EUR, or GBP. No hidden conversion fees.' },
    { flag: 'data', title: 'Data Residency Options', desc: 'Choose your data region: Middle East, Europe, or United States. Compliance-ready for local regulations.' },
  ],
  ar: [
    { flag: 'globe', title: 'وصول عالمي', desc: 'المقر الرئيسي في الدوحة، قطر — نخدم عملاء عبر الشرق الأوسط وآسيا وأوروبا وأفريقيا والأمريكتين.' },
    { flag: 'clock', title: '24/7 عبر المناطق الزمنية', desc: 'مكتب الاستقبال الذكي لا ينام أبداً. تعامل مع الاستفسارات من أي منطقة زمنية دون توظيف موظفين ليليين.' },
    { flag: 'language', title: 'متعدد اللغات افتراضياً', desc: 'العربية والإنجليزية والمزيد — ذكاؤك الاصطناعي يتحدث لغة عملائك أينما كانوا.' },
    { flag: 'currency', title: 'فوترة متعددة العملات', desc: 'الفواتير بالريال القطري أو الدولار أو اليورو أو الجنيه الإسترليني. لا رسوم تحويل خفية.' },
    { flag: 'data', title: 'خيارات إقامة البيانات', desc: 'اختر منطقة بياناتك: الشرق الأوسط أو أوروبا أو الولايات المتحدة. جاهز للامتثال للوائح المحلية.' },
  ],
};



export default function HowItWorksPage() {
  const { locale } = useLocale();
  const t = (obj: Record<string, string>) => locale === 'ar' ? obj.ar : obj.en;
  const stepList = steps[locale];
  const global = globalItems[locale];

  return (
    <div className="bg-white text-slate-900 min-h-screen flex flex-col font-sans" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <Header />

      <section className="max-w-7xl mx-auto px-6 py-20 md:py-28 text-center">
        <span className="inline-block bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
          {t({ en: 'How It Works', ar: 'كيف يعمل' })}
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-primary leading-tight max-w-4xl mx-auto">
          {t({ en: 'From your first call to go-live in under a week', ar: 'من أول مكالمة إلى التشغيل الفعلي في أقل من أسبوع' })}
        </h1>
        <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto">
          {t({ en: 'Quick setup, minimal training, immediate results — anywhere you operate.', ar: 'إعداد سريع، تدريب بسيط، نتائج فورية — أينما كنت.' })}
        </p>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="space-y-8">
            {stepList.map((s) => (
              <div key={s.step} className="flex items-start gap-6 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary text-lg font-bold text-white">
                  {s.step}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-primary mb-1">{s.title}</h3>
                  <p className="text-slate-500 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-primary text-center mb-12">
            {t({ en: 'Global by Design', ar: 'عالمي بالتصميم' })}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {global.map((g) => (
              <div key={g.title} className="border border-slate-200 rounded-2xl p-6 shadow-sm">
                <span className="text-3xl mb-3 block">{flagIcons[g.flag] || <GlobeIcon className="w-8 h-8 text-primary" />}</span>
                <h3 className="text-lg font-bold text-primary mb-2">{g.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{g.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary py-16">
        <div className="max-w-3xl mx-auto px-6 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            {t({ en: 'Start Your Journey Today', ar: 'ابدأ رحلتك اليوم' })}
          </h2>
          <p className="text-blue-100 mb-8">
            {t({ en: 'From Doha to the world — let\'s build your AI operations.', ar: 'من الدوحة إلى العالم — دعنا نبني عملياتك الذكية.' })}
          </p>
          <a
            href={process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/saqynrabt/demo'}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-white text-primary px-6 py-3 text-sm font-semibold hover:bg-blue-50 transition-all"
          >
            {t({ en: 'See how it works', ar: 'شاهد كيف يعمل' })}
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
