'use client';

import * as React from 'react';
import { useLocale } from '../providers';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { Globe, Clock, DollarSign, Package } from 'lucide-react';

const steps = {
  en: [
    { step: '01', title: 'Book a Discovery Call', desc: 'Schedule a 15-minute call with our team. We learn about your operations, pain points, and goals.' },
    { step: '02', title: 'We Configure Your Workspace', desc: 'Our team sets up your department routing rules, voice scripts, knowledge base, and integrations. No effort required from you.' },
    { step: '03', title: 'Team Training (1 Hour)', desc: 'We walk your team through the dashboard, answer questions, and ensure everyone is comfortable with the system.' },
    { step: '04', title: 'Go Live', desc: 'Within 5â7 business days, your AI front-desk is operational. We monitor the first 48 hours to catch any edge cases.' },
    { step: '05', title: 'Ongoing Optimization', desc: 'We review transcripts, update your knowledge base, and refine routing rules monthly. Your system gets smarter over time.' },
  ],
  ar: [
    { step: '01', title: 'احجز مكالمة اكتشاف', desc: 'احجز مكالمة مدتها 15 دقيقة مع فريقنا. نتعرف على عملياتك ونقاط الألم وأهدافك.' },
    { step: '02', title: 'نقوم بتكوين مساحة عملك', desc: 'فريقنا يضبط قواعد توجيه الأقسام والنصوص الصوتية وقاعدة المعرفة والتكاملات. لا جهد مطلوب منك.' },
    { step: '03', title: 'تدريب الفريق (ساعة واحدة)', desc: 'نرشد فريقك خلال لوحة التحكم ونجيب على الأسئلة ونتأكد من راحة الجميع مع النظام.' },
    { step: '04', title: 'بدء التشغيل', desc: 'خلال 5-7 أيام عمل، يصبح مكتب الاستقبال الذكي جاهزاً. نراقب أول 48 ساعة لالتقاط أي حالات استثنائية.' },
    { step: '05', title: 'تحسين مستمر', desc: 'نراجع النصوص ونحدث قاعدة المعرفة ونحسن قواعد التوجيه شهرياً. نظامك يصبح أذكى بمرور الوقت.' },
  ],
  fr: [
    { step: '01', title: 'RÃ©server un appel de dÃ©couverte', desc: 'Planifiez un appel de 15 minutes avec notre Ã©quipe. Nous en apprenons plus sur vos opÃ©rations, vos points faibles et vos objectifs.' },
    { step: '02', title: 'Nous configurons votre espace de travail', desc: 'Notre Ã©quipe configure vos rÃ¨gles de routage de service, vos scripts vocaux, votre base de connaissances et vos intÃ©grations. Aucun effort requis de votre part.' },
    { step: '03', title: 'Formation de l\'Ã©quipe (1 heure)', desc: 'We walk your team through the dashboard, answer questions, and ensure everyone is comfortable with the system.' },
    { step: '04', title: 'Mise en service', desc: 'Sous 5 Ã  7 jours ouvrables, votre accueil IA est opÃ©rationnel. Nous surveillons les premiÃ¨res 48 heures pour dÃ©tecter tout cas particulier.' },
    { step: '05', title: 'Optimisation continue', desc: 'Nous examinons les transcriptions, mettons Ã  jour votre base de connaissances et affinons les rÃ¨gles de routage mensuellement. Votre systÃ¨me devient plus intelligent avec le temps.' },
  ],
  hi: [
    { step: '01', title: 'à¤¡à¤¿à¤¸à¥à¤à¤µà¤°à¥ à¤à¥à¤² à¤¬à¥à¤ à¤à¤°à¥à¤', desc: 'à¤¹à¤®à¤¾à¤°à¥ à¤à¥à¤® à¤à¥ à¤¸à¤¾à¤¥ 15 à¤®à¤¿à¤¨à¤ à¤à¥ à¤à¥à¤² à¤¶à¥à¤¡à¥à¤¯à¥à¤² à¤à¤°à¥à¤à¥¤ à¤¹à¤® à¤à¤ªà¤à¥ à¤¸à¤à¤à¤¾à¤²à¤¨, à¤¸à¤®à¤¸à¥à¤¯à¤¾à¤à¤ à¤à¤° à¤²à¤à¥à¤·à¥à¤¯à¥à¤ à¤à¥ à¤¬à¤¾à¤°à¥ à¤®à¥à¤ à¤¸à¥à¤à¤¤à¥ à¤¹à¥à¤à¥¤' },
    { step: '02', title: 'à¤¹à¤® à¤à¤ªà¤à¤¾ à¤à¤¾à¤°à¥à¤¯à¤à¥à¤·à¥à¤¤à¥à¤° à¤à¥à¤¨à¥à¤«à¤¼à¤¿à¤à¤° à¤à¤°à¤¤à¥ à¤¹à¥à¤', desc: 'à¤¹à¤®à¤¾à¤°à¥ à¤à¥à¤® à¤à¤ªà¤à¥ à¤µà¤¿à¤­à¤¾à¤ à¤°à¥à¤à¤¿à¤à¤ à¤¨à¤¿à¤¯à¤®, à¤µà¥à¤¯à¤¸ à¤¸à¥à¤à¥à¤°à¤¿à¤ªà¥à¤, à¤à¥à¤à¤¾à¤¨ à¤à¤§à¤¾à¤° à¤à¤° à¤à¤à¥à¤à¤°à¤£ à¤¸à¥à¤ à¤à¤°à¤¤à¥ à¤¹à¥à¥¤ à¤à¤ªà¤à¥ à¤à¤° à¤¸à¥ à¤à¤¿à¤¸à¥ à¤ªà¥à¤°à¤¯à¤¾à¤¸ à¤à¥ à¤à¤µà¤¶à¥à¤¯à¤à¤¤à¤¾ à¤¨à¤¹à¥à¤ à¤¹à¥à¥¤' },
    { step: '03', title: 'à¤à¥à¤® à¤ªà¥à¤°à¤¶à¤¿à¤à¥à¤·à¤£ (1 à¤à¤à¤à¤¾)', desc: 'à¤¹à¤® à¤à¤ªà¤à¥ à¤à¥à¤® à¤à¥ à¤¡à¥à¤¶à¤¬à¥à¤°à¥à¤¡ à¤à¥ à¤®à¤¾à¤§à¥à¤¯à¤® à¤¸à¥ à¤®à¤¾à¤°à¥à¤à¤¦à¤°à¥à¤¶à¤¨ à¤à¤°à¤¤à¥ à¤¹à¥à¤, à¤¸à¤µà¤¾à¤²à¥à¤ à¤à¥ à¤à¤µà¤¾à¤¬ à¤¦à¥à¤¤à¥ à¤¹à¥à¤, à¤à¤° à¤¸à¥à¤¨à¤¿à¤¶à¥à¤à¤¿à¤¤ à¤à¤°à¤¤à¥ à¤¹à¥à¤ à¤à¤¿ à¤¹à¤° à¤à¥à¤ à¤¸à¤¿à¤¸à¥à¤à¤® à¤à¥ à¤¸à¤¾à¤¥ à¤¸à¤¹à¤ à¤¹à¥à¥¤' },
    { step: '04', title: 'à¤²à¤¾à¤à¤µ à¤à¤¾à¤à¤', desc: '5-7 à¤µà¥à¤¯à¤¾à¤µà¤¸à¤¾à¤¯à¤¿à¤ à¤¦à¤¿à¤¨à¥à¤ à¤à¥ à¤­à¥à¤¤à¤°, à¤à¤ªà¤à¤¾ à¤à¤à¤ à¤«à¥à¤°à¤à¤-à¤¡à¥à¤¸à¥à¤ à¤à¤¾à¤²à¥ à¤¹à¥ à¤à¤¾à¤¤à¤¾ à¤¹à¥à¥¤ à¤¹à¤® à¤à¤¿à¤¸à¥ à¤­à¥ à¤µà¤¿à¤·à¤® à¤ªà¤°à¤¿à¤¸à¥à¤¥à¤¿à¤¤à¤¿ à¤à¥ à¤ªà¤à¤¡à¤¼à¤¨à¥ à¤à¥ à¤²à¤¿à¤ à¤ªà¤¹à¤²à¥ 48 à¤à¤à¤à¥à¤ à¤à¥ à¤¨à¤¿à¤à¤°à¤¾à¤¨à¥ à¤à¤°à¤¤à¥ à¤¹à¥à¤à¥¤' },
    { step: '05', title: 'à¤¨à¤¿à¤°à¤à¤¤à¤° à¤à¤¨à¥à¤à¥à¤²à¤¨', desc: 'à¤¹à¤® à¤à¥à¤°à¤¾à¤à¤¸à¤à¥à¤°à¤¿à¤ªà¥à¤ à¤à¥ à¤¸à¤®à¥à¤à¥à¤·à¤¾ à¤à¤°à¤¤à¥ à¤¹à¥à¤, à¤à¤ªà¤à¥ à¤à¥à¤à¤¾à¤¨ à¤à¤§à¤¾à¤° à¤à¥ à¤à¤ªà¤¡à¥à¤ à¤à¤°à¤¤à¥ à¤¹à¥à¤, à¤à¤° à¤®à¤¾à¤¸à¤¿à¤ à¤°à¥à¤ª à¤¸à¥ à¤°à¥à¤à¤¿à¤à¤ à¤¨à¤¿à¤¯à¤®à¥à¤ à¤à¥ à¤ªà¤°à¤¿à¤·à¥à¤à¥à¤¤ à¤à¤°à¤¤à¥ à¤¹à¥à¤à¥¤ à¤à¤ªà¤à¤¾ à¤¸à¤¿à¤¸à¥à¤à¤® à¤¸à¤®à¤¯ à¤à¥ à¤¸à¤¾à¤¥ à¤¸à¥à¤®à¤¾à¤°à¥à¤ à¤¹à¥à¤¤à¤¾ à¤à¤¾à¤¤à¤¾ à¤¹à¥à¥¤' },
  ]
};

