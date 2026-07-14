'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale } from '../app/providers';

/** Human-readable labels for known segments */
const segmentLabels: Record<string, Record<string, string>> = {
dashboard: { en: 'Dashboard', fr: 'Tableau de Bord', ar: 'لوحة التحكم', hi: 'डैशबोर्ड' },
automation: { en: 'Automation', fr: 'Automatisation', ar: 'الأتمتة', hi: 'स्वचालन' },
chat: { en: 'Chat', fr: 'Chat', ar: 'المحادثة', hi: 'चैट' },
documents: { en: 'Documents', fr: 'Documents', ar: 'المستندات', hi: 'दस्तावेज़' },
approvals: { en: 'Approvals', fr: 'Approbations', ar: 'الموافقات', hi: 'स्वीकृतियां' },
settings: { en: 'Settings', fr: 'Paramètres', ar: 'الإعدادات', hi: 'सेटिंग्स' },
voice: { en: 'Voice', fr: 'Voix', ar: 'الصوت', hi: 'आवाज़' },
features: { en: 'Features', fr: 'Fonctionnalités', ar: 'الميزات', hi: 'विशेषताएँ' },
industries: { en: 'Industries', fr: 'Industries', ar: 'الصناعات', hi: 'उद्योग' },
'how-it-works': { en: 'How It Works', fr: 'Comment ça Marche', ar: 'كيف يعمل', hi: 'यह कैसे काम करता है' },
pricing: { en: 'Pricing', fr: 'Tarifs', ar: 'الأسعار', hi: 'मूल्य निर्धारण' },
faq: { en: 'FAQ', ar: 'الأسئلة الشائعة', hi: 'सामान्य प्रश्न' },
about: { en: 'About', fr: 'À Propos', ar: 'عنا', hi: 'हमारे बारे में' },
contact: { en: 'Contact', fr: 'Contact', ar: 'اتصل بنا', hi: 'संपर्क करें' },
help: { en: 'Help Center', fr: "Centre d'Aide", ar: 'مركز المساعدة', hi: 'सहायता केंद्र' },
'getting-started': { en: 'Getting Started', fr: 'Pour Commencer', ar: 'البدء', hi: 'आरंभ करना' },
billing: { en: 'Billing', fr: 'Facturation', ar: 'الفوترة', hi: 'बिलिंग' },
chatbot: { en: 'Chatbot', fr: 'Chatbot', ar: 'المساعد الذكي', hi: 'चैटबॉट' },
global: { en: 'Global', fr: 'Mondial', ar: 'العالمية', hi: 'वैश्विक' },
'case-studies': { en: 'Case Studies', fr: 'Études de Cas', ar: 'دراسات الحالة', hi: 'केस स्टडीज' },
developers: { en: 'Developers', fr: 'Développeurs', ar: 'المطورين', hi: 'डेवलपर्स' },
'api-docs': { en: 'API Docs', fr: 'Docs API', ar: 'وثائق API', hi: 'API दस्तावेज़' },
plugins: { en: 'Plugins', fr: 'Plugins', ar: 'الإضافات', hi: 'प्लगइन्स' },
cli: { en: 'CLI', ar: 'سطر الأوامر' },
changelog: { en: 'Changelog', fr: 'Journal des Modifications', ar: 'سجل التغييرات', hi: 'परिवर्तन लॉग' },
marketplace: { en: 'Marketplace', ar: 'السوق', hi: 'मार्केटप्लेस' },
'privacy-policy': { en: 'Privacy Policy', fr: 'Politique de Confidentialité', ar: 'سياسة الخصوصية', hi: 'गोपनीयता नीति' },
'terms-and-conditions': { en: 'Terms & Conditions', fr: "Conditions d'Utilisation", ar: 'الشروط والأحكام', hi: 'नियम और शर्तें' },
'cookie-policy': { en: 'Cookie Policy', fr: 'Politique de Cookies', ar: 'سياسة ملفات تعريف الارتباط', hi: 'कुकी नीति' },
admin: { en: 'Admin', ar: 'المشرف', hi: 'व्यवस्थापक' },
portal: { en: 'Portal', fr: 'Portail', ar: 'البوابة', hi: 'पोर्टल' },
privacy: { en: 'Privacy', fr: 'Confidentialité', ar: 'الخصوصية', hi: 'गोपनीयता' },
'thank-you': { en: 'Thank You', fr: 'Merci', ar: 'شكرًا لك', hi: 'धन्यवाद' },
};

function formatSegment(segment: string, locale: string): string {
const labels = segmentLabels[segment];
if (labels) return labels[locale] || labels.en || segment;
return segment
.split('-')
.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
.join(' ');
}

interface BreadcrumbsProps {
currentLabel?: string;
className?: string;
}

export function Breadcrumbs({ currentLabel, className = '' }: BreadcrumbsProps) {
const pathname = usePathname();
const { locale } = useLocale();

if (pathname === '/') return null;

const segments = pathname.split('/').filter(Boolean);
const filteredSegments = segments.filter((s) => !s.startsWith('('));

if (filteredSegments.length === 0) return null;

const crumbs = filteredSegments.map((segment, index) => {
const href = '/' + filteredSegments.slice(0, index + 1).join('/');
const isLast = index === filteredSegments.length - 1;
const label = isLast && currentLabel ? currentLabel : formatSegment(segment, locale);
return { href, label, isLast };
});

return (
<nav aria-label={locale === 'ar' ? 'مسار التنقل' : 'Breadcrumb'} dir={locale === 'ar' ? 'rtl' : 'ltr'} className={`text-sm ${className}`}>
<ol className="flex flex-wrap items-center gap-1.5 text-[#141F33]/60">
<li className="flex items-center gap-1.5">
<Link href="/" className="text-[#141F33]/60 hover:text-[#141F33] transition-colors font-medium">
{formatSegment('home', locale) || (locale === 'ar' ? 'الرئيسية' : 'Home')}
</Link>
<ChevronIcon />
</li>
{crumbs.map((crumb) => (
<li key={crumb.href} className="flex items-center gap-1.5">
{crumb.isLast ? (
<span className="text-[#141F33] font-semibold truncate max-w-[200px]" aria-current="page">
{crumb.label}
</span>
) : (
<>
<Link href={crumb.href} className="text-[#141F33]/60 hover:text-[#141F33] transition-colors font-medium">
{crumb.label}
</Link>
<ChevronIcon />
</>
)}
</li>
))}
</ol>
</nav>
);
}

function ChevronIcon() {
return (
<svg className="h-3.5 w-3.5 text-[#141F33]/40 flex-shrink-0 rtl:rotate-180" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
<path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
</svg>
);
}
