import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HelpCircle, Plus } from 'lucide-react'

const faqs = [
  {
    question: 'What is your typical turnaround time?',
    answer: 'Landing pages are delivered within 5 business days. Multi-page sites typically take 10-14 days depending on complexity. Custom projects are scoped individually with a clear timeline before we begin.',
  },
  {
    question: 'How do we communicate during the project?',
    answer: 'Telegram is my primary communication channel. It allows for quick feedback, easy file sharing, and real-time updates. I respond within a few hours during business hours and provide daily progress updates.',
  },
  {
    question: 'Do you provide design files or just code?',
    answer: 'I deliver both. You get the fully functional, deployed website plus all source code. If needed, I can also provide Figma design files for an additional fee.',
  },
  {
    question: 'What technologies do you specialize in?',
    answer: 'I primarily work with React, Next.js, TypeScript, and Tailwind CSS. For animations, I use Framer Motion and GSAP. For backends, I am comfortable with Node.js, PostgreSQL, and various CMS platforms.',
  },
  {
    question: 'Do you offer ongoing maintenance?',
    answer: 'Yes. All multi-page sites include 30 days of free support. After that, I offer monthly maintenance retainers that cover bug fixes, security updates, content changes, and minor feature additions.',
  },
  {
    question: 'What is your payment structure?',
    answer: 'For projects under $1,000, full payment upfront. For larger projects, 50% upfront to begin, 50% upon delivery. I accept payments via bank transfer, PayPal, and cryptocurrency.',
  },
  {
    question: 'Can you work with existing designs?',
    answer: 'Absolutely. If you have Figma, Sketch, or Adobe XD files, I can build directly from them. I also offer design-to-code services where I refine and optimize existing designs for the web.',
  },
  {
    question: 'Do you offer revisions?',
    answer: 'Yes. Landing pages include 3 revision rounds. Multi-page sites include 5. Each round allows you to request changes to design, content, or functionality. Additional revisions are billed at an hourly rate.',
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="section">
      <div className="reveal">
        <div className="section-label">
          <HelpCircle size={16} />
          FAQ
        </div>
        <h2 className="section-title">Common Questions</h2>
        <p className="section-subtitle">
          Everything you need to know before we start working together.
        </p>
      </div>

      <div className="flex flex-col gap-3 mt-12 max-w-[800px]">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05, duration: 0.5 }}
            className="glass-card overflow-hidden"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full px-7 py-6 bg-none border-none text-left cursor-pointer flex items-center justify-between gap-4"
            >
              <span className="font-heading text-base font-semibold text-text-primary hover:text-accent transition-colors">
                {faq.question}
              </span>
              <Plus
                size={20}
                className={`text-accent flex-shrink-0 transition-transform duration-300 ${
                  openIndex === index ? 'rotate-45' : ''
                }`}
              />
            </button>
            <AnimatePresence initial={false}>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
                  className="overflow-hidden"
                >
                  <p className="px-7 pb-6 text-sm text-text-secondary leading-relaxed">
                    {faq.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
