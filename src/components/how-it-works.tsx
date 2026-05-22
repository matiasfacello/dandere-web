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
    <section className="px-4 py-24 relative">
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-6 flex items-center justify-center gap-3 text-center text-3xl font-bold tracking-tight text-foreground">
          How it works
        </h2>

        <div className="rounded-xl border border-border/50 bg-card/30 p-6 md:p-8">
          <p className="mb-8 text-muted-foreground leading-relaxed">
            Setting up Dandere takes under a minute. Three steps and you&apos;re logging every voice event.
          </p>

          <div className="space-y-6">
            {steps.map((step) => (
              <div key={step.number} className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
                  {step.number}
                </div>
                <div className="flex-1 pt-1">
                  <h3 className="mb-1 font-semibold text-foreground">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex items-start gap-3 rounded-lg border border-primary/20 bg-primary/5 p-4">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
            <div>
              <p className="text-sm font-medium text-foreground">Pro tip</p>
              <p className="text-sm text-muted-foreground">
                Use <code className="rounded bg-secondary px-1 py-0.5 font-mono text-primary text-xs">/trackvoice-ignoreuser @user</code> to exclude bots or specific members from your logs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
