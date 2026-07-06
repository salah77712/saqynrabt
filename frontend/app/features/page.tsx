'use client';

import React from 'react';
import { useLocale } from '../providers';
import Link from 'next/link';
import { MarketingHeader } from '../../components/MarketingHeader';
import { Footer } from '../../components/Footer';

export default function FeaturesPage() {
  const { locale } = useLocale();
  const t = (obj: Record<string, string>) => locale === 'ar' ? obj.ar : obj.en;

  const content = {
    title: { en: 'One Platform. Two Powerful Products.', ar: 'منصة واحدة. منتجان قويان.' },
    subtitle: { en: 'Secure, private, and automated business operations designed for Qatar and the Middle East.', ar: 'عمليات تجارية آمنة وخاصة ومؤتمتة مصممة لدولة قطر والشرق الأوسط.' },
    automationTitle: { en: '24/7 Call & Booking Handling', ar: 'إدارة المكالمات والحجوزات على مدار الساعة' },
    automationDesc: { en: 'Capture every customer inquiry, route complaints, and automate bookings without missing a single call.', ar: 'التقط كل استفسار من العملاء، ووجه الشكاوى، وأتمت الحجوزات دون تفويت أي مكالمة.' },
    chatbotTitle: { en: 'RAG-Powered Staff Assistant', ar: 'مساعد موظفين مدعوم بالـ RAG' },
    chatbotDesc: { en: 'Upload your SOPs, HR policies, and vacation rules. Employees ask questions; the AI answers strictly from your knowledge base.', ar: 'قم بتحميل إجراءات التشغيل والسياسات. يطرح الموظفون الأسئلة ويجيب الذكاء الاصطناعي بدقة من قاعدة المعرفة.' },
    customTitle: { en: 'Tailored Workflows', ar: 'سير عمل مخصص بالكامل' },
    customDesc: { en: 'Need custom routing or specialized integrations? We build bespoke automation for any operational need.', ar: 'هل تحتاج إلى توجيه مخصص أو تكاملات متخصصة؟ نحن نبني أتمتة مخصصة لأي حاجة تشغيلية.' },
    reportingTitle: { en: 'Live Usage & Audit', ar: 'مراقبة الاستخدام المباشر والتدقيق' },
    reportingDesc: { en: 'Monitor voice minutes, text requests, and employee adoption directly from your dashboard.', ar: 'راقب دقائق الصوت وطلبات النصوص واعتماد الموظفين مباشرة من لوحة التحكم.' },
  };

  return (
    <div className="bg-[#F8F9FB] text-[#1A202C] min-h-screen flex flex-col font-sans" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <MarketingHeader />

      <main className="flex-1 max-w-6xl mx-auto py-24 px-6 lg:px-12 flex flex-col items-center">
        {/* Hero Section */}
        <div className="text-center max-w-2xl mb-16">
          <span className="text-xs font-extrabold tracking-widest text-[#2A5CFF] uppercase">{t({ en: 'Features & Capabilities', ar: 'الميزات والقدرات' })}</span>
          <h1 className="text-4xl lg:text-5xl font-extrabold text-[#141F33] leading-tight tracking-tight mt-3">
            {t(content.title)}
          </h1>
          <p className="text-sm font-semibold text-[#718096] mt-4 leading-relaxed">
            {t(content.subtitle)}
          </p>
        </div>

        {/* 2x2 Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          {/* Card 1: Automation */}
          <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300">
            <div className="h-12 w-12 rounded-xl bg-blue-50 flex items-center justify-center text-2xl mb-6">📞</div>
            <h3 className="text-xl font-extrabold text-[#141F33]">{t(content.automationTitle)}</h3>
            <p className="text-xs font-semibold text-[#718096] leading-relaxed mt-3">{t(content.automationDesc)}</p>
          </div>

          {/* Card 2: Chatbot */}
          <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300">
            <div className="h-12 w-12 rounded-xl bg-indigo-50 flex items-center justify-center text-2xl mb-6">🧠</div>
            <h3 className="text-xl font-extrabold text-[#141F33]">{t(content.chatbotTitle)}</h3>
            <p className="text-xs font-semibold text-[#718096] leading-relaxed mt-3">{t(content.chatbotDesc)}</p>
          </div>

          {/* Card 3: Custom */}
          <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300">
            <div className="h-12 w-12 rounded-xl bg-violet-50 flex items-center justify-center text-2xl mb-6">🔧</div>
            <h3 className="text-xl font-extrabold text-[#141F33]">{t(content.customTitle)}</h3>
            <p className="text-xs font-semibold text-[#718096] leading-relaxed mt-3">{t(content.customDesc)}</p>
          </div>

          {/* Card 4: Reporting */}
          <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300">
            <div className="h-12 w-12 rounded-xl bg-emerald-50 flex items-center justify-center text-2xl mb-6">📈</div>
            <h3 className="text-xl font-extrabold text-[#141F33]">{t(content.reportingTitle)}</h3>
            <p className="text-xs font-semibold text-[#718096] leading-relaxed mt-3">{t(content.reportingDesc)}</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
