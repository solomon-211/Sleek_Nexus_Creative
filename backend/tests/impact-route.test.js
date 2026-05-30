/**
 * Impact Route — Integration Tests
 *
 * These tests use supertest against a real Express app instance.
 * MongoDB is mocked via a simple in-memory stub so no live DB is needed.
 *
 * Run: npm test
 */

'use strict';

const test    = require('node:test');
const assert  = require('node:assert/strict');
const express = require('express');

/* ── Minimal Impact model stub ── */
const STUB_METRICS = [
  { metric: 'youth_trained',       label: 'Youth Trained',         value: 10000, icon: 'users' },
  { metric: 'projects_completed',  label: 'Projects Completed',    value: 50,    icon: 'briefcase' },
  { metric: 'communities_reached', label: 'Communities Reached',   value: 30,    icon: 'map-pin' },
];

/* Patch the database models before requiring the route */
const Module = require('module');
const _orig  = Module._resolveFilename.bind(Module);

Module._resolveFilename = function (request, parent, isMain, options) {
  if (request === '../../database/models/index') {
    return request; // will be intercepted by require cache below
  }
  return _orig(request, parent, isMain, options);
};

require.cache['../../database/models/index'] = {
  id:       '../../database/models/index',
  filename: '../../database/models/index',
  loaded:   true,
  exports:  {
    Impact: {
      countDocuments: async () => STUB_METRICS.length,
      insertMany:     async () => {},
      find: () => ({
        sort:   () => ({ select: () => ({ lean: async () => STUB_METRICS }) }),
      }),
      findOneAndUpdate: async (_filter, update) => ({
        metric: _filter.metric,
        value:  update.$set.value,
        label:  'Updated',
      }),
      bulkWrite: async () => ({}),
    },
  },
};

/* Stub auth middleware so protected routes don't need a real JWT */
require.cache[require.resolve('../middleware/auth')] = {
  id:       require.resolve('../middleware/auth'),
  filename: require.resolve('../middleware/auth'),
  loaded:   true,
  exports:  {
    protect:    (_req, _res, next) => next(),
    restrictTo: (..._roles) => (_req, _res, next) => next(),
    adminOnly:  (_req, _res, next) => next(),
  },
};

/* Stub validation middleware */
require.cache[require.resolve('../middleware/validation')] = {
  id:       require.resolve('../middleware/validation'),
  filename: require.resolve('../middleware/validation'),
  loaded:   true,
  exports:  {
    handleValidationErrors: (_req, _res, next) => next(),
    validateLogin:          [(_req, _res, next) => next()],
  },
};

/* Stub errorHandler */
require.cache[require.resolve('../middleware/errorHandler')] = {
  id:       require.resolve('../middleware/errorHandler'),
  filename: require.resolve('../middleware/errorHandler'),
  loaded:   true,
  exports:  {
    asyncHandler: (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next),
    notFound:     (_req, res) => res.status(404).json({ error: 'Not found' }),
    errorHandler: (err, _req, res, _next) => res.status(500).json({ error: err.message }),
    AppError:     class AppError extends Error {
      constructor(msg, code) { super(msg); this.statusCode = code; }
    },
  },
};

const impactRouter = require('../routes/impact');

function buildApp() {
  const app = express();
  app.use(express.json());
  app.use('/api/impact', impactRouter);
  /* Simple error handler for tests */
  app.use((err, _req, res, _next) => {
    res.status(err.statusCode || 500).json({ success: false, error: err.message });
  });
  return app;
}

/* ── Tests ── */

test('GET /api/impact returns metrics array', async (t) => {
  const { default: supertest } = await import('supertest');
  const app = buildApp();

  const res = await supertest(app)
    .get('/api/impact')
    .expect('Content-Type', /json/)
    .expect(200);

  assert.equal(res.body.success, true, 'success should be true');
  assert.ok(Array.isArray(res.body.data), 'data should be an array');
  assert.ok(res.body.data.length > 0, 'data should not be empty');

  const sample = res.body.data[0];
  assert.equal(typeof sample.metric, 'string', 'metric should be a string');
  assert.equal(typeof sample.label,  'string', 'label should be a string');
  assert.equal(typeof sample.value,  'number', 'value should be a number');
});

test('GET /api/impact returns correct metric keys', async () => {
  const { default: supertest } = await import('supertest');
  const app = buildApp();

  const res = await supertest(app).get('/api/impact').expect(200);

  const metrics = res.body.data.map((m) => m.metric);
  assert.ok(metrics.includes('youth_trained'),       'should include youth_trained');
  assert.ok(metrics.includes('projects_completed'),  'should include projects_completed');
  assert.ok(metrics.includes('communities_reached'), 'should include communities_reached');
});

test('PUT /api/impact/:metric updates a metric', async () => {
  const { default: supertest } = await import('supertest');
  const app = buildApp();

  const res = await supertest(app)
    .put('/api/impact/youth_trained')
    .send({ value: 12000 })
    .expect('Content-Type', /json/)
    .expect(200);

  assert.equal(res.body.success, true);
  assert.ok(res.body.data, 'should return updated metric');
});

test('PUT /api/impact/:metric rejects non-numeric value', async () => {
  const { default: supertest } = await import('supertest');
  const app = buildApp();

  const res = await supertest(app)
    .put('/api/impact/youth_trained')
    .send({ value: 'not-a-number' })
    .expect(400);

  assert.equal(res.body.success, false);
});
