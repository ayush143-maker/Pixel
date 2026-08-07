import { motion } from 'framer-motion'
import { User, Eye, Code2, Gauge, Sparkles, BookOpen, Puzzle, Rocket, Gem } from 'lucide-react'

const values = [
  { icon: Eye, title: 'Attention to Detail', description: 'Every pixel, every transition, every line of code is intentional.' },
  { icon: Code2, title: 'Clean & Scalable Code', description: 'Modular architecture that grows with your business.' },
  { icon: Gauge, title: 'Performance Focused', description: 'Lightning-fast load times and optimized Core Web Vitals.' },
  { icon: Sparkles, title: 'Motion-Driven Interfaces', description: 'Animations that feel natural and enhance the experience.' },
  { icon: BookOpen, title: 'Continuous Learning', description: 'Always exploring new tools, patterns, and best practices.' },
  { icon: Puzzle, title: 'Problem Solving', description: 'Turning complex requirements into elegant solutions.' },
  { icon: Rocket, title: 'Fast Iterations', description: 'Rapid prototyping and quick turnaround on feedback.' },
  { icon: Gem, title: 'Quality Over Quantity', description: 'Fewer projects, deeper craft, exceptional outcomes.' },
]

export default function About() {
  return (
    <section id="about" className="section">
      <div className="reveal">
        <div className="section-label">
          <User size={16} />
          About
        </div>
        <h2 className="section-title">Behind the Code</h2>
        <p className="section-subtitle">
          Passion, precision, and a relentless pursuit of digital craftsmanship.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mt-12">
        {/* Image Card */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
          className="glass-card p-2 rounded-3xl overflow-hidden"
        >
          <div className="w-full aspect-square rounded-[18px] bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#1a1a2e] flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/15 to-accent-secondary/8" />
            <div className="z-[1] text-center">
              <div className="text-7xl mb-4 opacity-20">👤</div>
              <p className="text-text-secondary text-sm">Your photo here</p>
            </div>
          </div>
        </motion.div>

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
        >
          <h3 className="font-heading text-[1.75rem] font-semibold text-text-primary mb-5">
            Building experiences that matter
          </h3>
          <p className="text-[15px] text-text-secondary leading-relaxed mb-4">
            I am a freelance web developer with a deep passion for creating premium digital
            experiences. Every project I take on is an opportunity to push boundaries — blending
            beautiful design with rock-solid engineering.
          </p>
          <p className="text-[15px] text-text-secondary leading-relaxed mb-4">
            My approach is simple: understand the problem deeply, design with intention, and build
            with precision. I believe that great websites are not just visually stunning — they are
            fast, accessible, and built to scale.
          </p>
          <p className="text-[15px] text-text-secondary leading-relaxed mb-8">
            I stay hands-on with every line of code, every animation curve, and every design
            decision. No shortcuts. No templates. Just craft.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {values.map((value) => (
              <div key={value.title} className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-[10px] bg-accent/10 flex items-center justify-center text-accent flex-shrink-0">
                  <value.icon size={16} />
                </div>
                <div>
                  <h4 className="font-heading text-sm font-semibold text-text-primary mb-0.5">
                    {value.title}
                  </h4>
                  <p className="text-[13px] text-text-secondary leading-snug">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
