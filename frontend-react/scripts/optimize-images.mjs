// One-off / repeatable image optimizer for public/images.
//
// Resizes anything wider than MAX_WIDTH (no upscaling) and re-encodes JPEG/PNG at a
// web-safe quality. Runs in place, same filenames — so no React code needs to change,
// since every <img> in this app references these files by their public/ path.
//
// Usage:  npm run optimize:images        (processes files > SIZE_THRESHOLD_BYTES)
//         npm run optimize:images -- --all   (ignore the size threshold, process everything)
//
// Originals are recoverable via git (this directory is tracked), so this is safe to
// re-run — but it IS a lossy re-encode, so don't run it repeatedly on the same files.

import { readdirSync, statSync, writeFileSync, renameSync } from 'node:fs'
import { join, extname, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const __dirname = dirname(fileURLToPath(import.meta.url))
const IMAGES_DIR = join(__dirname, '..', 'public', 'images')

const MAX_WIDTH = 1920
const SIZE_THRESHOLD_BYTES = 80 * 1024 // skip files already under ~80KB by default
const JPEG_QUALITY = 80
const PNG_QUALITY = 88

const processAll = process.argv.includes('--all')
const exts = new Set(['.jpg', '.jpeg', '.png'])

function walk(dir) {
  const out = []
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) out.push(...walk(full))
    else if (exts.has(extname(entry.name).toLowerCase())) out.push(full)
  }
  return out
}

function fmt(bytes) {
  return `${(bytes / 1024).toFixed(0)}KB`
}

async function optimize(path) {
  const before = statSync(path).size
  if (!processAll && before < SIZE_THRESHOLD_BYTES) return null

  const ext = extname(path).toLowerCase()
  let pipeline = sharp(path, { failOn: 'none' }).rotate() // rotate() auto-applies EXIF orientation
  const meta = await pipeline.metadata()

  if (meta.width && meta.width > MAX_WIDTH) {
    pipeline = pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true })
  }

  pipeline = ext === '.png'
    ? pipeline.png({ compressionLevel: 9, palette: true, quality: PNG_QUALITY })
    : pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true })

  const buffer = await pipeline.toBuffer()
  const after = buffer.length

  // Only overwrite if we actually made it smaller — never let a re-run inflate a file.
  if (after < before) {
    // Write to a temp file + rename (atomic replace) rather than writing straight over
    // the path sharp just read — writing in place can hit transient file-lock errors on
    // Windows, especially inside a OneDrive-synced folder.
    const tempPath = `${path}.tmp${process.pid}`
    writeFileSync(tempPath, buffer)
    renameSync(tempPath, path)
    return { path, before, after }
  }
  return { path, before, after: before, skipped: 'already optimal' }
}

async function run() {
  const files = walk(IMAGES_DIR).sort()
  const results = []
  for (const file of files) {
    try {
      const r = await optimize(file)
      if (r) results.push(r)
    } catch (err) {
      console.error(`  FAILED: ${file.split('public')[1]} — ${err.message}`)
    }
  }

  if (results.length === 0) {
    console.log('[optimize-images] Nothing to do — no files above the size threshold.')
    return
  }

  let totalBefore = 0
  let totalAfter = 0
  for (const r of results) {
    totalBefore += r.before
    totalAfter += r.after
    const savedPct = r.before > 0 ? (100 * (1 - r.after / r.before)).toFixed(0) : 0
    const label = r.skipped ? r.skipped : `-${savedPct}%`
    console.log(`  ${r.path.split('public')[1]}  ${fmt(r.before)} -> ${fmt(r.after)}  (${label})`)
  }
  console.log(`\n[optimize-images] ${results.length} files processed. Total: ${fmt(totalBefore)} -> ${fmt(totalAfter)} (saved ${fmt(totalBefore - totalAfter)}, ${(100 * (1 - totalAfter / totalBefore)).toFixed(0)}%)`)
}

run()
