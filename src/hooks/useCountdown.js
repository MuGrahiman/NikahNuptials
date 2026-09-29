import { useEffect, useState } from 'react'

// phase: 'before' (counting down) | 'day' (wedding day, zeros) | 'after' (no numbers)
export default function useCountdown(iso, active) {
  const [now, setNow] = useState(Date.now())
  useEffect(() => {
    if (!active) return
    setNow(Date.now())
    const t = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(t)
  }, [active])
  const diff = new Date(iso).getTime() - now
  const phase = diff > 0 ? 'before' : diff > -864e5 ? 'day' : 'after'
  const s = Math.max(0, Math.floor(diff / 1000))
  return { phase, days: Math.floor(s / 86400), hours: Math.floor((s % 86400) / 3600), minutes: Math.floor((s % 3600) / 60), seconds: s % 60 }
}
