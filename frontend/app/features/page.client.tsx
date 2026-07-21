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
    title: { en: 'Two tools. One platform. Zero missed calls.', fr: 'Deux outils. Une plateforme. ZÃ©ro appel manquÃ©.', ar: 'أداتان. منصة واحدة. بدون مكالمات ضائعة.', hi: 'à¤¦à¥ à¤à¤ªà¤à¤°à¤£à¥¤ à¤à¤ à¤®à¤à¤à¥¤ à¤¶à¥à¤¨à¥à¤¯ à¤®à¤¿à¤¸à¥à¤¡ à¤à¥à¤²à¥¤' },
    subtitle: { en: 'Handle calls, messages, and employee questions automatically â built for how teams actually work, anywhere in the world.', fr: 'GÃ©rez les appels, les messages et les questions des employÃ©s automatiquement â conÃ§u pour le fonctionnement rÃ©el des Ã©quipes, partout dans le monde.', ar: 'تعامل مع المكالمات والرسائل وأسئلة الموظفين تلقائياً â مبني لكيفية عمل الفرق في أي مكان في العالم.', hi: 'à¤à¥à¤², à¤¸à¤à¤¦à¥à¤¶ à¤à¤° à¤à¤°à¥à¤®à¤à¤¾à¤°à¥ à¤à¥ à¤¸à¤µà¤¾à¤²à¥à¤ à¤à¥ à¤¸à¥à¤µà¤à¤¾à¤²à¤¿à¤¤ à¤°à¥à¤ª à¤¸à¥ à¤¸à¤à¤­à¤¾à¤²à¥à¤ â à¤à¥à¤®à¥à¤ à¤à¥ à¤µà¤¾à¤¸à¥à¤¤à¤µ à¤®à¥à¤ à¤à¤¾à¤® à¤à¤°à¤¨à¥ à¤à¥ à¤¤à¤°à¥à¤à¥ à¤à¥ à¤²à¤¿à¤ à¤¬à¤¨à¤¾à¤¯à¤¾ à¤à¤¯à¤¾ à¤¹à¥, à¤¦à¥à¤¨à¤¿à¤¯à¤¾ à¤®à¥à¤ à¤à¤¹à¥à¤ à¤­à¥à¥¤' },
    automationTitle: { en: 'Never miss a call or booking', fr: 'Ne manquez jamais un appel ou une rÃ©servation', ar: 'لا تفوت أي مكالمة أو حجز', hi: 'à¤à¥à¤² à¤¯à¤¾ à¤¬à¥à¤à¤¿à¤à¤ à¤à¤­à¥ à¤¨ à¤à¥à¤à¥à¤' },
    automationDesc: { en: 'Your AI front-desk answers calls, reads messages, and routes requests to the right person â even at 3 AM.', fr: 'Votre rÃ©ception IA rÃ©pond aux appels, lit les messages et achemine les demandes vers la bonne personne â mÃªme Ã  3h du matin.', ar: 'مكتب الاستقبال الذكي لديك يرد على المكالمات، يقرأ الرسائل، ويوجه الطلبات للشخص المناسب â حتى في الثالثة فجراً.', hi: 'à¤à¤ªà¤à¤¾ à¤à¤à¤ à¤«à¥à¤°à¤à¤-à¤¡à¥à¤¸à¥à¤ à¤à¥à¤² à¤à¤¾ à¤à¤µà¤¾à¤¬ à¤¦à¥à¤¤à¤¾ à¤¹à¥, à¤¸à¤à¤¦à¥à¤¶ à¤ªà¤¢à¤¼à¤¤à¤¾ à¤¹à¥, à¤à¤° à¤à¤¨à¥à¤°à¥à¤§à¥à¤ à¤à¥ à¤¸à¤¹à¥ à¤µà¥à¤¯à¤à¥à¤¤à¤¿ à¤¤à¤ à¤ªà¤¹à¥à¤à¤à¤¾à¤¤à¤¾ à¤¹à¥ â à¤¸à¥à¤¬à¤¹ 3 à¤¬à¤à¥ à¤­à¥à¥¤' },
    chatbotTitle: { en: 'Your documents, now searchable by your team', fr: 'Vos documents, dÃ©sormais consultables par votre Ã©quipe', ar: 'مستنداتك، قابلة للبحث الآن من قبل فريقك', hi: 'à¤à¤ªà¤à¥ à¤¦à¤¸à¥à¤¤à¤¾à¤µà¥à¤à¤¼, à¤à¤¬ à¤à¤ªà¤à¥ à¤à¥à¤® à¤¦à¥à¤µà¤¾à¤°à¤¾ à¤à¥à¤à¥ à¤à¤¾ à¤¸à¤à¤¤à¥ à¤¹à¥à¤' },
    chatbotDesc: { en: 'Upload your handbooks, policies, and manuals. Staff ask questions in plain language â the AI answers from your documents only.', fr: 'TÃ©lÃ©chargez vos manuels, politiques et guides. Le personnel pose des questions en langage clair â l\'IA rÃ©pond uniquement Ã  partir de vos documents.', ar: 'حمّل كتيباتك وسياساتك وأدلتك. يسأل الموظفون بلغة بسيطة â والذكاء الاصطناعي يجيب من مستنداتك فقط.', hi: 'à¤à¤ªà¤¨à¥ à¤¹à¥à¤à¤¡à¤¬à¥à¤, à¤¨à¥à¤¤à¤¿à¤¯à¤¾à¤ à¤à¤° à¤¨à¤¿à¤¯à¤®à¤¾à¤µà¤²à¥ à¤à¤ªà¤²à¥à¤¡ à¤à¤°à¥à¤à¥¤ à¤à¤°à¥à¤®à¤à¤¾à¤°à¥ à¤¸à¤°à¤² à¤­à¤¾à¤·à¤¾ à¤®à¥à¤ à¤ªà¥à¤°à¤¶à¥à¤¨ à¤ªà¥à¤à¤¤à¥ à¤¹à¥à¤ â à¤à¤à¤ à¤à¥à¤µà¤² à¤à¤ªà¤à¥ à¤¦à¤¸à¥à¤¤à¤¾à¤µà¥à¤à¤¼à¥à¤ à¤¸à¥ à¤à¤¤à¥à¤¤à¤° à¤¦à¥à¤¤à¤¾ à¤¹à¥à¥¤' },
    customTitle: { en: 'Built for your specific needs', fr: 'ConÃ§u pour vos besoins spÃ©cifiques', ar: 'مبني لاحتياجاتك الخاصة', hi: 'à¤à¤ªà¤à¥ à¤µà¤¿à¤¶à¤¿à¤·à¥à¤ à¤à¤µà¤¶à¥à¤¯à¤à¤¤à¤¾à¤à¤ à¤à¥ à¤²à¤¿à¤ à¤¨à¤¿à¤°à¥à¤®à¤¿à¤¤' },
    customDesc: { en: 'Custom routing, private integrations, unique workflows â we build what your operations actually require.', fr: 'Routage personnalisÃ©, intÃ©grations privÃ©es, flux de travail uniques â nous construisons ce dont vos opÃ©rations ont rÃ©ellement besoin.', ar: 'توجيه مخصص، تكاملات خاصة، سير عمل فريدة â نبني ما تحتاجه عملياتك فعلاً.', hi: 'à¤à¤¸à¥à¤à¤® à¤°à¥à¤à¤¿à¤à¤, à¤¨à¤¿à¤à¥ à¤à¤à¥à¤à¤°à¤£, à¤à¤¦à¥à¤µà¤¿à¤¤à¥à¤¯ à¤µà¤°à¥à¤à¤«à¤¼à¥à¤²à¥ â à¤¹à¤® à¤µà¤¹à¥ à¤¬à¤¨à¤¾à¤¤à¥ à¤¹à¥à¤ à¤à¥ à¤à¤ªà¤à¥ à¤¸à¤à¤à¤¾à¤²à¤¨ à¤à¥ à¤²à¤¿à¤ à¤µà¤¾à¤¸à¥à¤¤à¤µ à¤®à¥à¤ à¤à¤µà¤¶à¥à¤¯à¤ à¤¹à¥à¥¤' },
    reportingTitle: { en: "See what's happening, in real time", fr: "Voyez ce qui se passe, en temps rÃ©el", ar: "شاهد ما يحدث في الوقت الفعلي", hi: "à¤¦à¥à¤à¥à¤ à¤à¤¿ à¤µà¤¾à¤¸à¥à¤¤à¤µà¤¿à¤ à¤¸à¤®à¤¯ à¤®à¥à¤ à¤à¥à¤¯à¤¾ à¤¹à¥ à¤°à¤¹à¤¾ à¤¹à¥" },
    reportingDesc: { en: 'Track calls, messages, and team activity from one dashboard. No spreadsheets needed.', fr: 'Suivez les appels, les messages et l\'activitÃ© de l\'Ã©quipe Ã  partir d\'un seul tableau de bord. Pas besoin de feuilles de calcul.', ar: 'تتبع المكالمات والرسائل ونشاط الفريق من لوحة تحكم واحدة. لا حاجة لجداول البيانات.', hi: 'à¤à¤ à¤¹à¥ à¤¡à¥à¤¶à¤¬à¥à¤°à¥à¤¡ à¤¸à¥ à¤à¥à¤², à¤¸à¤à¤¦à¥à¤¶ à¤à¤° à¤à¥à¤® à¤à¤¤à¤¿à¤µà¤¿à¤§à¤¿ à¤à¥ à¤à¥à¤°à¥à¤ à¤à¤°à¥à¤à¥¤ à¤¸à¥à¤ªà¥à¤°à¥à¤¡à¤¶à¥à¤à¥à¤¸ à¤à¥ à¤à¥à¤ à¤à¤µà¤¶à¥à¤¯à¤à¤¤à¤¾ à¤¨à¤¹à¥à¤ à¤¹à¥à¥¤' },
  };

  return (
    <div className="bg-surface text-primary min-h-screen flex flex-col font-sans" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <Header />

      <main className="flex-1 max-w-6xl mx-auto py-24 px-6 lg:px-12 flex flex-col items-center">
        {/* Hero Section */}
        <div className="text-center max-w-2xl mb-16">
          <span className="text-xs font-extrabold tracking-widest text-accent uppercase">{t({ en: 'Features & Capabilities', fr: 'FonctionnalitÃ©s & CapacitÃ©s', ar: 'الميزات والقدرات', hi: 'à¤¸à¥à¤µà¤¿à¤§à¤¾à¤à¤ à¤à¤° à¤à¥à¤·à¤®à¤¤à¤¾à¤à¤' })}</span>
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
