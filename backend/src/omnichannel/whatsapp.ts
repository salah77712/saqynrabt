/**
 * WhatsApp Integration Gateway (Twilio endpoint)
 */
export async function handleWhatsAppIncoming(
  request: Request,
  env: any,
  sql: any
): Promise<Response> {
  try {
    const formData = await request.formData();
    const from = formData.get('From')?.toString() || '';
    const body = formData.get('Body')?.toString() || '';

    console.log(`[WhatsApp Incoming] Message from ${from}: "${body}"`);

    // Fetch answer from chatbot RAG (simulated)
    const replyMessage = `Hello from SAQYN. You asked: "${body}". We are processing your request.`;

    // Dispatch reply using Twilio API (XML format)
    const xmlResponse = `
      <Response>
        <Message>${replyMessage}</Message>
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
