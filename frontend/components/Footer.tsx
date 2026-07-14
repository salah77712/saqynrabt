'use client';

import * as React from 'react';
import Link from 'next/link';
import { useLocale } from '../app/providers';
import { FooterColumn } from './Footer/FooterColumn';
import { SocialLinks } from './Footer/SocialLinks';
import { Mail } from 'lucide-react';

const content = {
  en: {
    tagline: 'AI-powered operations for front desks and teams worldwide.',
    address: 'Global Operations',
    dpoEmail: 'saqynrabt@gmail.com',
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
      { href: '/how-it-works', label: 'How It Works' },
      { href: '/case-studies', label: 'Case Studies' },
      { href: '/pricing', label: 'View Pricing Plans' },
    ],
    company: [
      { href: '/about', label: 'Learn About Us' },
      { href: '/contact', label: 'Talk to Us' },
      { href: '/help/getting-started', label: 'Help Center' },
      { href: '/faq', label: 'FAQ' },
    ],
    legal: [
      { href: '/privacy-policy', label: 'Privacy Policy' },
      { href: '/terms-and-conditions', label: 'Terms of Service' },
      { href: '/cookie-policy', label: 'Cookie Policy' },
      { href: '/trust', label: 'Trust Center' },
    ],
    backToTop: 'Back to Top',
  },
  fr: {
    tagline: "Opérations alimentées par l'IA pour les bureaux d'accueil et les équipes dans le monde entier.",
    address: 'Opérations Mondiales',
    dpoEmail: 'saqynrabt@gmail.com',
    productTitle: 'Produit',
    companyTitle: 'Entreprise',
    legalTitle: 'Juridique et Conformité',
    privacyControls: 'Contrôles de Confidentialité',
    cookiePrefs: 'Gérer les Préférences de Cookies',
    doNotSell: 'Vos Droits à la Confidentialité',
    accessibility: 'Accessibilité',
    products: [
      { href: '/automation', label: 'Explorer l\'Automatisation' },
      { href: '/chatbot', label: 'Voir le Chatbot Interne' },
      { href: '/how-it-works', label: 'Comment ça Marche' },
      { href: '/case-studies', label: 'Études de Cas' },
      { href: '/pricing', label: 'Voir les Tarifs' },
    ],
    company: [
      { href: '/about', label: 'À Propos' },
      { href: '/contact', label: 'Contactez-nous' },
      { href: '/help/getting-started', label: 'Centre d\'Aide' },
      { href: '/faq', label: 'FAQ' },
    ],
    legal: [
      { href: '/privacy-policy', label: 'Politique de Confidentialité' },
      { href: '/terms-and-conditions', label: "Conditions d'Utilisation" },
      { href: '/cookie-policy', label: 'Politique de Cookies' },
      { href: '/trust', label: 'Centre de Confiance' },
    ],
    backToTop: 'Retour en Haut',
  },
  ar: {
    tagline: 'عمليات مدعومة بالذكاء الاصطناعي لمكاتب الاستقبال والفرق في جميع أنحاء العالم.',
    address: 'عمليات عالمية',
    dpoEmail: 'saqynrabt@gmail.com',
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
      { href: '/how-it-works', label: 'كيف يعمل' },
      { href: '/case-studies', label: 'دراسات الحالة' },
      { href: '/pricing', label: 'اطلع على الأسعار' },
    ],
    company: [
      { href: '/about', label: 'تعرف علينا' },
      { href: '/contact', label: 'تحدث معنا' },
      { href: '/help/getting-started', label: 'مركز المساعدة' },
      { href: '/faq', label: 'الأسئلة الشائعة' },
    ],
    legal: [
      { href: '/privacy-policy', label: 'سياسة الخصوصية' },
      { href: '/terms-and-conditions', label: 'شروط الخدمة' },
      { href: '/cookie-policy', label: 'سياسة الكوكيز' },
      { href: '/trust', label: 'مركز الثقة' },
    ],
    backToTop: 'العودة للأعلى',
  },
  hi: {
    tagline: 'दुनिया भर में फ्रंट डेस्क और टीमों के लिए AI-संचालित संचालन।',
    address: 'वैश्विक संचालन',
    dpoEmail: 'saqynrabt@gmail.com',
    productTitle: 'उत्पाद',
    companyTitle: 'कंपनी',
    legalTitle: 'कानूनी और अनुपालन',
    privacyControls: 'गोपनीयता नियंत्रण',
    cookiePrefs: 'कुकी प्राथमिकताएँ प्रबंधित करें',
    doNotSell: 'आपके गोपनीयता अधिकार',
    accessibility: 'अभिगम्यता',
    products: [
      { href: '/automation', label: 'व्यावसायिक ऑटोमेशन देखें' },
      { href: '/chatbot', label: 'आंतरिक चैटबॉट देखें' },
      { href: '/how-it-works', label: 'यह कैसे काम करता है' },
      { href: '/case-studies', label: 'केस स्टडीज' },
      { href: '/pricing', label: 'मूल्य योजनाएँ देखें' },
    ],
    company: [
      { href: '/about', label: 'हमारे बारे में जानें' },
      { href: '/contact', label: 'हमसे बात करें' },
      { href: '/help/getting-started', label: 'सहायता केंद्र' },
      { href: '/faq', label: 'अक्सर पूछे जाने वाले प्रश्न' },
    ],
    legal: [
      { href: '/privacy-policy', label: 'गोपनीयता नीति' },
      { href: '/terms-and-conditions', label: 'सेवा की शर्तें' },
      { href: '/cookie-policy', label: 'कुकी नीति' },
      { href: '/trust', label: 'विश्वास केंद्र' },
    ],
    backToTop: 'शीर्ष पर वापस जाएँ',
  },
};

