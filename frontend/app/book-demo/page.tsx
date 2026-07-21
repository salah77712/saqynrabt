import { pageMetadata } from '../../lib/metadata';
import type { Metadata } from 'next';
import BookDemoPage from './page.client';

export const metadata: Metadata = pageMetadata({
  title: 'Book a Demo — SAQYN RABT',
  description: 'Book a free demo call with SAQYN RABT. Currently onboarding pilot companies in Qatar and the GCC.',
  path: '/book-demo',
  keywords: ['demo', 'pilot', 'qatar', 'saqyn rabt', 'booking'],
});

export default function Page() {
  return <BookDemoPage />;
}
