"use client"

import { useState } from "react"
import Link from "next/link"
import SiteShell from "@/components/SiteShell"

export default function SearchPage() {
  const [q, setQ] = useState("")
  const [items, setItems] = useState<any[]>([])

  async function run() {
    const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`)
    const json = await res.json()
    setItems(json.items || [])
  }

  return (
    <SiteShell>
      <main className="max-w-6xl mx-auto px-6 py-16 space-y-8">
        <h1 className="text-4xl font-bold">Search</h1>
        <p className="text-white/60">Search blog, retreats, astrology services, and programs.</p>

        <div className="space-y-5">
          <div className="flex gap-2">
            <input value={q} onChange={(e) => setQ(e.target.value)} className="flex-1 rounded-2xl bg-black/40 border border-white/10 px-4 py-3" placeholder="Search..." />
            <button className="bg-white text-black px-5 py-3 rounded-2xl" onClick={run}>Search</button>
          </div>

          <div className="grid gap-3">
            {items.map((it, idx) => (
              <Link key={idx} href={it.href} className="rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition p-5">
                <div className="text-xs text-white/50">{it.type}</div>
                <div className="mt-1 font-semibold">{it.title}</div>
                {it.desc && <div className="mt-1 text-sm text-white/70">{it.desc}</div>}
              </Link>
            ))}
            {!items.length && <div className="text-sm text-white/50">Try “retreat”, “birth chart”, “meditation”, “program”.</div>}
          </div>
        </div>
      </main>
    </SiteShell>
  )
}
