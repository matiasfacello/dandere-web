"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "~/lib/utils";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { SignInButton, UserMenu } from "~/components/auth-buttons";

type SessionUser = {
  name: string;
  image?: string | null;
};

const links = [
  { href: "/", label: "Home" },
  { href: "/docs", label: "Docs" },
];

export function NavLinks({ session }: { session: { user: SessionUser } | null }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <nav className="hidden items-center gap-1 sm:flex">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
              pathname === link.href ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground hover:bg-secondary/50",
            )}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="hidden sm:flex items-center gap-3">{session?.user ? <UserMenu user={session.user} /> : <SignInButton />}</div>

      <button
        className="sm:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle menu"
      >
        {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {mobileOpen && (
        <div className="fixed inset-x-0 top-14 z-40 border-b border-border/50 bg-background/95 backdrop-blur-xl sm:hidden">
          <div className="flex flex-col gap-1 p-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "px-4 py-3 rounded-lg text-sm font-medium transition-all",
                  pathname === link.href ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground hover:bg-secondary/50",
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 px-1">{session?.user ? <UserMenu user={session.user} /> : <SignInButton />}</div>
          </div>
        </div>
      )}
    </>
  );
}
