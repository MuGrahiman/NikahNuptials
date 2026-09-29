import bgLandscape from '../../assets/images/background.png'
import bgPortrait from '../../assets/images/background-mobile.png'

const SRC = { landscape: bgLandscape, portrait: bgPortrait }

// The arch picture. Sized/positioned by useLayout, which also decides which photo to use.
// A dedicated compositing layer (`will-change`) stops it visibly lagging behind the
// content while scrolling fast on mobile Safari/Chrome.
export default function Background({ layout }) {
  const { box, mode } = layout
  return (
    <div className="bg-wrap">
      <img
        className="bg-img"
        src={SRC[mode]}
        alt=""
        style={{ left: box.left, top: box.top, width: box.width, height: box.height }}
      />
    </div>
  )
}
