import Image from "next/image";
import Link from "next/link";
import { headers } from "next/headers";
import { auth } from "~/lib/auth";
import { SignInButton, UserMenu } from "~/components/auth-buttons";

export async function Navbar() {
  const session = await auth.api.getSession({ headers: await headers() });

  return (
    <header className="border-b border-border bg-background">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="Dandere" width={28} height={28} />
            <span className="font-semibold text-foreground">Dandere</span>
          </Link>
          <nav className="hidden items-center gap-1 sm:flex">
            <Link
              href="/"
              className="rounded-md px-3 py-1.5 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
            >
              Home
            </Link>
            <Link
              href="/docs"
              className="rounded-md px-3 py-1.5 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
            >
              Docs
            </Link>
            <Link
              href="/dashboard"
              className="rounded-md px-3 py-1.5 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
            >
              Dashboard
            </Link>
          </nav>
        </div>
        <div>
          {session?.user ? (
            <UserMenu user={session.user} />
          ) : (
            <SignInButton />
          )}
        </div>
      </div>
    </header>
  );
}
