"use client";

import { useState } from "react";
import { cn } from "~/lib/utils";
import { ChevronRight, Copy, Check } from "lucide-react";

const commands = [
  {
    name: "/trackvoice-all",
    description:
      "Start tracking all voice channels and post logs to a text channel.",
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
    description:
      "Bulk delete up to 100 messages. Messages older than 14 days are deleted individually.",
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
    <div className="border-border/50 bg-card/30 overflow-hidden rounded-xl border">
      <button
        onClick={() => setExpanded(!expanded)}
        className="hover:bg-secondary/30 flex w-full items-center justify-between p-4 text-left transition-colors"
      >
        <div className="flex items-center gap-4">
          <code className="bg-primary/10 text-primary rounded px-2 py-1 font-mono text-sm">
            {command.name}
          </code>
          <span className="text-muted-foreground text-sm">
            {command.description}
          </span>
        </div>
        <ChevronRight
          className={cn(
            "text-muted-foreground h-5 w-5 shrink-0 transition-transform",
            expanded && "rotate-90"
          )}
        />
      </button>

      {expanded && (
        <div className="border-border/50 border-t px-4 pt-4 pb-4">
          <div className="mb-4">
            <h4 className="text-muted-foreground mb-2 text-xs font-semibold tracking-wider uppercase">
              Usage
            </h4>
            <div className="flex items-center gap-2">
              <code className="bg-secondary/50 text-foreground flex-1 rounded-lg px-3 py-2 font-mono text-sm">
                {command.usage}
              </code>
              <button
                onClick={copy}
                className="text-muted-foreground hover:bg-secondary/50 hover:text-foreground rounded-lg p-2 transition-colors"
                aria-label="Copy command"
              >
                {copied ? (
                  <Check className="text-primary h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          <div>
            <h4 className="text-muted-foreground mb-2 text-xs font-semibold tracking-wider uppercase">
              Permission required
            </h4>
            <span className="bg-primary/10 text-primary inline-flex rounded px-2 py-0.5 font-mono text-sm">
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
      <h2 className="text-foreground mb-6 flex items-center gap-3 text-2xl font-bold">
        <span className="bg-primary/10 text-primary flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold">
          2
        </span>
        Commands
      </h2>

      <p className="text-muted-foreground mb-6 leading-relaxed">
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
