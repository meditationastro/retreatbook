
import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET() {
  const retreats = await prisma.retreat.findMany({
    where: { isActive: true },
    include: { packages: true },
    orderBy: { createdAt: "desc" },
  })
  return NextResponse.json({ retreats })
}
