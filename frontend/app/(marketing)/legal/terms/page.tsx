import LegalPage from '@/components/LegalPage';
import { readFileSync } from 'fs';
import { join } from 'path';
import { pageMetadata } from '../../../../lib/metadata';
import type { Metadata } from 'next';

export const metadata: Metadata = pageMetadata({
  title: 'Terms of Service — SAQYN RABT',
  description: 'Terms governing use of SAQYN RABT services.',
  path: '/legal/terms',
  keywords: ['terms of service', 'legal'],
});

export default function LegalTermsPage() {
  const content = readFileSync(join(process.cwd(), 'app/(marketing)/legal/terms.mdx'), 'utf-8');
  return <LegalPage title="Terms of Service" content={content} />;
}
