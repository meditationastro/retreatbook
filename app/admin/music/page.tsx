import { listTracks } from "@/lib/music"

export default function MusicAdmin() {
  const items = listTracks()
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Music</h1>
        <p className="text-white/60 text-sm">Files in <code className="text-white/70">public/music</code></p>
      </div>
      <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
        {items.length ? (
          <ul className="space-y-2 text-sm text-white/70">
            {items.map((t) => (
              <li key={t.filename}>• {t.title}</li>
            ))}
          </ul>
        ) : (
          <div className="text-white/70 text-sm">No tracks yet.</div>
        )}
      </div>
    </div>
  )
}
