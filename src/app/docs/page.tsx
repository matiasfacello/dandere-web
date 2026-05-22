import type { Metadata } from "next";
import { DocsNav } from "~/components/docs/docs-nav";
import { CommandList } from "~/components/docs/command-list";
import { CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Docs — Dandere",
  description:
    "Setup guide and command reference for the Dandere Discord voice tracking bot.",
};

const gettingStartedSteps = [
  {
    step: "1",
    title: "Add the bot to your server",
    description: "Use the invite link in the navigation bar to add Dandere. Grant the requested permissions when prompted.",
  },
  {
    step: "2",
    title: "Run /trackvoice-all #channel",
    description: "In any text channel, run the command and mention the channel where logs should be posted.",
  },
  {
    step: "3",
    title: "Optionally ignore users",
    description: "Use /trackvoice-ignoreuser @user to exclude bots or specific members from your logs.",
  },
  {
    step: "4",
    title: "Stop tracking any time",
    description: "Run /trackvoice-disable to stop all voice tracking in your server.",
  },
];

const loggedEvents = [
  "User connected to a voice channel",
  "User disconnected from a voice channel",
  "User moved between voice channels",
  "User started or stopped streaming",
];

const botPermissions = [
  { label: "View Channels", note: null },
  { label: "Send Messages", note: null },
  { label: "Manage Messages", note: "required for /clear" },
  { label: "Read Message History", note: "required for /clear" },
];

export default function DocsPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <div className="flex flex-col gap-10 lg:flex-row">
        {/* Sidebar */}
        <aside className="lg:w-56 shrink-0">
          <DocsNav />
        </aside>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          <div className="mb-12">
            <h1 className="mb-4 text-4xl font-bold text-foreground">Documentation</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Everything you need to set up and use Dandere in your Discord server.
            </p>
          </div>

          {/* Getting Started */}
          <section id="getting-started" className="mb-16 scroll-mt-20">
            <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold text-foreground">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-sm font-bold text-primary">
                1
              </span>
              Getting Started
            </h2>

            <div className="rounded-xl border border-border/50 bg-card/30 p-6">
              <p className="mb-8 text-muted-foreground leading-relaxed">
                Setting up Dandere is quick and easy. Follow these steps to start logging voice events.
              </p>

              <div className="space-y-6">
                {gettingStartedSteps.map((item) => (
                  <div key={item.step} className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary">
                      {item.step}
                    </div>
                    <div className="flex-1 pt-1">
                      <h3 className="mb-1 font-semibold text-foreground">{item.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex items-start gap-3 rounded-lg border border-primary/20 bg-primary/5 p-4">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <div>
                  <p className="text-sm font-medium text-foreground">Pro tip</p>
                  <p className="text-sm text-muted-foreground">
                    Use{" "}
                    <code className="rounded bg-secondary px-1 py-0.5 font-mono text-xs text-primary">
                      /status
                    </code>{" "}
                    anytime to check bot connectivity and WebSocket ping.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Commands */}
          <CommandList />

          {/* What Gets Logged */}
          <section id="what-gets-logged" className="mb-16 scroll-mt-20">
            <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold text-foreground">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-sm font-bold text-primary">
                3
              </span>
              What Gets Logged
            </h2>

            <div className="rounded-xl border border-border/50 bg-card/30 p-6">
              <ul className="space-y-3">
                {loggedEvents.map((event) => (
                  <li key={event} className="flex items-center gap-3 text-foreground/80">
                    <span className="h-2 w-2 shrink-0 rounded-full bg-green-500" />
                    {event}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Bot Permissions */}
          <section id="bot-permissions" className="mb-16 scroll-mt-20">
            <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold text-foreground">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-sm font-bold text-primary">
                4
              </span>
              Bot Permissions Required
            </h2>

            <div className="rounded-xl border border-border/50 bg-card/30 p-6">
              <ul className="space-y-3">
                {botPermissions.map(({ label, note }) => (
                  <li key={label} className="flex items-center gap-3 text-foreground/80">
                    <span className="h-2 w-2 shrink-0 rounded-full bg-primary" />
                    {label}
                    {note && (
                      <span className="text-sm text-muted-foreground/70">— {note}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
