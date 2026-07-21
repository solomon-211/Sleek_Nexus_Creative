import Navbar from './Navbar'
import Footer from './Footer'
import ScrollToTop from '../ui/ScrollToTop'
import CookieBanner from '../ui/CookieBanner'
import { motion } from 'framer-motion'
import { pageVariants } from '../../lib/animations'

export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      <Navbar />
      <motion.main
        className="flex-1 pt-[72px]"
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {children}
      </motion.main>
      <Footer />
      <CookieBanner />
    </div>
  )
}
