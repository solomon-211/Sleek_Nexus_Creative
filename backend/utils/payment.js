/**
 * Stripe Payment Integration
 * Handles payment processing, webhooks, and subscriptions
 */

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

class PaymentService {
  /**
   * Create payment intent
   */
  static async createPaymentIntent(amount, currency = 'usd', metadata = {}) {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Convert to cents
        currency,
        metadata,
        automatic_payment_methods: {
          enabled: true,
        },
      });

      return {
        success: true,
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
      };
    } catch (error) {
      console.error('Error creating payment intent:', error);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  /**
   * Retrieve payment intent
   */
  static async getPaymentIntent(paymentIntentId) {
    try {
      const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
      return {
        success: true,
        status: paymentIntent.status,
        amount: paymentIntent.amount / 100,
        currency: paymentIntent.currency,
        metadata: paymentIntent.metadata,
      };
    } catch (error) {
      console.error('Error retrieving payment intent:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Create customer
   */
  static async createCustomer(email, name, metadata = {}) {
    try {
      const customer = await stripe.customers.create({
        email,
        name,
        metadata,
      });

      return {
        success: true,
        customerId: customer.id,
      };
    } catch (error) {
      console.error('Error creating customer:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Create subscription
   */
  static async createSubscription(customerId, priceId, metadata = {}) {
    try {
      const subscription = await stripe.subscriptions.create({
        customer: customerId,
        items: [{ price: priceId }],
        metadata,
      });

      return {
        success: true,
        subscriptionId: subscription.id,
        status: subscription.status,
      };
    } catch (error) {
      console.error('Error creating subscription:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Cancel subscription
   */
  static async cancelSubscription(subscriptionId) {
    try {
      const subscription = await stripe.subscriptions.del(subscriptionId);

      return {
        success: true,
        status: subscription.status,
      };
    } catch (error) {
      console.error('Error canceling subscription:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Create product
   */
  static async createProduct(name, description, metadata = {}) {
    try {
      const product = await stripe.products.create({
        name,
        description,
        metadata,
      });

      return {
        success: true,
        productId: product.id,
      };
    } catch (error) {
      console.error('Error creating product:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Create price for product
   */
  static async createPrice(productId, amount, currency = 'usd', recurring = null) {
    try {
      const priceData = {
        product: productId,
        unit_amount: Math.round(amount * 100),
        currency,
      };

      if (recurring) {
        priceData.recurring = {
          interval: recurring.interval, // 'day', 'week', 'month', 'year'
          interval_count: recurring.intervalCount || 1,
        };
      }

      const price = await stripe.prices.create(priceData);

      return {
        success: true,
        priceId: price.id,
      };
    } catch (error) {
      console.error('Error creating price:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Verify webhook signature
   */
  static verifyWebhook(body, signature) {
    try {
      const event = stripe.webhooks.constructEvent(
        body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      );

      return {
        valid: true,
        event,
      };
    } catch (error) {
      console.error('Webhook signature verification failed:', error);
      return {
        valid: false,
        error: error.message,
      };
    }
  }

  /**
   * Handle webhook events
   */
  static handleWebhookEvent(event) {
    const handlers = {
      'payment_intent.succeeded': this.handlePaymentSucceeded,
      'payment_intent.payment_failed': this.handlePaymentFailed,
      'customer.subscription.created': this.handleSubscriptionCreated,
      'customer.subscription.deleted': this.handleSubscriptionDeleted,
      'invoice.payment_succeeded': this.handleInvoicePaid,
      'invoice.payment_failed': this.handleInvoiceFailed,
    };

    const handler = handlers[event.type];
    if (handler) {
      handler(event.data.object);
    } else {
      console.warn(`Unhandled webhook event type: ${event.type}`);
    }
  }

  static handlePaymentSucceeded(data) {
    console.log('[OK] Payment succeeded:', data.id);
    // Update order status in your database
  }

  static handlePaymentFailed(data) {
    console.error('[ERROR] Payment failed:', data.id);
    // Send email notification to user
  }

  static handleSubscriptionCreated(data) {
    console.log('[OK] Subscription created:', data.id);
    // Record subscription in your database
  }

  static handleSubscriptionDeleted(data) {
    console.log('[ERROR] Subscription deleted:', data.id);
    // Update user subscription status
  }

  static handleInvoicePaid(data) {
    console.log('[OK] Invoice paid:', data.id);
  }

  static handleInvoiceFailed(data) {
    console.error('[ERROR] Invoice failed:', data.id);
  }
}

module.exports = PaymentService;
