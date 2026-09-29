import { useCallback, useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

/**
 * Native scrolling drives a "step" number (never hijacked), and when the guest stops
 * scrolling the page glides to the nearest step so only one section shows at a time.
 * `maxStep` locks progress (used for the date gate).
 */
export default function useStepScroll({ enabled, total, maxStep, onManualScroll }) {
  const [step, setStep] = useState(0)
  const max = useRef(maxStep); max.current = maxStep
  const current = useRef(0)
  const snapping = useRef(false)
  const timer = useRef(null)

  const goTo = useCallback((i) => {
    const target = Math.min(i, max.current)
    snapping.current = true
    gsap.to(window, {
      duration: 0.7, ease: 'power2.out', overwrite: true,
      scrollTo: (ScrollTrigger.maxScroll(window) * target) / (total - 1),
      onComplete: () => { snapping.current = false },
    })
  }, [total])

  useEffect(() => {
    if (!enabled) return
    // A new scroll gesture immediately cancels any in-flight snap animation — otherwise the
    // old animation keeps fighting the new scroll for a moment, which feels like the page is
    // "stuck between sections" or lagging.
    const interrupt = () => {
      onManualScroll?.() // a real touch/wheel from the user always takes control back (e.g. cancels auto-play)
      if (snapping.current) { gsap.killTweensOf(window); snapping.current = false }
    }
    window.addEventListener('wheel', interrupt, { passive: true })
    window.addEventListener('touchmove', interrupt, { passive: true })
    // On touch, snap the instant the finger lifts rather than waiting out the idle timer —
    // otherwise there's a visible pause after every swipe before the page settles.
    const onTouchEnd = () => { clearTimeout(timer.current); timer.current = setTimeout(() => goTo(current.current), 40) }
    window.addEventListener('touchend', onTouchEnd, { passive: true })

    const st = ScrollTrigger.create({
      trigger: '#stage', start: 'top top', end: 'bottom bottom',
      onUpdate: (self) => {
        const idx = Math.min(Math.round(self.progress * (total - 1)), max.current)
        if (idx !== current.current) { current.current = idx; setStep(idx) }
        if (!snapping.current) {
          clearTimeout(timer.current)
          timer.current = setTimeout(() => goTo(current.current), 120)
        }
      },
    })
    ScrollTrigger.refresh()
    return () => {
      st.kill(); clearTimeout(timer.current)
      window.removeEventListener('wheel', interrupt)
      window.removeEventListener('touchmove', interrupt)
      window.removeEventListener('touchend', onTouchEnd)
    }
  }, [enabled, total, goTo])

  return { step, goTo }
}
