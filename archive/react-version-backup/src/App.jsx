import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';

const Home     = lazy(() => import('./pages/Home'));
const About    = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const Contact  = lazy(() => import('./pages/Contact'));
const Projects = lazy(() => import('./pages/OtherPages').then(m => ({ default: m.Projects })));
const Courses  = lazy(() => import('./pages/OtherPages').then(m => ({ default: m.Courses })));
const Careers  = lazy(() => import('./pages/OtherPages').then(m => ({ default: m.Careers })));
const Partners = lazy(() => import('./pages/OtherPages').then(m => ({ default: m.Partners })));
const Donors   = lazy(() => import('./pages/OtherPages').then(m => ({ default: m.Donors })));
const Privacy  = lazy(() => import('./pages/OtherPages').then(m => ({ default: m.Privacy })));
const Terms    = lazy(() => import('./pages/OtherPages').then(m => ({ default: m.Terms })));
const NotFound = lazy(() => import('./pages/OtherPages').then(m => ({ default: m.NotFound })));

function Spinner() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <i className="fas fa-spinner fa-spin text-3xl text-[#c41e3a]" />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route path="/"         element={<Home />} />
            <Route path="/about"    element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/courses"  element={<Courses />} />
            <Route path="/careers"  element={<Careers />} />
            <Route path="/contact"  element={<Contact />} />
            <Route path="/partners" element={<Partners />} />
            <Route path="/donors"   element={<Donors />} />
            <Route path="/privacy"  element={<Privacy />} />
            <Route path="/terms"    element={<Terms />} />
            <Route path="*"         element={<NotFound />} />
          </Routes>
        </Suspense>
      </Layout>
    </BrowserRouter>
  );
}
