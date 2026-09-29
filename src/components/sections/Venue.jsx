import Panel from '../common/Panel'
import { EVENT } from '../../data/content'
import { downloadIcs } from '../../utils/calendar'

export default function Venue({ show }) {
  return (
    <Panel show={show}>
      <p className="label">The Venue</p>
      <h2 className="venue-name">{EVENT.venueName}</h2>
      <p className="venue-addr">{EVENT.venueAddress}</p>
      <div className="actions">
        <a className="btn dark" href={EVENT.mapUrl} target="_blank" rel="noreferrer">Find Us</a>
        <button className="btn dark" onClick={() => downloadIcs({ dateISO: EVENT.dateISO, title: EVENT.title, location: `${EVENT.venueName}, ${EVENT.venueAddress}` })}>Add to Calendar</button>
      </div>
    </Panel>
  )
}
