import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import TechMarquee from './components/TechMarquee'
import Services from './components/Services'
import Portfolio from './components/Portfolio'
import Process from './components/Process'
import Pricing from './components/Pricing'
import About from './components/About'
import FAQ from './components/FAQ'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  useEffect(() => {
    // Scroll reveal observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-background text-text-primary font-body">
      <Navbar />
      <Hero />
      <TechMarquee />
      <Services />
      <Portfolio />
      <Process />
      <Pricing />
      <About />
      <FAQ />
      <Contact />
      <Footer />
    </div>
  )
}

export default App
