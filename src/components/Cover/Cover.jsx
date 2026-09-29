import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import coverImg from '../../assets/images/invitation-cover.jpg'

/**
 * The invitation card. The real photo already has its own printed cord and medallion
 * seal holding it shut, so rather than draw a *second*, fake rope on top of it (which just
 * reads as a stray line, since it can't match a static photo's printed one), the open
 * animation makes that real seal glow and release first, then the two halves swing open
 * like doors — the story beat is "the seal is broken", using the card's own artwork.
 *
 * The backdrop behind the card is the same photo, hugely blurred and darkened (the
 * "blurred album art" trick), so the screen reads as one deliberate cover image rather
 * than a small photo floating on a plain background.
 */
export default function Cover({ onOpen, onDone }) {
  const root = useRef(null)
  const busy = useRef(false)

  useEffect(() => { // a slow idle "breathe" so the cover feels alive before it's tapped
    const t = gsap.to(root.current.querySelector('.cover-inner'), {
      scale: 1.015, duration: 3.2, ease: 'sine.inOut', yoyo: true, repeat: -1,
    })
    return () => t.kill()
  }, [])

  const open = () => {
    if (busy.current) return
    busy.current = true
    onOpen()
    const q = gsap.utils.selector(root.current)
    gsap.timeline({ onComplete: onDone })
      .to(q('.cover-inner'), { scale: 1, duration: 0.3 }, 0) // stop the idle breathing cleanly
      // the hint has its own infinite CSS pulse animation, which overrides a plain opacity
      // tween (a running CSS animation always wins over an inline style) — stop it explicitly
      .set(q('.cover-hint'), { animation: 'none' }, 0)
      .to(q('.cover-hint'), { opacity: 0, duration: 0.25 }, 0)
      // 1. the seal on the card catches the light and releases
      .fromTo(q('.seal-glow'), { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 2.2, duration: 0.55, ease: 'power1.out' }, 0.05)
      .to(q('.seal-glow'), { opacity: 0, scale: 3, duration: 0.45, ease: 'power1.in' }, 0.55)
      // 2. open: the card swings like double doors, backdrop deepens behind it
      .to(q('.cover-backdrop'), { filter: 'blur(55px) brightness(.32) saturate(1.15)', duration: 1.2 }, 0.5)
      .to(q('.cover-inner'), { scale: 1.12, duration: 1.3, ease: 'power2.inOut' }, 0.55)
      .to(q('.cover-half.left'), { rotateY: -118, duration: 1.3, ease: 'power3.inOut' }, 0.55)
      .to(q('.cover-half.right'), { rotateY: 118, duration: 1.3, ease: 'power3.inOut' }, 0.55)
      .to(q('.cover-inner'), { opacity: 0, duration: 0.5 }, 1.55)
      .to(q('.cover-backdrop'), { opacity: 0, duration: 0.6 }, 1.6)
  }

  const face = { backgroundImage: `url(${coverImg})` }
  return (
    <div ref={root} className="cover" onClick={open} role="button" tabIndex={0} aria-label="Open the invitation"
         onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && open()}>
      <div className="cover-backdrop" style={face} />
      <div className="cover-vignette" />
      <div className="cover-inner">
        <div className="cover-half left" style={face} />
        <div className="cover-half right" style={face} />
        <div className="seal-glow" />
      </div>
      <p className="cover-hint">Tap to open</p>
    </div>
  )
}
