# Dandere Website

Marketing site and user dashboard for the [Dandere](https://github.com/matiasfacello/dandere) Discord bot — a voice channel activity tracker that logs joins, leaves, moves, and stream events in real time.

## Pages

- `/` — Landing page with hero, feature grid, how-it-works, and premium teaser
- `/docs` — Static command reference and setup guide
- `/dashboard` — Authenticated area showing mutual servers and bot status per server
- `/privacy` — Privacy Policy (required for Discord bot verification)
- `/terms` — Terms of Service (required for Discord bot verification)

## Tech Stack

- **Next.js 16** — App Router, TypeScript, `output: "standalone"` for Docker
- **Tailwind CSS** + **shadcn/ui** — dark mode only
- **Better Auth** — Discord OAuth2 (`identify` + `guilds` scopes)
- **Drizzle ORM** — reads the same PostgreSQL database as the bot (no writes)

## Local Development

1. Copy `.env.example` to `.env` and fill in all values:

```env
DATABASE_URL=           # Same PostgreSQL connection string as the bot
DISCORD_CLIENT_ID=      # Same as the bot's APP_ID
DISCORD_CLIENT_SECRET=  # From Discord Developer Portal → OAuth2
BETTER_AUTH_SECRET=     # Run: openssl rand -base64 32
BETTER_AUTH_URL=        # http://localhost:3000 for local dev
```

2. Install dependencies:

```bash
pnpm install
```

3. Run the dev server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deployment

Deployed as a Docker container on CapRover. The `Dockerfile` uses a multi-stage build targeting `.next/standalone`.

Set all environment variables through CapRover's app config — never bake secrets into the image.

## Database

The site shares the bot's PostgreSQL database (read-only). It reads the `guild` and `premiumSubscription` tables. Better Auth manages its own tables (`user`, `session`, `account`, `verification`) in the same database.

**Never run `drizzle-kit push` or `drizzle-kit migrate`** — the bot owns all migrations. Apply any new tables manually via raw SQL.
