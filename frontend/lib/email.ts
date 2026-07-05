import { Resend } from 'resend';
const resend = new Resend(process.env.EMAIL_API_KEY);

export async function sendEmail(to: string, subject: string, html: string) {
  await resend.emails.send({
    from: 'SAQYN RABT <notifications@saqynrabt.com>',
    to: [to],
    subject: subject,
    html: html,
  });
}
