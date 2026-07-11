'use client';

import * as React from 'react';
import Link from 'next/link';
import { useLocale } from '../app/providers';
import { FooterColumn } from './Footer/FooterColumn';
import { SocialLinks } from './Footer/SocialLinks';
import { MailIcon } from './ui/Icons';

const content = {
  en: {
    tagline: 'Connecting teams and automating workflows. Registered in the State of Qatar.',
    address: 'Doha, Qatar',
    dpoEmail: 'dpo@saqynrabt.com',
    productTitle: 'Product',
    companyTitle: 'Company',
    legalTitle: 'Legal & Compliance',
    privacyControls: 'Privacy Controls',
    cookiePrefs: 'Manage Cookie Preferences',
    doNotSell: 'Your Privacy Rights',
    accessibility: 'Accessibility',
    products: [
      { href: '/automation', label: 'Explore Business Automation' },
      { href: '/chatbot', label: 'See the Internal Chatbot' },
      { href: '/pricing', label: 'View Pricing Plans' },
      { href: '/industries', label: 'Browse by Industry' },
      { href: '/demo', label: 'Try the Dashboard Demo' },
    ],
    company: [
      { href: '/about', label: 'Learn About Us' },
      { href: '/contact', label: 'Talk to Sales' },
      { href: '/careers', label: 'Join Our Team' },
      { href: '/blog', label: 'Read Our Blog' },
    ],
    legal: [
      { href: '/legal/privacy', label: 'Our Privacy Policy' },
      { href: '/legal/terms', label: 'Terms of Service' },
      { href: '/legal/dpa', label: 'Data Processing Agreement (DPA)' },
      { href: '/legal/security', label: 'See Security Documents' },
      { href: '/legal/nda', label: 'Non-Disclosure Agreement' },
    ],
    backToTop: 'Back to Top',
  },
  ar: {
    tagline: 'ربط فرق العمل وتبسيط مسارات العمل. مسجلة في دولة قطر.',
    address: 'الدوحة، قطر',
    dpoEmail: 'dpo@saqynrabt.com',
    productTitle: 'المنتج',
    companyTitle: 'الشركة',
    legalTitle: 'القانون والامتثال',
    privacyControls: 'ضوابط الخصوصية',
    cookiePrefs: 'إدارة تفضيلات الكوكيز',
    doNotSell: 'حقوق الخصوصية الخاصة بك',
    accessibility: 'إمكانية الوصول',
    products: [
      { href: '/automation', label: 'استكشف الأتمتة التجارية' },
      { href: '/chatbot', label: 'شاهد المساعد الذكي' },
      { href: '/pricing', label: 'اطلع على الأسعار' },
      { href: '/industries', label: 'تصفح حسب القطاع' },
      { href: '/demo', label: 'جرّب العرض التوضيحي' },
    ],
    company: [
      { href: '/about', label: 'تعرف علينا' },
      { href: '/contact', label: 'تحدث مع المبيعات' },
      { href: '/careers', label: 'انضم إلى فريقنا' },
      { href: '/blog', label: 'اقرأ مدونتنا' },
    ],
    legal: [
      { href: '/legal/privacy', label: 'سياسة الخصوصية لدينا' },
      { href: '/legal/terms', label: 'شروط الخدمة' },
      { href: '/legal/dpa', label: 'اتفاقية معالجة البيانات' },
      { href: '/legal/security', label: 'اطلع على وثائق الأمان' },
      { href: '/legal/nda', label: 'اتفاقية عدم الإفصاح' },
    ],
    backToTop: 'العودة للأعلى',
  },
};

function Logo() {
  return (
    <svg width="120" height="32" viewBox="0 0 120 32" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="SAQYN RABT">
      <rect width="120" height="32" rx="4" fill="#141F33" />
      <text x="8" y="22" fontFamily="system-ui, sans-serif" fontSize="14" fontWeight="800" letterSpacing="1" fill="white">SAQYN</text>
      <text x="68" y="22" fontFamily="system-ui, sans-serif" fontSize="14" fontWeight="300" letterSpacing="1" fill="#94A3B8">RABT</text>
    </svg>
  );
}

