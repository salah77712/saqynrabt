'use client';

import { useLocale } from '../providers';
import { MarketingHeader } from '../../components/MarketingHeader';
import { Footer } from '../../components/Footer';

const industries = {
  en: [
    { icon: '🏨', title: 'Hospitality', desc: 'Hotels, resorts, and boutique properties use SAQYN RABT to handle late check-ins, room service requests, and guest complaints 24/7.' },
    { icon: '🏥', title: 'Healthcare', desc: 'Clinics and hospitals automate patient bookings, triage emergencies, and route inquiries to the right department instantly.' },
    { icon: '🔧', title: 'Home Services', desc: 'Plumbers, electricians, and HVAC companies capture emergency calls after hours and dispatch technicians immediately.' },
    { icon: '🏢', title: 'Real Estate', desc: 'Property managers route maintenance requests to on-site crews and handle tenant inquiries without a receptionist.' },
    { icon: '🚗', title: 'Automotive', desc: 'Dealerships and repair shops automate service bookings, inventory inquiries, and quote requests around the clock.' },
    { icon: '🍽️', title: 'Food & Beverage', desc: 'Restaurants, cafes, and catering services book reservations and takeout orders during peak hours without missed calls.' },
    { icon: '🚨', title: 'Towing & Roadside', desc: 'Capture stranded drivers, get GPS data, and dispatch the nearest truck without a phone call.' },
    { icon: '🐈', title: 'Veterinary', desc: 'Triage emergency pet visits and route urgent cases to the on-call nurse immediately.' },
    { icon: '💧', title: 'Plumbing & HVAC', desc: 'Stop losing money from missed after-hours repair calls. Capture every lead and dispatch your field team.' },
    { icon: '🛎️', title: 'Boutique Hotels', desc: 'Let guests auto-assign digital door codes at midnight. Handle late arrivals without front-desk staff.' },
    { icon: '🍷', title: 'Restaurants & Catering', desc: 'Quote and book catering orders with no phone tag. Standardize large event bookings.' },
    { icon: '🏁', title: 'Auto Dealerships', desc: 'Answer real-time inventory questions about used cars on your lot — even after hours.' },
    { icon: '🏗️', title: 'Construction', desc: 'Keep subcontractors updated on material delivery times and site work permits without manual calls.' },
    { icon: '⚖️', title: 'Law Firms', desc: 'Auto-answer retainer fee questions and intake form inquiries. Free up paralegals for billable work.' },
    { icon: '📈', title: 'Accounting & Tax', desc: 'Handle tax season refund status checks without a receptionist. Route complex cases to senior accountants.' },
    { icon: '🛒', title: 'Retail & E-commerce', desc: 'Answer product questions, process returns, and handle customer inquiries across every channel.' },
  ],
  ar: [
    { icon: '🏨', title: 'الضيافة', desc: 'تستخدم الفنادق والمنتجعات SAQYN RABT للتعامل مع تسجيلات الوصول المتأخرة وطلبات خدمة الغرف وشكاوى الضيوف 24/7.' },
    { icon: '🏥', title: 'الرعاية الصحية', desc: 'تؤتمت العيادات والمستشفيات حجوزات المرضى وتفرز الحالات الطارئة وتوجه الاستفسارات إلى القسم المناسب فوراً.' },
    { icon: '🔧', title: 'الخدمات المنزلية', desc: 'يلتقط السباكون والكهربائيون وشركات التكييف مكالمات الطوارئ بعد ساعات العمل ويوجهون الفنيين فوراً.' },
    { icon: '🏢', title: 'العقارات', desc: 'يوجه مديرو العقارات طلبات الصيانة إلى الفرق الميدانية ويتعاملون مع استفسارات المستأجرين دون موظف استقبال.' },
    { icon: '🚗', title: 'السيارات', desc: 'تؤتمت الوكالات وورش الإصلاح حجوزات الخدمة واستفسارات المخزون وطلبات عروض الأسعار على مدار الساعة.' },
    { icon: '🍽️', title: 'الأغذية والمشروبات', desc: 'تحجز المطاعم والمقاهي وخدمات التموين الطلبات وطلبات التيك أواي خلال ساعات الذروة دون مكالمات فائتة.' },
    { icon: '🚨', title: 'السحب والخدمات على الطريق', desc: 'التقط السائقين العالقين واحصل على بيانات GPS ووجه أقرب شاحنة دون مكالمة هاتفية.' },
    { icon: '🐈', title: 'الطب البيطري', desc: 'افرز زيارات الحيوانات الأليفة الطارئة ووجه الحالات العاجلة إلى الممرض المناوب فوراً.' },
    { icon: '💧', title: 'السباكة والتدفئة والتكييف', desc: 'توقف عن خسارة الأموال من مكالمات الإصلاح الفائتة بعد ساعات العمل. التقط كل عميل محتمل ووجه فريقك الميداني.' },
    { icon: '🛎️', title: 'فنادق بوتيك', desc: 'دع الضيوف يعينون أكواد الأبواب الرقمية تلقائياً في منتصف الليل. تعامل مع القادمين المتأخرين دون موظفي استقبال.' },
    { icon: '🍷', title: 'المطاعم والتموين', desc: 'أسعر واحجز طلبات التموين دون لعبة الهاتف. وحد حجوزات الفعاليات الكبيرة.' },
    { icon: '🏁', title: 'وكالات السيارات', desc: 'أجب على أسئلة المخزون الفعلية عن السيارات المستعملة في معرضك — حتى بعد ساعات العمل.' },
    { icon: '🏗️', title: 'البناء', desc: 'أبق المقاولين من الباطن على اطلاع بأوقات تسليم المواد وتصاريح العمل في الموقع دون مكالمات يدوية.' },
    { icon: '⚖️', title: 'مكاتب المحاماة', desc: 'أجب تلقائياً عن أسئلة رسوم الاتفاق واستفسارات نماذج القبول. حرر المساعدين القانونيين للعمل القابل للفوترة.' },
    { icon: '📈', title: 'المحاسبة والضرائب', desc: 'تعامل مع فحوصات حالة استرداد الضرائب الموسمية دون موظف استقبال. وجه الحالات المعقدة إلى المحاسبين الكبار.' },
    { icon: '🛒', title: 'التجزئة والتجارة الإلكترونية', desc: 'أجب عن أسئلة المنتجات وعالج المرتجعات وتعامل مع استفسارات العملاء عبر كل قناة.' },
  ],
};

