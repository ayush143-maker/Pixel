import { motion, type Variants } from 'framer-motion'
import { ExternalLink, BookOpen, Github } from 'lucide-react'

const projects = [
  {
    title: 'Luxe Commerce',
    description: 'A premium e-commerce platform with immersive product showcases, smooth checkout flows, and real-time inventory management.',
    tags: ['Next.js', 'TypeScript', 'Stripe', 'Tailwind'],
    icon: '🛍️',
    hasCaseStudy: true,
    hasGithub: false,
  },
  {
    title: 'Analytics Dashboard',
    description: 'Real-time data visualization dashboard with interactive charts, custom reporting, and role-based access control.',
    tags: ['React', 'D3.js', 'Node.js', 'PostgreSQL'],
    icon: '📊',
    hasCaseStudy: true,
    hasGithub: false,
  },
  {
    title: 'Property Finder',
    description: 'Modern real estate platform with advanced search filters, interactive maps, and virtual tour integrations.',
    tags: ['Next.js', 'Mapbox', 'Prisma', 'Vercel'],
    icon: '🏠',
    hasCaseStudy: true,
    hasGithub: false,
  },
  {
    title: 'SoundWave App',
    description: 'Music streaming interface with waveform visualizations, playlist management, and seamless audio playback.',
    tags: ['React', 'Web Audio API', 'Canvas', 'Firebase'],
    icon: '🎵',
    hasCaseStudy: false,
    hasGithub: true,
  },
  {
    title: 'Editorial CMS',
    description: 'Headless content management system for digital publications with markdown editing and SEO automation.',
    tags: ['Next.js', 'Sanity', 'MDX', 'Vercel'],
    icon: '✍️',
    hasCaseStudy: true,
    hasGithub: false,
  },
  {
    title: 'Design System',
    description: 'Comprehensive component library with documentation, theming, and accessibility-first design patterns.',
    tags: ['React', 'Storybook', 'TypeScript', 'Tailwind'],
    icon: '🎨',
    hasCaseStudy: false,
    hasGithub: true,
  },
]

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
}

export default function Portfolio() {
  return (
    <section id="portfolio" className="section">
      <div className="reveal">
        <div className="section-label">
          <BookOpen size={16} />
          Portfolio
        </div>
        <h2 className="section-title">Selected Work</h2>
        <p className="section-subtitle">
          A curated collection of projects that showcase craft, creativity, and technical excellence.
        </p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12"
      >
        {projects.map((project) => (
          <motion.div
            key={project.title}
            variants={cardVariants}
            className="glass-card overflow-hidden group"
          >
            <div className="w-full h-[220px] bg-gradient-to-br from-[#1a1a2e] to-[#16213e] relative overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-accent-secondary/5" />
              <span className="text-5xl opacity-30 z-[1]">{project.icon}</span>
            </div>
            <div className="p-7">
              <h3 className="font-heading text-xl font-semibold text-text-primary mb-2">
                {project.title}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed mb-4">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 rounded-lg bg-accent/10 border border-accent/20 text-xs font-medium text-accent"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex gap-3 flex-wrap">
                <button className="px-5 py-2.5 rounded-[10px] text-[13px] font-semibold text-white bg-gradient-to-r from-accent to-accent-secondary hover:shadow-[0_4px_20px_rgba(139,92,246,0.25)] hover:-translate-y-0.5 transition-all flex items-center gap-1.5">
                  <ExternalLink size={14} />
                  Live Preview
                </button>
                {project.hasCaseStudy && (
                  <button className="px-5 py-2.5 rounded-[10px] text-[13px] font-semibold text-text-secondary border border-white/[0.08] hover:border-accent/30 hover:text-text-primary transition-all">
                    Case Study
                  </button>
                )}
                {project.hasGithub && (
                  <button className="px-5 py-2.5 rounded-[10px] text-[13px] font-semibold text-text-secondary border border-white/[0.08] hover:border-accent/30 hover:text-text-primary transition-all flex items-center gap-1.5">
                    <Github size={14} />
                    GitHub
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
