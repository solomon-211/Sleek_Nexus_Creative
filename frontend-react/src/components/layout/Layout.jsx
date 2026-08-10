import Navbar from './Navbar'
import Footer from './Footer'
import ScrollToTop from '../ui/ScrollToTop'
import CookieBanner from '../ui/CookieBanner'
import CommandPalette from '../ui/CommandPalette'
import { TransitionProvider } from '../ui/TransitionOverlay'
import { motion } from 'framer-motion'
import { pageVariants } from '../../lib/animations'

export default function Layout({ children }) {
  return (
    <TransitionProvider>
      <div className="flex flex-col min-h-screen">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[10000] focus:bg-primary focus:text-white focus:font-semibold focus:px-4 focus:py-2.5 focus:rounded-lg focus:shadow-lg"
        >
          Skip to main content
        </a>
        <CommandPalette />
        <ScrollToTop />
        <Navbar />
        <motion.main
          id="main-content"
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
    </TransitionProvider>
  )
}
