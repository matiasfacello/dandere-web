import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — Dandere",
  description: "Privacy Policy for the Dandere Discord bot and website.",
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="mb-3 text-4xl font-bold text-foreground">Privacy Policy</h1>
      <p className="mb-12 text-sm text-muted-foreground">Last updated: May 22, 2026</p>

      <div className="space-y-10 text-foreground/80 leading-relaxed">

        <section>
          <h2 className="mb-4 text-xl font-semibold text-foreground">1. Overview</h2>
          <div className="rounded-xl border border-border/50 bg-card/30 p-6 space-y-3">
            <p>
              Dandere (&ldquo;the bot&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) is a Discord bot that tracks voice channel
              activity in servers where it has been added. This Privacy Policy explains what data we
              collect, how we use it, and your rights regarding that data.
            </p>
            <p>
              By adding Dandere to your Discord server or using this website, you agree to the
              practices described in this policy.
            </p>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold text-foreground">2. Data We Collect</h2>
          <div className="rounded-xl border border-border/50 bg-card/30 p-6 space-y-6">
            <div>
              <h3 className="mb-3 font-semibold text-foreground">Through the bot</h3>
              <ul className="space-y-2">
                {[
                  ["Server (guild) IDs", "To identify which servers have the bot enabled and store their configuration."],
                  ["Channel IDs", "The log channel selected via /trackvoice-all, and the voice channels where activity is detected."],
                  ["User IDs", "Stored only when a user is added to the ignore list via /trackvoice-ignoreuser. Also associated with voice activity events in the log."],
                  ["Voice activity events", "When a user joins, leaves, moves between, or streams in a voice channel — the event type, timestamp, and the Discord user ID involved are recorded and posted to the configured log channel."],
                ].map(([label, desc]) => (
                  <li key={label as string} className="flex gap-3">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" />
                    <span>
                      <span className="font-medium text-foreground">{label}</span>
                      {" — "}
                      {desc}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-3 font-semibold text-foreground">Through the website (dashboard)</h3>
              <ul className="space-y-2">
                {[
                  ["Discord OAuth profile", "When you log in via Discord, we receive your Discord user ID, username, and avatar URL through Discord's OAuth2 API."],
                  ["Guild list", "We request the list of servers you are in (Discord's guilds scope) to compute which servers have the bot installed. This list is used only in your browser session and is not stored."],
                  ["Session data", "A session token is stored in a cookie to keep you logged in for up to 30 days."],
                ].map(([label, desc]) => (
                  <li key={label as string} className="flex gap-3">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" />
                    <span>
                      <span className="font-medium text-foreground">{label}</span>
                      {" — "}
                      {desc}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-sm text-muted-foreground border-t border-border/50 pt-4">
              We do not collect message content, voice audio, IP addresses, or any information beyond
              what is described above.
            </p>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold text-foreground">3. How We Use Your Data</h2>
          <div className="rounded-xl border border-border/50 bg-card/30 p-6 space-y-3">
            <p>We use the collected data only to provide the bot&apos;s features:</p>
            <ul className="space-y-2 mt-2">
              {[
                "Posting voice activity logs to the configured channel in your server.",
                "Respecting the per-user ignore list so excluded users are not logged.",
                "Displaying server status on the dashboard for authenticated users.",
                "Maintaining your login session on the website.",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-green-500" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-3">
              We do not use your data for advertising, analytics, or any purpose unrelated to
              operating the bot and website.
            </p>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold text-foreground">4. Data Sharing</h2>
          <div className="rounded-xl border border-border/50 bg-card/30 p-6 space-y-3">
            <p>
              We do not sell, rent, or share your data with third parties. The only external service
              involved is Discord itself — we use their API to receive events and post log messages.
              Discord&apos;s own{" "}
              <a
                href="https://discord.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 underline underline-offset-2"
              >
                Privacy Policy
              </a>{" "}
              governs how Discord handles your data on their platform.
            </p>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold text-foreground">5. Data Retention</h2>
          <div className="rounded-xl border border-border/50 bg-card/30 p-6 space-y-3">
            <p>
              Server configuration data (guild ID, log channel, tracking status) is retained as long
              as the bot is present in the server. Voice activity logs stored in our database are
              retained indefinitely unless a deletion request is made.
            </p>
            <p>
              To remove all data associated with your server, remove the bot from the server and
              contact us at the address below to request full data deletion.
            </p>
            <p>
              Website session data is cleared when you sign out or after 30 days of inactivity.
            </p>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold text-foreground">6. Your Rights</h2>
          <div className="rounded-xl border border-border/50 bg-card/30 p-6 space-y-3">
            <p>You have the right to:</p>
            <ul className="space-y-2 mt-2">
              {[
                "Request a copy of the data we hold about you or your server.",
                "Request deletion of your data.",
                "Opt out of data collection by removing the bot from your server.",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-3">
              To exercise any of these rights, contact us at{" "}
              <a
                href="mailto:dandere@matiasfacello.dev"
                className="text-primary hover:text-primary/80 underline underline-offset-2"
              >
                dandere@matiasfacello.dev
              </a>
              .
            </p>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold text-foreground">7. Children&apos;s Privacy</h2>
          <div className="rounded-xl border border-border/50 bg-card/30 p-6">
            <p>
              Dandere is intended for use on Discord, which requires users to be at least 13 years
              old. We do not knowingly collect data from users under 13. If you believe we have
              inadvertently collected such data, contact us and we will delete it promptly.
            </p>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold text-foreground">8. Changes to This Policy</h2>
          <div className="rounded-xl border border-border/50 bg-card/30 p-6">
            <p>
              We may update this Privacy Policy from time to time. Continued use of the bot or
              website after changes are posted constitutes acceptance of the updated policy. The date
              at the top of this page reflects the most recent revision.
            </p>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold text-foreground">9. Contact</h2>
          <div className="rounded-xl border border-border/50 bg-card/30 p-6">
            <p>
              Questions or requests regarding this policy can be sent to{" "}
              <a
                href="mailto:dandere@matiasfacello.dev"
                className="text-primary hover:text-primary/80 underline underline-offset-2"
              >
                dandere@matiasfacello.dev
              </a>
              .
            </p>
          </div>
        </section>

      </div>
    </main>
  );
}
