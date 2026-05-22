import Link from "next/link";
import { Button } from "~/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export function Hero() {
  const inviteUrl = `https://discord.com/api/oauth2/authorize?client_id=${process.env.DISCORD_CLIENT_ID}&permissions=76800&scope=bot+applications.commands`;

  return (
    <section className="relative flex min-h-[calc(100vh-3.5rem)] items-center justify-center overflow-hidden pb-16">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-anime opacity-50" />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Floating orbs */}
      <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-primary/10 blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-accent/10 blur-3xl animate-pulse delay-1000" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 text-center">
        {/* Badge */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-2 text-sm text-primary">
          <Sparkles className="h-4 w-4" />
          <span>Voice Channel Tracking Made Simple</span>
        </div>

        {/* Heading */}
        <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
          <span className="text-foreground">Track Every Voice Event</span>
          <br />
          <span className="text-gradient-anime">In Your Discord Server</span>
        </h1>

        {/* Subheading */}
        <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground leading-relaxed md:text-xl">
          Dandere logs every voice channel join, leave, move, and stream event in real time — posted straight to a channel of your choice.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a href={inviteUrl} target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 glow-cyan px-8 text-base w-full sm:w-auto">
              Add to Discord
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </a>
          <Link href="/docs">
            <Button size="lg" variant="outline" className="px-8 text-base w-full sm:w-auto">
              Read the Docs
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="mx-auto mt-20 flex max-w-xl items-center justify-around gap-8">
          {[
            { value: "Free", label: "Forever" },
            { value: "6", label: "Event Types" },
            { value: "24/7", label: "Monitoring" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="mb-1 text-3xl font-bold text-foreground md:text-4xl">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
