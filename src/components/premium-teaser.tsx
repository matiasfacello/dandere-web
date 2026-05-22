import Link from "next/link";
import { Button } from "~/components/ui/button";
import { ArrowRight } from "lucide-react";

const upcomingFeatures = [
  "Per-channel tracking filters",
  "Daily and weekly voice activity summaries",
  "Leaderboards — top active members by voice time",
  "Export logs to CSV",
];

export function PremiumTeaser() {
  const inviteUrl = `https://discord.com/api/oauth2/authorize?client_id=${process.env.DISCORD_CLIENT_ID}&permissions=76800&scope=bot+applications.commands`;

  return (
    <section className="relative overflow-hidden px-4 py-24">
      {/* Background effects */}

      <div className="mx-auto max-w-4xl text-center glow-border rounded-3xl border border-border/50 bg-card/50 p-8 backdrop-blur-sm">
        <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">Dandere Premium</h2>
        <p className="mx-auto mb-6 max-w-xl text-lg text-muted-foreground">
          We&apos;re working on premium features for power users and larger communities. Stay tuned.
        </p>

        <ul className="mb-10 inline-flex flex-col gap-2 text-left">
          {upcomingFeatures.map((feature) => (
            <li key={feature} className="flex items-center gap-2 text-sm text-foreground/80">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              {feature}
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-center">
          <Button size="lg" disabled className="bg-primary text-primary-foreground hover:bg-primary/90 glow-cyan px-8 text-base w-full sm:w-auto">
            Coming Soon
          </Button>
        </div>

        <p className="mt-6 text-sm text-muted-foreground/70">Follow us for updates when premium launches.</p>
      </div>
    </section>
  );
}
