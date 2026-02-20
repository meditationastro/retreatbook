import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import { putFile } from "@/lib/cmsStore"

const FILE = path.join(process.cwd(), "data", "gallery.json")

export async function GET() {
  try {
    const data = JSON.parse(fs.readFileSync(FILE, "utf8"))
    return NextResponse.json({ data })
  } catch {
    return NextResponse.json({ data: { albums: [] } })
  }
}

export async function PUT(req: Request) {
  const body = await req.json()
  const data = body.data || { albums: [] }
  const content = JSON.stringify(data, null, 2)
  await putFile({ filepath: "data/gallery.json", content, message: "gallery: update" })
  return NextResponse.json({ ok: true })
}
