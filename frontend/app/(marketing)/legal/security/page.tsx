import LegalPage from '@/components/LegalPage';
import { readFileSync } from 'fs';
import { join } from 'path';

export default function SecurityPage() {
  const content = readFileSync(join(process.cwd(), 'app/(marketing)/legal/security.mdx'), 'utf-8');
  return <LegalPage title="Security Document" content={content} />;
}
