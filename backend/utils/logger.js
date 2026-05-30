/**
 * Logger — Sleek Nexus Creative
 * Structured JSON logger that writes to stdout and rotating log files.
 * Single source of truth — imported by both middleware and route handlers.
 */

'use strict';

const fs   = require('fs');
const path = require('path');

// ── Log directory ─────────────────────────────────────────────────────────────
const logsDir = path.resolve(__dirname, '../logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

const APP_LOG   = path.join(logsDir, 'app.log');
const ERROR_LOG = path.join(logsDir, 'error.log');

// ── Helpers ───────────────────────────────────────────────────────────────────
function formatEntry(level, message, data = {}) {
  return JSON.stringify({
    timestamp: new Date().toISOString(),
    level,
    message,
    ...data,
  });
}

function writeAsync(file, line) {
  fs.appendFile(file, line + '\n', (err) => {
    if (err) process.stderr.write(`[logger] write error: ${err.message}\n`);
  });
}

// ── Logger object ─────────────────────────────────────────────────────────────
const logger = {
  info(message, data = {}) {
    const line = formatEntry('INFO', message, data);
    process.stdout.write(line + '\n');
    writeAsync(APP_LOG, line);
  },

  warn(message, data = {}) {
    const line = formatEntry('WARN', message, data);
    process.stderr.write(line + '\n');
    writeAsync(APP_LOG, line);
  },

  error(message, data = {}) {
    const line = formatEntry('ERROR', message, data);
    process.stderr.write(line + '\n');
    writeAsync(APP_LOG,   line);
    writeAsync(ERROR_LOG, line);
  },

  debug(message, data = {}) {
    if (process.env.NODE_ENV !== 'development') return;
    const line = formatEntry('DEBUG', message, data);
    process.stdout.write(line + '\n');
    writeAsync(APP_LOG, line);
  },

  http(message, data = {}) {
    const line = formatEntry('HTTP', message, data);
    process.stdout.write(line + '\n');
    writeAsync(APP_LOG, line);
  },
};

module.exports = logger;
