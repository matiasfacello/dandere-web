"use client";

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { authClient } from "~/lib/auth-client";

type User = {
  name: string;
  image?: string | null;
};

export function SignInButton() {
  return (
    <Button
      size="sm"
      variant="ghost"
      className="text-muted-foreground hover:text-foreground"
      onClick={() =>
        authClient.signIn.social({
          provider: "discord",
          callbackURL: "/dashboard",
        })
      }
    >
      Sign in
    </Button>
  );
}

export function UserMenu({ user }: { user: User }) {
  return (
    <Link
      href="/dashboard"
      className="text-foreground/80 hover:bg-secondary hover:text-foreground flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors"
    >
      <Avatar className="h-6 w-6">
        <AvatarImage src={user.image ?? undefined} alt={user.name} />
        <AvatarFallback className="text-xs">
          {user.name[0].toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <span>{user.name}</span>
    </Link>
  );
}
