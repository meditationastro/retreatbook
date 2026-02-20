import CTASection from "@/components/CTASection"
import { listTracks } from "@/lib/music"

export const metadata = {
  title: "Meditation Music",
  description: "Calm soundscapes and guided audio for meditation and reflection.",
}

export default function MusicPage() {
  const tracks = listTracks()
  return (
    <main className="bg-[#070707] text-white min-h-screen">
      <section className="max-w-5xl mx-auto px-6 py-16 space-y-10">
        <header className="space-y-3">
          <h1 className="text-4xl font-bold">Meditation Music</h1>
          <p className="text-white/70">Add MP3 files to <code className="text-white/70">/public/music</code> to publish tracks.</p>
        </header>

        <div className="grid gap-4">
          {tracks.length ? tracks.map((t) => (
            <div key={t.filename} className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <div className="font-semibold">{t.title}</div>
              <audio className="mt-4 w-full" controls src={`/music/${encodeURIComponent(t.filename)}`} />
            </div>
          )) : (
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-white/70">
              No tracks yet. Upload MP3 files to <code className="text-white/80">public/music</code>.
            </div>
          )}
        </div>
      </section>
      <CTASection />
    </main>
  )
}
