export async function buildCustomInvoiceHtml(invoiceData: {
  invoiceNumber: string;
  clientLogoUrl?: string;
  clientName: string;
  items: Array<{ desc: string; cost: number }>;
  currency: string;
}): Promise<string> {
  const logoTag = invoiceData.clientLogoUrl
    ? `<img src="${invoiceData.clientLogoUrl}" alt="logo" style="max-height: 50px; float: right;" />`
    : '';

  const rows = invoiceData.items
    .map((item) => `<tr><td>${item.desc}</td><td>${item.cost} ${invoiceData.currency}</td></tr>`)
    .join('');

  return `
    <html>
      <body style="font-family: sans-serif; color: #141F33; padding: 40px;">
        ${logoTag}
        <h2>INVOICE #${invoiceData.invoiceNumber}</h2>
        <p>Prepared for: <strong>${invoiceData.clientName}</strong></p>
        <table style="width: 100%; border-collapse: collapse; margin-top: 30px;">
          <tr style="border-bottom: 2px solid #141F33; font-weight: bold;">
            <td>Description</td>
            <td>Cost</td>
          </tr>
          ${rows}
        </table>
      </body>
    </html>
  `;
}
