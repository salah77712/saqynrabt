'use client';

import * as React from 'react';
import Link from 'next/link';
import { useLocale } from '../app/providers';
import { FooterColumn } from './Footer/FooterColumn';
import { SocialLinks } from './Footer/SocialLinks';

const content = {
  en: {
    tagline: 'Private AI operations for your front-desk and team.',
    productTitle: 'Product',
    companyTitle: 'Company',
    legalTitle: 'Legal & Support',
    newsletterTitle: 'Newsletter',
    newsletterDesc: 'Get product updates and industry insights.',
    placeholder: 'your@email.com',
    subscribe: 'Subscribe',
    backToTop: 'Back to Top',
    products: [
      { href: '/automation', label: 'Automation' },
      { href: '/chatbot', label: 'Chatbot' },
      { href: '/features', label: 'Features' },
      { href: '/pricing', label: 'Pricing' },
    ],
    company: [
      { href: '/about', label: 'About Us' },
      { href: '/contact', label: 'Contact' },
      { href: '/case-studies', label: 'Case Studies' },
      { href: '/global', label: 'Global Presence' },
    ],
    legal: [
      { href: '/privacy-policy', label: 'Privacy Policy' },
      { href: '/terms-and-conditions', label: 'Terms of Service' },
      { href: '/cookie-policy', label: 'Cookie Policy' },
      { href: '/help/getting-started', label: 'Help Center' },
    ],
  },
  ar: {
    tagline: 'عمليات ذكاء اصطناعي خاصة لمكتب الاستقبال وفريق العمل.',
    productTitle: 'المنتج',
    companyTitle: 'الشركة',
    legalTitle: 'القانون والدعم',
    newsletterTitle: 'النشرة البريدية',
    newsletterDesc: 'احصل على تحديثات المنتج ورؤى الصناعة.',
    placeholder: 'بريدك@الإلكتروني.com',
    subscribe: 'اشتراك',
    backToTop: 'العودة للأعلى',
    products: [
      { href: '/automation', label: 'الأتمتة' },
      { href: '/chatbot', label: 'المساعد الذكي' },
      { href: '/features', label: 'الميزات' },
      { href: '/pricing', label: 'الأسعار' },
    ],
    company: [
      { href: '/about', label: 'عن الشركة' },
      { href: '/contact', label: 'اتصل بنا' },
      { href: '/case-studies', label: 'دراسات الحالة' },
      { href: '/global', label: 'الوجود العالمي' },
    ],
    legal: [
      { href: '/privacy-policy', label: 'سياسة الخصوصية' },
      { href: '/terms-and-conditions', label: 'الشروط والأحكام' },
      { href: '/cookie-policy', label: 'سياسة الكوكيز' },
      { href: '/help/getting-started', label: 'مركز المساعدة' },
    ],
  },
};

export function Footer() {
  const { locale } = useLocale();
  const copy = content[locale];
  const [year, setYear] = React.useState('');

  React.useEffect(() => {
    setYear(new Date().getFullYear().toString());
  }, []);

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#141F33] text-white py-16 border-t border-white/10" role="contentinfo">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-5 md:gap-8">
          {/* Brand block */}
          <div className="flex flex-col gap-4 max-w-xs">
            <Link href="/" className="text-xl font-extrabold tracking-tight select-none">
              SAQYN RABT
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">{copy.tagline}</p>
            <SocialLinks />
          </div>

          {/* Dynamic Columns */}
          <FooterColumn title={copy.productTitle} links={copy.products} />
          <FooterColumn title={copy.companyTitle} links={copy.company} />
          <FooterColumn title={copy.legalTitle} links={copy.legal} />

          {/* Newsletter block */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-300">
              {copy.newsletterTitle}
            </h3>
            <p className="text-sm text-slate-400">{copy.newsletterDesc}</p>
            <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-2 mt-2">
              <input
                type="email"
                placeholder={copy.placeholder}
                className="min-h-[44px] rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs text-white placeholder-slate-500 outline-none focus:border-royal w-full"
                required
              />
              <button
                type="submit"
                className="min-h-[44px] rounded-xl bg-royal text-white font-bold text-xs px-4 py-2.5 transition-all hover:bg-royal/90"
              >
                {copy.subscribe}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400">
          <p>© {year} SAQYN RABT. All rights reserved.</p>
          <button
            onClick={handleBackToTop}
            className="flex items-center gap-2 hover:text-white transition-colors"
          >
            {copy.backToTop} ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
