import { NextResponse } from "next/server"
import { getAllPosts } from "@/lib/blog"
import { readRetreats } from "@/lib/retreats"
import { readSiteContent } from "@/lib/siteContent"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const q = (searchParams.get("q") || "").trim().toLowerCase()
  if (!q) return NextResponse.json({ items: [] })

  const items: any[] = []

  for (const p of getAllPosts()) {
    const hay = `${p.frontmatter.title} ${p.frontmatter.description} ${(p.frontmatter.tags || []).join(" ")} ${(p.frontmatter.category || "")} ${(p.frontmatter.collection || "")}`.toLowerCase()
    if (hay.includes(q)) items.push({ type: "Blog", title: p.frontmatter.title, desc: p.frontmatter.description, href: `/h/blog/${p.slug}` })
  }

  for (const r of readRetreats().items || []) {
    const hay = JSON.stringify(r).toLowerCase()
    if (hay.includes(q)) items.push({ type: "Retreat", title: r.title, desc: r.description, href: `/retreats/${r.slug}` })
  }

  const sc = readSiteContent()
  for (const s of sc.astrology?.services || []) {
    const hay = JSON.stringify(s).toLowerCase()
    if (hay.includes(q)) items.push({ type: "Astrology", title: s.title, desc: s.desc, href: `/vedic-astrology/${s.slug}` })
  }
  for (const c of sc.programs?.categories || []) {
    const hay = JSON.stringify(c).toLowerCase()
    if (hay.includes(q)) items.push({ type: "Program", title: c.title, desc: c.mode, href: `/programs` })
  }

  return NextResponse.json({ items: items.slice(0, 50) })
}
