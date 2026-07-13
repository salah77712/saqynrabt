'use client';

import { useLocale } from '../providers';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { CheckIcon } from '../../components/ui/Icons';

const cases = {
  en: [
    {
      industry: 'Hospitality',
      title: '5-Star Doha Hotel Cuts Front-Desk Calls by 60%',
      result: 'Automated late check-ins, room service requests, and complaint routing. Staff now focus on guest experience instead of phone duty.',
      metrics: ['60% fewer front-desk calls', '4.8 Star guest satisfaction', '24/7 call coverage'],
    },
    {
      industry: 'Healthcare',
      title: 'Private Clinic in Dubai Handles 2× More Patient Intake',
      result: 'AI answers booking inquiries, triages urgent cases, and routes prescriptions to the pharmacy — all without a receptionist.',
      metrics: ['2× patient intake', 'Zero missed calls', '15-min avg response time'],
    },
    {
      industry: 'Home Services',
      title: 'Kuwait HVAC Company Captures Every After-Hours Lead',
      result: 'Emergency calls are answered by AI, dispatch is triggered automatically, and technicians arrive on time every time.',
      metrics: ['Full lead capture', '30-min avg dispatch', '40% revenue increase'],
    },
  ],
  ar: [
    {
      industry: 'الضيافة',
      title: 'فندق 5 نجوم في الدوحة يخفض مكالمات مكتب الاستقبال بنسبة 60%',
      result: 'أتمتة تسجيلات الوصول المتأخرة وطلبات خدمة الغرف وتوجيه الشكاوى. يركز الموظفون الآن على تجربة الضيوف بدلاً من مهام الهاتف.',
      metrics: ['60% مكالمات أقل لمكتب الاستقبال', '4.8 Star رضا النزلاء', 'تغطية مكالمات 24/7'],
    },
    {
      industry: 'الرعاية الصحية',
      title: 'عيادة خاصة في دبي تعالج ضعف عدد المرضى',
      result: 'يجيب الذكاء الاصطناعي على استفسارات الحجز ويفرز الحالات العاجلة ويوجه الوصفات إلى الصيدلية — كل ذلك بدون موظف استقبال.',
      metrics: ['ضعف عدد المرضى', 'صفر مكالمات فائتة', 'متوسط وقت الرد 15 دقيقة'],
    },
    {
      industry: 'الخدمات المنزلية',
      title: 'شركة تكييف كويتية تلتقط كل العملاء المحتملين بعد ساعات العمل',
      result: 'يجيب الذكاء الاصطناعي على مكالمات الطوارئ، ويتم تفعيل التوجيه تلقائياً، ويصل الفنيون في الوقت المحدد في كل مرة.',
      metrics: ['التقاط كامل للعملاء المحتملين', 'متوسط التوجيه 30 دقيقة', 'زيادة الإيرادات 40%'],
    },
  ],
};

export default function CaseStudiesPage() {
  const { locale } = useLocale();
  const t = (obj: Record<string, string>) => locale === 'ar' ? obj.ar : obj.en;
  const list = cases[locale];

  return (
    <div className="bg-white text-slate-900 min-h-screen flex flex-col font-sans" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <Header />

      <section className="max-w-7xl mx-auto px-6 py-20 md:py-28 text-center">
        <span className="inline-block bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
          {t({ en: 'Case Studies', ar: 'دراسات الحالة' })}
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-primary leading-tight max-w-4xl mx-auto">
          {t({ en: 'Real Results from Real Businesses', ar: 'نتائج حقيقية من شركات حقيقية' })}
        </h1>
        <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto">
          {t({ en: 'From Doha to Dubai to Kuwait — see how teams use SAQYN RABT to transform their operations.', ar: 'من الدوحة إلى دبي إلى الكويت — شاهد كيف تستخدم الفرق SAQYN RABT لتحويل عملياتهم.' })}
        </p>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-6 space-y-8">
          {list.map((c) => (
            <div key={c.title} className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm hover:shadow-md transition-all">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                <div className="flex-1">
                  <span className="text-sm font-bold text-primary uppercase tracking-wider">{c.industry}</span>
                  <h2 className="text-2xl font-bold text-primary mt-2 mb-3">{c.title}</h2>
                  <p className="text-slate-500 leading-relaxed">{c.result}</p>
                </div>
                <div className="lg:w-64 bg-slate-50 rounded-2xl p-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                    {t({ en: 'Key Metrics', ar: 'المقاييس الرئيسية' })}
                  </p>
                  <ul className="space-y-2">
                    {c.metrics.map((m) => (
                      <li key={m} className="flex items-center gap-2 text-sm font-medium text-primary">
                        <CheckIcon className="w-4 h-4 text-emerald-500 inline" />{m}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-primary mb-4">
            {t({ en: 'Be the Next Success Story', ar: 'كن قصة النجاح التالية' })}
          </h2>
          <p className="text-slate-500 mb-8">
            {t({ en: 'Book a demo and see how SAQYN RABT can transform your operations.', ar: 'احجز عرضاً توضيحياً وشاهد كيف يمكن لـ SAQYN RABT تحويل عملياتك.' })}
          </p>
          <a
            href={process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/saqynrabt/demo'}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white hover:opacity-90 transition-all"
          >
            {t({ en: 'See how it works', ar: 'شاهد كيف يعمل' })}
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
