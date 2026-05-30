# ─────────────────────────────────────────────────────────────────────────────
# Stage 1 — deps: install production dependencies only
# ─────────────────────────────────────────────────────────────────────────────
FROM node:18-alpine AS deps

WORKDIR /app

# Copy manifests first for layer caching
COPY package*.json ./

# Install production deps only, clean cache
RUN npm ci --omit=dev && npm cache clean --force

# ─────────────────────────────────────────────────────────────────────────────
# Stage 2 — runner: lean production image
# ─────────────────────────────────────────────────────────────────────────────
FROM node:18-alpine AS runner

# Security: run as non-root
RUN addgroup -g 1001 -S nodejs \
 && adduser  -u 1001 -S nodejs -G nodejs

WORKDIR /app

# Copy installed modules from deps stage
COPY --from=deps --chown=nodejs:nodejs /app/node_modules ./node_modules

# Copy application source
COPY --chown=nodejs:nodejs . .

# Create writable directories
RUN mkdir -p logs uploads \
 && chmod 755 logs uploads \
 && chown -R nodejs:nodejs logs uploads

USER nodejs

# Health check — uses Node's built-in http module (no curl needed)
HEALTHCHECK --interval=30s --timeout=10s --start-period=15s --retries=3 \
  CMD node -e "\
    const h = require('http'); \
    h.get('http://localhost:' + (process.env.PORT || 5000) + '/api/health', (r) => { \
      process.exit(r.statusCode === 200 ? 0 : 1); \
    }).on('error', () => process.exit(1));"

EXPOSE ${PORT:-5000}

CMD ["node", "server.js"]
