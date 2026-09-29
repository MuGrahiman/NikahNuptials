import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import Panel from '../common/Panel'
import Collapse from '../common/Collapse'
import useCountdown from '../../hooks/useCountdown'
import { EVENT, DATE_TEXT } from '../../data/content'

// Step 1: tap "Reveal the Date" (scrolling is locked until then) -> day, date and time appear.
// Step 2 (next scroll): the countdown starts, date stays visible.
export default function DateReveal({ show, stepId, revealed, onReveal }) {
  const gate = useRef(null), block = useRef(null)
  const cd = useCountdown(EVENT.dateISO, revealed)

  useEffect(() => {
    gsap.to(block.current, { opacity: revealed ? 1 : 0, y: revealed ? 0 : 24, duration: 0.9, delay: revealed ? 0.3 : 0, ease: 'power2.out' })
    gsap.to(gate.current, { opacity: revealed ? 0 : 1, duration: 0.4, onComplete: () => { gate.current.style.visibility = revealed ? 'hidden' : 'visible' } })
  }, [revealed])

  const cells = [['Days', cd.days], ['Hours', cd.hours], ['Min', cd.minutes], ['Sec', cd.seconds]]
  return (
    <Panel show={show}>
      <div ref={gate} className="reveal-gate">
        <button className="btn" onClick={onReveal}>Reveal the Date</button>
        <p className="hint">scroll unlocks once revealed</p>
      </div>
      <div ref={block} className="date-block">
        <p className="label">{DATE_TEXT[cd.phase]}</p>
        <p className="date-day">{EVENT.day}</p>
        <p className="date-main">{EVENT.date}</p>
        <p className="date-time">{EVENT.time}</p>
        <Collapse open={revealed && stepId === 'countdown' && cd.phase !== 'after'}>
          <div className="cd">
            {cells.map(([label, v]) => (
              <div className="cd-cell" key={label}><span className="cd-num">{String(v).padStart(2, '0')}</span><span className="cd-label">{label}</span></div>
            ))}
          </div>
        </Collapse>
      </div>
    </Panel>
  )
}
