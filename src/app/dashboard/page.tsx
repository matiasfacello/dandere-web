import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { eq, inArray, and } from "drizzle-orm";
import type { Metadata } from "next";
import { auth } from "~/lib/auth";
import { db } from "~/db/client";
import { account } from "~/db/auth-schema";
import { guild } from "~/db/schema";
import { UserHeader } from "~/components/user-header";
import { ServerCard } from "~/components/server-card";

export const metadata: Metadata = {
  title: "Dashboard — Dandere",
};

type DiscordGuild = {
  id: string;
  name: string;
  icon: string | null;
  owner: boolean;
  permissions: number | string;
};

const ADMINISTRATOR = 0x8n;
const MANAGE_GUILD = 0x20n;

function hasManagePermission(guild: DiscordGuild) {
  const perms = BigInt(guild.permissions);
  return guild.owner || (perms & ADMINISTRATOR) === ADMINISTRATOR || (perms & MANAGE_GUILD) === MANAGE_GUILD;
}

export default async function DashboardPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/");

  const [accountRow] = await db
    .select({ accessToken: account.accessToken })
    .from(account)
    .where(and(eq(account.userId, session.user.id), eq(account.providerId, "discord")));

  const accessToken = accountRow?.accessToken;

  let userGuilds: DiscordGuild[] = [];
  if (accessToken) {
    const res = await fetch("https://discord.com/api/users/@me/guilds", {
      headers: { Authorization: `Bearer ${accessToken}` },
      next: { revalidate: 0 },
    });
    if (res.ok) {
      userGuilds = await res.json();
    }
  }

  const userGuildIds = userGuilds.map((g) => g.id);

  const botGuilds =
    userGuildIds.length > 0
      ? await db
          .select({
            guildId: guild.guildId,
            trackAll: guild.trackAll,
          })
          .from(guild)
          .where(inArray(guild.guildId, userGuildIds))
      : [];

  const botGuildMap = new Map(botGuilds.map((g) => [g.guildId, g]));

  const mutualGuilds = userGuilds.filter((g) => botGuildMap.has(g.id) && hasManagePermission(g)).map((g) => ({ ...g, ...botGuildMap.get(g.id)! }));

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-8">
        <UserHeader name={session.user.name} image={session.user.image} />
      </div>

      <h2 className="mb-1 text-xl font-bold text-foreground">Your servers</h2>
      <p className="mb-6 text-sm text-muted-foreground">Servers where both you and Dandere are present.</p>

      {mutualGuilds.length === 0 ? (
        <div className="rounded-lg border border-border bg-card px-6 py-12 text-center">
          <p className="text-muted-foreground">No mutual servers found. Add Dandere to a server you&apos;re in to see it here.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {mutualGuilds.map((g) => (
            <ServerCard key={g.id} guildId={g.id} name={g.name} icon={g.icon} trackAll={g.trackAll} />
          ))}
        </div>
      )}
    </main>
  );
}
