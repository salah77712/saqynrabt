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
    <div className="bg-surface text-primary min-h-screen flex flex-col font-sans selection:bg-accent selection:text-surface" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <Header />

      <section className="max-w-7xl mx-auto px-6 pt-20 pb-10 text-center">
        <span className="inline-block bg-accent/10 text-accent text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
          {t({ en: 'Case Studies', ar: 'Ø¯Ø±Ø§Ø³Ø§Øª Ø§Ù„Ø­Ø§Ù„Ø©' })}
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-primary leading-tight max-w-4xl mx-auto">
          {t({ en: 'Real Results from Real Businesses', ar: 'Ù†ØªØ§Ø¦Ø¬ Ø­Ù‚ÙŠÙ‚ÙŠØ© Ù…Ù† Ø´Ø±ÙƒØ§Øª Ø­Ù‚ÙŠÙ‚ÙŠØ©' })}
        </h1>
        <p className="mt-4 text-base md:text-lg text-primary/60 max-w-2xl mx-auto font-medium">
          {t({ en: 'From the Middle East to the world â€” swipe to see how teams use SAQYN RABT to transform their operations.', ar: 'Ù…Ù† Ø§Ù„Ø´Ø±Ù‚ Ø§Ù„Ø£ÙˆØ³Ø· Ø¥Ù„Ù‰ Ø§Ù„Ø¹Ø§Ù„Ù… â€” Ø§Ø³Ø­Ø¨ Ù„Ù…Ø´Ø§Ù‡Ø¯Ø© ÙƒÙŠÙ ØªØ³ØªØ®Ø¯Ù… Ø§Ù„ÙØ±Ù‚ SAQYN RABT Ù„ØªØ­ÙˆÙŠÙ„ Ø¹Ù…Ù„ÙŠØ§ØªÙ‡Ù….' })}
        </p>
      </section>

      {/* Swipeable Premium Showcase Slider (Vector Cards, No Images) */}
      <section className="py-12 bg-surface overflow-hidden select-none">
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
            <div className="flex gap-8 items-center justify-center w-full max-w-4xl transition-all duration-500 ease-out">
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
                    className={`relative w-[300px] md:w-[360px] h-[480px] rounded-xl overflow-hidden cursor-pointer shadow-xl transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col justify-between p-8 border ${
                      isActive 
                        ? 'bg-primary text-surface border-transparent scale-100 opacity-100 z-35 ring-4 ring-accent/35 shadow-[0_20px_50px_color-mix(in_srgb,var(--color-accent)_25%,_transparent)]' 
                        : 'bg-surface text-primary border-primary/10 scale-90 opacity-40 filter blur-[1px] z-10 hover:opacity-60'
                    }`}
                  >
                    {/* Premium Sweep Shine (Active Card Only) */}
                    {isActive && sweepActive && (
                      <div className="absolute inset-0 z-20 pointer-events-none     skew-x-12 translate-x-[-100%] animate-[shineSweep_0.8s_ease-out]" />
                    )}

                    {/* Card Header: Industry & Icon */}
                    <div className="flex items-start justify-between w-full z-25">
                      <div className="flex flex-col gap-1.5">
                        <span className={`text-[10px] font-black uppercase tracking-widest ${isActive ? 'text-accent' : 'text-primary/40'}`}>
                          {item.industry}
                        </span>
                        <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider opacity-60">
                          <MapPin className="w-3 h-3" />
                          <span>{item.location}</span>
                        </div>
                      </div>
                      
                      {/* Stylized Circular Icon Container */}
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 ${
                        isActive 
                          ? 'bg-accent/15 text-accent scale-110 shadow-[0_0_20px_color-mix(in_srgb,var(--color-accent)_20%,_transparent)] animate-pulse' 
                          : 'bg-surface text-primary/40'
                      }`}>
                        <IconComponent className="w-6 h-6 stroke-[2]" />
                      </div>
                    </div>

                    {/* Card Content Overlay */}
                    <div className="flex flex-col justify-end mt-auto z-25">
                      {/* Flag & Location Header */}
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-xl">{item.flag}</span>
                        <span className={`text-[10px] tracking-widest uppercase font-black ${isActive ? 'text-surface/60' : 'text-primary/40'}`}>
                          {item.location.split(',')[0]}
                        </span>
                      </div>

                      <h2 className="text-lg md:text-xl font-black leading-snug mb-3 tracking-tight">
                        {item.title}
                      </h2>
                      
                      <p className={`text-xs font-medium leading-relaxed mb-6 line-clamp-3 ${isActive ? 'text-surface/70' : 'text-primary'}`}>
                        {item.result}
                      </p>

                      {/* Explore Link (Animated Capsule Button) */}
                      <Link
                        href={`/case-studies/${item.slug}`}
                        className={`w-full flex items-center justify-between min-h-[44px] font-bold text-xs px-6 py-3 rounded-xl border transition-all duration-300 hover:shadow-md hover:scale-[1.02] active:scale-95 ${
                          isActive
                            ? 'bg-accent hover:bg-accent/95 text-surface border-transparent hover:shadow-[0_8px_25px_color-mix(in_srgb,var(--color-accent)_40%,_transparent)] hover:translate-y-[-1px] active:translate-y-0'
                            : 'bg-surface hover:bg-primary text-primary border-primary/10'
                        }`}
                      >
                        <span>{t({ en: 'Explore Case Study', ar: 'Ø§Ø³ØªØ¹Ø±Ø¶ Ø¯Ø±Ø§Ø³Ø© Ø§Ù„Ø­Ø§Ù„Ø©' })}</span>
                        <span className="transition-transform duration-300 group-hover:translate-x-1">
                          {locale === 'ar' ? 'â†' : 'â†’'}
                        </span>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Slider Controllers & Indicators */}
          <div className="flex items-center gap-8 mt-10">
            <button
              onClick={handlePrev}
              className="w-12 h-12 min-h-0 bg-surface hover:bg-primary border border-primary/10 text-primary flex items-center justify-center rounded-full shadow-sm hover:shadow active:scale-95 transition-all"
              aria-label="Previous Study"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            {/* Dots */}
            <div className="flex items-center gap-3 max-w-xs md:max-w-md overflow-x-auto py-2">
              {list.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setCurrentIndex(i);
                    triggerEffects();
                  }}
                  className={`min-h-0 rounded-full transition-all duration-300 shrink-0 ${
                    i === currentIndex ? 'w-6 h-2 bg-accent' : 'w-2 h-2 bg-primary'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="w-12 h-12 min-h-0 bg-surface hover:bg-primary border border-primary/10 text-primary flex items-center justify-center rounded-full shadow-sm hover:shadow active:scale-95 transition-all"
              aria-label="Next Study"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Detailed Metrics Panel of Active Card */}
