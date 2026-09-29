const pad = (n) => String(n).padStart(2, '0')
const fmt = (d) => `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}00`

// Builds an .ics file and downloads it ("Add to Calendar").
export function downloadIcs({ dateISO, title, location, hours = 3 }) {
  const start = new Date(dateISO)
  const end = new Date(start.getTime() + hours * 36e5)
  const ics = [
    'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Nikah Invitation//EN', 'BEGIN:VEVENT',
    `UID:${fmt(start)}@nikah-invitation`, `DTSTAMP:${fmt(new Date())}`,
    `SUMMARY:${title}`, `LOCATION:${location}`, `DTSTART:${fmt(start)}`, `DTEND:${fmt(end)}`,
    'END:VEVENT', 'END:VCALENDAR',
  ].join('\r\n')
  const a = document.createElement('a')
  a.href = URL.createObjectURL(new Blob([ics], { type: 'text/calendar' }))
  a.download = 'nikah-invitation.ics'
  a.click()
}
