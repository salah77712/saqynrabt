import { pageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import FaqPage from './page.client';

export const metadata: Metadata = pageMetadata({
  title: 'FAQ — SAQYN RABT',
  description: 'Frequently asked questions about SAQYN RABT.',
  path: '/faq',
  keywords: ['FAQ', 'help', 'questions'],
});

export default function Page() {
  return <FaqPage />;
}
