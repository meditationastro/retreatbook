"use client"

import { useEffect, useState } from "react"

export default function EditPost({ params }: { params: { slug: string } }) {
  const slug = decodeURIComponent(params.slug)
  const [front, setFront] = useState<any>(null)
  const [content, setContent] = useState("")
  const [msg, setMsg] = useState("")

  async function load() {
    const res = await fetch(`/api/admin/blog/${encodeURIComponent(slug)}`)
    const json = await res.json()
    setFront(json.frontmatter || {})
    setContent(json.content || "")
  }

  useEffect(() => { load() }, [])

  if (!front) return <div className="text-white/70">Loading...</div>

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Edit: {front.title || slug}</h1>
        <p className="text-white/60 text-sm">Updates <code className="text-white/80">content/blog/{slug}.mdx</code></p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <input className="rounded-xl bg-black/40 border border-white/10 px-3 py-2" value={front.title || ""} onChange={(e) => setFront({ ...front, title: e.target.value })} placeholder="Title" />
        <input className="rounded-xl bg-black/40 border border-white/10 px-3 py-2" value={front.date || ""} onChange={(e) => setFront({ ...front, date: e.target.value })} placeholder="Date YYYY-MM-DD" />
        <input className="rounded-xl bg-black/40 border border-white/10 px-3 py-2" value={front.collection || ""} onChange={(e) => setFront({ ...front, collection: e.target.value })} placeholder="Collection" />
        <input className="rounded-xl bg-black/40 border border-white/10 px-3 py-2" value={front.category || ""} onChange={(e) => setFront({ ...front, category: e.target.value })} placeholder="Category" />
        <input className="rounded-xl bg-black/40 border border-white/10 px-3 py-2" value={(front.tags || []).join(", ")} onChange={(e) => setFront({ ...front, tags: e.target.value.split(",").map((t) => t.trim()).filter(Boolean) })} placeholder="Tags (comma separated)" />
        <input className="rounded-xl bg-black/40 border border-white/10 px-3 py-2" value={front.image || ""} onChange={(e) => setFront({ ...front, image: e.target.value })} placeholder="Featured image (/uploads/...)" />
      </div>
      <textarea className="w-full min-h-[90px] rounded-xl bg-black/40 border border-white/10 px-3 py-2" value={front.description || ""} onChange={(e) => setFront({ ...front, description: e.target.value })} placeholder="Description" />

      <div className="rounded-2xl border border-white/10 bg-black/30 p-4 text-xs text-white/60">
        Tip: Featured images should live in <code className="text-white/80">public/uploads</code> and referenced as <code className="text-white/80">/uploads/file.jpg</code>.
      </div>

      <textarea className="w-full min-h-[420px] rounded-2xl bg-black/40 border border-white/10 px-4 py-3 font-mono text-sm" value={content} onChange={(e) => setContent(e.target.value)} />

      <div className="flex flex-wrap gap-3">
        <button
          className="bg-white text-black px-6 py-3 rounded-full hover:opacity-90"
          onClick={async () => {
            setMsg("")
            const res = await fetch(`/api/admin/blog/${encodeURIComponent(slug)}`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ frontmatter: front, content }),
            })
            const json = await res.json()
            if (!res.ok) { setMsg(json.error || "Failed"); return }
            setMsg("Saved ✅")
          }}
        >
          Save
        </button>
        <a className="border border-white/20 px-6 py-3 rounded-full hover:bg-white/10" href={`/admin/blog/${encodeURIComponent(slug)}/rich`}>
          Rich editor
        </a>
        <a className="border border-white/20 px-6 py-3 rounded-full hover:bg-white/10" href={`/h/blog/${encodeURIComponent(slug)}`}>
          Preview
        </a>
        <button
          className="border border-red-400/40 text-red-200 px-6 py-3 rounded-full hover:bg-red-500/10"
          onClick={async () => {
            if (!confirm("Delete this post?")) return
            const res = await fetch(`/api/admin/blog/${encodeURIComponent(slug)}`, { method: "DELETE" })
            if (res.ok) window.location.href = "/admin/blog"
          }}
        >
          Delete
        </button>
      </div>

      {msg && <div className="text-sm text-white/70">{msg}</div>}
    </div>
  )
}
