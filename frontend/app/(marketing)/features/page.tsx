import { pageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import FeaturesPage from './page.client';

export const metadata: Metadata = pageMetadata({
  title: 'Features & Capabilities — SAQYN RABT',
  description: 'Explore voice AI, RAG chatbot, custom workflows, and real-time reporting.',
  path: '/features',
  keywords: ['features', 'AI voice', 'RAG', 'automation'],
});

export default function Page() {
  return <FeaturesPage />;
}
