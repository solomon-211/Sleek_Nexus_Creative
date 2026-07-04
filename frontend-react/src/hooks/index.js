/**
 * hooks/index.js — barrel export for all custom hooks
 *
 * Import from here instead of individual files:
 *   import { useDebounce, useMediaQuery } from '../hooks'
 */

export { useDebounce }                          from './useDebounce'
export { useIntersectionObserver, useOnceIntersecting } from './useIntersectionObserver'
export { useLocalStorage }                      from './useLocalStorage'
export { useMediaQuery, useIsMobile, useIsTablet, useIsDesktop, usePrefersReducedMotion } from './useMediaQuery'
export { useScrollProgress, useScrollDirection } from './useScrollProgress'
