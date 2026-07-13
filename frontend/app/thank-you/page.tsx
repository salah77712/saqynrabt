'use client';

import React from 'react';
import { useLocale } from '../providers';
import Link from 'next/link';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { ConfettiIcon } from '../../components/ui/Icons';

export default function ThankYouPage() {
  const { locale } = useLocale();
  const t = (obj: Record<string, string>) => locale === 'ar' ? obj.ar : obj.en;

  return (
    <div className="bg-[#F8F9FB] text-[#1A202C] min-h-screen flex flex-col font-sans" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <Header />

      <main className="flex-1 flex flex-col items-center justify-center py-24 px-6 text-center max-w-2xl mx-auto animate-fadeIn">
        
        {/* Confetti SVG Icon */}
        <div className="h-24 w-24 rounded-full bg-blue-50 flex items-center justify-center mb-8 animate-bounce shadow-sm">
          <ConfettiIcon className="w-12 h-12 text-blue-500" />
        </div>

        <span className="text-xs font-extrabold tracking-widest text-[#10B981] uppercase">{t({ en: 'Submission Received', ar: 'تم استلام الطلب' })}</span>
        
        <h1 className="text-4xl lg:text-5xl font-extrabold text-[#141F33] leading-tight tracking-tight mt-3">
          {t({ en: "We'll be in touch shortly.", ar: 'سنتواصل معك قريبًا.' })}
        </h1>
        
        <p className="text-sm font-semibold text-[#718096] mt-4 leading-relaxed max-w-md mx-auto">
          {t({
            en: 'A member of the SAQYN RABT team will contact you within 24 hours to schedule your customized operational workflow demo.',
            ar: 'سيتصل بك ممثل من فريق SAQYN RABT خلال 24 ساعة لجدولة العرض التوضيحي المخصص لسير العمل الخاص بك.'
          })}
        </p>

        <div className="mt-10 flex gap-4">
          <Link
            href="/"
            className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-[#141F33] px-8 py-3 text-xs font-bold text-white shadow-md hover:opacity-95 transition-all hover:scale-[1.02]"
          >
            {t({ en: 'Back to Home', ar: 'العودة للرئيسية' })}
          </Link>
          <Link
            href="/dashboard"
            className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-white border border-gray-200 px-8 py-3 text-xs font-bold text-[#141F33] shadow-sm hover:bg-slate-50 transition-all hover:scale-[1.02]"
          >
            {t({ en: 'Explore Dashboard', ar: 'استكشف لوحة التحكم' })}
          </Link>
        </div>

      </main>

      <Footer />
    </div>
  );
}
