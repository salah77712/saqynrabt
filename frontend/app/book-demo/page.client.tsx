'use client';

import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { useLocale } from '../providers';

export default function BookDemoPage() {
  const { locale } = useLocale();
  const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/saqynrabt/demo';

  return (
    <div className="bg-surface text-primary min-h-screen flex flex-col font-sans" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <Header />

      <main className="flex-1 max-w-3xl mx-auto w-full px-6 py-20 text-center">
        <span className="inline-block bg-royal/10 text-royal text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
          {t({ en: 'Pilot Onboarding', ar: 'الانضمام التجريبي' })}
        </span>

        <h1 className="text-4xl md:text-5xl font-extrabold text-primary tracking-tight leading-tight">
          {t({ en: 'Book a Free Demo Call', ar: 'احجز مكالمة تجريبية مجانية' })}
        </h1>

        <p className="mt-6 text-sm md:text-base text-primary/70 font-medium max-w-xl mx-auto leading-relaxed">
          {t({
            en: 'SAQYN RABT is currently onboarding pilot companies in Qatar and the GCC. Book a free demo call and we will help set up your workspace — no payment required during the pilot.',
            ar: 'تقوم SAQYN RABT حاليًا باستقبال شركات تجريبية في قطر والخليج. احجز مكالمة تجريبية مجانية وسنساعدك في إعداد مساحتك — لا يوجد أي دفع مطلوب خلال التجريبة.',
          })}
        </p>

        <div className="mt-12 bg-surface border border-primary/10 rounded-xl p-8 shadow-sm max-w-md mx-auto">
          <h2 className="text-sm font-extrabold text-primary mb-4">
            {t({ en: 'What to expect', ar: 'ما يمكنك توقعه' })}
          </h2>
          <ul className="space-y-3 text-left">
            <li className="flex items-start gap-3 text-xs font-semibold text-primary/80">
              <span className="w-4 h-4 rounded-full bg-accent flex items-center justify-center text-surface text-[10px] font-bold shrink-0 mt-0.5">1</span>
              {t({ en: '15-minute intro call to understand your business needs', ar: 'مكالمة تعريفية مدتها 15 دقيقة لفهم احتياجات عملك' })}
            </li>
            <li className="flex items-start gap-3 text-xs font-semibold text-primary/80">
              <span className="w-4 h-4 rounded-full bg-accent flex items-center justify-center text-surface text-[10px] font-bold shrink-0 mt-0.5">2</span>
              {t({ en: 'Workspace setup with your documents and team', ar: 'إعداد مساحة العمل بوثائقك وفريقك' })}
            </li>
            <li className="flex items-start gap-3 text-xs font-semibold text-primary/80">
              <span className="w-4 h-4 rounded-full bg-accent flex items-center justify-center text-surface text-[10px] font-bold shrink-0 mt-0.5">3</span>
              {t({ en: 'Go-live support during the pilot period', ar: 'الدعم أثناء فترة التجريبة' })}
            </li>
          </ul>
        </div>

        <a
          href={calendlyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 inline-flex items-center gap-2 bg-accent hover:bg-primary text-surface text-sm font-bold py-4 px-10 rounded-xl transition-all duration-300 min-h-[48px] hover:scale-[1.02] hover:shadow-md active:scale-95"
        >
          {t({ en: 'Request a demo call', ar: 'طلب مكالمة تجريبية' })}
        </a>

        <p className="mt-6 text-xs text-primary/50 font-medium">
          {t({ en: 'No payment required. No commitment. Just a conversation.', ar: 'لا يوجد أي دفع مطلوب. لا التزام. مجرد محادثة.' })}
        </p>
      </main>

      <Footer />
    </div>
  );
}
