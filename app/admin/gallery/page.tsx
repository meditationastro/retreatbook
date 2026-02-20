"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

export default function AdminGallery() {
  const [data, setData] = useState<any>({ albums: [] })
  const [msg, setMsg] = useState("")

  async function load() {
    const res = await fetch("/api/admin/gallery")
    const json = await res.json()
    setData(json.data || { albums: [] })
  }

  useEffect(() => { load() }, [])

  async function save() {
    setMsg("")
    const res = await fetch("/api/admin/gallery", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ data }) })
    const json = await res.json()
    if (!res.ok) { setMsg(json.error || "Failed"); return }
    setMsg("Saved ✅")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Gallery CMS</h1>
          <p className="text-sm text-white/60">Manage albums + images. Upload in Admin → Uploads, then paste URLs here.</p>
        </div>
        <div className="flex gap-2">
          <Link href="/admin/uploads" className="border border-white/20 px-4 py-2 rounded-full hover:bg-white/10 text-sm">Uploads</Link>
          <button className="bg-white text-black px-4 py-2 rounded-full hover:opacity-90 text-sm" onClick={save}>Save</button>
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-black/30 p-5 space-y-3">
        <div className="text-sm font-semibold">Albums JSON</div>
        <textarea className="w-full min-h-[420px] rounded-xl bg-black/40 border border-white/10 px-3 py-2 font-mono text-sm"
          value={JSON.stringify(data, null, 2)}
          onChange={(e) => { try { setData(JSON.parse(e.target.value)) } catch {} }}
        />
        <div className="text-xs text-white/50">Format: {{ "albums": [{{ "slug": "...", "title": "...", "desc": "...", "images": ["url1","url2"] }}] }}</div>
        {msg && <div className="text-sm text-white/70">{msg}</div>}
      </div>
    </div>
  )
}
