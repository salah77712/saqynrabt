export async function handleWhatsAppIncoming(
  request: Request
): Promise<Response> {
  const xmlHeaders: Record<string, string> = { 'Content-Type': 'application/xml' };

  try {
    const contentType = request.headers.get('content-type') || '';
    if (!contentType.includes('application/x-www-form-urlencoded')) {
      return new Response(
        '<Response><Message>Invalid content type</Message></Response>',
        { status: 400, headers: xmlHeaders }
      );
    }

    const formData = await request.formData();
    const from = formData.get('From')?.toString() || '';
    const body = formData.get('Body')?.toString() || '';

    console.log(`[WhatsApp Incoming] Message from ${from}: "${body}"`);

    const replyMessage = `Hello from SAQYN. You asked: "${body}". We are processing your request.`;

    const xmlResponse = `<Response><Message>${replyMessage}</Message></Response>`;

    return new Response(xmlResponse, {
      status: 200,
      headers: xmlHeaders,
    });
  } catch (err) {
    console.error('[WhatsApp] Error processing incoming message:', err);
    return new Response(
      '<Response><Message>An error occurred processing your message</Message></Response>',
      { status: 500, headers: xmlHeaders }
    );
  }
}
