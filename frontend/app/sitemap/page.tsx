'use client';

import React from 'react';
import Link from 'next/link';
import { useLocale } from '../providers';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';

export default function VisualSitemapPage() {
  const { locale } = useLocale();
  const t = (en: string, ar: string) => locale === 'ar' ? (ar || en) : en;

  const columns = [
    {
      title: t('SAQYN RABT', 'سقن ربط'),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="text-[#141F33]" viewBox="0 0 256 256">
          <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm48-88a8,8,0,0,1-8,8H136v32a8,8,0,0,1-16,0V136H96a8,8,0,0,1,0-16h24V88a8,8,0,0,1,16,0v32h24A8,8,0,0,1,176,128Z" />
        </svg>
      ),
      links: [
        { href: '/about', label: t('About Us', 'عنا') },
        { href: '/contact', label: t('Contact Sales', 'اتصل بالمبيعات') },
        { href: '/trust', label: t('Trust Center', 'مركز الثقة') },
        { href: '/faq', label: t('FAQ', 'الأسئلة الشائعة') },
        { href: '/changelog', label: t('Changelog', 'سجل التغييرات') },
        { href: '/sitemap', label: t('Sitemap', 'خريطة الموقع') },
      ],
    },
    {
      title: t('PRODUCTS & PLATFORM', 'المنتجات والمنصة'),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="text-[#141F33]" viewBox="0 0 256 256">
          <path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,160H40V56H216V200Zm-96-88a12,12,0,1,1-12-12A12,12,0,0,1,120,112Zm48,0a12,12,0,1,1-12-12A12,12,0,0,1,168,112Z" />
        </svg>
      ),
      links: [
        { href: '/automation', label: t('Business Automation', 'أتمتة الأعمال') },
        { href: '/chatbot', label: t('Internal Chatbot', 'المساعد الذكي الداخلي') },
        { href: '/pricing', label: t('Pricing Plans', 'خطط الأسعار') },
        { href: '/industries', label: t('Industry Switcher', 'مبدل القطاعات') },
        { href: '/features', label: t('Features', 'المميزات') },
        { href: '/how-it-works', label: t('How It Works', 'كيف يعمل') },
        { href: '/case-studies', label: t('Case Studies', 'دراسات حالة') },
        { href: '/global', label: t('Global', 'عالمي') },
        { href: '/marketplace', label: t('Marketplace', 'السوق') },
      ],
    },
    {
      title: t('RESOURCES & DEVELOPERS', 'المصادر والمطورين'),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="text-[#141F33]" viewBox="0 0 256 256">
          <path d="M228,128a12,12,0,0,1-12,12H140v76a12,12,0,0,1-24,0V140H40a12,12,0,0,1,0-24h76V40a12,12,0,0,1,24,0v76h76A12,12,0,0,1,228,128Z" />
        </svg>
      ),
      links: [
        { href: '/developers', label: t('Developers', 'المطورون') },
        { href: '/developers/api-docs', label: t('API Docs', 'وثائق API') },
        { href: '/developers/cli', label: t('CLI Tool', 'أداة CLI') },
        { href: '/developers/plugins', label: t('Plugins', 'الإضافات') },
        { href: '/help/getting-started', label: t('Getting Started', 'بدء الاستخدام') },
        { href: '/help/automation', label: t('Automation Guide', 'دليل الأتمتة') },
        { href: '/help/chatbot', label: t('Chatbot Guide', 'دليل المساعد الذكي') },
        { href: '/help/billing', label: t('Billing Guide', 'دليل الفوترة') },
      ],
    },
    {
      title: t('LEGAL & COMPLIANCE', 'القانون والامتثال'),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="text-[#141F33]" viewBox="0 0 256 256">
          <path d="M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32Zm0,176H48V48H208V208ZM180,96a12,12,0,1,1-12-12A12,12,0,0,1,180,96Z" />
        </svg>
      ),
      links: [
        { href: '/privacy-policy', label: t('Privacy Policy', 'سياسة الخصوصية') },
        { href: '/terms-and-conditions', label: t('Terms of Service', 'شروط الخدمة') },
        { href: '/cookie-policy', label: t('Cookie Policy', 'سياسة الكوكيز') },
        { href: '/trust', label: t('Trust Center', 'مركز الثقة') },
      ],
    },
  ];

  return (
    <div className="bg-[#F8F9FB] text-[#141F33] min-h-screen flex flex-col font-sans selection:bg-[#2A5CFF]/10" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <Header />
      <main className="flex-1 mx-auto max-w-7xl px-6 py-20 lg:px-8 w-full">
        {/* Back Link */}
        <Link
          href="/"
          className="group inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-wider text-[#141F33]/40 hover:text-[#141F33] transition-colors mb-12"
        >
          <span className="transition-transform group-hover:-translate-x-1 duration-150 inline-block">
            {locale === 'ar' ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
          </span>
          {t('Back to Home', 'العودة للرئيسية')}
        </Link>

        {/* Brand Sitemap Title Section */}
        <div className="mb-20">
          <h1 className="text-5xl md:text-7xl font-black tracking-tight select-none">
            <span className="text-[#141F33]">SAQYN</span>
            <span className="text-[#141F33]/20 ml-1">MAP</span>
          </h1>
          <p className="text-[10px] md:text-xs font-black uppercase tracking-widest text-[#141F33]/40 mt-4 leading-none">
            {t('SAQYN RABT SITEMAP — COMPLETE DIRECTORY OF PAGES & SERVICES', 'خريطة موقع سقن ربط - دليل كامل بالصفحات والخدمات')}
          </p>
        </div>

        {/* Directory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8 lg:gap-12">
          {columns.map((col, index) => (
            <div key={index} className="flex flex-col gap-6">
              {/* Header Title with icon */}
              <div className="flex items-center gap-2 pb-4 border-b border-[rgba(20,31,51,0.08)]">
                {col.icon}
                <h3 className="text-[11px] font-black uppercase tracking-widest text-[#141F33]">
                  {col.title}
                </h3>
              </div>

              {/* Link items */}
              <ul className="flex flex-col gap-3.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-xs font-bold text-[#141F33]/60 hover:text-[#141F33] hover:underline transition-all block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}