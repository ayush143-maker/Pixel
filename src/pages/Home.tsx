import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import TechMarquee from '../components/TechMarquee'
import Services from '../components/Services'
import Portfolio from '../components/Portfolio'
import Process from '../components/Process'
import Pricing from '../components/Pricing'
import About from '../components/About'
import FAQ from '../components/FAQ'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TechMarquee />
        <Services />
        <Portfolio />
        <Process />
        <Pricing />
        <About />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
