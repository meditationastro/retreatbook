import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(req: Request) {
  const body = await req.json()
  const to = process.env.EMAIL_TO || process.env.EMAIL_USER
  const user = process.env.EMAIL_USER
  const pass = process.env.EMAIL_PASS
  if (!to || !user || !pass) {
    return NextResponse.json({ error: "Email env not configured" }, { status: 500 })
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  })

  await transporter.sendMail({
    from: user,
    to,
    subject: `[Clue UX Contact] ${body.subject || "Message"}`,
    text: `Name: ${body.name}\nEmail: ${body.email}\n\n${body.message}`,
  })

  return NextResponse.json({ ok: true })
}