<div className="max-w-4xl mx-auto px-6 mt-12 animate-fadeIn" key={currentIndex}>
<div className="bg-background border border-primary/10 rounded-xl p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8 shadow-card">
            <div className="flex-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-primary/60 mb-1 block">
                {list[currentIndex].meta}
              </span>
              <h3 className="text-lg font-extrabold text-primary">
                {locale === 'ar' ? 'Ø§Ù„Ù…Ù‚Ø§ÙŠÙŠØ³ Ø§Ù„Ø±Ø¦ÙŠØ³ÙŠØ© Ø§Ù„Ù…Ø­Ù‚Ù‚Ø©' : 'Key Metrics Achieved'}
              </h3>
            </div>
            <div className="flex flex-wrap gap-8 justify-end">
              {list[currentIndex].metrics.map((metric, i) => (
                <div key={i} className="flex items-center gap-3.5 bg-accent/10 border border-accent/10 rounded-xl px-5 py-3 shadow-sm">
                  <Check className="w-5 h-5 text-accent shrink-0" />
                  <span className="text-xs font-extrabold text-primary">{metric}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-surface">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-extrabold text-primary mb-4">
            {t({ en: 'Be the Next Success Story', ar: 'ÙƒÙ† Ù‚ØµØ© Ø§Ù„Ù†Ø¬Ø§Ø­ Ø§Ù„ØªØ§Ù„ÙŠØ©' })}
          </h2>
          <p className="text-primary/60 font-medium mb-8">
            {t({ en: 'Book a demo and see how SAQYN RABT can transform your operations.', ar: 'Ø§Ø­Ø¬Ø² Ø¹Ø±Ø¶Ø§Ù‹ ØªÙˆØ¶ÙŠØ­ÙŠØ§Ù‹ ÙˆØ´Ø§Ù‡Ø¯ ÙƒÙŠÙ ÙŠÙ…ÙƒÙ† Ù„Ù€ SAQYN RABT ØªØ­ÙˆÙŠÙ„ Ø¹Ù…Ù„ÙŠØ§ØªÙƒ.' })}
          </p>
          <a
            href={process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/saqynrabt/demo'}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary py-3 px-6 text-xs"
          >
            {t({ en: 'Book Your Demo Session', ar: 'Ø§Ø­Ø¬Ø² Ø¬Ù„Ø³Ø© Ø§Ù„Ø¹Ø±Ø¶ Ø§Ù„Ø®Ø§Øµ Ø¨Ùƒ' })}
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
