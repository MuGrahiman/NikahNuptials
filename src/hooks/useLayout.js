import { useEffect, useRef, useState } from 'react'
import { LAYOUT } from '../config/layout'

/**
 * Picks the right background photo for this screen shape and works out exactly where it
 * sits (`box`) and where the blank arch area is (`safe`), in real pixels, so every other
 * component (lanterns, gramophone hotspot, the text itself) can line up with it precisely.
 *
 *  - Wide/landscape screens: the landscape photo, "contain"-fit (whole picture always visible).
 *  - Phone/portrait screens: the dedicated portrait photo, "cover"-fit (fills the screen;
 *    since it was composed for this shape, the small crop on tall/narrow phones is minor).
 */
function compute() {
  const w = window.innerWidth, h = window.innerHeight
  const portrait = w / h < LAYOUT.portraitBreakpoint
  const mode = portrait ? 'portrait' : 'landscape'
  const cfg = LAYOUT[mode]
  const r = cfg.ratio

  const bw = portrait ? Math.max(w, h * r) : Math.min(w, h * r)
  const bh = bw / r
  const box = { left: (w - bw) / 2, top: (h - bh) / 2, width: bw, height: bh }

  const a = cfg.arch
  const safe = {
    left: box.left + bw * a.left, top: box.top + bh * a.top,
    width: bw * (a.right - a.left), height: bh * (a.bottom - a.top),
  }
  return { w, h, mode, cfg, box, safe }
}

export default function useLayout() {
  const [layout, setLayout] = useState(compute)
  const lastWidth = useRef(window.innerWidth)

  useEffect(() => {
    // THE mobile "background jumps while scrolling" bug: on phones, showing/hiding the
    // browser's address bar while the user scrolls fires a `resize` event and changes
    // `window.innerHeight` — with nothing to do with the page's own layout. The old code
    // recomputed the background's size/position on every such event, so the image visibly
    // snapped to a new size mid-scroll. Fix: only recompute for a *real* layout change — the
    // width changed (rotation, actual window resize) — and ignore height-only wobbles, which
    // is exactly what address-bar show/hide looks like.
    const update = () => {
      const w = window.innerWidth
      if (w === lastWidth.current) return
      lastWidth.current = w
      setLayout(compute())
    }
    const onOrientation = () => { lastWidth.current = window.innerWidth; setLayout(compute()) }
    window.addEventListener('resize', update)
    window.addEventListener('orientationchange', onOrientation)
    return () => { window.removeEventListener('resize', update); window.removeEventListener('orientationchange', onOrientation) }
  }, [])
  return layout
}
