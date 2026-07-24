import { pageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import GlobalMarketplacePage from './page.client';

export const metadata: Metadata = pageMetadata({
  title: 'Marketplace — SAQYN RABT',
  description: 'Discover and install pre-built automation templates.',
  path: '/marketplace',
  keywords: ['marketplace', 'templates', 'automation'],
});

export default function Page() {
  return <GlobalMarketplacePage />;
}
