import { useEffect, useRef } from 'react'
import gsap from 'gsap'

// A full-size layer inside the arch. Slides up + fades in when shown, drifts up + fades out when hidden.
export default function Panel({ show, children, className = '' }) {
  const ref = useRef(null)
  const first = useRef(true)
  useEffect(() => {
    const el = ref.current
    if (show) gsap.fromTo(el, { opacity: 0, y: 36 }, { opacity: 1, y: 0, duration: 0.7, delay: 0.25, ease: 'power2.out', overwrite: true })
    else if (!first.current) gsap.to(el, { opacity: 0, y: -36, duration: 0.4, ease: 'power2.in', overwrite: true })
    first.current = false
  }, [show])
  return <div ref={ref} className={`panel ${show ? 'is-active' : ''} ${className}`}>{children}</div>
}
