import { Server, Mic, Activity } from "lucide-react";
import { DashboardSignInButton } from "~/components/dashboard-sign-in";

export function DashboardCta() {
  return (
    <section className="px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="border-primary/20 bg-primary/5 rounded-2xl border p-8 text-center sm:p-12">
          <h2 className="text-foreground mb-3 text-3xl font-bold">
            Keep an eye on your servers
          </h2>
          <p className="text-muted-foreground mx-auto mb-8 max-w-xl text-lg">
            Sign in with Discord to see which of your servers have Dandere
            installed, check tracking status, and get an overview of your bot
            activity — all in one place.
          </p>

          <div className="text-muted-foreground mb-8 flex flex-col items-center justify-center gap-4 text-sm sm:flex-row sm:gap-8">
            <div className="flex items-center gap-2">
              <Server className="text-primary h-4 w-4" />
              <span>Server tracking status</span>
            </div>
            <div className="flex items-center gap-2">
              <Mic className="text-primary h-4 w-4" />
              <span>Voice activity overview</span>
            </div>
            <div className="flex items-center gap-2">
              <Activity className="text-primary h-4 w-4" />
              <span>Real-time monitoring</span>
            </div>
          </div>

          <DashboardSignInButton size="lg" />
        </div>
      </div>
    </section>
  );
}
