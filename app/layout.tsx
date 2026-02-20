import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], display: "swap" })

const siteUrl = process.env.NEXT_PUBLIC_URL || "https://clueux.com"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Clue UX — Luxury Retreats, Self-Reflection & Life Answers",
    template: "%s | Clue UX",
  },
  description:
    "Premium meditation retreats in Nepal, workshops, life answers hub, guides, tools, resources, and spiritual journeys.",
  applicationName: "Clue UX",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Clue UX — Luxury Retreats & Answers Hub",
    description:
      "Reserve Himalayan meditation retreats with deposit. Explore workshops, guides, tools, and life answers.",
    url: siteUrl,
    siteName: "Clue UX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Clue UX — Luxury Retreats & Answers Hub",
    description:
      "Reserve Himalayan meditation retreats with deposit. Explore workshops, guides, tools, and life answers.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
