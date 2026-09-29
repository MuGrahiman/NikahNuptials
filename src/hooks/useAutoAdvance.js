import { useEffect, useRef } from 'react'

/**
 * Optional "sit back and watch" mode: advances one step at a time on a timer.
 * Off by default — the guest has to turn it on. It respects the same gate as manual
 * scrolling (e.g. it will not skip past the date reveal), stops automatically at the
 * last step, and any real scroll/touch from the guest (see `onManualScroll` in
 * useStepScroll) turns it back off instantly so it never fights the user.
 */
export default function useAutoAdvance({ playing, step, maxStep, total, goTo, intervalMs = 4200 }) {
  const stepRef = useRef(step); stepRef.current = step
  const maxRef = useRef(maxStep); maxRef.current = maxStep

  useEffect(() => {
    if (!playing) return
    const id = setInterval(() => {
      const next = stepRef.current + 1
      if (next > maxRef.current || next >= total) { clearInterval(id); return }
      goTo(next)
    }, intervalMs)
    return () => clearInterval(id)
  }, [playing, total, goTo, intervalMs])
}
