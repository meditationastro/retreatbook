import SiteShell from "@/components/SiteShell"
import Link from "next/link"
import { readSiteContent } from "@/lib/siteContent"

export default function AstrologyPage() {
  const sc = readSiteContent()
  const a = sc.astrology || {}
  const services = a.services || []
  return (
    <SiteShell>
      <main className="max-w-6xl mx-auto px-6 py-16 space-y-10">
        <header className="space-y-3">
          <h1 className="text-4xl font-bold">{a.title || "Authentic Vedic Astrology Consultations"}</h1>
          <p className="text-white/70">{a.introRich || ""}</p>
        </header>

        <section className="grid md:grid-cols-3 gap-6">
          {services.map((s: any) => (
            <Link key={s.slug} href={`/vedic-astrology/${s.slug}`} className="rounded-3xl border border-white/10 bg-white/5 hover:bg-white/10 transition p-8 space-y-3">
              <div className="text-xl font-semibold">{s.title}</div>
              <p className="text-white/70 text-sm">{s.desc}</p>
              <div className="text-sm text-white/60">{s.duration} • <span className="text-white/80 font-medium">{s.price}</span></div>
              <div className="underline text-white/70">Book Now</div>
            </Link>
          ))}
        </section>
      </main>
    </SiteShell>
  )
}
