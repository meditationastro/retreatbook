
import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(_: Request, { params }: { params: { slug: string } }) {
  const retreat = await prisma.retreat.findUnique({
    where: { slug: params.slug },
    include: { packages: true },
  })
  if (!retreat) return NextResponse.json({ error: "Not found" }, { status: 404 })
  return NextResponse.json({ retreat })
}
