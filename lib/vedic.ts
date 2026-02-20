export type BirthInput = {
  name?: string
  date: string // YYYY-MM-DD
  time?: string // HH:MM
  place?: string
  tzOffsetMinutes?: number
}

const RASHIS = [
  "Aries (Mesha)","Taurus (Vrishabha)","Gemini (Mithuna)","Cancer (Karka)","Leo (Simha)","Virgo (Kanya)",
  "Libra (Tula)","Scorpio (Vrishchika)","Sagittarius (Dhanu)","Capricorn (Makara)","Aquarius (Kumbha)","Pisces (Meena)"
]

// NOTE: This is a lightweight educational approximation.
// For production-grade Vedic charts, integrate Swiss Ephemeris / ephemeris tables.
export function approxSiderealSunRashi(dateISO: string): { rashi: string; note: string } {
  const d = new Date(dateISO + "T00:00:00Z")
  // Tropical sun sign boundaries approximated by month/day
  const m = d.getUTCMonth() + 1
  const day = d.getUTCDate()

  const tropicalIndex = (() => {
    // Aries starts ~Mar 21
    const md = m * 100 + day
    if (md >= 321 && md <= 419) return 0
    if (md >= 420 && md <= 520) return 1
    if (md >= 521 && md <= 620) return 2
    if (md >= 621 && md <= 722) return 3
    if (md >= 723 && md <= 822) return 4
    if (md >= 823 && md <= 922) return 5
    if (md >= 923 && md <= 1022) return 6
    if (md >= 1023 && md <= 1121) return 7
    if (md >= 1122 && md <= 1221) return 8
    if (md >= 1222 || md <= 119) return 9
    if (md >= 120 && md <= 218) return 10
    return 11 // Pisces ~Feb 19 - Mar 20
  })()

  // crude ayanamsa shift: sidereal approx = tropical - 1 sign (varies by epoch)
  const siderealIndex = (tropicalIndex + 11) % 12
  return {
    rashi: RASHIS[siderealIndex],
    note: "Approximation used (tropical sign shifted by ~1). For exact charts, integrate ephemeris.",
  }
}

export function buildLifeMatrix(name: string, dateISO: string) {
  // numerology-ish matrix (educational). Uses digits of date + name length.
  const digits = dateISO.replace(/\D/g, "").split("").map((x) => parseInt(x, 10))
  const sum = digits.reduce((a,b) => a+b, 0)
  const lifePath = ((sum - 1) % 9) + 1
  const destiny = ((name.length - 1) % 9) + 1
  const matrix = {
    lifePath,
    destiny,
    focus: lifePath <= 3 ? "Growth + learning" : lifePath <= 6 ? "Balance + relationships" : "Purpose + leadership",
    practice: destiny <= 3 ? "Creativity + voice" : destiny <= 6 ? "Discipline + compassion" : "Vision + service",
  }
  return matrix
}
