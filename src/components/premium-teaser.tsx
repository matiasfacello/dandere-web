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

      <div className="glow-border border-border/50 bg-card/50 mx-auto max-w-4xl rounded-3xl border p-8 text-center backdrop-blur-sm">
        <h2 className="text-foreground mb-4 text-3xl font-bold tracking-tight md:text-4xl">
          Dandere Premium
        </h2>
        <p className="text-muted-foreground mx-auto mb-6 max-w-xl text-lg">
          We&apos;re working on premium features for power users and larger
          communities. Stay tuned.
        </p>

        <ul className="mb-10 inline-flex flex-col gap-2 text-left">
          {upcomingFeatures.map((feature) => (
            <li
              key={feature}
              className="text-foreground/80 flex items-center gap-2 text-sm"
            >
              <span className="bg-primary h-1.5 w-1.5 shrink-0 rounded-full" />
              {feature}
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-center">
          <Button
            size="lg"
            disabled
            className="bg-primary text-primary-foreground hover:bg-primary/90 glow-cyan w-full px-8 text-base sm:w-auto"
          >
            Coming Soon
          </Button>
        </div>

        <p className="text-muted-foreground/70 mt-6 text-sm">
          Follow us for updates when premium launches.
        </p>
      </div>
    </section>
  );
}
