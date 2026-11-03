export const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
}

export const fadeUpSm = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

export const fadeLeft = {
  hidden: { opacity: 0, x: -40 },
  show:   { opacity: 1, x: 0, transition: { duration: 0.75, ease: 'easeOut' } },
}

export const fadeRight = {
  hidden: { opacity: 0, x: 40 },
  show:   { opacity: 1, x: 0, transition: { duration: 0.75, ease: 'easeOut' } },
}

export const staggerContainer = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.15, delayChildren: 0.15 } },
}

export const staggerItem = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
}

// Cinematic page transition — slide, zoom, fade, and a slight tilt combine into
// one choreographed move so route changes feel like an app opening a screen
// rather than a page reloading. Pair with transformPerspective on the wrapper.
// Route change: a quick fade. No scale, rotation, or blur — the content is
// the point, not the transition.
export const pageVariants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
  exit:    { opacity: 0, transition: { duration: 0.15, ease: 'easeIn' } },
}

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  show:   { opacity: 1, scale: 1, transition: { duration: 0.65, ease: 'easeOut' } },
}

// Bigger, slower slide-up with a decelerating "expo-out" curve — used for feature
// moments (project cards, milestone cards) that should feel more cinematic than the
// standard fadeUp/staggerItem used everywhere else.
export const revealUp = {
  hidden: { opacity: 0, y: 56, scale: 0.97 },
  show:   { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
}

export const fadeDown = {
  hidden: { opacity: 0, y: -30 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
}

export const zoomOut = {
  hidden: { opacity: 0, scale: 1.15 },
  show:   { opacity: 1, scale: 1, transition: { duration: 0.75, ease: 'easeOut' } },
}

// Kept under its old name so existing imports still work; it no longer rotates.
export const rotateIn = {
  hidden: { opacity: 0, y: 16 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export const bounceIn = {
  hidden: { opacity: 0, scale: 0.8 },
  show:   { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 200, damping: 14 } },
}

// Flip variants rotate around X/Y — pair with style={{ transformPerspective: 800 }}
// on the motion element for a convincing 3D flip rather than a flat squish.
export const flipUp = {
  hidden: { opacity: 0, rotateX: -50, y: 24 },
  show:   { opacity: 1, rotateX: 0, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
}

export const blurIn = {
  hidden: { opacity: 0, filter: 'blur(10px)', y: 12 },
  show:   { opacity: 1, filter: 'blur(0px)', y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
}

// Card Stacking reveal — cards start slightly rotated and offset as if pulled from a
// stacked deck (alternating tilt direction by index), then settle flat into the grid.
// Kept for existing imports; a plain fade-up now (no tilt, no scale).
export const stackReveal = () => ({
  hidden: { opacity: 0, y: 16 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
})

// Continuous idle float — apply via the `animate` prop (not variants) on an element
// that has already entered, for a "premium, alive" resting state.
// Kept for existing imports; cards no longer bob up and down.
export const floatAnimation = {}
