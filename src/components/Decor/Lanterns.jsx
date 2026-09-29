import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import lantern from '../../assets/images/lantern.webp'

const ASPECT = 160 / 757 // lantern.webp width / height

function Lantern({ x, top, h, show, delay, sway }) {
  const wrap = useRef(null), swing = useRef(null), glow = useRef(null)
  useEffect(() => {
    if (!show) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      gsap.from(wrap.current, { yPercent: -105, duration: 1.9, delay, ease: 'elastic.out(1, 0.55)' }) // drops in on its chain
      if (reduced) return
      gsap.fromTo(swing.current, { rotation: -sway }, {
        rotation: sway, duration: 3.2 + delay * 3, delay: delay + 1, yoyo: true, repeat: -1,
        ease: 'sine.inOut', transformOrigin: '50% 0%',
      })
      gsap.to(glow.current, { // candle flicker
        opacity: () => gsap.utils.random(0.55, 1), scale: () => gsap.utils.random(0.94, 1.12),
        duration: () => gsap.utils.random(0.12, 0.5), repeat: -1, repeatRefresh: true, ease: 'sine.inOut',
      })
    }, wrap)
    return () => ctx.revert()
  }, [show, delay, sway])

  const w = h * ASPECT
  return (
    <div ref={wrap} className="lantern" style={{ left: x - w / 2, top, width: w, height: h }}>
      <div ref={swing} className="lantern-swing">
        <div ref={glow} className="lantern-glow" />
        <img src={lantern} alt="" draggable="false" />
      </div>
    </div>
  )
}

// Two lanterns hang from the corners of the ARCH itself (not the screen, and not raw
// fractions of the photo). They're anchored to the safe-zone rect — the part of the arch
// guaranteed to be on-screen — and clamped inside the viewport. This matters because on a
// phone the background can be cropped on *any* side ("cover"-fit): an anchor written as a
// plain image fraction can land in the cropped-off region and render mostly off-screen.
export default function Lanterns({ layout, show }) {
  const { box, safe, w, cfg } = layout
  const l = cfg.lanterns
  const clampX = (x) => Math.min(Math.max(x, 10), w - 10)
  const xl = clampX(safe.left - safe.width * l.leftX)
  const xr = clampX(safe.left + safe.width * (1 + l.rightX))
  const top = Math.max(0, safe.top - box.height * l.y)
  return (
    <>
      <Lantern x={xl} top={top} h={box.height * l.heightL} show={show} delay={0.9} sway={2.6} />
      <Lantern x={xr} top={top} h={box.height * l.heightR} show={show} delay={1.15} sway={2.2} />
    </>
  )
}
