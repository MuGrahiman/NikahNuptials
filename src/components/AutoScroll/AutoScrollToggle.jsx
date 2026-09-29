// Play/pause pill for the optional auto-scroll. Manual scrolling always overrides it
// (see useStepScroll's onManualScroll), so this only ever reflects the guest's own choice.
export default function AutoScrollToggle({ playing, onToggle, visible }) {
  if (!visible) return null
  return (
    <button className={`autoscroll ${playing ? 'playing' : ''}`} onClick={onToggle}
            aria-pressed={playing} aria-label={playing ? 'Pause auto-scroll' : 'Play auto-scroll'}>
      {playing ? (
        <svg viewBox="0 0 24 24" width="13" height="13"><rect x="6" y="5" width="4" height="14" rx="1" fill="currentColor" /><rect x="14" y="5" width="4" height="14" rx="1" fill="currentColor" /></svg>
      ) : (
        <svg viewBox="0 0 24 24" width="13" height="13"><path d="M7 5l12 7-12 7V5z" fill="currentColor" /></svg>
      )}
      <span>{playing ? 'Pause' : 'Auto-scroll'}</span>
    </button>
  )
}
