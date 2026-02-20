import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { putFile } from "@/lib/cmsStore"

const BLOG_DIR = path.join(process.cwd(), "content", "blog")

export async function GET() {
  try {
    if (!fs.existsSync(BLOG_DIR)) return NextResponse.json({ posts: [] })
    const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    const posts = files.map((f) => {
      const slug = f.replace(/\.(mdx|md)$/, "")
      const raw = fs.readFileSync(path.join(BLOG_DIR, f), "utf8")
      const { data } = matter(raw)
      return {
        slug,
        title: (data as any).title || slug,
        date: (data as any).date || "",
        collection: (data as any).collection || "",
        category: (data as any).category || "",
        featured: !!(data as any).featured,
      }
    }).sort((a,b) => (b.date || "").localeCompare(a.date || ""))
    return NextResponse.json({ posts })
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Failed" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  const body = await req.json()
  const slug = (body.slug || "").trim()
  if (!slug) return NextResponse.json({ error: "slug required" }, { status: 400 })

  const fm = body.frontmatter || {}
  const content = body.content || ""
  const file = `content/blog/${slug}.mdx`
  const mdx = `---\n${Object.entries(fm).map(([k,v]) => {
    if (Array.isArray(v)) return `${k}: [${v.map((x) => JSON.stringify(x)).join(", ")}]`
    if (typeof v === "boolean") return `${k}: ${v}`
    return `${k}: ${JSON.stringify(v)}`
  }).join("\n")}\n---\n\n${content}\n`

  try {
    await putFile({ filepath: file, content: mdx, message: `cms: create ${slug}` })
    return NextResponse.json({ ok: true })
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Failed" }, { status: 500 })
  }
}
