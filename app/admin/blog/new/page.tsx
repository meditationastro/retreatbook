"use client"

import { useState } from "react"

export default function NewPost() {
  const [slug, setSlug] = useState("")
  const [title, setTitle] = useState("")
  const [collection, setCollection] = useState("")
  const [category, setCategory] = useState("")
  const [tags, setTags] = useState("")
  const [description, setDescription] = useState("")
  const [image, setImage] = useState("")
  const [content, setContent] = useState("# New Post\n\nWrite in **MDX** here.")
  const [msg, setMsg] = useState("")

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">New Blog Post</h1>
        <p className="text-white/60 text-sm">Creates <code className="text-white/80">content/blog/&lt;slug&gt;.mdx</code></p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <input className="rounded-xl bg-black/40 border border-white/10 px-3 py-2" placeholder="Slug (no spaces)" value={slug} onChange={(e) => setSlug(e.target.value)} />
        <input className="rounded-xl bg-black/40 border border-white/10 px-3 py-2" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input className="rounded-xl bg-black/40 border border-white/10 px-3 py-2" placeholder="Collection (optional)" value={collection} onChange={(e) => setCollection(e.target.value)} />
        <input className="rounded-xl bg-black/40 border border-white/10 px-3 py-2" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
        <input className="rounded-xl bg-black/40 border border-white/10 px-3 py-2" placeholder="Tags (comma separated)" value={tags} onChange={(e) => setTags(e.target.value)} />
        <input className="rounded-xl bg-black/40 border border-white/10 px-3 py-2" placeholder="Featured image path (e.g. /uploads/x.jpg)" value={image} onChange={(e) => setImage(e.target.value)} />
      </div>
      <textarea className="w-full min-h-[90px] rounded-xl bg-black/40 border border-white/10 px-3 py-2" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />

      <textarea className="w-full min-h-[380px] rounded-2xl bg-black/40 border border-white/10 px-4 py-3 font-mono text-sm" value={content} onChange={(e) => setContent(e.target.value)} />

      <button
        className="bg-white text-black px-6 py-3 rounded-full hover:opacity-90"
        onClick={async () => {
          setMsg("")
          const res = await fetch("/api/admin/blog", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              slug,
              frontmatter: { title, description, category, collection, tags: tags.split(",").map((t) => t.trim()).filter(Boolean), image, date: new Date().toISOString().slice(0,10), featured: false },
              content,
            }),
          })
          const json = await res.json()
          if (!res.ok) { setMsg(json.error || "Failed"); return }
          window.location.href = `/admin/blog/${encodeURIComponent(slug)}`
        }}
      >
        Create post
      </button>
      {msg && <div className="text-sm text-white/70">{msg}</div>}
    </div>
  )
}
