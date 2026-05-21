# CLAUDE.md

This file provides guidance to Claude Code when working with this repository.

## What This Is

The Dandere website — a Next.js marketing and user-facing site for the Dandere Discord bot. The bot tracks voice channel activity (joins, leaves, moves, streaming) across Discord servers and posts real-time logs to a configured text channel. It also provides moderation utilities.

The site has three purposes:

1. **Landing page** — present the bot and its features, drive installs via the Discord invite link
2. **Documentation** — command reference and setup guide
3. **Dashboard** — authenticated area where Discord users can see which of their servers have the bot and their subscription tier

## Tech Stack

- **Next.js 15** — App Router, TypeScript, `output: "standalone"` for Docker
- **Tailwind CSS** + **shadcn/ui** — dark theme, no light mode
- **Better Auth** — Discord OAuth provider, Drizzle adapter
- **Drizzle ORM** — same schema and same PostgreSQL database as the bot
- **Docker** — deployed to CapRover

## Pages

### `/` — Landing

- **Hero:** bot name, tagline ("Track every voice event in your Discord server"), two CTAs: _Add to Discord_ (primary) and _Read the docs_ (secondary)
- **Features:** grid of cards — voice join/leave tracking, move detection, stream start/stop, per-user ignore list, bulk message clear
- **How it works:** 3-step section — (1) Add bot to server, (2) Run `/trackvoice-all #channel`, (3) Done
- **Premium teaser:** a "Coming soon" banner or section — name a few future premium features, no pricing, no Stripe, no sign-up. Just a CTA to a waitlist or "stay tuned" copy
- **Footer:** invite link, documentation link, GitHub link

### `/docs` — Documentation

Static content only — no CMS, no MDX. Plain React components with structured content.

**Getting Started**

1. Add the bot using the invite link
2. Run `/trackvoice-all #channel` to begin logging to a text channel
3. Optionally ignore specific users with `/trackvoice-ignoreuser @user`
4. Run `/trackvoice-disable` to stop at any time

**Command Reference**

| Command                          | Description                                                                          | Permission      |
| -------------------------------- | ------------------------------------------------------------------------------------ | --------------- |
| `/trackvoice-all #channel`       | Start tracking all voice channels, logs to the given text channel                    | Manage Channels |
| `/trackvoice-disable`            | Stop tracking voice channels                                                         | Manage Channels |
| `/trackvoice-ignoreuser @user`   | Exclude a user from tracking                                                         | Manage Channels |
| `/trackvoice-unignoreuser @user` | Stop excluding a user                                                                | Manage Channels |
| `/clear [1–100]`                 | Bulk delete up to 100 messages. Messages older than 14 days are deleted individually | Manage Messages |
| `/status`                        | Show bot status, database connectivity, and WebSocket ping                           | Administrator   |

**What Gets Logged**

- User connected to a voice channel
- User disconnected from a voice channel
- User moved between voice channels
- User started or stopped streaming

**Permissions the bot needs**

- View Channels
- Send Messages
- Manage Messages (for `/clear`)
- Read Message History (for `/clear`)

### `/dashboard` — User Dashboard

Protected route — requires Discord OAuth. Redirects unauthenticated users to `/api/auth/signin`.

Shows:

- Logged-in user's Discord avatar and username
- List of mutual guilds (servers where both the user and the bot are present) — fetch the user's guild list from the Discord API using the stored access token, then filter against the `guild` table in the DB
- Per-server card: server name and icon, tracking status (enabled/disabled), log channel if set, subscription tier (Free for all servers currently)
- Premium upsell placeholder on each server card — "Upgrade" button that does nothing yet, or links to a waitlist

The dashboard is **read-only** — users cannot change bot settings from the website in this version.

## Authentication

Use **Better Auth** with the Discord social provider and the Drizzle adapter. Better Auth generates its own tables (`user`, `session`, `account`, `verification`) — let it create these alongside the bot's existing tables in the same database.

**Installation:**

```bash
pnpm add better-auth
```

**`src/lib/auth.ts`:**

```typescript
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db/client";

export const auth = betterAuth({
  database: drizzleAdapter(db, { provider: "pg" }),
  socialProviders: {
    discord: {
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
      scopes: ["identify", "guilds"],
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 30, // 30 days
  },
});
```

- `identify` — user ID, username, avatar
- `guilds` — list of servers the user is in (needed to compute mutual guilds with the bot)

**Run the schema generator** after setting up auth to push Better Auth's tables into the database:

```bash
npx better-auth generate
```

Then apply with Drizzle: `pnpm dzz-migrate` (or however migrations are run in this project).

**`src/app/api/auth/[...all]/route.ts`:**

```typescript
import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

export const { GET, POST } = toNextJsHandler(auth);
```

**Accessing the session in server components:**

```typescript
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const session = await auth.api.getSession({ headers: await headers() });
```

**Protecting `/dashboard` routes** — use Next.js middleware:

