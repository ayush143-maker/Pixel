import { useEffect, useState } from 'react'
import { Loader2, Mail, MailOpen, Trash2 } from 'lucide-react'
import { supabase, type ContactSubmission } from '../lib/supabase'

export default function MessagesPanel() {
  const [messages, setMessages] = useState<ContactSubmission[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const load = async () => {
    setLoading(true)
    const { data, error: fetchError } = await supabase
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false })
    if (fetchError) setError(fetchError.message)
    else setMessages((data as ContactSubmission[]) ?? [])
    setLoading(false)
  }

  useEffect(() => {
    load()
  }, [])

  const toggleRead = async (msg: ContactSubmission) => {
    await supabase.from('contact_submissions').update({ is_read: !msg.is_read }).eq('id', msg.id)
    load()
  }

  const remove = async (id: string) => {
    if (!confirm('Delete this message?')) return
    await supabase.from('contact_submissions').delete().eq('id', id)
    load()
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16 text-text-secondary">
        <Loader2 className="animate-spin" size={22} />
      </div>
    )
  }

  if (error) {
    return <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">{error}</p>
  }

  if (messages.length === 0) {
    return <div className="text-center py-16 text-text-secondary text-sm">No messages yet.</div>
  }

  return (
    <div className="flex flex-col gap-3">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`glass-card p-5 ${msg.is_read ? '' : 'border-accent/30'}`}
        >
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h4 className="font-heading text-[15px] font-semibold text-text-primary">{msg.name}</h4>
                {!msg.is_read && (
                  <span className="text-[10px] uppercase tracking-wider font-bold text-accent bg-accent/10 border border-accent/20 px-2 py-0.5 rounded-full">
                    New
                  </span>
                )}
              </div>
              <p className="text-xs text-text-secondary mt-1">
                {msg.project_type ? `${msg.project_type} • ` : ''}
                {msg.budget ? `${msg.budget} • ` : ''}
                {new Date(msg.created_at).toLocaleString()}
              </p>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button
                onClick={() => toggleRead(msg)}
                className="w-9 h-9 rounded-[10px] border border-white/[0.08] flex items-center justify-center text-text-secondary hover:text-accent hover:border-accent/30 transition-all"
                aria-label={msg.is_read ? 'Mark unread' : 'Mark read'}
              >
                {msg.is_read ? <Mail size={15} /> : <MailOpen size={15} />}
              </button>
              <button
                onClick={() => remove(msg.id)}
                className="w-9 h-9 rounded-[10px] border border-white/[0.08] flex items-center justify-center text-text-secondary hover:text-red-400 hover:border-red-400/30 transition-all"
                aria-label="Delete"
              >
                <Trash2 size={15} />
              </button>
            </div>
          </div>
          <p className="text-sm text-text-secondary leading-relaxed mt-3">{msg.message}</p>
        </div>
      ))}
    </div>
  )
}
