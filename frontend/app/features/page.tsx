'use client';

import React from 'react';
import { useLocale } from '../providers';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import Link from 'next/link';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { Phone, Sparkles, Wrench, BarChart3 } from 'lucide-react';

export default function FeaturesPage() {
  const { locale } = useLocale();
  const { ref: featureGridRef, isVisible: featureGridVisible } = useScrollReveal<HTMLDivElement>();
  const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';

  const content = {
    title: { en: 'Two tools. One platform. Zero missed calls.', ar: 'أداتان. منصة واحدة. بدون مكالمات ضائعة.' },
    subtitle: { en: 'Handle calls, messages, and employee questions automatically — built for how teams actually work, anywhere in the world.', ar: 'تعامل مع المكالمات والرسائل وأسئلة الموظفين تلقائياً — مبني لكيفية عمل الفرق في أي مكان في العالم.' },
    automationTitle: { en: 'Never miss a call or booking', ar: 'لا تفوت أي مكالمة أو حجز' },
    automationDesc: { en: 'Your AI front-desk answers calls, reads messages, and routes requests to the right person — even at 3 AM.', ar: 'مكتب الاستقبال الذكي لديك يرد على المكالمات، يقرأ الرسائل، ويوجه الطلبات للشخص المناسب — حتى في الثالثة فجراً.' },
    chatbotTitle: { en: 'Your documents, now searchable by your team', ar: 'مستنداتك، قابلة للبحث الآن من قبل فريقك' },
    chatbotDesc: { en: 'Upload your handbooks, policies, and manuals. Staff ask questions in plain language — the AI answers from your documents only.', ar: 'حمّل كتيباتك وسياساتك وأدلتك. يسأل الموظفون بلغة بسيطة — والذكاء الاصطناعي يجيب من مستنداتك فقط.' },
    customTitle: { en: 'Built for your specific needs', ar: 'مبني لاحتياجاتك الخاصة' },
    customDesc: { en: 'Custom routing, private integrations, unique workflows — we build what your operations actually require.', ar: 'توجيه مخصص، تكاملات خاصة، سير عمل فريدة — نبني ما تحتاجه عملياتك فعلاً.' },
    reportingTitle: { en: "See what's happening, in real time", ar: 'شاهد ما يحدث في الوقت الفعلي' },
    reportingDesc: { en: 'Track calls, messages, and team activity from one dashboard. No spreadsheets needed.', ar: 'تتبع المكالمات والرسائل ونشاط الفريق من لوحة تحكم واحدة. لا حاجة لجداول البيانات.' },
  };

  return (
    <div className="bg-[#F8F9FB] text-[#1A202C] min-h-screen flex flex-col font-sans" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <Header />

      <main className="flex-1 max-w-6xl mx-auto py-24 px-6 lg:px-12 flex flex-col items-center">
        {/* Hero Section */}
        <div className="text-center max-w-2xl mb-16">
          <span className="text-xs font-extrabold tracking-widest text-[#2A5CFF] uppercase">{t({ en: 'Features & Capabilities', ar: 'الميزات والقدرات' })}</span>
          <h1 className="text-4xl lg:text-5xl font-extrabold text-navy leading-tight tracking-tight mt-3">
            {t(content.title)}
          </h1>
          <p className="text-sm font-medium text-slate-500 mt-4 leading-relaxed">
            {t(content.subtitle)}
          </p>
        </div>

        {/* 2x2 Feature Grid */}
        <div ref={featureGridRef} className={`grid grid-cols-1 md:grid-cols-2 gap-8 w-full animate-stagger ${featureGridVisible ? 'revealed' : ''}`}>
          {/* Card 1: Automation */}
          <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300">
            <div className="h-12 w-12 rounded-xl bg-blue-50 flex items-center justify-center mb-6"><Phone className="w-6 h-6 text-blue-600" /></div>
            <h3 className="text-xl font-extrabold text-navy">{t(content.automationTitle)}</h3>
            <p className="text-xs font-normal text-slate-500 leading-relaxed mt-3">{t(content.automationDesc)}</p>
          </div>

          {/* Card 2: Chatbot */}
          <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300">
            <div className="h-12 w-12 rounded-xl bg-indigo-50 flex items-center justify-center mb-6"><Sparkles className="w-6 h-6 text-indigo-600" /></div>
            <h3 className="text-xl font-extrabold text-navy">{t(content.chatbotTitle)}</h3>
            <p className="text-xs font-normal text-slate-500 leading-relaxed mt-3">{t(content.chatbotDesc)}</p>
          </div>

          {/* Card 3: Custom */}
          <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300">
            <div className="h-12 w-12 rounded-xl bg-violet-50 flex items-center justify-center mb-6"><Wrench className="w-6 h-6 text-violet-600" /></div>
            <h3 className="text-xl font-extrabold text-navy">{t(content.customTitle)}</h3>
            <p className="text-xs font-normal text-slate-500 leading-relaxed mt-3">{t(content.customDesc)}</p>
          </div>

          {/* Card 4: Reporting */}
          <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300">
            <div className="h-12 w-12 rounded-xl bg-emerald-50 flex items-center justify-center mb-6"><BarChart3 className="w-6 h-6 text-emerald-600" /></div>
            <h3 className="text-xl font-extrabold text-navy">{t(content.reportingTitle)}</h3>
            <p className="text-xs font-normal text-slate-500 leading-relaxed mt-3">{t(content.reportingDesc)}</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
