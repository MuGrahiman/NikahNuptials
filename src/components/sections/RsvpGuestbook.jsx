import { useState } from 'react'
import Panel from '../common/Panel'
import Collapse from '../common/Collapse'
import { RSVP, GUESTBOOK } from '../../data/content'

// Step 1: only the RSVP question.  Step 2: the guest book slides in UNDER it (RSVP stays).
export default function RsvpGuestbook({ show, stepId }) {
  const [answer, setAnswer] = useState(null) // null | 'yes' | 'no'
  const cards = [...GUESTBOOK.entries, ...GUESTBOOK.entries]
  return (
    <Panel show={show}>
      <p className="label">{RSVP.question}</p>
      <Collapse open={!answer}>
        <div className="actions">
          <button className="btn small" onClick={() => setAnswer('yes')}>{RSVP.yes.label}</button>
          <button className="btn small" onClick={() => setAnswer('no')}>{RSVP.no.label}</button>
        </div>
      </Collapse>
      <Collapse open={!!answer}><p className="rsvp-reply">{answer && RSVP[answer].reply}</p></Collapse>

      <Collapse open={stepId === 'guestbook'} className="gb">
        <p className="label gb-title">{GUESTBOOK.title}</p>
        <p className="gb-sub">{GUESTBOOK.subtitle}</p>
        <div className="marquee"><div className="marquee-row">
          {cards.map((g, i) => (
            <div className="gb-card" key={i}>
              <span className="avatar">{g.name[0]}</span>
              <div><b>{g.name}</b><p>{g.message}</p></div>
            </div>
          ))}
        </div></div>
      </Collapse>
    </Panel>
  )
}
