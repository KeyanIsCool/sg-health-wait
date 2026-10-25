# SG Health Wait

Compare Singapore healthcare wait times — public hospital A&E, polyclinics, private hospitals, and GPs. Built as a mobile-first, SEO-friendly utility.

> **Not medical advice.** In an emergency, call **995**.

## Stack

- Next.js 14 (App Router) + TypeScript + React 18
- Tailwind CSS
- Prisma + SQLite (dev) / PostgreSQL (prod)
- Leaflet + OpenStreetMap for the map (loaded on demand from CDN)
- Zod for API input validation
- Deployed to Vercel

## Getting started

```bash
# 1. Install
npm install

# 2. Configure environment
cp .env.example .env

# 3. Create and seed the database
npm run db:push
npm run db:seed

# 4. Run the dev server
npm run dev
```

Open http://localhost:3000.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server |
| `npm run build` | Prisma generate + Next.js production build |
| `npm run start` | Start production server |
| `npm run lint` | Next ESLint |
| `npm run typecheck` | TypeScript check |
| `npm run db:push` | Apply schema to database |
| `npm run db:seed` | Seed demo facilities and articles |

## Environment variables

See [`.env.example`](./.env.example). Required:

- `DATABASE_URL` — SQLite (`file:./dev.db`) locally; PostgreSQL in prod.
- `NEXT_PUBLIC_SITE_URL` — Fully qualified site URL for canonical/OG/sitemap.
- `ADMIN_USER` / `ADMIN_PASS` — HTTP Basic credentials for `/admin`.
- `NEXT_PUBLIC_ADSENSE_CLIENT` — Optional AdSense publisher ID. Ads collapse gracefully when empty.

## Admin

Visit `/admin` and sign in with `ADMIN_USER`/`ADMIN_PASS`. Includes:

- Dashboard with facility counts and data-source health
- Facilities table (read-only in this version; edit via seed script or future CRUD)
- Wait-times inspector
- Crowd-report moderation
- Data-source status

Admin and `/api` are blocked in `robots.txt`.

## Architecture

```
app/            # Next.js App Router routes & pages
components/     # Reusable UI (FacilityCard, FilterBar, FacilityMap, etc.)
lib/            # DB, geo, time, queries, abuse, notifications
lib/data-sources/
  official/     # Future official API adapters (placeholder)
  crowd/        # Crowd-report aggregator
prisma/         # Schema & seed
public/         # Static assets
```

Every data source normalizes to the shape in [`lib/data-sources/types.ts`](./lib/data-sources/types.ts). Add a new source by implementing `DataSourceAdapter` — the UI, API, and sitemap pick it up automatically.

## Deploy to Vercel

1. Push this repo to GitHub.
2. Create a Vercel project pointing at the repo.
3. Add environment variables in the Vercel dashboard.
4. Swap `DATABASE_URL` to a hosted Postgres (Vercel Postgres, Supabase, Neon). Change `schema.prisma` provider to `postgresql` and run `prisma db push`.

The build runs `prisma generate && next build`.

## What's deliberately not here

- **Live hospital scrapers.** The spec forbids scraping that violates ToS or bypasses anti-bot/CAPTCHA/auth. Build adapters against official hospital APIs where available, or integrate manually via the admin.
- **Email/webpush reminder delivery.** The data model exists (`Reminder` table + `/api/reminders`) but a background worker to actually send them is a deployment concern (Vercel Cron + email provider / Web Push).
- **Account system.** Reminders are local-first by design; add auth when the product needs cross-device state.
- **Real PWA icons.** `public/icon.svg` is a placeholder; add 192/512 PNGs before shipping.

## Accessibility

- Semantic HTML and headings on every page
- Keyboard-navigable filter chips, visible focus
- 44px touch targets on primary controls and the mobile nav
- Wait-time status never relies on colour alone (always paired with icon + text)
- `prefers-reduced-motion` honoured
- The map always has a parallel list alternative

## License

Private project. Facility names and addresses belong to their respective operators.
