import { pageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import AboutPage from './page.client';

export const metadata: Metadata = pageMetadata({
  title: 'About SAQYN RABT',
  description: 'Learn about our mission to automate front-desk operations worldwide.',
  path: '/about',
  keywords: ['about', 'company', 'mission'],
});

export default function Page() {
  return <AboutPage />;
}
