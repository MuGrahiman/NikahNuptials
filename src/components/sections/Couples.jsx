import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import Panel from '../common/Panel'
import Collapse from '../common/Collapse'
import { COUPLES } from '../../data/content'

// k = text scale of each couple, o = opacity, c2 = second couple shown, b1/b2 = bride shown
const MODES = {
  'couple1-groom':    { k1: 1,    k2: 1,    o1: 1,   c2: false, b1: false, b2: false },
  'couple1-both':     { k1: 1,    k2: 1,    o1: 1,   c2: false, b1: true,  b2: false },
  'couple2-groom':    { k1: 0.62, k2: 1,    o1: 0.8, c2: true,  b1: true,  b2: false },
  'couple2-both':     { k1: 0.62, k2: 1,    o1: 0.8, c2: true,  b1: true,  b2: true },
  'couples-together': { k1: 1.06, k2: 1.06, o1: 1,   c2: true,  b1: true,  b2: true },
}

const Person = ({ p }) => (<div className="person"><h3 className="name">{p.name}</h3><p className="rel">{p.rel}</p></div>)

export default function Couples({ show, stepId }) {
  const c1 = useRef(null), c2 = useRef(null)
  const m = MODES[stepId] || MODES['couple1-groom']
  useEffect(() => {
    gsap.to(c1.current, { '--k': m.k1, opacity: m.o1, duration: 0.7, ease: 'power2.out' })
    gsap.to(c2.current, { '--k': m.k2, duration: 0.7, ease: 'power2.out' })
  }, [m.k1, m.k2, m.o1])
  const [a, b] = COUPLES
  return (
    <Panel show={show}>
      <div className="couples">
        <div ref={c1} className="couple">
          <Person p={a.groom} />
          <Collapse open={m.b1}><div className="amp">&amp;</div><Person p={a.bride} /></Collapse>
        </div>
        <Collapse open={m.c2}>
          <div className="couple-divider"><span>✦</span></div>
          <div ref={c2} className="couple">
            <Person p={b.groom} />
            <Collapse open={m.b2}><div className="amp">&amp;</div><Person p={b.bride} /></Collapse>
          </div>
        </Collapse>
      </div>
    </Panel>
  )
}
