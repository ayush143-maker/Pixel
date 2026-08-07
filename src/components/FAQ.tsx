import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HelpCircle, Plus } from 'lucide-react'
import { supabase, type Faq } from '../lib/supabase'

const defaultFaqs: Faq[] = [
  { id: 'd1', question: 'What is your typical turnaround time?', answer: 'Landing pages are delivered within 5 business days. Multi-page sites typically take 10-14 days depending on complexity. Custom projects are scoped individually with a clear timeline before we begin.', sort_order: 1 },
  { id: 'd2', question: 'How do we communicate during the project?', answer: 'Telegram is my primary communication channel. It allows for quick feedback, easy file sharing, and real-time updates. I respond within a few hours during business hours and provide daily progress updates.', sort_order: 2 },
  { id: 'd3', question: 'Do you provide design files or just code?', answer: 'I deliver both. You get the fully functional, deployed website plus all source code. If needed, I can also provide Figma design files for an additional fee.', sort_order: 3 },
  { id: 'd4', question: 'What technologies do you specialize in?', answer: 'I primarily work with React, Next.js, TypeScript, and Tailwind CSS. For animations, I use Framer Motion and GSAP. For backends, I am comfortable with Node.js, PostgreSQL, and various CMS platforms.', sort_order: 4 },
  { id: 'd5', question: 'Do you offer ongoing maintenance?', answer: 'Yes. All multi-page sites include 30 days of free support. After that, I offer monthly maintenance retainers that cover bug fixes, security updates, content changes, and minor feature additions.', sort_order: 5 },
  { id: 'd6', question: 'What is your payment structure?', answer: 'For projects under $1,000, full payment upfront. For larger projects, 50% upfront to begin, 50% upon delivery. I accept payments via bank transfer, PayPal, and cryptocurrency.', sort_order: 6 },
  { id: 'd7', question: 'Can you work with existing designs?', answer: 'Absolutely. If you have Figma, Sketch, or Adobe XD files, I can build directly from them. I also offer design-to-code services where I refine and optimize existing designs for the web.', sort_order: 7 },
  { id: 'd8', question: 'Do you offer revisions?', answer: 'Yes. Landing pages include 3 revision rounds. Multi-page sites include 5. Each round allows you to request changes to design, content, or functionality. Additional revisions are billed at an hourly rate.', sort_order: 8 },
]

export default function FAQ() {
  const [faqs, setFaqs] = useState<Faq[]>(defaultFaqs)
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  useEffect(() => {
    supabase
      .from('faqs')
      .select('*')
      .order('sort_order', { ascending: true })
      .then(({ data }) => {
        if (data && data.length > 0) setFaqs(data as Faq[])
      })
  }, [])

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
            key={faq.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: Math.min(index * 0.05, 0.3), duration: 0.5 }}
            className="glass-card overflow-hidden"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full px-6 sm:px-7 py-5 sm:py-6 bg-none border-none text-left cursor-pointer flex items-center justify-between gap-4"
            >
              <span className="font-heading text-[15px] sm:text-base font-semibold text-text-primary hover:text-accent transition-colors">
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
                  <p className="px-6 sm:px-7 pb-5 sm:pb-6 text-sm text-text-secondary leading-relaxed">
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
