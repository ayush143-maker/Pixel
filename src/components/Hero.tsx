import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
}

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
  },
}

const stats = [
  { number: '50+', label: 'Projects Delivered' },
  { number: '100%', label: 'Client Satisfaction' },
  { number: '3+', label: 'Years Experience' },
]

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 pt-32 pb-20"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[500px] h-[500px] rounded-full bg-accent/40 blur-[100px] -top-[10%] -right-[10%] animate-float" />
        <div className="absolute w-[400px] h-[400px] rounded-full bg-accent-secondary/40 blur-[100px] -bottom-[10%] -left-[10%] animate-float" style={{ animationDirection: 'reverse', animationDuration: '12s' }} />
        <div className="absolute w-[300px] h-[300px] rounded-full bg-accent/30 blur-[100px] top-[40%] left-[30%] animate-float" style={{ animationDelay: '2s', animationDuration: '8s' }} />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
            maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 70%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 70%)',
          }}
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center max-w-[900px]"
      >
        <motion.div variants={itemVariants}>
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/[0.08] bg-surface/60 backdrop-blur-xl text-sm font-medium text-accent mb-8">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse-glow" />
            Available for new projects
          </div>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="font-heading text-[clamp(2.5rem,7vw,5rem)] font-bold leading-[1.05] mb-6"
        >
          Crafting <span className="text-gradient">Premium</span>
          <br />
          Digital Experiences
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-[clamp(1rem,2vw,1.25rem)] text-text-secondary leading-relaxed max-w-[600px] mx-auto mb-10"
        >
          I design and develop high-performance websites that look expensive, feel intuitive,
          and convert visitors into clients. Clean code, motion-driven interfaces, and obsessive
          attention to detail.
        </motion.p>

        <motion.div variants={itemVariants} className="flex gap-4 justify-center flex-wrap">
          <a href="#portfolio" className="btn-primary">
            <span className="flex items-center gap-2">
              <Sparkles size={18} />
              View My Work
            </span>
          </a>
          <a href="#contact" className="btn-secondary">
            Start a Project
          </a>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="flex gap-12 justify-center mt-16 flex-wrap"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-heading text-[2.5rem] font-bold text-text-primary">
                {stat.number}
              </div>
              <div className="text-sm text-text-secondary mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
