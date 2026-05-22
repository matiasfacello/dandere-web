import { Server, Mic, Activity } from "lucide-react";
import { DashboardSignInButton } from "~/components/dashboard-sign-in";

export function DashboardCta() {
  return (
    <section className="py-24 px-4">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-2xl border border-primary/20 bg-primary/5 p-8 text-center sm:p-12">
          <h2 className="mb-3 text-3xl font-bold text-foreground">
            Keep an eye on your servers
          </h2>
          <p className="mx-auto mb-8 max-w-xl text-lg text-muted-foreground">
            Sign in with Discord to see which of your servers have Dandere installed,
            check tracking status, and get an overview of your bot activity — all in one place.
          </p>

          <div className="mb-8 flex flex-col items-center justify-center gap-4 text-sm text-muted-foreground sm:flex-row sm:gap-8">
            <div className="flex items-center gap-2">
              <Server className="h-4 w-4 text-primary" />
              <span>Server tracking status</span>
            </div>
            <div className="flex items-center gap-2">
              <Mic className="h-4 w-4 text-primary" />
              <span>Voice activity overview</span>
            </div>
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-primary" />
              <span>Real-time monitoring</span>
            </div>
          </div>

          <DashboardSignInButton size="lg" />
        </div>
      </div>
    </section>
  );
}
