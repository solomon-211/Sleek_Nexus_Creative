/**
 * Request Logger Middleware
 * Thin wrapper — delegates to utils/logger.js (single source of truth).
 */

'use strict';

const logger = require('../utils/logger');

/**
 * Logs every incoming request and its response status + duration.
 * Skips health-check endpoints to avoid log noise.
 */
function requestLogger(req, res, next) {
  const SKIP = new Set(['/api/health', '/api/ready']);
  if (SKIP.has(req.path)) return next();

  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    const level    = res.statusCode >= 500 ? 'error'
                   : res.statusCode >= 400 ? 'warn'
                   : 'http';

    logger[level](`${req.method} ${req.originalUrl} ${res.statusCode}`, {
      requestId:  req.requestId,
      method:     req.method,
      url:        req.originalUrl,
      status:     res.statusCode,
      duration:   `${duration}ms`,
      ip:         req.ip,
      userAgent:  req.get('user-agent') || '',
      userId:     req.user?.id || 'anon',
    });
  });

  next();
}

module.exports = { requestLogger, logger };
