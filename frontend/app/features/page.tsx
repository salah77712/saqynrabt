'use client';

import React from 'react';
import { useLocale } from '../providers';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import Link from 'next/link';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { Zap, MessageSquare, Wrench, BarChart3 } from 'lucide-react';

export default function FeaturesPage() {
  const { locale } = useLocale();
  const { ref: featureGridRef, isVisible: featureGridVisible } = useScrollReveal<HTMLDivElement>();
  const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';

  const content = {
    title: { en: 'Two tools. One platform. Zero missed calls.', fr: 'Deux outils. Une plateforme. Zéro appel manqué.', ar: 'أداتان. منصة واحدة. بدون مكالمات ضائعة.', hi: 'दो उपकरण। एक मंच। शून्य मिस्ड कॉल।' },
    subtitle: { en: 'Handle calls, messages, and employee questions automatically — built for how teams actually work, anywhere in the world.', fr: 'Gérez les appels, les messages et les questions des employés automatiquement — conçu pour le fonctionnement réel des équipes, partout dans le monde.', ar: 'تعامل مع المكالمات والرسائل وأسئلة الموظفين تلقائياً — مبني لكيفية عمل الفرق في أي مكان في العالم.', hi: 'कॉल, संदेश और कर्मचारी के सवालों को स्वचालित रूप से संभालें — टीमों के वास्तव में काम करने के तरीके के लिए बनाया गया है, दुनिया में कहीं भी।' },
    automationTitle: { en: 'Never miss a call or booking', fr: 'Ne manquez jamais un appel ou une réservation', ar: 'لا تفوت أي مكالمة أو حجز', hi: 'कॉल या बुकिंग कभी न चूकें' },
    automationDesc: { en: 'Your AI front-desk answers calls, reads messages, and routes requests to the right person — even at 3 AM.', fr: 'Votre réception IA répond aux appels, lit les messages et achemine les demandes vers la bonne personne — même à 3h du matin.', ar: 'مكتب الاستقبال الذكي لديك يرد على المكالمات، يقرأ الرسائل، ويوجه الطلبات للشخص المناسب — حتى في الثالثة فجراً.', hi: 'आपका एआई फ्रंट-डेस्क कॉल का जवाब देता है, संदेश पढ़ता है, और अनुरोधों को सही व्यक्ति तक पहुंचाता है — सुबह 3 बजे भी।' },
    chatbotTitle: { en: 'Your documents, now searchable by your team', fr: 'Vos documents, désormais consultables par votre équipe', ar: 'مستنداتك، قابلة للبحث الآن من قبل فريقك', hi: 'आपके दस्तावेज़, अब आपकी टीम द्वारा खोजे जा सकते हैं' },
    chatbotDesc: { en: 'Upload your handbooks, policies, and manuals. Staff ask questions in plain language — the AI answers from your documents only.', fr: 'Téléchargez vos manuels, politiques et guides. Le personnel pose des questions en langage clair — l\'IA répond uniquement à partir de vos documents.', ar: 'حمّل كتيباتك وسياساتك وأدلتك. يسأل الموظفون بلغة بسيطة — والذكاء الاصطناعي يجيب من مستنداتك فقط.', hi: 'अपनी हैंडबुक, नीतियां और नियमावली अपलोड करें। कर्मचारी सरल भाषा में प्रश्न पूछते हैं — एआई केवल आपके दस्तावेज़ों से उत्तर देता है।' },
    customTitle: { en: 'Built for your specific needs', fr: 'Conçu pour vos besoins spécifiques', ar: 'مبني لاحتياجاتك الخاصة', hi: 'आपकी विशिष्ट आवश्यकताओं के लिए निर्मित' },
    customDesc: { en: 'Custom routing, private integrations, unique workflows — we build what your operations actually require.', fr: 'Routage personnalisé, intégrations privées, flux de travail uniques — nous construisons ce dont vos opérations ont réellement besoin.', ar: 'توجيه مخصص، تكاملات خاصة، سير عمل فريدة — نبني ما تحتاجه عملياتك فعلاً.', hi: 'कस्टम रूटिंग, निजी एकीकरण, अद्वितीय वर्कफ़्लो — हम वही बनाते हैं जो आपके संचालन के लिए वास्तव में आवश्यक है।' },
    reportingTitle: { en: "See what's happening, in real time", fr: "Voyez ce qui se passe, en temps réel", ar: "شاهد ما يحدث في الوقت الفعلي", hi: "देखें कि वास्तविक समय में क्या हो रहा है" },
    reportingDesc: { en: 'Track calls, messages, and team activity from one dashboard. No spreadsheets needed.', fr: 'Suivez les appels, les messages et l\'activité de l\'équipe à partir d\'un seul tableau de bord. Pas besoin de feuilles de calcul.', ar: 'تتبع المكالمات والرسائل ونشاط الفريق من لوحة تحكم واحدة. لا حاجة لجداول البيانات.', hi: 'एक ही डैशबोर्ड से कॉल, संदेश और टीम गतिविधि को ट्रैक करें। स्प्रेडशीट्स की कोई आवश्यकता नहीं है।' },
  };

  return (
    <div className="bg-[#F8F9FB] text-[#141F33] min-h-screen flex flex-col font-sans" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <Header />

      <main className="flex-1 max-w-6xl mx-auto py-24 px-6 lg:px-12 flex flex-col items-center">
        {/* Hero Section */}
        <div className="text-center max-w-2xl mb-16">
          <span className="text-xs font-extrabold tracking-widest text-[#2A5CFF] uppercase">{t({ en: 'Features & Capabilities', fr: 'Fonctionnalités & Capacités', ar: 'الميزات والقدرات', hi: 'सुविधाएँ और क्षमताएं' })}</span>
          <h1 className="text-4xl lg:text-5xl font-extrabold text-[#141F33] leading-tight tracking-tight mt-3">
            {t(content.title)}
          </h1>
          <p className="text-sm font-medium text-[#141F33] mt-4 leading-relaxed">
            {t(content.subtitle)}
          </p>
        </div>

        {/* 2x2 Feature Grid */}
        <div ref={featureGridRef} className={`grid grid-cols-1 md:grid-cols-2 gap-12 w-full animate-stagger ${featureGridVisible ? 'revealed' : ''}`}>
          {/* Card 1: Automation */}
          <div className="bg-white border border-[#141F33]/10 rounded-[40px] p-8 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 shadow-[0_10px_40px_rgba(0,0,0,0.05)]">
            <div className="h-12 w-12 rounded-[40px] bg-[#2A5CFF]/10 flex items-center justify-center mb-6"><Zap className="w-6 h-6 text-[#2A5CFF]" /></div>
            <h3 className="text-xl font-extrabold text-[#141F33]">{t(content.automationTitle)}</h3>
            <p className="text-xs font-normal text-[#141F33] leading-relaxed mt-3">{t(content.automationDesc)}</p>
          </div>

          {/* Card 2: Chatbot */}
          <div className="bg-white border border-[#141F33]/10 rounded-[40px] p-8 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 shadow-[0_10px_40px_rgba(0,0,0,0.05)]">
            <div className="h-12 w-12 rounded-[40px] bg-[#2A5CFF]/10 flex items-center justify-center mb-6"><MessageSquare className="w-6 h-6 text-[#2A5CFF]" /></div>
            <h3 className="text-xl font-extrabold text-[#141F33]">{t(content.chatbotTitle)}</h3>
            <p className="text-xs font-normal text-[#141F33] leading-relaxed mt-3">{t(content.chatbotDesc)}</p>
          </div>

          {/* Card 3: Custom */}
          <div className="bg-white border border-[#141F33]/10 rounded-[40px] p-8 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 shadow-[0_10px_40px_rgba(0,0,0,0.05)]">
            <div className="h-12 w-12 rounded-[40px] bg-[#2A5CFF]/10 flex items-center justify-center mb-6"><Wrench className="w-6 h-6 text-[#2A5CFF]" /></div>
            <h3 className="text-xl font-extrabold text-[#141F33]">{t(content.customTitle)}</h3>
            <p className="text-xs font-normal text-[#141F33] leading-relaxed mt-3">{t(content.customDesc)}</p>
          </div>

          {/* Card 4: Reporting */}
          <div className="bg-white border border-[#141F33]/10 rounded-[40px] p-8 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 shadow-[0_10px_40px_rgba(0,0,0,0.05)]">
            <div className="h-12 w-12 rounded-[40px] bg-[#2A5CFF]/10 flex items-center justify-center mb-6"><BarChart3 className="w-6 h-6 text-[#2A5CFF]" /></div>
            <h3 className="text-xl font-extrabold text-[#141F33]">{t(content.reportingTitle)}</h3>
            <p className="text-xs font-normal text-[#141F33] leading-relaxed mt-3">{t(content.reportingDesc)}</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
