# Nikah Invitation Website

A single-page, scroll-driven wedding invitation (Kerala Muslim wedding) with a card-opening cover,
sequenced reveals, live countdown, RSVP replies, a guest book, hanging lanterns and background music.
Front-end only for now (no backend) — all wording is dummy content in one file.

## Tech

| Tool | Used for |
|------|----------|
| **React 18** | Every section is its own component |
| **Vite 5** | Dev server + build |
| **GSAP 3** (+ ScrollTrigger, ScrollToPlugin) | All animation, scroll steps and snapping |
| **Plain CSS** | Design tokens, container-query text sizing (no UI library) |
| Google Fonts | Cinzel (names/numbers), Cormorant Garamond (body), Great Vibes (script) |

## Run it

```bash
npm install
npm run dev            # http://localhost:5173
npm run build          # production build -> /dist
npm run build:single   # ONE self-contained html (images + music inlined) -> /dist-single/index.html
npm run preview        # serve the production build locally
```

## Folder structure

```
src/
├─ main.jsx                     entry
├─ App.jsx                      wires everything: cover -> stage -> sections
├─ config/
│  ├─ steps.js                  the scroll steps + the progress-line dots (order of the whole story)
│  └─ layout.js                 arch safe-zone, phone background mode, gramophone hotspot
├─ data/
│  └─ content.js                ALL text: names, parents, date, venue, RSVP replies, guest book...
├─ assets/
│  ├─ images/                   background.png, invitation-cover.jpg, bismillah.png, lantern.webp
│  ├─ music/                    background.mp3
│  └─ documents/                invitation-card.pdf (the "Download Digital Invitation" file)
├─ hooks/
│  ├─ useLayout.js              where the background + arch sit on this screen
│  ├─ useStepScroll.js          native scroll -> step number, snap-to-section, date gate
│  ├─ useMusic.js               play / pause the audio
│  └─ useCountdown.js           days/hours/min/sec + before / wedding-day / after states
├─ utils/calendar.js            "Add to Calendar" (.ics)
├─ components/
│  ├─ Cover/                    tap-to-open card (splits like doors)
│  ├─ Stage/                    Background, SafeZone (the clipped arch area)
│  ├─ Decor/Lanterns.jsx        two swaying, glowing lanterns
│  ├─ Progress/ProgressTrack    gold line + dots + glowing knob
│  ├─ Music/MusicToggle.jsx     gramophone (landscape) / speaker button (phones)
│  ├─ common/                   Panel (fade/slide layer), Collapse (animated height)
│  └─ sections/                 Bismillah, InvitationPhrase, Couples, DateReveal,
│                               Venue, RsvpGuestbook, DownloadCard, Closing
└─ styles/  global.css (tokens) · layout.css (stage, lanterns, progress, music) · sections.css
```

## How the story works

`config/steps.js` lists 16 **steps** (e.g. `bismillah` -> `bismillah-translation` -> `invitation` -> ...).
Native scrolling moves through them (nothing is hijacked); when the guest stops scrolling the page
glides to the nearest step. Each section component receives `stepId` and animates itself.
Steps are grouped into 11 **sections** = the 11 dots on the progress line (the knob always sits on the current dot).
To add/reorder a section: add its step(s) in `steps.js`, create a component in `components/sections/`, render it in `App.jsx`.

The **date gate**: scrolling stops at `date-reveal` until the guest taps "Reveal the Date".

## Customise

- **Text / names / date / venue / guest book** -> `src/data/content.js`
- **Time of the Nikah** -> `EVENT.dateISO` and `EVENT.time` (10:00 AM is a placeholder)
- **Colours & fonts** -> `:root` in `src/styles/global.css` (dark green `#24401d` was sampled from the arch)
- **Background / cover / lanterns** -> replace the files in `src/assets/images/` (same names).
  If you use a different background, adjust `arch` and `gramophone` fractions in `src/config/layout.js`.
- **Music** -> replace `src/assets/music/background.mp3`. The bundled loop is a small original placeholder;
  use a track you have the rights to. It starts when the guest taps the cover (browsers block sound before a tap).
- **Downloadable card** -> replace `src/assets/documents/invitation-card.pdf`
- **Phones** -> in `layout.js`, `portraitBackground: 'zoom'` keeps text readable (sides of the picture are cropped);
  `'contain'` always shows the whole picture but text becomes very small on phones.

## Responsiveness

All text is sized from the arch itself using CSS container units (`cqw`/`cqh`), so it shrinks and grows with the
arch on every screen and stays inside it. Tested at 1280x800, 768x1024, 390x844, 360x640 and 844x390.

## Deploy

`npm run build`, then upload `/dist` to any static host (Netlify, Vercel, GitHub Pages, cPanel).

## Phase 2 (backend) — where it plugs in

RSVP answers (`RsvpGuestbook.jsx`) and guest book entries (`GUESTBOOK` in `content.js`) are dummy data. Replace them
with `fetch` calls to your Express/Mongo API; the components don't need restructuring.

## Recent changes

- **Fixed:** background "jumping" while scrolling on phones. Cause: showing/hiding the mobile
  browser's address bar mid-scroll fires a `resize` event and changes `window.innerHeight` —
  the old code recalculated the background's position on every such event. Now it only
  recalculates on a genuine width change (rotation / real resize).
- **Added:** optional auto-scroll (`components/AutoScroll/`, `hooks/useAutoAdvance.js`) — off by
  default, respects the date gate, and any real scroll/touch from the guest turns it off instantly.
- **Cover:** enlarged (covers most of a phone screen), the same photo now fills the backdrop
  hugely blurred (the "blurred album art" look) instead of a plain gradient, and the open
  animation makes the card's own printed medallion seal glow and release before the doors swing
  open — rather than drawing a second fake cord on top of the real printed one.
