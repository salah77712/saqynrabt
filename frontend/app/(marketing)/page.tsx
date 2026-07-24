import { pageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import MarketingPage from './page.client';

export const metadata: Metadata = pageMetadata({
  title: 'SAQYN RABT — Intelligent Staff Hub & Queue Automation',
  description: 'Secure AI-powered automation for guest intake, staff knowledge, and business operations.',
  path: '/',
  keywords: ['AI automation', 'RAG chatbot', 'voice AI', 'staff hub'],
});

export default function Page() {
  return <MarketingPage />;
}
