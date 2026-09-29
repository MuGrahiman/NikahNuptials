import Panel from '../common/Panel'
import { INVITATION } from '../../data/content'

export default function InvitationPhrase({ show }) {
  return (
    <Panel show={show}>
      <p className="phrase-lead">{INVITATION.lead}</p>
      <p className="phrase-host">{INVITATION.host}</p>
      <p className="phrase-house">{INVITATION.house}</p>
      <p className="phrase-body">{INVITATION.body}</p>
    </Panel>
  )
}
