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
const Team = lazy(() => import('./pages/about/Team'))
const MissionVision = lazy(() => import('./pages/about/MissionVision'))

// Services dropdown
const WebDev = lazy(() => import('./pages/services/WebDev'))
const MobileApps = lazy(() => import('./pages/services/MobileApps'))
const UIUX = lazy(() => import('./pages/services/UIUX'))
const Elearning = lazy(() => import('./pages/services/Elearning'))
const Branding = lazy(() => import('./pages/services/Branding'))
const Consulting = lazy(() => import('./pages/services/Consulting'))

// Projects dropdown
const Portfolio = lazy(() => import('./pages/projects/Portfolio'))
const CaseStudies = lazy(() => import('./pages/projects/CaseStudies'))
const ClientSuccess = lazy(() => import('./pages/projects/ClientSuccess'))

// Resources dropdown
const Leadership = lazy(() => import('./pages/resources/Leadership'))
const CareerGrowth = lazy(() => import('./pages/resources/CareerGrowth'))
const Scholarships = lazy(() => import('./pages/resources/Scholarships'))

// Contact dropdown
const Quote = lazy(() => import('./pages/contact/Quote'))
const BookConsultation = lazy(() => import('./pages/contact/BookConsultation'))

// Join Us dropdown
const Careers = lazy(() => import('./pages/join/Careers'))
const Internships = lazy(() => import('./pages/join/Internships'))
const JoinCommunity = lazy(() => import('./pages/join/JoinCommunity'))
const Alumni = lazy(() => import('./pages/join/Alumni'))

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
                  <Route path="/about/team" element={<Team />} />
                  <Route path="/about/mission-vision" element={<MissionVision />} />

                  {/* Services */}
                  <Route path="/services/web-dev" element={<WebDev />} />
                  <Route path="/services/mobile-apps" element={<MobileApps />} />
                  <Route path="/services/ui-ux" element={<UIUX />} />
                  <Route path="/services/elearning" element={<Elearning />} />
                  <Route path="/services/branding" element={<Branding />} />
                  <Route path="/services/consulting" element={<Consulting />} />

                  {/* Projects */}
                  <Route path="/projects/portfolio" element={<Portfolio />} />
                  <Route path="/projects/case-studies" element={<CaseStudies />} />
                  <Route path="/projects/client-success" element={<ClientSuccess />} />

                  {/* Resources */}
                  <Route path="/resources" element={<Navigate to="/resources/leadership" replace />} />
                  <Route path="/resources/leadership" element={<Leadership />} />
                  <Route path="/resources/career-growth" element={<CareerGrowth />} />
                  <Route path="/resources/scholarships" element={<Scholarships />} />
                  {/* Legacy redirects */}
                  <Route path="/blog" element={<Navigate to="/resources/leadership" replace />} />
                  <Route path="/guides" element={<Navigate to="/resources/career-growth" replace />} />
                  <Route path="/faqs" element={<Navigate to="/contact" replace />} />
                  <Route path="/downloads" element={<Navigate to="/resources/career-growth" replace />} />

                  {/* Contact */}
                  <Route path="/quote" element={<Quote />} />
                  <Route path="/book-consultation" element={<BookConsultation />} />

                  {/* Join Us */}
                  <Route path="/join" element={<Navigate to="/careers" replace />} />
                  <Route path="/careers" element={<Careers />} />
                  <Route path="/join/careers" element={<Navigate to="/careers" replace />} />
                  <Route path="/internships" element={<Internships />} />
                  <Route path="/join/internships" element={<Navigate to="/internships" replace />} />
                  <Route path="/join-community" element={<JoinCommunity />} />
                  <Route path="/volunteer" element={<Navigate to="/join-community" replace />} />
                  <Route path="/trainer" element={<Navigate to="/join-community" replace />} />
                  <Route path="/mentor" element={<Navigate to="/join-community" replace />} />
                  <Route path="/community" element={<Navigate to="/join-community" replace />} />
                  <Route path="/open-positions" element={<Navigate to="/careers" replace />} />
                  <Route path="/alumni" element={<Alumni />} />

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
