/**
 * Sleek Nexus Creative — Backend API Server
 * Express + MongoDB + WebSocket
 */

'use strict';

const express      = require('express');
const mongoose     = require('mongoose');
const cors         = require('cors');
const helmet       = require('helmet');
const compression  = require('compression');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const http         = require('http');
const path         = require('path');
require('dotenv').config();

// ── Utilities & middleware ────────────────────────────────────────────────────
const { validateEnvironment, validateProduction } = require('./utils/config');
const {
  apiLimiter,
  authLimiter,
  contactLimiter,
  newsletterLimiter,
  uploadLimiter,
} = require('./utils/security');
const { errorHandler, notFound }          = require('./middleware/errorHandler');
const { requestLogger }                   = require('./middleware/logger');
const { requestContext }                  = require('./middleware/requestContext');
const { sanitizeInput }                   = require('./middleware/sanitize');
const RealtimeServer                      = require('./websocket/server');
const { version }                         = require('./package.json');

// Validate env vars before anything else
validateEnvironment();
validateProduction();

const app    = express();
const server = http.createServer(app);

// ── WebSocket ─────────────────────────────────────────────────────────────────
const realtimeServer = new RealtimeServer(server);

// ── Security headers ──────────────────────────────────────────────────────────
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc:  ["'self'"],
      scriptSrc:   ["'self'", 'https://www.google.com', 'https://www.gstatic.com'],
      styleSrc:    ["'self'", 'https://fonts.googleapis.com'],
      fontSrc:     ["'self'", 'https://fonts.gstatic.com'],
      imgSrc:      ["'self'", 'data:', 'https:'],
      connectSrc:  ["'self'", 'https:'],
      frameSrc:    ["'none'"],
      objectSrc:   ["'none'"],
    },
  },
  referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
  hsts: { maxAge: 31536000, includeSubDomains: true, preload: true },
  frameguard: { action: 'deny' },
  noSniff: true,
}));

// ── Compression & parsing ─────────────────────────────────────────────────────
app.use(compression());
app.use(cookieParser());
app.use(express.json({ limit: process.env.JSON_LIMIT || '10mb' }));
app.use(express.urlencoded({
  limit: process.env.URL_ENCODED_LIMIT || '10mb',
  extended: true,
}));

// ── Request correlation ID ────────────────────────────────────────────────────
app.use(requestContext);

// ── CORS ──────────────────────────────────────────────────────────────────────
const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(',').map((o) => o.trim())
  : ['http://localhost:3000', 'http://127.0.0.1:3000'];

app.use(cors({
  origin: (origin, cb) => {
    if (!origin || origin === 'null') return cb(null, true);
    if (/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(origin)) return cb(null, true);
    if (allowedOrigins.includes(origin)) return cb(null, true);
    return cb(new Error(`CORS: origin '${origin}' not allowed`));
  },
  credentials:         true,
  optionsSuccessStatus: 200,
  methods:             ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders:      ['Content-Type', 'Authorization', 'X-Request-Id'],
  exposedHeaders:      ['X-Request-Id'],
}));

// ── Sanitization ──────────────────────────────────────────────────────────────
app.use(mongoSanitize());   // NoSQL injection
app.use(sanitizeInput);     // XSS patterns

// ── Request logging ───────────────────────────────────────────────────────────
app.use(requestLogger);

// ── Static uploads ────────────────────────────────────────────────────────────
const uploadDir = path.resolve(process.env.UPLOAD_DIR || './uploads');
app.use('/uploads', express.static(uploadDir, {
  maxAge: '7d',
  etag:   true,
}));

// ── Rate limiting ─────────────────────────────────────────────────────────────
app.use('/api/', apiLimiter);
app.use('/api/auth/login',    authLimiter);
app.use('/api/auth/register', authLimiter);
app.use('/api/admin/login',   authLimiter);
app.use('/api/contact',       contactLimiter);
app.use('/api/newsletter',    newsletterLimiter);
app.use('/api/uploads',       uploadLimiter);

