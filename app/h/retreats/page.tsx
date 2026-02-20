
"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"

type Retreat = {
  id: string
  slug: string
  title: string
  location: string
  description?: string | null
  heroImage?: string | null
  availableDates: string[]
}

export default function RetreatsListingPage() {
  const [retreats, setRetreats] = useState<Retreat[]>([])

  useEffect(() => {
    ;(async () => {
      const res = await fetch("/api/retreats")
      const data = await res.json()
      setRetreats(data.retreats || [])
    })()
  }, [])

  return (
    <main className="bg-[#070707] text-white min-h-screen">
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-10 text-center">
        <motion.h1 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="text-5xl font-bold tracking-tight"
        >
          Premium Meditation Retreats — Nepal
        </motion.h1>
        <p className="mt-4 text-lg text-white/70">
          Choose your experience. Reserve with a deposit and receive a full itinerary by email.
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-2 gap-8">
          {retreats.map((r) => {
            const firstDate = r.availableDates?.[0] ? new Date(r.availableDates[0]).toDateString() : "Coming soon"
            const hero = r.heroImage || "/img/retreats/gallery1.jpg"
            return (
              <Link
                key={r.id}
                href={`/h/retreats/${r.slug}`}
                className="group rounded-3xl border border-white/10 overflow-hidden bg-white/5 hover:bg-white/10 transition shadow-2xl"
              >
                <div className="relative h-56 w-full">
                  <Image src={hero} alt={r.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/70 via-black/25 to-transparent" />
                </div>
                <div className="p-8">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-2xl font-semibold">{r.title}</h2>
                      <div className="mt-2 text-white/70">{r.location}</div>
                    </div>
                    <div className="text-xs border border-white/20 px-3 py-2 rounded-full text-white/70">
                      View details
                    </div>
                  </div>
                  <p className="mt-4 text-white/70 line-clamp-3">
                    {r.description || "A premium experience blending meditation, healing workshops, and Himalayan immersion."}
                  </p>
                  <div className="mt-6 text-sm text-white/60">
                    Next start date: <span className="text-white/80">{firstDate}</span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        <div className="mt-12 text-center text-white/50 text-sm">
          Want a private group retreat or corporate mindfulness program? Contact us via the booking form inside any retreat.
        </div>
      </section>
    </main>
  )
}
