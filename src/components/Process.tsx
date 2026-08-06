import { motion } from 'framer-motion'
import { TrendingUp } from 'lucide-react'

const steps = [
  {
    number: '01',
    title: 'Discussion',
    description: 'We start with a deep dive into your goals, audience, and vision. Understanding the "why" behind every pixel.',
  },
  {
    number: '02',
    title: 'Reference Sharing',
    description: 'Share inspiration, competitors, and brand assets via Telegram. I study every detail to align with your aesthetic.',
  },
  {
    number: '03',
    title: 'Planning',
    description: 'Wireframes, sitemaps, and technical architecture. Every decision is documented before a single line of code is written.',
  },
  {
    number: '04',
    title: 'Development',
    description: 'Clean, modular code with daily progress updates. I build with performance, accessibility, and scalability in mind.',
  },
  {
    number: '05',
    title: 'Review',
    description: 'Iterative feedback rounds via Telegram. Quick revisions, open communication, and zero surprises at launch.',
  },
  {
    number: '06',
    title: 'Delivery',
    description: 'Handoff with documentation, deployment support, and a 30-day warranty. Your site goes live, stress-free.',
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
}

export default function Process() {
  return (
    <section id="process" className="section">
      <div className="reveal">
        <div className="section-label">
          <TrendingUp size={16} />
          Process
        </div>
        <h2 className="section-title">How We Work Together</h2>
        <p className="section-subtitle">
          A streamlined workflow designed for clarity, speed, and exceptional results.
        </p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 relative"
      >
        {steps.map((step) => (
          <motion.div
            key={step.number}
            variants={cardVariants}
            className="glass-card p-8 flex flex-col items-center text-center gap-5"
          >
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent to-accent-secondary flex items-center justify-center font-heading text-xl font-bold text-white shadow-[0_4px_20px_rgba(139,92,246,0.25)]">
              {step.number}
            </div>
            <div>
              <h3 className="font-heading text-lg font-semibold text-text-primary mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                {step.description}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