// ── Database ──────────────────────────────────────────────────────────────────
mongoose
  .connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/snc', {
    retryWrites:              true,
    w:                        'majority',
    maxPoolSize:              parseInt(process.env.MONGODB_POOL_SIZE, 10) || 10,
    serverSelectionTimeoutMS: parseInt(process.env.MONGODB_TIMEOUT, 10)  || 5000,
  })
  .then(() => {
    console.log('[OK] MongoDB connected');
    mountRoutes();
    startServer();
  })
  .catch((err) => {
    console.error('[ERROR] MongoDB connection failed:', err.message);
    process.exit(1);
  });

// ── Route mounting ────────────────────────────────────────────────────────────
function mountRoutes() {
  // Public
  app.use('/api/stats',      require('./routes/stats'));
  app.use('/api/courses',    require('./routes/courses'));
  app.use('/api/projects',   require('./routes/projects'));
  app.use('/api/impact',     require('./routes/impact'));
  app.use('/api/contact',    require('./routes/contact'));
  app.use('/api/newsletter', require('./routes/newsletter'));
  app.use('/api/jobs',       require('./routes/jobs'));
  app.use('/api/alumni',     require('./routes/alumni'));

  // Auth
  app.use('/api/auth',       require('./routes/auth'));
  app.use('/api/admin',      require('./routes/admin'));

  // Protected
  app.use('/api/analytics',  require('./routes/analytics'));
  app.use('/api/uploads',    require('./routes/uploads'));
  app.use('/api/payments',   require('./routes/payments'));

  // ── Health & meta ──────────────────────────────────────────────────────────
  app.get('/api/health', (_req, res) => res.json({
    success:   true,
    status:    'OK',
    uptime:    process.uptime(),
    timestamp: new Date().toISOString(),
  }));

  app.get('/api/ready', (_req, res) => {
    const ok   = mongoose.connection.readyState === 1;
    const code = ok ? 200 : 503;
    res.status(code).json({
      success:   ok,
      status:    ok ? 'READY' : 'NOT_READY',
      database:  { connected: ok, name: mongoose.connection.name },
      uptime:    process.uptime(),
      timestamp: new Date().toISOString(),
    });
  });

  app.get('/api/meta', (_req, res) => res.json({
    success:     true,
    app:         'snc-backend',
    version,
    environment: process.env.NODE_ENV,
    timestamp:   new Date().toISOString(),
  }));

  // WebSocket stats (admin-only in production — open here for simplicity)
  app.get('/api/ws/stats', (_req, res) => res.json({
    success: true,
    data:    realtimeServer.getStats(),
  }));

  // ── 404 & error handlers ───────────────────────────────────────────────────
  app.use(notFound);
  app.use(errorHandler);
}

// ── Server startup ────────────────────────────────────────────────────────────
function startServer() {
  const PORT = parseInt(process.env.PORT, 10) || 5000;
  const HOST = process.env.HOST || '0.0.0.0';

  server.listen(PORT, HOST, () => {
    console.log(`[INFO] Server  : http://${HOST}:${PORT}`);
    console.log(`[INFO] Env     : ${process.env.NODE_ENV}`);
    console.log(`[INFO] Version : ${version}`);
    console.log(`[INFO] WS      : ws://${HOST}:${PORT}/ws`);
  });

  // ── Graceful shutdown ──────────────────────────────────────────────────────
  const shutdown = (signal) => {
    console.log(`\n[INFO] ${signal} received — shutting down gracefully`);
    server.close(() => {
      mongoose.connection.close(false, () => {
        console.log('[INFO] Shutdown complete');
        process.exit(0);
      });
    });

    // Force exit after 10 s if graceful shutdown stalls
    setTimeout(() => {
      console.error('[ERROR] Forced shutdown after timeout');
      process.exit(1);
    }, 10_000).unref();
  };

  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT',  () => shutdown('SIGINT'));
}

// ── Global error handlers ─────────────────────────────────────────────────────
process.on('unhandledRejection', (reason) => {
  console.error('[ERROR] Unhandled rejection:', reason);
});

process.on('uncaughtException', (err) => {
  console.error('[ERROR] Uncaught exception:', err);
  process.exit(1);
});
