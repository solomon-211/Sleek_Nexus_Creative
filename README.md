# Sleek Nexus Creative

The website for Sleek Nexus Creative — [sleeknexuscreative.com](https://sleeknexuscreative.com).

| Part | Where | Stack |
|---|---|---|
| Website | `frontend-react/` | React 19, Vite, Tailwind, Framer Motion. Deployed to GitHub Pages by `.github/workflows/deploy.yml` on every push to `main`. |
| Form API | `backend/` | Cloudflare Worker (Hono) that validates Contact / Get Started submissions, stores them in Supabase, and emails the team. Deployed with `npm run deploy` — see [backend/README.md](backend/README.md). |

## Run it

```
cd frontend-react
npm install
npm run dev        # http://localhost:5173
```

`npm run lint` and `npm run build` are what CI runs. `cd backend && npm test` runs the API tests.

## Environment (frontend-react/.env)

| Variable | Purpose |
|---|---|
| `VITE_API_URL` | Form API base, e.g. `https://api.sleeknexuscreative.com/api` |
| `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_CONTACT_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY` | Fallback notification email, used only when the API didn't send one |
| `VITE_GA_MEASUREMENT_ID` | Optional Google Analytics 4 ID. Unset = no analytics and no cookie banner. Set = banner appears and analytics loads only after a visitor accepts. |
| `VITE_SHOW_TEAM` | Set to `true` to publish the team section on the About page. Unset = hidden on the live site, still visible in `npm run dev`. |

## Working on the site

**Design system.** Brand colours live in `frontend-react/tailwind.config.js`: orange `primary` #FE7F2D, navy `dark` #233D4D, grey `surface` #EAECF0. The `gray-*` scale is tints of the navy, so neutrals stay in the palette. Shared building blocks are in `src/index.css` — use them rather than re-typing utilities:

- `container-page` — the one content width and gutter
- `eyebrow`, `section-title`, `section-subtitle` — section headings
- `btn-primary`, `btn-secondary`, `card`
- `<PageHeader>` — every inner page's hero. `tone="dark"` for top-level pages, default light for service detail pages.

**Adding a page.** Create it in `src/pages`, add the route in `src/App.jsx`, and add an entry in `src/lib/seo-data.js` — the build then generates its static HTML head and its sitemap entry.

**Adding portfolio work.** Edit `src/lib/work-data.js`; it feeds both `/work` and the gallery on `/services/branding`.

**Images.** Put originals in `public/images`, run `npm run images`, commit the generated `.webp` files and `src/lib/image-manifest.json`, and render with `<Img>` (`src/components/ui/Img.jsx`).

**Icons.** Write Font Awesome classes as usual (`<i className="fas fa-check" />`). Only the icons actually used are bundled — `scripts/generate-icons.mjs` runs automatically on dev start and build, and fails the build on a misspelt icon name.

**Contact details** (phone, email, WhatsApp) are in `src/lib/site.js`.
