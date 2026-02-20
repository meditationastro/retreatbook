import fs from "fs"
import path from "path"

export type Track = { filename: string; title: string }

const DIR = path.join(process.cwd(), "public", "music")

export function listTracks(): Track[] {
  try {
    const files = fs.readdirSync(DIR).filter((f) => f.match(/\.(mp3|wav|m4a)$/i))
    return files.map((f) => ({ filename: f, title: f.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ") }))
  } catch {
    return []
  }
}
