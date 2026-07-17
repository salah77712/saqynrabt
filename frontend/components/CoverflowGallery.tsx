'use client';

import { useState, useEffect, useCallback, useRef, type CSSProperties } from 'react';
import Link from 'next/link';
import {
  Hotel, Activity, Wrench, Home, ShoppingBag, Truck,
  Briefcase, Car, GraduationCap, Database, HeartPulse,
  Smile, Compass, Utensils, Dumbbell
} from 'lucide-react';
import { type CaseStudy } from '../app/case-studies/data';
import { useLocale } from '../app/providers';

const PERSPECTIVE = 1600;
const SCALE_STEP = 0.16;
const MAX_VISIBLE = 2;
const DEPTH = 240;

const iconMap: Record<string, React.ComponentType<any>> = {
  Hotel, Activity, Wrench, Home, ShoppingBag, Truck,
  Briefcase, Car, GraduationCap, Database, HeartPulse,
  Smile, Compass, Utensils, Dumbbell
};

const CARD_BG = [
  'linear-gradient(135deg, #141F33 0%, #1a2b4a 50%, #2A5CFF 100%)',
  'linear-gradient(135deg, #0d1829 0%, #1a3bcc 50%, #4a7cff 100%)',
  'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
  'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
  'linear-gradient(135deg, #1a1a3e 0%, #2a4a7f 50%, #1a3bcc 100%)',
];

interface CoverflowGalleryProps {
  slides: CaseStudy[];
  onActiveChange?: (index: number) => void;
}

function cssTransition(t: any): { dur: number; ease: string } {
  const dur = t && typeof t.duration === 'number' ? t.duration : 0.6;
  let ease = 'cubic-bezier(0.22, 1, 0.36, 1)';
  const e = t?.ease;
  if (Array.isArray(e) && e.length === 4) {
    ease = `cubic-bezier(${e[0]}, ${e[1]}, ${e[2]}, ${e[3]})`;
  } else if (typeof e === 'string') {
    const map: Record<string, string> = {
      linear: 'linear', easeIn: 'ease-in', easeOut: 'ease-out', easeInOut: 'ease-in-out',
    };
    ease = map[e] || 'ease';
  }
  return { dur, ease };
}

