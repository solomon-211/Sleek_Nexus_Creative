// Shown while a lazy-loaded route chunk is being fetched.
export default function PageLoader() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4" role="status" aria-live="polite">
      <span className="w-10 h-10 rounded-full border-[3px] border-primary/20 border-t-primary animate-spin" />
      <span className="text-muted text-sm font-medium">Loading…</span>
    </div>
  )
}
