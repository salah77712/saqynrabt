import { pageMetadata } from '../../../lib/metadata';
import type { Metadata } from 'next';
import PublicPrivacyPortalPage from './page.client';

export const metadata: Metadata = pageMetadata({
  title: 'Privacy Portal — SAQYN RABT',
  description: 'Customer privacy portal for DSAR requests.',
  path: '/portal/privacy',
  keywords: ['privacy portal', 'DSAR', 'customer'],
});

export default function Page() {
  return <PublicPrivacyPortalPage />;
}
