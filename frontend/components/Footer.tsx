'use client';

import * as React from 'react';
import Link from 'next/link';
import { useLocale } from '../app/providers';
import { FooterColumn } from './Footer/FooterColumn';
import { SocialLinks } from './Footer/SocialLinks';
import { Mail, Check } from 'lucide-react';

const content = {
en: {
  tagline: 'AI-powered operations for front desks and teams worldwide.',
  address: 'Global Operations',
  dpoEmail: 'saqynrabt@gmail.com',
  featuresTitle: 'Features',
  features: [{ href: '/features', label: 'Features' }],
  casesTitle: 'Case Studies',
  cases: [{ href: '/case-studies', label: 'Case Studies' }],
  pricingTitle: 'Pricing',
  pricing: [{ href: '/pricing', label: 'Pricing Plans' }],
  companyTitle: 'Company',
  legalTitle: 'Legal & Compliance',
  company: [
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact Us' },
  ],
  legal: [
  { href: '/privacy-policy', label: 'Privacy Policy' },
  { href: '/terms-and-conditions', label: 'Terms of Service' },
  ],
  backToTop: 'Back to Top',
},
fr: {
  tagline: "Opérations alimentées par l'IA pour les bureaux d'accueil et les équipes dans le monde entier.",
  address: 'Opérations Mondiales',
  dpoEmail: 'saqynrabt@gmail.com',
  featuresTitle: 'Fonctionnalités',
  features: [{ href: '/features', label: 'Fonctionnalités' }],
  casesTitle: 'Études de Cas',
  cases: [{ href: '/case-studies', label: 'Études de Cas' }],
  pricingTitle: 'Tarifs',
  pricing: [{ href: '/pricing', label: 'Tarifs' }],
  companyTitle: 'Entreprise',
  legalTitle: 'Juridique et Conformité',
  company: [
  { href: '/about', label: 'À Propos' },
  { href: '/contact', label: 'Contactez-nous' },
  ],
  legal: [
  { href: '/privacy-policy', label: 'Politique de Confidentialité' },
  { href: '/terms-and-conditions', label: "Conditions d'Utilisation" },
  ],
  backToTop: 'Retour en Haut',
},
ar: {
  tagline: 'عمليات مدعومة بالذكاء الاصطناعي لمكاتب الاستقبال والفرق في جميع أنحاء العالم.',
  address: 'عمليات عالمية',
  dpoEmail: 'saqynrabt@gmail.com',
  featuresTitle: 'المميزات',
  features: [{ href: '/features', label: 'المميزات' }],
  casesTitle: 'دراسات الحالة',
  cases: [{ href: '/case-studies', label: 'دراسات الحالة' }],
  pricingTitle: 'خطط الأسعار',
  pricing: [{ href: '/pricing', label: 'خطط الأسعار' }],
  companyTitle: 'الشركة',
  legalTitle: 'القانون والامتثال',
  company: [
  { href: '/about', label: 'من نحن' },
  { href: '/contact', label: 'اتصل بنا' },
  ],
  legal: [
  { href: '/privacy-policy', label: 'سياسة الخصوصية' },
  { href: '/terms-and-conditions', label: 'شروط الخدمة' },
  ],
  backToTop: 'العودة للأعلى',
},
hi: {
  tagline: 'दुनिया भर में फ्रंट डेस्क and टीमों के लिए AI-संचालित संचालन।',
  address: 'वैश्विक संचालन',
  dpoEmail: 'saqynrabt@gmail.com',
  featuresTitle: 'विशेषताएं',
  features: [{ href: '/features', label: 'विशेषताएं' }],
  casesTitle: 'केस स्टडीज',
  cases: [{ href: '/case-studies', label: 'केस स्टडीज' }],
  pricingTitle: 'मूल्य योजनाएँ',
  pricing: [{ href: '/pricing', label: 'मूल्य योजनाएँ' }],
  companyTitle: 'कंपनी',
  legalTitle: 'कानूनी और अनुपालन',
  company: [
  { href: '/about', label: 'हमारे बारे में' },
  { href: '/contact', label: 'हमसे संपर्क करें' },
  ],
  legal: [
  { href: '/privacy-policy', label: 'गोपनीयता नीति' },
  { href: '/terms-and-conditions', label: 'सेवा की शर्तें' },
  ],
  backToTop: 'शीर्ष पर वापस जाएँ',
},
};

function Logo() {
return (
<svg width="120" height="32" viewBox="0 0 120 32" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="SAQYN RABT">
<rect width="62" height="32" rx="4" className="fill-[#141F33]" />
<text x="8" y="22" fontFamily="system-ui, sans-serif" fontSize="14" fontWeight="800" letterSpacing="1" fill="#F8F9FB">SAQYN</text>
<text x="68" y="22" fontFamily="system-ui, sans-serif" fontSize="14" fontWeight="300" letterSpacing="1" className="fill-[#141F33] opacity-40">RABT</text>
</svg>
);
}

