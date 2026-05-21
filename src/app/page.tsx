import { Hero } from "~/components/hero";
import { Features } from "~/components/features";
import { HowItWorks } from "~/components/how-it-works";
import { PremiumTeaser } from "~/components/premium-teaser";
import { Separator } from "~/components/ui/separator";

export default function Home() {
  return (
    <>
      <Hero />
      <Separator className="bg-zinc-800" />
      <Features />
      <Separator className="bg-zinc-800" />
      <HowItWorks />
      <Separator className="bg-zinc-800" />
      <PremiumTeaser />
    </>
  );
}
