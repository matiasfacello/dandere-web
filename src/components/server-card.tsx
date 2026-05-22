import Image from "next/image";
import { Crown, Mic, MicOff, Users, ExternalLink } from "lucide-react";
import { Button } from "~/components/ui/button";

type BaseProps = {
  name: string;
  icon: string | null;
  guildId: string;
  isOwner?: boolean;
  memberCount?: number;
};

type WithBotProps = BaseProps & { botAdded: true; trackAll: boolean };
type WithoutBotProps = BaseProps & { botAdded: false };

type Props = WithBotProps | WithoutBotProps;

function getInitials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function ServerCard(props: Props) {
  const { name, icon, guildId, isOwner, memberCount } = props;

  const iconUrl = icon ? `https://cdn.discordapp.com/icons/${guildId}/${icon}.${icon.startsWith("a_") ? "gif" : "webp"}?size=64` : null;

  const addBotUrl = `https://discord.com/api/oauth2/authorize?client_id=${process.env.DISCORD_CLIENT_ID}&permissions=76800&scope=bot+applications.commands&guild_id=${guildId}`;

  return (
    <div className="group rounded-xl border border-border/50 bg-card/30 p-4 transition-all duration-300 hover:bg-card hover:border-primary/30">
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className="relative shrink-0">
          {iconUrl ? (
            <Image src={iconUrl} alt={name} width={56} height={56} className="rounded-xl object-cover" />
          ) : (
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 font-semibold text-primary">{getInitials(name)}</div>
          )}
          {isOwner && (
            <div className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-accent-foreground">
              <Crown className="h-3 w-3" />
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h3 className="mb-1 truncate font-semibold text-foreground">{name}</h3>
          <div className="flex flex-wrap items-center gap-2">
            {props.botAdded ? (
              props.trackAll ? (
                <span className="inline-flex items-center gap-1 rounded px-2 py-0.5 text-xs font-medium bg-primary/10 text-primary">
                  <Mic className="h-3 w-3" />
                  Tracking enabled
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 rounded px-2 py-0.5 text-xs font-medium bg-muted text-muted-foreground">
                  <MicOff className="h-3 w-3" />
                  Tracking disabled
                </span>
              )
            ) : (
              <span className="inline-flex items-center gap-1 rounded px-2 py-0.5 text-xs font-medium bg-muted text-muted-foreground">
                Bot not added
              </span>
            )}
            {isOwner && <span className="text-xs text-muted-foreground">Owner</span>}
          </div>
          {memberCount !== undefined && (
            <div className="mt-1.5 flex items-center gap-1 text-xs text-muted-foreground">
              <Users className="h-3 w-3" />
              <span>{memberCount.toLocaleString()} members</span>
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        {props.botAdded ? (
          <>
            <span className="inline-flex items-center rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground">Free</span>
            <Button size="sm" variant="outline" disabled className="ml-auto border-border text-muted-foreground/60 cursor-not-allowed">
              Upgrade
            </Button>
          </>
        ) : (
          <a href={addBotUrl} target="_blank" rel="noopener noreferrer" className="w-full">
            <Button size="sm" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
              <ExternalLink className="mr-2 h-4 w-4" />
              Add Dandere
            </Button>
          </a>
        )}
      </div>
    </div>
  );
}
