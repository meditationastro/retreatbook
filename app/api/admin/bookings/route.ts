import { NextResponse } from "next/server"
import { getBookingModel } from "@/lib/bookingAdmin"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const prisma = (await import("@/lib/prisma")).default
    const found = await getBookingModel(prisma as any)
    if (!found) return NextResponse.json({ error: "No booking model found in Prisma (expected booking or retreatBooking)." }, { status: 500 })
    const rows = await found.model.findMany({ orderBy: { createdAt: "desc" }, take: 500 })
    return NextResponse.json({ rows, model: found.name })
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "DB not configured. Set DATABASE_URL and run migrations." }, { status: 500 })
  }
}
