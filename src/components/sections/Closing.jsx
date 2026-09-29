import Panel from '../common/Panel'
import { CLOSING } from '../../data/content'

// Two calm beats: 1) the couples' names   2) the thank-you message.
export default function Closing({ stepId, ready }) {
  return (
    <>
      <Panel show={ready && stepId === 'closing-names'}>
        {CLOSING.names.map((n) => <p className="closing-names" key={n}>{n}</p>)}
        <div className="flourish" />
      </Panel>
      <Panel show={ready && stepId === 'closing-message'}>
        <p className="closing-msg">{CLOSING.message}</p>
        <div className="flourish" />
        <p className="label">{CLOSING.compliments}</p>
      </Panel>
    </>
  )
}
