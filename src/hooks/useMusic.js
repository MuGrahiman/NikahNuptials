import { useEffect, useRef, useState } from 'react'
import track from '../assets/music/background.mp3'

export default function useMusic() {
  const audio = useRef(null)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const a = new Audio(track)
    a.loop = true; a.volume = 0.55; a.preload = 'auto'
    const sync = () => setPlaying(!a.paused)
    a.addEventListener('play', sync); a.addEventListener('pause', sync)
    audio.current = a
    return () => { a.pause(); a.removeEventListener('play', sync); a.removeEventListener('pause', sync) }
  }, [])

  // Browsers only allow sound after a tap, so play() is called from the cover tap.
  const play = () => audio.current?.play().catch(() => {})
  const toggle = () => { const a = audio.current; if (a) (a.paused ? a.play().catch(() => {}) : a.pause()) }
  return { playing, play, toggle }
}
