export function retreatJsonLd(r: any) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: r.title,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: { "@type": "Place", name: r.location },
    description: r.description,
    image: r.image ? [r.image] : undefined,
    offers: (r.pricingTiers || []).map((t: any) => ({
      "@type": "Offer",
      name: t.name,
      price: String(t.price || "").replace(/[^0-9.]/g, "") || undefined,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    })),
  }
}
