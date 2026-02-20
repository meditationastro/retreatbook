import fs from "fs"
import path from "path"
import matter from "gray-matter"

export type BlogFrontmatter = {
  title: string
  description: string
  date: string
  category: string
  tags: string[]
  canonical?: string
  featured?: boolean
  image?: string
  collection?: string
  author?: string
}

export type BlogPost = {
  slug: string
  ext: "mdx" | "md"
  frontmatter: BlogFrontmatter
  content: string // raw MDX/MD
  readingMinutes: number
}

const BLOG_DIR = path.join(process.cwd(), "content", "blog")

function wordsCount(text: string) {
  return (text.trim().match(/\S+/g) || []).length
}
function readingTimeMinutes(text: string) {
  const words = wordsCount(text)
  return Math.max(1, Math.round(words / 220))
}

export function getAllPostSlugs(): { slug: string; ext: "mdx" | "md" }[] {
  if (!fs.existsSync(BLOG_DIR)) return []
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"))
    .map((f) => ({
      slug: f.replace(/\.(md|mdx)$/, ""),
      ext: f.endsWith(".mdx") ? "mdx" : "md",
    }))
}

export function getPostBySlug(slug: string): BlogPost | null {
  const mdx = path.join(BLOG_DIR, `${slug}.mdx`)
  const md = path.join(BLOG_DIR, `${slug}.md`)
  const file = fs.existsSync(mdx) ? mdx : fs.existsSync(md) ? md : null
  if (!file) return null
  const ext = file.endsWith(".mdx") ? "mdx" : "md"
  const raw = fs.readFileSync(file, "utf8")
  const { data, content } = matter(raw)
  const fm = data as BlogFrontmatter
  return {
    slug,
    ext,
    frontmatter: fm,
    content,
    readingMinutes: readingTimeMinutes(content),
  }
}

export function getAllPosts(): BlogPost[] {
  const slugs = getAllPostSlugs()
  const posts = slugs
    .map(({ slug }) => getPostBySlug(slug))
    .filter(Boolean) as BlogPost[]
  return posts.sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime())
}

export function getCategories(posts: BlogPost[]) {
  const map = new Map<string, number>()
  for (const p of posts) map.set(p.frontmatter.category, (map.get(p.frontmatter.category) || 0) + 1)
  return Array.from(map.entries()).map(([name, count]) => ({ name, count }))
}

export function getTags(posts: BlogPost[]) {
  const map = new Map<string, number>()
  for (const p of posts) for (const t of p.frontmatter.tags || []) map.set(t, (map.get(t) || 0) + 1)
  return Array.from(map.entries()).map(([name, count]) => ({ name, count }))
}

export function getCollections(posts: BlogPost[]) {
  const map = new Map<string, number>()
  for (const p of posts) {
    const c = p.frontmatter.collection || p.frontmatter.category || "General"
    map.set(c, (map.get(c) || 0) + 1)
  }
  return Array.from(map.entries()).map(([name, count]) => ({ name, count }))
}
