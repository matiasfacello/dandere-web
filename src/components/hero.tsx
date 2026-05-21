import Link from "next/link";
import { Button } from "~/components/ui/button";

export function Hero() {
  const inviteUrl = `https://discord.com/api/oauth2/authorize?client_id=${process.env.DISCORD_CLIENT_ID}&permissions=76800&scope=bot+applications.commands`;

  return (
    <section className="flex flex-col items-center gap-8 py-24 px-4 text-center">
      <div className="flex flex-col items-center gap-4">
        <h1 className="max-w-2xl text-5xl font-bold tracking-tight text-zinc-100 sm:text-6xl">
          Dandere
        </h1>
        <p className="max-w-xl text-xl text-zinc-400 leading-relaxed">
          Track every voice event in your Discord server
        </p>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <a href={inviteUrl} target="_blank" rel="noopener noreferrer">
          <Button size="lg" className="bg-indigo-500 hover:bg-indigo-400 text-white w-full sm:w-auto">
            Add to Discord
          </Button>
        </a>
        <Link href="/docs">
          <Button size="lg" variant="outline" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100 w-full sm:w-auto">
            Read the docs
          </Button>
        </Link>
      </div>
    </section>
  );
}
