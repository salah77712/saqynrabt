export async function generatePdfReport(data: any): Promise<ArrayBuffer> {
  // Edge runtime compliant HTML template to simple print-compatible stream or buffer structure
  const html = `
    <html>
      <head>
        <style>
          body { font-family: sans-serif; padding: 20px; color: #141F33; }
          h1 { border-bottom: 2px solid #2A5CFF; padding-bottom: 10px; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { border: 1px solid #E2E8F0; padding: 8px; text-align: left; }
          th { background-color: #F8F9FB; }
        </style>
      </head>
      <body>
        <h1>SAQYN RABT Audit Report</h1>
        <p>Generated on: ${new Date().toISOString()}</p>
        <p>Company ID: ${data.companyId || 'N/A'}</p>
        <h2>Usage Metrics</h2>
        <table>
          <tr><th>Metric</th><th>Count</th></tr>
          <tr><td>Total Questions</td><td>${data.totalQuestions || 0}</td></tr>
          <tr><td>Active Employees</td><td>${data.activeEmployees || 0}</td></tr>
          <tr><td>Indexed Documents</td><td>${data.activeDocuments || 0}</td></tr>
        </table>
      </body>
    </html>
  `;
  
  // Encodes string to ArrayBuffer for easy uploading to R2 bucket storage
  const encoder = new TextEncoder();
  return encoder.encode(html).buffer;
}
