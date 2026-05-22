import { headers } from "next/headers";
import { auth } from "~/lib/auth";
import { Hero } from "~/components/hero";
import { Features } from "~/components/features";
import { HowItWorks } from "~/components/how-it-works";
import { DashboardCta } from "~/components/dashboard-cta";
import { PremiumTeaser } from "~/components/premium-teaser";

export default async function Home() {
  const session = await auth.api.getSession({ headers: await headers() });

  return (
    <>
      <Hero />
      <Features />
      <HowItWorks />
      {!session && <DashboardCta />}
      <PremiumTeaser />
    </>
  );
}