export function CoverflowGallery({ slides, onActiveChange }: CoverflowGalleryProps) {
  const { locale } = useLocale();
  const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';
  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  const n = slides.length;
  const [active, setActive] = useState(0);

  useEffect(() => {
    setActive((a) => Math.max(0, Math.min(n - 1, a)));
  }, [n]);

  useEffect(() => {
    onActiveChange?.(active);
  }, [active, onActiveChange]);

  const transition = { type: 'tween' as const, duration: 0.6, delay: 2.5, ease: [0.22, 1, 0.36, 1] };
  const moveDur = typeof transition.duration === 'number' ? transition.duration : 0.6;
  const lockRef = useRef(false);

  const lock = useCallback(() => {
    lockRef.current = true;
    window.setTimeout(() => { lockRef.current = false; }, Math.max(50, moveDur * 1000));
  }, [moveDur]);

  const step = useCallback((dir: number) => {
    if (lockRef.current) return;
    lock();
    setActive((a) => (((a + dir) % n) + n) % n);
  }, [n, lock]);

  const handleCardClick = useCallback((i: number) => {
    if (lockRef.current) return;
    lock();
    setActive((a) => (i === a ? (a + 1) % n : i));
  }, [n, lock]);

  const onKeyDown = useCallback((e: React.KeyboardEvent) => {
    const isRtl = dir === 'rtl';
    if (e.key === 'ArrowRight') { e.preventDefault(); step(isRtl ? -1 : 1); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); step(isRtl ? 1 : -1); }
  }, [step, dir]);

  const loop = true;
  const { dur, ease } = cssTransition(transition);
  const transitionCss = `transform ${dur}s ${ease}, opacity ${dur}s ${ease}`;

  const rootStyle: CSSProperties = {
    position: 'relative',
    width: '100%',
    height: '100%',
    minWidth: 320,
    minHeight: 480,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    perspective: `${PERSPECTIVE}px`,
    overflow: 'hidden',
    outline: 'none',
  };

  return (
    <div
      style={rootStyle}
      tabIndex={0}
      role="group"
      aria-roledescription="carousel"
      onKeyDown={onKeyDown}
      dir={dir}
    >
      <div
        style={{
          position: 'relative',
          width: 560,
          height: 440,
          transformStyle: 'preserve-3d',
        }}
      >
        {slides.map((item, i) => {
          let rel = i - active;
          if (loop) {
            if (rel > n / 2) rel -= n;
            if (rel < -n / 2) rel += n;
          }
          const ax = Math.abs(rel);
          const visible = ax <= MAX_VISIBLE;
          const isActive = rel === 0;
          const sc = Math.max(0.4, 1 - ax * SCALE_STEP);
          const tx = rel * 210;
          const tz = -ax * DEPTH;
          const ry = -rel * 12;
          const rz = rel * 8;
          const dim = 0.6;

          const IconComponent = iconMap[item.iconName] || Briefcase;

          const cardStyle: CSSProperties = {
            position: 'absolute',
            left: '50%',
            top: '50%',
            width: 520,
            height: 400,
            borderRadius: 24,
            overflow: 'hidden',
            transformStyle: 'preserve-3d',
            transformOrigin: 'center center',
            transform: `translate(-50%, -50%) translateX(${tx}px) translateZ(${tz}px) rotateY(${ry}deg) rotateZ(${rz}deg) scale(${sc})`,
            transition: transitionCss,
            opacity: visible ? 1 : 0,
            cursor: isActive ? 'default' : 'pointer',
            pointerEvents: visible ? 'auto' : 'none',
          };

          return (
            <div
              key={item.slug}
              style={cardStyle}
              onClick={() => handleCardClick(i)}
              aria-label={item.title}
              aria-hidden={!visible}
            >
              {/* Gradient background */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: CARD_BG[i % CARD_BG.length],
                }}
              />

              {/* Decorative glow */}
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  width: 300,
                  height: 300,
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(42,92,255,0.15) 0%, transparent 70%)',
                  transform: 'translate(-50%, -50%)',
                  pointerEvents: 'none',
                }}
              />

              {/* Content */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '28px',
                }}
              >
                {/* Top: Industry + Location */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <span style={{
                      display: 'inline-block',
                      fontSize: 10,
                      fontWeight: 900,
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      color: '#2A5CFF',
                      background: 'rgba(42,92,255,0.15)',
                      padding: '4px 10px',
                      borderRadius: 999,
                    }}>
                      {item.industry}
                    </span>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      marginTop: 8,
                      opacity: 0.6,
                    }}>
                      <span style={{ fontSize: 16 }}>{item.flag}</span>
                      <span style={{
                        fontSize: 10,
                        fontWeight: 800,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        color: '#F8F9FB',
                      }}>
                        {item.location}
                      </span>
                    </div>
                  </div>

                  {/* Icon */}
                  <div style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(42,92,255,0.15)',
                    color: '#2A5CFF',
                    flexShrink: 0,
                  }}>
                    <IconComponent style={{ width: 24, height: 24, strokeWidth: 2 }} />
                  </div>
                </div>

                {/* Bottom: Title + Result + Link */}
                <div>
                  <h3 style={{
                    fontSize: 20,
                    fontWeight: 900,
                    lineHeight: '1.2em',
                    letterSpacing: '-0.02em',
                    color: '#F8F9FB',
                    marginBottom: 8,
                  }}>
                    {item.title}
                  </h3>
                  <p style={{
                    fontSize: 12,
                    fontWeight: 600,
                    lineHeight: '1.5em',
                    color: 'rgba(248,249,251,0.65)',
                    marginBottom: 16,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}>
                    {item.result}
                  </p>
                  <Link
                    href={`/case-studies/${item.slug}`}
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 8,
                      fontSize: 11,
                      fontWeight: 800,
                      letterSpacing: '0.05em',
                      color: '#2A5CFF',
                      textDecoration: 'none',
                      padding: '8px 18px',
                      borderRadius: 999,
                      border: '1.5px solid rgba(42,92,255,0.3)',
                      transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.background = 'rgba(42,92,255,0.15)';
                      (e.currentTarget as HTMLElement).style.borderColor = '#2A5CFF';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.background = 'transparent';
                      (e.currentTarget as HTMLElement).style.borderColor = 'rgba(42,92,255,0.3)';
                    }}
                  >
                    {t({ en: 'View Study', ar: 'عرض الدراسة' })}
                    <span style={{ fontSize: 14 }}>{dir === 'rtl' ? '←' : '→'}</span>
                  </Link>
                </div>
              </div>

              {/* Dim overlay for inactive cards */}
              {!isActive && (
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: '#000000',
                    opacity: dim,
                    transition: `opacity ${dur}s ${ease}`,
                    pointerEvents: 'none',
                  }}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Navigation arrows */}
      <button
        onClick={() => step(-1)}
        style={{
          position: 'absolute',
          left: 16,
          top: '50%',
          transform: 'translateY(-50%)',
          width: 44,
          height: 44,
          borderRadius: '50%',
          border: '1px solid rgba(20,31,51,0.1)',
          background: 'rgba(248,249,251,0.9)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          color: '#141F33',
          transition: 'all 0.2s ease',
          zIndex: 10,
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = '#141F33'; (e.currentTarget as HTMLElement).style.color = '#F8F9FB'; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(248,249,251,0.9)'; (e.currentTarget as HTMLElement).style.color = '#141F33'; }}
        aria-label={t({ en: 'Previous', ar: 'السابق' })}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points={dir === 'rtl' ? '9 18 15 12 9 6' : '15 18 9 12 15 6'} />
        </svg>
      </button>
      <button
        onClick={() => step(1)}
        style={{
          position: 'absolute',
          right: 16,
          top: '50%',
          transform: 'translateY(-50%)',
          width: 44,
          height: 44,
          borderRadius: '50%',
          border: '1px solid rgba(20,31,51,0.1)',
          background: 'rgba(248,249,251,0.9)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          color: '#141F33',
          transition: 'all 0.2s ease',
          zIndex: 10,
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = '#141F33'; (e.currentTarget as HTMLElement).style.color = '#F8F9FB'; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(248,249,251,0.9)'; (e.currentTarget as HTMLElement).style.color = '#141F33'; }}
        aria-label={t({ en: 'Next', ar: 'التالي' })}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points={dir === 'rtl' ? '9 18 15 12 9 6' : '15 18 9 12 15 6'} />
        </svg>
      </button>

      {/* Dots */}
      <div
        style={{
          position: 'absolute',
          bottom: 20,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: 8,
          zIndex: 10,
        }}
      >
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => { if (!lockRef.current) { lock(); setActive(i); } }}
            style={{
              width: i === active ? 24 : 8,
              height: 8,
              borderRadius: 999,
              border: 'none',
              background: i === active ? '#2A5CFF' : 'rgba(20,31,51,0.2)',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              padding: 0,
            }}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
