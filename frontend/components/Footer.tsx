'use client';

import * as React from 'react';
import Link from 'next/link';
import { useLocale } from '../app/providers';
import { FooterColumn } from './Footer/FooterColumn';
import { SocialLinks } from './Footer/SocialLinks';

const content = {
en: {
  tagline: 'AI-powered operations for front desks and teams worldwide.',
  address: 'Global Operations',
  dpoEmail: 'saqynrabt@gmail.com',
  companyTitle: 'Company',
  legalTitle: 'Legal & Compliance',
  backToTop: 'Back to Top',
},
fr: {
  tagline: "Opérations alimentées par l'IA pour les bureaux d'accueil et les équipes dans le monde entier.",
  address: 'Opérations Mondiales',
  dpoEmail: 'saqynrabt@gmail.com',
  companyTitle: 'Entreprise',
  legalTitle: 'Juridique et Conformité',
  backToTop: 'Retour en Haut',
},
ar: {
  tagline: 'عمليات مدعومة بالذكاء الاصطناعي لمكاتب الاستقبال والفرق في جميع أنحاء العالم.',
  address: 'عمليات عالمية',
  dpoEmail: 'saqynrabt@gmail.com',
  companyTitle: 'الشركة',
  legalTitle: 'القانون والامتثال',
  backToTop: 'العودة للأعلى',
},
hi: {
  tagline: 'दुनिया भर में फ्रंट डेस्क and टीमों के लिए AI-संचालित संचालन।',
  address: 'वैश्विक संचालन',
  dpoEmail: 'saqynrabt@gmail.com',
  companyTitle: 'कंपनी',
  legalTitle: 'कानूनी और अनुपालन',
  backToTop: 'शीर्ष पर वापस जाएँ',
},
};

function Logo() {
return (
<svg aria-hidden="true" width="120" height="32" viewBox="0 0 120 32" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="SAQYN RABT">
<rect width="62" height="32" rx="4" className="fill-[#141F33]" />
<text x="8" y="22" fontFamily="system-ui, sans-serif" fontSize="14" fontWeight="800" letterSpacing="1" fill="#F8F9FB">SAQYN</text>
<text x="68" y="22" fontFamily="system-ui, sans-serif" fontSize="14" fontWeight="300" letterSpacing="1" className="fill-[#141F33] opacity-40">RABT</text>
</svg>
);
}

