import { useEffect, useState } from 'react'
import { motion, type Variants } from 'framer-motion'
import { DollarSign, Check } from 'lucide-react'
import { supabase, type PricingPlan } from '../lib/supabase'

const defaultPlans: PricingPlan[] = [
  {
    id: 'd1',
    name: 'Landing Page',
    description: 'Perfect for product launches and campaigns',
    price: '$499',
    period: '/ page',
    featured: false,
    features: ['Single-page design', 'Mobile responsive', 'Basic animations', 'Contact form', '3 revisions', '5-day delivery'],
    sort_order: 1,
  },
  {
    id: 'd2',
    name: 'Multi-Page Site',
    description: 'Full websites for businesses and portfolios',
    price: '$1,299',
    period: '/ site',
    featured: true,
    features: ['Up to 5 pages', 'Premium animations', 'CMS integration', 'SEO optimization', '5 revisions', '10-day delivery', '30-day support'],
    sort_order: 2,
  },
  {
    id: 'd3',
    name: 'Custom Project',
    description: 'Complex applications and unique requirements',
    price: 'Custom',
    period: '/ quote',
    featured: false,
    features: ['Unlimited pages', 'Advanced animations', 'Custom backend', 'Third-party APIs', 'Unlimited revisions', 'Flexible timeline', 'Priority support'],
    sort_order: 3,
  },
]

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
}

export default function Pricing() {
  const [plans, setPlans] = useState<PricingPlan[]>(defaultPlans)

  useEffect(() => {
    supabase
      .from('pricing_plans')
      .select('*')
      .order('sort_order', { ascending: true })
      .then(({ data }) => {
        if (data && data.length > 0) setPlans(data as PricingPlan[])
      })
  }, [])

  return (
    <section id="pricing" className="section">
      <div className="reveal">
        <div className="section-label">
          <DollarSign size={16} />
          Pricing
        </div>
        <h2 className="section-title">Transparent Pricing</h2>
        <p className="section-subtitle">
          No hidden fees. No surprises. Just premium work at fair rates.
        </p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 mt-12 items-start"
      >
        {plans.map((plan) => (
          <motion.div
            key={plan.id}
            variants={cardVariants}
            className={`glass-card p-8 sm:p-10 relative overflow-hidden ${
              plan.featured
                ? 'border-accent/40 shadow-[0_0_40px_rgba(16,185,129,0.08)]'
                : ''
            }`}
          >
            {plan.featured && (
              <div className="absolute top-4 -right-11 bg-gradient-to-r from-accent to-accent-secondary text-[#04120D] text-[11px] font-bold uppercase tracking-wider py-1.5 px-12 rotate-45">
                Most Popular
              </div>
            )}
            <div className="font-heading text-xl font-semibold text-text-primary mb-2">
              {plan.name}
            </div>
            <p className="text-sm text-text-secondary mb-6">{plan.description}</p>
            <div className="font-heading text-4xl sm:text-5xl font-bold text-text-primary mb-2 break-words">
              {plan.price}
              <span className="text-base font-normal text-text-secondary ml-1">
                {plan.period}
              </span>
            </div>
            <ul className="space-y-3 my-8">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2.5 text-sm text-text-secondary">
                  <Check size={18} className="text-accent flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
            {plan.featured ? (
              <a href="#contact" className="btn-primary w-full">
                <span>Get Started</span>
              </a>
            ) : (
              <a href="#contact" className="btn-secondary w-full">
                Get Started
              </a>
            )}
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
