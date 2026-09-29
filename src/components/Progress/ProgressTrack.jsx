import { useEffect, useRef } from 'react'
import gsap from 'gsap'

/**
 * A thin gold line down the side: one dot per SECTION, placed at the exact scroll fraction
 * where that section actually begins (not spaced evenly) — so a dot always lines up with
 * the real moment its content appears. The knob moves continuously with the raw scroll step,
 * so it's always in motion (never looks "stuck") and lands exactly on a dot the instant that
 * section starts.
 *
 * `step` / `totalSteps` = the fine-grained scroll position (drives the knob).
 * `sections` = the coarser list shown as dots; each has `firstStep` (its start, in step units).
 */
export default function ProgressTrack({ sections, step, totalSteps, onSelect }) {
  const knob = useRef(null), fill = useRef(null)
  const pct = (s) => `${(s / (totalSteps - 1)) * 100}%`
  const currentSection = [...sections].reverse().find((s) => s.firstStep <= step) || sections[0]

  useEffect(() => {
    const p = pct(step)
    gsap.to(knob.current, { top: p, duration: 0.45, ease: 'power2.out', overwrite: true })
    gsap.to(fill.current, { height: p, duration: 0.45, ease: 'power2.out', overwrite: true })
  }, [step]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <nav className="progress" aria-label="Invitation progress">
      <div className="progress-track" />
      <div ref={fill} className="progress-fill" />
      {sections.map((s) => (
        <button key={s.id} className={`tick ${s.firstStep <= step ? 'reached' : ''} ${s === currentSection ? 'current' : ''}`}
                style={{ top: pct(s.firstStep) }} onClick={() => onSelect(s.firstStep)} aria-label={s.label}>
          <span className="tip">{s.label}</span>
        </button>
      ))}
      <div ref={knob} className="knob" />
    </nav>
  )
}
