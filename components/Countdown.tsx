
"use client"
import { useEffect, useState } from "react"

export default function Countdown() {
  const targetDate = new Date("2026-02-01T00:00:00").getTime()
  const [timeLeft, setTimeLeft] = useState(targetDate - new Date().getTime())

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(targetDate - new Date().getTime())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24))

  return (
    <div className="text-center text-xl font-semibold text-gold-600">
      Retreat begins in {days} days – February 2026
    </div>
  )
}
