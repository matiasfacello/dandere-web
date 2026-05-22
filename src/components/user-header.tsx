"use client";

import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { authClient } from "~/lib/auth-client";

type Props = {
  name: string;
  image?: string | null;
};

export function UserHeader({ name, image }: Props) {
  const router = useRouter();

  async function handleSignOut() {
    await authClient.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <div className="flex items-center gap-3 rounded-lg border border-border/50 bg-card/50 px-4 py-2">
      <Avatar className="h-8 w-8">
        <AvatarImage src={image ?? undefined} alt={name} />
        <AvatarFallback className="text-xs">{name[0].toUpperCase()}</AvatarFallback>
      </Avatar>
      <span className="text-sm text-foreground">{name}</span>
      <Button
        size="sm"
        variant="ghost"
        className="ml-1 h-7 px-2 text-xs text-muted-foreground hover:text-foreground"
        onClick={handleSignOut}
      >
        Sign out
      </Button>
    </div>
  );
}
