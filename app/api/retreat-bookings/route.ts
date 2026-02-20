
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
  const body = await req.json()
  const {
    retreatId,
    packageId,
    selectedDate,
    name,
    email,
    phone,
    message,
    paymentKind, // "DEPOSIT" | "FULL" | "BALANCE"
  } = body

  if (!retreatId || !packageId || !selectedDate || !name || !email || !paymentKind) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
  }

  const pkg = await prisma.retreatPackage.findUnique({ where: { id: packageId } })
  if (!pkg) return NextResponse.json({ error: "Invalid package" }, { status: 400 })

  const amountCents =
    paymentKind === "FULL" ? pkg.priceCents :
    paymentKind === "DEPOSIT" ? pkg.depositCents :
    Math.max(pkg.priceCents - pkg.depositCents, 0)

  const booking = await prisma.retreatBooking.create({
    data: {
      retreatId,
      packageId,
      selectedDate: new Date(selectedDate),
      name,
      email,
      phone: phone || null,
      message: message || null,
      status: "PENDING",
      payments: {
        create: [
          {
            kind: paymentKind,
            amountCents,
            status: "PENDING",
          },
        ],
      },
    },
    include: { payments: true, retreat: true, package: true },
  })

  const payment = booking.payments[0]

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: `${booking.retreat.title} — ${booking.package.name} (${paymentKind})`,
          },
          unit_amount: amountCents,
        },
        quantity: 1,
      },
    ],
    metadata: {
      bookingId: booking.id,
      paymentId: payment.id,
      paymentKind,
    },
    success_url: `${process.env.NEXT_PUBLIC_URL}/h/retreats/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/h/retreats/cancel`,
  })

  await prisma.retreatPayment.update({
    where: { id: payment.id },
    data: { stripeSessionId: session.id },
  })

  // Notify admin immediately (optional but helpful)
  try {
    const transport = mailer()
    await transport.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO || process.env.EMAIL_USER,
      subject: "New Retreat Booking (Payment Started)",
      text:
        `Name: ${booking.name}\nEmail: ${booking.email}\nRetreat: ${booking.retreat.title}` +
        `\nPackage: ${booking.package.name}\nKind: ${paymentKind}\nAmount: $${(amountCents/100).toFixed(2)}` +
        `\nDate: ${new Date(selectedDate).toDateString()}\nMessage: ${booking.message ?? ""}`,
    })
  } catch (e) {
    // ignore email errors (don’t block checkout)
  }

  return NextResponse.json({ url: session.url, bookingId: booking.id })
}
