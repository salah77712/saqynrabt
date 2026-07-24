import { pageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import IndustriesPage from './page.client';

export const metadata: Metadata = pageMetadata({
  title: 'Industries We Serve — SAQYN RABT',
  description: 'Healthcare, hospitality, legal, retail — tailored automation for your sector.',
  path: '/industries',
  keywords: ['industries', 'healthcare', 'hospitality', 'legal', 'retail'],
});

export default function Page() {
  return <IndustriesPage />;
}