const flagIcons: Record<string, React.ReactNode> = {
  globe: <Globe className="w-8 h-8 text-primary" />,
  clock: <Clock className="w-8 h-8 text-primary" />,
  language: <Globe className="w-8 h-8 text-primary" />,
  currency: <DollarSign className="w-8 h-8 text-primary" />,
  data: <Package className="w-8 h-8 text-primary" />,
};

const globalItems = {
  en: [
    { flag: 'qa', title: 'Qatar', desc: 'Doha â Regional operations hub.' },
    { flag: 'sa', title: 'Saudi Arabia', desc: 'Riyadh â Corporate offices.' },
    { flag: 'ae', title: 'United Arab Emirates', desc: 'Dubai â Enterprise clients.' },
    { flag: 'ke', title: 'Kenya', desc: 'Nairobi â East Africa hub.' },
    { flag: 'uk', title: 'United Kingdom', desc: 'London â Western Europe office.' },
    { flag: 'us', title: 'United States', desc: 'New York â Americas operation.' },
  ],
  ar: [
    { flag: 'qa', title: 'قطر', desc: 'الدوحة â مركز العمليات الإقليمي.' },
    { flag: 'sa', title: 'المملكة العربية السعودية', desc: 'الرياض â المكاتب المؤسسية.' },
    { flag: 'ae', title: 'الإمارات العربية المتحدة', desc: 'دبي â عملاء المؤسسات.' },
    { flag: 'ke', title: 'كينيا', desc: 'نيروبي â مركز شرق إفريقيا.' },
    { flag: 'uk', title: 'المملكة المتحدة', desc: 'لندن â مكتب غرب أوروبا.' },
    { flag: 'us', title: 'الولايات المتحدة', desc: 'نيويورك â عمليات الأمريكتين.' },
  ],
  fr: [
    { flag: 'qa', title: 'Qatar', desc: 'Doha â Hub des opÃ©rations rÃ©gionales.' },
    { flag: 'sa', title: 'Arabie Saoudite', desc: 'Riyad â Bureaux d\'entreprise.' },
    { flag: 'ae', title: 'Ãmirats Arabes Unis', desc: 'DubaÃ¯ â Clients d\'entreprise.' },
    { flag: 'ke', title: 'Kenya', desc: 'Nairobi â Hub d\'Afrique de l\'Est.' },
    { flag: 'uk', title: 'Royaume-Uni', desc: 'Londres â Bureau d\'Europe occidentale.' },
    { flag: 'us', title: 'Ãtats-Unis', desc: 'New York â OpÃ©rations des AmÃ©riques.' },
  ],
  hi: [
    { flag: 'qa', title: 'à¤à¤¤à¤°', desc: 'à¤¦à¥à¤¹à¤¾ â à¤à¥à¤·à¥à¤¤à¥à¤°à¥à¤¯ à¤¸à¤à¤à¤¾à¤²à¤¨ à¤à¥à¤à¤¦à¥à¤°à¥¤' },
    { flag: 'sa', title: 'à¤¸à¤à¤¦à¥ à¤à¤°à¤¬', desc: 'à¤°à¤¿à¤¯à¤¾à¤¦ â à¤à¥à¤°à¥à¤ªà¥à¤°à¥à¤ à¤à¤¾à¤°à¥à¤¯à¤¾à¤²à¤¯à¥¤' },
    { flag: 'ae', title: 'à¤¸à¤à¤¯à¥à¤à¥à¤¤ à¤à¤°à¤¬ à¤à¤®à¥à¤°à¤¾à¤¤', desc: 'à¤¦à¥à¤¬à¤ â à¤à¤¦à¥à¤¯à¤® à¤à¥à¤°à¤¾à¤¹à¤à¥¤' },
    { flag: 'ke', title: 'à¤à¥à¤¨à¥à¤¯à¤¾', desc: 'à¤¨à¥à¤°à¥à¤¬à¥ â à¤ªà¥à¤°à¥à¤µà¥ à¤à¤«à¥à¤°à¥à¤à¤¾ à¤¹à¤¬à¥¤' },
    { flag: 'uk', title: 'à¤¯à¥à¤¨à¤¾à¤à¤à¥à¤¡ à¤à¤¿à¤à¤à¤¡à¤®', desc: 'à¤²à¤à¤¦à¤¨ â à¤ªà¤¶à¥à¤à¤¿à¤®à¥ à¤¯à¥à¤°à¥à¤ª à¤à¤¾à¤°à¥à¤¯à¤¾à¤²à¤¯à¥¤' },
    { flag: 'us', title: 'à¤¸à¤à¤¯à¥à¤à¥à¤¤ à¤°à¤¾à¤à¥à¤¯ à¤à¤®à¥à¤°à¤¿à¤à¤¾', desc: 'à¤¨à¥à¤¯à¥à¤¯à¥à¤°à¥à¤ â à¤à¤®à¥à¤°à¤¿à¤à¤¾ à¤¸à¤à¤à¤¾à¤²à¤¨à¥¤' },
  ]
};


