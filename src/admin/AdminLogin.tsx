import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { Lock, User, Eye, EyeOff, Leaf } from 'lucide-react'
import { useAuth } from './AuthContext'

export default function AdminLogin() {
  const { signIn } = useAuth()
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    setSubmitting(true)
    const { error: signInError } = await signIn(id, password)
    setSubmitting(false)
    if (signInError) {
      setError('Invalid ID or password. Please try again.')
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-5 relative overflow-hidden bg-background">
      <div className="absolute w-[400px] h-[400px] rounded-full bg-accent/20 blur-[120px] -top-[10%] -right-[10%] pointer-events-none" />
      <div className="absolute w-[300px] h-[300px] rounded-full bg-accent-secondary/10 blur-[120px] -bottom-[10%] -left-[10%] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-[400px] glass-card p-8 sm:p-10"
      >
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent/20 to-accent-secondary/10 flex items-center justify-center text-accent mb-4">
            <Leaf size={26} />
          </div>
          <h1 className="font-heading text-2xl font-bold text-text-primary">Admin Access</h1>
          <p className="text-sm text-text-secondary mt-1">Sign in to manage Pixel Studio content</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-text-primary">ID</label>
            <div className="relative">
              <User size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" />
              <input
                type="text"
                value={id}
                onChange={(e) => setId(e.target.value)}
                placeholder="Your admin ID"
                autoComplete="username"
                className="w-full pl-11 pr-4 py-3.5 rounded-[14px] border border-white/[0.08] bg-surface/60 text-text-primary font-body text-[15px] outline-none transition-all focus:border-accent/40 focus:shadow-[0_0_0_3px_rgba(16,185,129,0.1)] placeholder:text-text-secondary/50"
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-text-primary">Password</label>
            <div className="relative">
              <Lock size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
                className="w-full pl-11 pr-11 py-3.5 rounded-[14px] border border-white/[0.08] bg-surface/60 text-text-primary font-body text-[15px] outline-none transition-all focus:border-accent/40 focus:shadow-[0_0_0_3px_rgba(16,185,129,0.1)] placeholder:text-text-secondary/50"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary transition-colors"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
              {error}
            </p>
          )}

          <button type="submit" disabled={submitting} className="btn-primary mt-2 w-full disabled:opacity-60">
            <span>{submitting ? 'Signing in…' : 'Sign In'}</span>
          </button>
        </form>

        <a href="/" className="block text-center text-sm text-text-secondary hover:text-accent transition-colors mt-6">
          ← Back to website
        </a>
      </motion.div>
    </div>
  )
}
