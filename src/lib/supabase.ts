import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string

if (!supabaseUrl || !supabaseAnonKey) {
  // eslint-disable-next-line no-console
  console.warn(
    '[Pixel Studio] Supabase env vars are missing. Copy .env.example to .env and fill in your project URL + anon key.'
  )
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
})

// ---- Database row types ----

export interface PortfolioProject {
  id: string
  title: string
  description: string
  tags: string[]
  icon: string | null
  image_url: string | null
  live_url: string | null
  case_study_url: string | null
  github_url: string | null
  has_case_study: boolean
  has_github: boolean
  sort_order: number
  created_at?: string
  updated_at?: string
}

export interface PricingPlan {
  id: string
  name: string
  description: string
  price: string
  period: string
  featured: boolean
  features: string[]
  sort_order: number
  created_at?: string
  updated_at?: string
}

export interface Faq {
  id: string
  question: string
  answer: string
  sort_order: number
  created_at?: string
  updated_at?: string
}

export interface AboutValue {
  id: string
  icon: string
  title: string
  description: string
  sort_order: number
  created_at?: string
}

export interface ContactSubmission {
  id: string
  name: string
  project_type: string | null
  budget: string | null
  message: string
  is_read: boolean
  created_at: string
}

export interface HeroSettings {
  badge: string
  headline_line1: string
  headline_highlight: string
  headline_line2: string
  subtext: string
  stats: { number: string; label: string }[]
}

export interface AboutBioSettings {
  heading: string
  paragraphs: string[]
  photo_url: string
}

export interface ContactInfoSettings {
  telegram: string
  telegram_url: string
  email: string
  response_time: string
}
