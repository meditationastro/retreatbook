import Image from "next/image"
import CTASection from "@/components/CTASection"
import { readGallery } from "@/lib/gallery"

export const metadata = {
  title: "Gallery",
  description: "Photos from retreats, workshops, nature, and inner journeys.",
}

export default function GalleryPage() {
  const { items } = readGallery()
  return (
    <main className="bg-[#070707] text-white min-h-screen">
      <section className="max-w-6xl mx-auto px-6 py-16 space-y-8">
        <h1 className="text-4xl font-bold">Gallery</h1>
        <p className="text-white/70">A visual journey — retreats, mountains, practice, and moments of calm.</p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((it) => (
            <div key={it.id} className="rounded-3xl overflow-hidden border border-white/10 bg-white/5">
              <div className="relative h-56">
                <Image src={it.src} alt={it.title} fill className="object-cover" />
              </div>
              <div className="p-5">
                <div className="text-sm text-white/50">{it.category || "Gallery"}</div>
                <div className="mt-1 font-semibold">{it.title}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <CTASection />
    </main>
  )
}
