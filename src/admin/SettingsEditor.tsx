import { useEffect, useState } from 'react'
import { Loader2, Save } from 'lucide-react'
import { supabase } from '../lib/supabase'
import ImageUpload from './ImageUpload'

interface SettingsEditorProps {
  settingKey: 'hero' | 'about_bio' | 'contact_info'
  title: string
  description: string
}

// Field layout per settings key. Nested arrays (stats/paragraphs) are edited as line-separated text.
const FIELD_MAP: Record<string, { key: string; label: string; type: 'text' | 'textarea' | 'lines' | 'image' }[]> = {
  hero: [
    { key: 'badge', label: 'Availability badge text', type: 'text' },
    { key: 'headline_line1', label: 'Headline — line 1', type: 'text' },
    { key: 'headline_highlight', label: 'Headline — highlighted word', type: 'text' },
    { key: 'headline_line2', label: 'Headline — line 2', type: 'text' },
    { key: 'subtext', label: 'Subtext paragraph', type: 'textarea' },
  ],
  about_bio: [
    { key: 'photo_url', label: 'Profile Photo', type: 'image' },
    { key: 'heading', label: 'Heading', type: 'text' },
    { key: 'paragraphs', label: 'Bio paragraphs', type: 'lines' },
  ],
  contact_info: [
    { key: 'telegram', label: 'Telegram handle (e.g. @yourname)', type: 'text' },
    { key: 'telegram_url', label: 'Telegram link', type: 'text' },
    { key: 'email', label: 'Email address', type: 'text' },
    { key: 'response_time', label: 'Response time note', type: 'text' },
  ],
}

export default function SettingsEditor({ settingKey, title, description }: SettingsEditorProps) {
  const [value, setValue] = useState<Record<string, unknown>>({})
  const [statsText, setStatsText] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [saved, setSaved] = useState(false)

  const fields = FIELD_MAP[settingKey]

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      const { data, error: fetchError } = await supabase
        .from('site_settings')
        .select('value')
        .eq('key', settingKey)
        .maybeSingle()
      if (fetchError) setError(fetchError.message)
      const v = (data?.value as Record<string, unknown>) ?? {}
      setValue(v)
      if (settingKey === 'hero' && Array.isArray(v.stats)) {
        setStatsText(
          (v.stats as { number: string; label: string }[]).map((s) => `${s.number} | ${s.label}`).join('\n')
        )
      }
      setLoading(false)
    }
    load()
  }, [settingKey])

  const handleFieldChange = (key: string, type: string, text: string) => {
    if (type === 'lines') {
      setValue({ ...value, [key]: text.split('\n').map((s) => s.trim()).filter(Boolean) })
    } else {
      setValue({ ...value, [key]: text })
    }
  }

  const getDisplayValue = (key: string, type: string) => {
    const v = value[key]
    if (type === 'lines' && Array.isArray(v)) return v.join('\n')
    return typeof v === 'string' ? v : ''
  }

  const handleSave = async () => {
    setSaving(true)
    setError(null)
    setSaved(false)
    const payload = { ...value } as Record<string, unknown>
    if (settingKey === 'hero') {
      payload.stats = statsText
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean)
        .map((line) => {
          const [number, label] = line.split('|').map((s) => s.trim())
          return { number: number ?? '', label: label ?? '' }
        })
    }
    const { error: upsertError } = await supabase
      .from('site_settings')
      .upsert({ key: settingKey, value: payload, updated_at: new Date().toISOString() })
    setSaving(false)
    if (upsertError) setError(upsertError.message)
    else {
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16 text-text-secondary">
        <Loader2 className="animate-spin" size={22} />
      </div>
    )
  }

  return (
    <div className="glass-card p-6 sm:p-8 max-w-[640px]">
      <h3 className="font-heading text-lg font-semibold text-text-primary mb-1">{title}</h3>
      <p className="text-sm text-text-secondary mb-6">{description}</p>

      {error && (
        <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 mb-4">{error}</p>
      )}

      <div className="flex flex-col gap-4">
        {fields.map((field) => (
          <div key={field.key} className="flex flex-col gap-2">
            {field.type !== 'image' && (
              <label className="text-sm font-medium text-text-primary">{field.label}</label>
            )}
            {field.type === 'image' ? (
              <ImageUpload
                label={field.label}
                value={getDisplayValue(field.key, field.type)}
                onChange={(url) => handleFieldChange(field.key, field.type, url)}
                folder="about"
                shape="circle"
              />
            ) : field.type === 'textarea' || field.type === 'lines' ? (
              <textarea
                value={getDisplayValue(field.key, field.type)}
                onChange={(e) => handleFieldChange(field.key, field.type, e.target.value)}
                rows={field.type === 'lines' ? 4 : 3}
                className="px-4 py-3 rounded-[12px] border border-white/[0.08] bg-background text-text-primary text-[14px] outline-none transition-all focus:border-accent/40 resize-y"
              />
            ) : (
              <input
                type="text"
                value={getDisplayValue(field.key, field.type)}
                onChange={(e) => handleFieldChange(field.key, field.type, e.target.value)}
                className="px-4 py-3 rounded-[12px] border border-white/[0.08] bg-background text-text-primary text-[14px] outline-none transition-all focus:border-accent/40"
              />
            )}
            {field.type === 'lines' && (
              <p className="text-xs text-text-secondary/70">One per line</p>
            )}
          </div>
        ))}

        {settingKey === 'hero' && (
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-text-primary">Stats</label>
            <textarea
              value={statsText}
              onChange={(e) => setStatsText(e.target.value)}
              rows={3}
              placeholder={'50+ | Projects Delivered'}
              className="px-4 py-3 rounded-[12px] border border-white/[0.08] bg-background text-text-primary text-[14px] outline-none transition-all focus:border-accent/40 resize-y"
            />
            <p className="text-xs text-text-secondary/70">Format: number | label — one per line</p>
          </div>
        )}

        <button onClick={handleSave} disabled={saving} className="btn-primary mt-2 disabled:opacity-60">
          <span className="flex items-center gap-2">
            {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
            {saved ? 'Saved!' : saving ? 'Saving…' : 'Save Changes'}
          </span>
        </button>
      </div>
    </div>
  )
}