function Logo() {
  return (
    <svg width="120" height="32" viewBox="0 0 120 32" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="SAQYN RABT">
      <rect width="120" height="32" rx="4" className="fill-navy" />
      <text x="8" y="22" fontFamily="system-ui, sans-serif" fontSize="14" fontWeight="800" letterSpacing="1" fill="white">SAQYN</text>
      <text x="68" y="22" fontFamily="system-ui, sans-serif" fontSize="14" fontWeight="300" letterSpacing="1" className="fill-slate-400">RABT</text>
    </svg>
  );
}

export function Footer() {
  const { locale } = useLocale();
  const t = (en: string, fr: string, ar: string, hi: string) => {
    if (locale === 'ar') return ar || en;
    if (locale === 'fr') return fr || en;
    if (locale === 'hi') return hi || en;
    return en;
  };
  const copy = content[locale] || content.en;
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
              className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 hover:text-navy transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              Trust Center
            </Link>
            <span className="w-px h-4 bg-gray-200" />
            <span className="flex items-center gap-1 text-[11px] text-slate-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" className="stroke-[#2A5CFF]" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              GDPR Ready
            </span>
            <span className="flex items-center gap-1 text-[11px] text-slate-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" className="stroke-[#2A5CFF]" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              Global Compliance Ready
            </span>
            <span className="flex items-center gap-1 text-[11px] text-slate-400/80">
              ⟳ ISO 27001 In Progress
            </span>
          </div>
          <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-500">
            {incidentStatus?.status === 'all_operational' ? (
              <span className="flex items-center gap-1.5 text-[#2A5CFF]">
                <span className="w-2 h-2 rounded-full bg-[#2A5CFF]" />
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
            description: 'AI-powered operations for front desks and teams worldwide.',
            address: { '@type': 'PostalAddress', addressLocality: 'Global', addressCountry: 'US' },
            contactPoint: [
              { '@type': 'ContactPoint', telephone: '+974-XXXX-XXXX', contactType: 'sales', email: 'saqynrabt@gmail.com' },
              { '@type': 'ContactPoint', contactType: 'DPO', email: 'saqynrabt@gmail.com' },
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
            <div className="flex items-center gap-2 text-[11px] text-slate-400 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2A5CFF] shrink-0" />
              <p>{copy.address}</p>
            </div>
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-royal/30 bg-royal/10 w-full shadow-sm hover:shadow-md hover:border-royal/50 transition-all duration-200">
              <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-royal/20 text-royal shrink-0">
                <Mail className="w-4 h-4" aria-hidden="true" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[9px] font-black uppercase tracking-widest text-royal">DPO Contact</span>
                <a
                  href="mailto:saqynrabt@gmail.com"
                  className="text-[12px] font-extrabold text-slate-800 hover:text-royal hover:underline truncate transition-colors"
                >
                  saqynrabt@gmail.com
                </a>
              </div>
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
                  className="text-[11px] font-extrabold uppercase tracking-wider text-slate-700 hover:text-navy transition-colors text-left"
                >
                  {copy.cookiePrefs}
                </button>
              </li>
              <li>
                <Link
                  href="/privacy-policy#do-not-sell"
                  className="text-[11px] font-extrabold uppercase tracking-wider text-slate-700 hover:text-navy transition-colors block"
                >
                  {copy.doNotSell}
                </Link>
              </li>
              <li>
                <Link
                  href="/help/getting-started"
                  className="text-[11px] font-extrabold uppercase tracking-wider text-slate-700 hover:text-navy transition-colors block"
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
            © {year} SAQYN RABT. ALL RIGHTS RESERVED.
          </p>

          <div className="flex items-center gap-3 flex-wrap justify-center uppercase tracking-wider">
            <Link href="/sitemap" className="hover:text-navy transition-colors">{t('Site Map', 'Plan du Site', 'خريطة الموقع', 'साइट मैप')}</Link>
            <span>|</span>
            <Link href="/terms-and-conditions" className="hover:text-navy transition-colors">{t('Terms', 'Conditions', 'الشروط', 'शर्तें')}</Link>
            <span>|</span>
            <Link href="/privacy-policy" className="hover:text-navy transition-colors">{t('Privacy', 'Confidentialité', 'سياسة الخصوصية', 'गोपनीयता')}</Link>
            <span>|</span>
            <Link href="/trust" className="hover:text-navy transition-colors">{t('Trust Center', 'Centre de Confiance', 'مركز الثقة', 'विश्वास केंद्र')}</Link>
          </div>

          <SocialLinks />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
