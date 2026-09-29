// The blank area of the arch. Everything is clipped to it, and all text sizes scale
// from ITS size (CSS container units), so nothing can spill outside the arch on any screen.
export default function SafeZone({ layout, children }) {
  const { left, top, width, height } = layout.safe
  return <div className="safezone" style={{ left, top, width, height }}>{children}</div>
}
