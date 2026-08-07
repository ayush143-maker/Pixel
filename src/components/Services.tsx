import { motion, type Variants } from 'framer-motion'
import {
  LayoutGrid,
  PenTool,
  Monitor,
  Palette,
  Smartphone,
  Sparkles,
  Zap,
  Wrench,
} from 'lucide-react'

const services = [
  {
    icon: LayoutGrid,
    title: 'Custom Website Development',
    description: 'Bespoke websites built from scratch with modern frameworks. Scalable architecture, clean code, and blazing-fast performance.',
  },
  {
    icon: PenTool,
    title: 'Landing Page Design',
    description: 'High-converting landing pages that tell your story and drive action. Optimized for speed, SEO, and user engagement.',
  },
  {
    icon: Monitor,
    title: 'Portfolio Websites',
    description: 'Showcase your work with a stunning portfolio that leaves a lasting impression. Designed to make you stand out.',
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    description: 'Intuitive interfaces that users love. From wireframes to high-fidelity prototypes, every interaction is thoughtfully crafted.',
  },
  {
    icon: Smartphone,
    title: 'Responsive Development',
    description: 'Flawless experiences across all devices. Mobile-first approach ensuring your site looks premium on every screen size.',
  },
  {
    icon: Sparkles,
    title: 'Motion & Interactive Animations',
    description: 'Smooth, purposeful animations that elevate the user experience. Framer Motion and GSAP powered interactions.',
  },
  {
    icon: Zap,
    title: 'Website Optimization',
    description: 'Performance audits and optimizations. Faster load times, better Core Web Vitals, and improved search rankings.',
  },
  {
    icon: Wrench,
    title: 'Bug Fixes & Maintenance',
    description: 'Reliable ongoing support. Quick bug fixes, security updates, and continuous improvements to keep your site running smoothly.',
  },
]

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
}

export default function Services() {
  return (
    <section id="services" className="section">
      <div className="reveal">
        <div className="section-label">
          <LayoutGrid size={16} />
          Services
        </div>
        <h2 className="section-title">What I Do Best</h2>
        <p className="section-subtitle">
          Every project is built with precision, performance, and pixel-perfect attention to detail.
        </p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-12"
      >
        {services.map((service) => (
          <motion.div
            key={service.title}
            variants={cardVariants}
            className="glass-card p-8 flex flex-col gap-4 min-h-[280px] group"
          >
            <div className="w-[52px] h-[52px] rounded-[14px] bg-gradient-to-br from-accent/20 to-accent-secondary/10 flex items-center justify-center text-accent">
              <service.icon size={24} />
            </div>
            <h3 className="font-heading text-xl font-semibold text-text-primary">
              {service.title}
            </h3>
            <p className="text-sm text-text-secondary leading-relaxed flex-1">
              {service.description}
            </p>
            <a
              href="#contact"
              className="text-sm font-semibold text-accent inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-all"
            >
              Get Started →
            </a>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
