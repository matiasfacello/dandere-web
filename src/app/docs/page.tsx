import type { Metadata } from "next";
import { DocsNav } from "~/components/docs/docs-nav";
import { CommandList } from "~/components/docs/command-list";
import { CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Docs",
  description:
    "Setup guide and command reference for the Dandere Discord voice tracking bot.",
  openGraph: {
    title: "Docs — Dandere",
    description:
      "Setup guide and command reference for the Dandere Discord voice tracking bot.",
    url: "/docs",
  },
  twitter: {
    title: "Docs — Dandere",
    description:
      "Setup guide and command reference for the Dandere Discord voice tracking bot.",
  },
};

const gettingStartedSteps = [
  {
    step: "1",
    title: "Add the bot to your server",
    description:
      "Use the invite link in the navigation bar to add Dandere. Grant the requested permissions when prompted.",
  },
  {
    step: "2",
    title: "Run /trackvoice-all #channel",
    description:
      "In any text channel, run the command and mention the channel where logs should be posted.",
  },
  {
    step: "3",
    title: "Optionally ignore users",
    description:
      "Use /trackvoice-ignoreuser @user to exclude bots or specific members from your logs.",
  },
  {
    step: "4",
    title: "Stop tracking any time",
    description:
      "Run /trackvoice-disable to stop all voice tracking in your server.",
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
        <aside className="shrink-0 lg:w-56">
          <DocsNav />
        </aside>

        {/* Main content */}
        <div className="min-w-0 flex-1">
          <div className="mb-12">
            <h1 className="text-foreground mb-4 text-4xl font-bold">
              Documentation
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Everything you need to set up and use Dandere in your Discord
              server.
            </p>
          </div>

          {/* Getting Started */}
          <section id="getting-started" className="mb-16 scroll-mt-20">
            <h2 className="text-foreground mb-6 flex items-center gap-3 text-2xl font-bold">
              <span className="bg-primary/10 text-primary flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold">
                1
              </span>
              Getting Started
            </h2>

            <div className="border-border/50 bg-card/30 rounded-xl border p-6">
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Setting up Dandere is quick and easy. Follow these steps to
                start logging voice events.
              </p>

              <div className="space-y-6">
                {gettingStartedSteps.map((item) => (
                  <div key={item.step} className="flex gap-4">
                    <div className="bg-primary/10 text-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-semibold">
                      {item.step}
                    </div>
                    <div className="flex-1 pt-1">
                      <h3 className="text-foreground mb-1 font-semibold">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {item.description}
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
            <h2 className="text-foreground mb-6 flex items-center gap-3 text-2xl font-bold">
              <span className="bg-primary/10 text-primary flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold">
                3
              </span>
              What Gets Logged
            </h2>

            <div className="border-border/50 bg-card/30 rounded-xl border p-6">
              <ul className="space-y-3">
                {loggedEvents.map((event) => (
                  <li
                    key={event}
                    className="text-foreground/80 flex items-center gap-3"
                  >
                    <span className="h-2 w-2 shrink-0 rounded-full bg-green-500" />
                    {event}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Bot Permissions */}
          <section id="bot-permissions" className="mb-16 scroll-mt-20">
            <h2 className="text-foreground mb-6 flex items-center gap-3 text-2xl font-bold">
              <span className="bg-primary/10 text-primary flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold">
                4
              </span>
              Bot Permissions Required
            </h2>

            <div className="border-border/50 bg-card/30 rounded-xl border p-6">
              <ul className="space-y-3">
                {botPermissions.map(({ label, note }) => (
                  <li
                    key={label}
                    className="text-foreground/80 flex items-center gap-3"
                  >
                    <span className="bg-primary h-2 w-2 shrink-0 rounded-full" />
                    {label}
                    {note && (
                      <span className="text-muted-foreground/70 text-sm">
                        — {note}
                      </span>
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