export function Footer() {
const { locale } = useLocale();
const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';
const year = new Date().getFullYear();

const [incidentStatus, setIncidentStatus] = React.useState<{ status: string; activeIncidents: number } | null>(null);

React.useEffect(() => {
fetch('/api/admin/incidents/status')
.then((r) => r.json())
.then((d) => setIncidentStatus(d))
.catch(() => setIncidentStatus({ status: 'all_operational', activeIncidents: 0 }));
}, []);

const col1 = [
  { href: '/features', label: t({ en: 'Features', fr: 'Fonctionnalités', ar: 'الميزات', hi: 'विशेषताएँ' }) },
  { href: '/case-studies', label: t({ en: 'Case Studies', fr: 'Études de Cas', ar: 'دراسات الحالة', hi: 'केस स्टडीज' }) },
];

const col2 = [
  { href: '/pricing', label: t({ en: 'Pricing Plans', fr: 'Tarifs', ar: 'خطط الأسعار', hi: 'मूल्य योजनाएँ' }) },
  { href: '/about', label: t({ en: 'About Us', fr: 'À Propos', ar: 'من نحن', hi: 'हमारे बारे में' }) },
];

const col3 = [
  { href: '/contact', label: t({ en: 'Contact Us', fr: 'Contactez-nous', ar: 'اتصل بنا', hi: 'हमसे संपर्क करें' }) },
  { href: '/trust', label: t({ en: 'Legal & Compliance', fr: 'Juridique et Conformité', ar: 'القانون والامتثال', hi: 'कानूनी और अनुपालन' }) },
];

const col4 = [
  { href: '/privacy-policy', label: t({ en: 'Privacy Policy', fr: 'Politique de Confidentialité', ar: 'سياسة الخصوصية', hi: 'गोपनीयता नीति' }) },
  { href: '/terms-and-conditions', label: t({ en: 'Terms of Service', fr: "Conditions d'Utilisation", ar: 'شروط الخدمة', hi: 'सेवा की शर्तें' }) },
];

return (
<footer className="bg-surface text-primary border border-primary/10 rounded-xl shadow-card m-4 overflow-hidden" role="contentinfo" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
  
  {/* 1. Top Status Bar */}
  <div className="border-b border-primary/10 bg-surface py-3 px-6 lg:px-8">
    <div className="mx-auto max-w-7xl flex flex-col sm:flex-row justify-between items-center gap-4 w-full">
      <div className="flex items-center gap-4 flex-wrap text-[11px] font-bold text-primary/55">
<Link href="/trust" className="flex items-center gap-1.5 hover:text-primary transition-colors">
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
          {t({ en: 'Trust Center', ar: 'مركز الثقة' })}
        </Link>
        <span className="w-px h-3 bg-primary/10" />
        <span className="flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" className="stroke-[#2A5CFF]" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          GDPR Ready
        </span>
        <span className="w-px h-3 bg-primary/10" />
        <span className="flex items-center gap-1">
          ⟳ ISO 27001 In Progress
        </span>
      </div>
      
      <div className="flex items-center gap-3 text-[11px] font-semibold text-primary/50">
        {incidentStatus?.status === 'all_operational' ? (
          <span className="flex items-center gap-1.5 text-accent">
            <span className="w-2 h-2 rounded-full bg-accent" />
            All systems operational
          </span>
        ) : (
          <span className="flex items-center gap-1.5 text-accent">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            Incident active ({incidentStatus?.activeIncidents || 0})
          </span>
        )}
      </div>
    </div>
  </div>

  {/* 2. Main Content Grid */}
  <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
    <div className="flex flex-col lg:flex-row justify-between gap-12">
      
      {/* Left Block (30%) */}
      <div className="flex flex-col gap-5 max-w-sm lg:w-[30%]">
        <Link href="/" className="inline-block" aria-label="SAQYN RABT Home">
          <Logo />
        </Link>
        <p className="text-xs text-primary/50 font-bold leading-relaxed">
          {t({ en: 'Sign up to receive updates.', ar: 'سجل للحصول على آخر التحديثات.' })}
        </p>

        {/* Compact Integrated Input */}
        <form onSubmit={(e) => e.preventDefault()} className="relative flex items-center w-full max-w-xs">
          <input
            type="email"
            placeholder={t({ en: 'Enter your email', ar: 'أدخل بريدك الإلكتروني' })}
            aria-label={t({ en: 'Email address for updates', ar: 'البريد الإلكتروني للتحديثات' })}
            className="w-full bg-surface border border-primary/10 rounded-full ps-4 pe-24 py-1.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-royal/25 focus:border-primary/20 transition-all min-h-[36px]"
            required
          />
          <button
            type="submit"
            className="absolute end-1 top-[4px] bottom-[4px] bg-primary hover:bg-primary/90 text-surface font-bold text-[9px] uppercase tracking-wider px-3 rounded-full transition-all duration-200 min-h-[28px]"
          >
            {t({ en: 'Submit', ar: 'إرسال' })}
          </button>
        </form>
      </div>

      {/* Right Block (70%): 4-Column Link Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 lg:w-[70%]">
        <FooterColumn title={t({ en: 'Features', fr: 'Fonctionnalités', ar: 'الميزات', hi: 'विशेषताएँ' })} links={col1} />
        <FooterColumn title={t({ en: 'Company', fr: 'Entreprise', ar: 'الشركة', hi: 'कंपनी' })} links={col2} />
        <FooterColumn title={t({ en: 'Contact', fr: 'Contact', ar: 'اتصل بنا', hi: 'संपर्क' })} links={col3} />
        <FooterColumn title={t({ en: 'Legal', fr: 'Juridique', ar: 'القانون', hi: 'कानूनी' })} links={col4} />
      </div>

    </div>

    {/* 3. Bottom Bar */}
    <div className="border-t border-primary/10 mt-10 pt-6 flex flex-col lg:flex-row justify-between items-center gap-6 text-[10px] font-bold text-primary/40">
      <p className="uppercase tracking-wider">
        © {year} SAQYN RABT. ALL RIGHTS RESERVED.
      </p>

      <div className="flex flex-wrap items-center gap-6 justify-center">
        <div className="flex items-center gap-3 flex-wrap justify-center uppercase tracking-wider">
          <Link href="/sitemap" className="hover:text-primary transition-colors flex items-center">{t({ en: 'Site Map', ar: 'خريطة الموقع' })}</Link>
          <span className="flex items-center">|</span>
          <Link href="/terms-and-conditions" className="hover:text-primary transition-colors flex items-center">{t({ en: 'Terms', ar: 'الشروط' })}</Link>
          <span className="flex items-center">|</span>
          <Link href="/privacy-policy" className="hover:text-primary transition-colors flex items-center">{t({ en: 'Privacy', ar: 'سياسة الخصوصية' })}</Link>
          <span className="flex items-center">|</span>
          <Link href="/trust" className="hover:text-primary transition-colors flex items-center">{t({ en: 'Trust Center', ar: 'مركز الثقة' })}</Link>
        </div>
        
        <SocialLinks />

        {/* Systems status indicator pill next to socials */}
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-accent min-h-[28px]">
          {incidentStatus?.status === 'all_operational' ? (
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              {t({ en: 'Operational', ar: 'مستقر' })}
            </span>
          ) : (
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              {t({ en: 'Incident Response', ar: 'الاستجابة للمشكلة' })} ({incidentStatus?.activeIncidents || 0})
            </span>
          )}
        </div>
      </div>
    </div>

  </div>
</footer>
);
}

export default Footer;
