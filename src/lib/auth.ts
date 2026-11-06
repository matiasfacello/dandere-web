import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "~/db/client";
import * as authSchema from "~/db/auth-schema";

// The origin also answers directly, so `cf-connecting-ip` could be forged.
// Walking X-Forwarded-For past these ranges can't be.
// ponytail: hard-coded from cloudflare.com/ips; a new Cloudflare range would
// look like the client, so refresh this if they announce one.
const CLOUDFLARE_IPS = [
  "173.245.48.0/20",
  "103.21.244.0/22",
  "103.22.200.0/22",
  "103.31.4.0/22",
  "141.101.64.0/18",
  "108.162.192.0/18",
  "190.93.240.0/20",
  "188.114.96.0/20",
  "197.234.240.0/22",
  "198.41.128.0/17",
  "162.158.0.0/15",
  "104.16.0.0/13",
  "104.24.0.0/14",
  "172.64.0.0/13",
  "131.0.72.0/22",
  "2400:cb00::/32",
  "2606:4700::/32",
  "2803:f800::/32",
  "2405:b500::/32",
  "2405:8100::/32",
  "2a06:98c0::/29",
  "2c0f:f248::/32",
];

export const auth = betterAuth({
  advanced: {
    ipAddress: { trustedProxies: CLOUDFLARE_IPS },
  },
  database: drizzleAdapter(db, { provider: "pg", schema: authSchema }),
  socialProviders: {
    discord: {
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
      scope: ["guilds"],
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 30,
  },
});
