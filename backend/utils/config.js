/**
 * Environment Configuration Validator
 * Called at startup — exits the process if required vars are missing.
 */

'use strict';

const REQUIRED = [
  'NODE_ENV',
  'PORT',
  'MONGODB_URI',
  'JWT_SECRET',
  'CORS_ORIGIN',
];

const PRODUCTION_REQUIRED = [
  'EMAIL_USER',
  'EMAIL_PASS',
  'ADMIN_EMAIL',
  'FRONTEND_URL',
];

/**
 * Validate required environment variables.
 * Exits with code 1 if any are missing.
 */
function validateEnvironment() {
  const missing = REQUIRED.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    console.error(
      `[ERROR] Missing required environment variables: ${missing.join(', ')}\n` +
      '        Copy backend/.env.example to backend/.env and fill in the values.'
    );
    process.exit(1);
  }

  console.log('[OK] Environment variables validated');
}

/**
 * Additional checks for production deployments.
 * Warns (does not exit) for missing optional production vars.
 * Exits if JWT_SECRET is too short.
 */
function validateProduction() {
  if (process.env.NODE_ENV !== 'production') return;

  // JWT must be strong in production
  if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
    console.error('[ERROR] JWT_SECRET must be at least 32 characters in production.');
    process.exit(1);
  }

  // Warn about missing-but-optional production vars
  const missing = PRODUCTION_REQUIRED.filter((key) => !process.env[key]);
  if (missing.length > 0) {
    console.warn(
      `[WARN] Missing recommended production variables: ${missing.join(', ')}`
    );
  }

  // Warn if using default/placeholder values
  if (process.env.JWT_SECRET === 'replace_with_a_64_char_random_hex_string') {
    console.error('[ERROR] JWT_SECRET is still set to the placeholder value. Change it before deploying.');
    process.exit(1);
  }
}

module.exports = { validateEnvironment, validateProduction };
