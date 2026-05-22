"use client";

import { useState } from "react";
import { cn } from "~/lib/utils";
import { ChevronRight, Copy, Check } from "lucide-react";

const commands = [
  {
    name: "/trackvoice-all",
    description: "Start tracking all voice channels and post logs to a text channel.",
    usage: "/trackvoice-all #channel",
    permission: "Manage Channels",
  },
  {
    name: "/trackvoice-disable",
    description: "Stop tracking voice channels in this server.",
    usage: "/trackvoice-disable",
    permission: "Manage Channels",
  },
  {
    name: "/trackvoice-ignoreuser",
    description: "Exclude a user from being tracked.",
    usage: "/trackvoice-ignoreuser @user",
    permission: "Manage Channels",
  },
  {
    name: "/trackvoice-unignoreuser",
    description: "Stop excluding a previously ignored user.",
    usage: "/trackvoice-unignoreuser @user",
    permission: "Manage Channels",
  },
  {
    name: "/clear",
    description: "Bulk delete up to 100 messages. Messages older than 14 days are deleted individually.",
    usage: "/clear [1–100]",
    permission: "Manage Messages",
  },
  {
    name: "/status",
    description: "Show bot status, database connectivity, and WebSocket ping.",
    usage: "/status",
    permission: "Administrator",
  },
];

function CommandCard({ command }: { command: (typeof commands)[0] }) {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(command.usage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="overflow-hidden rounded-xl border border-border/50 bg-card/30">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-secondary/30"
      >
        <div className="flex items-center gap-4">
          <code className="rounded bg-primary/10 px-2 py-1 font-mono text-sm text-primary">
            {command.name}
          </code>
          <span className="text-sm text-muted-foreground">{command.description}</span>
        </div>
        <ChevronRight
          className={cn(
            "h-5 w-5 shrink-0 text-muted-foreground transition-transform",
            expanded && "rotate-90"
          )}
        />
      </button>

      {expanded && (
        <div className="border-t border-border/50 px-4 pb-4 pt-4">
          <div className="mb-4">
            <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Usage
            </h4>
            <div className="flex items-center gap-2">
              <code className="flex-1 rounded-lg bg-secondary/50 px-3 py-2 font-mono text-sm text-foreground">
                {command.usage}
              </code>
              <button
                onClick={copy}
                className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-secondary/50 hover:text-foreground"
                aria-label="Copy command"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-primary" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          <div>
            <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Permission required
            </h4>
            <span className="inline-flex rounded bg-primary/10 px-2 py-0.5 font-mono text-sm text-primary">
              {command.permission}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export function CommandList() {
  return (
    <section id="commands" className="mb-16 scroll-mt-20">
      <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold text-foreground">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-sm font-bold text-primary">
          2
        </span>
        Commands
      </h2>

      <p className="mb-6 text-muted-foreground leading-relaxed">
        Dandere uses Discord slash commands. Here&apos;s the full command list.
      </p>

      <div className="space-y-3">
        {commands.map((cmd) => (
          <CommandCard key={cmd.name} command={cmd} />
        ))}
      </div>
    </section>
  );
}
