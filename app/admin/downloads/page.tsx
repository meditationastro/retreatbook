import { listDownloads } from "@/lib/downloads"

export default function DownloadsAdmin() {
  const items = listDownloads()
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Downloads</h1>
        <p className="text-white/60 text-sm">Files in <code className="text-white/70">public/downloads</code></p>
      </div>
      <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
        {items.length ? (
          <ul className="space-y-2 text-sm text-white/70">
            {items.map((d) => (
              <li key={d.filename}>• {d.title} <span className="text-white/40">({d.type})</span></li>
            ))}
          </ul>
        ) : (
          <div className="text-white/70 text-sm">No files yet.</div>
        )}
      </div>
    </div>
  )
}
