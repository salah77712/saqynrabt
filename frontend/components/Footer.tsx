'use client';

import Link from 'next/link';
import { useLocale } from '../app/providers';
import { LanguageSwitcher } from './LanguageSwitcher';

const content = {
  en: {
    productTitle: 'Product',
    companyTitle: 'Company',
    legalTitle: 'Legal & Support',
    intro: 'Secure, AI-powered operations for hospitality, clinics, and service teams. From guest intake to internal knowledge access, our platform helps teams respond faster and serve clients better.',
    productLinks: [
      { href: '/automation', label: 'Automation' },
      { href: '/chatbot', label: 'Chatbot' },
      { href: '/features', label: 'Features' },
      { href: '/industries', label: 'Industries' },
    ],
    companyLinks: [
      { href: '/', label: 'Home' },
      { href: '/how-it-works', label: 'How It Works' },
      { href: '/pricing', label: 'Pricing' },
      { href: '/case-studies', label: 'Case Studies' },
      { href: '/about', label: 'About SAQYN RABT' },
      { href: '/global', label: 'Global Presence' },
      { href: '/faq', label: 'FAQ' },
      { href: '/contact', label: 'Contact' },
    ],
    legalLinks: [
      { href: '/privacy-policy', label: 'Privacy Policy' },
      { href: '/terms-and-conditions', label: 'Terms & Conditions' },
      { href: '/cookie-policy', label: 'Cookie Policy' },
    ],
    footerNote: 'Secure, multilingual experiences for modern teams.',
  },
  ar: {
    productTitle: 'المنتج',
    companyTitle: 'الشركة',
    legalTitle: 'القانون والدعم',
    intro: 'عمليات آمنة ومُدارة بالذكاء الاصطناعي للفنادق والعيادات وفِرق الخدمات. من استقبال الزبائن إلى الوصول إلى المعرفة الداخلية، تساعد منصتنا الفرق على الاستجابة بسرعة أكبر وخدمة العملاء بشكل أفضل.',
    productLinks: [
      { href: '/automation', label: 'الأتمتة' },
      { href: '/chatbot', label: 'المساعد الذكي' },
      { href: '/features', label: 'الميزات' },
      { href: '/industries', label: 'الصناعات' },
    ],
    companyLinks: [
      { href: '/', label: 'الرئيسية' },
      { href: '/how-it-works', label: 'كيف يعمل' },
      { href: '/pricing', label: 'الأسعار' },
      { href: '/case-studies', label: 'دراسات الحالة' },
      { href: '/about', label: 'عن الشركة' },
      { href: '/global', label: 'الوجود العالمي' },
      { href: '/faq', label: 'الأسئلة الشائعة' },
      { href: '/contact', label: 'اتصل بنا' },
    ],
    legalLinks: [
      { href: '/privacy-policy', label: 'سياسة الخصوصية' },
      { href: '/terms-and-conditions', label: 'الشروط والأحكام' },
      { href: '/cookie-policy', label: 'سياسة ملفات تعريف الارتباط' },
    ],
    footerNote: 'تجارب آمنة متعددة اللغات للفرق الحديثة.',
  },
};

export function Footer() {
  const { locale } = useLocale();
  const copy = content[locale];

  return (
    <footer className="border-t border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr]">
          <div className="max-w-md">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">SAQYN RABT</p>
            <p className="mt-3 text-sm leading-7 text-slate-600">{copy.intro}</p>
            <div className="mt-5">
              <LanguageSwitcher />
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900">{copy.productTitle}</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              {copy.productLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition-colors hover:text-primary">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900">{copy.companyTitle}</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              {copy.companyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition-colors hover:text-primary">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900">{copy.legalTitle}</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              {copy.legalLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition-colors hover:text-primary">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-200 pt-4 text-sm text-slate-500">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <span>© {new Date().getFullYear()} SAQYN RABT. All rights reserved.</span>
            <span>{copy.footerNote}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
