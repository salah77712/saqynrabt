'use client';

import * as React from 'react';
import { useLocale } from '../providers';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { Building2, HeartPulse, Wrench, Car, Utensils, Ambulance, DollarSign, Bell, Flag, Construction, Scale, BarChart3, ShoppingBag } from 'lucide-react';

const industryIcons: Record<string, React.ReactNode> = {
  hospitality: <Building2 className="w-8 h-8 text-[#141F33]" />,
  healthcare: <HeartPulse className="w-8 h-8 text-[#141F33]" />,
  homeServices: <Wrench className="w-8 h-8 text-[#141F33]" />,
  realEstate: <Building2 className="w-8 h-8 text-[#141F33]" />,
  automotive: <Car className="w-8 h-8 text-[#141F33]" />,
  food: <Utensils className="w-8 h-8 text-[#141F33]" />,
  towing: <Ambulance className="w-8 h-8 text-[#141F33]" />,
  veterinary: <HeartPulse className="w-8 h-8 text-[#141F33]" />,
  plumbing: <DollarSign className="w-8 h-8 text-[#141F33]" />,
  boutique: <Bell className="w-8 h-8 text-[#141F33]" />,
  catering: <Utensils className="w-8 h-8 text-[#141F33]" />,
  dealerships: <Flag className="w-8 h-8 text-[#141F33]" />,
  construction: <Construction className="w-8 h-8 text-[#141F33]" />,
  law: <Scale className="w-8 h-8 text-[#141F33]" />,
  accounting: <BarChart3 className="w-8 h-8 text-[#141F33]" />,
  retail: <ShoppingBag className="w-8 h-8 text-[#141F33]" />,
};

