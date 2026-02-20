import fs from "fs"
import path from "path"

const FILE = path.join(process.cwd(), "data", "gallery.json")

export function readGallery(): any {
  try { return JSON.parse(fs.readFileSync(FILE, "utf8")) } catch { return { albums: [] } }
}
