import { headers } from "next/headers";
import { eq, inArray, and } from "drizzle-orm";
import type { Metadata } from "next";
import { Server, Mic, LayoutDashboard } from "lucide-react";
import { auth } from "~/lib/auth";
import { db } from "~/db/client";
import { account } from "~/db/auth-schema";
import { guild } from "~/db/schema";
import { UserHeader } from "~/components/user-header";
import { ServerCard } from "~/components/server-card";
import { DashboardSignInButton } from "~/components/dashboard-sign-in";

export const metadata: Metadata = {
  title: "Dashboard — Dandere",
};

type DiscordGuild = {
  id: string;
  name: string;
  icon: string | null;
  owner: boolean;
  permissions: number | string;
  approximate_member_count?: number;
};

const ADMINISTRATOR = 0x8n;
const MANAGE_GUILD = 0x20n;

function hasManagePermission(g: DiscordGuild) {
  const perms = BigInt(g.permissions);
  return (
    g.owner ||
    (perms & ADMINISTRATOR) === ADMINISTRATOR ||
    (perms & MANAGE_GUILD) === MANAGE_GUILD
  );
}

function byName(a: { name: string }, b: { name: string }) {
  return a.name.localeCompare(b.name);
}

export default async function DashboardPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    return (
      <main className="flex min-h-[calc(100vh-10rem)] items-center justify-center px-4">
        <div className="max-w-md text-center">
          <div className="mb-6 flex justify-center">
            <div className="bg-primary/10 flex h-16 w-16 items-center justify-center rounded-2xl">
              <LayoutDashboard className="text-primary h-8 w-8" />
            </div>
          </div>
          <h1 className="text-foreground mb-3 text-2xl font-bold">
            Your server dashboard
          </h1>
          <p className="text-muted-foreground mb-8">
            Sign in with Discord to see which of your servers have Dandere
            installed, check tracking status, and get an overview of your bot
            activity.
          </p>
          <DashboardSignInButton size="lg" />
        </div>
      </main>
    );
  }

  const [accountRow] = await db
    .select({ accessToken: account.accessToken })
    .from(account)
    .where(
      and(
        eq(account.userId, session.user.id),
        eq(account.providerId, "discord")
      )
    );

  const accessToken = accountRow?.accessToken;

  let userGuilds: DiscordGuild[] = [];
  if (accessToken) {
    const res = await fetch(
      "https://discord.com/api/users/@me/guilds?with_counts=true",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
        next: { revalidate: 0 },
      }
    );
    if (res.ok) {
      userGuilds = await res.json();
    }
  }

  const managedGuilds = userGuilds.filter(hasManagePermission);
  const managedGuildIds = managedGuilds.map((g) => g.id);

  const botGuilds =
    managedGuildIds.length > 0
      ? await db
          .select({ guildId: guild.guildId, trackAll: guild.trackAll })
          .from(guild)
          .where(inArray(guild.guildId, managedGuildIds))
      : [];

  const botGuildMap = new Map(botGuilds.map((g) => [g.guildId, g]));

  // Servers where the bot is already present — sorted alphabetically
  const mutualGuilds = managedGuilds
    .filter((g) => botGuildMap.has(g.id))
    .map((g) => ({ ...g, ...botGuildMap.get(g.id)! }))
    .sort(byName);

  // Servers where the user can add the bot — sorted alphabetically
  const availableGuilds = managedGuilds
    .filter((g) => !botGuildMap.has(g.id))
    .sort(byName);

  const trackingEnabledCount = mutualGuilds.filter((g) => g.trackAll).length;

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-foreground mb-1 text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your servers and track voice channel activity.
          </p>
        </div>
        <UserHeader name={session.user.name} image={session.user.image} />
      </div>

      {/* Stats */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="border-border/50 bg-card/30 rounded-xl border p-4">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-lg">
              <Server className="text-primary h-5 w-5" />
            </div>
            <div>
              <p className="text-foreground text-2xl font-bold">
                {mutualGuilds.length}
              </p>
              <p className="text-muted-foreground text-sm">
                Servers with Dandere
              </p>
            </div>
          </div>
        </div>

        <div className="border-border/50 bg-card/30 rounded-xl border p-4">
          <div className="flex items-center gap-3">
            <div className="bg-accent/10 flex h-10 w-10 items-center justify-center rounded-lg">
              <Mic className="text-accent h-5 w-5" />
            </div>
            <div>
              <p className="text-foreground text-2xl font-bold">
                {trackingEnabledCount}
              </p>
              <p className="text-muted-foreground text-sm">Tracking Enabled</p>
            </div>
          </div>
        </div>
      </div>

      {/* Servers with bot */}
      <section className="mb-20">
        <h2 className="text-foreground mb-1 text-xl font-bold">Your servers</h2>
        <p className="text-muted-foreground mb-6 text-sm">
          Servers where both you and Dandere are present.
        </p>

        {mutualGuilds.length === 0 ? (
          <div className="border-border/50 bg-card/30 flex flex-col items-center justify-center rounded-xl border px-6 py-12 text-center">
            <p className="text-foreground font-medium">No mutual servers yet</p>
            <p className="text-muted-foreground mt-1 text-sm">
              Add Dandere to one of your servers below to see it here.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {mutualGuilds.map((g) => (
              <ServerCard
                key={g.id}
                botAdded={true}
                guildId={g.id}
                name={g.name}
                icon={g.icon}
                trackAll={g.trackAll}
                isOwner={g.owner}
                memberCount={g.approximate_member_count}
              />
            ))}
          </div>
        )}
      </section>

      {/* Servers where bot can be added */}
      {availableGuilds.length > 0 && (
        <section>
          <h2 className="text-foreground mb-1 text-xl font-bold">
            Add Dandere to more servers
          </h2>
          <p className="text-muted-foreground mb-6 text-sm">
            You have admin or manage permissions on these servers — click to add
            the bot.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {availableGuilds.map((g) => (
              <ServerCard
                key={g.id}
                botAdded={false}
                guildId={g.id}
                name={g.name}
                icon={g.icon}
                isOwner={g.owner}
                memberCount={g.approximate_member_count}
              />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
