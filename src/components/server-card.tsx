import Image from "next/image";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";

type Props = {
  name: string;
  icon: string | null;
  guildId: string;
  trackAll: boolean;
};

export function ServerCard({ name, icon, guildId, trackAll }: Props) {
  const iconUrl = icon ? `https://cdn.discordapp.com/icons/${guildId}/${icon}.${icon.startsWith("a_") ? "gif" : "webp"}?size=64` : null;

  const initials = name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <Card className="border-border bg-card">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          {iconUrl ? (
            <Image src={iconUrl} alt={name} width={40} height={40} className="rounded-full" />
          ) : (
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary text-sm font-semibold text-foreground/80">
              {initials}
            </div>
          )}
          <p className="font-semibold text-foreground leading-tight">{name}</p>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <div className="flex flex-wrap gap-2">
          <Badge
            variant="outline"
            className={trackAll ? "border-green-500/30 bg-green-500/10 text-green-400" : "border-border bg-secondary text-muted-foreground"}
          >
            {trackAll ? "Tracking enabled" : "Tracking disabled"}
          </Badge>
          <Badge variant="outline" className="border-border text-muted-foreground">
            Free
          </Badge>
        </div>
        <Button size="sm" variant="outline" disabled className="mt-1 w-full border-border text-muted-foreground/60 cursor-not-allowed">
          Upgrade
        </Button>
      </CardContent>
    </Card>
  );
}
