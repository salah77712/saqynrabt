/**
 * Redacts emails and phone numbers from user queries (PII Isolation compliance)
 */
export function redactPII(text: string): string {
  let redacted = text;

  // Mask Emails
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
  redacted = redacted.replace(emailRegex, '[REDACTED_EMAIL]');

  // Mask Qatar/Universal Phone Numbers (matches 8+ digits)
  const phoneRegex = /(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4,5}/g;
  redacted = redacted.replace(phoneRegex, '[REDACTED_PHONE]');

  return redacted;
}
