import type { Metadata } from 'next';
import MinimalPage from '../../components/MinimalPage';
import { pageMetadata } from '../../lib/metadata';

export const metadata: Metadata = pageMetadata({
  title: 'About',
  description: 'Learn how SAQYN RABT helps modern businesses automate client intake, knowledge access, and internal operations with secure AI workflows.',
  path: '/about',
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is SAQYN RABT?",
      "acceptedAnswer": { "@type": "Answer", "text": "SAQYN RABT unifies client communication, internal knowledge access, and workflow automation in one secure platform." }
    },
    {
      "@type": "Question",
      "name": "Who is this for?",
      "acceptedAnswer": { "@type": "Answer", "text": "Teams in hospitality, clinics, and service businesses that need reliable automation and private RAG-based knowledge." }
    },
    {
      "@type": "Question",
      "name": "How can I get started?",
      "acceptedAnswer": { "@type": "Answer", "text": "Contact our team for a demo and we will propose an implementation plan tailored to your operations." }
    }
  ]
};

const content = {
  eyebrow: { en: 'About SAQYN RABT', ar: 'عن SAQYN RABT' },
  title: { en: 'Built for businesses that need faster answers and cleaner operations.', ar: 'مصممة للفرق التي تحتاج إلى إجابات أسرع وعمليات أنظف.' },
  description: {
    en: 'SAQYN RABT unifies client communication, internal knowledge access, and workflow automation in one secure platform. It helps teams respond faster, reduce manual effort, and serve clients with confidence.',
    ar: 'تجمع SAQYN RABT بين تواصل العملاء، والوصول إلى المعرفة الداخلية، وأتمتة سير العمل في منصة آمنة واحدة. تساعد الفرق على الاستجابة بسرعة وتقليل الجهد اليدوي وخدمة العملاء بكفاءة.',
  },
  sections: [
    {
      title: { en: 'What we do', ar: 'ما نقوم به' },
      body: { en: 'We deliver AI-powered automation for queues, staff support, and client-facing interactions.', ar: 'نقدم أتمتة مدعومة بالذكاء الاصطناعي لقوائم الانتظار، ودعم الموظفين، والتفاعل مع العملاء.' },
    },
    {
      title: { en: 'Why teams choose us', ar: 'لماذا تختارنا' },
      body: { en: 'Our platform is designed for busy organizations that need reliability, clarity, and a polished experience.', ar: 'منصة مصممة للمنظمات التي تحتاج إلى موثوقية ووضوح وتجربة مصقولة.' },
    },
  ],
  cta: { label: { en: 'Contact us', ar: 'اتصل بنا' }, href: '/contact' },
};

export default function AboutPage() {
  return <MinimalPage title={content.title} eyebrow={content.eyebrow} description={content.description} sections={content.sections} cta={content.cta} jsonLd={jsonLd} />;
}
