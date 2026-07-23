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
    title: { en: 'Two tools. One platform. Zero missed calls.', fr: 'Deux outils. Une plateforme. Zéro appel manqué.', ar: 'أداتان. منصة واحدة. بدون مكالمات ضائعة.', hi: 'दो उपकरण. एक प्लेटफ़ॉर्म. शून्य मिस्ड कॉल।' },
    subtitle: { en: 'Handle calls, messages, and employee questions automatically — built for how teams actually work, anywhere in the world.', fr: 'Gérez les appels, les messages et les questions des employés automatiquement — conçu pour le fonctionnement réel des équipes, partout dans le monde.', ar: 'تعامل مع المكالمات والرسائل وأسئلة الموظفين تلقائياً — مبني لكيفية عمل الفرق في أي مكان في العالم।', hi: 'कॉल, संदेश और कर्मचारी प्रश्नों को स्वचालित रूप से संभालें — टीमों के वास्तविक काम करने के तरीके के लिए बनाया गया, दुनिया में कहीं भी।' },
    automationTitle: { en: 'Never miss a call or booking', fr: 'Ne manquez jamais un appel ou une réservation', ar: 'لا تفوت أي مكالمة أو حجز', hi: 'कॉल या बुकिंग कभी न चूकें' },
    automationDesc: { en: 'AI voice captures caller requests and creates trackable workflows for your team.', fr: 'La voix IA capture les demandes des appelants et crée des flux de travail traçables pour votre équipe.', ar: 'الصوت الذكي يلتقط طلبات المتصلين وينشئ مهام عمل قابلة للتتبع لفريقك।', hi: 'AI वॉइस कॉलर के अनुरोधों को कैप्चर करता है और आपकी टीम के लिए ट्रैक करने योग्य वर्कफ़्लो बनाता है।' },
    chatbotTitle: { en: 'Your documents, now searchable by your team', fr: 'Vos documents, désormais consultables par votre équipe', ar: 'مستنداتك، قابلة للبحث الآن من قبل فريقك', hi: 'आपके दस्तावेज़, अब आपकी टीम द्वारा खोजे जा सकते हैं' },
    chatbotDesc: { en: 'Upload your handbooks, policies, and manuals. Your team can ask questions and the AI helps find answers from your documents.', fr: 'Téléchargez vos manuels, politiques et guides. Votre équipe peut poser des questions et l\'IA aide à trouver des réponses dans vos documents.', ar: 'حمّل كتيباتك وسياساتك وأدلتك. يمكن لفريقك طرح الأسئلة والذكاء الاصطناعي يساعد في العثور على إجابات من مستنداتك।', hi: 'अपनी हैंडबुक, नीतियाँ और मैनुअल अपलोड करें। आपकी टीम प्रश्न पूछ सकती है और AI आपके दस्तावेज़ों से उत्तर खोजने में मदद करता है।' },
    customTitle: { en: 'Built for your specific needs', fr: 'Conçu pour vos besoins spécifiques', ar: 'مبني لاحتياجاتك الخاصة', hi: 'आपकी विशिष्ट आवश्यकताओं के लिए निर्मित' },
    customDesc: { en: 'Custom routing, private integrations, unique workflows — we build what your operations actually require.', fr: 'Routage personnalisé, intégrations privées, flux de travail uniques — nous construisons ce dont vos opérations ont réellement besoin.', ar: 'توجيه مخصص، تكاملات خاصة، سير عمل فريدة — نبني ما تحتاجه عملياتك فعلاً।', hi: 'कस्टम रूटिंग, निजी एकीकरण, अद्वितीय वर्कफ़्लो — हम वही बनाते हैं जो आपके संचालन को वास्तव में चाहिए।' },
    reportingTitle: { en: "See what's happening across your team", fr: "Voyez ce qui se passe dans votre équipe", ar: "شاهد ما يحدث في فريقك", hi: "देखें आपकी टीम में क्या हो रहा है" },
    reportingDesc: { en: 'Monitor your team\'s workflows and activity from one dashboard. Status updates, audit logs, and usage metrics at a glance.', fr: 'Suivez les flux de travail et l\'activité de votre équipe depuis un seul tableau de bord. Mises à jour de statut, journaux d\'audit et métriques d\'utilisation en un coup d\'œil.', ar: 'راقب مهام العمل ونشاط فريقك من لوحة تحكم واحدة. تحديثات الحالة، سجلات التدقيق، ومقاييس الاستخدام في لمحة।', hi: 'अपनी टीम के वर्कफ़्लो और गतिविधि को एक डैशबोर्ड से मॉनिटर करें। स्थिति अपडेट, ऑडिट लॉग और उपयोग मीट्रिक्स एक नज़र में।' },
  };

  return (
    <div className="bg-surface text-primary min-h-screen flex flex-col font-sans" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <Header />

      <main className="flex-1 max-w-6xl mx-auto py-24 px-6 lg:px-12 flex flex-col items-center">
        {/* Hero Section */}
        <div className="text-center max-w-2xl mb-16">
          <span className="text-xs font-extrabold tracking-widest text-accent uppercase">{t({ en: 'Features & Capabilities', fr: 'Fonctionnalités & Capacités', ar: 'الميزات والقدرات', hi: 'सुविधाएँ और क्षमताएँ' })}</span>
          <h1 className="text-4xl lg:text-5xl font-extrabold text-primary leading-tight tracking-tight mt-3">
            {t(content.title)}
          </h1>
          <p className="text-sm font-medium text-primary mt-4 leading-relaxed">
            {t(content.subtitle)}
          </p>
        </div>

        {/* 2x2 Feature Grid */}
        <div ref={featureGridRef} className={`grid grid-cols-1 md:grid-cols-2 gap-12 w-full animate-stagger ${featureGridVisible ? 'revealed' : ''}`}>
          {/* Card 1: Automation */}
          <div className="bg-background border border-primary/10 rounded-xl p-8 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 shadow-card">
            <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center mb-6"><Zap className="w-6 h-6 text-accent" /></div>
            <h3 className="text-xl font-extrabold text-primary">{t(content.automationTitle)}</h3>
            <p className="text-xs font-normal text-primary leading-relaxed mt-3">{t(content.automationDesc)}</p>
          </div>

          {/* Card 2: Chatbot */}
          <div className="bg-background border border-primary/10 rounded-xl p-8 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 shadow-card">
            <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center mb-6"><MessageSquare className="w-6 h-6 text-accent" /></div>
            <h3 className="text-xl font-extrabold text-primary">{t(content.chatbotTitle)}</h3>
            <p className="text-xs font-normal text-primary leading-relaxed mt-3">{t(content.chatbotDesc)}</p>
          </div>

          {/* Card 3: Custom */}
          <div className="bg-background border border-primary/10 rounded-xl p-8 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 shadow-card">
            <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center mb-6"><Wrench className="w-6 h-6 text-accent" /></div>
            <h3 className="text-xl font-extrabold text-primary">{t(content.customTitle)}</h3>
            <p className="text-xs font-normal text-primary leading-relaxed mt-3">{t(content.customDesc)}</p>
          </div>

          {/* Card 4: Reporting */}
          <div className="bg-background border border-primary/10 rounded-xl p-8 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 shadow-card">
            <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center mb-6"><BarChart3 className="w-6 h-6 text-accent" /></div>
            <h3 className="text-xl font-extrabold text-primary">{t(content.reportingTitle)}</h3>
            <p className="text-xs font-normal text-primary leading-relaxed mt-3">{t(content.reportingDesc)}</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
