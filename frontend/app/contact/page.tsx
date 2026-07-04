import type { Metadata } from 'next';
import MinimalPage from '../../components/MinimalPage';
import { pageMetadata } from '../../lib/metadata';

export const metadata: Metadata = pageMetadata({
  title: 'Contact',
  description: 'Get in touch with SAQYN RABT to discuss automation, chatbot, and secure AI operations for your team.',
  path: '/contact',
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "How do I book a demo?", "acceptedAnswer": { "@type": "Answer", "text": "Use the contact form or email hello@saqynrabt.com to schedule a demo appointment." } },
    { "@type": "Question", "name": "What support do you provide during onboarding?", "acceptedAnswer": { "@type": "Answer", "text": "We provide onboarding support, documentation, and optional implementation services to integrate SAQYN RABT into your workflows." } }
  ]
};

const content = {
  title: { en: "Let’s build the right workflow for your team.", ar: 'دعنا نبني سير عمل مناسب لفريقك.' },
  eyebrow: { en: 'Contact', ar: 'اتصل' },
  description: { en: 'Reach out for a demo, implementation planning, or a custom AI workflow tailored to your business process.', ar: 'تواصل معنا لعرض توضيحي أو تخطيط التنفيذ أو إعداد سير عمل مخصص.' },
  sections: [
    { title: { en: 'Book a demo', ar: 'احجز عرضًا' }, body: { en: 'See how SAQYN RABT can support client intake, knowledge access, and operations.', ar: 'اكتشف كيف يمكن لـ SAQYN RABT أن يدعم استقبال العملاء والوصول إلى المعرفة والعمليات.' } },
    { title: { en: 'Email', ar: 'البريد الإلكتروني' }, body: { en: 'hello@saqynrabt.com', ar: 'hello@saqynrabt.com' } },
  ]
};

export default function ContactPage() {
  return (
    <MinimalPage title={content.title} eyebrow={content.eyebrow} description={content.description} sections={content.sections} jsonLd={jsonLd} />
  );
}
