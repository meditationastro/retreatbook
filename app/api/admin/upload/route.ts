import { NextResponse } from "next/server"

export const runtime = "nodejs"

export async function POST(req: Request) {
  const formData = await req.formData()
  const file = formData.get("file") as File | null
  if (!file) return NextResponse.json({ error: "file required" }, { status: 400 })

  const folder = (formData.get("folder") as string) || "uploads"
  const filename = (formData.get("filename") as string) || file.name
  const token = process.env.BLOB_READ_WRITE_TOKEN

  if (!token) {
    return NextResponse.json(
      {
        error:
          "BLOB_READ_WRITE_TOKEN not set. For Vercel uploads, set Vercel Blob token. Otherwise upload images into /public/uploads manually.",
      },
      { status: 500 }
    )
  }

  // Dynamic import so the project still runs without the dependency in local-only scenarios.
  const { put } = await import("@vercel/blob")
  const key = `${folder}/${Date.now()}-${filename}`.replace(/\s+/g, "-")
  const blob = await put(key, file, { access: "public" })

  return NextResponse.json({ url: blob.url, pathname: blob.pathname })
}
