const steps = [
  {
    number: 1,
    title: "Add the bot to your server",
    description:
      'Use the invite link to add Dandere to your Discord server. Grant the requested permissions when prompted.',
  },
  {
    number: 2,
    title: "Run /trackvoice-all #channel",
    description:
      "In any text channel, run the command and mention the channel where logs should be posted. That's it.",
  },
  {
    number: 3,
    title: "Done — events log automatically",
    description:
      "Dandere will now post real-time voice activity logs to your chosen channel. No further configuration needed.",
  },
];

export function HowItWorks() {
  return (
    <section className="px-4 py-16">
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-10 text-center text-3xl font-bold tracking-tight text-foreground">
          How it works
        </h2>
        <div className="flex flex-col gap-8">
          {steps.map((step, i) => (
            <div key={step.number} className="flex gap-5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground text-sm">
                {step.number}
              </div>
              <div className="flex flex-col gap-1 pt-1">
                <h3 className="font-semibold text-foreground">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
                {i < steps.length - 1 && (
                  <div className="mt-4 ml-[-33px] h-6 w-px bg-border self-start" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
