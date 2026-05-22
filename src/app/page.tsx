import type { Metadata } from "next";
import { headers } from "next/headers";
import { auth } from "~/lib/auth";
import { Hero } from "~/components/hero";
import { Features } from "~/components/features";
import { HowItWorks } from "~/components/how-it-works";
import { DashboardCta } from "~/components/dashboard-cta";
import { PremiumTeaser } from "~/components/premium-teaser";

export const metadata: Metadata = {
  title: {
    absolute: "Dandere — Discord Voice Activity Tracker",
  },
  description:
    "Track every voice event in your Discord server. Dandere logs voice joins, leaves, moves, and streams in real time.",
  openGraph: {
    title: "Dandere — Discord Voice Activity Tracker",
    description:
      "Track every voice event in your Discord server. Dandere logs voice joins, leaves, moves, and streams in real time.",
    url: "/",
  },
  twitter: {
    title: "Dandere — Discord Voice Activity Tracker",
    description:
      "Track every voice event in your Discord server. Dandere logs voice joins, leaves, moves, and streams in real time.",
  },
};

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
