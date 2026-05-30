/**
 * Impact Metrics Routes
 * GET  /api/impact        — public, returns all metrics
 * PUT  /api/impact/:metric — admin only, update a single metric
 * POST /api/impact/bulk   — admin only, bulk update
 */

const express = require('express')
const router  = express.Router()
const { body, param } = require('express-validator')
const { Impact } = require('../../database/models/index')
const { protect, restrictTo } = require('../middleware/auth')
const { handleValidationErrors } = require('../middleware/validation')
const { asyncHandler } = require('../middleware/errorHandler')

/* ── Seed defaults if the collection is empty ── */
const DEFAULT_METRICS = [
  { metric: 'youth_trained',        label: 'Youth Trained',         value: 10000, icon: 'users' },
  { metric: 'projects_completed',   label: 'Projects Completed',    value: 50,    icon: 'briefcase' },
  { metric: 'communities_reached',  label: 'Communities Reached',   value: 30,    icon: 'map-pin' },
  { metric: 'jobs_created',         label: 'Jobs Created',          value: 500,   icon: 'trending-up' },
  { metric: 'courses_delivered',    label: 'Courses Delivered',     value: 45,    icon: 'book-open' },
  { metric: 'partners',             label: 'Partner Organizations', value: 30,    icon: 'handshake' },
  { metric: 'countries_reached',    label: 'Countries Reached',     value: 5,     icon: 'globe' },
  { metric: 'students_enrolled',    label: 'Students Enrolled',     value: 10000, icon: 'graduation-cap' },
]

async function ensureDefaults() {
  const count = await Impact.countDocuments()
  if (count === 0) {
    await Impact.insertMany(DEFAULT_METRICS)
  }
}

/* ── GET / — public ── */
router.get(
  '/',
  asyncHandler(async (req, res) => {
    await ensureDefaults()

    const metrics = await Impact.find()
      .sort({ metric: 1 })
      .select('-__v -updatedBy')
      .lean()

    res.json({ success: true, data: metrics })
  })
)

/* ── PUT /:metric — admin only ── */
router.put(
  '/:metric',
  protect,
  restrictTo('admin'),
  [
    param('metric').trim().notEmpty().withMessage('Metric name is required'),
    body('value').isNumeric().withMessage('Value must be a number'),
    body('label').optional().trim().isLength({ max: 100 }),
    handleValidationErrors,
  ],
  asyncHandler(async (req, res) => {
    const { value, label, labelAr, icon } = req.body

    const update = {
      value: Number(value),
      updatedBy: req.user._id,
    }
    if (label)   update.label   = label
    if (labelAr) update.labelAr = labelAr
    if (icon)    update.icon    = icon

    /* Push to history array */
    const metric = await Impact.findOneAndUpdate(
      { metric: req.params.metric },
      {
        $set: update,
        $push: { history: { value: Number(value), recordedAt: new Date() } },
      },
      { new: true, upsert: true, runValidators: true }
    )

    res.json({ success: true, data: metric })
  })
)

/* ── POST /bulk — admin only ── */
router.post(
  '/bulk',
  protect,
  restrictTo('admin'),
  [
    body('metrics').isArray({ min: 1 }).withMessage('metrics must be a non-empty array'),
    body('metrics.*.metric').notEmpty().withMessage('Each metric must have a metric key'),
    body('metrics.*.value').isNumeric().withMessage('Each metric must have a numeric value'),
    handleValidationErrors,
  ],
  asyncHandler(async (req, res) => {
    const { metrics } = req.body

    const ops = metrics.map(({ metric, value, label, labelAr, icon }) => ({
      updateOne: {
        filter: { metric },
        update: {
          $set: {
            value: Number(value),
            ...(label   && { label }),
            ...(labelAr && { labelAr }),
            ...(icon    && { icon }),
            updatedBy: req.user._id,
          },
          $push: { history: { value: Number(value), recordedAt: new Date() } },
        },
        upsert: true,
      },
    }))

    await Impact.bulkWrite(ops)

    const updated = await Impact.find().sort({ metric: 1 }).lean()
    res.json({ success: true, data: updated })
  })
)

module.exports = router
