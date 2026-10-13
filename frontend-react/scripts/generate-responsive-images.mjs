// Generates WebP variants of everything in public/images, plus a manifest of
// each original's pixel dimensions, for src/components/ui/Img.jsx.
//
// For public/images/photo.jpg (1600px wide) this writes, alongside it:
//   photo.webp        full width
//   photo-1280.webp   } only the widths narrower than the original
//   photo-640.webp    }
//   photo-128.webp    }
// and records { w, h, widths } in src/lib/image-manifest.json. <Img> turns
// that into a <picture> with a WebP srcset (so a phone downloads the 640px
// file, not the 1600px one) and width/height attributes (so the page doesn't
// jump as images load). Originals are untouched and remain the fallback, and
// remain what Open Graph tags point at.
//
// Usage:  npm run images
// Re-run after adding or replacing a file in public/images, and commit the
// generated .webp files and manifest. Up-to-date variants are skipped.

import { readdirSync, statSync, writeFileSync, existsSync } from 'node:fs'
import { join, extname, basename, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const __dirname = dirname(fileURLToPath(import.meta.url))
const IMAGES_DIR = join(__dirname, '..', 'public', 'images')
const MANIFEST_PATH = join(__dirname, '..', 'src', 'lib', 'image-manifest.json')

const WIDTHS = [128, 640, 1280]
const WEBP_QUALITY = 78
const SOURCE_EXTS = new Set(['.jpg', '.jpeg', '.png'])

function isStale(outPath, srcMtime) {
  return !existsSync(outPath) || statSync(outPath).mtimeMs < srcMtime
}

async function run() {
  const files = readdirSync(IMAGES_DIR).filter((f) => SOURCE_EXTS.has(extname(f).toLowerCase())).sort()
  const manifest = {}
  let written = 0
  let bytesBefore = 0
  let bytesAfter = 0

  for (const file of files) {
    const srcPath = join(IMAGES_DIR, file)
    const stem = basename(file, extname(file))
    const srcStat = statSync(srcPath)
    // rotate() bakes in EXIF orientation, so reported dimensions match what
    // the browser actually displays.
    const { width, height } = await sharp(srcPath).rotate().toBuffer({ resolveWithObject: true }).then((r) => r.info)

    const widths = WIDTHS.filter((w) => w < width)
    const targets = [
      { out: join(IMAGES_DIR, `${stem}.webp`), resize: null },
      ...widths.map((w) => ({ out: join(IMAGES_DIR, `${stem}-${w}.webp`), resize: w })),
    ]

    for (const { out, resize } of targets) {
      if (!isStale(out, srcStat.mtimeMs)) continue
      let pipeline = sharp(srcPath).rotate()
      if (resize) pipeline = pipeline.resize({ width: resize })
      await pipeline.webp({ quality: WEBP_QUALITY }).toFile(out)
      written++
    }

    bytesBefore += srcStat.size
    bytesAfter += statSync(join(IMAGES_DIR, `${stem}.webp`)).size
    manifest[`/images/${file}`] = { w: width, h: height, widths }
  }

  writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + '\n')

  const kb = (n) => `${Math.round(n / 1024)}KB`
  console.log(`[responsive-images] ${files.length} originals, ${written} variant(s) written.`)
  console.log(`[responsive-images] Full-size total: ${kb(bytesBefore)} original -> ${kb(bytesAfter)} WebP`)
}

run()
