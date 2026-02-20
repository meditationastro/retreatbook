import SiteShell from "@/components/SiteShell"
import Image from "next/image"
import Link from "next/link"
import { readGallery } from "@/lib/gallery"
import { notFound } from "next/navigation"

export default function Album({ params }: { params: { slug: string } }) {
  const g = readGallery()
  const a = (g.albums || []).find((x: any) => x.slug === params.slug)
  if (!a) return notFound()

  return (
    <SiteShell>
      <main className="max-w-6xl mx-auto px-6 py-16 space-y-10">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold">{a.title}</h1>
            <p className="text-white/70 mt-2">{a.desc}</p>
          </div>
          <Link href="/gallery" className="underline text-white/70 hover:text-white">Back</Link>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {(a.images || []).map((src: string, i: number) => (
            <div key={i} className="relative h-44 rounded-2xl overflow-hidden border border-white/10 bg-black/30">
              <Image src={src} alt={`Photo ${i + 1}`} fill className="object-cover" />
            </div>
          ))}
        </div>
      </main>
    </SiteShell>
  )
}
