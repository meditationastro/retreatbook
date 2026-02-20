
import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(req: Request) {
  const formData = await req.formData()
  const name = formData.get("name")
  const email = formData.get("email")
  const packageName = formData.get("package")
  const message = formData.get("message")

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  })

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: "New Retreat Booking",
    text: `Name: ${name}\nEmail: ${email}\nPackage: ${packageName}\nMessage: ${message}`
  })

  return NextResponse.json({ success: true })
}
