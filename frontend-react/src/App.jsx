import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { HelmetProvider } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { pageVariants } from './lib/animations'
import Layout from './components/layout/Layout'
import ErrorBoundary from './components/ui/ErrorBoundary'
import PageLoader from './components/ui/PageLoader'

// Home loads eagerly — it's the landing page and should paint instantly.
import Home from './pages/Home'

// Innovation Hub — flagship page, loads eagerly alongside Home
import InnovationHub from './pages/InnovationHub'

// Every other page is split into its own chunk and fetched on demand.
const About      = lazy(() => import('./pages/About'))
const Services   = lazy(() => import('./pages/Services'))
const Projects   = lazy(() => import('./pages/Projects'))
const Contact    = lazy(() => import('./pages/Contact'))
const Privacy    = lazy(() => import('./pages/Privacy'))
const Terms      = lazy(() => import('./pages/Terms'))
const GetStarted = lazy(() => import('./pages/GetStarted'))
const NotFound   = lazy(() => import('./pages/index.jsx').then(m => ({ default: m.NotFound })))

// Services sub-pages
const WebDev     = lazy(() => import('./pages/services/WebDev'))
const MobileApps = lazy(() => import('./pages/services/MobileApps'))
const UIUX       = lazy(() => import('./pages/services/UIUX'))
const Branding   = lazy(() => import('./pages/services/Branding'))
const Consulting = lazy(() => import('./pages/services/Consulting'))

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 1000 * 60 * 5, retry: 1 } },
})

function PageWrapper({ children }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
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
                  <Route path="/projects" element={<PageWrapper><Projects /></PageWrapper>} />
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

                  {/* Redirects for removed pages */}
                  <Route path="/about/our-story"        element={<Navigate to="/about" replace />} />
                  <Route path="/about/mission-vision"   element={<Navigate to="/about" replace />} />
                  <Route path="/about/team"             element={<Navigate to="/about" replace />} />
                  <Route path="/projects/portfolio"     element={<Navigate to="/projects" replace />} />
                  <Route path="/projects/case-studies"  element={<Navigate to="/projects" replace />} />
                  <Route path="/projects/client-success" element={<Navigate to="/projects" replace />} />
                  <Route path="/quote"                  element={<Navigate to="/get-started" replace />} />
                  <Route path="/book-consultation"      element={<Navigate to="/get-started" replace />} />

                  <Route path="*" element={<PageWrapper><NotFound /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <ErrorBoundary>
            <Layout>
              <Suspense fallback={<PageLoader />}>
                <AnimatedRoutes />
              </Suspense>
            </Layout>
          </ErrorBoundary>
        </BrowserRouter>
      </QueryClientProvider>
    </HelmetProvider>
  )
}
