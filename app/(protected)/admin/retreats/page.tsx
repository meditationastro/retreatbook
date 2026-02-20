
import prisma from "@/lib/prisma"

export default async function AdminRetreatsPage() {
  const bookings = await prisma.retreatBooking.findMany({
    include: { retreat: true, package: true, payments: true },
    orderBy: { createdAt: "desc" },
    take: 50,
  })

  const payments = bookings.flatMap((b) => b.payments)
  const totalPaid = payments.filter((p) => p.status === "PAID").reduce((s, p) => s + p.amountCents, 0)
  const paidCount = payments.filter((p) => p.status === "PAID").length
  const confirmedBookings = bookings.filter((b) => b.status === "CONFIRMED").length

  return (
    <main className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Retreat Bookings</h1>
        <p className="text-muted-foreground">Overview + latest 50 bookings</p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="border rounded-2xl p-4">
          <div className="text-sm text-muted-foreground">Confirmed bookings</div>
          <div className="text-2xl font-semibold">{confirmedBookings}</div>
        </div>
        <div className="border rounded-2xl p-4">
          <div className="text-sm text-muted-foreground">Payments received</div>
          <div className="text-2xl font-semibold">{paidCount}</div>
        </div>
        <div className="border rounded-2xl p-4">
          <div className="text-sm text-muted-foreground">Total paid</div>
          <div className="text-2xl font-semibold">
            {(totalPaid / 100).toLocaleString("en-US", { style: "currency", currency: "USD" })}
          </div>
        </div>
      </div>

      <div className="border rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted">
            <tr>
              <th className="text-left p-3">Date</th>
              <th className="text-left p-3">Guest</th>
              <th className="text-left p-3">Retreat</th>
              <th className="text-left p-3">Package</th>
              <th className="text-left p-3">Status</th>
              <th className="text-left p-3">Payments</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b.id} className="border-t">
                <td className="p-3">{b.createdAt.toLocaleDateString()}</td>
                <td className="p-3">
                  <div className="font-medium">{b.name}</div>
                  <div className="text-muted-foreground">{b.email}</div>
                </td>
                <td className="p-3">{b.retreat.title}</td>
                <td className="p-3">{b.package.name}</td>
                <td className="p-3">{b.status}</td>
                <td className="p-3">
                  {b.payments.map((p) => (
                    <div key={p.id}>
                      {p.kind}: {(p.amountCents / 100).toLocaleString("en-US", { style: "currency", currency: "USD" })} —{" "}
                      {p.status}
                    </div>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  )
}
