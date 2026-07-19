import { pageMetadata } from '../../lib/metadata';
import type { Metadata } from 'next';
import ChangelogPage from './page.client';

export const metadata: Metadata = pageMetadata({
  title: 'Changelog — SAQYN RABT',
  description: 'Latest features, fixes, and improvements.',
  path: '/changelog',
  keywords: ['changelog', 'updates', 'releases'],
});

export default function Page() {
  return <ChangelogPage />;
}
