/**
 * MarqueeTicker — an infinite, seamless horizontal marquee strip.
 * Renders its children twice so the loop point is invisible.
 * Pauses on hover (WCAG 2.2.2). Respects prefers-reduced-motion.
 */
export default function MarqueeTicker({ items = [], speed = 22, className = '', itemClassName = '' }) {
  return (
    <div
      className={`overflow-hidden select-none ${className}`}
      aria-hidden="true"
    >
      <div
        className="flex w-max animate-marquee motion-reduce:[animation-play-state:paused] [@media(hover:hover)]:hover:[animation-play-state:paused]"
        style={{ '--marquee-speed': `${speed}s` }}
      >
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className={`flex items-center gap-3 whitespace-nowrap ${itemClassName}`}
          >
            {item}
            <span className="text-primary opacity-60 mx-2">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}
