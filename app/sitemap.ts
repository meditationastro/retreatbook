import { MetadataRoute } from "next"
import { getAllPostSlugs } from "@/lib/blog"
import { getLandingSlugs } from "@/lib/landings"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_URL || "https://clueux.com"

  const staticRoutes = [
    "/",
    "/h",
    "/h/retreats",
    "/h/retreats/pillar",
    "/h/workshops",
    "/h/answers",
    "/h/guides-tools",
    "/h/blog",
    "/h/landings",
    "/h/resources",
    "/h/community",
    "/h/contact",
    "/search",
    "/member/dashboard",
    "/tools/inner-journey",
    "/tools/life-matrix",
    "/tools/birth-chart",
    "/tools",
    "/gallery",
    "/book",
    "/contact",
    "/testimonials",
    "/about",
    "/programs",
    "/vedic-astrology",
    "/meditation",
    "/retreats",
    "/admin/login",
    "/admin/uploads",
    "/admin",
    "/h/tools/habit-change",
    "/h/tools/inner-journey",
    "/h/tools/life-matrix",
    "/h/tools/vedic-birth-chart",
    "/h/portfolio",
    "/h/downloads",
    "/h/music",
    "/h/gallery",
    "/h/legal/privacy-policy",
    "/h/legal/terms-of-use",
  ]

  const blogUrls = getAllPostSlugs().map((slug) => `/h/blog/${slug}`)
  const landingUrls = getLandingSlugs().map((slug) => `/h/landings/${slug}`)

  let retreatUrls: string[] = []
  try {
    const prisma = (await import("@/lib/prisma")).default
    const retreats = await prisma.retreat.findMany({ where: { isActive: true }, select: { slug: true } })
    retreatUrls = retreats.map((r) => `/h/retreats/${r.slug}`)
  } catch {
    retreatUrls = []
  }

  const all = [...new Set([...staticRoutes, ...blogUrls, ...landingUrls, ...retreatUrls])]

  return all.map((route) => ({
    url: base + route,
    lastModified: new Date(),
  }))
}
