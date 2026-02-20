"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"

type PostMeta = {
  slug: string
  title: string
  date: string
  collection?: string
  category?: string
  featured?: boolean
}

export default function AdminBlog() {
  const [posts, setPosts] = useState<PostMeta[]>([])
  const [q, setQ] = useState("")
  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase()
    if (!s) return posts
    return posts.filter((p) => (p.title || "").toLowerCase().includes(s) || (p.slug || "").toLowerCase().includes(s))
  }, [posts, q])

  async function load() {
    const res = await fetch("/api/admin/blog")
    const json = await res.json()
    setPosts(json.posts || [])
  }

  useEffect(() => { load() }, [])

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Blog CMS</h1>
          <p className="text-white/60 text-sm">MDX editor + featured images + collections. Writes via GitHub API if configured.</p>
        </div>
        <Link href="/admin/blog/new" className="bg-white text-black px-4 py-2 rounded-full hover:opacity-90">New post</Link>
      </div>

      <div className="rounded-2xl border border-white/10 bg-black/30 p-4 flex items-center gap-3">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search posts..." className="w-full rounded-xl bg-black/40 border border-white/10 px-3 py-2" />
        <button onClick={load} className="text-sm underline text-white/70 hover:text-white">Refresh</button>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-white/10 bg-black/30">
        <table className="min-w-full text-sm">
          <thead className="text-white/60">
            <tr>
              <th className="text-left px-4 py-3 border-b border-white/10">Title</th>
              <th className="text-left px-4 py-3 border-b border-white/10">Slug</th>
              <th className="text-left px-4 py-3 border-b border-white/10">Collection</th>
              <th className="text-left px-4 py-3 border-b border-white/10">Date</th>
              <th className="text-left px-4 py-3 border-b border-white/10">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.slug} className="border-b border-white/5">
                <td className="px-4 py-3 text-white/80 font-medium">{p.title}</td>
                <td className="px-4 py-3 text-white/60">{p.slug}</td>
                <td className="px-4 py-3 text-white/60">{p.collection || p.category || "-"}</td>
                <td className="px-4 py-3 text-white/60">{p.date}</td>
                <td className="px-4 py-3">
                  <Link href={`/admin/blog/${encodeURIComponent(p.slug)}`} className="underline text-white/70 hover:text-white">Edit</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="rounded-2xl border border-white/10 bg-black/30 p-5 text-white/70 text-sm">
        <div className="font-semibold text-white mb-2">Setup for Vercel</div>
        <ul className="space-y-1">
          <li>• Set <code className="text-white/80">GITHUB_TOKEN</code>, <code className="text-white/80">GITHUB_OWNER</code>, <code className="text-white/80">GITHUB_REPO</code>, <code className="text-white/80">GITHUB_BRANCH</code></li>
          <li>• If not set, editor works only in local/dev environments (filesystem write).</li>
          <li>• Featured images: upload to <code className="text-white/80">public/uploads</code> and use path like <code className="text-white/80">/uploads/my.jpg</code>.</li>
        </ul>
      </div>
    </div>
  )
}
