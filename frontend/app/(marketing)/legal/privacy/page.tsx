import LegalPage from '@/components/LegalPage';
import { readFileSync } from 'fs';
import { join } from 'path';

export default function LegalPrivacyPage() {
  const content = readFileSync(join(process.cwd(), 'app/(marketing)/legal/privacy.mdx'), 'utf-8');
  return <LegalPage title="Privacy Policy" content={content} />;
}
