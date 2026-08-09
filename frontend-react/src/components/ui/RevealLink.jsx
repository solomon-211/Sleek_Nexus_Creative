import { Link } from 'react-router-dom'
import { usePageTransition } from '../../lib/transitionContext'

// A Link that plays a circular reveal expanding from the click point on its
// way to the destination — an approximation of a shared-element morph without
// the fragility of animating real DOM nodes across an unmount/mount boundary.
export default function RevealLink({ onClick, ...props }) {
  const trigger = usePageTransition()

  return (
    <Link
      {...props}
      onClick={(e) => {
        trigger(e.clientX, e.clientY)
        onClick?.(e)
      }}
    />
  )
}
