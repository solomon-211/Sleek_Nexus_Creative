import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { HelmetProvider } from 'react-helmet-async'
import Layout from './components/layout/Layout'
import ErrorBoundary from './components/ui/ErrorBoundary'
import PageLoader from './components/ui/PageLoader'

// Home loads eagerly — it's the landing page and should paint instantly.
import Home from './pages/Home'

// Innovation Hub — flagship page, loads eagerly alongside Home
import InnovationHub from './pages/InnovationHub'

// Every other page is split into its own chunk and fetched on demand.
// Main pages
const About = lazy(() => import('./pages/About'))
const Services = lazy(() => import('./pages/Services'))
const Projects = lazy(() => import('./pages/Projects'))
const Contact = lazy(() => import('./pages/Contact'))
const Privacy = lazy(() => import('./pages/Privacy'))
const Terms = lazy(() => import('./pages/Terms'))
const GetStarted = lazy(() => import('./pages/GetStarted'))
const NotFound = lazy(() => import('./pages/index.jsx').then(m => ({ default: m.NotFound })))

// About dropdown
const OurStory = lazy(() => import('./pages/about/OurStory'))
// const Team = lazy(() => import('./pages/about/Team'))
const MissionVision = lazy(() => import('./pages/about/MissionVision'))

// Services dropdown
const WebDev = lazy(() => import('./pages/services/WebDev'))
const MobileApps = lazy(() => import('./pages/services/MobileApps'))
const UIUX = lazy(() => import('./pages/services/UIUX'))
const Branding = lazy(() => import('./pages/services/Branding'))
const Consulting = lazy(() => import('./pages/services/Consulting'))

// Projects dropdown
const Portfolio = lazy(() => import('./pages/projects/Portfolio'))
const CaseStudies = lazy(() => import('./pages/projects/CaseStudies'))
const ClientSuccess = lazy(() => import('./pages/projects/ClientSuccess'))

// Contact dropdown
const Quote = lazy(() => import('./pages/contact/Quote'))
const BookConsultation = lazy(() => import('./pages/contact/BookConsultation'))

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 1000 * 60 * 5, retry: 1 } },
})

export default function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <ErrorBoundary>
            <Layout>
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  {/* Main */}
                  <Route path="/" element={<Home />} />
                  <Route path="/innovation-hub" element={<InnovationHub />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/get-started" element={<GetStarted />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/terms" element={<Terms />} />

                  {/* About */}
                  <Route path="/about/our-story" element={<OurStory />} />
                  {/* <Route path="/about/team" element={<Team />} /> */}
                  <Route path="/about/team" element={<Navigate to="/about" replace />} />
                  <Route path="/about/mission-vision" element={<MissionVision />} />

                  {/* Services */}
                  <Route path="/services/web-dev" element={<WebDev />} />
                  <Route path="/services/mobile-apps" element={<MobileApps />} />
                  <Route path="/services/ui-ux" element={<UIUX />} />
                  <Route path="/services/branding" element={<Branding />} />
                  <Route path="/services/consulting" element={<Consulting />} />

                  {/* Projects */}
                  <Route path="/projects/portfolio" element={<Portfolio />} />
                  <Route path="/projects/case-studies" element={<CaseStudies />} />
                  <Route path="/projects/client-success" element={<ClientSuccess />} />

                  {/* Contact */}
                  <Route path="/quote" element={<Quote />} />
                  <Route path="/book-consultation" element={<BookConsultation />} />

                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </Layout>
          </ErrorBoundary>
        </BrowserRouter>
      </QueryClientProvider>
    </HelmetProvider>
  )
}
