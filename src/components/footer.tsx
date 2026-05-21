import Link from "next/link";

export function Footer() {
  const inviteUrl = `https://discord.com/api/oauth2/authorize?client_id=${process.env.DISCORD_CLIENT_ID}&permissions=76800&scope=bot+applications.commands`;

  return (
    <footer className="border-t border-zinc-800 bg-zinc-950">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-6 text-sm text-zinc-400">
        <span>© {new Date().getFullYear()} Dandere</span>
        <nav className="flex items-center gap-6">
          <a
            href={inviteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-100 transition-colors"
          >
            Add to Discord
          </a>
          <Link href="/docs" className="hover:text-zinc-100 transition-colors">
            Docs
          </Link>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-100 transition-colors"
          >
            GitHub
          </a>
        </nav>
      </div>
    </footer>
  );
}
