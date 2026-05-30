/**
 * Newsletter Routes
 * POST /api/newsletter/subscribe    — public
 * GET  /api/newsletter/unsubscribe  — public (token-based)
 * GET  /api/newsletter              — admin only
 * DELETE /api/newsletter/:id        — admin only
 */

const express  = require('express')
const router   = express.Router()
const crypto   = require('crypto')
const { body } = require('express-validator')
const { Newsletter } = require('../../database/models/index')
const { protect, restrictTo } = require('../middleware/auth')
const { handleValidationErrors } = require('../middleware/validation')
const { asyncHandler } = require('../middleware/errorHandler')

/* ── Validation ── */
const subscribeValidation = [
  body('email')
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage('A valid email address is required'),
  body('firstName').optional().trim().isLength({ max: 50 }),
  body('source')
    .optional()
    .isIn(['homepage', 'blog', 'course', 'footer', 'other'])
    .withMessage('Invalid source'),
  handleValidationErrors,
]

/* ── POST /subscribe ── */
router.post(
  '/subscribe',
  subscribeValidation,
  asyncHandler(async (req, res) => {
    const { email, firstName, source = 'homepage' } = req.body

    const existing = await Newsletter.findOne({ email })

    if (existing) {
      if (!existing.subscribed) {
        existing.subscribed      = true
        existing.subscribedAt    = new Date()
        existing.unsubscribedAt  = undefined
        await existing.save()
        return res.json({
          success: true,
          message: 'Welcome back! You have been resubscribed.',
        })
      }
      return res.status(409).json({
        success: false,
        error: 'This email is already subscribed.',
      })
    }

    /* Generate a unique unsubscribe token */
    const unsubscribeToken = crypto.randomBytes(32).toString('hex')

    await Newsletter.create({
      email,
      firstName,
      source,
      subscribed: true,
      unsubscribeToken,
    })

    res.status(201).json({
      success: true,
      message: 'You are now subscribed. Thank you!',
    })
  })
)

/* ── GET /unsubscribe?token=xxx ── */
router.get(
  '/unsubscribe',
  asyncHandler(async (req, res) => {
    const { token } = req.query

    if (!token) {
      return res.status(400).json({ success: false, error: 'Unsubscribe token is required.' })
    }

    const subscriber = await Newsletter.findOne({ unsubscribeToken: token })

    if (!subscriber) {
      return res.status(404).json({ success: false, error: 'Invalid or expired unsubscribe link.' })
    }

    subscriber.subscribed     = false
    subscriber.unsubscribedAt = new Date()
    await subscriber.save()

    res.json({ success: true, message: 'You have been unsubscribed successfully.' })
  })
)

/* ── GET / — admin: list all subscribers ── */
router.get(
  '/',
  protect,
  restrictTo('admin', 'editor'),
  asyncHandler(async (req, res) => {
    const { page = 1, limit = 50, subscribed } = req.query
    const parsedPage  = Math.max(1, parseInt(page, 10) || 1)
    const parsedLimit = Math.min(200, Math.max(1, parseInt(limit, 10) || 50))

    const query = {}
    if (subscribed !== undefined) query.subscribed = subscribed === 'true'

    const [subscribers, total] = await Promise.all([
      Newsletter.find(query)
        .sort({ subscribedAt: -1 })
        .skip((parsedPage - 1) * parsedLimit)
        .limit(parsedLimit)
        .select('-unsubscribeToken'),
      Newsletter.countDocuments(query),
    ])

    res.json({
      success: true,
      data: subscribers,
      pagination: {
        total,
        page: parsedPage,
        pages: Math.ceil(total / parsedLimit),
        limit: parsedLimit,
      },
    })
  })
)

/* ── DELETE /:id — admin only ── */
router.delete(
  '/:id',
  protect,
  restrictTo('admin'),
  asyncHandler(async (req, res) => {
    const subscriber = await Newsletter.findByIdAndDelete(req.params.id)
    if (!subscriber) {
      return res.status(404).json({ success: false, error: 'Subscriber not found.' })
    }
    res.json({ success: true, message: 'Subscriber removed.' })
  })
)

module.exports = router
