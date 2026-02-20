
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  // Create the Feb 2026 onwards retreat with 4 start dates
  const dates = [
    new Date("2026-02-01T00:00:00.000Z"),
    new Date("2026-03-01T00:00:00.000Z"),
    new Date("2026-04-01T00:00:00.000Z"),
    new Date("2026-05-01T00:00:00.000Z"),
  ]

  const retreat = await prisma.retreat.upsert({
    where: { slug: "luxury-himalayan-meditation-retreat" },
    update: {
      title: "Luxury Himalayan Meditation Retreat",
      location: "Nepal (Himalayan Eco-Lodge)",
      description:
        "A transformational premium experience blending meditation, healing workshops, mindful nature immersion, and luxury comfort in the Himalayas.",
      heroImage: "/img/retreats/gallery1.jpg",
      availableDates: dates,
      isActive: true,
    },
    create: {
      slug: "luxury-himalayan-meditation-retreat",
      title: "Luxury Himalayan Meditation Retreat",
      location: "Nepal (Himalayan Eco-Lodge)",
      description:
        "A transformational premium experience blending meditation, healing workshops, mindful nature immersion, and luxury comfort in the Himalayas.",
      heroImage: "/img/retreats/gallery1.jpg",
      availableDates: dates,
      isActive: true,
      packages: {
        create: [
          {
            name: "7-Day Himalayan Awakening",
            priceCents: 149900,
            depositCents: 30000,
            features: [
              "Luxury eco-lodge accommodation",
              "Airport pickup (Kathmandu)",
              "Daily guided meditation & breathwork",
              "Workshops + journaling program",
              "All vegetarian meals included",
            ],
          },
          {
            name: "14-Day Deep Transformation",
            priceCents: 279900,
            depositCents: 30000,
            features: [
              "Private room option (subject to availability)",
              "1-on-1 coaching session",
              "Extended silent retreat periods",
              "Personal growth plan & follow-up",
              "All meals + excursions included",
            ],
          },
        ],
      },
    },
  })

  console.log("Seeded retreat:", retreat.slug)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
