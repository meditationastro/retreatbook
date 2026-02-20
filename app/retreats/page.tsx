"use client"
import { useMemo, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import SiteShell from "@/components/SiteShell"
import { readRetreats } from "@/lib/retreats"

export default function RetreatsPage() {
  const data = readRetreats()
  const items = data.items || []
  const [location, setLocation] = useState("all")
  const [duration, setDuration] = useState("all")
  const [focus, setFocus] = useState("all")
  const [q, setQ] = useState("")

  const locations = Array.from(new Set(items.map((r: any) => r.location)))
  const focuses = Array.from(new Set(items.flatMap((r: any) => r.focus || [])))

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase()
    return items.filter((r: any) => {
      if (location !== "all" && r.location !== location) return false
      if (duration !== "all") {
        const d = Number(duration)
        if (Number.isFinite(d) && r.durationDays !== d) return false
      }
      if (focus !== "all" && !(r.focus || []).includes(focus)) return false
      if (s && !(JSON.stringify(r).toLowerCase().includes(s))) return false
      return true
    })
  }, [items, location, duration, focus, q])

  return (
    <SiteShell>
      <main className="max-w-7xl mx-auto px-6 py-16 space-y-10">
        <header className="space-y-3">
          <h1 className="text-4xl font-bold">Immersive Spiritual Retreats</h1>
          <p className="text-white/70">Premium retreats designed for awakening, clarity, and deep rest. Deposits from Feb 2026 onwards.</p>
        </header>

        <section className="rounded-3xl border border-white/10 bg-white/5 p-6 grid md:grid-cols-4 gap-4">
          <div>
            <div className="text-xs text-white/50 mb-2">Location</div>
            <select value={location} onChange={(e) => setLocation(e.target.value)} className="w-full rounded-2xl bg-black/40 border border-white/10 px-4 py-3">
              <option value="all">All</option>
              {locations.map((l) => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>
          <div>
            <div className="text-xs text-white/50 mb-2">Duration</div>
            <select value={duration} onChange={(e) => setDuration(e.target.value)} className="w-full rounded-2xl bg-black/40 border border-white/10 px-4 py-3">
              <option value="all">All</option>
              {Array.from(new Set(items.map((r: any) => r.durationDays))).sort((a:any,b:any)=>a-b).map((d:any) => (
                <option key={d} value={String(d)}>{d} days</option>
              ))}
            </select>
          </div>
          <div>
            <div className="text-xs text-white/50 mb-2">Focus</div>
            <select value={focus} onChange={(e) => setFocus(e.target.value)} className="w-full rounded-2xl bg-black/40 border border-white/10 px-4 py-3">
              <option value="all">All</option>
              {focuses.map((f) => <option key={f} value={f}>{f}</option>)}
            </select>
          </div>
          <div>
            <div className="text-xs text-white/50 mb-2">Search</div>
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Silence, yoga, astrology..." className="w-full rounded-2xl bg-black/40 border border-white/10 px-4 py-3" />
          </div>
        </section>

        <section className="grid md:grid-cols-3 gap-6">
          {filtered.map((r: any) => (
            <Link key={r.slug} href={`/retreats/${r.slug}`} className="rounded-3xl border border-white/10 bg-white/5 hover:bg-white/10 transition overflow-hidden">
              {r.image && (
                <div className="relative h-44">
                  <Image src={r.image} alt={r.title} fill className="object-cover" />
                </div>
              )}
              <div className="p-7 space-y-2">
                <div className="text-sm text-white/50">{r.location} • {r.durationDays} days</div>
                <div className="text-xl font-semibold">{r.title}</div>
                <div className="text-sm text-white/70 line-clamp-2">{r.description}</div>
                <div className="flex flex-wrap gap-2 pt-2">
                  {(r.focus || []).slice(0, 3).map((f: string) => (
                    <span key={f} className="text-xs border border-white/15 rounded-full px-3 py-2 text-white/60">{f}</span>
                  ))}
                </div>
                <div className="pt-2 text-sm text-white/50">Starting from <span className="text-white/80 font-medium">{r.priceFrom}</span></div>
                <div className="text-sm underline text-white/70">View details</div>
              </div>
            </Link>
          ))}
        </section>
      </main>
    </SiteShell>
  )
}
