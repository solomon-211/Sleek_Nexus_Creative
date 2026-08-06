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
export const pageVariants = {
  initial: { opacity: 0, scale: 0.94, y: 48, rotate: -1.5, filter: 'blur(8px)' },
  animate: {
    opacity: 1, scale: 1, y: 0, rotate: 0, filter: 'blur(0px)',
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0, scale: 1.06, y: -32, rotate: 1.5, filter: 'blur(6px)',
    transition: { duration: 0.45, ease: [0.7, 0, 0.84, 0] },
  },
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

export const rotateIn = {
  hidden: { opacity: 0, rotate: -6, scale: 0.95 },
  show:   { opacity: 1, rotate: 0, scale: 1, transition: { duration: 0.75, ease: 'easeOut' } },
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
export const stackReveal = (i = 0) => ({
  hidden: { opacity: 0, y: 44, scale: 0.9, rotate: i % 2 === 0 ? -7 : 7 },
  show: {
    opacity: 1, y: 0, scale: 1, rotate: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
})

// Continuous idle float — apply via the `animate` prop (not variants) on an element
// that has already entered, for a "premium, alive" resting state.
export const floatAnimation = {
  y: [0, -10, 0],
  transition: { duration: 4.5, repeat: Infinity, ease: 'easeInOut' },
}
