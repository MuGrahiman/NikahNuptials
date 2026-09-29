// One entry per "scroll step". `section` groups steps into the dots of the progress line.
export const STEPS = [
  { id: 'bismillah',             section: 'bismillah' },
  { id: 'bismillah-translation', section: 'bismillah' },
  { id: 'invitation',            section: 'invitation' },
  { id: 'couple1-groom',         section: 'couple1' },
  { id: 'couple1-both',          section: 'couple1' },
  { id: 'couple2-groom',         section: 'couple2' },
  { id: 'couple2-both',          section: 'couple2' },
  { id: 'couples-together',      section: 'together' },
  { id: 'date-reveal',           section: 'date' },
  { id: 'countdown',             section: 'date' },
  { id: 'venue',                 section: 'venue' },
  { id: 'rsvp',                  section: 'rsvp' },
  { id: 'guestbook',             section: 'guestbook' },
  { id: 'download',              section: 'card' },
  { id: 'closing-names',         section: 'closing' },
  { id: 'closing-message',       section: 'closing' },
]

// One dot per section on the progress line (label = tooltip text).
const LABELS = [
  ['bismillah', 'Bismillah'], ['invitation', 'Invitation'], ['couple1', 'First couple'],
  ['couple2', 'Second couple'], ['together', 'Together'], ['date', 'Date'], ['venue', 'Venue'],
  ['rsvp', 'RSVP'], ['guestbook', 'Guest book'], ['card', 'Invitation card'], ['closing', 'Closing'],
]
export const SECTIONS = LABELS.map(([id, label]) => ({
  id, label, firstStep: STEPS.findIndex((s) => s.section === id),
}))

// Scrolling is locked at this step until the guest taps "Reveal the Date".
export const GATE_STEP = STEPS.findIndex((s) => s.id === 'date-reveal')
