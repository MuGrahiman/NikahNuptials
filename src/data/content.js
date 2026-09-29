// ALL wording lives here. Edit this file to change the invitation text.
// (Phase 2: replace these constants with API calls to your Express/Mongo backend.)

export const BISMILLAH = {
  translation: 'In the name of Allah, the Most Gracious, the Most Merciful',
}

export const INVITATION = {
  lead: 'Together with their families',
  host: 'Mr. Muhammed Kutty & Family',
  house: '(Chekideppuram House)',
  body: 'solicit your esteemed presence and blessings on the joyous occasion of the wedding ceremony of their sons',
}

export const COUPLES = [
  {
    groom: { name: 'MUJEEB RAHIMAN', rel: 'Son of Mr. Muhammed Kutty & Mrs. Ameera' },
    bride: { name: 'FATHIMA SELVIYA', rel: 'Daughter of Mr. Saithalavi' },
  },
  {
    groom: { name: 'MIRSHAD C P', rel: 'Son of Mr. Muhammed Kutty & Mrs. Ameera' },
    bride: { name: 'MISRIYA FIDHA', rel: 'Daughter of Mr. Abdul Hameed' },
  },
]

export const EVENT = {
  dateISO: '2026-10-18T10:00:00',            // local time of the Nikah (time is a placeholder)
  day: 'SUNDAY',
  date: '18 OCTOBER 2026',
  time: '10:00 AM',
  title: 'Nikah Ceremony',
  venueName: 'Poayikkal Convention Centre',
  venueAddress: 'Perunkulam, Kottakkal Road',
  mapUrl: 'https://maps.google.com/?q=Poayikkal+Convention+Centre+Perunkulam+Kottakkal+Road',
}

export const DATE_TEXT = {
  before: 'For Our Nikah',
  day: 'Today is the day 🤍',
  after: 'Thank you for being part of our beginning.',
}

export const RSVP = {
  question: 'Will You Celebrate With Us?',
  yes: { label: "YES, I'LL BE THERE 🤍", reply: "We're so happy to have you! Your place is waiting — we look forward to celebrating this beautiful day with you and your family." },
  no:  { label: "I'LL BE WITH YOU IN SPIRIT 🤍", reply: "We'll miss you. Even though you can't be with us in person, your duas and good wishes will still be part of our day." },
}

export const GUESTBOOK = {
  title: 'Guest Book',
  subtitle: 'Thank you for your love and support — every message is cherished.',
  entries: [
    { name: 'Ashraf Uncle', message: 'May Allah bless this union with love and barakah.' },
    { name: 'Nadira Aunty', message: 'So happy for both couples! Duas always.' },
    { name: 'Sameer', message: "Can't wait to celebrate with you all!" },
    { name: 'Fousiya', message: 'A beautiful beginning — congratulations!' },
    { name: 'Rasheed', message: 'Wishing you a lifetime of happiness, Ameen.' },
  ],
}

export const DOWNLOAD = {
  monogram: 'M&F',
  prompt: 'Want to keep the invitation with you?',
  button: 'Download Digital Invitation',
  fileName: 'Nikah-Invitation.pdf',
}

export const CLOSING = {
  names: ['Mujeeb & Fathima', 'Mirshad & Misriya'],
  message: 'We are delighted to celebrate this special day with you. Your presence means the world to us.',
  compliments: 'With best compliments from friends & relatives',
}
