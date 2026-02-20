import fs from "fs"
import path from "path"

export type RetreatDate = { start: string; end: string; deposit: string; seats?: number }
export type Retreat = {
  slug: string
  title: string
  location: string
  durationDays: number
  focus: string[]
  description: string
  highlights: string[]
  image?: string
  priceFrom: string
  pricingTiers?: { name: string; price: string; includes: string[]; recommended?: boolean }[]
  gallery?: string[]
  dates: RetreatDate[]
  schedule?: { time: string; label: string }[]
  accommodation?: { title: string; desc: string; amenities: string[]; images: string[] }[]
  faq?: { q: string; a: string }[]
}

const FILE = path.join(process.cwd(), "data", "retreats.json")

export function readRetreats(): { items: Retreat[] } {
  try { return JSON.parse(fs.readFileSync(FILE, "utf8")) } catch { return { items: [] } }
}
export function writeRetreats(data: { items: Retreat[] }) {
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2))
}
export function getRetreat(slug: string): Retreat | null {
  return readRetreats().items.find((r) => r.slug === slug) || null
}
