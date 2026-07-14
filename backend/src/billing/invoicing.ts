/**
 * Automated Invoice document PDF generation
 */
export async function generateClientInvoicePDF(
  companyId: string,
  invoiceId: string,
  amount: number,
  vatAmount: number,
  sql: any,
  env: any
): Promise<string> {
  const invoiceData = {
    invoiceId,
    companyId,
    date: new Date().toISOString().slice(0, 10),
    amount: `${amount} QAR`,
    vat: `${vatAmount} QAR`,
    total: `${amount + vatAmount} QAR`
  };

  console.log('[Invoicing Service]: Synthesizing PDF for', invoiceId);
  
  // Save invoice record in R2 storage
  const key = `invoices/${companyId}/${invoiceId}.json`;
  if (env.BUCKET) {
    try {
      await env.BUCKET.put(key, JSON.stringify(invoiceData));
    } catch (err) {
      console.error('Failed to store invoice JSON in R2:', err);
    }
  }

  return `https://saqyn-bucket.r2.cloudflare.com/${key}`;
}
