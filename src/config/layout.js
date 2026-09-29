// Two separate background photos, each with its OWN geometry, because a portrait photo
// composed for phones fits a phone screen far better than stretching/cropping the wide
// landscape one. Below `portraitBreakpoint` (width/height) the "portrait" set is used.
export const LAYOUT = {
  portraitBreakpoint: 0.85, // width/height below this = phone-shaped screen

  landscape: {
    src: 'background.png',
    ratio: 1456 / 720,
    // Usable (blank) area of the arch, as fractions of the image.
    arch: { left: 0.14, right: 0.86, top: 0.13, bottom: 0.92 },
    // Fractions of the image where the gramophone sits (the music button hotspot).
    gramophone: { left: 0.886, top: 0.535, width: 0.098, height: 0.3 },
    // Lantern anchors, as fractions of the ARCH's own safe-zone size (not the photo) —
    // leftX/rightX = how far outside the arch's edge; y = how far above the arch's top.
    // Anchoring to the arch itself (always fully visible) keeps the lanterns on-screen
    // regardless of how much of the surrounding photo a given screen shape crops away.
    lanterns: { leftX: 0.03, rightX: 0.03, y: 0.1, heightL: 0.38, heightR: 0.48 },
  },

  portrait: {
    src: 'background-mobile.png',
    ratio: 768 / 1376,
    arch: { left: 0.165, right: 0.815, top: 0.095, bottom: 0.905 },
    gramophone: { left: 0.695, top: 0.565, width: 0.26, height: 0.32 },
    lanterns: { leftX: 0.05, rightX: 0.05, y: 0.05, heightL: 0.16, heightR: 0.21 },
  },
}
