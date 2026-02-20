import SiteShell from "@/components/SiteShell"
import Breadcrumbs from "@/components/Breadcrumbs"
import { retreatJsonLd } from "@/lib/seo"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getRetreat, readRetreats } from "@/lib/retreats"

export function generateStaticParams() {
  return readRetreats().items.map((r) => ({ slug: r.slug }))
}

export default function RetreatDetail({ params }: { params: { slug: string } }) {
  const r = getRetreat(params.slug)
  if (!r) return notFound()

  return (
    <SiteShell>
      {/* SEO JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(retreatJsonLd(r)) }} />
      <main className="max-w-6xl mx-auto px-6 py-14 space-y-12">
        <Breadcrumbs items={[{label:"Home", href:"/"},{label:"Retreats", href:"/retreats"},{label:r.title}]} />
        <section className="grid lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <div className="text-sm text-white/50">{r.location} • {r.durationDays} days</div>
            <h1 className="text-4xl font-bold">{r.title}</h1>
            <p className="text-white/70">{r.description}</p>
            <div className="flex flex-wrap gap-2">
              {(r.focus || []).map((f) => (
                <span key={f} className="text-xs border border-white/15 rounded-full px-3 py-2 text-white/60">{f}</span>
              ))}
            </div>
            <div className="pt-3 flex flex-wrap gap-3">
              <Link href={`/h/retreats/${r.slug}`} className="bg-white text-black px-6 py-3 rounded-full hover:opacity-90">Book with Calendar</Link>
              <Link href="/contact" className="border border-white/20 px-6 py-3 rounded-full hover:bg-white/10">Ask a question</Link>
            </div>
            <div className="text-sm text-white/50">Pricing from {r.priceFrom}. Deposit required for Feb 2026 onwards.</div>
          </div>
          <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-white/5 h-[360px]">
            <Image src={r.image || "/img/retreats/gallery1.jpg"} alt={r.title} fill className="object-cover" priority />
          </div>
        </section>

        <section className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 rounded-3xl border border-white/10 bg-white/5 p-8 space-y-4">
            <h2 className="text-2xl font-semibold">Experience Overview</h2>
            <p className="text-white/70">{r.description}</p>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-white/70">
              <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
                <div className="font-semibold text-white">Spiritual Goals</div>
                <ul className="mt-2 list-disc pl-5 space-y-1">
                  {(r.highlights || []).slice(0, 6).map((h) => <li key={h}>{h}</li>)}
                </ul>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
                <div className="font-semibold text-white">Who it is for</div>
                <div className="mt-2">Beginners to advanced practitioners seeking clarity, rest, and disciplined practice.</div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 space-y-4">
            <h2 className="text-xl font-semibold">Dates</h2>
            <div className="space-y-3 text-sm text-white/70">
              {(r.dates || []).map((d, i) => (
                <div key={i} className="rounded-2xl border border-white/10 bg-black/30 p-4">
                  <div><span className="text-white/50">Start:</span> {d.start}</div>
                  <div><span className="text-white/50">End:</span> {d.end}</div>
                  <div><span className="text-white/50">Deposit:</span> {d.deposit}</div>
                  {typeof d.seats !== "undefined" && <div><span className="text-white/50">Seats:</span> {d.seats}</div>}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/5 p-8">
          <h2 className="text-2xl font-semibold">Daily Schedule</h2>
          <div className="mt-5 grid md:grid-cols-2 gap-4">
            {(r.schedule || []).map((s, i) => (
              <div key={i} className="rounded-2xl border border-white/10 bg-black/30 p-5 flex items-center justify-between">
                <div className="text-white/80 font-medium">{s.label}</div>
                <div className="text-white/50">{s.time}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/5 p-8 space-y-6">
          <h2 className="text-2xl font-semibold">Accommodation & Venue</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {(r.accommodation || []).map((a, i) => (
              <div key={i} className="rounded-3xl border border-white/10 bg-black/30 overflow-hidden">
                <div className="relative h-44">
                  <Image src={a.images?.[0] || "/img/retreats/gallery2.jpg"} alt={a.title} fill className="object-cover" />
                </div>
                <div className="p-6 space-y-2">
                  <div className="text-xl font-semibold">{a.title}</div>
                  <div className="text-white/70 text-sm">{a.desc}</div>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {(a.amenities || []).map((x) => (
                      <span key={x} className="text-xs border border-white/15 rounded-full px-3 py-2 text-white/60">{x}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/5 p-8 space-y-6">
  <h2 className="text-2xl font-semibold">Investment</h2>
  <div className="grid md:grid-cols-3 gap-4">
    {(r.pricingTiers || []).map((t: any, i: number) => (
      <div key={i} className={"rounded-3xl border " + (t.recommended ? "border-white/30 bg-white/10" : "border-white/10 bg-black/30") + " p-6 space-y-2"}>
        <div className="text-sm text-white/50">{t.name}</div>
        <div className="text-2xl font-bold">{t.price}</div>
        <ul className="text-sm text-white/70 list-disc pl-5 space-y-1">
          {(t.includes || []).map((x: string) => <li key={x}>{x}</li>)}
        </ul>
        {t.recommended && <div className="text-xs text-white/60 pt-2">Recommended</div>}
      </div>
    ))}
  </div>
  <div className="text-sm text-white/60">Early bird discounts and payment plans can be configured per retreat in Admin → Retreats.</div>
</section>


<section className="rounded-3xl border border-white/10 bg-white/5 p-8 space-y-6">
  <h2 className="text-2xl font-semibold">Retreat Gallery</h2>
  <div className="grid md:grid-cols-3 gap-4">
    {(r.gallery || [r.image]).filter(Boolean).slice(0, 9).map((src: string, i: number) => (
      <div key={i} className="relative h-36 rounded-2xl overflow-hidden border border-white/10 bg-black/30">
        <Image src={src} alt={`Gallery ${i + 1}`} fill className="object-cover" />
      </div>
    ))}
  </div>
  <div className="text-xs text-white/50">Upload images in Admin → Uploads and paste URLs in Admin → Retreats → Gallery.</div>
</section>

<section className="rounded-3xl border border-white/10 bg-white/5 p-8 space-y-4">
  <h2 className="text-2xl font-semibold">FAQ</h2>

          <div className="space-y-3">
            {(r.faq || []).map((f, i) => (
              <details key={i} className="rounded-2xl border border-white/10 bg-black/30 p-5">
                <summary className="cursor-pointer font-medium">{f.q}</summary>
                <div className="mt-3 text-white/70 text-sm">{f.a}</div>
              </details>
            ))}
          </div>
        </section>
      </main>
    </SiteShell>
  )
}
