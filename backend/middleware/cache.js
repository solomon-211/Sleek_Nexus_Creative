/**
 * Enhanced Caching Middleware
 * Implements Redis-like server-side caching for API responses
 */

const NodeCache = require('node-cache');

// Create cache instance with configurable TTL
const cache = new NodeCache({ 
  stdTTL: 600, // 10 minutes default TTL
  checkperiod: 120, // Check for expired keys every 2 minutes
});

/**
 * Cache key generator
 */
const generateCacheKey = (req) => {
  const userId = req.user?.id || 'anonymous';
  return `${userId}:${req.method}:${req.originalUrl}`;
};

/**
 * Cache middleware for GET requests
 */
const cacheMiddleware = (ttl = 600) => {
  return (req, res, next) => {
    // Only cache GET requests
    if (req.method !== 'GET') {
      return next();
    }

    const cacheKey = generateCacheKey(req);

    // Check if response exists in cache
    const cachedResponse = cache.get(cacheKey);
    if (cachedResponse) {
      console.log(`[CACHE HIT] ${cacheKey}`);
      return res.json(cachedResponse);
    }

    // Capture original send method
    const originalSend = res.json;

    res.json = function (data) {
      // Cache the response before sending
      if (res.statusCode === 200) {
        cache.set(cacheKey, data, ttl);
        console.log(`[CACHE SET] ${cacheKey} (TTL: ${ttl}s)`);
      }

      return originalSend.call(this, data);
    };

    next();
  };
};

/**
 * Cache invalidation helper
 */
const invalidateCache = (pattern = null) => {
  if (!pattern) {
    cache.flushAll();
    console.log('[CACHE] All cache cleared');
    return;
  }

  const keys = cache.keys();
  const regex = new RegExp(pattern);
  keys.forEach((key) => {
    if (regex.test(key)) {
      cache.del(key);
      console.log(`[CACHE] Invalidated: ${key}`);
    }
  });
};

/**
 * Clear cache on modification endpoints
 */
const clearCacheOnModify = (req, res, next) => {
  const originalSend = res.json;

  res.json = function (data) {
    // Clear relevant caches on POST, PUT, DELETE, PATCH
    if (['POST', 'PUT', 'DELETE', 'PATCH'].includes(req.method)) {
      const pattern = `.*:\\${req.path}\.*`;
      invalidateCache(pattern);
    }

    return originalSend.call(this, data);
  };

  next();
};

module.exports = {
  cache,
  cacheMiddleware,
  invalidateCache,
  clearCacheOnModify,
};
