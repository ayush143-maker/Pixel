import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  User, Eye, Code2, Gauge, Sparkles, BookOpen, Puzzle, Rocket, Gem,
  type LucideIcon,
} from 'lucide-react'
import { supabase, type AboutValue, type AboutBioSettings } from '../lib/supabase'

const iconMap: Record<string, LucideIcon> = {
  Eye, Code2, Gauge, Sparkles, BookOpen, Puzzle, Rocket, Gem, User,
}

const defaultValues: AboutValue[] = [
  { id: 'd1', icon: 'Eye', title: 'Attention to Detail', description: 'Every pixel, every transition, every line of code is intentional.', sort_order: 1 },
  { id: 'd2', icon: 'Code2', title: 'Clean & Scalable Code', description: 'Modular architecture that grows with your business.', sort_order: 2 },
  { id: 'd3', icon: 'Gauge', title: 'Performance Focused', description: 'Lightning-fast load times and optimized Core Web Vitals.', sort_order: 3 },
  { id: 'd4', icon: 'Sparkles', title: 'Motion-Driven Interfaces', description: 'Animations that feel natural and enhance the experience.', sort_order: 4 },
  { id: 'd5', icon: 'BookOpen', title: 'Continuous Learning', description: 'Always exploring new tools, patterns, and best practices.', sort_order: 5 },
  { id: 'd6', icon: 'Puzzle', title: 'Problem Solving', description: 'Turning complex requirements into elegant solutions.', sort_order: 6 },
  { id: 'd7', icon: 'Rocket', title: 'Fast Iterations', description: 'Rapid prototyping and quick turnaround on feedback.', sort_order: 7 },
  { id: 'd8', icon: 'Gem', title: 'Quality Over Quantity', description: 'Fewer projects, deeper craft, exceptional outcomes.', sort_order: 8 },
]

const defaultBio: AboutBioSettings = {
  heading: 'Building experiences that matter',
  paragraphs: [
    'I am a freelance web developer with a deep passion for creating premium digital experiences. Every project I take on is an opportunity to push boundaries — blending beautiful design with rock-solid engineering.',
    'My approach is simple: understand the problem deeply, design with intention, and build with precision. I believe that great websites are not just visually stunning — they are fast, accessible, and built to scale.',
    'I stay hands-on with every line of code, every animation curve, and every design decision. No shortcuts. No templates. Just craft.',
  ],
  photo_url: '',
}

export default function About() {
  const [values, setValues] = useState<AboutValue[]>(defaultValues)
  const [bio, setBio] = useState<AboutBioSettings>(defaultBio)

  useEffect(() => {
    supabase
      .from('about_values')
      .select('*')
      .order('sort_order', { ascending: true })
      .then(({ data }) => {
        if (data && data.length > 0) setValues(data as AboutValue[])
      })

    supabase
      .from('site_settings')
      .select('value')
      .eq('key', 'about_bio')
      .maybeSingle()
      .then(({ data }) => {
        if (data?.value) setBio({ ...defaultBio, ...(data.value as Partial<AboutBioSettings>) })
      })
  }, [])

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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center mt-12">
        {/* Profile Photo — circular, Instagram-DP style */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
          className="flex justify-center md:justify-start"
        >
          <div className="relative w-[240px] h-[240px] sm:w-[300px] sm:h-[300px] md:w-[340px] md:h-[340px] flex-shrink-0">
            {/* Soft glow ring */}
            <div className="absolute -inset-3 rounded-full bg-gradient-to-br from-accent/25 to-accent-secondary/10 blur-xl" />
            <div className="relative w-full h-full rounded-full p-1.5 bg-gradient-to-br from-accent to-accent-secondary">
              <div className="w-full h-full rounded-full overflow-hidden bg-surface2 border-4 border-background flex items-center justify-center relative">
                {bio.photo_url ? (
                  <img src={bio.photo_url} alt="Portrait" className="w-full h-full object-cover" />
                ) : (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.1] to-accent-secondary/[0.05]" />
                    <div className="z-[1] text-7xl opacity-20">👤</div>
                  </>
                )}
              </div>
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
          <h3 className="font-heading text-[1.5rem] sm:text-[1.75rem] font-semibold text-text-primary mb-5">
            {bio.heading}
          </h3>
          {bio.paragraphs.map((p, i) => (
            <p key={i} className="text-[15px] text-text-secondary leading-relaxed mb-4">
              {p}
            </p>
          ))}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            {values.map((value) => {
              const Icon = iconMap[value.icon] ?? Sparkles
              return (
                <div key={value.id} className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-[10px] bg-accent/10 flex items-center justify-center text-accent flex-shrink-0">
                    <Icon size={16} />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-heading text-sm font-semibold text-text-primary mb-0.5">
                      {value.title}
                    </h4>
                    <p className="text-[13px] text-text-secondary leading-snug">
                      {value.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
