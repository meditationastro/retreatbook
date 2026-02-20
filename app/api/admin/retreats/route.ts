import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import { putFile } from "@/lib/cmsStore"

const FILE = path.join(process.cwd(), "data", "retreats.json")

function read() {
  try { return JSON.parse(fs.readFileSync(FILE, "utf8")) } catch { return { items: [] } }
}

export async function GET() {
  const data = read()
  return NextResponse.json({ items: data.items || [] })
}

export async function PUT(req: Request) {
  const body = await req.json()
  const retreat = body.retreat
  if (!retreat?.slug) return NextResponse.json({ error: "Missing slug" }, { status: 400 })

  const data = read()
  const items = data.items || []
  const idx = items.findIndex((r: any) => r.slug === retreat.slug)
  const clean = { ...retreat }
  delete clean.__new

  if (idx >= 0) items[idx] = clean
  else items.unshift(clean)

  const content = JSON.stringify({ items }, null, 2)
  await putFile({ filepath: "data/retreats.json", content, message: `retreats: upsert ${retreat.slug}` })
  return NextResponse.json({ ok: true })
}

export async function DELETE(req: Request) {
  const body = await req.json()
  const slug = body.slug
  if (!slug) return NextResponse.json({ error: "Missing slug" }, { status: 400 })

  const data = read()
  const items = (data.items || []).filter((r: any) => r.slug !== slug)
  const content = JSON.stringify({ items }, null, 2)
  await putFile({ filepath: "data/retreats.json", content, message: `retreats: delete ${slug}` })
  return NextResponse.json({ ok: true })
}