```typescript
// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export function middleware(request: NextRequest) {
  const session = getSessionCookie(request);
  if (!session) return NextResponse.redirect(new URL("/", request.url));
  return NextResponse.next();
}

export const config = { matcher: ["/dashboard/:path*"] };
```

**Getting the Discord access token** (needed to call the Discord API for the user's guild list): Better Auth stores the OAuth access token in the `account` table. Query it server-side when building the dashboard:

```typescript
const account = await db.select().from(account).where(eq(account.userId, session.user.id));
const discordAccessToken = account[0]?.accessToken;
```

After login, redirect to `/dashboard` — configure this in the Better Auth social provider callback or via the sign-in call on the client.

## Database

The website shares the bot's PostgreSQL database. Use the same `DATABASE_URL`.

**Tables to read:**

- `guild` — check if a server has the bot, read `trackAll`, `logChannelId`
- `premiumSubscription` — read subscription tier per guild (all free currently)

**Do not write** to `guild`, `log`, `channelTracking`, or any bot-managed table. The website has no write access to bot configuration in this version.

Copy the relevant table definitions from the bot's `schema.ts` into `src/db/schema.ts` — do not import across repos.

Drizzle client setup:

```typescript
// src/db/client.ts
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const sql = postgres(process.env.DATABASE_URL!, { max: 5 });
export const db = drizzle({ client: sql });
```

Use `max: 5` (lighter than the bot's pool of 10).

## Design System

**Dark mode only.** No light mode toggle.

**Colors:**

- Page background: `zinc-950`
- Surface / card: `zinc-900`
- Elevated surface: `zinc-800`
- Primary accent: `indigo-500` (hover: `indigo-400`)
- Primary text: `zinc-100`
- Muted text: `zinc-400`
- Active/success indicator: `green-500`
- Destructive: `red-500`

**Typography:** Geist Sans (Next.js default). Headings bold with tight letter-spacing. Body in `zinc-300`.

**shadcn/ui components to install:**
`button`, `badge`, `card`, `separator`, `avatar`, `dropdown-menu`, `tooltip`, `skeleton`

Use shadcn's dark theme as the base — do not override its CSS variables, extend them.

**File structure for components:**

- `src/components/ui/` — shadcn/ui generated components (do not hand-edit)
- `src/components/` — page-specific and shared custom components

## Discord Invite Link

Build the invite URL from the `DISCORD_CLIENT_ID` env var. Never hardcode it.

```typescript
const inviteUrl = `https://discord.com/api/oauth2/authorize?client_id=${process.env.DISCORD_CLIENT_ID}&permissions=76800&scope=bot+applications.commands`;
```

`76800` covers: View Channels (1024) + Send Messages (2048) + Manage Messages (8192) + Read Message History (65536).

Construct this server-side so the client ID is never exposed in client components.

## Environment Variables

```env
DATABASE_URL=           # Same PostgreSQL connection string as the bot
DISCORD_CLIENT_ID=      # Same as the bot's APP_ID
DISCORD_CLIENT_SECRET=  # From Discord Developer Portal → OAuth2
BETTER_AUTH_SECRET=     # Run: openssl rand -base64 32
BETTER_AUTH_URL=        # Full production URL, e.g. https://dandere.xyz
```

Add an `.env.example` with all keys and empty values.

In the Discord Developer Portal, add the OAuth2 redirect URI:

- Local: `http://localhost:3000/api/auth/callback/discord`
- Production: `https://your-domain/api/auth/callback/discord`

Better Auth uses `/api/auth/[...all]` as its catch-all handler, so the redirect URI path is `/api/auth/callback/discord` by default.

## Deployment (CapRover)

Deployed as a Docker container on the same CapRover instance as the bot. Run as a separate CapRover app.

**`next.config.ts`:**

```typescript
const nextConfig = {
  output: "standalone",
};
export default nextConfig;
```

**`Dockerfile`:**

```dockerfile
FROM node:22-alpine AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml* ./
RUN corepack enable pnpm && pnpm install --frozen-lockfile

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN corepack enable pnpm && pnpm run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT=3000
CMD ["node", "server.js"]
```

Inject all environment variables through CapRover's app environment config — never bake secrets into the image.

## Commit Conventions

Same as the bot:

```
feat: short lowercase description
patch: short lowercase description
```

No scope, no ticket numbers, no capital letters, no Co-Authored-By lines.

## Key Rules

- All `/dashboard` routes must be server-side protected — never rely on client-side auth checks alone
- Invite link must be built from `DISCORD_CLIENT_ID` env var — never hardcoded
- No Stripe, no payment forms, no subscription mutations in this version — premium UI is placeholder only
- Prefer server components; use client components only when interactivity requires it (e.g. dropdown menus, tooltips)
- Docs are static React — no MDX, no CMS
- The logo is provided by the user — place it at `public/logo.svg` (or `.png`) and reference it from there
- Do not modify the shared database schema — read only, and copy table definitions rather than importing from the bot repo
