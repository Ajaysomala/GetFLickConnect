# Get Flick Connect

A two-sided marketplace for hiring photographers, videographers, and drone operators.
This package contains the **creator-side** build: landing page, discovery/browse,
creator profiles, auth, a 5-step creator registration flow, and a creator dashboard.

## Stack

- Vite + React 19 + TypeScript
- Tailwind CSS v4 (via `@tailwindcss/vite`)
- React Router v7
- lucide-react for icons
- No backend — all data lives in a React Context store (`src/lib/store.tsx`) seeded
  with three mock creators (`src/lib/mockData.ts`). Booking a creator from a profile
  page updates the same store the dashboard reads from, so the flow feels live.

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL (typically `http://localhost:5173`).

To produce a production build:

```bash
npm run build
npm run preview   # serve the build locally to sanity-check it
```

## GitHub Pages

This project is configured for GitHub Pages under the repository path
`/GetFLickConnect/`.

1. In your GitHub repository, go to Settings > Pages.
2. Set the source to GitHub Actions.
3. Push to `main`; the workflow in `.github/workflows/deploy.yml` will build and
   publish the site automatically.

The app uses hash-based routing so page refreshes work correctly on GitHub Pages.
If you rename the repository, update the `base` value in [vite.config.ts](vite.config.ts).

## Pages

| Route         | Page                                                                            |
| ------------- | ------------------------------------------------------------------------------- |
| `/`           | Landing page                                                                    |
| `/browse`     | Client-facing discovery/search feed                                             |
| `/browse/:id` | Individual creator profile (reel, gallery, booking)                             |
| `/login`      | Login                                                                           |
| `/signup`     | Account creation (client or creator)                                            |
| `/register`   | 5-step creator onboarding (profile → services → gear → drone → rates/portfolio) |
| `/dashboard`  | Creator dashboard (earnings, bookings, gear, reviews)                           |
| `/support`    | Contact form + quick FAQ                                                        |
| `/help`       | Full FAQ, split by client vs. creator                                           |
| `/terms`      | Terms & Conditions                                                              |
| `/privacy`    | Privacy Policy                                                                  |

## Design system

Tokens live in `src/index.css` under `@theme`. Color direction: near-black (`#0B0B0D`)
background, signal-orange (`#FF5A1F`) as the single accent (a "REC tally light" motif —
used for live/availability states throughout). Type: Archivo for display, Inter for
body, IBM Plex Mono for technical specs (camera/lens/exposure-style readouts).

Photos are zero-dependency: `src/lib/placeholder.ts` generates deterministic SVG
gradient placeholders (data URIs, no network request), so the prototype renders fully
offline and never shows broken images. Swap in real photo URLs in `src/lib/mockData.ts`
whenever real creator photography is available.

## What's next

Client-side pages (a client-specific dashboard for managing bookings, saved creators,
and messages) are the next pass, followed by wiring both sides into a mobile app shell.
