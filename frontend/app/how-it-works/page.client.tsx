'use client';

import * as React from 'react';
import { useLocale } from '../providers';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { Globe, MessageSquare, Users, Headphones } from 'lucide-react';

const steps = {
  en: [
    { step: '01', title: 'Book a Discovery Call', desc: 'Schedule a 15-minute call with our team. We learn about your operations, pain points, and goals.' },
    { step: '02', title: 'We Configure Your Workspace', desc: 'Our team sets up your department routing rules, voice scripts, and dashboard. We guide you through connecting your phone system and configuring your first workflows.' },
    { step: '03', title: 'Team Training (1 Hour)', desc: 'We walk your team through the dashboard, answer questions, and ensure everyone is comfortable with the system.' },
    { step: '04', title: 'Go Live', desc: 'Within 5\u20137 business days after setup, your system is ready for testing. We work with you during the first week to fine-tune routing and responses.' },
    { step: '05', title: 'Ongoing Optimization', desc: 'We provide ongoing support to help you refine your workflows, update routing rules, and make the system work better for your team over time.' },
  ],
  ar: [
    { step: '01', title: 'احجز مكالمة اكتشاف', desc: 'احجز مكالمة مدتها 15 دقيقة مع فريقنا. نتعرف على عملياتك ونقاط الألم وأهدافك.' },
    { step: '02', title: 'نقوم بتكوين مساحة عملك', desc: 'فريقنا يضبط قواعد توجيه الأقسام والنصوص الصوتية ولوحة التحكم. نرشدك خلال ربط نظام الهاتف وتكوين مهام سير العمل الأولى.' },
    { step: '03', title: 'تدريب الفريق (ساعة واحدة)', desc: 'نرشد فريقك خلال لوحة التحكم ونجيب على الأسئلة ونتأكد من راحة الجميع مع النظام.' },
    { step: '04', title: 'بدء التشغيل', desc: 'خلال 5-7 أيام عمل بعد الإعداد، نظامك جاهز للاختبار. نعمل معك خلال الأسبوع الأول لضبط التوجيه والردود.' },
    { step: '05', title: 'تحسين مستمر', desc: 'نقدم دعماً مستمراً لمساعدتك في تحسين مهام سير العمل وتحديث قواعد التوجيه وجعل النظام يعمل بشكل أفضل لفريقك مع مرور الوقت.' },
  ],
  fr: [
    { step: '01', title: 'R\u00e9server un appel de d\u00e9couverte', desc: 'Planifiez un appel de 15 minutes avec notre \u00e9quipe. Nous en apprenons plus sur vos op\u00e9rations, vos points faibles et vos objectifs.' },
    { step: '02', title: 'Nous configurons votre espace de travail', desc: 'Notre \u00e9quipe configure vos r\u00e8gles de routage, scripts vocaux et tableau de bord. Nous vous guidons pour connecter votre syst\u00e8me t\u00e9l\u00e9phonique et configurer vos premiers flux de travail.' },
    { step: '03', title: "Formation de l'\u00e9quipe (1 heure)", desc: 'Nous guidons votre \u00e9quipe \u00e0 travers le tableau de bord, r\u00e9pondons aux questions et assurons que tout le monde est \u00e0 l\u2019aise avec le syst\u00e8me.' },
    { step: '04', title: 'Mise en service', desc: 'Sous 5 \u00e0 7 jours ouvrables apr\u00e8s la configuration, votre syst\u00e8me est pr\u00eat pour les tests. Nous travaillons avec vous durant la premi\u00e8re semaine pour affiner le routage et les r\u00e9ponses.' },
    { step: '05', title: 'Optimisation continue', desc: "Nous fournissons un accompagnement continu pour vous aider \u00e0 affiner vos flux de travail, mettre \u00e0 jour les r\u00e8gles de routage et am\u00e9liorer le syst\u00e8me pour votre \u00e9quipe au fil du temps." },
  ],
  hi: [
    { step: '01', title: 'डिस्कवरी कॉल बुक करें', desc: 'हमारी टीम के साथ 15 मिनट की कॉल शेड्यूल करें। हम आपके संचालन, समस्याओं और लक्ष्यों के बारे में सीखते हैं।' },
    { step: '02', title: 'हम आपका कार्यक्षेत्र कॉन्फ़िगर करते हैं', desc: 'हमारी टीम आपके विभाग रूटिंग नियम, वॉयस स्क्रिप्ट और डैशबोर्ड सेट करती है। हम आपको फोन सिस्टम कनेक्ट करने और पहले वर्कफ़्लो कॉन्फ़िगर करने में मार्गदर्शन करते हैं।' },
    { step: '03', title: 'टीम प्रशिक्षण (1 घंटा)', desc: 'हम आपकी टीम को डैशबोर्ड के माध्यम से मार्गदर्शन करते हैं, सवालों के जवाब देते हैं, और सुनिश्चित करते हैं कि हर कोई सिस्टम के साथ सहज है।' },
    { step: '04', title: 'लाइव जाएं', desc: 'सेटअप के बाद 5-7 व्यावसायिक दिनों में, आपका सिस्टम परीक्षण के लिए तैयार है। हम पहले सप्ताह के दौरान आपके साथ रूटिंग और प्रतिक्रियाओं को बेहतर बनाने के लिए काम करते हैं।' },
    { step: '05', title: 'निरंतर अनुकूलन', desc: 'हम आपके वर्कफ़्लो को बेहतर बनाने, रूटिंग नियमों को अपडेट करने और समय के साथ सिस्टम को आपकी टीम के लिए बेहतर बनाने में सहायता प्रदान करते हैं।' },
  ]
};

