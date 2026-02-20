"use client"

import { useMemo, useState } from "react"
import SiteShell from "@/components/SiteShell"

const areas = [
  { key: "purpose", label: "Purpose & Meaning" },
  { key: "health", label: "Health & Energy" },
  { key: "relationships", label: "Relationships" },
  { key: "work", label: "Work & Contribution" },
  { key: "spiritual", label: "Spiritual Practice" },
  { key: "habits", label: "Habits & Discipline" },
]

export default function LifeMatrix() {
  const [scores, setScores] = useState<Record<string, number>>(Object.fromEntries(areas.map((a) => [a.key, 5])))
  const total = useMemo(() => Object.values(scores).reduce((a, b) => a + b, 0), [scores])

  return (
    <SiteShell>
      <main className="max-w-4xl mx-auto px-6 py-16 space-y-10">
        <h1 className="text-4xl font-bold">Life Matrix Mapping</h1>
        <p className="text-white/70">Rate each area from 1–10. This gives a clear map for your next 30 days.</p>

        <section className="rounded-3xl border border-white/10 bg-white/5 p-8 space-y-6">
          {areas.map((a) => (
            <div key={a.key} className="grid grid-cols-[1fr_160px] gap-4 items-center">
              <div className="font-semibold">{a.label}</div>
              <div className="flex items-center gap-3">
                <input type="range" min={1} max={10} value={scores[a.key]} onChange={(e) => setScores({ ...scores, [a.key]: Number(e.target.value) })} />
                <div className="text-sm text-white/70 w-6 text-right">{scores[a.key]}</div>
              </div>
            </div>
          ))}

          <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
            <div className="text-sm text-white/50">Total score</div>
            <div className="text-3xl font-bold">{total} / {areas.length * 10}</div>
            <div className="text-sm text-white/70 mt-2">Pick the lowest 2 areas and commit to 1 small daily action each.</div>
          </div>
        </section>
      </main>
    </SiteShell>
  )
}