export default function IndustriesPage() {
  const { locale } = useLocale();
  const t = (obj: Record<string, string>) => locale === 'ar' ? obj.ar : obj.en;
  const list = industries[locale];

  return (
    <div className="bg-white text-slate-900 min-h-screen flex flex-col font-sans" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <MarketingHeader />

      <section className="max-w-7xl mx-auto px-6 py-20 md:py-28 text-center">
        <span className="inline-block bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
          {t({ en: 'Industries', ar: 'القطاعات' })}
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-primary leading-tight max-w-4xl mx-auto">
          {t({ en: 'Built for 16 Industries — Worldwide', ar: 'مصمم لـ 16 قطاعاً — حول العالم' })}
        </h1>
        <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto">
          {t({ en: 'Based in Qatar, serving the globe. Our platform adapts to your industry, language, and time zone.', ar: 'مقرنا في قطر، نخدم العالم. منصتنا تتكيف مع قطاعك ولغتك ومنطقتك الزمنية.' })}
        </p>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {list.map((ind) => (
              <div key={ind.title} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all">
                <span className="text-3xl mb-3 block">{ind.icon}</span>
                <h3 className="text-lg font-bold text-primary mb-2">{ind.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{ind.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-primary mb-4">
            {t({ en: 'Don\'t see your industry?', ar: 'لا ترى قطاعك؟' })}
          </h2>
          <p className="text-slate-500 mb-8">
            {t({ en: 'SAQYN RABT is industry-agnostic. We build custom workflows for any business type.', ar: 'SAQYN RABT غير مقيدة بصناعة معينة. نبني سير عمل مخصص لأي نوع عمل.' })}
          </p>
          <a
            href={process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/saqynrabt/demo'}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white hover:opacity-90 transition-all"
          >
            {t({ en: 'Book a Demo', ar: 'احجز عرضاً توضيحياً' })}
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
