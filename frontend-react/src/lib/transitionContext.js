import { createContext, useContext } from 'react'

export const TransitionContext = createContext(() => {})

// Call from any click handler to play a circular reveal expanding from that
// point before/during the route change — used by RevealLink.
export function usePageTransition() {
  return useContext(TransitionContext)
}
