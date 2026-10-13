import manifest from '../../lib/image-manifest.json'

/**
 * Img — drop-in <img> replacement for files in public/images.
 *
 * Serves the WebP variants built by scripts/generate-responsive-images.mjs
 * through a srcset, so each device downloads a file sized for its screen,
 * and sets width/height so the browser reserves the space before the image
 * arrives (no layout jump). The original JPEG/PNG stays as the fallback.
 *
 * `sizes` describes how wide the image renders. The default suits the
 * site's usual two-column layout: half the viewport on desktop, full width
 * on mobile. Pass a fixed value for small images, e.g. sizes="46px".
 *
 * A src that isn't in the manifest renders as a plain <img>.
 */
export default function Img({ src, alt, sizes = '(min-width: 1024px) 50vw, 100vw', ...rest }) {
  const meta = manifest[src]
  if (!meta) return <img src={src} alt={alt} {...rest} />

  const stem = src.replace(/\.[a-z]+$/i, '')
  const srcSet = [
    ...meta.widths.map((w) => `${stem}-${w}.webp ${w}w`),
    `${stem}.webp ${meta.w}w`,
  ].join(', ')

  return (
    // `contents` keeps <picture> out of layout, so the <img> sizes and
    // positions exactly as it did before it was wrapped.
    <picture className="contents">
      <source type="image/webp" srcSet={srcSet} sizes={sizes} />
      <img src={src} alt={alt} width={meta.w} height={meta.h} {...rest} />
    </picture>
  )
}
