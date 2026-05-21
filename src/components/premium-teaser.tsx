import { Badge } from "~/components/ui/badge";

const upcomingFeatures = [
  "Per-channel tracking filters",
  "Daily and weekly voice activity summaries",
  "Leaderboards — top active members by voice time",
  "Export logs to CSV",
];

export function PremiumTeaser() {
  return (
    <section className="px-4 py-16">
      <div className="mx-auto max-w-2xl rounded-xl border border-zinc-800 bg-zinc-900 p-8 text-center">
        <Badge className="mb-4 bg-indigo-500/10 text-indigo-400 border-indigo-500/20">
          Coming soon
        </Badge>
        <h2 className="mb-3 text-2xl font-bold tracking-tight text-zinc-100">
          Dandere Premium
        </h2>
        <p className="mb-6 text-zinc-400">
          We&apos;re working on premium features for power users and larger communities. Stay tuned.
        </p>
        <ul className="mb-8 flex flex-col gap-2 text-left">
          {upcomingFeatures.map((feature) => (
            <li key={feature} className="flex items-center gap-2 text-sm text-zinc-300">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 shrink-0" />
              {feature}
            </li>
          ))}
        </ul>
        <p className="text-sm text-zinc-500">
          No pricing yet — follow us for updates when premium launches.
        </p>
      </div>
    </section>
  );
}
