import Stripe from 'stripe';

/**
 * Creates a Stripe checkout session for plan pricing upgrades
 */
export async function createStripeCheckoutSession(
  env: any,
  companyId: string,
  priceId: string,
  customerEmail: string
): Promise<string | null> {
  const stripeSecret = env.STRIPE_SECRET_KEY;
  if (!stripeSecret) {
    console.warn('STRIPE_SECRET_KEY not set - falling back to simulated session checkout');
    return 'https://checkout.stripe.com/pay/mock_session_salah';
  }

  const stripe = new Stripe(stripeSecret, {
    apiVersion: '2023-10-16',
  });

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      mode: 'subscription',
      success_url: 'https://saqynrabt.com/dashboard/settings?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'https://saqynrabt.com/pricing',
      customer_email: customerEmail,
      metadata: { company_id: companyId }
    });

    return session.url;
  } catch (err) {
    console.error('Stripe Checkout creation failed:', err);
    return null;
  }
}

/**
 * Stripe Webhook signature verification and event router
 */
export async function handleStripeWebhook(
  env: any,
  bodyText: string,
  signature: string,
  sql: any
): Promise<{ success: boolean; error?: string }> {
  const stripeSecret = env.STRIPE_SECRET_KEY;
  const webhookSecret = env.STRIPE_WEBHOOK_SECRET;

  if (!stripeSecret || !webhookSecret) {
    console.warn('Stripe secrets unconfigured, skipping signature validation for testing.');
    return { success: true }; // Bypassed for demo deployments
  }

  const stripe = new Stripe(stripeSecret, {
    apiVersion: '2023-10-16',
  });

  try {
    const event = stripe.webhooks.constructEvent(bodyText, signature, webhookSecret);
    
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      const companyId = session.metadata?.company_id;
      const stripeCustomerId = session.customer as string;
      const stripeSubscriptionId = session.subscription as string;

      if (companyId) {
        // Update company plan status in Postgres
        await sql`
          UPDATE company_entitlements
          SET subscription_status = 'active',
              stripe_customer_id = ${stripeCustomerId},
              stripe_subscription_id = ${stripeSubscriptionId}
          WHERE company_id = ${companyId}
        `;
      }
    }

    return { success: true };
  } catch (err: any) {
    console.error('Stripe webhook handling failure:', err);
    return { success: false, error: err.message };
  }
}
