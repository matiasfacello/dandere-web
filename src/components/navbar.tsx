import Image from "next/image";
import Link from "next/link";
import { headers } from "next/headers";
import { auth } from "~/lib/auth";
import { NavLinks } from "~/components/nav-links";

export async function Navbar() {
  const session = await auth.api.getSession({ headers: await headers() });

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 glow-border overflow-hidden">
            <Image src="/logo.png" alt="Dandere" width={42} height={42} />
          </div>
          <span className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">Dandere</span>
        </Link>

        <NavLinks session={session} />
      </div>
    </header>
  );
}
