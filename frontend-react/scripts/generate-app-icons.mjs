// Generates the favicon / home-screen icon set from public/images/snc-logo.png.
//
// The PWA manifest (vite.config.js) and the <link rel="icon"> tags in
// index.html point at these files. Run via `npm run images` whenever the
// logo changes, and commit the output.
//
//   favicon-32.png           browser tab
//   apple-touch-icon.png     iOS home screen (180px, opaque — iOS ignores alpha)
//   icon-192.png, icon-512.png   Android / PWA install
//   icon-maskable-512.png    Android adaptive icon: logo inset on brand navy,
//                            so the launcher can crop it to any shape safely

import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const __dirname = dirname(fileURLToPath(import.meta.url))
const PUBLIC_DIR = join(__dirname, '..', 'public')
const LOGO = join(PUBLIC_DIR, 'images', 'snc-logo.png')

const NAVY = '#233D4D'
const TRANSPARENT = { r: 0, g: 0, b: 0, alpha: 0 }

// Logo scaled to `inner` px, centred on a `size` px square of `background`.
async function padded(size, inner, background) {
  const logo = await sharp(LOGO).resize(inner, inner, { fit: 'contain', background: TRANSPARENT }).toBuffer()
  return sharp({ create: { width: size, height: size, channels: 4, background } })
    .composite([{ input: logo, gravity: 'centre' }])
    .png()
}

async function run() {
  const plain = (size) => sharp(LOGO).resize(size, size, { fit: 'contain', background: TRANSPARENT }).png()

  await plain(32).toFile(join(PUBLIC_DIR, 'favicon-32.png'))
  await plain(192).toFile(join(PUBLIC_DIR, 'icon-192.png'))
  await plain(512).toFile(join(PUBLIC_DIR, 'icon-512.png'))
  await (await padded(180, 148, NAVY)).toFile(join(PUBLIC_DIR, 'apple-touch-icon.png'))
  // Maskable icons must keep content inside the central 80% "safe zone".
  await (await padded(512, 360, NAVY)).toFile(join(PUBLIC_DIR, 'icon-maskable-512.png'))

  console.log('[app-icons] Wrote favicon-32, icon-192, icon-512, icon-maskable-512, apple-touch-icon to public/')
}

run()
