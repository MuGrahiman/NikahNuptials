import Panel from '../common/Panel'
import { DOWNLOAD } from '../../data/content'
import cardPdf from '../../assets/documents/invitation-card.pdf'

// The card itself is deliberately NOT shown - only a teaser + download, so the download stays a small "keepsake" moment.
export default function DownloadCard({ show }) {
  return (
    <Panel show={show}>
      <div className="monogram">{DOWNLOAD.monogram}</div>
      <p className="label">{DOWNLOAD.prompt}</p>
      <a className="btn dark" href={cardPdf} download={DOWNLOAD.fileName}>{DOWNLOAD.button}</a>
    </Panel>
  )
}
