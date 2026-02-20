import SiteShell from "@/components/SiteShell"
import Link from "next/link"
import { readGallery } from "@/lib/gallery"

export const metadata = { title: "Gallery" }

export default function Gallery() {
  const g = readGallery()
  const albums = g.albums || []

  return (
    <SiteShell>
      <main className="max-w-6xl mx-auto px-6 py-16 space-y-10">
        <h1 className="text-4xl font-bold">Photo Gallery</h1>
        <p className="text-white/70">Retreat venues, practices, workshops, and sacred journeys.</p>

        <div className="grid md:grid-cols-3 gap-6">
          {albums.map((a: any) => (
            <Link key={a.slug} href={`/gallery/${a.slug}`} className="rounded-3xl border border-white/10 bg-white/5 hover:bg-white/10 transition p-8">
              <div className="text-xl font-semibold">{a.title}</div>
              <div className="mt-2 text-white/70 text-sm">{a.desc}</div>
              <div className="mt-4 text-xs text-white/50">{(a.images || []).length} photos</div>
              <div className="mt-5 underline text-white/70">View album</div>
            </Link>
          ))}
        </div>
      </main>
    </SiteShell>
  )
}
