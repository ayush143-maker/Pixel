import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, MessageCircle, Mail, ArrowRight } from 'lucide-react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    projectType: '',
    budget: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log(formData)
  }

  return (
    <section id="contact" className="section">
      <div className="reveal">
        <div className="section-label">
          <Send size={16} />
          Contact
        </div>
        <h2 className="section-title">Let&apos;s Build Something Great</h2>
        <p className="section-subtitle">
          Have a project in mind? I would love to hear about it. Reach out and let&apos;s discuss how we can bring your vision to life.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mt-12">
        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h3 className="font-heading text-2xl font-semibold text-text-primary mb-4">
            Start the conversation
          </h3>
          <p className="text-[15px] text-text-secondary leading-relaxed mb-8">
            I am currently accepting new projects. The fastest way to reach me is via Telegram —
            I typically respond within a few hours. For detailed project briefs, use the form
            or drop me an email.
          </p>

          <div className="flex flex-col gap-4">
            <a
              href="https://t.me/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-5 rounded-2xl bg-surface/40 border border-white/[0.08] hover:border-accent/30 hover:bg-accent/5 transition-all group"
            >
              <div className="w-12 h-12 rounded-[14px] bg-gradient-to-br from-accent/15 to-accent-secondary/8 flex items-center justify-center text-accent">
                <MessageCircle size={20} />
              </div>
              <div className="flex-1">
                <h4 className="font-heading text-[15px] font-semibold text-text-primary mb-0.5">
                  Telegram
                </h4>
                <p className="text-[13px] text-text-secondary">@yourusername — Primary contact</p>
              </div>
              <ArrowRight size={18} className="text-text-secondary group-hover:text-accent group-hover:translate-x-1 transition-all" />
            </a>

            <a
              href="mailto:hello@pixelstudio.dev"
              className="flex items-center gap-4 p-5 rounded-2xl bg-surface/40 border border-white/[0.08] hover:border-accent/30 hover:bg-accent/5 transition-all group"
            >
              <div className="w-12 h-12 rounded-[14px] bg-gradient-to-br from-accent/15 to-accent-secondary/8 flex items-center justify-center text-accent">
                <Mail size={20} />
              </div>
              <div className="flex-1">
                <h4 className="font-heading text-[15px] font-semibold text-text-primary mb-0.5">
                  Email
                </h4>
                <p className="text-[13px] text-text-secondary">hello@pixelstudio.dev</p>
              </div>
              <ArrowRight size={18} className="text-text-secondary group-hover:text-accent group-hover:translate-x-1 transition-all" />
            </a>
          </div>

          <div className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-accent/10 to-accent-secondary/5 border border-accent/20">
            <h4 className="font-heading text-sm font-semibold text-text-primary mb-2">
              Typical Response Time
            </h4>
            <p className="text-sm text-text-secondary">
              Telegram: &lt; 2 hours • Email: &lt; 24 hours
            </p>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.form
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          onSubmit={handleSubmit}
          className="flex flex-col gap-5"
        >
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-text-primary">Name</label>
            <input
              type="text"
              placeholder="Your name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="px-[18px] py-3.5 rounded-[14px] border border-white/[0.08] bg-surface/60 text-text-primary font-body text-[15px] outline-none transition-all focus:border-accent/40 focus:shadow-[0_0_0_3px_rgba(139,92,246,0.1)] placeholder:text-text-secondary/50"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-text-primary">Project Type</label>
            <select
              value={formData.projectType}
              onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
              className="px-[18px] py-3.5 rounded-[14px] border border-white/[0.08] bg-surface/60 text-text-primary font-body text-[15px] outline-none transition-all focus:border-accent/40 focus:shadow-[0_0_0_3px_rgba(139,92,246,0.1)] appearance-none cursor-pointer"
              required
            >
              <option value="" disabled>Select a project type</option>
              <option value="landing">Landing Page</option>
              <option value="website">Multi-Page Website</option>
              <option value="portfolio">Portfolio Website</option>
              <option value="ecommerce">E-Commerce</option>
              <option value="dashboard">Dashboard / SaaS</option>
              <option value="other">Something Else</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-text-primary">Budget</label>
            <select
              value={formData.budget}
              onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
              className="px-[18px] py-3.5 rounded-[14px] border border-white/[0.08] bg-surface/60 text-text-primary font-body text-[15px] outline-none transition-all focus:border-accent/40 focus:shadow-[0_0_0_3px_rgba(139,92,246,0.1)] appearance-none cursor-pointer"
              required
            >
              <option value="" disabled>Select your budget</option>
              <option value="under500">Under $500</option>
              <option value="500-1000">$500 – $1,000</option>
              <option value="1000-2500">$1,000 – $2,500</option>
              <option value="2500-5000">$2,500 – $5,000</option>
              <option value="5000+">$5,000+</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-text-primary">Message</label>
            <textarea
              placeholder="Tell me about your project, goals, timeline, and any specific requirements..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={5}
              className="px-[18px] py-3.5 rounded-[14px] border border-white/[0.08] bg-surface/60 text-text-primary font-body text-[15px] outline-none transition-all focus:border-accent/40 focus:shadow-[0_0_0_3px_rgba(139,92,246,0.1)] placeholder:text-text-secondary/50 resize-y min-h-[140px]"
              required
            />
          </div>

          <button type="submit" className="btn-primary mt-2">
            <span className="flex items-center gap-2">
              <Send size={16} />
              Send Message
            </span>
          </button>
        </motion.form>
      </div>
    </section>
  )
}
