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
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Avatar className="h-10 w-10">
          <AvatarImage src={image ?? undefined} alt={name} />
          <AvatarFallback>{name[0].toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold text-zinc-100">{name}</p>
          <p className="text-sm text-zinc-400">Discord account</p>
        </div>
      </div>
      <Button
        size="sm"
        variant="outline"
        className="border-zinc-700 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100"
        onClick={handleSignOut}
      >
        Sign out
      </Button>
    </div>
  );
}
