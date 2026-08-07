import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  LayoutGrid,
  DollarSign,
  HelpCircle,
  User,
  Settings,
  Mail,
  LogOut,
  Menu,
  X,
  Leaf,
} from 'lucide-react'
import { useAuth } from './AuthContext'
import CollectionEditor from './CollectionEditor'
import SettingsEditor from './SettingsEditor'
import MessagesPanel from './MessagesPanel'

type Tab = 'portfolio' | 'pricing' | 'faq' | 'about' | 'settings' | 'messages'

const tabs: { id: Tab; label: string; icon: typeof LayoutGrid }[] = [
  { id: 'portfolio', label: 'Portfolio', icon: LayoutGrid },
  { id: 'pricing', label: 'Pricing', icon: DollarSign },
  { id: 'faq', label: 'FAQ', icon: HelpCircle },
  { id: 'about', label: 'About Values', icon: User },
  { id: 'settings', label: 'Site Settings', icon: Settings },
  { id: 'messages', label: 'Messages', icon: Mail },
]

export default function AdminDashboard() {
  const { signOut } = useAuth()
  const [activeTab, setActiveTab] = useState<Tab>('portfolio')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const renderTab = () => {
    switch (activeTab) {
      case 'portfolio':
        return (
          <CollectionEditor
            table="portfolio_projects"
            titleField="title"
            subtitleField="description"
            emptyLabel="No projects yet. Add your first project."
            fields={[
              { key: 'title', label: 'Title', type: 'text', required: true },
              { key: 'description', label: 'Description', type: 'textarea', required: true },
              { key: 'tags', label: 'Tags', type: 'tags', placeholder: 'React, TypeScript, Tailwind' },
              { key: 'icon', label: 'Emoji Icon (fallback if no image)', type: 'text', placeholder: '🛍️' },
              { key: 'image_url', label: 'Project Image', type: 'image', folder: 'portfolio' },
              { key: 'live_url', label: 'Live Preview URL', type: 'text' },
              { key: 'case_study_url', label: 'Case Study URL', type: 'text' },
              { key: 'github_url', label: 'GitHub URL', type: 'text' },
              { key: 'has_case_study', label: 'Show "Case Study" button', type: 'boolean' },
              { key: 'has_github', label: 'Show "GitHub" button', type: 'boolean' },
              { key: 'sort_order', label: 'Sort Order', type: 'number' },
            ]}
          />
        )
      case 'pricing':
        return (
          <CollectionEditor
            table="pricing_plans"
            titleField="name"
            subtitleField="description"
            emptyLabel="No pricing plans yet."
            fields={[
              { key: 'name', label: 'Plan Name', type: 'text', required: true },
              { key: 'description', label: 'Description', type: 'text', required: true },
              { key: 'price', label: 'Price', type: 'text', placeholder: '$499' },
              { key: 'period', label: 'Period', type: 'text', placeholder: '/ page' },
              { key: 'featured', label: 'Highlight as "Most Popular"', type: 'boolean' },
              { key: 'features', label: 'Features', type: 'lines', placeholder: 'Mobile responsive' },
              { key: 'sort_order', label: 'Sort Order', type: 'number' },
            ]}
          />
        )
      case 'faq':
        return (
          <CollectionEditor
            table="faqs"
            titleField="question"
            subtitleField="answer"
            emptyLabel="No FAQs yet."
            fields={[
              { key: 'question', label: 'Question', type: 'text', required: true },
              { key: 'answer', label: 'Answer', type: 'textarea', required: true },
              { key: 'sort_order', label: 'Sort Order', type: 'number' },
            ]}
          />
        )
      case 'about':
        return (
          <CollectionEditor
            table="about_values"
            titleField="title"
            subtitleField="description"
            emptyLabel="No values yet."
            fields={[
              { key: 'title', label: 'Title', type: 'text', required: true },
              { key: 'description', label: 'Description', type: 'textarea', required: true },
              {
                key: 'icon',
                label: 'Icon name (lucide-react, e.g. Sparkles, Code2, Gauge)',
                type: 'text',
                placeholder: 'Sparkles',
              },
              { key: 'sort_order', label: 'Sort Order', type: 'number' },
            ]}
          />
        )
      case 'settings':
        return (
          <div className="flex flex-col gap-6">
            <SettingsEditor settingKey="hero" title="Hero Section" description="Headline, badge, and stats shown at the top of the site." />
            <SettingsEditor settingKey="about_bio" title="About — Bio" description="Your story shown in the About section." />
            <SettingsEditor settingKey="contact_info" title="Contact Info" description="Telegram and email shown in the Contact section." />
          </div>
        )
      case 'messages':
        return <MessagesPanel />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-5 py-4 bg-background/95 backdrop-blur-xl border-b border-white/[0.08]">
        <div className="flex items-center gap-2 font-heading font-bold text-text-primary">
          <Leaf size={20} className="text-accent" />
          Admin
        </div>
        <button onClick={() => setSidebarOpen(true)} className="text-text-primary" aria-label="Open menu">
          <Menu size={22} />
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-[260px] bg-surface/60 border-r border-white/[0.08] backdrop-blur-xl flex flex-col p-6 z-50 transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2 font-heading text-lg font-bold text-text-primary">
            <Leaf size={22} className="text-accent" />
            Pixel Admin
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-text-secondary" aria-label="Close menu">
            <X size={20} />
          </button>
        </div>

        <nav className="flex flex-col gap-1 flex-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id)
                setSidebarOpen(false)
              }}
              className={`flex items-center gap-3 px-4 py-3 rounded-[12px] text-sm font-medium transition-all text-left ${
                activeTab === tab.id
                  ? 'bg-accent/10 text-accent border border-accent/20'
                  : 'text-text-secondary hover:text-text-primary hover:bg-white/[0.03] border border-transparent'
              }`}
            >
              <tab.icon size={17} />
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="flex flex-col gap-2 pt-4 border-t border-white/[0.08]">
          <a href="/" className="text-sm text-text-secondary hover:text-text-primary transition-colors px-4 py-2">
            ← View website
          </a>
          <button
            onClick={signOut}
            className="flex items-center gap-3 px-4 py-3 rounded-[12px] text-sm font-medium text-text-secondary hover:text-red-400 hover:bg-red-500/5 transition-all"
          >
            <LogOut size={17} />
            Sign Out
          </button>
        </div>
      </aside>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <main className="flex-1 min-w-0 px-5 sm:px-8 lg:px-10 py-24 lg:py-10 max-w-[1000px]">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-text-primary mb-1 capitalize">
            {tabs.find((t) => t.id === activeTab)?.label}
          </h2>
          <p className="text-sm text-text-secondary mb-8">
            Changes save directly to your Supabase database and appear live on the site.
          </p>
          {renderTab()}
        </motion.div>
      </main>
    </div>
  )
}