export function Footer() {
  const { locale } = useLocale();
  const t = (en: string, ar: string) => (locale === 'ar' ? ar : en);
  const copy = content[locale];
  const year = new Date().getFullYear();
  const [cookiePrefsOpen, setCookiePrefsOpen] = React.useState(false);

  const handleCookiePrefs = () => {
    const banner = document.getElementById('cookie-consent-banner');
    if (banner) {
      banner.classList.remove('hidden');
      banner.classList.add('flex');
    }
  };

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const [incidentStatus, setIncidentStatus] = React.useState<{ status: string; activeIncidents: number } | null>(null);

  React.useEffect(() => {
    fetch('/api/admin/incidents/status')
      .then((r) => r.json())
      .then((d) => setIncidentStatus(d))
      .catch(() => setIncidentStatus({ status: 'all_operational', activeIncidents: 0 }));
  }, []);

  return (
    <footer className="bg-white text-slate-800 border-t border-gray-200" role="contentinfo" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      {/* Trust & Compliance Bar */}
      <div className="border-b border-gray-100 bg-slate-50/50">
        <div className="mx-auto max-w-7xl px-6 py-3 lg:px-8 flex flex-wrap items-center justify-between gap-3" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
          <div className="flex items-center gap-4 flex-wrap">
            <Link
              href="/trust"
              className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 hover:text-[#141F33] transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              Trust Center
            </Link>
            <span className="w-px h-4 bg-gray-200" />
            <span className="flex items-center gap-1 text-[11px] text-slate-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              GDPR Ready
            </span>
            <span className="flex items-center gap-1 text-[11px] text-slate-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              Qatar Law No.13 Compliant
            </span>
            <span className="flex items-center gap-1 text-[11px] text-slate-400/80">
              ⟳ ISO 27001 In Progress
            </span>
          </div>
          <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-500">
            {incidentStatus?.status === 'all_operational' ? (
              <span className="flex items-center gap-1.5 text-emerald-600">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                All systems operational
              </span>
            ) : (
              <span className="flex items-center gap-1.5 text-amber-600">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                Incident response active ({incidentStatus?.activeIncidents || 0})
              </span>
            )}
          </div>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'SAQYN RABT',
            url: 'https://saqynrabt.com',
            logo: 'https://saqynrabt.com/logo.png',
            description: 'Connecting teams and automating workflows. Registered in the State of Qatar.',
            address: { '@type': 'PostalAddress', addressLocality: 'Doha', addressCountry: 'QA' },
            contactPoint: [
              { '@type': 'ContactPoint', telephone: '+974-XXXX-XXXX', contactType: 'sales', email: 'hello@saqynrabt.com' },
              { '@type': 'ContactPoint', contactType: 'DPO', email: 'dpo@saqynrabt.com' },
            ],
            sameAs: [
              'https://www.instagram.com/saqynrabt',
              'https://www.facebook.com/share/1BNzmp2vXB/',
              'https://x.com/saqynrabt',
              'https://www.threads.com/@saqynrabt',
              'https://www.tiktok.com/@saqyn.rabt',
              'https://www.linkedin.com/company/saqynrabt/',
              'https://youtube.com/@saqynrabt',
            ],
          }),
        }}
      />

      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 lg:gap-8">
          {/* Column 1: Brand & Trust Mark */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="inline-block" aria-label="SAQYN RABT Home">
              <Logo />
            </Link>
            <p className="text-xs text-slate-500 font-semibold leading-relaxed">
              {copy.tagline}
            </p>
            <div className="text-[11px] text-slate-400 font-semibold space-y-1">
              <p>{copy.address}</p>
              <p>
                DPO:{' '}
                <a href="mailto:dpo@saqynrabt.com" className="text-slate-500 hover:text-[#141F33] hover:underline">
                  {copy.dpoEmail}
                </a>
              </p>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 bg-slate-50 w-fit">
              <MailIcon className="w-3 h-3 text-slate-400" />
              <span className="text-[9px] font-black uppercase tracking-wider text-slate-400">DPO</span>
              <a
                href="mailto:dpo@saqynrabt.com"
                className="text-[11px] font-extrabold text-slate-700 hover:text-[#141F33] hover:underline"
              >
                dpo@saqynrabt.com
              </a>
            </div>
          </div>

          {/* Column 2: Legal & Compliance */}
          <FooterColumn title={copy.legalTitle} links={copy.legal} />

          {/* Column 3: Product & Platform */}
          <FooterColumn title={copy.productTitle} links={copy.products} />

          {/* Column 4: Company & Social */}
          <FooterColumn title={copy.companyTitle} links={copy.company} />

          {/* Column 5: Legal Utility Console */}
          <div className="flex flex-col gap-4">
            <h3 className="text-[11px] font-black uppercase tracking-widest text-slate-400">
              {copy.privacyControls}
            </h3>
            <ul className="flex flex-col gap-3">
              <li>
                <button
                  type="button"
                  onClick={handleCookiePrefs}
                  className="text-[11px] font-extrabold uppercase tracking-wider text-slate-700 hover:text-[#141F33] transition-colors text-left"
                >
                  {copy.cookiePrefs}
                </button>
              </li>
              <li>
                <Link
                  href="/legal/privacy#do-not-sell"
                  className="text-[11px] font-extrabold uppercase tracking-wider text-slate-700 hover:text-[#141F33] transition-colors block"
                >
                  {copy.doNotSell}
                </Link>
              </li>
              <li>
                <Link
                  href="/accessibility"
                  className="text-[11px] font-extrabold uppercase tracking-wider text-slate-700 hover:text-[#141F33] transition-colors block"
                >
                  {copy.accessibility}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-100 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold text-slate-400">
          <p className="uppercase tracking-wider">
            © {year} SAQYN RABT. ALL RIGHTS RESERVED. LICENSED UNDER QATAR LAW NO. 13 OF 2016.
          </p>

          <div className="flex items-center gap-3 flex-wrap justify-center uppercase tracking-wider">
            <Link href="/sitemap" className="hover:text-[#141F33] transition-colors">{t('Site Map', 'خريطة الموقع')}</Link>
            <span>|</span>
            <Link href="/legal/terms" className="hover:text-[#141F33] transition-colors">{t('Terms', 'الشروط')}</Link>
            <span>|</span>
            <Link href="/legal/privacy" className="hover:text-[#141F33] transition-colors">{t('Privacy', 'سياسة الخصوصية')}</Link>
            <span>|</span>
            <Link href="/trust" className="hover:text-[#141F33] transition-colors">{t('Trust Center', 'مركز الثقة')}</Link>
          </div>

          <SocialLinks />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
