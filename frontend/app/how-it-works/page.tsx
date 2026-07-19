import { pageMetadata } from '../../lib/metadata';
import type { Metadata } from 'next';
import HowItWorksPage from './page.client';

export const metadata: Metadata = pageMetadata({
  title: 'How It Works — SAQYN RABT',
  description: 'Step-by-step guide to implementing SAQYN RABT automation.',
  path: '/how-it-works',
  keywords: ['how it works', 'implementation', 'guide'],
});

export default function Page() {
  return <HowItWorksPage />;
}
