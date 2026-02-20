import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { marked } from "marked"

export type LandingFrontmatter = {
  title: string
  description: string
  slug: string
  intent: "commercial" | "informational"
  primaryKeyword: string
  related: string[]
  faq?: { q: string; a: string }[]
  canonical?: string
}

export type LandingPage = {
  slug: string
  frontmatter: LandingFrontmatter
  contentHtml: string
}

const LANDING_DIR = path.join(process.cwd(), "content", "landings")

export function getLandingSlugs(): string[] {
  if (!fs.existsSync(LANDING_DIR)) return []
  return fs.readdirSync(LANDING_DIR).filter((f) => f.endsWith(".md")).map((f) => f.replace(/\.md$/, ""))
}

export function getLandingBySlug(slug: string): LandingPage | null {
  const file = path.join(LANDING_DIR, `${slug}.md`)
  if (!fs.existsSync(file)) return null
  const raw = fs.readFileSync(file, "utf8")
  const { data, content } = matter(raw)
  const html = marked.parse(content) as string
  return {
    slug,
    frontmatter: data as LandingFrontmatter,
    contentHtml: html,
  }
}

export function getAllLandings(): LandingPage[] {
  const slugs = getLandingSlugs()
  return slugs.map((s) => getLandingBySlug(s)).filter(Boolean) as LandingPage[]
}
