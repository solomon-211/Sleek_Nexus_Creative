/**
 * Input Sanitization Middleware
 * Strips dangerous HTML/script patterns from all string inputs.
 * Works on req.body, req.query, and req.params.
 *
 * Note: express-mongo-sanitize (already in server.js) handles NoSQL injection.
 * This middleware handles XSS patterns.
 */

/* Patterns that indicate XSS attempts */
const XSS_PATTERNS = [
  /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
  /javascript\s*:/gi,
  /on\w+\s*=\s*["']?[^"'>]*/gi,
  /<\s*iframe[^>]*>/gi,
  /<\s*object[^>]*>/gi,
  /<\s*embed[^>]*>/gi,
  /data\s*:\s*text\/html/gi,
  /vbscript\s*:/gi,
]

/**
 * Sanitize a single string value.
 */
function sanitizeString(value) {
  if (typeof value !== 'string') return value
  let sanitized = value.trim()
  for (const pattern of XSS_PATTERNS) {
    sanitized = sanitized.replace(pattern, '')
  }
  return sanitized
}

/**
 * Recursively sanitize an object's string values.
 * Handles nested objects and arrays.
 */
function sanitizeValue(value) {
  if (typeof value === 'string') return sanitizeString(value)
  if (Array.isArray(value))      return value.map(sanitizeValue)
  if (value !== null && typeof value === 'object') {
    const result = {}
    for (const [k, v] of Object.entries(value)) {
      result[k] = sanitizeValue(v)
    }
    return result
  }
  return value
}

/**
 * Express middleware — mutates req.body, req.query, req.params in place.
 */
function sanitizeInput(req, res, next) {
  if (req.body   && typeof req.body   === 'object') req.body   = sanitizeValue(req.body)
  if (req.query  && typeof req.query  === 'object') req.query  = sanitizeValue(req.query)
  if (req.params && typeof req.params === 'object') req.params = sanitizeValue(req.params)
  next()
}

module.exports = { sanitizeInput, sanitizeString, sanitizeValue }
