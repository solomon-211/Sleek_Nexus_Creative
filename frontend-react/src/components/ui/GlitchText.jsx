/**
 * GlitchText — previously a hover "glitch" effect; now renders its text
 * plainly. Kept so existing imports don't break.
 */
export default function GlitchText({ children, className = '', tag: Tag = 'span' }) {
  return <Tag className={className}>{children}</Tag>
}
