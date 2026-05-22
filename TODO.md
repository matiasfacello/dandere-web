# Dandere Website — TODO

## Phase 1: Project Setup

- [x] Install production dependencies
  ```
  pnpm add better-auth drizzle-orm postgres
  ```
- [x] Install dev dependencies
  ```
  pnpm add -D drizzle-kit
  ```
- [x] Initialize shadcn/ui

  ```
  pnpm dlx shadcn@latest init
  ```

  - Choose dark theme base, confirm src/ path, confirm Tailwind v4

- [x] Install shadcn/ui components
  ```
  pnpm dlx shadcn@latest add button badge card separator avatar dropdown-menu tooltip skeleton
  ```
- [x] Update `next.config.ts` — add `output: "standalone"`
- [x] Create `.env.example` with all five env vars (empty values)
- [x] Create `Dockerfile` per the spec
- [x] Add `drizzle.config.ts` pointing at `src/db/schema.ts` and `DATABASE_URL`

## Phase 2: Database Layer

- [x] Create `src/db/client.ts` — Drizzle + postgres-js, `max: 5`
- [x] Create `src/db/schema.ts` — copy `guild` and `premiumSubscription` table definitions from the bot repo (read-only; no bot-managed tables)
- [x] Verify TypeScript compiles with the schema

## Phase 3: Authentication

- [x] Create `src/lib/auth.ts` — Better Auth with Discord provider and Drizzle adapter
  - Scopes: `identify`, `guilds`
  - Session expiry: 30 days
- [x] Create `src/app/api/auth/[...all]/route.ts` — `toNextJsHandler(auth)`
- [x] Run `pnpm dlx auth@latest generate` to create Better Auth's schema (`src/db/auth-schema.ts`)
- [x] Apply migration via raw SQL (`CREATE TABLE IF NOT EXISTS` — do not use drizzle-kit)
- [x] Add OAuth redirect URIs in Discord Developer Portal
  - Local: `http://localhost:3000/api/auth/callback/discord`
  - Production: `https://<domain>/api/auth/callback/discord`

## Phase 4: Route Protection

- [x] Create `proxy.ts` at project root (Next.js 16 — replaces `middleware.ts`)
  - Import `getSessionCookie` from `better-auth/cookies`
  - Export `proxy()` function (not `middleware()`)
  - Redirect unauthenticated `/dashboard/*` requests to `/`
  - Matcher: `["/dashboard/:path*"]`

## Phase 5: Global Layout & Design

- [x] Update `src/app/globals.css`
  - Remove light/dark CSS variable split — dark mode only
  - Set `--background` to `zinc-950` equivalent (`#09090b`)
  - Set base body color to `zinc-100`
  - Remove the `@media (prefers-color-scheme: dark)` block
- [x] Update `src/app/layout.tsx`
  - Fix metadata: title `"Dandere"`, description matching the bot tagline
  - Add `dark` class to `<html>` (force dark mode for shadcn)
  - Keep Geist Sans; drop Geist Mono (not needed for this site)
- [x] Place the bot logo at `public/logo.svg` (or `logo.png`) — user must provide this file

## Phase 6: Shared Components

- [x] Create `src/components/navbar.tsx`
  - Logo + site name on the left
  - Links: Home, Docs, Dashboard (server component — reads session server-side to show user avatar or sign-in link)
  - Sign-out dropdown via shadcn DropdownMenu (client component island)
- [x] Create `src/components/footer.tsx`
  - Invite link (built server-side from `DISCORD_CLIENT_ID` env var)
  - Docs link
  - GitHub link
- [x] Wire `<Navbar />` and `<Footer />` into `src/app/layout.tsx`

## Phase 7: Landing Page (`/`)

- [x] Replace boilerplate in `src/app/page.tsx`
- [x] Create `src/components/hero.tsx`
  - Heading: bot name + tagline ("Track every voice event in your Discord server")
  - CTA buttons: _Add to Discord_ (primary, indigo) and _Read the docs_ (secondary)
  - Invite URL constructed server-side from env var
- [x] Create `src/components/features.tsx`
  - Grid of cards (shadcn Card)
  - Features: voice join/leave, move detection, stream start/stop, per-user ignore list, bulk clear
- [x] Create `src/components/how-it-works.tsx`
  - 3-step numbered section
  - Step 1: Add bot, Step 2: Run `/trackvoice-all #channel`, Step 3: Done
- [x] Create `src/components/premium-teaser.tsx`
  - "Coming soon" banner
  - Brief list of future premium features
  - CTA: waitlist or "stay tuned" copy (no Stripe, no sign-up)
- [x] Wire all sections into `src/app/page.tsx`

## Phase 8: Docs Page (`/docs`)

- [x] Create `src/app/docs/page.tsx` — static React, no MDX
- [x] Sections to include:
  - Getting Started (4 steps)
  - Command Reference (table with all 6 commands, descriptions, permissions)
  - What Gets Logged (4 event types)
  - Bot Permissions Required (4 permissions)
- [x] Add page metadata (title, description)

## Phase 9: Dashboard (`/dashboard`)

- [x] Create `src/app/dashboard/page.tsx` — server component
  - Await session via `auth.api.getSession({ headers: await headers() })` (`headers()` must be awaited in Next.js 16)
  - If no session, redirect to `/` (fallback — `proxy.ts` handles the primary guard)
  - Query `account` table for Discord access token
  - Fetch user's guilds from Discord API (`https://discord.com/api/users/@me/guilds`)
  - Query `guild` table for all guild IDs in the DB
  - Compute intersection (mutual guilds)
  - Render user header (avatar + username)
  - Render server cards grid
- [x] Create `src/components/server-card.tsx`
  - Server name and icon
  - Tracking status badge (enabled / disabled — read from `guild.trackAll`)
  - Log channel if set (`guild.logChannelId`)
  - Subscription tier badge (all Free currently)
  - "Upgrade" button — placeholder, no action
- [x] Create `src/components/user-header.tsx`
  - Discord avatar (shadcn Avatar)
  - Username display
  - Sign-out button (client component)

## Phase 10: Final Polish

- [x] Verify all pages compile without TypeScript errors (`pnpm build`)
- [x] Check that `/dashboard` redirects to `/` when unauthenticated
- [x] Verify Discord OAuth login flow end-to-end (local)
- [x] Confirm mutual guilds display correctly on dashboard
- [x] Audit invite link — must be constructed from env var, never hardcoded
- [x] Run `npx next typegen` to generate type helpers for async params
- [x] Remove unused default Next.js assets from `public/` (`next.svg`, `vercel.svg`, etc.)

## Phase 11: Next Steps

- [ ] Create `/privacy` — Privacy Policy page (required for Discord bot verification)
- [ ] Create `/terms` — Terms of Service page (required for Discord bot verification)
- [ ] Expand command accordion in `/docs` with parameter details, examples, and edge case notes per command
