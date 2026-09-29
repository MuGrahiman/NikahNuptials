import { useEffect, useRef } from 'react'
import gsap from 'gsap'

// Grows from / shrinks to zero height, so the parent stays perfectly centred and nothing overlaps.
export default function Collapse({ open, children, className = '' }) {
  const ref = useRef(null)
  const first = useRef(true)
  useEffect(() => {
    const to = { height: open ? 'auto' : 0, opacity: open ? 1 : 0, duration: 0.7, ease: 'power2.out' }
    if (first.current) gsap.set(ref.current, to); else gsap.to(ref.current, to)
    first.current = false
  }, [open])
  return <div ref={ref} className={`collapse ${className}`} aria-hidden={!open}>{children}</div>
}
