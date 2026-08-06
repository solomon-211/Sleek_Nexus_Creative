/**
 * GlitchText — wraps text in a glitch effect on hover.
 * Uses CSS custom properties and ::before/::after pseudo-elements
 * painted via a data attribute so no JS runs during the animation.
 */
export default function GlitchText({ children, className = '', tag: Tag = 'span' }) {
  return (
    <Tag
      className={`glitch-text ${className}`}
      data-text={typeof children === 'string' ? children : undefined}
    >
      {children}
    </Tag>
  )
}