const approachItems = {
  en: [
    { icon: <Globe className="w-8 h-8 text-primary" />, title: 'Remote-First Team', desc: 'Our team operates across time zones to support your business anywhere. No physical offices needed \u2014 we come to you.' },
    { icon: <MessageSquare className="w-8 h-8 text-primary" />, title: 'Multilingual by Default', desc: 'Arabic, English, French, Hindi, and more. Your AI front-desk speaks your customers\u2019 language.' },
    { icon: <Users className="w-8 h-8 text-primary" />, title: 'Partner Ecosystem', desc: 'We work with local telecom and VoIP providers in every region to ensure reliable call routing and connectivity.' },
    { icon: <Headphones className="w-8 h-8 text-primary" />, title: 'Hands-On Onboarding', desc: 'No \u201cset it and forget it.\u201d We stay involved during your first weeks to ensure everything runs smoothly.' },
  ],
  ar: [
    { icon: <Globe className="w-8 h-8 text-primary" />, title: 'فريق يعمل عن بُعد', desc: 'فريقنا يعمل عبر المناطق الزمنية لدعم أعمالك في أي مكان. لا حاجة لمكاتب فعلية \u2014 نحن نأتي إليك.' },
    { icon: <MessageSquare className="w-8 h-8 text-primary" />, title: 'متعدد اللغات افتراضياً', desc: 'العربية والإنجليزية والفرنسية والهندية والمزيد. مكتب الاستقبال الذكي يتحدث لغة عملائك.' },
    { icon: <Users className="w-8 h-8 text-primary" />, title: 'نظام شركاء', desc: 'نعمل مع مزودي الاتصالات المحليين في كل منطقة لضمان توجيه المكالمات بشكل موثوق.' },
    { icon: <Headphones className="w-8 h-8 text-primary" />, title: 'توجيه عملي', desc: 'لا "اضبط وانس". نبقى معك خلال الأسابيع الأولى لضمان سير كل شيء بسلاسة.' },
  ],
  fr: [
    { icon: <Globe className="w-8 h-8 text-primary" />, title: '\u00c9quipe Remote-First', desc: 'Notre \u00e9quipe op\u00e8re \u00e0 travers les fuseaux horaires pour soutenir votre entreprise partout. Pas de bureaux physiques n\u00e9cessaires \u2014 nous venons \u00e0 vous.' },
    { icon: <MessageSquare className="w-8 h-8 text-primary" />, title: 'Multilingue par D\u00e9faut', desc: 'Arabe, anglais, fran\u00e7ais, hindi et plus encore. Votre accueil IA parle la langue de vos clients.' },
    { icon: <Users className="w-8 h-8 text-primary" />, title: '\u00c9cosyst\u00e8me de Partenaires', desc: 'Nous travaillons avec des fournisseurs t\u00e9l\u00e9com locaux dans chaque r\u00e9gion pour assurer un routage fiable des appels.' },
    { icon: <Headphones className="w-8 h-8 text-primary" />, title: 'Int\u00e9gration Accompagn\u00e9e', desc: 'Pas de "configurez et oubliez". Nous restons impliqu\u00e9s durant vos premi\u00e8res semaines pour garantir le bon fonctionnement.' },
  ],
  hi: [
    { icon: <Globe className="w-8 h-8 text-primary" />, title: 'रिमोट-फर्स्ट टीम', desc: 'हमारी टीम आपके व्यवसाय को कहीं भी समर्थन देने के लिए समय क्षेत्रों में काम करती है। भौतिक कार्यालयों की आवश्यकता नहीं \u2014 हम आपके पास आते हैं।' },
    { icon: <MessageSquare className="w-8 h-8 text-primary" />, title: 'डिफ़ॉल्ट रूप से बहुभाषी', desc: 'अरबी, अंग्रेज़ी, फ्रेंच, हिंदी और अधिक। आपका AI फ्रंट-डेस्क आपके ग्राहकों की भाषा बोलता है।' },
    { icon: <Users className="w-8 h-8 text-primary" />, title: 'पार्टनर इकोसिस्टम', desc: 'हम विश्वसनीय कॉल रूटिंग सुनिश्चित करने के लिए हर क्षेत्र में स्थानीय टेलिकॉम और VoIP प्रदाताओं के साथ काम करते हैं।' },
    { icon: <Headphones className="w-8 h-8 text-primary" />, title: 'व्यावहारिक ऑनबोर्डिंग', desc: '"सेट करें और भूलें" नहीं। हम आपके पहले हफ्तों के दौरान शामिल रहते हैं ताकि सब कुछ सुचारू रूप से चले।' },
  ]
};

