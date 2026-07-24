import { pageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import PricingPage from './page.client';

export const metadata: Metadata = pageMetadata({
  title: 'Pricing Plans — SAQYN RABT',
  description: 'Transparent pricing for voice AI and internal chatbot tiers.',
  path: '/pricing',
  keywords: ['pricing', 'plans', 'cost'],
});

export default function Page() {
  return <PricingPage />;
}
