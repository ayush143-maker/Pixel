import { useEffect, useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { Send, MessageCircle, Mail, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react'
import { supabase, type ContactInfoSettings } from '../lib/supabase'
import CustomSelect from './CustomSelect'

const PROJECT_TYPE_OPTIONS = [
  { value: 'landing', label: 'Landing Page' },
  { value: 'website', label: 'Multi-Page Website' },
  { value: 'portfolio', label: 'Portfolio Website' },
  { value: 'ecommerce', label: 'E-Commerce' },
  { value: 'dashboard', label: 'Dashboard / SaaS' },
  { value: 'other', label: 'Something Else' },
]

const BUDGET_OPTIONS = [
  { value: 'under500', label: 'Under ₹500' },
  { value: '500-1000', label: '₹500 – ₹1,000' },
  { value: '1000-2500', label: '₹1,000 – ₹2,500' },
  { value: '2500-5000', label: '₹2,500 – ₹5,000' },
  { value: '5000+', label: '₹5,000+' },
]

const defaultContactInfo: ContactInfoSettings = {
  telegram: '@yourusername',
  telegram_url: 'https://t.me/yourusername',
  email: 'hello@pixelstudio.dev',
  response_time: 'Telegram: < 2 hours • Email: < 24 hours',
}

export default function Contact() {
  const [contactInfo, setContactInfo] = useState<ContactInfoSettings>(defaultContactInfo)
  const [formData, setFormData] = useState({
    name: '',
    projectType: '',
    budget: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  useEffect(() => {
    supabase
      .from('site_settings')
      .select('value')
      .eq('key', 'contact_info')
      .maybeSingle()
      .then(({ data }) => {
        if (data?.value) setContactInfo({ ...defaultContactInfo, ...(data.value as Partial<ContactInfoSettings>) })
      })
  }, [])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus('submitting')
    const { error } = await supabase.from('contact_submissions').insert({
      name: formData.name,
      project_type: formData.projectType,
      budget: formData.budget,
      message: formData.message,
    })
    if (error) {
      setStatus('error')
      return
    }
    setStatus('success')
    setFormData({ name: '', projectType: '', budget: '', message: '' })
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 mt-12">
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
              href={contactInfo.telegram_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-5 rounded-2xl bg-surface/40 border border-white/[0.08] hover:border-accent/30 hover:bg-accent/5 transition-all group"
            >
              <div className="w-12 h-12 rounded-[14px] bg-gradient-to-br from-accent/[0.15] to-accent-secondary/[0.08] flex items-center justify-center text-accent flex-shrink-0">
                <MessageCircle size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-heading text-[15px] font-semibold text-text-primary mb-0.5">
                  Telegram
                </h4>
                <p className="text-[13px] text-text-secondary truncate">{contactInfo.telegram} — Primary contact</p>
              </div>
              <ArrowRight size={18} className="text-text-secondary group-hover:text-accent group-hover:translate-x-1 transition-all flex-shrink-0" />
            </a>

            <a
              href={`mailto:${contactInfo.email}`}
              className="flex items-center gap-4 p-5 rounded-2xl bg-surface/40 border border-white/[0.08] hover:border-accent/30 hover:bg-accent/5 transition-all group"
            >
              <div className="w-12 h-12 rounded-[14px] bg-gradient-to-br from-accent/[0.15] to-accent-secondary/[0.08] flex items-center justify-center text-accent flex-shrink-0">
                <Mail size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-heading text-[15px] font-semibold text-text-primary mb-0.5">
                  Email
                </h4>
                <p className="text-[13px] text-text-secondary truncate">{contactInfo.email}</p>
              </div>
              <ArrowRight size={18} className="text-text-secondary group-hover:text-accent group-hover:translate-x-1 transition-all flex-shrink-0" />
            </a>
          </div>

          <div className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-accent/[0.1] to-accent-secondary/5 border border-accent/20">
            <h4 className="font-heading text-sm font-semibold text-text-primary mb-2">
              Typical Response Time
            </h4>
            <p className="text-sm text-text-secondary">
              {contactInfo.response_time}
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
              className="px-[18px] py-3.5 rounded-[14px] border border-white/[0.08] bg-surface/60 text-text-primary font-body text-[15px] outline-none transition-all focus:border-accent/40 focus:shadow-[0_0_0_3px_rgba(16,185,129,0.1)] placeholder:text-text-secondary/50"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-text-primary">Project Type</label>
            <CustomSelect
              value={formData.projectType}
              onChange={(v) => setFormData({ ...formData, projectType: v })}
              options={PROJECT_TYPE_OPTIONS}
              placeholder="Select a project type"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-text-primary">Budget</label>
            <CustomSelect
              value={formData.budget}
              onChange={(v) => setFormData({ ...formData, budget: v })}
              options={BUDGET_OPTIONS}
              placeholder="Select your budget"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-text-primary">Message</label>
            <textarea
              placeholder="Tell me about your project, goals, timeline, and any specific requirements..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={5}
              className="px-[18px] py-3.5 rounded-[14px] border border-white/[0.08] bg-surface/60 text-text-primary font-body text-[15px] outline-none transition-all focus:border-accent/40 focus:shadow-[0_0_0_3px_rgba(16,185,129,0.1)] placeholder:text-text-secondary/50 resize-y min-h-[140px]"
              required
            />
          </div>

          {status === 'success' && (
            <p className="flex items-center gap-2 text-sm text-accent bg-accent/10 border border-accent/20 rounded-xl px-4 py-3">
              <CheckCircle2 size={16} />
              Message sent! I&apos;ll get back to you soon.
            </p>
          )}
          {status === 'error' && (
            <p className="flex items-center gap-2 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
              <AlertCircle size={16} />
              Something went wrong. Please try again or email me directly.
            </p>
          )}

          <button type="submit" disabled={status === 'submitting'} className="btn-primary mt-2 disabled:opacity-60">
            <span className="flex items-center gap-2">
              <Send size={16} />
              {status === 'submitting' ? 'Sending…' : 'Send Message'}
            </span>
          </button>
        </motion.form>
      </div>
    </section>
  )
}
