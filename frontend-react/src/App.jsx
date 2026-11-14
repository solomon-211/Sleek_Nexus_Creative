import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import { HelmetProvider } from 'react-helmet-async'
import { pageVariants } from './lib/animations'
import Layout from './components/layout/Layout'
import ErrorBoundary from './components/ui/ErrorBoundary'
import PageLoader from './components/ui/PageLoader'

// Home loads eagerly — it's the landing page and should paint instantly.
import Home from './pages/Home'

// Every other page is split into its own chunk and fetched on demand.
const InnovationHub = lazy(() => import('./pages/InnovationHub'))
const About      = lazy(() => import('./pages/About'))
const Services   = lazy(() => import('./pages/Services'))
const Work       = lazy(() => import('./pages/Work'))
const Contact    = lazy(() => import('./pages/Contact'))
const Privacy    = lazy(() => import('./pages/Privacy'))
const Terms      = lazy(() => import('./pages/Terms'))
const GetStarted = lazy(() => import('./pages/GetStarted'))
const NotFound   = lazy(() => import('./pages/NotFound'))

// Services sub-pages
const WebDev     = lazy(() => import('./pages/services/WebDev'))
const MobileApps = lazy(() => import('./pages/services/MobileApps'))
const UIUX       = lazy(() => import('./pages/services/UIUX'))
const Branding   = lazy(() => import('./pages/services/Branding'))
const Consulting = lazy(() => import('./pages/services/Consulting'))

// Product pages
const SNCInn     = lazy(() => import('./pages/products/SNCInn'))

// Team-only leads dashboard: its own chunk (with the Supabase library), and
// rendered without the public site's navbar, footer and contact bar.
const Admin      = lazy(() => import('./pages/Admin'))

function SiteOrAdmin() {
  const { pathname } = useLocation()
  if (pathname === '/admin' || pathname.startsWith('/admin/')) {
    return <Suspense fallback={<PageLoader />}><Admin /></Suspense>
  }
  return (
    <Layout>
      <Suspense fallback={<PageLoader />}>
        <AnimatedRoutes />
      </Suspense>
    </Layout>
  )
}

function PageWrapper({ children }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{ transformPerspective: 1200, transformOrigin: 'center top' }}
      className="overflow-x-hidden"
    >
      {children}
    </motion.div>
  )
}

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
                  {/* Main */}
                  <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
                  <Route path="/innovation-hub" element={<PageWrapper><InnovationHub /></PageWrapper>} />
                  <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
                  <Route path="/services" element={<PageWrapper><Services /></PageWrapper>} />
                  <Route path="/work" element={<PageWrapper><Work /></PageWrapper>} />
                  <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
                  <Route path="/get-started" element={<PageWrapper><GetStarted /></PageWrapper>} />
                  <Route path="/privacy" element={<PageWrapper><Privacy /></PageWrapper>} />
                  <Route path="/terms" element={<PageWrapper><Terms /></PageWrapper>} />

                  {/* Services sub-pages */}
                  <Route path="/services/web-dev" element={<PageWrapper><WebDev /></PageWrapper>} />
                  <Route path="/services/mobile-apps" element={<PageWrapper><MobileApps /></PageWrapper>} />
                  <Route path="/services/ui-ux" element={<PageWrapper><UIUX /></PageWrapper>} />
                  <Route path="/services/branding" element={<PageWrapper><Branding /></PageWrapper>} />
                  <Route path="/services/consulting" element={<PageWrapper><Consulting /></PageWrapper>} />

                  {/* Product pages */}
                  <Route path="/products/sncinn" element={<PageWrapper><SNCInn /></PageWrapper>} />

                  {/* Redirects for removed pages */}
                  <Route path="/about/our-story"        element={<Navigate to="/about" replace />} />
                  <Route path="/about/mission-vision"   element={<Navigate to="/about" replace />} />
                  <Route path="/about/team"             element={<Navigate to="/about" replace />} />
                  <Route path="/projects"              element={<Navigate to="/work" replace />} />
                  <Route path="/projects/*"             element={<Navigate to="/work" replace />} />
                  <Route path="/quote"                  element={<Navigate to="/get-started" replace />} />
                  <Route path="/book-consultation"      element={<Navigate to="/get-started" replace />} />
                  <Route path="/blog"                   element={<Navigate to="/" replace />} />
                  <Route path="/blog/*"                 element={<Navigate to="/" replace />} />

                  <Route path="*" element={<PageWrapper><NotFound /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <HelmetProvider>
      {/* reducedMotion="user": visitors whose OS is set to reduce motion get
          fades instead of slides, tilts, and floats — site-wide, without each
          component having to check for itself. */}
      <MotionConfig reducedMotion="user">
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <ErrorBoundary>
            <SiteOrAdmin />
          </ErrorBoundary>
        </BrowserRouter>
      </MotionConfig>
    </HelmetProvider>
  )
}
