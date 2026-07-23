import LegalPage from '../../../../components/LegalPage';
import { readFileSync } from 'fs';
import { join } from 'path';

export default function NdaPage() {
  const content = readFileSync(join(process.cwd(), 'app/(marketing)/legal/nda.mdx'), 'utf-8');
  return <LegalPage title="Non-Disclosure Agreement" content={content} />;
}
