"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"

type Retreat = any

export default function AdminRetreats() {
  const [items, setItems] = useState<Retreat[]>([])
  const [active, setActive] = useState<Retreat | null>(null)
  const [msg, setMsg] = useState("")

  async function load() {
    const res = await fetch("/api/admin/retreats")
    const json = await res.json()
    setItems(json.items || [])
    setActive((json.items || [])[0] || null)
  }

  useEffect(() => { load() }, [])

  const isNew = useMemo(() => active?.__new === true, [active])

  async function save() {
    setMsg("")
    if (!active) return
    const res = await fetch("/api/admin/retreats", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ retreat: active }) })
    const json = await res.json()
    if (!res.ok) { setMsg(json.error || "Failed"); return }
    setMsg("Saved ✅")
    await load()
  }

  async function del() {
    if (!active) return
    if (!confirm("Delete this retreat?")) return
    const res = await fetch("/api/admin/retreats", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ slug: active.slug }) })
    const json = await res.json()
    if (!res.ok) { setMsg(json.error || "Failed"); return }
    setMsg("Deleted ✅")
    await load()
  }

  function newRetreat() {
    setActive({
      __new: true,
      slug: "new-retreat",
      title: "New Retreat",
      location: "Nepal",
      durationDays: 7,
      focus: ["Meditation"],
      description: "Describe the retreat experience...",
      highlights: ["Daily meditation", "Workshops", "Silence"],
      image: "/img/retreats/gallery1.jpg",
      priceFrom: "USD 599",
      dates: [{ start: "2026-02-15", end: "2026-02-21", deposit: "USD 150", seats: 18 }],
      schedule: [{ time: "05:30", label: "Morning meditation" }],
      accommodation: [{ title: "Deluxe Room", desc: "Mountain view comfort.", amenities: ["Hot shower"], images: ["/img/retreats/gallery2.jpg"] }],
      pricingTiers: [
        { name: "Standard", price: "USD 599", includes: ["Accommodation", "Meals", "Program"], recommended: true },
        { name: "Deluxe", price: "USD 799", includes: ["Deluxe room", "Meals", "Program"], recommended: false },
      ],
      gallery: ["/img/retreats/gallery1.jpg", "/img/retreats/gallery2.jpg", "/img/retreats/gallery3.jpg"],
      faq: [{ q: "Is this suitable for beginners?", a: "Yes." }],
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Retreat CMS</h1>
          <p className="text-sm text-white/60">Create/edit retreats, dates, deposits, pricing tiers, schedule, accommodation, gallery, FAQ.</p>
        </div>
        <div className="flex gap-2">
          <Link href="/admin/uploads" className="border border-white/20 px-4 py-2 rounded-full hover:bg-white/10 text-sm">Uploads</Link>
          <button className="border border-white/20 px-4 py-2 rounded-full hover:bg-white/10 text-sm" onClick={newRetreat}>New</button>
          <button className="bg-white text-black px-4 py-2 rounded-full hover:opacity-90 text-sm" onClick={save}>Save</button>
        </div>
      </div>

      <div className="grid lg:grid-cols-[260px_1fr] gap-6">
        <aside className="rounded-2xl border border-white/10 bg-black/30 p-4 space-y-2">
          {(items || []).map((r) => (
            <button key={r.slug} className={"w-full text-left px-4 py-3 rounded-xl border " + (active?.slug === r.slug ? "border-white/20 bg-white/5" : "border-white/10 hover:bg-white/5")}
              onClick={() => setActive(r)}>
              <div className="text-sm font-semibold">{r.title}</div>
              <div className="text-xs text-white/50">{r.location} • {r.durationDays} days</div>
            </button>
          ))}
          {!items.length && <div className="text-sm text-white/50">No retreats yet.</div>}
        </aside>

        <section className="rounded-2xl border border-white/10 bg-black/30 p-6 space-y-6">
          {!active ? <div className="text-white/60">Select a retreat.</div> : (
            <>
              <div className="grid md:grid-cols-2 gap-4">
                <Field label="Slug">
                  <input className="w-full rounded-xl bg-black/40 border border-white/10 px-3 py-2" value={active.slug || ""} onChange={(e) => setActive({ ...active, slug: e.target.value })} />
                </Field>
                <Field label="Title">
                  <input className="w-full rounded-xl bg-black/40 border border-white/10 px-3 py-2" value={active.title || ""} onChange={(e) => setActive({ ...active, title: e.target.value })} />
                </Field>
                <Field label="Location">
                  <input className="w-full rounded-xl bg-black/40 border border-white/10 px-3 py-2" value={active.location || ""} onChange={(e) => setActive({ ...active, location: e.target.value })} />
                </Field>
                <Field label="Duration days">
                  <input type="number" className="w-full rounded-xl bg-black/40 border border-white/10 px-3 py-2" value={active.durationDays || 0} onChange={(e) => setActive({ ...active, durationDays: Number(e.target.value) })} />
                </Field>
                <Field label="Featured image URL">
                  <input className="w-full rounded-xl bg-black/40 border border-white/10 px-3 py-2" value={active.image || ""} onChange={(e) => setActive({ ...active, image: e.target.value })} />
                </Field>
                <Field label="Price from">
                  <input className="w-full rounded-xl bg-black/40 border border-white/10 px-3 py-2" value={active.priceFrom || ""} onChange={(e) => setActive({ ...active, priceFrom: e.target.value })} />
                </Field>
              </div>

              <div>
                <div className="text-sm font-semibold">Description</div>
                <textarea className="mt-2 w-full min-h-[90px] rounded-xl bg-black/40 border border-white/10 px-3 py-2" value={active.description || ""} onChange={(e) => setActive({ ...active, description: e.target.value })} />
              </div>

              <JsonField label="Focus tags (array)" value={active.focus || []} onChange={(v) => setActive({ ...active, focus: v })} />
              <JsonField label="Highlights (array)" value={active.highlights || []} onChange={(v) => setActive({ ...active, highlights: v })} />

              <JsonField label="Dates (array of {start,end,deposit,seats})" value={active.dates || []} onChange={(v) => setActive({ ...active, dates: v })} />
              <JsonField label="Pricing tiers (array of {name,price,includes[],recommended})" value={active.pricingTiers || []} onChange={(v) => setActive({ ...active, pricingTiers: v })} />
              <JsonField label="Daily schedule (array of {time,label})" value={active.schedule || []} onChange={(v) => setActive({ ...active, schedule: v })} />
              <JsonField label="Accommodation (array)" value={active.accommodation || []} onChange={(v) => setActive({ ...active, accommodation: v })} />
              <JsonField label="Gallery image URLs (array)" value={active.gallery || []} onChange={(v) => setActive({ ...active, gallery: v })} />
              <JsonField label="FAQ (array of {q,a})" value={active.faq || []} onChange={(v) => setActive({ ...active, faq: v })} />

              <div className="flex gap-3 flex-wrap">
                <button className="bg-white text-black px-6 py-3 rounded-full hover:opacity-90" onClick={save}>Save</button>
                <Link className="border border-white/20 px-6 py-3 rounded-full hover:bg-white/10" href={`/retreats/${active.slug}`} target="_blank">Preview</Link>
                <button className="border border-red-500/40 text-red-200 px-6 py-3 rounded-full hover:bg-red-500/10" onClick={del}>Delete</button>
              </div>

              {msg && <div className="text-sm text-white/70">{msg}</div>}
              {isNew && <div className="text-xs text-white/50">Tip: change the slug before saving.</div>}
            </>
          )}
        </section>
      </div>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-xs text-white/50 mb-2">{label}</div>
      {children}
    </div>
  )
}

function JsonField({ label, value, onChange }: { label: string; value: any; onChange: (v: any) => void }) {
  const [txt, setTxt] = useState(JSON.stringify(value, null, 2))
  useEffect(() => setTxt(JSON.stringify(value, null, 2)), [value])

  return (
    <div className="space-y-2">
      <div className="text-sm font-semibold">{label}</div>
      <textarea className="w-full min-h-[160px] rounded-xl bg-black/40 border border-white/10 px-3 py-2 font-mono text-sm"
        value={txt}
        onChange={(e) => {
          const t = e.target.value
          setTxt(t)
          try { onChange(JSON.parse(t)) } catch {}
        }}
      />
      <div className="text-xs text-white/45">Valid JSON required.</div>
    </div>
  )
}
