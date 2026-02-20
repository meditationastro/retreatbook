"use client"

import { useState } from "react"
import SiteShell from "@/components/SiteShell"

export default function BirthChartTool() {
  const [out, setOut] = useState<any>(null)
  const [status, setStatus] = useState("")

  async function run(e: any) {
    e.preventDefault()
    setStatus("")
    const fd = new FormData(e.currentTarget)
    const payload = Object.fromEntries(fd.entries())
    const res = await fetch("/api/tools/birth-chart", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) })
    const json = await res.json()
    if (!res.ok) { setStatus(json.error || "Failed"); return }
    setOut(json)
  }

  return (
    <SiteShell>
      <main className="max-w-5xl mx-auto px-6 py-16 space-y-10">
        <h1 className="text-4xl font-bold">Vedic Birth Chart Generator</h1>
        <p className="text-white/70">
          This is a lightweight summary generator + report builder. For precise Lagna, dashas, nakshatra, and timing, book a consultation.
        </p>

        <form onSubmit={run} className="rounded-3xl border border-white/10 bg-white/5 p-8 grid md:grid-cols-2 gap-4">
          <input name="name" className="rounded-2xl bg-black/40 border border-white/10 px-4 py-3" placeholder="Full Name" required />
          <input name="email" type="email" className="rounded-2xl bg-black/40 border border-white/10 px-4 py-3" placeholder="Email (optional)" />
          <input name="dob" type="date" className="rounded-2xl bg-black/40 border border-white/10 px-4 py-3" required />
          <input name="tob" type="time" className="rounded-2xl bg-black/40 border border-white/10 px-4 py-3" required />
          <input name="pob" className="md:col-span-2 rounded-2xl bg-black/40 border border-white/10 px-4 py-3" placeholder="Place of Birth (city, country)" required />
          <textarea name="focus" className="md:col-span-2 min-h-[100px] rounded-2xl bg-black/40 border border-white/10 px-4 py-3" placeholder="Questions / focus areas (optional)" />
          <button className="md:col-span-2 bg-white text-black px-6 py-3 rounded-full hover:opacity-90">Generate</button>
        </form>

        {status && <div className="text-sm text-white/70">{status}</div>}

        {out && (
          <section className="rounded-3xl border border-white/10 bg-white/5 p-8 space-y-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-sm text-white/50">Summary</div>
                <div className="text-2xl font-semibold">{out.title}</div>
              </div>
              <a className="border border-white/20 px-4 py-2 rounded-full hover:bg-white/10 text-sm" href={out.reportUrl} target="_blank">
                Download Report
              </a>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {out.cards.map((c: any, i: number) => (
                <div key={i} className="rounded-2xl border border-white/10 bg-black/30 p-5">
                  <div className="text-sm text-white/50">{c.k}</div>
                  <div className="text-xl font-semibold mt-1">{c.v}</div>
                  {c.note && <div className="text-sm text-white/70 mt-2">{c.note}</div>}
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/30 p-5 space-y-2">
              <div className="text-sm font-semibold">Remedies & Practices (general)</div>
              <ul className="list-disc pl-5 text-white/70 space-y-1">
                {out.remedies.map((r: string) => <li key={r}>{r}</li>)}
              </ul>
              <div className="text-xs text-white/50">General suggestions (demo). For personalized remedies, book a Jyotish session.</div>
            </div>
          </section>
        )}
      </main>
    </SiteShell>
  )
}
