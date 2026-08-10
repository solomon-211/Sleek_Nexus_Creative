# SNC Backend

A small Cloudflare Worker API that receives the Contact and Get Started form
submissions from the frontend and stores them in Supabase (Postgres).

## 1. Create the Supabase project

1. Go to [supabase.com](https://supabase.com) → New project.
2. Once it's ready, open **SQL Editor** → New query, paste in the contents
   of `supabase/schema.sql`, and run it. This creates the `messages` table.
3. Go to **Settings → API** and copy:
   - **Project URL** → `SUPABASE_URL`
   - **service_role key** (not the `anon` key — this one bypasses Row Level
     Security so the Worker can insert rows) → `SUPABASE_SERVICE_ROLE_KEY`

Keep the service_role key secret — it must only ever live in the Worker's
environment, never in the frontend.

## 2. Local development

```
cd backend
npm install
cp .dev.vars.example .dev.vars   # then fill in the real values
npm run dev
```

This starts the Worker locally (via Wrangler) at `http://localhost:8787`.
Point the frontend's `VITE_API_URL` at `http://localhost:8787/api` to test
against it.

## 3. Deploy to Cloudflare

```
npx wrangler login
npx wrangler secret put SUPABASE_URL
npx wrangler secret put SUPABASE_SERVICE_ROLE_KEY
npm run deploy
```

That publishes the Worker. By default `wrangler.toml` also routes
`api.sleeknexuscreative.com/*` to it — that only works once
`sleeknexuscreative.com` is added as a zone on this Cloudflare account (DNS
already points here via the site's `CNAME` file today, but the zone itself
needs to be on Cloudflare for a Worker custom domain to attach to it). If
that hasn't been done yet, comment out or remove the `routes` block in
`wrangler.toml` — the Worker will still deploy and be reachable at its
default `*.workers.dev` URL, which works fine for `VITE_API_URL` too.

## 4. Point the frontend at it

In `frontend-react/.env` (and wherever env vars are set for the production
build), set:

```
VITE_API_URL=https://api.sleeknexuscreative.com/api
```

(or the `*.workers.dev` URL if not using the custom domain yet), then
rebuild and redeploy the frontend.

## 5. Optional — per-IP rate limiting

```
npx wrangler kv namespace create RATE_LIMIT_KV
```

Paste the returned `id` into the commented-out `[[kv_namespaces]]` block in
`wrangler.toml`, uncomment it, and redeploy. Without this the API still
works — it just skips rate limiting.

## API

`POST /api/messages`

```json
{
  "type": "contact",
  "name": "Jane Doe",
  "email": "jane@example.com",
  "phone": "",
  "company": "",
  "service": "",
  "budget": "",
  "timeline": "",
  "message": "Project details here...",
  "website": ""
}
```

`type` is `"contact"` or `"get_started"`. `website` is a honeypot field —
leave it blank; forms should render it visually hidden.

| Status | Meaning |
|---|---|
| 201 | Saved |
| 400 | Missing/invalid field, or malformed JSON |
| 404 | Unknown route |
| 405 | Wrong HTTP method |
| 413 | Body too large |
| 415 | Content-Type isn't `application/json` |
| 429 | Rate limit exceeded |
| 502 | Supabase insert failed |
| 503 | Backend not configured (missing secrets) |
| 500 | Unexpected server error |

`GET /api/health` → `{ "ok": true }`
