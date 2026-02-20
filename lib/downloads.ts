import fs from "fs"
import path from "path"

export type DownloadItem = {
  filename: string
  title: string
  type: "pdf" | "zip" | "audio" | "other"
}

const DIR = path.join(process.cwd(), "public", "downloads")

export function listDownloads(): DownloadItem[] {
  try {
    const files = fs.readdirSync(DIR)
    return files
      .filter((f) => !f.toLowerCase().startsWith("readme"))
      .map((f) => {
        const ext = f.split(".").pop()?.toLowerCase() || "other"
        const type = ext === "pdf" ? "pdf" : ext === "zip" ? "zip" : ext in { mp3:1, wav:1, m4a:1 } ? "audio" : "other"
        const title = f.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ")
        return { filename: f, title, type: type as any }
      })
  } catch {
    return []
  }
}
