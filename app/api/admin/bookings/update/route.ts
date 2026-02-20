import { NextResponse } from "next/server"
import nodemailer from "nodemailer"
import { getBookingModel, pickEmail, pickName, pickRetreat, renderEmailTemplate } from "@/lib/bookingAdmin"

export async function POST(req: Request) {
  const body = await req.json()
  const id = body.id
  const status = body.status as string | undefined
  const note = body.note as string | undefined

  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 })
  if (!status && !note) return NextResponse.json({ error: "status or note required" }, { status: 400 })

  try {
    const prisma = (await import("@/lib/prisma")).default
    const found = await getBookingModel(prisma as any)
    if (!found) return NextResponse.json({ error: "No booking model found." }, { status: 500 })

    // Fetch current row for transition checks
    const current = await found.model.findUnique({ where: { id } })
    if (!current) return NextResponse.json({ error: "Booking not found." }, { status: 404 })

    // Attempt update (if schema has fields)
    const data: any = {}
    if (status) data.status = status
    if (note) data.adminNote = note

    let updated: any = current
    try {
      updated = await found.model.update({ where: { id }, data })
    } catch {
      // If model doesn't have status/adminNote fields, ignore update but still allow email trigger.
      updated = current
    }

    // Auto email triggers (optional)
    const shouldEmail = !!body.autoEmail
    if (shouldEmail && status) {
      const to = pickEmail(updated)
      if (!to) return NextResponse.json({ error: "No email on booking row; cannot send." }, { status: 400 })

      const user = process.env.EMAIL_USER
      const pass = process.env.EMAIL_PASS
      if (!user || !pass) return NextResponse.json({ error: "EMAIL_USER/EMAIL_PASS not configured" }, { status: 500 })

      const transporter = nodemailer.createTransport({ service: "gmail", auth: { user, pass } })
      const name = pickName(updated)
      const retreat = pickRetreat(updated)

      const type =
        status === "deposit"
          ? "deposit"
          : status === "confirmed"
          ? "confirmation"
          : status === "balance_due"
          ? "balance_due"
          : status === "itinerary_sent"
          ? "itinerary"
          : "confirmation"

      const tpl = renderEmailTemplate(type as any, {
        name,
        retreat,
        amount: updated.depositAmount ? String(updated.depositAmount) : undefined,
        date: updated.startDate ? String(updated.startDate) : undefined,
        link: updated.manageUrl ? String(updated.manageUrl) : undefined,
      })

      await transporter.sendMail({ from: user, to, subject: tpl.subject, text: tpl.text })
    }

    return NextResponse.json({ ok: true, updated })
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Failed" }, { status: 500 })
  }
}