const industries = {
  en: [
    { icon: 'hospitality', title: 'Hospitality', desc: 'Hotels, resorts, and boutique properties use SAQYN RABT to handle late check-ins, room service requests, and guest complaints 24/7.' },
    { icon: 'healthcare', title: 'Healthcare', desc: 'Clinics and hospitals automate patient bookings, triage emergencies, and route inquiries to the right department instantly.' },
    { icon: 'homeServices', title: 'Home Services', desc: 'Plumbers, electricians, and HVAC companies capture emergency calls after hours and dispatch technicians immediately.' },
    { icon: 'realEstate', title: 'Real Estate', desc: 'Property managers route maintenance requests to on-site crews and handle tenant inquiries without a receptionist.' },
    { icon: 'automotive', title: 'Automotive', desc: 'Dealerships and repair shops automate service bookings, inventory inquiries, and quote requests around the clock.' },
    { icon: 'food', title: 'Food & Beverage', desc: 'Restaurants, cafes, and catering services book reservations and takeout orders during peak hours without missed calls.' },
    { icon: 'towing', title: 'Towing & Roadside', desc: 'Capture stranded drivers, get GPS data, and dispatch the nearest truck without a phone call.' },
    { icon: 'veterinary', title: 'Veterinary', desc: 'Triage emergency pet visits and route urgent cases to the on-call nurse immediately.' },
    { icon: 'plumbing', title: 'Plumbing & HVAC', desc: 'Stop losing money from missed after-hours repair calls. Capture every lead and dispatch your field team.' },
    { icon: 'boutique', title: 'Boutique Hotels', desc: 'Let guests au digital door codes at midnight. Handle late arrivals without front-desk staff.' },
    { icon: 'catering', title: 'Restaurants & Catering', desc: 'Quote and book catering orders with no phone tag. Standardize large event bookings.' },
    { icon: 'dealerships', title: 'Auto Dealerships', desc: 'Answer real-time inventory questions about used cars on your lot —  even after hours.' },
    { icon: 'construction', title: 'Construction', desc: 'Keep subcontractors updated on material delivery times and site work permits without manual calls.' },
    { icon: 'law', title: 'Law Firms', desc: 'Au retainer fee questions and intake form inquiries. Free up paralegals for billable work.' },
    { icon: 'accounting', title: 'Accounting & Tax', desc: 'Handle tax season refund status checks without a receptionist. Route complex cases to senior accountants.' },
    { icon: 'retail', title: 'Retail & E-commerce', desc: 'Answer product questions, process returns, and handle customer inquiries across every channel.' },
  ],
  ar: [
    { icon: 'hospitality', title: 'الضيافة', desc: 'تستخدم الفنادق والمنتجعات SAQYN RABT للتعامل مع تسجيلات الوصول المتأخرة وطلبات الغرف وشكاوى الضيوف 24/7.' },
    { icon: 'healthcare', title: 'الرعاية الصحية', desc: 'تؤتمت العيادات والمستشفيات حجوزات المرضى وفرز الحالات الطارئة وتوجيه الاستفسارات للقسم المناسب فوراً.' },
    { icon: 'homeServices', title: 'الخدمات المنزلية', desc: 'يلتقط السباكون والكهربائيون مكالمات الطوارئ بعد ساعات العمل ويرسلون الفنيين فوراً.' },
    { icon: 'realEstate', title: 'العقارات', desc: 'يوجه مديرو العقارات طلبات الصيانة لفرق العمل ويتعاملون مع استفسارات المستأجرين دون موظف استقبال.' },
    { icon: 'automotive', title: 'السيارات', desc: 'تؤتمت الوكالات وورش الإصلاح حجوزات الخدمة واستفسارات المخزون وطلبات عروض الأسعار على مدار الساعة.' },
    { icon: 'food', title: 'الأغذية والمشروبات', desc: 'تحجز المطاعم والمقاهي وخدمات التموين الطلبات خلال ساعات الذروة دون مكالمات فائتة.' },
    { icon: 'towing', title: 'السحب والخدمات على الطريق', desc: 'التقط السائقين العالقين واحصل على بيانات الموقع GPS وأرسل أقرب شاحنة دون مكالمة هاتفية.' },
    { icon: 'veterinary', title: 'الطب البيطري', desc: 'افرز زيارات الحيوانات الأليفة الطارئة ووجّه الحالات العاجلة للممرض المناوب فوراً.' },
    { icon: 'plumbing', title: 'السباكة والتدفئة والتكييف', desc: 'توقف عن خسارة الأموال من مكالمات الإصلاح الفائتة بعد ساعات العمل. التقط كل فرصة وأرسل فريقك الميداني.' },
    { icon: 'boutique', title: 'الفنادق البوتيكية', desc: 'دع الضيوف يخصصون رموز الأبواب الرقمية في منتصف الليل. تعامل مع الوصول المتأخر دون موظفي استقبال.' },
    { icon: 'catering', title: 'المطاعم والتموين', desc: 'سعّر واحجز طلبات التموين دون الحاجة للاتصالات المتكررة. وحّد حجوزات الفعاليات الكبيرة.' },
    { icon: 'dealerships', title: 'وكالات السيارات', desc: 'أجب عن أسئلة المخزون في الوقت الفعلي حول السيارات المستعملة في ساحتك — حتى بعد ساعات العمل.' },
    { icon: 'construction', title: 'البناء', desc: 'أبقِ مقاولي الباطن على علم بمواعيد تسليم المواد وتصاريح العمل في الموقع دون مكالمات يدوية.' },
    { icon: 'law', title: 'شركات المحاماة', desc: 'أجب تلقائياً عن أسئلة رسوم التوكيل واستفسارات نماذج القبول. فرّغ المساعدين القانونيين للعمل المدفوع.' },
    { icon: 'accounting', title: 'المحاسبة والضرائب', desc: 'تعامل مع التحقق من حالة الاسترداد في موسم الضرائب دون موظف استقبال. وجّه الحالات المعقدة لكبار المحاسبين.' },
    { icon: 'retail', title: 'التجزئة والتجارة الإلكترونية', desc: 'أجب عن أسئلة المنتجات وعالج المرتجعات وتولى استفسارات العملاء عبر كل قنوات الاتصال.' },
  ],
  fr: [
    { icon: 'hospitality', title: 'Hospitalité', desc: 'Les hôtels et complexes utilisent SAQYN RABT pour gérer les arrivées tardives, le service d\'étage et les plaintes des clients 24/7.' },
    { icon: 'healthcare', title: 'Santé', desc: 'Les cliniques et hôpitaux automatisent les réservations, trient les urgences et orientent les demandes instantanément.' },
    { icon: 'homeServices', title: 'Services à Domicile', desc: 'Les plombiers et électriciens capturent les appels d\'urgence hors heures et envoient des techniciens immédiatement.' },
    { icon: 'realEstate', title: 'Immobilier', desc: 'Les gestionnaires immobiliers orientent les demandes de maintenance et gèrent les requêtes des locataires sans réceptionniste.' },
    { icon: 'automotive', title: 'Automobile', desc: 'Les concessions et ateliers automatisent les rendez-vous, les questions de stock et les demandes de devis 24/7.' },
    { icon: 'food', title: 'Restauration', desc: 'Les restaurants et services traiteurs réservent des tables et prennent des commandes en heures de pointe sans appels manqués.' },
    { icon: 'towing', title: 'Dépannage', desc: 'Capturez les conducteurs en panne, obtenez les données GPS et envoyez la dépanneuse la plus proche sans appel téléphonique.' },
    { icon: 'veterinary', title: 'Vétérinaire', desc: 'Triez les visites d\'urgence et orientez les cas urgents vers l\'infirmier de garde immédiatement.' },
    { icon: 'plumbing', title: 'Plomberie & Chauffage', desc: 'Arrêtez de perdre de l\'argent avec les appels de réparation manqués. Capturez chaque prospect et envoyez votre équipe.' },
    { icon: 'boutique', title: 'Hôtels Boutique', desc: 'Laissez les clients s\'attribuer des codes de porte à minuit. Gérez les arrivées tardives sans personnel de réception.' },
    { icon: 'catering', title: 'Restaurants & Traiteurs', desc: 'Faites des devis et réservez des commandes traiteur sans perdre de temps. Standardisez les grandes réservations.' },
    { icon: 'dealerships', title: 'Concessions Auto', desc: 'Répondez aux questions de stock en temps réel sur les voitures d\'occasion de votre parc, même après les heures d\'ouverture.' },
    { icon: 'construction', title: 'Construction', desc: 'Tenez les sous-traitants informés des heures de livraison des matériaux et des permis de travail sans appels manuels.' },
    { icon: 'law', title: 'Cabinets d\'Avocats', desc: 'Répondez aux questions de frais de provision. Libérez les assistants juridiques pour le travail facturable.' },
    { icon: 'accounting', title: 'Comptabilité & Fiscalité', desc: 'Gerez le suivi des remboursements fiscaux sans réceptionniste. Orientez les cas complexes vers les comptables principaux.' },
    { icon: 'retail', title: 'Commerce & E-commerce', desc: 'Répondez aux questions sur les produits, gérez les retours et traitez les demandes des clients sur tous les canaux.' },
  ],
  hi: [
    { icon: 'hospitality', title: 'अतिथ्य सत्कार', desc: 'होटल और रिसॉर्ट देर से चेक-इन, रूम सर्विस अनुरोध और अतिथि शिकायतों को 24/7 संभालने के लिए SAQYN RABT का उपयोग करते हैं।' },
    { icon: 'healthcare', title: 'स्वास्थ्य सेवा', desc: 'क्लिनिक और अस्पताल रोगी बुकिंग को स्वचालित करते हैं, आपात स्थितियों को छांटते हैं, और पूछताछ को तुरंत सही विभाग में भेजते हैं।' },
    { icon: 'homeServices', title: 'गृह सेवाएं', desc: 'प्लंबर, इलेक्ट्रीशियन और एचवीएसी कंपनियां काम के घंटों के बाद आपातकालीन कॉल कैप्चर करती हैं और तकनीशियनों को तुरंत भेजती हैं।' },
    { icon: 'realEstate', title: 'रियल एस्टेट', desc: 'संपत्ति प्रबंधक रखरखाव अनुरोधों को ऑन-साइट क्रू को भेजते हैं और बिना रिसेप्शनिस्ट के किरायेदार पूछताछ को संभालते हैं।' },
    { icon: 'automotive', title: 'ऑटोमोटिव', desc: 'डीलरशिप और मरम्मत दुकानें चौबीसों घंटे सर्विस बुकिंग, इन्वेंट्री पूछताछ और कोट अनुरोधों को स्वचालित करती हैं।' },
    { icon: 'food', title: 'खाद्य और पेय', desc: 'रेस्टोरेंट, कैफे और खान-पान सेवाएं बिना मिस्ड कॉल के व्यस्त घंटों के दौरान आरक्षण और टेकआउट ऑर्डर बुक करती हैं।' },
    { icon: 'towing', title: 'टowing और सड़क सहायता', desc: 'फंसे हुए ड्राइवरों को कैप्चर करें, जीपीएस डेटा प्राप्त करें, और बिना फोन कॉल के निकटतम ट्रक को भेजें।' },
    { icon: 'veterinary', title: 'पशु चिकित्सा', desc: 'आपातकालीन पालतू जानवरों की यात्राओं को छांटें और तत्काल मामलों को ऑन-कॉल नर्स को तुरंत भेजें।' },
    { icon: 'plumbing', title: 'प्लंबिंग और एचवीएसी', desc: 'काम के घंटों के बाद मिस्ड रिपेयर कॉल से पैसा खोना बंद करें। हर लीड को कैप्चर करें और अपनी फील्ड टीम को भेजें।' },
    { icon: 'boutique', title: 'बुटीक होटल', desc: 'अतिथियों को आधी रात को डिजिटल डोर कोड स्वतः असाइन करने दें। फ्रंट-डेस्क कर्मचारियों के बिना देर से आने वालों को संभालें।' },
    { icon: 'catering', title: 'रेस्टोरेंट और खान-पान', desc: 'बिना किसी फोन टैग के खान-पान के ऑर्डर कोट और बुक करें। बड़े इवेंट बुकिंग को मानकीकृत करें।' },
    { icon: 'dealerships', title: 'ऑटो डीलरशिप', desc: 'अपने लॉट पर इस्तेमाल की गई कारों के बारे में वास्तविक समय में इन्वेंट्री सवालों के जवाब दें — काम के घंटों के बाद भी।' },
    { icon: 'construction', title: 'निर्माण', desc: 'बिना मैन्युअल कॉल के उपठेकेदारों को सामग्री वितरण समय और साइट कार्य परमिट पर अपडेट रखें।' },
    { icon: 'law', title: 'लॉ फर्म', desc: 'रिटेनर शुल्क सवालों और इनटेक फॉर्म पूछताछ का स्वतः उत्तर दें। बिल योग्य काम के लिए पैरालीगल को खाली करें।' },
    { icon: 'accounting', title: 'लेखांकन और कर', desc: 'रिसेप्शनिस्ट के बिना टैक्स सीजन रिफंड स्थिति की जांच को संभालें। जटिल मामलों को वरिष्ठ लेखाकारों को भेजें।' },
    { icon: 'retail', title: 'खुदरा और ई-कॉमर्स', desc: 'उत्पाद सवालों के जवाब दें, रिटर्न प्रोसेस करें और हर चैनल पर ग्राहकों की पूछताछ संभालें।' },
  ]
};



