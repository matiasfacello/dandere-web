# TODO

<!-- headlines-stamp: e25fdc187a8a -->
## Headlines

All open work is background agent work — see `## Background` below.

- [M] B1. Show per-channel tracking correctly — the dashboard reads only `guild.trackAll`, so a guild tracking one channel renders as "Tracking disabled". **Start here.**
- [S] B2. Bring command documentation up to date — 6 of 8 commands listed; `/trackvoice-channel*` and `everything:True` are missing
- [M] B3. Distinguish Discord API failures from an empty dashboard — a 401/429/timeout currently renders "No mutual servers yet"
- [S] B4. Make command expansion and copying accessible — no `aria-expanded`, and clipboard success shows without awaiting the write
<!-- /headlines -->

## Background — agent work (low priority)

From an agent source review on 2026-09-08 (claims re-checked against the code on 2026-10-05, still accurate). Nothing here needs a product decision — it's work an agent can pick up unattended when nothing else is queued. **S** = small change; **M** = one focused session.

### B1. Show per-channel tracking correctly — M — start here

**Evidence:** [dashboard/page.tsx](src/app/dashboard/page.tsx) selects only
`guild.trackAll` and uses it for the enabled count.
[server-card.tsx](src/components/server-card.tsx) also labels `trackAll: false`
as “Tracking disabled.” The bot's
[voiceTracking.ts](../dandere/src/helpers/voiceTracking.ts) correctly allows
enabled `channelTracking` rows to keep logging when `trackAll` is false.

**Agent brief:** Read enabled per-channel tracking for the already-authorized
managed guild IDs. Derive a small view model distinguishing all-channels,
selected-channels, and disabled. Use it consistently in the card and aggregate
count. Keep database reads bounded, avoid a per-card query, and preserve current
server-side authentication and managed-guild filtering.

**Done when:** Fixture-driven checks cover all-channel tracking, selected-channel
tracking, disabled remembered rows, no tracking, and unrelated guild IDs. A guild
with one enabled channel is counted as enabled. The website performs no writes
to bot-managed tables and introduces no schema changes.

### B2. Bring command documentation up to date — S

**Evidence:** [command-list.tsx](src/components/docs/command-list.tsx) lists six
commands. The bot also implements `/trackvoice-channel` and
`/trackvoice-channel-disable`, plus `everything` on `/trackvoice-disable`.
The current website describes disable as stopping tracking across the server.

**Agent brief:** Update the static command data and relevant setup explanations
from the sibling bot's command builders and [readme](../dandere/readme.md).
Explain that the destination channel is guild-wide: configuring another tracked
channel currently updates `guild.logChannelId`. Keep examples faithful to the
actual options rather than implying a separate destination for every channel.

**Done when:** All eight implemented commands have correct names, options,
permissions, and behavior. The disable example explains both default and
`everything:True`. Lint/typecheck and a local `/docs` render pass. This is a
content correction; it does not need a new test framework.

### B3. Distinguish Discord failures from an empty dashboard — M

**Evidence:** The dashboard leaves `userGuilds = []` when the token is absent or
Discord returns a non-OK response. Users then see “No mutual servers yet.” A
network exception or malformed permissions value can instead fail the page.

**Agent brief:** Extract guild loading into a server-only function with explicit
success, reauthentication-needed, and temporary-failure results. Validate the
response shape and permission values, bound the request duration, and offer
appropriate retry/sign-in UI. Preserve the current permission policy. Do not
build a custom OAuth token-refresh system in this task.

**Done when:** Mocked responses cover valid empty/nonempty results, missing token,
401, 429, 5xx, timeout, malformed JSON, and invalid permission data. Failures never
claim the user has no servers, and neither tokens nor provider response bodies
appear in rendered errors. No real Discord account is required.

### B4. Make command expansion and copying accessible — S

**Evidence:** The command card button has no `aria-expanded`/`aria-controls`.
Copy starts `navigator.clipboard.writeText()` without awaiting it and immediately
shows success, even if clipboard access fails.

**Agent brief:** Link each button to its panel with stable IDs and expansion
state. Await copying, announce success/failure through a polite live region,
and clean up the reset timer. Keep the existing layout and generated UI
primitives unchanged.

**Done when:** Keyboard interaction opens/closes cards; accessibility inspection
shows the correct expanded state; a rejected clipboard promise never shows a
success checkmark. Repeated copies and unmounts leave no stale timer updates.

### How to hand these off

Use: “Implement B1 in `TODO.md` (Background section). Follow repository instructions and
verify with fixtures, lint, and TypeScript without using the shared database.”

Read the installed Next.js guides before coding, as required by `AGENTS.md`.
The package currently declares Next 16.3.0 despite the older version named in
the project guide. Add a local test entrypoint only where the behavioral tasks
need one. No dashboard mutations, premium checkout, migrations, or live OAuth
configuration are part of these proposals.
