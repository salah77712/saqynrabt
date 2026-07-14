/**
 * SMS Webhook Gateway
 */
export async function handleSMSIncoming(
  request: Request,
  env: any,
  sql: any
): Promise<Response> {
  try {
    const formData = await request.formData();
    const from = formData.get('From')?.toString() || '';
    const body = formData.get('Body')?.toString() || '';

    console.log(`[SMS Incoming] Message from ${from}: "${body}"`);

    const xmlResponse = `
      <Response>
        <Message>SAQYN Response: Thank you for your inquiry.</Message>
      </Response>
    `;

    return new Response(xmlResponse, {
      status: 200,
      headers: { 'Content-Type': 'application/xml' }
    });
  } catch (err: any) {
    return new Response(`<Response><Message>Error: ${err.message}</Message></Response>`, {
      status: 500,
      headers: { 'Content-Type': 'application/xml' }
    });
  }
}
