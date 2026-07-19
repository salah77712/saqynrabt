import { pageMetadata } from '../../lib/metadata';
import type { Metadata } from 'next';
import ContactPage from './page.client';

export const metadata: Metadata = pageMetadata({
  title: 'Contact SAQYN RABT',
  description: 'Get in touch with our team for demos, sales, or support.',
  path: '/contact',
  keywords: ['contact', 'sales', 'support'],
});

export default function Page() {
  return <ContactPage />;
}
