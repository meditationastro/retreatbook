import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import { putFile } from "@/lib/cmsStore"

const FILE = path.join(process.cwd(), "data", "siteContent.json")

export async function GET() {
  try {
    const data = JSON.parse(fs.readFileSync(FILE, "utf8"))
    return NextResponse.json({ data })
  } catch {
    return NextResponse.json({ data: {} })
  }
}

export async function PUT(req: Request) {
  const body = await req.json()
  const data = body.data || {}
  const content = JSON.stringify(data, null, 2)
  try {
    await putFile({ filepath: "data/siteContent.json", content, message: "cms: update site content" })
    return NextResponse.json({ ok: true })
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Failed" }, { status: 500 })
  }
}
