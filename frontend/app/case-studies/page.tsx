'use client';

import { useState } from 'react';
import { useLocale } from '../providers';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { 
  Check, ChevronLeft, ChevronRight, MapPin,
  Hotel, Activity, Wrench, Home, ShoppingBag, Truck,
  Briefcase, Car, GraduationCap, Database, HeartPulse,
  Smile, Compass, Utensils, Dumbbell
} from 'lucide-react';
import Link from 'next/link';
import { cases, CaseStudy } from './data';

const iconMap: Record<string, React.ComponentType<any>> = {
  Hotel, Activity, Wrench, Home, ShoppingBag, Truck,
  Briefcase, Car, GraduationCap, Database, HeartPulse,
  Smile, Compass, Utensils, Dumbbell
};

export default function CaseStudiesPage() {
  const { locale } = useLocale();
  const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';
  const list = cases[locale as keyof typeof cases] || cases.en;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [startX, setStartX] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [sweepActive, setSweepActive] = useState(false);

  const playTickSound = () => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1200, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.06);

      gain.gain.setValueAtTime(0.03, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.06);
    } catch (e) {
      console.warn('Audio Context not allowed by user interaction yet:', e);
    }
  };

  const triggerEffects = () => {
    playTickSound();
    setSweepActive(true);
    setTimeout(() => setSweepActive(false), 800);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % list.length);
    triggerEffects();
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + list.length) % list.length);
    triggerEffects();
  };

  const handleStart = (clientX: number) => {
    setStartX(clientX);
    setIsDragging(true);
  };

  const handleMove = (clientX: number) => {
    if (!isDragging || startX === null) return;
    const diff = startX - clientX;
    if (Math.abs(diff) > 60) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
      setStartX(null);
      setIsDragging(false);
    }
  };

  const handleEnd = () => {
    setIsDragging(false);
    setStartX(null);
  };

  return (
    <div className="bg-[#F8F9FB] text-[#141F33] min-h-screen flex flex-col font-sans selection:bg-[#2A5CFF] selection:text-[#F8F9FB]" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <Header />

      <section className="max-w-7xl mx-auto px-6 pt-20 pb-10 text-center">
        <span className="inline-block bg-royal/10 text-royal text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
          {t({ en: 'Case Studies', ar: 'دراسات الحالة' })}
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#141F33] leading-tight max-w-4xl mx-auto">
          {t({ en: 'Real Results from Real Businesses', ar: 'نتائج حقيقية من شركات حقيقية' })}
        </h1>
        <p className="mt-4 text-base md:text-lg text-[#141F33]/60 max-w-2xl mx-auto font-medium">
          {t({ en: 'From the Middle East to the world — swipe to see how teams use SAQYN RABT to transform their operations.', ar: 'من الشرق الأوسط إلى العالم — اسحب لمشاهدة كيف تستخدم الفرق SAQYN RABT لتحويل عملياتهم.' })}
        </p>
      </section>

      {/* Swipeable Premium Showcase Slider (Vector Cards, No Images) */}
      <section className="py-12 bg-[#F8F9FB] overflow-hidden select-none">
        <div 
          className="relative max-w-6xl mx-auto px-6 flex flex-col items-center"
          onTouchStart={(e) => handleStart(e.touches[0].clientX)}
          onTouchMove={(e) => handleMove(e.touches[0].clientX)}
          onTouchEnd={handleEnd}
          onMouseDown={(e) => handleStart(e.clientX)}
          onMouseMove={(e) => isDragging && handleMove(e.clientX)}
          onMouseUp={handleEnd}
          onMouseLeave={handleEnd}
        >
          {/* Main Cards Row */}
          <div className="relative w-full flex items-center justify-center min-h-[500px]">
            <div className="flex gap-6 items-center justify-center w-full max-w-4xl transition-all duration-500 ease-out">
              {list.map((item, idx) => {
                const offset = idx - currentIndex;
                const isActive = idx === currentIndex;
                const isPrev = idx === (currentIndex - 1 + list.length) % list.length;
                const isNext = idx === (currentIndex + 1) % list.length;

                // Hidden if outside focus group
                if (!isActive && !isPrev && !isNext) return null;

                const IconComponent = iconMap[item.iconName] || Briefcase;

                return (
                  <div
                    key={idx}
                    onClick={() => {
                      if (!isActive) {
                        setCurrentIndex(idx);
                        triggerEffects();
                      }
                    }}
                    className={`relative w-[300px] md:w-[360px] h-[480px] rounded-2xl overflow-hidden cursor-pointer shadow-xl transition-all duration-700 cubic-bezier(0.16, 1, 0.3, 1) flex flex-col justify-between p-6 border ${
                      isActive 
                        ? 'bg-[#141F33] text-[#F8F9FB] border-transparent scale-100 opacity-100 z-35 ring-4 ring-[#2A5CFF]/35 shadow-[0_20px_50px_rgba(42,92,255,0.25)]' 
                        : 'bg-[#F8F9FB] text-[#141F33] border-[#141F33]/10 scale-90 opacity-40 filter blur-[1px] z-10 hover:opacity-60'
                    }`}
                  >
                    {/* Premium Sweep Shine (Active Card Only) */}
                    {isActive && sweepActive && (
                      <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-r from-transparent via-[#F8F9FB]/10 to-transparent skew-x-12 translate-x-[-100%] animate-[shineSweep_0.8s_ease-out]" />
                    )}

                    {/* Card Header: Industry & Icon */}
                    <div className="flex items-start justify-between w-full z-25">
                      <div className="flex flex-col gap-1.5">
                        <span className={`text-[10px] font-black uppercase tracking-widest ${isActive ? 'text-[#2A5CFF]' : 'text-[#141F33]/40'}`}>
                          {item.industry}
                        </span>
                        <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider opacity-60">
                          <MapPin className="w-3 h-3" />
                          <span>{item.location}</span>
                        </div>
                      </div>
                      
                      {/* Stylized Circular Icon Container */}
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-transform duration-300 ${
                        isActive 
                          ? 'bg-[#2A5CFF]/15 text-[#2A5CFF] scale-110 shadow-[0_0_20px_rgba(42,92,255,0.2)] animate-pulse' 
                          : 'bg-[#F8F9FB] text-[#141F33]/40'
                      }`}>
                        <IconComponent className="w-6 h-6 stroke-[2]" />
                      </div>
                    </div>

                    {/* Card Content Overlay */}
                    <div className="flex flex-col justify-end mt-auto z-25">
                      {/* Flag & Location Header */}
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xl">{item.flag}</span>
                        <span className={`text-[10px] tracking-widest uppercase font-black ${isActive ? 'text-[#F8F9FB]/60' : 'text-[#141F33]/40'}`}>
                          {item.location.split(',')[0]}
                        </span>
                      </div>

                      <h2 className="text-lg md:text-xl font-black leading-snug mb-3 tracking-tight">
                        {item.title}
                      </h2>
                      
                      <p className={`text-xs font-medium leading-relaxed mb-6 line-clamp-3 ${isActive ? 'text-[#F8F9FB]/70' : 'text-[#141F33]'}`}>
                        {item.result}
                      </p>

                      {/* Explore Link (Animated Capsule Button) */}
                      <Link
                        href={`/case-studies/${item.slug}`}
                        className={`w-full flex items-center justify-between min-h-[44px] font-bold text-xs px-6 py-3 rounded-2xl border transition-all duration-300 hover:shadow-md hover:scale-[1.02] active:scale-95 ${
                          isActive
                            ? 'bg-[#2A5CFF] hover:bg-[#2A5CFF]/95 text-[#F8F9FB] border-transparent hover:shadow-[0_8px_25px_rgba(42,92,255,0.4)] hover:translate-y-[-1px] active:translate-y-0'
                            : 'bg-[#F8F9FB] hover:bg-[#141F33]/5 text-[#141F33] border-[#141F33]/10'
                        }`}
                      >
                        <span>{t({ en: 'Explore Case Study', ar: 'استعرض دراسة الحالة' })}</span>
                        <span className="transition-transform duration-300 group-hover:translate-x-1">
                          {locale === 'ar' ? '←' : '→'}
                        </span>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Slider Controllers & Indicators */}
          <div className="flex items-center gap-6 mt-10">
            <button
              onClick={handlePrev}
              className="w-12 h-12 min-h-0 bg-[#F8F9FB] hover:bg-[#141F33]/5 border border-[#141F33]/10 text-navy flex items-center justify-center rounded-full shadow-sm hover:shadow active:scale-95 transition-all"
              aria-label="Previous Study"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            {/* Dots */}
            <div className="flex items-center gap-2 max-w-xs md:max-w-md overflow-x-auto py-2">
              {list.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setCurrentIndex(i);
                    triggerEffects();
                  }}
                  className={`min-h-0 rounded-full transition-all duration-300 shrink-0 ${
                    i === currentIndex ? 'w-6 h-2 bg-royal' : 'w-2 h-2 bg-[#141F33]/20'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="w-12 h-12 min-h-0 bg-[#F8F9FB] hover:bg-[#141F33]/5 border border-[#141F33]/10 text-navy flex items-center justify-center rounded-full shadow-sm hover:shadow active:scale-95 transition-all"
              aria-label="Next Study"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Detailed Metrics Panel of Active Card */}
        <div className="max-w-4xl mx-auto px-6 mt-12 animate-fadeIn" key={currentIndex}>
          <div className="bg-[#F8F9FB] border border-[#141F33]/10 rounded-2xl p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#141F33]/60 mb-1 block">
                {list[currentIndex].meta}
              </span>
              <h3 className="text-lg font-extrabold text-[#141F33]">
                {locale === 'ar' ? 'المقاييس الرئيسية المحققة' : 'Key Metrics Achieved'}
              </h3>
            </div>
            <div className="flex flex-wrap gap-4 justify-end">
              {list[currentIndex].metrics.map((metric, i) => (
                <div key={i} className="flex items-center gap-2.5 bg-royal/5 border border-royal/10 rounded-2xl px-5 py-3 shadow-sm">
                  <Check className="w-5 h-5 text-royal shrink-0" />
                  <span className="text-xs font-extrabold text-[#141F33]">{metric}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#F8F9FB]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-extrabold text-[#141F33] mb-4">
            {t({ en: 'Be the Next Success Story', ar: 'كن قصة النجاح التالية' })}
          </h2>
          <p className="text-[#141F33]/60 font-medium mb-8">
            {t({ en: 'Book a demo and see how SAQYN RABT can transform your operations.', ar: 'احجز عرضاً توضيحياً وشاهد كيف يمكن لـ SAQYN RABT تحويل عملياتك.' })}
          </p>
          <a
            href={process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/saqynrabt/demo'}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary py-3 px-6 text-xs"
          >
            {t({ en: 'Book Your Demo Session', ar: 'احجز جلسة العرض الخاص بك' })}
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
