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

  const iconUrl = icon
    ? `https://cdn.discordapp.com/icons/${guildId}/${icon}.${icon.startsWith("a_") ? "gif" : "webp"}?size=64`
    : null;

  const addBotUrl = `https://discord.com/api/oauth2/authorize?client_id=${process.env.DISCORD_CLIENT_ID}&permissions=76800&scope=bot+applications.commands&guild_id=${guildId}`;

  return (
    <div className="group border-border/50 bg-card/30 hover:bg-card hover:border-primary/30 rounded-xl border p-4 transition-all duration-300">
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className="relative shrink-0">
          {iconUrl ? (
            <Image
              src={iconUrl}
              alt={name}
              width={56}
              height={56}
              className="rounded-xl object-cover"
            />
          ) : (
            <div className="bg-primary/10 text-primary flex h-14 w-14 items-center justify-center rounded-xl font-semibold">
              {getInitials(name)}
            </div>
          )}
          {isOwner && (
            <div className="bg-accent text-accent-foreground absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full">
              <Crown className="h-3 w-3" />
            </div>
          )}
        </div>

        {/* Info */}
        <div className="min-w-0 flex-1">
          <h3 className="text-foreground mb-1 truncate font-semibold">
            {name}
          </h3>
          <div className="flex flex-wrap items-center gap-2">
            {props.botAdded ? (
              props.trackAll ? (
                <span className="bg-primary/10 text-primary inline-flex items-center gap-1 rounded px-2 py-0.5 text-xs font-medium">
                  <Mic className="h-3 w-3" />
                  Tracking enabled
                </span>
              ) : (
                <span className="bg-muted text-muted-foreground inline-flex items-center gap-1 rounded px-2 py-0.5 text-xs font-medium">
                  <MicOff className="h-3 w-3" />
                  Tracking disabled
                </span>
              )
            ) : (
              <span className="bg-muted text-muted-foreground inline-flex items-center gap-1 rounded px-2 py-0.5 text-xs font-medium">
                Bot not added
              </span>
            )}
            {isOwner && (
              <span className="text-muted-foreground text-xs">Owner</span>
            )}
          </div>
          {memberCount !== undefined && (
            <div className="text-muted-foreground mt-1.5 flex items-center gap-1 text-xs">
              <Users className="h-3 w-3" />
              <span>{memberCount.toLocaleString()} members</span>
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        {props.botAdded ? (
          <>
            <span className="border-border text-muted-foreground inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs">
              Free
            </span>
            <Button
              size="sm"
              variant="outline"
              disabled
              className="border-border text-muted-foreground/60 ml-auto cursor-not-allowed"
            >
              Upgrade
            </Button>
          </>
        ) : (
          <a
            href={addBotUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full"
          >
            <Button
              size="sm"
              className="bg-primary text-primary-foreground hover:bg-primary/90 w-full"
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              Add Dandere
            </Button>
          </a>
        )}
      </div>
    </div>
  );
}
