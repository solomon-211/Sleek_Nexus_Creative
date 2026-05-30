/**
 * Security Utilities — Rate Limiters
 * All limiters return structured JSON so the frontend can handle them consistently.
 */

const rateLimit = require('express-rate-limit')

/* ── Shared handler ── */
function makeHandler(message) {
  return (req, res) => {
    res.status(429).json({
      success:   false,
      error:     message,
      retryAfter: Math.ceil(req.rateLimit?.resetTime
        ? (req.rateLimit.resetTime - Date.now()) / 1000
        : 60),
    })
  }
}

/* ── General API limiter — 100 req / 15 min ── */
const apiLimiter = rateLimit({
  windowMs:        parseInt(process.env.RATE_LIMIT_WINDOW_MS, 10) || 15 * 60 * 1000,
  max:             parseInt(process.env.RATE_LIMIT_MAX_REQUESTS, 10) || 100,
  standardHeaders: true,
  legacyHeaders:   false,
  handler:         makeHandler('Too many requests. Please try again in a few minutes.'),
  skip: (req) => {
    /* Never rate-limit health checks */
    return req.path === '/api/health' || req.path === '/api/ready'
  },
})

/* ── Auth limiter — 5 attempts / 15 min (skip on success) ── */
const authLimiter = rateLimit({
  windowMs:               15 * 60 * 1000,
  max:                    5,
  skipSuccessfulRequests: true,
  standardHeaders:        true,
  legacyHeaders:          false,
  handler:                makeHandler('Too many login attempts. Please wait 15 minutes before trying again.'),
})

/* ── Contact / form limiter — 10 submissions / hour ── */
const contactLimiter = rateLimit({
  windowMs:        60 * 60 * 1000,
  max:             10,
  standardHeaders: true,
  legacyHeaders:   false,
  handler:         makeHandler('Too many form submissions. Please wait before submitting again.'),
})

/* ── Newsletter limiter — 5 subscriptions / hour per IP ── */
const newsletterLimiter = rateLimit({
  windowMs:        60 * 60 * 1000,
  max:             5,
  standardHeaders: true,
  legacyHeaders:   false,
  handler:         makeHandler('Too many subscription attempts. Please try again later.'),
})

/* ── Upload limiter — 20 uploads / hour ── */
const uploadLimiter = rateLimit({
  windowMs:        60 * 60 * 1000,
  max:             20,
  standardHeaders: true,
  legacyHeaders:   false,
  handler:         makeHandler('Upload limit reached. Please try again later.'),
})

module.exports = {
  apiLimiter,
  authLimiter,
  contactLimiter,
  newsletterLimiter,
  uploadLimiter,
}
