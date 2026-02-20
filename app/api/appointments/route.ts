import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { headers } from "next/headers"

export async function GET() {
  try {
    const appointments = await db.appointment.findMany({
      orderBy: {
        createdAt: "desc"
      }
    })

    // Create a Response with the appointments data
    const response = NextResponse.json(appointments)

    // Set cache control headers
    response.headers.set('Cache-Control', 'no-store, max-age=0')
    response.headers.set('Pragma', 'no-cache')
    response.headers.set('Expires', '0')

    return response
  } catch (error) {
    console.error("[APPOINTMENTS_GET_ERROR]", error)
    return NextResponse.json(
      { error: "Failed to fetch appointments" },
      { status: 500 }
    )
  }
} 