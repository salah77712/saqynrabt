import { Resend } from 'resend';

export async function sendEmail(to: string, subject: string, html: string) {
  const apiKey = process.env.EMAIL_API_KEY;
  if (!apiKey) {
    console.error("Missing EMAIL_API_KEY. Cannot send email.");
    return;
  }
  const resend = new Resend(apiKey);
  await resend.emails.send({
    from: 'SAQYN RABT <notifications@saqynrabt.com>',
    to: [to],
    subject: subject,
    html: html,
  });
}
