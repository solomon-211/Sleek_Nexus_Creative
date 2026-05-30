/**
 * Payment Routes Example
 * Shows how to integrate Stripe payments into your API
 */

const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { cacheMiddleware } = require('../middleware/cache');
const { asyncHandler } = require('../middleware/errorHandler');
const PaymentService = require('../utils/payment');

/**
 * POST /api/payments/create-intent
 * Create a payment intent for checkout
 */
router.post(
  '/create-intent',
  protect,
  asyncHandler(async (req, res) => {
    const { amount, currency, metadata } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: 'Invalid amount' });
    }

    const result = await PaymentService.createPaymentIntent(
      amount,
      currency || 'usd',
      { userId: req.user.id, ...metadata }
    );

    if (!result.success) {
      return res.status(400).json({ error: result.error });
    }

    res.json({
      success: true,
      clientSecret: result.clientSecret,
      paymentIntentId: result.paymentIntentId,
    });
  })
);

/**
 * GET /api/payments/:paymentIntentId
 * Get payment intent status
 */
router.get(
  '/:paymentIntentId',
  protect,
  cacheMiddleware(300), // Cache for 5 minutes
  asyncHandler(async (req, res) => {
    const result = await PaymentService.getPaymentIntent(req.params.paymentIntentId);

    if (!result.success) {
      return res.status(400).json({ error: result.error });
    }

    res.json(result);
  })
);

/**
 * POST /api/payments/webhook
 * Handle Stripe webhook events
 */
router.post('/webhook', express.raw({ type: 'application/json' }), (req, res) => {
  const sig = req.headers['stripe-signature'];

  const verification = PaymentService.verifyWebhook(req.body, sig);

  if (!verification.valid) {
    return res.status(400).json({ error: 'Invalid signature' });
  }

  PaymentService.handleWebhookEvent(verification.event);

  res.json({ received: true });
});

/**
 * POST /api/payments/subscribe
 * Create a subscription
 */
router.post(
  '/subscribe',
  protect,
  asyncHandler(async (req, res) => {
    const { priceId, planName } = req.body;

    if (!priceId) {
      return res.status(400).json({ error: 'Price ID required' });
    }

    // Create or get Stripe customer
    const customerResult = await PaymentService.createCustomer(
      req.user.email,
      req.user.name,
      { userId: req.user.id }
    );

    if (!customerResult.success) {
      return res.status(400).json({ error: customerResult.error });
    }

    // Create subscription
    const subscriptionResult = await PaymentService.createSubscription(
      customerResult.customerId,
      priceId,
      { planName }
    );

    if (!subscriptionResult.success) {
      return res.status(400).json({ error: subscriptionResult.error });
    }

    res.json({
      success: true,
      subscriptionId: subscriptionResult.subscriptionId,
      status: subscriptionResult.status,
    });
  })
);

module.exports = router;
