/**
 * MagneticButton — previously pulled toward the cursor (and, with `liquid`,
 * wobbled). Buttons now stay put; the hover lift comes from .btn-* styles.
 * Kept as a thin wrapper so existing markup doesn't change.
 */
// eslint-disable-next-line no-unused-vars
export default function MagneticButton({ children, className = '', strength, liquid }) {
  return <div className={`inline-block ${className}`}>{children}</div>
}
