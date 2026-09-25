# Errell Niño — UX Portfolio

A production-ready personal portfolio for **Errell Niño**, Senior UX Design Manager (Banking & Fintech, Manila). Built to lead with **enterprise outcomes**, not just mockups.

Built with **Next.js 14 (App Router)**, **Tailwind CSS v3**, **Framer Motion**, and **Resend** for the contact form.

---

## 1. Quick start

> **Node version:** use an LTS release (18, 20, or 22 — see `.nvmrc`). Next.js 14
> can produce flaky build-worker errors on very new/odd Node versions; if
> `npm run build` fails oddly, `rm -rf .next` and retry, or switch to Node 20.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

To build for production:

```bash
npm run build
npm run start
```

---

## 2. Add your photo

Drop a square photo (≈400×400 or larger) at:

```
public/images/profile.jpg
```

Then in [`app/about/page.tsx`](app/about/page.tsx) update the avatar:

```tsx
<Avatar src="/images/profile.jpg" alt={site.name} size={200} />
```

Until then, a styled silhouette placeholder is shown automatically.

---

## 3. Add your CV PDF

Replace the placeholder file at:

```
public/errell-nino-cv.pdf
```

The **Download CV** buttons (home, hero, resume page) all point here.

---

## 4. Set up Resend (contact form email)

1. Create a free account at [resend.com](https://resend.com).
2. Create an API key.
3. Copy `.env.local.example` to `.env.local` and fill it in:

```bash
cp .env.local.example .env.local
```

```bash
RESEND_API_KEY=re_xxxxxxxxxxxx
CONTACT_TO_EMAIL=uxtap@outlook.com
CONTACT_FROM_EMAIL=Portfolio Contact <onboarding@resend.dev>
```

- `CONTACT_FROM_EMAIL` must use a **Resend-verified domain**. Until you verify one,
  use Resend's sandbox sender `onboarding@resend.dev` (works for testing).
- Form submissions are delivered to `CONTACT_TO_EMAIL` (defaults to `uxtap@outlook.com`).

The API route lives at [`app/api/contact/route.ts`](app/api/contact/route.ts).

---

## 5. Set up Cal.com (booking embed)

1. Create a free account at [cal.com](https://cal.com).
2. Create a **30 Min Meeting** event type (the embed expects the `30min` slug).
3. Set your username in `.env.local`:

```bash
NEXT_PUBLIC_CAL_USERNAME=your-cal-username
```

If the inline widget can't load, the contact page automatically shows a direct
"Book on Cal.com" link as a fallback.

---

## 6. Deploy to Vercel

**One-click / dashboard:**

1. Push this repo to GitHub.
2. Import it at [vercel.com/new](https://vercel.com/new).
3. Add the environment variables from `.env.local` in the Vercel project settings.
4. Deploy.

**CLI:**

```bash
npm i -g vercel
vercel            # preview deploy
vercel --prod     # production deploy
```

> The contact form uses a server API route (Resend), so the app runs as a
> standard Next.js server deploy on Vercel — **not** a static export.

Vercel Analytics is available with zero config from the Vercel dashboard
(enable it under the project's **Analytics** tab).

---

## 7. Update case study content

All content lives in typed data files — no CMS:

```
data/
  case-studies/
    digital-onboarding.ts   # Case Study 01
    uitf-investment.ts      # Case Study 02
    payments-hub.ts         # Case Study 03
    index.ts                # registry + prev/next nav
  experience.ts             # About timeline
  certifications.ts         # Certifications grid
  tools.ts                  # Tools by category
  skills.ts                 # Skills grid + clients
  impact-metrics.ts         # Homepage impact bar
  site.ts                   # Name, email, phone, socials, Cal username
```

Each case study is a typed `CaseStudy` object (see [`types/case-study.ts`](types/case-study.ts)).
To add a new case study: create a file in `data/case-studies/`, then register it
in `data/case-studies/index.ts`. Routing, listings, SEO, and prev/next nav all
update automatically.

---

## 8. Themes, language & imagery

**Light / dark mode.** A toggle in the navbar switches themes; the choice is
saved to `localStorage` and an inline no-flash script in `app/layout.tsx` applies
it before first paint (defaulting to the visitor's system preference, then dark).
All colors are CSS variables (`styles/globals.css`, `:root`/`.dark` vs `.light`)
mapped to Tailwind tokens, so one class flip re-themes the whole site.

**English / Tagalog toggle.** The `EN / TL` switch (navbar) flips the language
instantly, persisted to `localStorage`. All copy lives in one dictionary at
[`lib/i18n.tsx`](lib/i18n.tsx) (`en` and `tl`). Scope: UI chrome plus key
marketing and case-study summary content is translated; the deep case-study body
prose is intentionally English. To edit or extend translations, edit that file —
the `en` object is the source of truth and `tl` must mirror its shape.

**Stock imagery.** Curated Unsplash photos are configured in
[`data/media.ts`](data/media.ts) and rendered via `next/image` with a brand
duotone overlay (`.img-overlay`). `images.unsplash.com` is allow-listed in
`next.config.mjs`. Swap any photo by changing its Unsplash ID in `data/media.ts`.
The profile avatar still falls back to a silhouette until you add
`public/images/profile.jpg`.

## Project structure

```
app/            Routes (home, work, about, resume, contact, api)
components/     Reusable UI, layout, home, case-study, about, contact components
data/           Content as typed TS files
lib/            Utilities (cn helper, Resend client)
types/          TypeScript interfaces
styles/         Global CSS (Tailwind + custom tokens, dot-grid, print styles)
public/         CV PDF, images
```

## Design tokens

Colors are CSS-variable tokens (dark / light) so both themes share one set of
utility classes:

| Token | Dark | Light | Use |
|---|---|---|---|
| `canvas` | `#0A0A0F` | `#F6F7F9` | Page background |
| `surface` | `#1A1A2E` | `#FFFFFF` | Cards |
| `border` | `#2D2D44` | `#E2E5EC` | Borders / dividers |
| `primary` | `#F0F0F0` | `#12151C` | Text |
| `accent` | `#00D4FF` | `#0E7490` | Cyan accent (AA in both) |
| `amber` | `#FFB347` | `#B45309` | Metrics / numbers only |
| `onAccent` | `#080C14` | `#FFFFFF` | Text on accent buttons |

Fonts: **Sora** (display), **Inter** (body), **JetBrains Mono** (data) — all via `next/font`.

## Accessibility & motion

- WCAG 2.1 AA targeted; semantic landmarks, skip link, visible focus rings.
- All animations respect `prefers-reduced-motion` (via Framer Motion `useReducedMotion`
  and a global CSS fallback).
