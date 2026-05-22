import type { Metadata } from "next";
import { Separator } from "~/components/ui/separator";
import { Badge } from "~/components/ui/badge";

export const metadata: Metadata = {
  title: "Docs — Dandere",
  description:
    "Setup guide and command reference for the Dandere Discord voice tracking bot.",
};

const gettingStartedSteps = [
  {
    step: 1,
    text: (
      <>
        Add the bot to your server using the invite link in the navigation bar.
      </>
    ),
  },
  {
    step: 2,
    text: (
      <>
        Run{" "}
        <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-sm text-primary">
          /trackvoice-all #channel
        </code>{" "}
        to begin logging voice activity to a text channel.
      </>
    ),
  },
  {
    step: 3,
    text: (
      <>
        Optionally ignore specific users with{" "}
        <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-sm text-primary">
          /trackvoice-ignoreuser @user
        </code>
        .
      </>
    ),
  },
  {
    step: 4,
    text: (
      <>
        Run{" "}
        <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-sm text-primary">
          /trackvoice-disable
        </code>{" "}
        to stop tracking at any time.
      </>
    ),
  },
];

const commands = [
  {
    command: "/trackvoice-all #channel",
    description:
      "Start tracking all voice channels and post logs to the given text channel.",
    permission: "Manage Channels",
  },
  {
    command: "/trackvoice-disable",
    description: "Stop tracking voice channels.",
    permission: "Manage Channels",
  },
  {
    command: "/trackvoice-ignoreuser @user",
    description: "Exclude a user from tracking.",
    permission: "Manage Channels",
  },
  {
    command: "/trackvoice-unignoreuser @user",
    description: "Stop excluding a user.",
    permission: "Manage Channels",
  },
  {
    command: "/clear [1–100]",
    description:
      "Bulk delete up to 100 messages. Messages older than 14 days are deleted individually.",
    permission: "Manage Messages",
  },
  {
    command: "/status",
    description:
      "Show bot status, database connectivity, and WebSocket ping.",
    permission: "Administrator",
  },
];

const loggedEvents = [
  "User connected to a voice channel",
  "User disconnected from a voice channel",
  "User moved between voice channels",
  "User started or stopped streaming",
];

const botPermissions = [
  "View Channels",
  "Send Messages",
  { label: "Manage Messages", note: "required for /clear" },
  { label: "Read Message History", note: "required for /clear" },
];

export default function DocsPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">
          Documentation
        </h1>
        <p className="mt-2 text-muted-foreground">
          Everything you need to set up and use Dandere in your Discord server.
        </p>
      </div>

      {/* Getting Started */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold tracking-tight text-foreground">
          Getting Started
        </h2>
        <ol className="flex flex-col gap-5">
          {gettingStartedSteps.map(({ step, text }) => (
            <li key={step} className="flex gap-4">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                {step}
              </span>
              <p className="pt-0.5 text-foreground/80 leading-relaxed">{text}</p>
            </li>
          ))}
        </ol>
      </section>

      <Separator className="mb-12 bg-border" />

      {/* Command Reference */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold tracking-tight text-foreground">
          Command Reference
        </h2>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-card">
                <th className="px-4 py-3 text-left font-semibold text-foreground/80">
                  Command
                </th>
                <th className="px-4 py-3 text-left font-semibold text-foreground/80">
                  Description
                </th>
                <th className="px-4 py-3 text-left font-semibold text-foreground/80">
                  Permission
                </th>
              </tr>
            </thead>
            <tbody>
              {commands.map((row, i) => (
                <tr
                  key={row.command}
                  className={
                    i < commands.length - 1 ? "border-b border-border" : ""
                  }
                >
                  <td className="px-4 py-3 align-top">
                    <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-primary">
                      {row.command}
                    </code>
                  </td>
                  <td className="px-4 py-3 align-top text-muted-foreground">
                    {row.description}
                  </td>
                  <td className="px-4 py-3 align-top">
                    <Badge
                      variant="outline"
                      className="border-border text-muted-foreground whitespace-nowrap"
                    >
                      {row.permission}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <Separator className="mb-12 bg-border" />

      {/* What Gets Logged */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold tracking-tight text-foreground">
          What Gets Logged
        </h2>
        <ul className="flex flex-col gap-3">
          {loggedEvents.map((event) => (
            <li key={event} className="flex items-center gap-3 text-foreground/80">
              <span className="h-2 w-2 shrink-0 rounded-full bg-green-500" />
              {event}
            </li>
          ))}
        </ul>
      </section>

      <Separator className="mb-12 bg-border" />

      {/* Bot Permissions Required */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold tracking-tight text-foreground">
          Bot Permissions Required
        </h2>
        <ul className="flex flex-col gap-3">
          {botPermissions.map((perm) => {
            const label = typeof perm === "string" ? perm : perm.label;
            const note = typeof perm === "string" ? null : perm.note;
            return (
              <li key={label} className="flex items-center gap-3 text-foreground/80">
                <span className="h-2 w-2 shrink-0 rounded-full bg-primary" />
                {label}
                {note && (
                  <span className="text-sm text-muted-foreground/70">— {note}</span>
                )}
              </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
}
