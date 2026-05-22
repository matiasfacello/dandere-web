import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — Dandere",
  description: "Terms of Service for the Dandere Discord bot and website.",
};

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="mb-3 text-4xl font-bold text-foreground">Terms of Service</h1>
      <p className="mb-12 text-sm text-muted-foreground">Last updated: May 22, 2026</p>

      <div className="space-y-10 text-foreground/80 leading-relaxed">

        <section>
          <h2 className="mb-4 text-xl font-semibold text-foreground">1. Acceptance of Terms</h2>
          <div className="rounded-xl border border-border/50 bg-card/30 p-6 space-y-3">
            <p>
              By adding Dandere (&ldquo;the bot&rdquo;) to your Discord server or accessing this website, you
              agree to be bound by these Terms of Service. If you do not agree, do not use the bot
              or this website.
            </p>
            <p>
              These terms apply to all users, including server administrators who add the bot and
              members of servers where the bot is active.
            </p>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold text-foreground">2. Description of Service</h2>
          <div className="rounded-xl border border-border/50 bg-card/30 p-6 space-y-3">
            <p>
              Dandere is a Discord bot that tracks voice channel activity — joins, leaves, channel
              moves, and stream start/stop events — and posts real-time logs to a text channel of
              your choosing. It also provides a utility command to bulk-delete messages.
            </p>
            <p>
              This website provides a landing page, documentation, and an authenticated dashboard
              where Discord users can view the configuration status of servers where they and the bot
              are both present.
            </p>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold text-foreground">3. Eligibility</h2>
          <div className="rounded-xl border border-border/50 bg-card/30 p-6 space-y-3">
            <p>
              You must comply with{" "}
              <a
                href="https://discord.com/terms"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 underline underline-offset-2"
              >
                Discord&apos;s Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="https://discord.com/guidelines"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 underline underline-offset-2"
              >
                Community Guidelines
              </a>{" "}
              to use Dandere. Use of Discord requires users to be at least 13 years old.
            </p>
            <p>
              Server administrators are responsible for ensuring that their use of the bot complies
              with applicable laws and regulations in their jurisdiction.
            </p>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold text-foreground">4. Acceptable Use</h2>
          <div className="rounded-xl border border-border/50 bg-card/30 p-6 space-y-3">
            <p>You agree not to use Dandere to:</p>
            <ul className="space-y-2 mt-2">
              {[
                "Harass, monitor, or surveil individuals without their knowledge or consent where prohibited by law.",
                "Violate Discord's Terms of Service or Community Guidelines.",
                "Attempt to exploit, reverse-engineer, or abuse the bot or its underlying infrastructure.",
                "Use the bot in ways that could harm other users or third parties.",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-red-500" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-3 text-sm text-muted-foreground border-t border-border/50 pt-4">
              Dandere logs voice activity at the server level. Server administrators are solely
              responsible for informing their members that voice activity is being logged and for
              complying with any applicable privacy laws in their region.
            </p>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold text-foreground">5. Service Availability</h2>
          <div className="rounded-xl border border-border/50 bg-card/30 p-6 space-y-3">
            <p>
              We make no guarantees regarding uptime or availability. The bot may be unavailable due
              to maintenance, Discord API outages, or other factors outside our control.
            </p>
            <p>
              We reserve the right to modify, suspend, or discontinue the bot or any part of the
              website at any time, with or without notice.
            </p>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold text-foreground">6. Termination</h2>
          <div className="rounded-xl border border-border/50 bg-card/30 p-6 space-y-3">
            <p>
              We reserve the right to remove the bot from a server or block access to the website
              if we determine, in our sole discretion, that these terms have been violated.
            </p>
            <p>
              You may stop using the bot at any time by removing it from your server via Discord&apos;s
              server settings.
            </p>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold text-foreground">7. Limitation of Liability</h2>
          <div className="rounded-xl border border-border/50 bg-card/30 p-6 space-y-3">
            <p>
              Dandere is provided &ldquo;as is&rdquo; without any warranties, express or implied. We are not
              liable for any damages, data loss, or service interruptions arising from the use of
              the bot or this website.
            </p>
            <p>
              In no event shall our total liability to you for any claim exceed the amount you have
              paid us in the past twelve months, which for most users is zero.
            </p>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold text-foreground">8. Intellectual Property</h2>
          <div className="rounded-xl border border-border/50 bg-card/30 p-6">
            <p>
              All code, design, and content comprising Dandere and this website are owned by their
              respective authors. Nothing in these terms grants you any right to use our trademarks,
              trade names, or branding.
            </p>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold text-foreground">9. Changes to These Terms</h2>
          <div className="rounded-xl border border-border/50 bg-card/30 p-6">
            <p>
              We may update these Terms of Service at any time. Continued use of the bot or website
              after changes are posted constitutes acceptance of the revised terms. The date at the
              top of this page reflects the most recent update.
            </p>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold text-foreground">10. Contact</h2>
          <div className="rounded-xl border border-border/50 bg-card/30 p-6">
            <p>
              Questions about these terms can be sent to{" "}
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
