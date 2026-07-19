import { pageMetadata } from '../../../lib/metadata';
import type { Metadata } from 'next';
import ChatbotPage from './page.client';

export const metadata: Metadata = pageMetadata({
  title: 'Internal RAG Chatbot — SAQYN RABT',
  description: 'Upload documents, let AI answer staff questions from your knowledge base.',
  path: '/chatbot',
  keywords: ['RAG chatbot', 'knowledge base', 'document Q&A'],
});

export default function Page() {
  return <ChatbotPage />;
}
