'use client';

import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react';
import { useLocale } from '../app/providers';
import { LanguageSwitcher } from './LanguageSwitcher';

const content = {
  en: {
    productTitle: 'Product',
    companyTitle: 'Company',
    legalTitle: 'Legal & Support',
    developerTitle: 'Developers',
    intro:
      'Secure, AI-powered operations for hospitality, clinics, and service teams. From guest intake to internal knowledge access, our platform helps teams respond faster and serve clients better.',
    productLinks: [
      { href: '/features', label: 'Features' },
      { href: '/industries', label: 'Industries' },
      { href: '/pricing', label: 'Pricing' },
      { href: '/how-it-works', label: 'How It Works' },
      { href: '/marketplace', label: 'Marketplace' },
    ],
    companyLinks: [
      { href: '/about', label: 'About SAQYN RABT' },
      { href: '/case-studies', label: 'Case Studies' },
      { href: '/global', label: 'Global Presence' },
      { href: '/changelog', label: 'Changelog' },
      { href: '/faq', label: 'FAQ' },
      { href: '/contact', label: 'Contact' },
    ],
    legalLinks: [
      { href: '/privacy-policy', label: 'Privacy Policy' },
      { href: '/terms-and-conditions', label: 'Terms & Conditions' },
      { href: '/cookie-policy', label: 'Cookie Policy' },
      { href: '/help/getting-started', label: 'Help Center' },
    ],
    developerLinks: [
      { href: '/developers', label: 'Developer Portal' },
      { href: '/developers/api-docs', label: 'API Documentation' },
      { href: '/developers/plugins', label: 'Plugins' },
      { href: '/developers/cli', label: 'CLI Reference' },
    ],
    newsletter: 'Stay updated',
    newsletterDesc: 'Get product updates and industry insights.',
    emailPlaceholder: 'your@email.com',
    subscribe: 'Subscribe',
    subscribed: 'Subscribed!',
    footerNote: 'Secure, multilingual experiences for modern teams.',
    backToTop: 'Back to top',
  },
  ar: {
    productTitle: 'المنتج',
    companyTitle: 'الشركة',
    legalTitle: 'القانون والدعم',
    developerTitle: 'المطورين',
    intro:
      'عمليات آمنة ومُدارة بالذكاء الاصطناعي للفنادق والعيادات وفِرق الخدمات. من استقبال الزبائن إلى الوصول إلى المعرفة الداخلية، تساعد منصتنا الفرق على الاستجابة بسرعة أكبر وخدمة العملاء بشكل أفضل.',
    productLinks: [
      { href: '/features', label: 'الميزات' },
      { href: '/industries', label: 'الصناعات' },
      { href: '/pricing', label: 'الأسعار' },
      { href: '/how-it-works', label: 'كيف يعمل' },
      { href: '/marketplace', label: 'السوق' },
    ],
    companyLinks: [
      { href: '/about', label: 'عن الشركة' },
      { href: '/case-studies', label: 'دراسات الحالة' },
      { href: '/global', label: 'الوجود العالمي' },
      { href: '/changelog', label: 'سجل التغييرات' },
      { href: '/faq', label: 'الأسئلة الشائعة' },
      { href: '/contact', label: 'اتصل بنا' },
    ],
    legalLinks: [
      { href: '/privacy-policy', label: 'سياسة الخصوصية' },
      { href: '/terms-and-conditions', label: 'الشروط والأحكام' },
      { href: '/cookie-policy', label: 'سياسة ملفات تعريف الارتباط' },
      { href: '/help/getting-started', label: 'مركز المساعدة' },
    ],
    developerLinks: [
      { href: '/developers', label: 'بوابة المطورين' },
      { href: '/developers/api-docs', label: 'وثائق API' },
      { href: '/developers/plugins', label: 'الإضافات' },
      { href: '/developers/cli', label: 'مرجع سطر الأوامر' },
    ],
    newsletter: 'ابق على اطلاع',
    newsletterDesc: 'احصل على تحديثات المنتج ورؤى الصناعة.',
    emailPlaceholder: 'بريدك@الإلكتروني.com',
    subscribe: 'اشترك',
    subscribed: 'تم الاشتراك!',
    footerNote: 'تجارب آمنة متعددة اللغات للفرق الحديثة.',
    backToTop: 'العودة للأعلى',
  },
};

