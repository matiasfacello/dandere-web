import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Navbar } from "~/components/navbar";
import { Footer } from "~/components/footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const siteUrl =
  process.env.BETTER_AUTH_URL ??
  "http://localhost:3000"; /* fallback for development */

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Dandere",
    template: "%s — Dandere",
  },
  description:
    "Track every voice event in your Discord server. Dandere logs voice joins, leaves, moves, and streams in real time.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Dandere",
    title: "Dandere — Discord Voice Activity Tracker",
    description:
      "Track every voice event in your Discord server. Dandere logs voice joins, leaves, moves, and streams in real time.",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dandere — Discord Voice Activity Tracker",
    description:
      "Track every voice event in your Discord server. Dandere logs voice joins, leaves, moves, and streams in real time.",
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    apple: "/apple-touch-icon.png",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} dark h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <Navbar />
        <main className="flex-1 pt-14">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
