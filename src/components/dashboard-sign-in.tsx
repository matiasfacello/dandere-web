"use client";

import { Button } from "~/components/ui/button";
import { authClient } from "~/lib/auth-client";

export function DashboardSignInButton({ size = "default" }: { size?: "default" | "lg" }) {
  return (
    <Button
      size={size}
      onClick={() => authClient.signIn.social({ provider: "discord", callbackURL: "/dashboard" })}
      className="bg-primary text-primary-foreground hover:bg-primary/90"
    >
      Sign in with Discord
    </Button>
  );
}
