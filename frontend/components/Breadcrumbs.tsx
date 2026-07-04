'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale } from '../app/providers';

/** Human-readable labels for known segments */
const segmentLabels: Record<string, { en: string; ar: string }> = {
  dashboard: { en: 'Dashboard', ar: 'لوحة التحكم' },
  automation: { en: 'Automation', ar: 'الأتمتة' },
  chat: { en: 'Chat', ar: 'المحادثة' },
  documents: { en: 'Documents', ar: 'المستندات' },
  approvals: { en: 'Approvals', ar: 'الموافقات' },
  settings: { en: 'Settings', ar: 'الإعدادات' },
  voice: { en: 'Voice', ar: 'الصوت' },
  features: { en: 'Features', ar: 'الميزات' },
  industries: { en: 'Industries', ar: 'الصناعات' },
  'how-it-works': { en: 'How It Works', ar: 'كيف يعمل' },
  pricing: { en: 'Pricing', ar: 'الأسعار' },
  faq: { en: 'FAQ', ar: 'الأسئلة الشائعة' },
  about: { en: 'About', ar: 'عنا' },
  contact: { en: 'Contact', ar: 'اتصل بنا' },
  help: { en: 'Help Center', ar: 'مركز المساعدة' },
  'getting-started': { en: 'Getting Started', ar: 'البدء' },
  billing: { en: 'Billing', ar: 'الفوترة' },
  chatbot: { en: 'Chatbot', ar: 'المساعد الذكي' },
  global: { en: 'Global', ar: 'العالمية' },
  'case-studies': { en: 'Case Studies', ar: 'دراسات الحالة' },
  developers: { en: 'Developers', ar: 'المطورين' },
  'api-docs': { en: 'API Docs', ar: 'وثائق API' },
  plugins: { en: 'Plugins', ar: 'الإضافات' },
  cli: { en: 'CLI', ar: 'سطر الأوامر' },
  changelog: { en: 'Changelog', ar: 'سجل التغييرات' },
  marketplace: { en: 'Marketplace', ar: 'السوق' },
  'privacy-policy': { en: 'Privacy Policy', ar: 'سياسة الخصوصية' },
  'terms-and-conditions': { en: 'Terms & Conditions', ar: 'الشروط والأحكام' },
  'cookie-policy': { en: 'Cookie Policy', ar: 'سياسة ملفات تعريف الارتباط' },
  admin: { en: 'Admin', ar: 'المشرف' },
  portal: { en: 'Portal', ar: 'البوابة' },
  privacy: { en: 'Privacy', ar: 'الخصوصية' },
  'thank-you': { en: 'Thank You', ar: 'شكرًا لك' },
};

function formatSegment(segment: string, locale: 'en' | 'ar'): string {
  const labels = segmentLabels[segment];
  if (labels) return locale === 'ar' ? labels.ar : labels.en;
  // Fallback: capitalize and replace hyphens
  return segment
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

interface BreadcrumbsProps {
  /** Optional override for the label of the current (last) crumb */
  currentLabel?: string;
  /** CSS class for the container */
  className?: string;
}

export function Breadcrumbs({ currentLabel, className = '' }: BreadcrumbsProps) {
  const pathname = usePathname();
  const { locale } = useLocale();

  // Don't render on homepage
  if (pathname === '/') return null;

  const segments = pathname.split('/').filter(Boolean);
  // Skip route groups like (marketing)
  const filteredSegments = segments.filter((s) => !s.startsWith('('));

  if (filteredSegments.length === 0) return null;

  const crumbs = filteredSegments.map((segment, index) => {
    const href = '/' + filteredSegments.slice(0, index + 1).join('/');
    const isLast = index === filteredSegments.length - 1;
    const label =
      isLast && currentLabel
        ? currentLabel
        : formatSegment(segment, locale);
    return { href, label, isLast };
  });

  return (
    <nav
      aria-label={locale === 'ar' ? 'مسار التنقل' : 'Breadcrumb'}
      className={`text-sm ${className}`}
    >
      <ol className="flex flex-wrap items-center gap-1.5 text-muted">
        {/* Home crumb */}
        <li className="flex items-center gap-1.5">
          <Link
            href="/"
            className="text-muted hover:text-navy transition-colors font-medium"
          >
            {locale === 'ar' ? 'الرئيسية' : 'Home'}
          </Link>
          <ChevronIcon />
        </li>

        {crumbs.map((crumb) => (
          <li key={crumb.href} className="flex items-center gap-1.5">
            {crumb.isLast ? (
              <span
                className="text-navy font-semibold truncate max-w-[200px]"
                aria-current="page"
              >
                {crumb.label}
              </span>
            ) : (
              <>
                <Link
                  href={crumb.href}
                  className="text-muted hover:text-navy transition-colors font-medium"
                >
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
    <svg
      className="h-3.5 w-3.5 text-slate-400 flex-shrink-0 rtl:rotate-180"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
        clipRule="evenodd"
      />
    </svg>
  );
}
