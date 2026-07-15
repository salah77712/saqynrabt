'use client';

import { use, useState } from 'react';
import { useLocale } from '../../providers';
import { Header } from '../../../components/Header';
import { Footer } from '../../../components/Footer';
import { 
  Check, ArrowLeft, MapPin, Briefcase,
  Hotel, Activity, Wrench, Home, ShoppingBag, Truck,
  Car, GraduationCap, Database, HeartPulse,
  Smile, Compass, Utensils, Dumbbell
} from 'lucide-react';
import Link from 'next/link';
import { cases, CaseStudy } from '../data';

const iconMap: Record<string, React.ComponentType<any>> = {
  Hotel, Activity, Wrench, Home, ShoppingBag, Truck,
  Briefcase, Car, GraduationCap, Database, HeartPulse,
  Smile, Compass, Utensils, Dumbbell
};

export default function CaseStudyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { locale } = useLocale();
  const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';

  // Get matching case study from the unified central 15-case data list
  const lang = (locale === 'ar' ? 'ar' : 'en') as 'en' | 'ar';
  const list = cases[lang] || cases.en;
  const details = list.find((c) => c.slug === slug) || list[0];

  const IconComponent = iconMap[details.iconName] || Briefcase;

  return (
    <div className="bg-[#F8F9FB] text-[#141F33] min-h-screen flex flex-col font-sans selection:bg-[#2A5CFF] selection:text-[#F8F9FB]" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-6 py-12 w-full">
        {/* Back Link */}
        <Link 
          href="/case-studies"
          className="inline-flex items-center gap-2 text-xs font-bold text-[#2A5CFF] hover:opacity-85 transition-all mb-8 hover:translate-x-[-2px] duration-200"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t({ en: 'Back to Case Studies', ar: 'العودة لدراسات الحالة' })}</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* Left Columns: Story */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <span className="inline-block bg-[#2A5CFF]/10 text-[#2A5CFF] text-[10px] font-black uppercase tracking-widest px-3.5 py-1.5 rounded-full mb-4">
                {details.industry}
              </span>
              <h1 className="text-3xl md:text-5xl font-black text-[#141F33] leading-tight tracking-tight">
                {details.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 mt-4 text-xs font-bold text-[#141F33]/60">
                <span className="flex items-center gap-1.5">
                  <span className="text-base">{details.flag}</span>
                  <span>{details.location}</span>
                </span>
                <span>•</span>
                <span>{details.meta}</span>
              </div>
            </div>

            {/* Stylized Solid Backdrop Section (Vector graphic design, no image) */}
            <div className="w-full min-h-[260px] md:min-h-[340px] rounded-2xl bg-[#141F33] text-[#F8F9FB] p-8 md:p-12 relative overflow-hidden flex flex-col justify-between shadow-xl">
              {/* Decorative graphic background glows */}
              <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#2A5CFF]/15 rounded-full filter blur-[80px] pointer-events-none" />
              
              <div className="flex items-start justify-between relative z-10">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#2A5CFF]">
                    {t({ en: 'SYSTEM ARCHITECTURE', ar: 'بنية النظام المطبقة' })}
                  </span>
                  <p className="text-xs text-[#F8F9FB]/50 font-bold uppercase tracking-wider">
                    {details.meta}
                  </p>
                </div>

                <div className="w-14 h-14 rounded-2xl bg-[#2A5CFF]/20 text-[#2A5CFF] flex items-center justify-center shadow-lg border border-[#2A5CFF]/30">
                  <IconComponent className="w-8 h-8 stroke-[2]" />
                </div>
              </div>

              <div className="relative z-10 mt-8">
                <blockquote className="text-lg md:text-xl font-bold italic leading-relaxed text-[#F8F9FB]/90 max-w-2xl">
                  "{details.result}"
                </blockquote>
              </div>
            </div>

            {/* Dynamic Content details */}
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-extrabold text-[#141F33] mb-2">
                  {t({ en: 'The Challenge', ar: 'التحدي العقبة' })}
                </h2>
                <p className="text-sm text-[#141F33]/60 leading-relaxed font-medium">
                  {details.challenge}
                </p>
              </div>

              <div className="h-px bg-[#141F33]/10 border-b border-[#141F33]/10" />

              <div>
                <h2 className="text-xl font-extrabold text-[#141F33] mb-2">
                  {t({ en: 'The Solution', ar: 'الحل المطبق' })}
                </h2>
                <p className="text-sm text-[#141F33]/60 leading-relaxed font-medium">
                  {details.solution}
                </p>
              </div>

              <div className="h-px bg-[#141F33]/10 border-b border-[#141F33]/10" />

              <div>
                <h2 className="text-xl font-extrabold text-[#141F33] mb-2">
                  {t({ en: 'Business Impact', ar: 'الأثر والنتائج' })}
                </h2>
                <p className="text-sm text-[#141F33]/60 leading-relaxed font-medium">
                  {details.impact}
                </p>
              </div>
            </div>
          </div>

          {/* Right Columns: Metrics Panel */}
          <div className="space-y-8 lg:sticky lg:top-24">
            <div className="bg-[#F8F9FB] border border-[#141F33]/10 rounded-2xl p-8 shadow-sm">
              <h3 className="text-base font-extrabold text-[#141F33] mb-6">
                {t({ en: 'Performance Metrics', ar: 'مقاييس الأداء المحققة' })}
              </h3>
              <div className="space-y-4">
                {details.metrics.map((metric, i) => (
                  <div key={i} className="flex items-start gap-3 bg-[#F8F9FB] border border-[#141F33]/10 rounded-2xl p-4 shadow-sm">
                    <Check className="w-5 h-5 text-[#2A5CFF] shrink-0 mt-0.5" />
                    <span className="text-xs font-black text-[#141F33]">{metric}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Box */}
            <div className="bg-[#141F33] rounded-2xl p-8 text-center text-[#F8F9FB] shadow-xl relative overflow-hidden">
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#2A5CFF]/10 rounded-full filter blur-2xl" />
              
              <h4 className="text-lg font-extrabold mb-3 relative z-10">
                {t({ en: 'Get Similar Results', ar: 'احصل على نتائج مماثلة' })}
              </h4>
              <p className="text-xs text-[#F8F9FB]/70 leading-relaxed mb-6 font-semibold relative z-10">
                {t({ 
                  en: 'Schedule a tailored automation design session for your business operations.', 
                  ar: 'جدول جلسة تصميم أتمتة مخصصة لعمليات عملك اليوم.' 
                })}
              </p>
              <a
                href={process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/saqynrabt/demo'}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex min-h-[44px] items-center justify-center rounded-xl bg-[#2A5CFF] text-[#F8F9FB] font-bold text-xs hover:opacity-90 transition-all shadow-[0_4px_15px_rgba(42,92,255,0.3)] hover:translate-y-[-1px] active:translate-y-0"
              >
                {t({ en: 'Book Session Now', ar: 'احجز جلستك الآن' })}
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
