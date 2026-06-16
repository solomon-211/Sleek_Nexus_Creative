import Navbar from './Navbar'
import Footer from './Footer'
import ScrollToTop from '../ui/ScrollToTop'
import CookieBanner from '../ui/CookieBanner'

export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1 pt-[72px]">{children}</main>
      <Footer />
      <CookieBanner />
    </div>
  )
}
