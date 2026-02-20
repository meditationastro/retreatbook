"use client"

import { useState } from "react"

export default function AdminUploads() {
  const [folder, setFolder] = useState("uploads")
  const [status, setStatus] = useState("")
  const [url, setUrl] = useState("")
  const [file, setFile] = useState<File | null>(null)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Uploads</h1>
        <p className="text-white/60 text-sm">
          Upload images/files to Vercel Blob (recommended) and use returned URL in blog featured images, gallery items, and pages.
        </p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-black/30 p-5 space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <input
            className="rounded-xl bg-black/40 border border-white/10 px-3 py-2"
            value={folder}
            onChange={(e) => setFolder(e.target.value)}
            placeholder="Folder (uploads)"
          />
          <input
            className="rounded-xl bg-black/40 border border-white/10 px-3 py-2"
            type="file"
            accept="image/*,.pdf,.zip,.mp3"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
        </div>

        <button
          className="bg-white text-black px-5 py-2 rounded-full hover:opacity-90"
          onClick={async () => {
            setStatus(""); setUrl("")
            if (!file) { setStatus("Choose a file first."); return }
            const fd = new FormData()
            fd.append("file", file)
            fd.append("folder", folder)
            fd.append("filename", file.name)
            const res = await fetch("/api/admin/upload", { method: "POST", body: fd })
            const json = await res.json()
            if (!res.ok) { setStatus(json.error || "Upload failed"); return }
            setUrl(json.url)
            setStatus("Uploaded ✅")
          }}
        >
          Upload
        </button>

        {status && <div className="text-sm text-white/70">{status}</div>}
        {url && (
          <div className="rounded-xl border border-white/10 bg-black/40 p-4 text-sm">
            <div className="text-white/60">Use this URL:</div>
            <div className="mt-1 break-all text-white">{url}</div>
          </div>
        )}

        <div className="text-xs text-white/50">
          Requires <code className="text-white/70">BLOB_READ_WRITE_TOKEN</code>. If not set, upload manually to <code className="text-white/70">public/uploads</code>.
        </div>
      </div>
    </div>
  )
}
