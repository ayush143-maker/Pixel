import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Process', href: '#process' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'About', href: '#about' },
  { label: 'FAQ', href: '#faq' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
        className={`fixed top-0 left-0 right-0 z-50 px-5 sm:px-6 py-4 transition-all duration-300 ${
          scrolled
            ? 'bg-background/85 backdrop-blur-xl border-b border-white/[0.08]'
            : ''
        }`}
      >
        <div className="max-w-[1200px] mx-auto flex items-center justify-between">
          <a href="#" className="flex items-center gap-2.5 font-heading text-xl sm:text-2xl font-bold text-text-primary no-underline min-w-0">
            <img src="/assets/logo-icon.png" alt="Pixel Studio" width="32" height="32" className="object-contain flex-shrink-0" />
            <span className="truncate">Pixel Studio</span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative text-sm font-medium text-text-secondary hover:text-text-primary transition-colors duration-300 group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent rounded-full transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
            <a
              href="#contact"
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-[#04120D] bg-gradient-to-r from-accent to-accent-secondary hover:shadow-[0_4px_20px_rgba(16,185,129,0.25)] hover:-translate-y-0.5 transition-all duration-300"
            >
              Let&apos;s Talk
            </a>
          </div>

          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden bg-none border-none text-text-primary cursor-pointer p-2 flex-shrink-0"
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[999] bg-background/98 backdrop-blur-3xl flex flex-col items-center justify-center gap-8 px-6"
          >
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-6 right-6 bg-none border-none text-text-primary cursor-pointer"
              aria-label="Close menu"
            >
              <X size={28} />
            </button>
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 + 0.1 }}
                className="font-heading text-3xl font-semibold text-text-primary hover:text-accent transition-colors no-underline"
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-4 px-8 py-4 rounded-2xl text-lg font-semibold text-[#04120D] bg-gradient-to-r from-accent to-accent-secondary no-underline"
            >
              Let&apos;s Talk
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
