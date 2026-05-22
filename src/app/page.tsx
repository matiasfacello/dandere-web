import { Hero } from "~/components/hero";
import { Features } from "~/components/features";
import { HowItWorks } from "~/components/how-it-works";
import { PremiumTeaser } from "~/components/premium-teaser";
import { Separator } from "~/components/ui/separator";

export default function Home() {
  return (
    <>
      <Hero />
      <Separator className="bg-border" />
      <Features />
      <Separator className="bg-border" />
      <HowItWorks />
      <Separator className="bg-border" />
      <PremiumTeaser />
    </>
  );
}
