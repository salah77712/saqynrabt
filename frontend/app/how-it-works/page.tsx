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
  fr: [
    { step: '01', title: 'Réserver un appel de découverte', desc: 'Planifiez un appel de 15 minutes avec notre équipe. Nous en apprenons plus sur vos opérations, vos points faibles et vos objectifs.' },
    { step: '02', title: 'Nous configurons votre espace de travail', desc: 'Notre équipe configure vos règles de routage de service, vos scripts vocaux, votre base de connaissances et vos intégrations. Aucun effort requis de votre part.' },
    { step: '03', title: 'Formation de l\'équipe (1 heure)', desc: 'We walk your team through the dashboard, answer questions, and ensure everyone is comfortable with the system.' },
    { step: '04', title: 'Mise en service', desc: 'Sous 5 à 7 jours ouvrables, votre accueil IA est opérationnel. Nous surveillons les premières 48 heures pour détecter tout cas particulier.' },
    { step: '05', title: 'Optimisation continue', desc: 'Nous examinons les transcriptions, mettons à jour votre base de connaissances et affinons les règles de routage mensuellement. Votre système devient plus intelligent avec le temps.' },
  ],
  hi: [
    { step: '01', title: 'डिस्कवरी कॉल बुक करें', desc: 'हमारी टीम के साथ 15 मिनट की कॉल शेड्यूल करें। हम आपके संचालन, समस्याओं और लक्ष्यों के बारे में सीखते हैं।' },
    { step: '02', title: 'हम आपका कार्यक्षेत्र कॉन्फ़िगर करते हैं', desc: 'हमारी टीम आपके विभाग रूटिंग नियम, वॉयस स्क्रिप्ट, ज्ञान आधार और एकीकरण सेट करती है। आपकी ओर से किसी प्रयास की आवश्यकता नहीं है।' },
    { step: '03', title: 'टीम प्रशिक्षण (1 घंटा)', desc: 'हम आपकी टीम को डैशबोर्ड के माध्यम से मार्गदर्शन करते हैं, सवालों के जवाब देते हैं, और सुनिश्चित करते हैं कि हर कोई सिस्टम के साथ सहज है।' },
    { step: '04', title: 'लाइव जाएं', desc: '5-7 व्यावसायिक दिनों के भीतर, आपका एआई फ्रंट-डेस्क चालू हो जाता है। हम किसी भी विषम परिस्थिति को पकड़ने के लिए पहले 48 घंटों की निगरानी करते हैं।' },
    { step: '05', title: 'निरंतर अनुकूलन', desc: 'हम ट्रांसक्रिप्ट की समीक्षा करते हैं, आपके ज्ञान आधार को अपडेट करते हैं, और मासिक रूप से रूटिंग नियमों को परिष्कृत करते हैं। आपका सिस्टम समय के साथ स्मार्ट होता जाता है।' },
  ]
};

const flagIcons: Record<string, React.ReactNode> = {
  globe: <Globe className="w-8 h-8 text-[#141F33]" />,
  clock: <Clock className="w-8 h-8 text-[#141F33]" />,
  language: <Globe className="w-8 h-8 text-[#141F33]" />,
  currency: <DollarSign className="w-8 h-8 text-[#141F33]" />,
  data: <Package className="w-8 h-8 text-[#141F33]" />,
};

const globalItems = {
  en: [
    { flag: 'qa', title: 'Qatar', desc: 'Doha — Regional operations hub.' },
    { flag: 'sa', title: 'Saudi Arabia', desc: 'Riyadh — Corporate offices.' },
    { flag: 'ae', title: 'United Arab Emirates', desc: 'Dubai — Enterprise clients.' },
    { flag: 'ke', title: 'Kenya', desc: 'Nairobi — East Africa hub.' },
    { flag: 'uk', title: 'United Kingdom', desc: 'London — Western Europe office.' },
    { flag: 'us', title: 'United States', desc: 'New York — Americas operation.' },
  ],
  ar: [
    { flag: 'qa', title: 'قطر', desc: 'الدوحة — مركز العمليات الإقليمي.' },
    { flag: 'sa', title: 'المملكة العربية السعودية', desc: 'الرياض — المكاتب المؤسسية.' },
    { flag: 'ae', title: 'الإمارات العربية المتحدة', desc: 'دبي — عملاء المؤسسات.' },
    { flag: 'ke', title: 'كينيا', desc: 'نيروبي — مركز شرق إفريقيا.' },
    { flag: 'uk', title: 'المملكة المتحدة', desc: 'لندن — مكتب غرب أوروبا.' },
    { flag: 'us', title: 'الولايات المتحدة', desc: 'نيويورك — عمليات الأمريكتين.' },
  ],
  fr: [
    { flag: 'qa', title: 'Qatar', desc: 'Doha — Hub des opérations régionales.' },
    { flag: 'sa', title: 'Arabie Saoudite', desc: 'Riyad — Bureaux d\'entreprise.' },
    { flag: 'ae', title: 'Émirats Arabes Unis', desc: 'Dubaï — Clients d\'entreprise.' },
    { flag: 'ke', title: 'Kenya', desc: 'Nairobi — Hub d\'Afrique de l\'Est.' },
    { flag: 'uk', title: 'Royaume-Uni', desc: 'Londres — Bureau d\'Europe occidentale.' },
    { flag: 'us', title: 'États-Unis', desc: 'New York — Opérations des Amériques.' },
  ],
  hi: [
    { flag: 'qa', title: 'कतर', desc: 'दोहा — क्षेत्रीय संचालन केंद्र।' },
    { flag: 'sa', title: 'सऊदी अरब', desc: 'रियाद — कॉर्पोरेट कार्यालय।' },
    { flag: 'ae', title: 'संयुक्त अरब अमीरात', desc: 'दुबई — उद्यम ग्राहक।' },
    { flag: 'ke', title: 'केन्या', desc: 'नैरोबी — पूर्वी अफ्रीका हब।' },
    { flag: 'uk', title: 'यूनाइटेड किंगडम', desc: 'लंदन — पश्चिमी यूरोप कार्यालय।' },
    { flag: 'us', title: 'संयुक्त राज्य अमेरिका', desc: 'न्यूयोर्क — अमेरिका संचालन।' },
  ]
};



