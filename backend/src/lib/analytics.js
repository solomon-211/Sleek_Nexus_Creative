import { getSupabase } from './supabase.js'

// Shared helpers for the anonymous analytics written by the Worker
// (see supabase/003_analytics.sql). Every write is best-effort: analytics
// must never slow down or break a visitor's request.

const BOT = /bot|crawl|spider|slurp|lighthouse|headless|pagespeed|preview|monitor|uptime|curl|wget|python|axios|node-fetch/i

export function isBot(userAgent) {
  return !userAgent || BOT.test(userAgent)
}

export function deviceOf(userAgent = '') {
  if (/ipad|tablet|kindle|silk/i.test(userAgent)) return 'tablet'
  if (/mobi|android|iphone|ipod/i.test(userAgent)) return 'mobile'
  return 'desktop'
}

export function countryOf(c) {
  const code = c.req.header('CF-IPCountry')
  return code && /^[A-Z]{2}$/.test(code) && code !== 'XX' ? code : null
}

// Runs `promise` after the response is sent when the Worker runtime allows
// it (Cloudflare's waitUntil); otherwise (tests, local dev) waits for it.
export async function afterResponse(c, promise) {
  const safe = Promise.resolve(promise).catch((err) => console.error('analytics', err?.message || err))
  try {
    c.executionCtx.waitUntil(safe)
  } catch {
    await safe
  }
}

export async function insertRow(env, table, row) {
  const supabase = getSupabase(env)
  if (!supabase) return
  const { error } = await supabase.from(table).insert(row)
  if (error) throw new Error(error.message)
}
