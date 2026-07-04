/**
 * PageLoader — shown while a lazy-loaded route chunk is being fetched.
 * Keeps the layout stable by matching the page's min-height.
 */
export default function PageLoader() {
  return (
    <div
      className="min-h-[60vh] flex flex-col items-center justify-center gap-5"
      role="status"
      aria-live="polite"
      aria-label="Loading page"
    >
      {/* SNC logo spinner */}
      <div className="relative">
        <div className="w-14 h-14 rounded-full border-[3px] border-primary/15 border-t-primary animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-[0.6rem] font-black font-heading">
            <span className="text-primary">S</span>
            <span className="text-accent">N</span>
            <span className="text-primary">C</span>
          </span>
        </div>
      </div>
      <p className="text-muted text-sm font-medium tracking-wide">Loading…</p>
    </div>
  )
}