export default function HowItWorksPage() {
  const { locale } = useLocale();
  const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';
  const stepList = steps[locale as keyof typeof steps] || steps.en;
  const approachList = approachItems[locale as keyof typeof approachItems] || approachItems.en;

  return (
    <div className="bg-surface text-primary min-h-screen flex flex-col font-sans" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <Header />

      <section className="max-w-7xl mx-auto px-6 py-20 md:py-28 text-center">
        <span className="inline-block bg-primary text-primary text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
          {t({ en: 'How It Works', fr: 'Comment \u00e7a marche', ar: 'كيف يعمل', hi: 'यह कैसे काम करता है' })}
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-primary leading-tight max-w-4xl mx-auto">
          {t({ en: 'From your first call to go-live in under a week', fr: "De votre premier appel \u00e0 la mise en ligne en moins d'une semaine", ar: 'من أول مكالمة إلى التشغيل الفعلي في أقل من أسبوع', hi: 'आपकी पहली कॉल से लेकर एक सप्ताह से भी कम समय में लाइव होने तक' })}
        </h1>
        <p className="mt-4 text-lg text-primary max-w-2xl mx-auto">
          {t({ en: 'Quick setup, minimal training, immediate results \u2014 anywhere you operate.', fr: 'Configuration rapide, formation minimale, r\u00e9sultats imm\u00e9diats \u2014 partout o\u00f9 vous op\u00e9rez.', ar: 'إعداد سريع، تدريب بسيط، نتائج فورية \u2014 أينما كنت.', hi: 'त्वरित सेटअप, न्यूनतम प्रशिक्षण, तत्काल परिणाम \u2014 आप जहां भी काम करते हैं।' })}
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
            {t({ en: 'Our Approach', fr: 'Notre approche', ar: 'نهجنا', hi: 'हमारा दृष्टिकोण' })}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {approachList.map((item) => (
              <div key={item.title} className="border border-primary/10 rounded-xl p-8 shadow-sm">
                <span className="block mb-4">{item.icon}</span>
                <h3 className="text-lg font-bold text-primary mb-2">{item.title}</h3>
                <p className="text-sm text-primary leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary py-16">
        <div className="max-w-3xl mx-auto px-6 text-center text-surface">
          <h2 className="text-3xl font-bold mb-4">
            {t({ en: 'Start Your Journey Today', fr: "Commencez votre voyage aujourd'hui", ar: 'ابدأ رحلتك اليوم', hi: 'आज ही अपनी यात्रा शुरू करें' })}
          </h2>
          <p className="text-surface mb-8">
            {t({ en: 'We\u2019re in pilot phase and looking for early partners. Get hands-on support and shape the product with us.', fr: 'Nous sommes en phase pilote et recherchons des partenaires pr\u00e9coces. B\u00e9n\u00e9ficiez d\u2019un accompagnement personnalis\u00e9 et contribuez \u00e0 fa\u00e7onner le produit avec nous.', ar: 'نحن في المرحلة التجريبية ونبحث عن شركاء مبكرين. احصل على دعم مباشر وساهم في تشكيل المنتج معنا.', hi: 'हम पायलट चरण में हैं और शुरुआती भागीदारों की तलाश कर रहे हैं। व्यावहारिक सहायता प्राप्त करें और हमारे साथ उत्पाद को आकार दें।' })}
          </p>
          <a
            href={process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/saqynrabt/demo'}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-surface text-primary px-6 py-3 text-xs font-bold min-h-[44px] hover:opacity-90 transition-all"
          >
            {t({ en: 'See how it works', fr: 'D\u00e9couvrez comment \u00e7a marche', ar: 'شاهد كيف يعمل', hi: 'देखें यह कैसे काम करता है' })}
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}