'use client';

import { useLocale } from '../providers';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { Globe } from 'lucide-react';

const highlights = {
  en: [
    { stat: '16+', label: 'Industries Served' },
    { stat: '4', label: 'Continents' },
    { stat: '24/7', label: 'Global Support' },
    { stat: '3', label: 'Data Regions' },
  ],
  ar: [
    { stat: '16+', label: 'قطاعاً نخدمها' },
    { stat: '4', label: 'قارات' },
    { stat: '24/7', label: 'دعم عالمي' },
    { stat: '3', label: 'مناطق بيانات' },
  ],
};

const regions = {
  en: [
    { name: 'Middle East', flag: 'middleeast', cities: 'Dubai, Riyadh, Doha, Kuwait City, Muscat, Manama', desc: 'Deep understanding of regional hospitality, healthcare, and service industry needs across the Gulf and Levant.' },
    { name: 'Europe', flag: 'europe', cities: 'London, Berlin, Paris, Amsterdam, Madrid', desc: 'GDPR-compliant data hosting. Serving hotels, clinics, and service businesses across the EU.' },
    { name: 'Asia', flag: 'asia', cities: 'Singapore, Tokyo, Dubai, Mumbai, Bangkok', desc: 'Fast-growing presence in Southeast Asia and the subcontinent. Multi-language support included.' },
    { name: 'Africa', flag: 'africa', cities: 'Cairo, Nairobi, Cape Town, Lagos, Casablanca', desc: 'Expanding across the continent with Arabic, English, and French language support.' },
    { name: 'Americas', flag: 'americas', cities: 'New York, Toronto, São Paulo, Mexico City', desc: 'US-East and US-West data regions available. Serving clients from Canada to Brazil.' },
  ],
  ar: [
    { name: 'الشرق الأوسط', flag: 'middleeast', cities: 'دبي، الرياض، الدوحة، مدينة الكويت، مسقط، المنامة', desc: 'فهم عميق لاحتياجات قطاعات الضيافة والرعاية الصحية والخدمات الإقليمية عبر الخليج والمشرق.' },
    { name: 'أوروبا', flag: 'europe', cities: 'لندن، برلين، باريس، أمستردام، مدريد', desc: 'استضافة بيانات متوافقة مع GDPR. نخدم الفنادق والعيادات وشركات الخدمات في جميع أنحاء الاتحاد الأوروبي.' },
    { name: 'آسيا', flag: 'asia', cities: 'سنغافورة، طوكيو، دبي، مومباي، بانكوك', desc: 'وجود سريع النمو في جنوب شرق آسيا وشبه القارة الهندية. دعم متعدد اللغات مشمول.' },
    { name: 'أفريقيا', flag: 'africa', cities: 'القاهرة، نيروبي، كيب تاون، لاغوس، الدار البيضاء', desc: 'نتوسع عبر القارة بدعم اللغات العربية والإنجليزية والفرنسية.' },
    { name: 'الأمريكتان', flag: 'americas', cities: 'نيويورك، تورونتو، ساو باولو، مكسيكو سيتي', desc: 'مناطق بيانات US-East و US-West متاحة. نخدم عملاء من كندا إلى البرازيل.' },
  ],
};

const flagIconMap: Record<string, React.ReactNode> = {
  middleeast: <svg className="w-8 h-8 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 2a15 15 0 0 0 0 20 15 15 0 0 0 0-20z" /><path d="M2 12h20" /></svg>,
  europe: <svg className="w-8 h-8 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 2v20M2 12h20" /><path d="M5 5l14 14M19 5l-14 14" /></svg>,
  asia: <Globe className="w-8 h-8 text-primary" />,
  africa: <Globe className="w-8 h-8 text-primary" />,
  americas: <Globe className="w-8 h-8 text-primary" />,
};

export default function GlobalPage() {
  const { locale } = useLocale();
  const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';
  const highlightList = highlights[locale as keyof typeof highlights] || highlights.en;
  const regionList = regions[locale as keyof typeof regions] || regions.en;

  return (
    <div className="bg-white text-slate-900 min-h-screen flex flex-col font-sans" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <Header />

      <section className="max-w-7xl mx-auto px-6 py-20 md:py-28 text-center">
        <span className="inline-block bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
          {t({ en: 'Global Presence', ar: 'الوجود العالمي' })}
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-primary leading-tight max-w-4xl mx-auto">
          {t({ en: 'Global Headquarters. Serving the World.', ar: 'مقر عالمي. نخدم العالم.' })}
        </h1>
        <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto">
          {t({ en: 'Headquartered globally, we bring AI-powered tools to businesses across every continent.', ar: 'مقرنا عالمي، نقدم أدوات الذكاء الاصطناعي للمؤسسات في جميع القارات.' })}
        </p>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {highlightList.map((h) => (
              <div key={h.label} className="text-center bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                <p className="text-4xl font-extrabold text-primary">{h.stat}</p>
                <p className="text-sm text-slate-500 mt-1">{h.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-primary text-center mb-12">
            {t({ en: 'Where We Operate', ar: 'أين نعمل' })}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regionList.map((r) => (
              <div key={r.name} className="border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all">
                <span className="text-4xl mb-3 block">{flagIconMap[r.flag] || <Globe className="w-8 h-8 text-primary" />}</span>
                <h3 className="text-xl font-bold text-primary mb-1">{r.name}</h3>
                <p className="text-xs text-slate-400 mb-3">{r.cities}</p>
                <p className="text-sm text-slate-500 leading-relaxed">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary py-16">
        <div className="max-w-3xl mx-auto px-6 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            {t({ en: 'Wherever You Are, We\'re Ready', ar: 'أينما كنت، نحن جاهزون' })}
          </h2>
          <p className="text-blue-100 mb-8">
            {t({ en: 'From a 5-star hotel to a clinic in Nairobi — your AI operations start here, wherever you are.', ar: 'من فندق 5 نجوم إلى عيادة في نيروبي — عملياتك الذكية تبدأ هنا، أينما كنت.' })}
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
