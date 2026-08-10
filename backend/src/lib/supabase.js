import { createClient } from '@supabase/supabase-js'

// Workers have no process.env — config arrives per-request via the env
// object (Wrangler secrets/vars), so the client is built fresh per request
// rather than once at module scope.
export function getSupabase(env) {
  if (!env.SUPABASE_URL || !env.SUPABASE_SERVICE_ROLE_KEY) return null

  // Service-role key bypasses Row Level Security — this must only ever be
  // used server-side (Worker secret), never shipped to the frontend.
  return createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false },
  })
}
