import { CheckCircle2 } from "lucide-react";

const steps = [
  {
    number: "1",
    title: "Add the bot to your server",
    description:
      "Use the invite link to add Dandere to your Discord server. Grant the requested permissions when prompted.",
  },
  {
    number: "2",
    title: "Run /trackvoice-all #channel",
    description:
      "In any text channel, run the command and mention the channel where logs should be posted.",
  },
  {
    number: "3",
    title: "Done — events log automatically",
    description:
      "Dandere will now post real-time voice activity logs to your chosen channel. No further configuration needed.",
  },
];

export function HowItWorks() {
  return (
    <section className="relative px-4 py-24">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-foreground mb-6 flex items-center justify-center gap-3 text-center text-3xl font-bold tracking-tight">
          How it works
        </h2>

        <div className="border-border/50 bg-card/30 rounded-xl border p-6 md:p-8">
          <p className="text-muted-foreground mb-8 leading-relaxed">
            Setting up Dandere takes under a minute. Three steps and you&apos;re
            logging every voice event.
          </p>

          <div className="space-y-6">
            {steps.map((step) => (
              <div key={step.number} className="flex gap-4">
                <div className="bg-primary/10 text-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-semibold">
                  {step.number}
                </div>
                <div className="flex-1 pt-1">
                  <h3 className="text-foreground mb-1 font-semibold">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-primary/20 bg-primary/5 mt-8 flex items-start gap-3 rounded-lg border p-4">
            <CheckCircle2 className="text-primary mt-0.5 h-5 w-5 shrink-0" />
            <div>
              <p className="text-foreground text-sm font-medium">Pro tip</p>
              <p className="text-muted-foreground text-sm">
                Use{" "}
                <code className="bg-secondary text-primary rounded px-1 py-0.5 font-mono text-xs">
                  /trackvoice-ignoreuser @user
                </code>{" "}
                to exclude bots or specific members from your logs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
