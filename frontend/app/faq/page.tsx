'use client';

import { useState } from 'react';
import { useLocale } from '../providers';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';

const categories = {
  en: [
    {
      title: 'Getting Started',
      questions: [
        { q: 'How long does setup take?', a: 'Most clients are live within 5–7 business days after the onboarding call. The setup fee covers our team configuring your routing, voice scripts, and dashboard integrations.' },
        { q: 'Do I need technical skills?', a: 'No. Our team handles all configuration. You only need to attend a 1-hour training session with your staff.' },
        { q: 'What do I need to provide?', a: 'Your phone number, department list, SOP documents (for the chatbot), and any existing FAQ materials. We handle the rest.' },
        { q: 'Can I try before committing?', a: 'Yes. Book a demo and we\'ll show you a live workspace configured for your industry.' },
      ],
    },
    {
      title: 'Features & Usage',
      questions: [
        { q: 'What channels does it support?', a: 'Phone calls, WhatsApp, SMS, web chat widget, and contact forms — all from one dashboard.' },
        { q: 'What languages does it support?', a: 'Arabic and English out of the box, with additional languages available on custom plans.' },
        { q: 'Can it integrate with my existing tools?', a: 'Yes. We support CRM integrations, calendar sync, and custom API hooks on our Professional and Enterprise plans.' },
        { q: 'What counts as a text request?', a: 'Any inbound message through your website chat, WhatsApp, contact form, or SMS. Each customer message = 1 request.' },
      ],
    },
    {
      title: 'Data & Security',
      questions: [
        { q: 'Is my company data private?', a: 'Absolutely. Your documents are stored in an isolated, encrypted knowledge base. The AI model is never trained on your data.' },
        { q: 'Where is my data stored?', a: 'You can choose your data region: Middle East, Europe, or United States. We are compliant with local regulations.' },
        { q: 'Do you record calls?', a: 'Live transcripts are logged on your dashboard for audit. You control retention policies.' },
      ],
    },
    {
      title: 'Global Service',
      questions: [
        { q: 'Are you only for Qatar?', a: 'No. We are a global company serving clients across the Middle East, Asia, Europe, Africa, and the Americas.' },
        { q: 'What currencies do you support?', a: 'We invoice in USD, EUR, GBP, and local currencies. No hidden conversion fees.' },
        { q: 'Do you support multiple time zones?', a: 'Yes. Your AI front-desk operates 24/7 and handles inquiries from any time zone automatically.' },
      ],
    },
    {
      title: 'Billing & Plans',
      questions: [
        { q: 'Can I change my plan later?', a: 'Yes. Upgrade at any time mid-cycle. Downgrades take effect at the next billing date.' },
        { q: 'What happens if I exceed my limits?', a: 'Only if you enable overages. By default, the system stops at your plan limit so you never get surprise bills.' },
        { q: 'Is there a contract?', a: 'All plans are month-to-month with no long-term contract. Enterprise plans may have annual terms.' },
      ],
    },
  ],
  ar: [
    {
      title: 'بدء الاستخدام',
      questions: [
        { q: 'كم من الوقت يستغرق الإعداد؟', a: 'معظم العملاء يبدأ تشغيلهم في غضون 5-7 أيام عمل بعد مكالمة الإعداد. تغطي رسوم الإعداد قيام فريقنا بتهيئة توجيه المكالمات والنصوص الصوتية وتكامل لوحة التحكم.' },
        { q: 'هل أحتاج لمهارات تقنية؟', a: 'لا. يتولى فريقنا كل عمليات التهيئة. ما عليك سوى حضور جلسة تدريبية لمدة ساعة واحدة مع موظفيك.' },
        { q: 'ما الذي يجب علي تقديمه؟', a: 'رقم هاتفك، وقائمة الأقسام، ومستندات إجراءات العمل (للروبوت)، وأي أسئلة شائعة حالية. نحن نتولى الباقي.' },
        { q: 'هل يمكنني التجربة قبل الالتزام؟', a: 'نعم. احجز عرضاً تجريبياً وسنريك مساحة عمل مباشرة مهيأة لقطاعك.' },
      ],
    },
    {
      title: 'الميزات والاستخدام',
      questions: [
        { q: 'ما هي القنوات التي تدعمها؟', a: 'المكالمات الهاتفية، وواتساب، والرسائل القصيرة، ورمز محادثة الويب، ونماذج الاتصال — كل ذلك من لوحة تحكم واحدة.' },
        { q: 'ما هي اللغات المدعومة؟', a: 'العربية والإنجليزية بشكل أساسي، مع توفر لغات إضافية في الخطط المخصصة.' },
        { q: 'هل يمكن دمجها مع أدواتي الحالية؟', a: 'نعم. نحن ندعم تكاملات CRM ومزامنة التقويم وربط API المخصص في خططنا الاحترافية والمؤسسية.' },
        { q: 'ما الذي يعتبر طلباً نصياً؟', a: 'أي رسالة واردة من خلال محادثة موقعك، أو واتساب، أو نموذج الاتصال، أو الرسائل القصيرة. كل رسالة عميل = طلب واحد.' },
      ],
    },
    {
      title: 'البيانات والأمان',
      questions: [
        { q: 'هل بيانات شركتي خاصة؟', a: 'بالتأكيد. يتم تخزين مستنداتك في قاعدة معرفية معزولة ومشفرة. لا يتم تدريب نموذج الذكاء الاصطناعي على بياناتك أبداً.' },
        { q: 'أين يتم تخزين بياناتي؟', a: 'يمكنك اختيار منطقة تخزين بياناتك: الشرق الأوسط، أو أوروبا، أو الولايات المتحدة. نحن متوافقون مع اللوائح المحلية.' },
        { q: 'هل تسجلون المكالمات؟', a: 'يتم تسجيل النصوص الحية في لوحة التحكم الخاصة بك للتدقيق والمراجعة. أنت تتحكم في سياسات الاحتفاظ بها.' },
      ],
    },
    {
      title: 'الخدمة العالمية',
      questions: [
        { q: 'هل خدماتكم مقتصرة على قطر؟', a: 'لا. نحن شركة عالمية نخدم العملاء في جميع أنحاء الشرق الأوسط وآسيا وأوروبا وإفريقيا والأمريكتين.' },
        { q: 'ما هي العملات المدعومة؟', a: 'نصدر الفواتير بالدولار الأمريكي، واليورو، والجنيه الإسترليني، والعملات المحلية. لا توجد رسوم تحويل مخفية.' },
        { q: 'هل تدعمون مناطق زمنية متعددة؟', a: 'نعم. يعمل مكتب الاستقبال الذكي لديك على مدار الساعة طوال أيام الأسبوع ويتعامل مع الاستفسارات تلقائياً من أي منطقة زمنية.' },
      ],
    },
    {
      title: 'الفواتير والخطط',
      questions: [
        { q: 'هل يمكنني تغيير خطتي لاحقاً؟', a: 'نعم. يمكنك الترقية في أي وقت خلال الدورة الفاتورية. تسري التخفيضات في موعد الفاتورة التالي.' },
        { q: 'ماذا يحدث إذا تجاوزت حدودي المسموحة؟', a: 'فقط إذا قمت بتمكين الاستهلاك الإضافي. بشكل افتراضي، يتوقف النظام عند حدود خطتك حتى لا تواجه فواتير مفاجئة.' },
        { q: 'هل هناك عقد التزام؟', a: 'جميع الخطط شهرية دون أي عقد طويل الأجل. قد تشتمل خطط المؤسسات الكبرى على شروط سنوية.' },
      ],
    },
  ],
  fr: [
    {
      title: 'Pour Commencer',
      questions: [
        { q: 'Combien de temps prend la configuration ?', a: 'La plupart des clients sont en ligne sous 5 à 7 jours ouvrables après l\'appel d\'intégration. Les frais couvrent la configuration de vos routages, scripts vocaux et intégrations.' },
        { q: 'Ai-je besoin de compétences techniques ?', a: 'Non. Notre équipe s\'occupe de toute la configuration. Vous devez seulement assister à une formation d\'une heure avec votre personnel.' },
        { q: 'Que dois-je fournir ?', a: 'Votre numéro de téléphone, liste de services, documents SOP (pour le chatbot) et toute FAQ existante. Nous gérons le reste.' },
        { q: 'Puis-je essayer avant de m\'engager ?', a: 'Oui. Réservez une démo et nous vous montrerons un espace de travail en direct configuré pour votre secteur.' },
      ],
    },
    {
      title: 'Fonctionnalités & Utilisation',
      questions: [
        { q: 'Quels canaux sont pris en charge ?', a: 'Appels téléphoniques, WhatsApp, SMS, widget de chat web et formulaires de contact — le tout depuis un seul tableau de bord.' },
        { q: 'Quelles langues sont prises en charge ?', a: 'L\'arabe et l\'anglais par défaut, avec d\'autres langues disponibles sur les plans personnalisés.' },
        { q: 'Peut-il s\'intégrer à mes outils existants ?', a: 'Oui. Nous prenons en charge les intégrations CRM, la synchronisation des calendriers et les hooks d\'API personnalisés sur nos plans Professionnel et Entreprise.' },
        { q: 'Qu\'est-ce qui compte comme une requête texte ?', a: 'Tout message entrant via le chat de votre site, WhatsApp, formulaire de contact ou SMS. Chaque message client = 1 requête.' },
      ],
    },
    {
      title: 'Données & Sécurité',
      questions: [
        { q: 'Les données de mon entreprise sont-elles privées ?', a: 'Absolument. Vos documents sont stockés dans une base de connaissances isolée et cryptée. Le modèle d\'IA n\'est jamais entraîné sur vos données.' },
        { q: 'Où mes données sont-elles stockées ?', a: 'Vous pouvez choisir votre région de données : Moyen-Orient, Europe ou États-Unis. Nous sommes conformes aux réglementations locales.' },
        { q: 'Enregistrez-vous les appels ?', a: 'Les transcriptions en direct sont journalisées sur votre tableau de bord pour audit. Vous contrôlez les politiques de rétention.' },
      ],
    },
    {
      title: 'Service Global',
      questions: [
        { q: 'Êtes-vous uniquement présents au Qatar ?', a: 'Non. Nous sommes une entreprise mondiale au service de clients au Moyen-Orient, en Asie, en Europe, en Afrique et dans les Amériques.' },
        { q: 'Quelles devises prenez-vous en charge ?', a: 'Nous facturons en USD, EUR, GBP et devises locales. Aucun frais de conversion caché.' },
        { q: 'Prenez-vous en charge plusieurs fuseaux horaires ?', a: 'Oui. Votre accueil IA fonctionne 24/7 et gère automatiquement les demandes de tous les fuseaux horaires.' },
      ],
    },
    {
      title: 'Facturation & Plans',
      questions: [
        { q: 'Puis-je modifier mon forfait plus tard ?', a: 'Oui. Mettez à niveau à tout moment. Les rétrogradations prennent effet à la prochaine date de facturation.' },
        { q: 'Que se passe-t-il si je dépasse mes limites ?', a: 'Uniquement si vous activez les dépassements. Par défaut, le système s\'arrête à la limite de votre forfait pour éviter les surprises.' },
        { q: 'Y a-t-il un contrat d\'engagement ?', a: 'Tous les forfaits sont mensuels sans engagement à long terme. Les plans Entreprise peuvent avoir des conditions annuelles.' },
      ],
    },
  ],
  hi: [
    {
      title: 'शुरुआत करना',
      questions: [
        { q: 'सेटअप में कितना समय लगता है?', a: 'ऑनबोर्डिंग कॉल के बाद अधिकांश ग्राहक 5-7 व्यावसायिक दिनों के भीतर लाइव हो जाते हैं। सेटअप शुल्क में हमारी टीम द्वारा आपके रूटिंग, वॉयस स्क्रिप्ट और डैशबोर्ड एकीकरण को कॉन्फ़िगर करना शामिल है।' },
        { q: 'क्या मुझे तकनीकी कौशल की आवश्यकता है?', a: 'नहीं। हमारी टीम सभी कॉन्फ़िगरेशन संभालती है। आपको केवल अपने कर्मचारियों के साथ 1 घंटे के प्रशिक्षण सत्र में भाग लेने की आवश्यकता है।' },
        { q: 'मुझे क्या प्रदान करने की आवश्यकता है?', a: 'का फोन नंबर, विभाग सूची, एसओपी दस्तावेज (चैटबॉट के लिए), और कोई भी अक्सर पूछे जाने वाले प्रश्न सामग्री। हम बाकी काम संभालते हैं।' },
        { q: 'क्या मैं प्रतिबद्ध होने से पहले प्रयास कर सकता हूँ?', a: 'हाँ। एक डेमो बुक करें और हम आपको आपके उद्योग के लिए कॉन्फ़िगर किया गया एक लाइव कार्यक्षेत्र दिखाएंगे।' },
      ],
    },
    {
      title: 'सुविधाएँ और उपयोग',
      questions: [
        { q: 'यह किन चैनलों का समर्थन करता है?', a: 'फोन कॉल, व्हाट्सएप, एसएमएस, वेब चैट विजेट, और संपर्क फ़ॉर्म — सभी एक ही डैशबोर्ड से।' },
        { q: 'यह किन भाषाओं का समर्थन करता है?', a: 'अरबी और अंग्रेजी मानक रूप से समर्थित हैं, और कस्टम योजनाओं पर अतिरिक्त भाषाएं उपलब्ध हैं।' },
        { q: 'क्या यह मेरे मौजूदा उपकरणों के साथ एकीकृत हो सकता है?', a: 'हाँ। हम अपनी पेशेवर और उद्यम योजनाओं पर सीआरएम एकीकरण, कैलेंडर सिंक, और कस्टम एपीआई हुक का समर्थन करते हैं।' },
        { q: 'एक टेक्स्ट अनुरोध के रूप में क्या गिना जाता है?', a: 'आपकी वेबसाइट चैट, व्हाट्सएप, संपर्क फ़ॉर्म, या एसएमएस के माध्यम से कोई भी इनबाउंड संदेश। प्रत्येक ग्राहक संदेश = 1 अनुरोध।' },
      ],
    },
    {
      title: 'डेटा और सुरक्षा',
      questions: [
        { q: 'क्या मेरी कंपनी का डेटा निजी है?', a: 'बिल्कुल। आपके दस्तावेज़ एक अलग, एन्क्रिप्टेड ज्ञान आधार में संग्रहीत हैं। एआई मॉडल को कभी भी आपके डेटा पर प्रशिक्षित नहीं किया जाता है।' },
        { q: 'मेरा डेटा कहाँ संग्रहीत है?', a: 'आप अपना डेटा क्षेत्र चुन सकते हैं: मध्य पूर्व, यूरोप, या संयुक्त राज्य अमेरिका। हम स्थानीय नियमों के अनुरूप हैं।' },
        { q: 'क्या आप कॉल रिकॉर्ड करते हैं?', a: 'ऑडिट के लिए आपके डैशबोर्ड पर लाइव ट्रांसक्रिप्ट लॉग किए जाते हैं। आप डेटा बनाए रखने की नीतियों को नियंत्रित करते हैं।' },
      ],
    },
    {
      title: 'वैश्विक सेवा',
      questions: [
        { q: 'क्या आप केवल कतर के लिए हैं?', a: 'नहीं। हम मध्य पूर्व, एशिया, यूरोप, अफ्रीका और अमेरिका में ग्राहकों की सेवा करने वाली एक वैश्विक कंपनी हैं।' },
        { q: 'आप किन मुद्राओं का समर्थन करते हैं?', a: 'हम USD, EUR, GBP और स्थानीय मुद्राओं में चालान करते हैं। कोई छिपी हुई रूपांतरण फीस नहीं।' },
        { q: 'क्या आप एकाधिक समय क्षेत्रों का समर्थन करते हैं?', a: 'हाँ। आपका एआई फ्रंट-डेस्क 24/7 काम करता है और किसी भी समय क्षेत्र से पूछताछ को स्वचालित रूप से संभालता है।' },
      ],
    },
    {
      title: 'बिलिंग और योजनाएं',
      questions: [
        { q: 'क्या मैं बाद में अपनी योजना बदल सकता हूँ?', a: 'हाँ। चक्र के मध्य में किसी भी समय अपग्रेड करें। डाउनग्रेड अगली बिलिंग तिथि पर प्रभावी होते हैं।' },
        { q: 'यदि मैं अपनी सीमा पार कर जाऊं तो क्या होगा?', a: 'केवल यदि आप ओवरएज सक्षम करते हैं। डिफ़ॉल्ट रूप से, सिस्टम आपकी योजना सीमा पर रुक जाता है ताकि आपको कभी भी आश्चर्यजनक बिल न मिले।' },
        { q: 'क्या कोई अनुबंध है?', a: 'सभी योजनाएं बिना किसी दीर्घकालिक अनुबंध के महीने-दर-महीने हैं। उद्यम योजनाओं में वार्षिक शर्तें हो सकती हैं।' },
      ],
    },
  ]
};

