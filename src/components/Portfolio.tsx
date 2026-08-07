import { useEffect, useState } from 'react'
import { motion, type Variants } from 'framer-motion'
import { ExternalLink, BookOpen, Github } from 'lucide-react'
import { supabase, type PortfolioProject } from '../lib/supabase'

const defaultProjects: PortfolioProject[] = [
  {
    id: 'd1',
    title: 'Luxe Commerce',
    description: 'A premium e-commerce platform with immersive product showcases, smooth checkout flows, and real-time inventory management.',
    tags: ['Next.js', 'TypeScript', 'Stripe', 'Tailwind'],
    icon: '🛍️',
    image_url: null,
    live_url: null,
    case_study_url: null,
    github_url: null,
    has_case_study: true,
    has_github: false,
    sort_order: 1,
  },
  {
    id: 'd2',
    title: 'Analytics Dashboard',
    description: 'Real-time data visualization dashboard with interactive charts, custom reporting, and role-based access control.',
    tags: ['React', 'D3.js', 'Node.js', 'PostgreSQL'],
    icon: '📊',
    image_url: null,
    live_url: null,
    case_study_url: null,
    github_url: null,
    has_case_study: true,
    has_github: false,
    sort_order: 2,
  },
  {
    id: 'd3',
    title: 'Property Finder',
    description: 'Modern real estate platform with advanced search filters, interactive maps, and virtual tour integrations.',
    tags: ['Next.js', 'Mapbox', 'Prisma', 'Vercel'],
    icon: '🏠',
    image_url: null,
    live_url: null,
    case_study_url: null,
    github_url: null,
    has_case_study: true,
    has_github: false,
    sort_order: 3,
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
  const [projects, setProjects] = useState<PortfolioProject[]>(defaultProjects)

  useEffect(() => {
    supabase
      .from('portfolio_projects')
      .select('*')
      .order('sort_order', { ascending: true })
      .then(({ data }) => {
        if (data && data.length > 0) setProjects(data as PortfolioProject[])
      })
  }, [])

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
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mt-12"
      >
        {projects.map((project) => (
          <motion.div
            key={project.id}
            variants={cardVariants}
            className="glass-card overflow-hidden group flex flex-col"
          >
            <div className="w-full h-[200px] sm:h-[220px] bg-surface2 relative overflow-hidden flex items-center justify-center flex-shrink-0">
              {project.image_url ? (
                <img src={project.image_url} alt={project.title} className="w-full h-full object-cover" />
              ) : (
                <>
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-accent-secondary/5" />
                  <span className="text-5xl opacity-30 z-[1]">{project.icon}</span>
                </>
              )}
            </div>
            <div className="p-6 sm:p-7 flex flex-col flex-1">
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
              <div className="flex gap-3 flex-wrap mt-auto">
                <a
                  href={project.live_url || '#contact'}
                  target={project.live_url ? '_blank' : undefined}
                  rel={project.live_url ? 'noopener noreferrer' : undefined}
                  className="px-5 py-2.5 rounded-[10px] text-[13px] font-semibold text-[#04120D] bg-gradient-to-r from-accent to-accent-secondary hover:shadow-[0_4px_20px_rgba(16,185,129,0.25)] hover:-translate-y-0.5 transition-all flex items-center gap-1.5"
                >
                  <ExternalLink size={14} />
                  Live Preview
                </a>
                {project.has_case_study && (
                  <a
                    href={project.case_study_url || '#contact'}
                    className="px-5 py-2.5 rounded-[10px] text-[13px] font-semibold text-text-secondary border border-white/[0.08] hover:border-accent/30 hover:text-text-primary transition-all"
                  >
                    Case Study
                  </a>
                )}
                {project.has_github && (
                  <a
                    href={project.github_url || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-[10px] text-[13px] font-semibold text-text-secondary border border-white/[0.08] hover:border-accent/30 hover:text-text-primary transition-all flex items-center gap-1.5"
                  >
                    <Github size={14} />
                    GitHub
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
