import LegalPage from '../../../../components/LegalPage';
import { readFileSync } from 'fs';
import { join } from 'path';

export default function LegalPrivacyPage() {
  const content = readFileSync(join(process.cwd(), 'app/(marketing)/legal/privacy.mdx'), 'utf-8');
  const updated = content.replace(/hello@saqynrabt\.com/g, 'saqynrabt@gmail.com').replace(/privacy@saqynrabt\.com/g, 'saqynrabt@gmail.com');
  return <LegalPage title="Privacy Policy" content={updated} />;
}
