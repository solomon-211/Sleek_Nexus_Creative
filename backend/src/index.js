import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { messagesRoute } from './routes/messages.js'

const app = new Hono()

app.use('*', async (c, next) => {
  const allowedOrigins = (c.env.CORS_ORIGIN || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)

  return cors({
    origin: (origin) => (allowedOrigins.includes(origin) ? origin : ''),
    allowMethods: ['GET', 'POST', 'OPTIONS'],
    allowHeaders: ['Content-Type'],
    maxAge: 86400,
  })(c, next)
})

// 200 — health check
app.get('/api/health', (c) => c.json({ ok: true }, 200))
// 405 — any other method on the health check path
app.all('/api/health', (c) => c.json({ error: 'Method not allowed' }, 405))

app.route('/api/messages', messagesRoute)

// 404 — no matching route
app.notFound((c) => c.json({ error: 'Not found' }, 404))

// 500 — anything unhandled
app.onError((err, c) => {
  console.error(err)
  return c.json({ error: 'Server error' }, 500)
})

export default app
