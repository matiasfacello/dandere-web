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
    <div className="border-border/50 bg-card/50 flex items-center gap-3 rounded-lg border px-4 py-2">
      <Avatar className="h-8 w-8">
        <AvatarImage src={image ?? undefined} alt={name} />
        <AvatarFallback className="text-xs">
          {name[0].toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <span className="text-foreground text-sm">{name}</span>
      <Button
        size="sm"
        variant="ghost"
        className="text-muted-foreground hover:text-foreground ml-1 h-7 px-2 text-xs"
        onClick={handleSignOut}
      >
        Sign out
      </Button>
    </div>
  );
}
