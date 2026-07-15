'use client';

import React from 'react';
import { useLocale } from '../providers';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';

export default function AboutPage() {
  const { locale } = useLocale();
  const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';
  const ta = (obj: Record<string, string[]>) => obj[locale] || obj.en || [];

  const content = {
    eyebrow: { en: 'Our Mission', ar: 'مهمتنا' },
    title: { en: 'Built for the people answering calls and running operations.', ar: 'مبني للأشخاص الذين يردون على المكالمات ويديرون العمليات.' },
    storyTitle: { en: 'The Story & Mission', ar: 'القصة والمهمة' },
    storyBody: {
      en: [
        'SAQYN RABT was born from a fundamental truth we encountered across dozens of industries: businesses are held together by people answering phones, routing requests, and keeping operations moving — yet the tools available to them were built for massive call centres, not real-world teams. We set out to change that. Our mission is to equip every front desk, service desk, and operations team with enterprise-grade AI that feels personal, not impersonal. We bridge the gap between human judgment and machine efficiency, so your people can focus on what matters instead of repeating the same answers all day.',
        'On the engineering side, we are a B2B platform first. Every feature we build starts with a question from a real operations manager or a front-desk lead. Our AI stack is designed for integration — it plugs into existing CRMs, ticketing systems, and telephony infrastructure without requiring a rip-and-replace. We prioritise latency, reliability, and data residency above all else, because we know that in B2B operations, a five-second delay or a misrouted inquiry can cost a deal or frustrate a client. Our inference layer runs on dedicated infrastructure with regional failover, and our voice pipelines are tuned for the dialects, cadences, and professional contexts our customers actually work in.',
        'Operational excellence is not a buzzword for us — it is the metric we wake up to every morning. From automated quality assurance on every AI interaction to real-time dashboards that surface bottlenecks before they become emergencies, we obsess over the details that keep businesses running smoothly. Our support team works alongside customers during onboarding, not after. Our SLAs reflect real-world uptime requirements. And our product roadmap is public and driven by customer feedback, not by what is trendy. SAQYN RABT exists to make your operations invisible — so your team can be visible, responsive, and extraordinary.',
      ],
      ar: [
        'وُلدت SAQYN RABT من حقيقة أساسية لمسناها عبر عشرات القطاعات: الشركات تُدار بأشخاص يردون على الهواتف ويوجّهون الطلبات ويُبقون العمليات قيد التشغيل — لكن الأدوات المتاحة لهم صُممت لمراكات الاتصال الضخمة، وليس للفرق الحقيقية. قررنا تغيير ذلك. مهمتنا هي تجهيز كل مكتب استقبال وفريق خدمات وعمليات بأدوات ذكاء اصطناعي على مستوى المؤسسات لكنها تشعر بأنها شخصية، لا آلية. نسد الفجوة بين الحكم البشري والكفاءة الآلية، ليتمكن فريقك من التركيز على ما يهم حقاً بدلاً من تكرار نفس الإجابات طوال اليوم.',
        'على صعيد الهندسة، نحن منصة B2B أولاً. كل ميزة نبنيها تبدأ بسؤال من مدير عمليات حقيقي أو رئيس مكتب استقبال. حزمة الذكاء الاصطناعي لدينا صُممت للتكامل — تتصل بأنظمة CRM وأنظمة التذاكر والبنية التحتية للاتصالات الهاتفية دون الحاجة لاستبدال أي نظام قائم. نعطي الأولوية القصوى لسرعة الاستجابة والموثوقية ومكان تخزين البيانات، لأننا نعلم أنه في عمليات B2B، تأخير خمس ثوانٍ أو توجيه خاطئ لاستفسار قد يكلف صفقة أو يُحبط عميلاً. طبقة الاستدلال لدينا تعمل على بنية تحتية مخصصة مع تجاوز الفشل إقليمياً، وخطوط الصوت لدينا مضبوطة على اللهجات والإيقاعات والسياقات المهنية التي يعمل بها عملاؤنا فعلاً.',
        'التميز التشغيلي ليس مجرد شعار بالنسبة لنا — بل هو المؤشر الذي نستيقظ عليه كل صباح. من ضمان الجودة الآلي لكل تفاعل ذكي إلى لوحات القيادة الفورية التي تكشف الاختناقات قبل أن تتحول إلى أزمات، نولع بالتفاصيل التي تُبقي الأعمال تعمل بسلاسة. فريق الدعم لدينا يعمل جنباً إلى جنب مع العملاء أثناء مرحلة الإعداد، وليس بعدها. اتفاقيات مستوى الخدمة لدينا تعكس متطلبات وقت التشغيل الفعلية. وخارطة طريق منتجنا مفتوحة ويقودها ملاحظات العملاء، وليس ما هو رائج. SAQYN RABT موجودة لجعل عملياتك غير مرئية — ليكون فريقك مرئياً ومتجاوباً واستثنائياً.',
      ],
    },
    badgeSecure: { en: 'Secure Encryption', ar: 'تشفير آمن' },
    badgePrivate: { en: 'Strict Data Privacy', ar: 'خصوصية بيانات صارمة' },
    badgeLive: { en: 'Available 24/7', ar: 'متاح 24/7' },
    badgeLocal: { en: 'Global Operations', ar: 'عمليات عالمية' },
  };

  return (
    <div className="bg-[#F8F9FB] text-[#141F33] min-h-screen flex flex-col font-sans" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <Header />

      <main className="flex-1 max-w-4xl mx-auto py-24 px-6 flex flex-col items-center">
        {/* Hero */}
        <div className="text-center mb-16">
          <span className="text-xs font-extrabold tracking-widest text-[#2A5CFF] uppercase">{t(content.eyebrow)}</span>
          <h1 className="text-4xl lg:text-5xl font-extrabold text-[#141F33] leading-tight tracking-tight mt-3">
            {t(content.title)}
          </h1>
        </div>

        {/* Story Section */}
        <div className="bg-[#F8F9FB] border border-[rgba(20,31,51,0.1)] rounded-2xl p-6 shadow-sm w-full mb-12 text-center md:text-start">
          <h2 className="text-xl font-extrabold text-[#141F33] mb-4">{t(content.storyTitle)}</h2>
          <div className="space-y-4">
            {ta(content.storyBody).map((paragraph: string, i: number) => (
              <p key={i} className="text-sm font-semibold text-[#141F33]/60 leading-relaxed">{paragraph}</p>
            ))}
          </div>
        </div>

        {/* Trust Badges SVG Strip */}
        <div className="border-t border-[rgba(20,31,51,0.1)] pt-12 w-full flex flex-wrap justify-center gap-8 md:gap-12">
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