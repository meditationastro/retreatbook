import { NextResponse } from "next/server"
import { getBookingModel, csvForRows } from "@/lib/bookingAdmin"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const prisma = (await import("@/lib/prisma")).default
    const found = await getBookingModel(prisma as any)
    if (!found) return NextResponse.json({ error: "No booking model found" }, { status: 500 })
    const rows = await found.model.findMany({ orderBy: { createdAt: "desc" }, take: 2000 })
    const csv = csvForRows(rows)
    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="bookings.csv"`,
      },
    })
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Failed" }, { status: 500 })
  }
}
