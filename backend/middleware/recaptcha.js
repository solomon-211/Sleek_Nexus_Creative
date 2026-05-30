/**
 * reCAPTCHA v3 Verification Middleware
 * Skipped automatically in test/development when no token is provided.
 */

const https = require('https')

/**
 * Verify a reCAPTCHA v3 token against Google's API.
 * @param {string} token
 * @param {string} ip
 * @returns {Promise<{success: boolean, score: number}>}
 */
function verifyToken(token, ip) {
  return new Promise((resolve, reject) => {
    const secret = process.env.RECAPTCHA_SECRET_KEY
    const params = new URLSearchParams({
      secret,
      response: token,
      remoteip: ip || '',
    })

    const options = {
      hostname: 'www.google.com',
      path:     `/recaptcha/api/siteverify?${params.toString()}`,
      method:   'POST',
      timeout:  5000,
    }

    const req = https.request(options, (res) => {
      let data = ''
      res.on('data', (chunk) => { data += chunk })
      res.on('end', () => {
        try {
          resolve(JSON.parse(data))
        } catch {
          reject(new Error('Invalid reCAPTCHA response'))
        }
      })
    })

    req.on('timeout', () => {
      req.destroy()
      reject(new Error('reCAPTCHA request timed out'))
    })

    req.on('error', reject)
    req.end()
  })
}

/**
 * Express middleware — attaches to any route that needs bot protection.
 * Minimum score threshold is configurable via RECAPTCHA_MIN_SCORE env var (default 0.5).
 */
async function verifyRecaptcha(req, res, next) {
  const env = process.env.NODE_ENV

  /* Skip in test environment entirely */
  if (env === 'test') return next()

  const token = req.body?.recaptcha_token

  /* In development, skip if no token is provided (allows Postman/curl testing) */
  if (env === 'development' && !token) {
    return next()
  }

  if (!token) {
    return res.status(400).json({
      success: false,
      error:   'reCAPTCHA token is required.',
    })
  }

  if (!process.env.RECAPTCHA_SECRET_KEY) {
    console.warn('[reCAPTCHA] RECAPTCHA_SECRET_KEY not set — skipping verification.')
    return next()
  }

  try {
    const result    = await verifyToken(token, req.ip)
    const minScore  = parseFloat(process.env.RECAPTCHA_MIN_SCORE) || 0.5

    if (!result.success || result.score < minScore) {
      return res.status(400).json({
        success: false,
        error:   'reCAPTCHA verification failed. Please try again.',
      })
    }

    /* Attach score to request for downstream logging */
    req.recaptchaScore = result.score
    next()
  } catch (err) {
    /* On network error, log and allow through — don't block legitimate users */
    console.error('[reCAPTCHA] Verification error:', err.message)
    next()
  }
}

module.exports = { verifyRecaptcha }
