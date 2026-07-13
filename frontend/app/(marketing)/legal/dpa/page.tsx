import LegalPage from '../../../../components/LegalPage';
import { readFileSync } from 'fs';
import { join } from 'path';

export default function DpaPage() {
  const content = readFileSync(join(process.cwd(), 'app/(marketing)/legal/dpa.mdx'), 'utf-8');
  const updated = content.replace(/hello@saqynrabt\.com/g, 'saqynrabt@gmail.com');
  return <LegalPage title="Data Processing Agreement" content={updated} />;
}