export function Footer() {
const { locale } = useLocale();
const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';
const copy = content[locale] || content.en;
const year = new Date().getFullYear();

const [incidentStatus, setIncidentStatus] = React.useState<{ status: string; activeIncidents: number } | null>(null);

React.useEffect(() => {
fetch('/api/admin/incidents/status')
.then((r) => r.json())
.then((d) => setIncidentStatus(d))
.catch(() => setIncidentStatus({ status: 'all_operational', activeIncidents: 0 }));
}, []);

return (
<footer className="bg-[#F8F9FB] text-[#141F33] border border-[#141F33]/10 rounded-[40px] shadow-[0_10px_40px_rgba(0,0,0,0.05)] m-4 overflow-hidden" role="contentinfo" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
{/* Trust & Compliance Bar */}
<div className="border-b border-[#141F33]/10 bg-[#F8F9FB]">
<div className="mx-auto max-w-7xl px-6 py-2.5 lg:px-8 flex flex-wrap items-center justify-between gap-4" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
<div className="flex items-center gap-8 flex-wrap">
<Link
href="/trust"
className="flex items-center gap-1.5 text-[11px] font-bold text-[#141F33]/50 hover:text-[#141F33] transition-colors"
>
<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
Trust Center
</Link>
<span className="w-px h-4 bg-[#141F33]" />
<span className="flex items-center gap-1 text-[11px] text-[#141F33]/40 font-bold">
<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" className="stroke-[#2A5CFF]" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
GDPR Ready
</span>
<span className="flex items-center gap-1 text-[11px] text-[#141F33]/40 font-bold">
<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" className="stroke-[#2A5CFF]" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
Global Compliance Ready
</span>
<span className="flex items-center gap-1 text-[11px] text-[#141F33]/40 font-bold">
⟳ ISO 27001 In Progress
</span>
</div>
<div className="flex items-center gap-3 text-[11px] font-semibold text-[#141F33]/50">
{incidentStatus?.status === 'all_operational' ? (
<span className="flex items-center gap-1.5 text-[#2A5CFF]">
<span className="w-2 h-2 rounded-full bg-[#2A5CFF]" />
All systems operational
</span>
) : (
<span className="flex items-center gap-1.5 text-[#2A5CFF]">
<span className="w-2 h-2 rounded-full bg-[#2A5CFF] animate-pulse" />
Incident response active ({incidentStatus?.activeIncidents || 0})
</span>
)}
</div>
</div>
</div>

<div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
<div className="flex flex-col lg:flex-row justify-between gap-16">
{/* Left Block: Logo & Newsletter (Nietzsche Style) */}
<div className="flex flex-col gap-8 max-w-sm">
<Link href="/" className="inline-block" aria-label="SAQYN RABT Home">
<Logo />
</Link>
<p className="text-xs text-[#141F33]/50 font-bold leading-relaxed mt-2">
{t({ en: 'Sign up to receive updates.', ar: 'سجل للحصول على آخر التحديثات.' })}
</p>

{/* Integrated capsule input + button */}
<form onSubmit={(e) => e.preventDefault()} className="relative flex items-center w-full max-w-xs">
<input
type="email"
placeholder={t({ en: 'Enter your email', ar: 'أدخل بريدك الإلكتروني' })}
className="w-full bg-[#F8F9FB] border border-[#141F33]/10 rounded-full pl-5 pr-28 py-3 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-2 focus:ring-royal/25 focus:border-[#141F33]/20 transition-all"
required
/>
<button
type="submit"
className="absolute right-1 top-1 bottom-1 bg-[#141F33] hover:bg-[#141F33] text-[#F8F9FB] font-bold text-[10px] uppercase tracking-wider px-5 rounded-full transition-all duration-200"
>
{t({ en: 'Submit', ar: 'إرسال' })}
</button>
</form>

<p className="text-[10px] text-[#141F33]/40 font-medium leading-relaxed">
{t({
en: 'By subscribing you agree to our Privacy Policy and provide consent to receive updates from our company.',
ar: 'من خلال الاشتراك، فإنك توافق على سياسة الخصوصية الخاصة بنا وتوافق على تلقي التحديثات من شركتنا.'
})}
</p>
</div>

{/* Right Block: Simplified Columns (Product, Company, Legal) */}
<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-12">
  <FooterColumn title={copy.featuresTitle || 'Features'} links={copy.features || []} />
  <FooterColumn title={copy.casesTitle || 'Case Studies'} links={copy.cases || []} />
  <FooterColumn title={copy.pricingTitle || 'Pricing'} links={copy.pricing || []} />
  <FooterColumn title={copy.companyTitle} links={copy.company} />
  <FooterColumn title={copy.legalTitle} links={copy.legal} />
</div>
</div>

{/* Bottom Bar */}
<div className="border-t border-[#141F33]/10 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-bold text-[#141F33]/40">
<p className="uppercase tracking-wider">
© {year} SAQYN RABT. ALL RIGHTS RESERVED.
</p>

<div className="flex items-center gap-4 flex-wrap justify-center uppercase tracking-wider">
<Link href="/sitemap" className="hover:text-[#141F33] transition-colors">{t({ en: 'Site Map', ar: 'خريطة الموقع' })}</Link>
<span>|</span>
<Link href="/terms-and-conditions" className="hover:text-[#141F33] transition-colors">{t({ en: 'Terms', ar: 'الشروط' })}</Link>
<span>|</span>
<Link href="/privacy-policy" className="hover:text-[#141F33] transition-colors">{t({ en: 'Privacy', ar: 'سياسة الخصوصية' })}</Link>
<span>|</span>
<Link href="/trust" className="hover:text-[#141F33] transition-colors">{t({ en: 'Trust Center', ar: 'مركز الثقة' })}</Link>
</div>

<SocialLinks />
</div>
</div>
</footer>
);
}

export default Footer;
