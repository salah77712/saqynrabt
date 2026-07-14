export async function generateEmailAutoreply(
  incomingSubject: string,
  incomingBody: string
): Promise<{ subject: string; body: string }> {
  if (!incomingSubject) {
    throw new Error('Incoming subject is required');
  }
  if (!incomingBody) {
    throw new Error('Incoming body is required');
  }

  const responseSubject = `Re: ${incomingSubject}`;
  const preview = incomingBody.length > 100 ? `${incomingBody.slice(0, 100)}...` : incomingBody;

  const responseBody = [
    'Dear customer,',
    '',
    'Thank you for contacting our customer support team.',
    `We have registered your inquiry: "${preview}".`,
    '',
    'Our staff is currently evaluating your request and will follow up shortly.',
    '',
    'Best regards,',
    'Customer Success Operations',
  ].join('\n');

  return { subject: responseSubject, body: responseBody };
}
