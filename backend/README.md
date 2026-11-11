# SNC Backend

A small Cloudflare Worker API that receives the Contact and Get Started form
submissions from the frontend and stores them in Supabase (Postgres).

## Production setup (live since November 2026)

| Piece | Where |
|---|---|
| API | Cloudflare Worker `snc-backend` at **https://api.sleeknexuscreative.com** (custom domain) |
| Database | Supabase project **Sleek-nexus-creative**: `https://pddtgxglrxlcvmnjevfe.supabase.co` |
| Worker secrets | `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` (set with `wrangler secret put`) |
| Website → API | `frontend-react/.env.production` sets `VITE_API_URL=https://api.sleeknexuscreative.com/api` |

Check it's up: open https://api.sleeknexuscreative.com/api/health, which should
show `{"ok":true}`.

The website (`sleek-nexus-creative-2026`) and this API are **two separate
Workers** on the same Cloudflare account, deployed separately. Pushing to
GitHub deploys neither: it only updates the GitHub Pages copy.

## 1. Create the Supabase project

1. Go to [supabase.com](https://supabase.com) → New project.
2. Open **SQL Editor** → **New query**, paste in the whole of
   `supabase/schema.sql` and click **Run**. This creates the `messages` table.
3. New query again: paste `supabase/002_admin_dashboard.sql` and run it. It
   adds lead status/notes and the access rules for the `/admin` dashboard. Both
   files are safe to run more than once.
4. Check **Table Editor**: you should see `messages` and `admins`.
5. Collect the two values the Worker needs:
   - **Project URL** (Project Overview, or Project Settings → Data API),
     e.g. `https://<project-id>.supabase.co` → `SUPABASE_URL`
   - **Secret key**: Project Settings → **API Keys** → *Secret keys*
     (`sb_secret_…`), or the legacy **service_role** key (`eyJ…`) →
     `SUPABASE_SERVICE_ROLE_KEY`

   Do **not** use the publishable/anon key (`sb_publishable_…`) here: it can't
   insert rows. (It is the one the admin dashboard uses later.)

The secret key bypasses Row Level Security. It must only ever live in the
Worker's secrets: never in the frontend, a `.env` file in Git, a chat or a
screenshot. If it leaks, create a new secret key in Supabase, put it in the
Worker (step 3) and delete the old one.

## 2. Local development

```
cd backend
npm install
cp .dev.vars.example .dev.vars   # then fill in the real values
npm run dev
```

This starts the Worker locally (via Wrangler) at `http://localhost:8787`.
`frontend-react/.env` points `VITE_API_URL` at `http://localhost:8787/api` for
this; production builds use `.env.production` instead.

## 3. Deploy to Cloudflare

From the `backend` folder:

```
npm install
npx wrangler login
npx wrangler secret put SUPABASE_URL
npx wrangler secret put SUPABASE_SERVICE_ROLE_KEY
npx wrangler secret list
npx wrangler deploy
```

**How `secret put` works:** the word after `secret put` is the secret's
*name* and must be exactly `SUPABASE_URL` or `SUPABASE_SERVICE_ROLE_KEY`.
Press Enter, and only paste the *value* when Wrangler asks
`Enter a secret value:`. Pasting the value on the command line makes it the
name. The Worker then can't find it, and the value is left in your terminal
history. (If that happens: `npx wrangler secret delete <wrong-name>`, rotate
the key if it was the secret key, and redo it properly.)

`secret list` should show exactly the two names. A successful deploy ends with:

```
Deployed snc-backend triggers
  api.sleeknexuscreative.com (custom domain)
```

`wrangler.toml` creates that custom domain automatically; it needs
`sleeknexuscreative.com` to be a zone on the same Cloudflare account (it is).

### Don't let the website Worker catch `api.`

A Worker **route** like `*.sleeknexuscreative.com/*` on the website Worker
sends every subdomain, `api.` included, to the website, and it wins over the
API's custom domain. The symptom: `/api/health` shows the website's
"404 Page Not Found" page, and form posts get `405`. We hit exactly this and
deleted that route in Cloudflare → Workers & Pages →
`sleek-nexus-creative-2026` → Settings → Domains & Routes.

The website now only needs:
- `sleeknexuscreative.com` (custom domain)
- `www.sleeknexuscreative.com/*` (route)

Don't add a wildcard back.

## 4. Point the frontend at it

`frontend-react/.env.production` (committed; the address is not secret):

```
VITE_API_URL=https://api.sleeknexuscreative.com/api
```

Then rebuild and redeploy the website from `frontend-react`:

```
npm run build
npx wrangler deploy
```

For the GitHub Pages copy, also set `VITE_API_URL` under GitHub → Settings →
Secrets and variables → Actions → **Variables**.

To confirm it all works end to end: send a message from the live Contact form,
then check Supabase → Table Editor → `messages` for the new row.

## 5. Optional — per-IP rate limiting

```
npx wrangler kv namespace create RATE_LIMIT_KV
```

Paste the returned `id` into the commented-out `[[kv_namespaces]]` block in
`wrangler.toml`, uncomment it, and redeploy. Without this the API still
works — it just skips rate limiting.

## 6. Optional — email the team on every submission

Without this, a submission is saved to Supabase and the frontend sends the
notification itself through EmailJS. With it, the Worker sends the email —
after validation, the honeypot, and the rate limit — and the frontend skips
EmailJS entirely.

1. Create a [Resend](https://resend.com) account and verify
   `sleeknexuscreative.com` as a sending domain.
2. `npx wrangler secret put RESEND_API_KEY`
3. Check `NOTIFY_TO` / `NOTIFY_FROM` in `wrangler.toml`, then `npm run deploy`.

The response's `notified` field reports whether the email went out.

## 7. Network Test (homepage website speed check)

The "Free Network Test" card in the homepage hero calls
`GET /api/site-check?url=…`, which runs Google PageSpeed Insights (mobile,
throttled network) and returns a plain-language summary. It needs a free Google
API key (25,000 checks a day):

1. Go to [console.cloud.google.com](https://console.cloud.google.com), create a
   project (or pick one), then **APIs & Services → Library → PageSpeed Insights
   API → Enable**.
2. **APIs & Services → Credentials → Create credentials → API key**. Under
   *API restrictions*, restrict it to **PageSpeed Insights API**.
3. `npx wrangler secret put PAGESPEED_API_KEY`, and paste the key at the prompt.
4. `npx wrangler deploy`

Without the key the test falls back to Google's shared, keyless allowance,
which is usually used up, so visitors see "The test is busy right now".
Results are cached for 6 hours per address, and each visitor is limited to 5
checks a minute when `RATE_LIMIT_KV` is bound (section 5).

## 8. Analytics (Insights tab in /admin)

The website records anonymous page views (`POST /api/track`) and every Network
Test run, into two tables only admins can read. They're shown in the
**Insights** tab of the admin dashboard: page views per day, most visited pages,
where visitors come from, devices, countries, and the websites people tested.

1. Run `supabase/003_analytics.sql` in the Supabase SQL Editor (after
   `schema.sql` and `002_admin_dashboard.sql`).
2. Redeploy the backend: `npx wrangler deploy`.

Privacy: no cookies, no IP addresses, no names. A page view is the page path,
the referring site's domain, country and device type. Bots and `/admin` are
never counted, and the website skips tracking in local development and when a
browser sends Do Not Track.

## Tests

```
npm test
```

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
| 201 | Saved — body is `{ "ok": true, "notified": true | false }` |
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

`GET /api/site-check?url=example.com` → `{ url, score, scores: { speed, seo, accessibility, bestPractices }, visibleSeconds, firstPaintSeconds, pageMegabytes, slow3gSeconds, pages: { count, source: 'sitemap' | 'links', atLeast? } | null, strengths[], weaknesses[] }`.
`pages` comes from the site's sitemap (as declared in robots.txt, or
`/sitemap.xml`), or, failing that, the distinct pages its home page links to.
Errors: 400 unusable address, 422 the site could not be opened, 429 too many
checks, 503 Google busy or out of quota, 504 timed out.
