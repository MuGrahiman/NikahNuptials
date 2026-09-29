const Speaker = ({ on }) => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 9v6h4l5 4V5L8 9H4z" />
    {on ? <><path d="M16.5 8.5a5 5 0 0 1 0 7" /><path d="M19 6a8.5 8.5 0 0 1 0 12" /></> : <path d="M17 9l5 6M22 9l-5 6" />}
  </svg>
)

// The gramophone painted into EITHER background photo doubles as the music button
// (tap = pause/play) — its clickable hotspot is defined per-photo in config/layout.js,
// so it stays lined up with the picture on both the desktop and phone backgrounds.
export default function MusicToggle({ layout, music, visible }) {
  if (!visible) return null
  const { playing, toggle } = music
  const g = layout.cfg.gramophone, b = layout.box
  const style = {
    left: b.left + b.width * g.left, top: b.top + b.height * g.top,
    width: b.width * g.width, height: b.height * g.height,
  }
  return (
    <button className={`gramo ${playing ? 'playing' : ''}`} style={style} onClick={toggle}
            aria-pressed={playing} aria-label={playing ? 'Pause music' : 'Play music'}>
      {playing && <><i className="note n1">♪</i><i className="note n2">♫</i><i className="note n3">♪</i></>}
      <span className="gramo-badge">{playing ? '' : '▶'}</span>
      <span className="gramo-tip">{playing ? 'Pause music' : 'Play music'}</span>
    </button>
  )
}