export function Footer() {
  const { locale } = useLocale();
  const copy = content[locale];
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    // In a real app, this would POST to an API
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <>
      <footer className="border-t border-gray-200/60 bg-white">
        {/* Newsletter Section */}
        <div className="border-b border-gray-100 bg-surface">
          <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <h3 className="text-lg font-bold text-navy">
                  {copy.newsletter}
                </h3>
                <p className="text-sm text-muted mt-1">
                  {copy.newsletterDesc}
                </p>
              </div>
              <form
                onSubmit={handleSubscribe}
                className="flex items-center gap-2 w-full md:w-auto"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={copy.emailPlaceholder}
                  className="min-h-[44px] rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-navy placeholder-slate-400 outline-none focus:border-royal focus:ring-2 focus:ring-royal/20 transition-all w-full md:w-64"
                  required
                />
                <button
                  type="submit"
                  disabled={subscribed}
                  className={`min-h-[44px] rounded-xl px-5 py-2.5 text-sm font-bold transition-all whitespace-nowrap ${
                    subscribed
                      ? 'bg-accent text-white'
                      : 'bg-navy text-white hover:bg-navy/90 hover:shadow-md'
                  }`}
                >
                  {subscribed ? copy.subscribed : copy.subscribe}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Main Footer Grid */}
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr_0.7fr_0.7fr_0.7fr]">
            {/* Brand Column */}
            <div className="max-w-sm">
              <Link href="/" className="inline-flex items-center gap-2 group">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-navy text-xs font-bold text-white">
                  S
                </div>
                <span className="text-sm font-bold tracking-[0.15em] text-navy group-hover:text-royal transition-colors">
                  SAQYN RABT
                </span>
              </Link>
              <p className="mt-4 text-sm leading-7 text-muted">
                {copy.intro}
              </p>
              <div className="mt-5">
                <LanguageSwitcher />
              </div>
            </div>

            {/* Product Column */}
            <div>
              <h3 className="text-xs font-extrabold uppercase tracking-widest text-navy mb-4">
                {copy.productTitle}
              </h3>
              <ul className="space-y-2.5">
                {copy.productLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted font-medium hover:text-navy transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Column */}
            <div>
              <h3 className="text-xs font-extrabold uppercase tracking-widest text-navy mb-4">
                {copy.companyTitle}
              </h3>
              <ul className="space-y-2.5">
                {copy.companyLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted font-medium hover:text-navy transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Column */}
            <div>
              <h3 className="text-xs font-extrabold uppercase tracking-widest text-navy mb-4">
                {copy.legalTitle}
              </h3>
              <ul className="space-y-2.5">
                {copy.legalLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted font-medium hover:text-navy transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Developer Column */}
            <div>
              <h3 className="text-xs font-extrabold uppercase tracking-widest text-navy mb-4">
                {copy.developerTitle}
              </h3>
              <ul className="space-y-2.5">
                {copy.developerLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted font-medium hover:text-navy transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-100">
          <div className="mx-auto max-w-7xl px-6 py-5 lg:px-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between text-sm text-muted">
              <span className="font-medium">
                © {new Date().getFullYear()} SAQYN RABT. All rights reserved.
              </span>
              <span className="font-medium">{copy.footerNote}</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          type="button"
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 rtl:right-auto rtl:left-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-navy text-white shadow-xl hover:shadow-2xl hover:bg-navy/90 hover:scale-110 transition-all animate-fadeIn"
          aria-label={copy.backToTop}
        >
          <svg
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              d="M5 15l7-7 7 7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}
    </>
  );
}
