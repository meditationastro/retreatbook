
"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"
import CalendarGrid from "@/components/CalendarGrid"

type RetreatPackage = {
  id: string
  name: string
  priceCents: number
  depositCents: number
  features: string[]
}

type Retreat = {
  id: string
  slug: string
  title: string
  location: string
  description?: string | null
  heroImage?: string | null
  availableDates: string[]
  packages: RetreatPackage[]
}

function fmtUSD(cents: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(cents / 100)
}

const base = process.env.NEXT_PUBLIC_URL || "https://clueux.com"
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Do I need meditation experience?",
      acceptedAnswer: { "@type": "Answer", text: "No. Beginners and experienced practitioners are welcome. The retreat is guided step-by-step." },
    },
    {
      "@type": "Question",
      name: "How does the deposit work?",
      acceptedAnswer: { "@type": "Answer", text: "A deposit secures your seat. You can pay in full later or pay the remaining balance." },
    },
    {
      "@type": "Question",
      name: "When will I receive the itinerary?",
      acceptedAnswer: { "@type": "Answer", text: "After payment confirmation, we email your detailed itinerary and preparation guidance within 24 hours." },
    },
  ],
}


export default function RetreatDetailPage({ params }: { params: { slug: string } }) {
  const [retreat, setRetreat] = useState<Retreat | null>(null)
  const [selectedDate, setSelectedDate] = useState<string>("")
  const [selectedPackageId, setSelectedPackageId] = useState<string>("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    ;(async () => {
      const res = await fetch(`/api/retreats/${params.slug}`)
      const data = await res.json()
      if (res.ok) {
        const r = data.retreat as Retreat
        setRetreat(r)
        setSelectedPackageId(r.packages?.[0]?.id ?? "")
        setSelectedDate(r.availableDates?.[0] ?? "")
      } else {
        setError(data?.error || "Retreat not found.")
      }
    })()
  }, [params.slug])

  const selectedPkg = useMemo(() => {
    if (!retreat) return null
    return retreat.packages.find((p) => p.id === selectedPackageId) ?? retreat.packages[0] ?? null
  }, [retreat, selectedPackageId])

  const startCheckout = async (paymentKind: "DEPOSIT" | "FULL" | "BALANCE") => {
    setError(null)
    if (!retreat || !selectedPkg) return
    if (!selectedDate) return setError("Please select a start date.")
    if (!name || !email) return setError("Please add your name and email.")

    setLoading(true)
    try {
      const res = await fetch("/api/retreat-bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          retreatId: retreat.id,
          packageId: selectedPkg.id,
          selectedDate,
          name,
          email,
          phone,
          message,
          paymentKind,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || "Checkout failed.")
      window.location.href = data.url
    } catch (e: any) {
      setError(e.message || "Something went wrong.")
      setLoading(false)
    }
  }

  const hero = retreat?.heroImage || "/img/retreats/gallery1.jpg"

  return (
    <main className="bg-[#070707] text-white min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <div className="max-w-6xl mx-auto px-6 pt-8">
        <Link href="/h/retreats" className="text-sm text-white/60 hover:text-white/80">
          ← All retreats
        </Link>
      </div>

      <section className="max-w-6xl mx-auto px-6 py-10 grid lg:grid-cols-2 gap-10 items-center">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="text-5xl font-bold tracking-tight">{retreat?.title || "Retreat"}</h1>
          <p className="mt-3 text-lg text-white/70">{retreat?.location}</p>
          <p className="mt-6 text-white/70">
            {retreat?.description ||
              "A premium Himalayan experience blending meditation, healing workshops, nature immersion, and luxury comfort."}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/h/retreats/instructors"
              className="border border-white/20 px-5 py-3 rounded-full hover:bg-white/10"
            >
              Meet the Guides
            </Link>
            <a href="#booking" className="bg-white text-black px-5 py-3 rounded-full hover:opacity-90">
              Reserve now
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative h-[360px] w-full overflow-hidden rounded-3xl border border-white/10 shadow-2xl"
        >
          <Image src={hero} alt="Retreat in Nepal" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-tr from-black/70 via-black/20 to-transparent" />
        </motion.div>
      </section>

      <section id="booking" className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <div className="space-y-6">
            <h2 className="text-3xl font-semibold">Select your start date</h2>
            {retreat?.availableDates?.length ? (
              <CalendarGrid availableDates={retreat.availableDates} value={selectedDate} onChange={setSelectedDate} />
            ) : (
              <div className="rounded-3xl border border-white/10 p-6 bg-white/5 text-white/70">No dates yet.</div>
            )}

            <div className="rounded-3xl border border-white/10 p-6 bg-white/5">
              <h3 className="text-2xl font-semibold">Choose a package</h3>
              <div className="mt-4 grid gap-4">
                {retreat?.packages?.map((p) => {
                  const active = p.id === selectedPackageId
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setSelectedPackageId(p.id)}
                      className={[
                        "text-left rounded-2xl p-5 border transition",
                        active ? "border-white/40 bg-white/10" : "border-white/10 hover:bg-white/10",
                      ].join(" ")}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="text-xl font-semibold">{p.name}</div>
                          <div className="mt-1 text-white/70">Full: {fmtUSD(p.priceCents)}</div>
                          <div className="text-white/70">Deposit: {fmtUSD(p.depositCents)}</div>
                        </div>
                        <div className="text-xs border border-white/20 px-3 py-2 rounded-full text-white/70">
                          {active ? "Selected" : "Select"}
                        </div>
                      </div>
                      <ul className="mt-3 space-y-1 text-white/70 text-sm">
                        {p.features?.slice(0, 5)?.map((f, idx) => (
                          <li key={idx}>• {f}</li>
                        ))}
                      </ul>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 p-8 bg-white/5">
            <h2 className="text-3xl font-semibold">Reserve</h2>
            <p className="mt-2 text-white/60">
              Deposit secures your seat. You’ll receive a confirmation email after payment.
            </p>

            <div className="mt-6 grid gap-4">
              <input
                className="bg-black/30 border border-white/15 rounded-xl px-4 py-3"
                placeholder="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                className="bg-black/30 border border-white/15 rounded-xl px-4 py-3"
                placeholder="Email address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="bg-black/30 border border-white/15 rounded-xl px-4 py-3"
                placeholder="Phone (optional)"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <textarea
                className="bg-black/30 border border-white/15 rounded-xl px-4 py-3 min-h-[120px]"
                placeholder="Questions / special requests"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />

              {error && <div className="text-sm text-red-300">{error}</div>}

              <div className="grid sm:grid-cols-3 gap-3">
                <button
                  disabled={loading || !selectedPkg}
                  onClick={() => startCheckout("DEPOSIT")}
                  className="bg-white text-black px-5 py-3 rounded-xl hover:opacity-90 disabled:opacity-60"
                >
                  Pay Deposit
                </button>
                <button
                  disabled={loading || !selectedPkg}
                  onClick={() => startCheckout("FULL")}
                  className="border border-white/20 px-5 py-3 rounded-xl hover:bg-white/10 disabled:opacity-60"
                >
                  Pay Full
                </button>
                <button
                  disabled={loading || !selectedPkg}
                  onClick={() => startCheckout("BALANCE")}
                  className="border border-white/20 px-5 py-3 rounded-xl hover:bg-white/10 disabled:opacity-60"
                >
                  Pay Balance
                </button>
              </div>

              <div className="text-xs text-white/50">
                “Balance” is full price minus deposit (use after deposit is paid).
              </div>
            </div>
          </div>
        </div>


        <div className="mt-12 grid lg:grid-cols-2 gap-8">
          <div className="rounded-3xl border border-white/10 p-8 bg-white/5">
            <h3 className="text-2xl font-semibold">Workshop Curriculum</h3>
            <ul className="mt-4 space-y-2 text-white/70">
              <li>• Mindfulness foundations + breathwork</li>
              <li>• Healing circles & emotional integration</li>
              <li>• Self-inquiry journaling frameworks</li>
              <li>• Decision-making tools for clarity</li>
              <li>• Nature immersion & silent practice</li>
            </ul>
          </div>
          <div className="rounded-3xl border border-white/10 p-8 bg-white/5">
            <h3 className="text-2xl font-semibold">Sample Daily Flow</h3>
            <ul className="mt-4 space-y-2 text-white/70">
              <li>• Sunrise meditation + breathwork</li>
              <li>• Workshop session + journaling</li>
              <li>• Vegetarian meals + rest</li>
              <li>• Nature walk / silent reflection</li>
              <li>• Evening integration circle</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 grid md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="relative h-44 w-full overflow-hidden rounded-2xl border border-white/10">
              <Image src={`/img/retreats/gallery${i}.jpg`} alt="Retreat gallery" fill className="object-cover" />
            </div>
          ))}
        </div>

        <div className="mt-10 text-center text-white/40 text-sm">
          Replace gallery images in <code className="text-white/60">public/img/retreats</code> with your real retreat photos.
        </div>
      </section>
    </main>
  )
}
