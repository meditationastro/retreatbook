"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import RichEditor from "@/components/RichEditor"

export default function AdminCMS() {
  const [data, setData] = useState<any>(null)
  const [msg, setMsg] = useState("")

  async function load() {
    const res = await fetch("/api/admin/cms")
    const json = await res.json()
    setData(json.data || {})
  }

  useEffect(() => { load() }, [])

  if (!data) return <div className="text-white/70">Loading...</div>

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Site CMS</h1>
          <p className="text-white/60 text-sm">Edit homepage, about, meditation, astrology services, programs, testimonials, footer.</p>
        </div>
        <div className="flex gap-2">
          <Link href="/admin/uploads" className="border border-white/20 px-4 py-2 rounded-full hover:bg-white/10 text-sm">Uploads</Link>
          <button className="bg-white text-black px-4 py-2 rounded-full hover:opacity-90 text-sm" onClick={load}>Refresh</button>
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-black/30 p-5 space-y-3">
        <div className="text-sm font-semibold">Home hero</div>
        <div className="grid md:grid-cols-2 gap-3">
          <input className="rounded-xl bg-black/40 border border-white/10 px-3 py-2" value={data.home?.heroTitle || ""} onChange={(e) => setData({ ...data, home: { ...data.home, heroTitle: e.target.value } })} placeholder="Hero title" />
          <input className="rounded-xl bg-black/40 border border-white/10 px-3 py-2" value={data.home?.heroVideoUrl || ""} onChange={(e) => setData({ ...data, home: { ...data.home, heroVideoUrl: e.target.value } })} placeholder="Hero video URL (optional)" />
        </div>
        <textarea className="w-full min-h-[90px] rounded-xl bg-black/40 border border-white/10 px-3 py-2" value={data.home?.heroSubtitle || ""} onChange={(e) => setData({ ...data, home: { ...data.home, heroSubtitle: e.target.value } })} placeholder="Hero subtitle" />
      </div>

      <div className="rounded-2xl border border-white/10 bg-black/30 p-5 space-y-3">
        <div className="text-sm font-semibold">About page (Markdown/MDX)</div>
        <RichEditor value={data.about?.rich || ""} onChange={(val) => setData({ ...data, about: { ...data.about, rich: val } })} placeholder="Write your About page..." />
      </div>

      <div className="rounded-2xl border border-white/10 bg-black/30 p-5 space-y-3">
        <div className="text-sm font-semibold">Testimonials (JSON)</div>
        <textarea className="w-full min-h-[180px] rounded-xl bg-black/40 border border-white/10 px-3 py-2 font-mono text-sm"
          value={JSON.stringify(data.testimonials || [], null, 2)}
          onChange={(e) => { try { setData({ ...data, testimonials: JSON.parse(e.target.value) }) } catch {} }}
        />
      </div>

      <div className="rounded-2xl border border-white/10 bg-black/30 p-5 space-y-3">
        <div className="text-sm font-semibold">Astrology services (JSON)</div>
        <textarea className="w-full min-h-[220px] rounded-xl bg-black/40 border border-white/10 px-3 py-2 font-mono text-sm"
          value={JSON.stringify(data.astrology?.services || [], null, 2)}
          onChange={(e) => { try { setData({ ...data, astrology: { ...data.astrology, services: JSON.parse(e.target.value) } }) } catch {} }}
        />
      </div>

      <div className="rounded-2xl border border-white/10 bg-black/30 p-5 space-y-3">
        <div className="text-sm font-semibold">Programs (JSON)</div>
        <textarea className="w-full min-h-[220px] rounded-xl bg-black/40 border border-white/10 px-3 py-2 font-mono text-sm"
          value={JSON.stringify(data.programs?.categories || [], null, 2)}
          onChange={(e) => { try { setData({ ...data, programs: { ...data.programs, categories: JSON.parse(e.target.value) } }) } catch {} }}
        />
      </div>

      <div className="rounded-2xl border border-white/10 bg-black/30 p-5 space-y-3">
        <div className="text-sm font-semibold">Footer contact</div>
        <div className="grid md:grid-cols-3 gap-3">
          <input className="rounded-xl bg-black/40 border border-white/10 px-3 py-2" value={data.footer?.location || ""} onChange={(e) => setData({ ...data, footer: { ...data.footer, location: e.target.value } })} placeholder="Location" />
          <input className="rounded-xl bg-black/40 border border-white/10 px-3 py-2" value={data.footer?.email || ""} onChange={(e) => setData({ ...data, footer: { ...data.footer, email: e.target.value } })} placeholder="Email" />
          <input className="rounded-xl bg-black/40 border border-white/10 px-3 py-2" value={data.footer?.whatsapp || ""} onChange={(e) => setData({ ...data, footer: { ...data.footer, whatsapp: e.target.value } })} placeholder="WhatsApp" />
        </div>
      </div>

      <div className="flex gap-3">
        <button className="bg-white text-black px-6 py-3 rounded-full hover:opacity-90"
          onClick={async () => {
            setMsg("")
            const res = await fetch("/api/admin/cms", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ data }) })
            const json = await res.json()
            if (!res.ok) { setMsg(json.error || "Failed"); return }
            setMsg("Saved ✅")
          }}
        >
          Save
        </button>
        <a className="border border-white/20 px-6 py-3 rounded-full hover:bg-white/10" href="/" target="_blank">Preview</a>
      </div>
      {msg && <div className="text-sm text-white/70">{msg}</div>}
    </div>
  )
}
