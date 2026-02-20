import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const body = await req.json()
  const expected = process.env.ADMIN_PASSWORD || ""
  if (!expected) return NextResponse.json({ error: "ADMIN_PASSWORD not set" }, { status: 500 })
  if ((body.password || "") !== expected) return NextResponse.json({ ok: false }, { status: 401 })

  const res = NextResponse.json({ ok: true })
  res.cookies.set("admin_token", expected, { httpOnly: true, sameSite: "lax", path: "/" })
  return res
}