export default function FAQPage() {
  const { locale } = useLocale();
  const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const catList = categories[locale as keyof typeof categories] || categories.en;

  return (
    <div className="bg-[#F8F9FB] text-[#141F33] min-h-screen flex flex-col font-sans" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <Header />

      <section className="max-w-4xl mx-auto px-6 py-20 md:py-28 text-center">
        <span className="inline-block bg-[#141F33]/10 text-[#141F33] text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
          {t({ en: 'FAQ', fr: 'FAQ', ar: 'الأسئلة الشائعة', hi: 'एफएक्यू' })}
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-[#141F33] leading-tight max-w-3xl mx-auto">
          {t({ en: 'Frequently Asked Questions', fr: 'Questions fréquemment posées', ar: 'الأسئلة الشائعة', hi: 'अक्सर पूछे जाने वाले प्रश्न' })}
        </h1>
        <p className="mt-4 text-lg text-[#141F33] max-w-2xl mx-auto">
          {t({ en: 'Everything you need to know about SAQYN RABT — from setup to global deployment.', fr: 'Tout ce que vous devez savoir sur SAQYN RABT — de la configuration au déploiement mondial.', ar: 'كل ما تريد معرفته عن SAQYN RABT — من الإعداد إلى النشر العالمي.', hi: 'SAQYN RABT के बारे में सब कुछ जो आपको जानना आवश्यक है — सेटअप से लेकर वैश्विक परिनियोजन तक।' })}
        </p>
      </section>

      <section className="max-w-4xl mx-auto px-6 pb-20">
        {catList.map((cat) => (
          <div key={cat.title} className="mb-12">
            <h2 className="text-2xl font-bold text-[#141F33] mb-6 pb-2 border-b border-[#141F33]/10">{cat.title}</h2>
            <div className="space-y-3">
              {cat.questions.map((item, idx) => {
                const globalIdx = `${cat.title}-${idx}`;
                const isOpen = openIndex === idx;
                return (
                  <div key={globalIdx} className="border border-[#141F33]/10 rounded-2xl overflow-hidden">
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : idx)}
                      aria-expanded={isOpen}
                      aria-controls={globalIdx}
                      className="w-full flex items-center justify-between px-6 py-3 text-left font-bold text-[#141F33] text-xs min-h-[44px] hover:bg-[#F8F9FB] transition-all"
                    >
                      <span>{item.q}</span>
                      <svg className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" /></svg>
                    </button>
                    {isOpen && (
                      <div id={globalIdx} role="region" className="px-6 pb-4 text-[#141F33] text-sm leading-relaxed">
                        {item.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </section>

      <Footer />
    </div>
  );
}
