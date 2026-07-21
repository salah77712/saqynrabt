/**
 * Stripe billing is intentionally disabled during the pilot phase.
 * Real Stripe billing is planned for post-pilot (~2 months out).
 *
 * These stubs exist so any code that references them compiles cleanly.
 * They return a clear disabled message — never a mock checkout URL,
 * never a fake success response.
 */

export async function createStripeCheckoutSession(): Promise<null> {
  console.warn('Stripe checkout called during pilot — billing is disabled');
  return null;
}

export async function handleStripeWebhook(): Promise<{ success: boolean; error?: string }> {
  console.warn('Stripe webhook called during pilot — billing is disabled');
  return { success: false, error: 'Billing is disabled during pilot' };
}
