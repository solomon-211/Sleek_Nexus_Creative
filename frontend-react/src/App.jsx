import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { HelmetProvider } from 'react-helmet-async'
import Layout from './components/layout/Layout'
import ErrorBoundary from './components/ui/ErrorBoundary'

// Main pages
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Projects from './pages/Projects'
import Courses from './pages/Courses'
import Contact from './pages/Contact'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import GetStarted from './pages/GetStarted'
import { NotFound } from './pages/index.jsx'

// About dropdown
import OurStory from './pages/about/OurStory'
import Team from './pages/about/Team'
import MissionVision from './pages/about/MissionVision'

// Services dropdown
import WebDev from './pages/services/WebDev'
import MobileApps from './pages/services/MobileApps'
import UIUX from './pages/services/UIUX'
import Elearning from './pages/services/Elearning'
import Branding from './pages/services/Branding'
import Consulting from './pages/services/Consulting'

// Projects dropdown
import Portfolio from './pages/projects/Portfolio'
import CaseStudies from './pages/projects/CaseStudies'
import ClientSuccess from './pages/projects/ClientSuccess'

// Courses dropdown
import Browse from './pages/courses/Browse'
import FreeResources from './pages/courses/FreeResources'
import Certifications from './pages/courses/Certifications'
import StudentProjects from './pages/courses/StudentProjects'

// Resources dropdown
import Blog from './pages/resources/Blog'
import Guides from './pages/resources/Guides'
import FAQs from './pages/resources/FAQs'
import Downloads from './pages/resources/Downloads'

// Contact dropdown
import Quote from './pages/contact/Quote'
import BookConsultation from './pages/contact/BookConsultation'

// Join Us dropdown
import Careers from './pages/join/Careers'
import Internships from './pages/join/Internships'
import Volunteer from './pages/join/Volunteer'
import Trainer from './pages/join/Trainer'
import Mentor from './pages/join/Mentor'
import Community from './pages/join/Community'
import OpenPositions from './pages/join/OpenPositions'

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 1000 * 60 * 5, retry: 1 } },
})

export default function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ErrorBoundary>
            <Layout>
              <Routes>
                {/* Main */}
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/get-started" element={<GetStarted />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />

              {/* About */}
              <Route path="/about/our-story" element={<OurStory />} />
              <Route path="/about/team" element={<Team />} />
              <Route path="/about/mission-vision" element={<MissionVision />} />
              <Route path="/careers" element={<Careers />} />

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

              {/* Courses */}
              <Route path="/courses/browse" element={<Browse />} />
              <Route path="/courses/free-resources" element={<FreeResources />} />
              <Route path="/courses/certifications" element={<Certifications />} />
              <Route path="/courses/student-projects" element={<StudentProjects />} />

              {/* Resources */}
              <Route path="/blog" element={<Blog />} />
              <Route path="/guides" element={<Guides />} />
              <Route path="/faqs" element={<FAQs />} />
              <Route path="/downloads" element={<Downloads />} />

              {/* Contact */}
              <Route path="/quote" element={<Quote />} />
              <Route path="/book-consultation" element={<BookConsultation />} />

              {/* Join Us */}
              <Route path="/join/careers" element={<Careers />} />
              <Route path="/internships" element={<Internships />} />
              <Route path="/join/internships" element={<Internships />} />
              <Route path="/volunteer" element={<Volunteer />} />
              <Route path="/trainer" element={<Trainer />} />
              <Route path="/mentor" element={<Mentor />} />
              <Route path="/community" element={<Community />} />
              <Route path="/open-positions" element={<OpenPositions />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
          </ErrorBoundary>
        </BrowserRouter>
      </QueryClientProvider>
    </HelmetProvider>
  )
}
