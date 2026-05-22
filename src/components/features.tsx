import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

const features = [
  {
    title: "Voice Join & Leave",
    description:
      "Log every time a user enters or exits a voice channel — timestamp, user, and channel included.",
  },
  {
    title: "Move Detection",
    description:
      "Track when a user switches from one voice channel to another within the same server.",
  },
  {
    title: "Stream Start & Stop",
    description:
      "Know exactly when a member starts or stops streaming in a voice channel.",
  },
  {
    title: "Per-User Ignore List",
    description:
      "Exclude specific users from tracking with /trackvoice-ignoreuser — useful for bots or admins.",
  },
  {
    title: "Bulk Message Clear",
    description:
      "Delete up to 100 messages at once with /clear. Messages older than 14 days are removed individually.",
  },
];

export function Features() {
  return (
    <section className="px-4 py-16">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-10 text-center text-3xl font-bold tracking-tight text-foreground">
          What Dandere tracks
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title} className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-semibold text-foreground">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
