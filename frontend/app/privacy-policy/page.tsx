import type { Metadata } from 'next';
import MinimalPage from '../../components/MinimalPage';
import { pageMetadata } from '../../lib/metadata';

export const metadata: Metadata = pageMetadata({
  title: 'Privacy Policy',
  description: 'Read the privacy practices for SAQYN RABT, including data handling, security, and user rights.',
  path: '/privacy-policy',
});

const orgLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'SAQYN RABT',
  url: 'https://saqynrabt.com',
  logo: 'https://saqynrabt.com/logo.png',
};

const copy = {
  eyebrow: { en: 'Privacy Policy', ar: 'سياسة الخصوصية' },
  title: { en: 'Privacy & data handling', ar: 'الخصوصية ومعالجة البيانات' },
  description: {
    en: 'SAQYN RABT respects your privacy and is committed to protecting the personal information you share with us.',
    ar: 'تحترم SAQYN RABT خصوصيتك وتلتزم بحماية المعلومات الشخصية التي تقدمها لنا.',
  },
  sections: [
    {
      title: { en: 'Information we collect', ar: 'المعلومات التي نجمعها' },
      body: { en: 'We collect information needed to provide our services, including account details, usage data, and support requests.', ar: 'نقوم بجمع المعلومات اللازمة لتقديم خدماتنا، بما في ذلك بيانات الحساب وبيانات الاستخدام وطلبات الدعم.' },
    },
    {
      title: { en: 'How we use it', ar: 'كيفية استخدامها' },
      body: { en: 'Your information helps us operate the platform, improve security, and deliver the features you use.', ar: 'تساعدنا معلوماتك في تشغيل المنصة وتحسين الأمان وتقديم الميزات التي تستخدمها.' },
    },
    {
      title: { en: 'Your rights', ar: 'حقوقك' },
      body: { en: 'You may request access to, correction of, or deletion of your data where applicable by contacting us.', ar: 'يمكنك طلب الوصول إلى بياناتك أو تصحيحها أو حذفها عندما يكون ذلك مناسبًا عن طريق الاتصال بنا.' },
    },
  ],
};

export default function PrivacyPolicyPage() {
  return <MinimalPage title={copy.title} eyebrow={copy.eyebrow} description={copy.description} sections={copy.sections} jsonLd={orgLd} />;
}