export default function HowItWorksPage() {
  const { locale } = useLocale();
  const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';
  const stepList = steps[locale as keyof typeof steps] || steps.en;
  const global = globalItems[locale as keyof typeof globalItems] || globalItems.en;

  return (
    <div className="bg-[#F8F9FB] text-[#141F33] min-h-screen flex flex-col font-sans" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <Header />

      <section className="max-w-7xl mx-auto px-6 py-20 md:py-28 text-center">
        <span className="inline-block bg-[#141F33] text-[#141F33] text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
          {t({ en: 'How It Works', fr: 'Comment ça marche', ar: 'كيف يعمل', hi: 'यह कैसे काम करता है' })}
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-[#141F33] leading-tight max-w-4xl mx-auto">
          {t({ en: 'From your first call to go-live in under a week', fr: 'De votre premier appel à la mise en ligne en moins d\'une semaine', ar: 'من أول مكالمة إلى التشغيل الفعلي في أقل من أسبوع', hi: 'आपके पहले कॉल से लेकर एक सप्ताह से भी कम समय में लाइव होने तक' })}
        </h1>
        <p className="mt-4 text-lg text-[#141F33] max-w-2xl mx-auto">
          {t({ en: 'Quick setup, minimal training, immediate results — anywhere you operate.', fr: 'Configuration rapide, formation minimale, résultats immédiats — partout où vous opérez.', ar: 'إعداد سريع، تدريب بسيط، نتائج فورية — أينما كنت.', hi: 'त्वरित सेटअप, न्यूनतम प्रशिक्षण, तत्काल परिणाम — आप जहां भी काम करते हैं।' })}
        </p>
      </section>

      <section className="bg-[#F8F9FB] py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="space-y-8">
            {stepList.map((s) => (
              <div key={s.step} className="flex items-start gap-8 bg-white border border-[#141F33]/10 rounded-[40px] p-8 shadow-sm shadow-[0_10px_40px_rgba(0,0,0,0.05)]">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[40px] bg-[#141F33] text-lg font-bold text-[#F8F9FB]">
                  {s.step}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#141F33] mb-1">{s.title}</h3>
                  <p className="text-[#141F33] leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-[#141F33] text-center mb-12">
            {t({ en: 'Global by Design', fr: 'Global par conception', ar: 'عالمي بالتصميم', hi: 'डिज़ाइन द्वारा वैश्विक' })}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {global.map((g) => (
              <div key={g.title} className="border border-[#141F33]/10 rounded-[40px] p-8 shadow-sm">
                <span className="text-3xl mb-3 block">{flagIcons[g.flag] || <Globe className="w-8 h-8 text-[#141F33]" />}</span>
                <h3 className="text-lg font-bold text-[#141F33] mb-2">{g.title}</h3>
                <p className="text-sm text-[#141F33] leading-relaxed">{g.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#141F33] py-16">
        <div className="max-w-3xl mx-auto px-6 text-center text-[#F8F9FB]">
          <h2 className="text-3xl font-bold mb-4">
            {t({ en: 'Start Your Journey Today', fr: 'Commencez votre voyage aujourd\'hui', ar: 'ابدأ رحلتك اليوم', hi: 'आज ही अपनी यात्रा शुरू करें' })}
          </h2>
          <p className="text-[#F8F9FB] mb-8">
            {t({ en: 'Let\'s build your AI operations — wherever you are.', fr: 'Construisons vos opérations d\'IA — où que vous soyez.', ar: 'دعنا نبني عملياتك الذكية — أينما كنت.', hi: 'आइए आपके एआई संचालन का निर्माण करें — आप जहां भी हों।' })}
          </p>
          <a
            href={process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/saqynrabt/demo'}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-[#F8F9FB] text-[#141F33] px-6 py-3 text-xs font-bold min-h-[44px] hover:opacity-90 transition-all"
          >
            {t({ en: 'See how it works', fr: 'Découvrez comment ça marche', ar: 'شاهد كيف يعمل', hi: 'देखें यह कैसे काम करता है' })}
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