export default function IndustriesPage() {
  const { locale } = useLocale();
  const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';
  const list = industries[locale as keyof typeof industries] || industries.en;

  return (
    <div className="bg-[#F8F9FB] text-[#141F33] min-h-screen flex flex-col font-sans" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <Header />

      <section className="max-w-7xl mx-auto px-6 py-20 md:py-28 text-center">
        <span className="inline-block bg-[#141F33] text-[#141F33] text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
          {t({ en: 'Industries', fr: 'Secteurs d\'activité', ar: 'القطاعات', hi: 'उद्योग' })}
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-[#141F33] leading-tight max-w-4xl mx-auto">
          {t({ en: 'Built for 16 Industries — Worldwide', fr: 'Conçu pour 16 secteurs — Dans le monde entier', ar: 'مصمم لـ 16 قطاعاً — حول العالم', hi: '16 उद्योगों के लिए निर्मित — दुनिया भर में' })}
        </h1>
        <p className="mt-4 text-lg text-[#141F33] max-w-2xl mx-auto">
          {t({ en: 'Global headquarters with local expertise. Our platform adapts to your industry, language, and time zone.', fr: 'Siège mondial avec expertise locale. Notre plateforme s\'adapte à votre secteur, votre langue et votre fuseau horaire.', ar: 'مقر عالمي مع خبرة محلية. منصتنا تتكيف مع قطاعك ولغتك ومنطقتك الزمنية.', hi: 'स्थानीय विशेषज्ञता के साथ वैश्विक मुख्यालय। हमारा मंच आपके उद्योग, भाषा और समय क्षेत्र के अनुकूल है।' })}
        </p>
      </section>

      <section className="bg-[#F8F9FB] py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {list.map((ind) => (
              <div key={ind.title} className="bg-white border border-[#141F33]/10 rounded-[40px] p-8 shadow-sm hover:shadow-md transition-all shadow-[0_10px_40px_rgba(0,0,0,0.05)]">
                <span className="text-3xl mb-3 block">{industryIcons[ind.icon] || <Building2 className="w-8 h-8 text-[#141F33]" />}</span>
                <h3 className="text-lg font-bold text-[#141F33] mb-2">{ind.title}</h3>
                <p className="text-sm text-[#141F33] leading-relaxed">{ind.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-[#141F33] mb-4">
            {t({ en: 'Don\'t see your industry?', fr: 'Vous ne voyez pas votre secteur ?', ar: 'لا ترى قطاعك؟', hi: 'अपना उद्योग नहीं दिख रहा है?' })}
          </h2>
          <p className="text-[#141F33] mb-8">
            {t({ en: 'SAQYN RABT is industry-agnostic. We build custom workflows for any business type.', fr: 'SAQYN RABT est indépendant du secteur. Nous construisons des flux de travail personnalisés pour tout type d\'entreprise.', ar: 'SAQYN RABT غير مقيدة بصناعة معينة. نبني سير عمل مخصص لأي نوع عمل.', hi: 'SAQYN RABT उद्योग-अज्ञेयवादी है। हम किसी भी प्रकार के व्यवसाय के लिए कस्टम वर्कफ़्लो बनाते हैं।' })}
          </p>
          <a
            href={process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/saqynrabt/demo'}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-[40px] bg-[#141F33] px-6 py-3 text-xs font-bold min-h-[44px] text-[#F8F9FB] hover:opacity-90 transition-all"
          >
            {t({ en: 'See how it works', fr: 'Découvrez comment ça marche', ar: 'شاهد كيف يعمل', hi: 'देखें यह कैसे काम करता है' })}
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
