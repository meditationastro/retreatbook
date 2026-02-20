import { NextResponse } from "next/server"
import nodemailer from "nodemailer"
import { pickEmail, pickName, pickRetreat, renderEmailTemplate } from "@/lib/bookingAdmin"

export async function POST(req: Request) {
  const body = await req.json()
  const row = body.row || {}
  const type = body.type as "deposit" | "confirmation" | "balance_due" | "itinerary"

  const to = pickEmail(row)
  if (!to) return NextResponse.json({ error: "No email field found on booking row." }, { status: 400 })

  const user = process.env.EMAIL_USER
  const pass = process.env.EMAIL_PASS
  if (!user || !pass) return NextResponse.json({ error: "EMAIL_USER/EMAIL_PASS not configured" }, { status: 500 })

  const transporter = nodemailer.createTransport({ service: "gmail", auth: { user, pass } })
  const name = pickName(row)
  const retreat = pickRetreat(row)

  const { subject, text } = renderEmailTemplate(type || "confirmation", {
    name,
    retreat,
    amount: row.depositAmount ? String(row.depositAmount) : undefined,
    date: row.startDate ? String(row.startDate) : undefined,
    link: row.manageUrl ? String(row.manageUrl) : undefined,
  })

  await transporter.sendMail({ from: user, to, subject, text })
  return NextResponse.json({ ok: true })
}
