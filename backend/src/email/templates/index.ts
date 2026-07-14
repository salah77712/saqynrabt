/**
 * Transactional Email Dispatcher for Resend or Sendgrid
 */
export async function sendTransactionalEmail(
  env: any,
  to: string,
  subject: string,
  htmlContent: string
): Promise<boolean> {
  const apiKey = env.EMAIL_API_KEY;
  if (!apiKey) {
    console.warn('EMAIL_API_KEY is not configured - logging email body locally:', { to, subject });
    return true; // Graceful offline debug fallback
  }

  try {
    // Send email using Resend API
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'SAQYN RABT <alerts@saqynrabt.com>',
        to: [to],
        subject: subject,
        html: htmlContent
      })
    });

    return response.ok;
  } catch (err) {
    console.error('Failed to send transactional email via Resend:', err);
    return false;
  }
}

/**
 * Dispatch welcome onboarding email
 */
export async function sendWelcomeEmail(env: any, email: string, name: string): Promise<boolean> {
  const body = `
    <h1>Welcome to SAQYN RABT, ${name}!</h1>
    <p>Your private AI operations dashboard is now ready. Start by uploading SOP documents and inviting your team.</p>
    <a href="https://saqynrabt.com/dashboard">Go to Dashboard</a>
  `;
  return sendTransactionalEmail(env, email, 'Welcome to SAQYN RABT', body);
}

/**
 * Dispatch limit warning alerts (80%)
 */
export async function sendOverageWarningEmail(env: any, email: string, usedPercent: number): Promise<boolean> {
  const body = `
    <h1>Usage Warning - Limits at ${usedPercent}%</h1>
    <p>Your company has used ${usedPercent}% of your allowed text queries. Toggle auto-overage in Settings to avoid pauses.</p>
    <a href="https://saqynrabt.com/dashboard/settings">View Usage Settings</a>
  `;
  return sendTransactionalEmail(env, email, 'Warning: Approaching Plan Limits', body);
}
