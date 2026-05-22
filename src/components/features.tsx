import { Mic, ArrowRightLeft, Video, UserX, Trash2, Zap } from "lucide-react";

const features = [
  {
    icon: Mic,
    title: "Voice Join & Leave",
    description:
      "Log every time a user enters or exits a voice channel — timestamp, user, and channel included.",
  },
  {
    icon: ArrowRightLeft,
    title: "Move Detection",
    description:
      "Track when a user switches from one voice channel to another within the same server.",
  },
  {
    icon: Video,
    title: "Stream Start & Stop",
    description:
      "Know exactly when a member starts or stops streaming in a voice channel.",
  },
  {
    icon: UserX,
    title: "Per-User Ignore List",
    description:
      "Exclude specific users from tracking with /trackvoice-ignoreuser — useful for bots or admins.",
  },
  {
    icon: Trash2,
    title: "Bulk Message Clear",
    description:
      "Delete up to 100 messages at once with /clear. Messages older than 14 days are removed individually.",
  },
  {
    icon: Zap,
    title: "Instant & Reliable",
    description:
      "Events are posted in real time with no delay, keeping your logs accurate and up to date.",
  },
];

export function Features() {
  return (
    <section id="features" className="relative px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h2 className="text-foreground mb-4 text-3xl font-bold tracking-tight md:text-4xl">
            What Dandere tracks
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            Every voice event in your server, logged automatically and delivered
            straight to a channel of your choice.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group bg-card/50 border-border/50 hover:bg-card hover:border-primary/30 hover:shadow-primary/5 relative rounded-2xl border p-6 transition-all duration-300 hover:shadow-lg"
            >
              <div className="mb-4 flex items-center gap-4">
                <div className="bg-primary/10 text-primary group-hover:bg-primary/20 flex h-12 w-12 items-center justify-center rounded-xl transition-colors">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-foreground text-lg font-semibold">
                  {feature.title}
                </h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
