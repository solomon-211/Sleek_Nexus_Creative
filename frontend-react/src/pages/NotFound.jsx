import { Link } from 'react-router-dom'
import SEO from '../components/ui/SEO'

export default function NotFound() {
  return (
    <>
      <SEO title="404 — Page Not Found" description="The page you're looking for doesn't exist or has been moved." canonical="/404" />
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center px-6">
          <div className="text-8xl font-heading font-black text-primary/20 mb-4">404</div>
          <h1 className="text-3xl md:text-4xl font-heading font-black uppercase text-dark mb-3">Page Not Found</h1>
          <p className="text-muted mb-8 max-w-sm mx-auto">The page you're looking for doesn't exist or has been moved.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/" className="btn-primary">Go Home</Link>
            <Link to="/contact" className="btn-secondary">Contact Us</Link>
          </div>
        </div>
      </div>
    </>
  )
}
