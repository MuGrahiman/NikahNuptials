import { useCallback, useEffect, useState } from 'react'
import { STEPS, SECTIONS, GATE_STEP } from './config/steps'
import useLayout from './hooks/useLayout'
import useMusic from './hooks/useMusic'
import useStepScroll from './hooks/useStepScroll'
import useAutoAdvance from './hooks/useAutoAdvance'
import Cover from './components/Cover/Cover'
import Background from './components/Stage/Background'
import SafeZone from './components/Stage/SafeZone'
import Lanterns from './components/Decor/Lanterns'
import ProgressTrack from './components/Progress/ProgressTrack'
import MusicToggle from './components/Music/MusicToggle'
import AutoScrollToggle from './components/AutoScroll/AutoScrollToggle'
import Bismillah from './components/sections/Bismillah'
import InvitationPhrase from './components/sections/InvitationPhrase'
import Couples from './components/sections/Couples'
import DateReveal from './components/sections/DateReveal'
import Venue from './components/sections/Venue'
import RsvpGuestbook from './components/sections/RsvpGuestbook'
import DownloadCard from './components/sections/DownloadCard'
import Closing from './components/sections/Closing'

export default function App() {
  const layout = useLayout()
  const music = useMusic()
  const [opened, setOpened] = useState(false)   // cover tapped (doors start opening)
  const [ready, setReady] = useState(false)     // doors fully open
  const [revealed, setRevealed] = useState(false)
  const [autoPlaying, setAutoPlaying] = useState(false)
  const maxStep = revealed ? STEPS.length - 1 : GATE_STEP // date gate

  const { step, goTo } = useStepScroll({
    enabled: opened, total: STEPS.length, maxStep,
    onManualScroll: useCallback(() => setAutoPlaying(false), []), // the guest scrolling always wins
  })
  useAutoAdvance({ playing: autoPlaying, step, maxStep, total: STEPS.length, goTo })

  const { id: stepId, section } = STEPS[step]
  const on = (...ids) => ready && ids.includes(section)

  useEffect(() => {                                    // no scrolling behind the cover
    document.documentElement.style.overflow = opened ? '' : 'hidden'
    document.body.style.overflow = opened ? '' : 'hidden'
    if (opened) window.scrollTo(0, 0)
  }, [opened])

  return (
    <>
      {!ready && <Cover onOpen={() => { music.play(); setOpened(true) }} onDone={() => setReady(true)} />}

      <div id="site" data-step={stepId} data-section={section} style={{ visibility: opened ? 'visible' : 'hidden' }}>
        <Background layout={layout} />
        <Lanterns layout={layout} show={opened} />

        <SafeZone layout={layout}>
          <Bismillah show={on('bismillah')} stepId={stepId} />
          <InvitationPhrase show={on('invitation')} />
          <Couples show={on('couple1', 'couple2', 'together')} stepId={stepId} />
          <DateReveal show={on('date')} stepId={stepId} revealed={revealed} onReveal={() => setRevealed(true)} />
          <Venue show={on('venue')} />
          <RsvpGuestbook show={on('rsvp', 'guestbook')} stepId={stepId} />
          <DownloadCard show={on('card')} />
          <Closing stepId={stepId} ready={ready} />
        </SafeZone>

        <ProgressTrack sections={SECTIONS} step={step} totalSteps={STEPS.length} onSelect={goTo} />
        <MusicToggle layout={layout} music={music} visible={ready} />
        <AutoScrollToggle playing={autoPlaying} onToggle={() => setAutoPlaying((p) => !p)} visible={ready} />

        {/* invisible scroll track that drives the steps */}
        <div id="stage" style={{ '--steps': STEPS.length }} />
      </div>
    </>
  )
}
