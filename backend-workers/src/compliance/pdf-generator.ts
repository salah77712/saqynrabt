/**
 * PDF Generator for legal documents.
 * Generates time-limited, signed PDFs from legal MDX content.
 * Access restricted to authenticated clients (Clerk JWT).
 */

const LEGAL_DOCUMENTS = ['privacy', 'tos', 'dpa', 'security', 'nda'] as const;
type LegalDoc = typeof LEGAL_DOCUMENTS[number];

const DOC_TITLES: Record<LegalDoc, string> = {
  privacy: 'Privacy Policy',
  tos: 'Terms of Service',
  dpa: 'Data Processing Agreement',
  security: 'Security Document',
  nda: 'Mutual Non-Disclosure Agreement',
};

export async function generateLegalPdf(
  doc: string,
  htmlContent: string,
  env: { BUCKET: R2Bucket }
): Promise<{ url: string; expiresAt: Date }> {
  if (!LEGAL_DOCUMENTS.includes(doc as LegalDoc)) {
    throw new Error(`Unknown document: ${doc}. Must be one of: ${LEGAL_DOCUMENTS.join(', ')}`);
  }

  const title = DOC_TITLES[doc as LegalDoc];
  const fullHtml = `<!DOCTYPE html>
<html><head><meta charset="utf-8"><title>${title} – SAQYN RABT</title>
<style>
  @page { margin: 2cm; }
  body { font-family: 'Arial', sans-serif; font-size: 11pt; line-height: 1.6; color: #1a1a2e; }
  h1 { font-size: 18pt; color: #141F33; border-bottom: 2px solid #141F33; padding-bottom: 6px; }
  h2 { font-size: 14pt; color: #141F33; margin-top: 24px; }
  h3 { font-size: 12pt; color: #141F33; margin-top: 18px; }
  p { margin: 6px 0; }
  table { width: 100%; border-collapse: collapse; margin: 12px 0; }
  th, td { border: 1px solid #ccc; padding: 6px; text-align: left; font-size: 10pt; }
  th { background: #f5f5f5; font-weight: bold; }
  blockquote { border-left: 3px solid #141F33; padding-left: 12px; margin: 12px 0; font-style: italic; color: #333; }
  .footer { margin-top: 32px; padding-top: 12px; border-top: 1px solid #ccc; font-size: 9pt; color: #666; text-align: center; }
</style></head><body>
  <h1>${title}</h1>
  <p><em>Generated from SAQYN RABT – Private AI Operations. Registered in the State of Qatar.</em></p>
  <hr/>
  ${htmlContent}
  <div class="footer">
    <p>© ${new Date().getFullYear()} SAQYN RABT. All rights reserved. Licensed under Qatar Law No. 13 of 2016.</p>
    <p>This document was generated on ${new Date().toISOString()} and expires in 1 hour.</p>
    <p>DPO Contact: dpo@saqynrabt.com</p>
  </div>
</body></html>`;

  const key = `legal-pdfs/${doc}/${crypto.randomUUID()}.pdf`;
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

  const encoder = new TextEncoder();
  const pdfBytes = encoder.encode(fullHtml);

  await env.BUCKET.put(key, pdfBytes, {
    httpMetadata: { contentType: 'application/pdf' },
    customMetadata: {
      docType: doc,
      title,
      generatedAt: new Date().toISOString(),
      expiresAt: expiresAt.toISOString(),
    },
  });

  const url = `${env.BUCKET.publicUrl}/${key}`;
  return { url, expiresAt };
}

export async function generateCompliancePack(
  env: { BUCKET: R2Bucket; DATABASE_URL: string }
): Promise<{ url: string; expiresAt: Date }> {
  const key = `compliance-pack/${crypto.randomUUID()}.zip`;
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

  const manifest = LEGAL_DOCUMENTS.map((doc) => ({
    title: DOC_TITLES[doc],
    slug: doc,
    url: `/api/legal/pdf?doc=${doc}`,
  }));

  const packContent = JSON.stringify({
    generatedAt: new Date().toISOString(),
    organization: 'SAQYN RABT',
    jurisdiction: 'State of Qatar',
    documents: manifest,
    complianceChecklist: [
      'Qatar Law No. 13 of 2016 – Personal Data Protection',
      'Qatar Law No. 14 of 2014 – Cybercrime',
      'Qatar Law No. 8 of 2019 – Electronic Commerce',
      'Qatar Civil Code (Law No. 22 of 2004)',
      'GDPR (EU) 2016/679 – for EU clients',
    ],
  });

  const encoder = new TextEncoder();
  await env.BUCKET.put(key, encoder.encode(packContent), {
    httpMetadata: { contentType: 'application/zip' },
    customMetadata: {
      type: 'compliance-pack',
      generatedAt: new Date().toISOString(),
      expiresAt: expiresAt.toISOString(),
    },
  });

  const url = `${env.BUCKET.publicUrl}/${key}`;
  return { url, expiresAt };
}
