'use client';

import React from 'react';
import { useLocale } from '../providers';
import { MarketingHeader } from '../../components/MarketingHeader';
import { Footer } from '../../components/Footer';

export default function AboutPage() {
  const { locale } = useLocale();
  const t = (obj: Record<string, string>) => locale === 'ar' ? obj.ar : obj.en;

  const content = {
    eyebrow: { en: 'Our Mission', ar: 'مهمتنا' },
    title: { en: 'Built for the Front-Desk. Trusted by the Team.', ar: 'صممت لمكاتب الاستقبال. موثوقة من قبل الفريق.' },
    storyTitle: { en: 'The Story & Mission', ar: 'القصة والمهمة' },
    storyBody: {
      en: 'We believe AI should be invisible, private, and controlled by the business owner — not the other way around. SAQYN RABT was built in Doha, Qatar, to give hospitality operators, healthcare clinics, and operations managers a reliable tool that secures data locally and handles redundant queries without breaking budget limits.',
      ar: 'نعتقد أن الذكاء الاصطناعي يجب أن يكون خفياً، خاصاً، وخاضعاً لسيطرة صاحب العمل. تم بناء SAQYN RABT في الدوحة، قطر، لمنح مشغلي الفنادق والعيادات الطبية ومديري العمليات أداة موثوقة تؤمن البيانات محلياً وتتعامل مع الاستفسارات المكررة دون تجاوز حدود الميزانية.'
    },
    teamTitle: { en: 'Meet Our Leadership', ar: 'فريق القيادة' },
    badgeSecure: { en: 'Secure Encryption', ar: 'تشفير آمن' },
    badgePrivate: { en: 'Strict Data Privacy', ar: 'خصوصية بيانات صارمة' },
    badgeLive: { en: 'Available 24/7', ar: 'متاح 24/7' },
    badgeLocal: { en: 'Made in Qatar', ar: 'صنع في قطر' }
  };

  const team = [
    { name: 'Salah Al-Qahtani', role: t({ en: 'Founder & CEO', ar: 'المؤسس والرئيس التنفيذي' }), initial: 'S' },
    { name: 'Dr. Karim Mansour', role: t({ en: 'Head of AI Engineering', ar: 'رئيس هندسة الذكاء الاصطناعي' }), initial: 'K' },
    { name: 'Fatima Al-Jaber', role: t({ en: 'Customer Success Director', ar: 'مدير نجاح العملاء' }), initial: 'F' }
  ];

  return (
    <div className="bg-[#F8F9FB] text-[#1A202C] min-h-screen flex flex-col font-sans" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <MarketingHeader />

      <main className="flex-1 max-w-4xl mx-auto py-24 px-6 flex flex-col items-center">
        {/* Hero */}
        <div className="text-center mb-16">
          <span className="text-xs font-extrabold tracking-widest text-[#2A5CFF] uppercase">{t(content.eyebrow)}</span>
          <h1 className="text-4xl lg:text-5xl font-extrabold text-[#141F33] leading-tight tracking-tight mt-3">
            {t(content.title)}
          </h1>
        </div>

        {/* Story Section */}
        <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm w-full mb-12 text-center md:text-start">
          <h2 className="text-xl font-extrabold text-[#141F33] mb-4">{t(content.storyTitle)}</h2>
          <p className="text-sm font-semibold text-[#718096] leading-relaxed">
            {t(content.storyBody)}
          </p>
        </div>

        {/* Team Section */}
        <div className="w-full mb-16">
          <h2 className="text-2xl font-extrabold text-[#141F33] text-center mb-10">{t(content.teamTitle)}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, idx) => (
              <div key={idx} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col items-center text-center">
                <div className="h-16 w-16 rounded-full bg-[#141F33]/5 text-[#141F33] text-xl font-bold flex items-center justify-center mb-4">
                  {member.initial}
                </div>
                <h3 className="text-base font-extrabold text-[#141F33]">{member.name}</h3>
                <p className="text-xs font-semibold text-[#718096] mt-1">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Badges SVG Strip */}
        <div className="border-t border-gray-200 pt-12 w-full flex flex-wrap justify-center gap-8 md:gap-12">
          
          <div className="flex items-center gap-2 opacity-50 grayscale hover:opacity-100 transition-opacity">
            <svg className="h-6 w-6 text-[#141F33]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <span className="text-xs font-bold text-[#141F33]">{t(content.badgeSecure)}</span>
          </div>

          <div className="flex items-center gap-2 opacity-50 grayscale hover:opacity-100 transition-opacity">
            <svg className="h-6 w-6 text-[#141F33]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <span className="text-xs font-bold text-[#141F33]">{t(content.badgePrivate)}</span>
          </div>

          <div className="flex items-center gap-2 opacity-50 grayscale hover:opacity-100 transition-opacity">
            <svg className="h-6 w-6 text-[#141F33]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span className="text-xs font-bold text-[#141F33]">{t(content.badgeLive)}</span>
          </div>

          <div className="flex items-center gap-2 opacity-50 grayscale hover:opacity-100 transition-opacity">
            <svg className="h-6 w-6 text-[#141F33]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span className="text-xs font-bold text-[#141F33]">{t(content.badgeLocal)}</span>
          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
}
