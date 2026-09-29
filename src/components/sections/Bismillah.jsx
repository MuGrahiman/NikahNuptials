import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import Panel from '../common/Panel'
import { BISMILLAH } from '../../data/content'
import calligraphy from '../../assets/images/bismillah.png'

// Step 1: large calligraphy in the middle.  Step 2: it shrinks to the top, translation rises from below.
export default function Bismillah({ show, stepId }) {
  const img = useRef(null), text = useRef(null)
  const small = stepId !== 'bismillah'
  useEffect(() => {
    const H = img.current.parentNode.clientHeight
    gsap.to(img.current, { scale: small ? 0.55 : 1, y: small ? -H * 0.16 : 0, duration: 0.8, ease: 'power3.out' })
    gsap.to(text.current, { opacity: small ? 1 : 0, y: small ? 0 : 40, duration: 0.8, delay: small ? 0.35 : 0, ease: 'power3.out' })
  }, [small])
  return (
    <Panel show={show}>
      <img ref={img} className="bism-img" src={calligraphy} alt="Bismillah ir-Rahman ir-Rahim" />
      <p ref={text} className="bism-en">{BISMILLAH.translation}</p>
    </Panel>
  )
}