export default function HowItWorksPage() {
  const { locale } = useLocale();
  const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';
  const stepList = steps[locale as keyof typeof steps] || steps.en;
  const global = globalItems[locale as keyof typeof globalItems] || globalItems.en;

  return (
    <div className="bg-surface text-primary min-h-screen flex flex-col font-sans" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <Header />

      <section className="max-w-7xl mx-auto px-6 py-20 md:py-28 text-center">
        <span className="inline-block bg-primary text-primary text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
          {t({ en: 'How It Works', fr: 'Comment Ã§a marche', ar: 'كيف يعمل', hi: 'à¤¯à¤¹ à¤à¥à¤¸à¥ à¤à¤¾à¤® à¤à¤°à¤¤à¤¾ à¤¹à¥' })}
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-primary leading-tight max-w-4xl mx-auto">
          {t({ en: 'From your first call to go-live in under a week', fr: 'De votre premier appel Ã  la mise en ligne en moins d\'une semaine', ar: 'من أول مكالمة إلى التشغيل الفعلي في أقل من أسبوع', hi: 'à¤à¤ªà¤à¥ à¤ªà¤¹à¤²à¥ à¤à¥à¤² à¤¸à¥ à¤²à¥à¤à¤° à¤à¤ à¤¸à¤ªà¥à¤¤à¤¾à¤¹ à¤¸à¥ à¤­à¥ à¤à¤® à¤¸à¤®à¤¯ à¤®à¥à¤ à¤²à¤¾à¤à¤µ à¤¹à¥à¤¨à¥ à¤¤à¤' })}
        </h1>
        <p className="mt-4 text-lg text-primary max-w-2xl mx-auto">
          {t({ en: 'Quick setup, minimal training, immediate results â anywhere you operate.', fr: 'Configuration rapide, formation minimale, rÃ©sultats immÃ©diats â partout oÃ¹ vous opÃ©rez.', ar: 'إعداد سريع، تدريب بسيط، نتائج فورية â أينما كنت.', hi: 'à¤¤à¥à¤µà¤°à¤¿à¤¤ à¤¸à¥à¤à¤à¤ª, à¤¨à¥à¤¯à¥à¤¨à¤¤à¤® à¤ªà¥à¤°à¤¶à¤¿à¤à¥à¤·à¤£, à¤¤à¤¤à¥à¤à¤¾à¤² à¤ªà¤°à¤¿à¤£à¤¾à¤® â à¤à¤ª à¤à¤¹à¤¾à¤ à¤­à¥ à¤à¤¾à¤® à¤à¤°à¤¤à¥ à¤¹à¥à¤à¥¤' })}
        </p>
      </section>

      <section className="bg-surface py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="space-y-8">
            {stepList.map((s) => (
              <div key={s.step} className="flex items-start gap-8 bg-background border border-primary/10 rounded-xl p-8 shadow-sm shadow-card">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary text-lg font-bold text-surface">
                  {s.step}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-primary mb-1">{s.title}</h3>
                  <p className="text-primary leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-primary text-center mb-12">
            {t({ en: 'Global by Design', fr: 'Global par conception', ar: 'عالمي بالتصميم', hi: 'à¤¡à¤¿à¤à¤¼à¤¾à¤à¤¨ à¤¦à¥à¤µà¤¾à¤°à¤¾ à¤µà¥à¤¶à¥à¤µà¤¿à¤' })}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {global.map((g) => (
              <div key={g.title} className="border border-primary/10 rounded-xl p-8 shadow-sm">
                <span className="text-3xl mb-3 block">{flagIcons[g.flag] || <Globe className="w-8 h-8 text-primary" />}</span>
                <h3 className="text-lg font-bold text-primary mb-2">{g.title}</h3>
                <p className="text-sm text-primary leading-relaxed">{g.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary py-16">
        <div className="max-w-3xl mx-auto px-6 text-center text-surface">
          <h2 className="text-3xl font-bold mb-4">
            {t({ en: 'Start Your Journey Today', fr: 'Commencez votre voyage aujourd\'hui', ar: 'ابدأ رحلتك اليوم', hi: 'à¤à¤ à¤¹à¥ à¤à¤ªà¤¨à¥ à¤¯à¤¾à¤¤à¥à¤°à¤¾ à¤¶à¥à¤°à¥ à¤à¤°à¥à¤' })}
          </h2>
          <p className="text-surface mb-8">
            {t({ en: 'Let\'s build your AI operations â wherever you are.', fr: 'Construisons vos opÃ©rations d\'IA â oÃ¹ que vous soyez.', ar: 'دعنا نبني عملياتك الذكية â أينما كنت.', hi: 'à¤à¤à¤ à¤à¤ªà¤à¥ à¤à¤à¤ à¤¸à¤à¤à¤¾à¤²à¤¨ à¤à¤¾ à¤¨à¤¿à¤°à¥à¤®à¤¾à¤£ à¤à¤°à¥à¤ â à¤à¤ª à¤à¤¹à¤¾à¤ à¤­à¥ à¤¹à¥à¤à¥¤' })}
          </p>
          <a
            href={process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/saqynrabt/demo'}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-surface text-primary px-6 py-3 text-xs font-bold min-h-[44px] hover:opacity-90 transition-all"
          >
            {t({ en: 'See how it works', fr: 'DÃ©couvrez comment Ã§a marche', ar: 'شاهد كيف يعمل', hi: 'à¤¦à¥à¤à¥à¤ à¤¯à¤¹ à¤à¥à¤¸à¥ à¤à¤¾à¤® à¤à¤°à¤¤à¤¾ à¤¹à¥' })}
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
