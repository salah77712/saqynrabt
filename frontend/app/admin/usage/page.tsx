'use client';

import React from 'react';
import { useLocale } from '../../providers';

export default function AdminUsagePage() {
  const { locale } = useLocale();
  const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';

  const cards = [
    { title: t({ en: 'Total Active Tenants', ar: 'إجمالي الشركات النشطة' }), value: '184', change: '+12%', color: 'text-[#2A5CFF] bg-[#F8F9FB]' },
    { title: t({ en: 'Daily Chat Requests', ar: 'طلبات المحادثة اليومية' }), value: '8,402', change: '+18%', color: 'text-[#2A5CFF] bg-[#F8F9FB]' },
    { title: t({ en: 'Daily Voice Minutes', ar: 'دقائق الصوت اليومية' }), value: '3,892', change: '+5%', color: 'text-[#2A5CFF] bg-[#F8F9FB]' },
    { title: t({ en: 'Average Text API Loads', ar: 'متوسط استهلاك النصوص' }), value: '420', change: '-2%', color: 'text-[#2A5CFF] bg-[#F8F9FB]' },
  ];

  // Last 7 days usage data points (for SVG Chart)
  const chartData = [
    { day: 'Sun', value: 120 },
    { day: 'Mon', value: 250 },
    { day: 'Tue', value: 190 },
    { day: 'Wed', value: 380 },
    { day: 'Thu', value: 310 },
    { day: 'Fri', value: 450 },
    { day: 'Sat', value: 410 },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Page Header */}
      <div>
        <h1 className="text-xl font-extrabold text-[#141F33]">{t({ en: 'Live Platform Usage & Telemetry', ar: 'استهلاك المنصة وقياس العمليات' })}</h1>
        <p className="text-xs text-[#141F33] font-medium mt-0.5">{t({ en: 'Track system API loads, active voice channels, and monthly trends.', ar: 'تتبع أحمال واجهة برمجة التطبيقات، قنوات الصوت، والاتجاهات الشهرية.' })}</p>
      </div>

      {/* Grid Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, idx) => (
          <div key={idx} className="bg-[#F8F9FB] border border-[#141F33]/10 rounded-2xl p-6 shadow-sm">
            <p className="text-[10px] font-extrabold uppercase text-[#141F33] tracking-wider">{card.title}</p>
            <div className="flex items-baseline justify-between mt-3">
              <span className="text-2xl font-black text-[#141F33]">{card.value}</span>
              <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                <code>card.change.startsWith('+') ? 'bg-[#F8F9FB] text-[#2A5CFF]' : 'bg-[#F8F9FB] text-[#141F33]'</code>
              }`}>
                {card.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Premium SVG/CSS Line Chart */}
      <div className="bg-[#F8F9FB] border border-[#141F33]/10 rounded-2xl p-6 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-sm font-extrabold text-[#141F33]">{t({ en: '7-Day Platform Request Load', ar: 'أحمال طلبات المنصة خلال 7 أيام' })}</h3>
          <span className="text-[10px] font-bold text-[#2A5CFF]">{t({ en: 'Updated 2 min ago', ar: 'تم التحديث منذ دقيقتين' })}</span>
        </div>

        {/* SVG Vector Graph */}
        <div className="relative w-full h-64 border-b border-l border-[#141F33]/10 flex items-end">
          
          <svg className="absolute inset-0 w-full h-full p-4" viewBox="0 0 700 200" preserveAspectRatio="none">
            {/* Background Grid Lines */}
<line x1="0" y1="50" x2="700" y2="50" stroke="#F8F9FB" strokeWidth="1" />
<line x1="0" y1="100" x2="700" y2="100" stroke="#F8F9FB" strokeWidth="1" />
<line x1="0" y1="150" x2="700" y2="150" stroke="#F8F9FB" strokeWidth="1" />

            {/* Smooth Spline Vector Curve path */}
            <path
              d="M 50 160 C 120 120, 180 140, 250 80 C 320 100, 380 40, 450 60 C 520 20, 580 40, 650 30"
              fill="none"
              stroke="#2A5CFF"
              strokeWidth="4"
              strokeLinecap="round"
            />

            {/* Dot markers at key data joints */}
            <circle cx="50" cy="160" r="5" fill="#2A5CFF" />
            <circle cx="250" cy="80" r="5" fill="#2A5CFF" />
            <circle cx="450" cy="60" r="5" fill="#2A5CFF" />
            <circle cx="650" cy="30" r="5" fill="#2A5CFF" />
          </svg>

          {/* X Axis Labels */}
          <div className="absolute inset-x-0 bottom-0 flex justify-between px-6 transform translate-y-6 text-[10px] font-extrabold text-[#141F33] uppercase tracking-widest">
            {chartData.map((d, idx) => (
              <span key={idx}>{d.day}</span>
            ))}
          </div>

        </div>
      </div>

    </div>
  );
}
