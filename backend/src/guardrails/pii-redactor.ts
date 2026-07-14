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

  // Mask Credit Cards (Visa / Mastercard)
  const ccRegex = /\b(?:4\d{3}[-.\s]?\d{4}[-.\s]?\d{4}[-.\s]?\d{4}|5[1-5]\d{2}[-.\s]?\d{4}[-.\s]?\d{4}[-.\s]?\d{4})\b/g;
  redacted = redacted.replace(ccRegex, '[REDACTED_CC]');

  // Mask Qatar National ID (QID) — 11 digits starting with 2 or 3
  const qidRegex = /\b[23]\d{10}\b/g;
  redacted = redacted.replace(qidRegex, '[REDACTED_QID]');

  return redacted;
}
