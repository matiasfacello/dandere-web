import Link from "next/link";
import { Book, Terminal, Radio, Shield } from "lucide-react";

const sections = [
  { title: "Getting Started", icon: Book, href: "#getting-started" },
  { title: "Commands", icon: Terminal, href: "#commands" },
  { title: "What Gets Logged", icon: Radio, href: "#what-gets-logged" },
  { title: "Bot Permissions", icon: Shield, href: "#bot-permissions" },
];

export function DocsNav() {
  return (
    <nav className="lg:sticky lg:top-20">
      <div className="rounded-xl border border-border/50 bg-card/50 p-4">
        <h3 className="mb-4 px-2 text-sm font-semibold text-foreground">On this page</h3>
        <ul className="space-y-1">
          {sections.map((section) => (
            <li key={section.href}>
              <Link
                href={section.href}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary/50 hover:text-foreground"
              >
                <section.icon className="h-4 w-4 shrink-0" />
                {section.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
