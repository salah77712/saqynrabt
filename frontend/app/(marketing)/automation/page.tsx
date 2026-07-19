import { pageMetadata } from '../../../lib/metadata';
import type { Metadata } from 'next';
import AutomationPage from './page.client';

export const metadata: Metadata = pageMetadata({
  title: 'Call & Queue Automation — SAQYN RABT',
  description: 'Automate inbound calls, routing, and queue management with AI voice.',
  path: '/automation',
  keywords: ['call automation', 'queue management', 'AI voice'],
});

export default function Page() {
  return <AutomationPage />;
}
