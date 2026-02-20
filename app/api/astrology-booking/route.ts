import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(req: Request) {
  const body = await req.json()
  const user = process.env.EMAIL_USER
  const pass = process.env.EMAIL_PASS
  const to = process.env.EMAIL_TO || user
  if (!user || !pass || !to) return NextResponse.json({ error: "Email env not configured" }, { status: 500 })

  const transporter = nodemailer.createTransport({ service: "gmail", auth: { user, pass } })

  const subject = `[Astrology Booking] ${body.service || "Service"} — ${body.name || "Client"}`
  const text = [
    `Service: ${body.service}`,
    `Name: ${body.name}`,
    `Email: ${body.email}`,
    `Phone: ${body.phone || ""}`,
    `DOB: ${body.dob}`,
    `TOB: ${body.tob}`,
    `POB: ${body.pob}`,
    `Preferred Date: ${body.preferred || ""}`,
    `Questions: ${body.questions || ""}`,
  ].join("\n")

  await transporter.sendMail({ from: user, to, subject, text })
  return NextResponse.json({ ok: true })
}
