
"use client"
import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"

export default function SuccessPage() {
  const sp = useSearchParams()
  const sessionId = sp.get("session_id")
  const [status, setStatus] = useState<"loading" | "ok" | "fail">("loading")

  useEffect(() => {
    ;(async () => {
      if (!sessionId) return setStatus("fail")
      const res = await fetch("/api/retreat-bookings/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId }),
      })
      setStatus(res.ok ? "ok" : "fail")
    })()
  }, [sessionId])

  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold">Payment Status</h1>
      <p className="mt-4">
        {status === "loading" && "Confirming your payment..."}
        {status === "ok" && "Confirmed! Check your email for the next steps."}
        {status === "fail" && "We couldn't confirm the payment. Please contact us."}
      </p>
      <a className="inline-block mt-6 underline" href="/h/retreats">Back to Retreats</a>
    </main>
  )
}
