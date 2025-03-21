import Stripe from 'stripe';

// Initialize Stripe with the secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: '2023-10-16', // Specify the Stripe API version
});

// Define the service tiers
export const serviceTiers = {
  basic: {
    id: 'basic',
    name: 'Basic Plan',
    description: 'Essential AI tools for small businesses',
    price: 199, // $199 USD
    features: ['Email Automation', 'Basic AI Messaging', 'Weekly Analytics']
  },
  pro: {
    id: 'pro',
    name: 'Professional Plan',
    description: 'Advanced AI solutions for growing businesses',
    price: 399, // $399 USD
    features: ['Email Automation', 'Advanced AI Messaging', 'AI Call Bot', 'Daily Analytics', 'Priority Support']
  },
  enterprise: {
    id: 'enterprise',
    name: 'Enterprise Plan',
    description: 'Complete AI suite for large organizations',
    price: 799, // $799 USD
    features: ['Email Automation', 'Premium AI Messaging', 'AI Call Bot', 'AI Review Management', 'Custom Integrations', '24/7 Support', 'Dedicated Account Manager']
  }
};

export type ServiceTier = keyof typeof serviceTiers;

/**
 * Create a checkout session for a service subscription
 */
export async function createCheckoutSession(tier: ServiceTier, customerId?: string) {
  const planDetails = serviceTiers[tier];
  if (!planDetails) {
    throw new Error(`Invalid service tier: ${tier}`);
  }

  try {
    // Create a new checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: planDetails.name,
              description: planDetails.description,
            },
            unit_amount: planDetails.price * 100, // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment', // 'subscription' or 'payment'
      success_url: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/signup/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/pricing`,
      ...(customerId && { customer: customerId }),
    });

    return session;
  } catch (error) {
    console.error('Stripe checkout session creation error:', error);
    throw error;
  }
}

/**
 * Retrieve a checkout session by ID
 */
export async function getCheckoutSession(sessionId: string) {
  try {
    return await stripe.checkout.sessions.retrieve(sessionId);
  } catch (error) {
    console.error('Error retrieving checkout session:', error);
    throw error;
  }
}

/**
 * Create a new customer in Stripe
 */
export async function createCustomer(email: string, name?: string) {
  try {
    return await stripe.customers.create({
      email,
      name,
    });
  } catch (error) {
    console.error('Error creating Stripe customer:', error);
    throw error;
  }
}

/**
 * Create a payment intent for direct payment processing
 */
export async function createPaymentIntent(amount: number, currency: string = 'usd', customerId?: string) {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Convert to cents
      currency,
      ...(customerId && { customer: customerId }),
    });
    
    return paymentIntent;
  } catch (error) {
    console.error('Error creating payment intent:', error);
    throw error;
  }
}

/**
 * Validate the webhook signature to ensure it's from Stripe
 */
export function validateWebhookSignature(rawBody: Buffer, signature: string) {
  try {
    return stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET || ""
    );
  } catch (error) {
    console.error('Webhook signature verification failed:', error);
    throw error;
  }
}

export default {
  createCheckoutSession,
  getCheckoutSession,
  createCustomer,
  createPaymentIntent,
  validateWebhookSignature,
  serviceTiers
};