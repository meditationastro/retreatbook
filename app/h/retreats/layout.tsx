
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Luxury Meditation Retreat Nepal",
  description: "Premium Himalayan meditation retreat with workshops, calendar booking, and deposit system.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": "Luxury Himalayan Meditation Retreat",
    "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
    "eventStatus": "https://schema.org/EventScheduled",
    "location": {
      "@type": "Place",
      "name": "Himalayan Eco Lodge",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "NP"
      }
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  )
}
