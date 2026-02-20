
import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import Stripe from "stripe"
import nodemailer from "nodemailer"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

function mailer() {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })
}

export async function POST(req: Request) {
  const { sessionId } = await req.json()
  if (!sessionId) return NextResponse.json({ error: "Missing sessionId" }, { status: 400 })

  const session = await stripe.checkout.sessions.retrieve(sessionId)
  const bookingId = session.metadata?.bookingId
  const paymentId = session.metadata?.paymentId

  if (!bookingId || !paymentId) {
    return NextResponse.json({ error: "Invalid session metadata" }, { status: 400 })
  }

  if (session.payment_status !== "paid") {
    await prisma.retreatPayment.update({
      where: { id: paymentId },
      data: { status: "FAILED" },
    })
    return NextResponse.json({ success: false, status: session.payment_status })
  }

  const booking = await prisma.retreatBooking.update({
    where: { id: bookingId },
    data: { status: "CONFIRMED" },
    include: { retreat: true, package: true, payments: true },
  })

  await prisma.retreatPayment.update({
    where: { id: paymentId },
    data: { status: "PAID" },
  })

  // Send confirmation email to guest + admin
  try {
    const transport = mailer()
    const paid = booking.payments.find(p => p.id === paymentId)
    const amount = paid ? `$${(paid.amountCents/100).toFixed(2)}` : ""
    const when = booking.selectedDate.toDateString()

    await transport.sendMail({
      from: process.env.EMAIL_USER,
      to: booking.email,
      subject: "Retreat Booking Confirmed — Nepal",
      text:
        `Hello ${booking.name},\n\nYour booking is confirmed.\n` +
        `Retreat: ${booking.retreat.title}\nPackage: ${booking.package.name}\nDate: ${when}\nPayment: ${amount}\n\n` +
        `We will contact you with detailed itinerary and preparation guidance.\n\n— Retreat Team`,
    })

    await transport.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO || process.env.EMAIL_USER,
      subject: "Retreat Booking Confirmed (Paid)",
      text:
        `CONFIRMED + PAID\nName: ${booking.name}\nEmail: ${booking.email}\n` +
        `Retreat: ${booking.retreat.title}\nPackage: ${booking.package.name}\nDate: ${when}`,
    })
  } catch (e) {
    // ignore email errors
  }

  return NextResponse.json({ success: true, bookingId })
}
