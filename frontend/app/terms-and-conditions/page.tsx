import type { Metadata } from 'next';
import MinimalPage from '../../components/MinimalPage';
import { pageMetadata } from '../../lib/metadata';

export const metadata: Metadata = pageMetadata({
  title: 'Terms and Conditions',
  description: 'Review the terms governing the use of SAQYN RABT services, products, and hosted platforms.',
  path: '/terms-and-conditions',
});

const orgLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'SAQYN RABT',
  url: 'https://saqynrabt.com',
  logo: 'https://saqynrabt.com/logo.png',
};

const copy = {
  eyebrow: { en: 'Terms & Conditions', ar: 'الشروط والأحكام' },
  title: { en: 'Terms governing use of SAQYN RABT', ar: 'الشروط التي تحكم استخدام SAQYN RABT' },
  description: {
    en: 'These terms describe the conditions for using SAQYN RABT services and related software offerings.',
    ar: 'توضح هذه الشروط الأحكام المتعلقة باستخدام خدمات ومنصات SAQYN RABT.',
  },
  sections: [
    {
      title: { en: 'Use of the service', ar: 'استخدام الخدمة' },
      body: { en: 'You agree to use the platform lawfully and responsibly, and not to misuse the system or its content.', ar: 'توافق على استخدام المنصة بشكل قانوني ومسؤول، وعدم إساءة استخدام النظام أو محتواه.' },
    },
    {
      title: { en: 'Intellectual property', ar: 'الملكية الفكرية' },
      body: { en: 'All product materials, branding, and service interfaces remain the property of SAQYN RABT unless otherwise stated.', ar: 'تبقى جميع مواد المنتج والعلامات التجارية وواجهات الخدمة ملكًا لـ SAQYN RABT ما لم ينص على خلاف ذلك.' },
    },
    {
      title: { en: 'Limitation of liability', ar: 'تحديد المسؤولية' },
      body: { en: 'SAQYN RABT provides services on an as-is basis and is not liable for indirect or consequential losses arising from use of the service.', ar: 'توفر SAQYN RABT الخدمات كما هي ولا تتحمل المسؤولية عن الخسائر غير المباشرة أو التبعية.' },
    },
  ],
};

export default function TermsAndConditionsPage() {
  return <MinimalPage title={copy.title} eyebrow={copy.eyebrow} description={copy.description} sections={copy.sections} jsonLd={orgLd} />;
}
