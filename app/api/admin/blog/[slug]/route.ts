import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { putFile, deleteFile } from "@/lib/cmsStore"

const BLOG_DIR = path.join(process.cwd(), "content", "blog")

function findFile(slug: string) {
  const mdx = path.join(BLOG_DIR, `${slug}.mdx`)
  const md = path.join(BLOG_DIR, `${slug}.md`)
  if (fs.existsSync(mdx)) return mdx
  if (fs.existsSync(md)) return md
  return mdx // default path for creation
}

function toFrontmatterYaml(fm: any) {
  return Object.entries(fm || {}).map(([k,v]) => {
    if (Array.isArray(v)) return `${k}: [${v.map((x) => JSON.stringify(x)).join(", ")}]`
    if (typeof v === "boolean") return `${k}: ${v}`
    return `${k}: ${JSON.stringify(v)}`
  }).join("\n")
}

export async function GET(_: Request, { params }: { params: { slug: string } }) {
  const slug = decodeURIComponent(params.slug)
  try {
    const file = findFile(slug)
    if (!fs.existsSync(file)) return NextResponse.json({ error: "Not found" }, { status: 404 })
    const raw = fs.readFileSync(file, "utf8")
    const { data, content } = matter(raw)
    return NextResponse.json({ frontmatter: data, content })
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Failed" }, { status: 500 })
  }
}

export async function PUT(req: Request, { params }: { params: { slug: string } }) {
  const slug = decodeURIComponent(params.slug)
  const body = await req.json()
  const fm = body.frontmatter || {}
  const content = body.content || ""
  const fileRel = `content/blog/${slug}.mdx`
  const mdx = `---\n${toFrontmatterYaml(fm)}\n---\n\n${content}\n`
  try {
    await putFile({ filepath: fileRel, content: mdx, message: `cms: update ${slug}` })
    return NextResponse.json({ ok: true })
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Failed" }, { status: 500 })
  }
}

export async function DELETE(_: Request, { params }: { params: { slug: string } }) {
  const slug = decodeURIComponent(params.slug)
  try {
    await deleteFile(`content/blog/${slug}.mdx`, `cms: delete ${slug}`)
    return NextResponse.json({ ok: true })
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Failed" }, { status: 500 })
  }
}
