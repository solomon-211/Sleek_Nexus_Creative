/**
 * Public Stats Route
 * GET /api/stats — returns live impact metrics for the homepage counter section.
 * Results are cached in-memory for 5 minutes to avoid hammering the DB on every page load.
 */

const express = require('express')
const router  = express.Router()
const {
  Newsletter,
  Contact,
  JobApplication,
  Project,
  Impact,
} = require('../../database/models/index')
const { asyncHandler } = require('../middleware/errorHandler')

/* ── Simple in-process cache (5 min TTL) ── */
let _cache     = null
let _cacheTime = 0
const CACHE_TTL_MS = 5 * 60 * 1000

/* ── GET /api/stats ── */
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const now = Date.now()

    /* Serve from cache if still fresh */
    if (_cache && now - _cacheTime < CACHE_TTL_MS) {
      return res.json({ success: true, data: _cache, cached: true })
    }

    /* Fetch all counts in parallel */
    const [
      subscriberCount,
      contactCount,
      applicationCount,
      completedProjects,
      impactMetrics,
    ] = await Promise.all([
      Newsletter.countDocuments({ subscribed: true }),
      Contact.countDocuments(),
      JobApplication.countDocuments(),
      Project.countDocuments({ status: 'completed' }),
      Impact.find().select('metric value label icon').lean(),
    ])

    /* Build a metric map from the Impact collection */
    const metricMap = {}
    impactMetrics.forEach((m) => { metricMap[m.metric] = m.value })

    const stats = {
      /* Live DB counts */
      subscribers:       subscriberCount,
      inquiries:         contactCount,
      applications:      applicationCount,
      completedProjects,

      /* From Impact collection (admin-managed) with sensible fallbacks */
      youthTrained:       metricMap.youth_trained        ?? 10000,
      projectsCompleted:  metricMap.projects_completed   ?? completedProjects || 50,
      communitiesReached: metricMap.communities_reached  ?? 30,
      jobsCreated:        metricMap.jobs_created         ?? 500,
      coursesDelivered:   metricMap.courses_delivered    ?? 45,
      partners:           metricMap.partners             ?? 30,
      countriesReached:   metricMap.countries_reached    ?? 5,
      studentsEnrolled:   metricMap.students_enrolled    ?? 10000,

      /* Computed / static */
      yearsActive: new Date().getFullYear() - 2019,
      uptimeSla:   '99.9%',
    }

    /* Store in cache */
    _cache     = stats
    _cacheTime = now

    res.json({ success: true, data: stats, cached: false })
  })
)

module.exports = router
