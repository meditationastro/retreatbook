import fs from "fs"
import path from "path"

const FILE = path.join(process.cwd(), "data", "siteContent.json")

export type SiteContent = any

export function readSiteContent(): SiteContent {
  try {
    return JSON.parse(fs.readFileSync(FILE, "utf8"))
  } catch {
    return {}
  }
}

export function writeSiteContent(data: SiteContent) {
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2))
}
