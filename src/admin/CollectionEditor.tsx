import { useEffect, useState, type FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Pencil, Trash2, X, Loader2, GripVertical } from 'lucide-react'
import { supabase } from '../lib/supabase'
import ImageUpload from './ImageUpload'

export type FieldType = 'text' | 'textarea' | 'tags' | 'lines' | 'boolean' | 'number' | 'image'

export interface FieldConfig {
  key: string
  label: string
  type: FieldType
  placeholder?: string
  required?: boolean
  /** Storage folder to upload into, used when type === 'image' */
  folder?: string
}

interface CollectionEditorProps {
  table: string
  fields: FieldConfig[]
  titleField: string
  subtitleField?: string
  emptyLabel: string
}

// Convert a raw DB row into form-friendly string values
function rowToFormState(row: Record<string, unknown> | null, fields: FieldConfig[]) {
  const state: Record<string, string | boolean> = {}
  for (const field of fields) {
    const value = row ? row[field.key] : undefined
    if (field.type === 'boolean') {
      state[field.key] = Boolean(value)
    } else if (field.type === 'tags') {
      state[field.key] = Array.isArray(value) ? (value as string[]).join(', ') : ''
    } else if (field.type === 'lines') {
      state[field.key] = Array.isArray(value) ? (value as string[]).join('\n') : ''
    } else {
      state[field.key] = value != null ? String(value) : ''
    }
  }
  return state
}

// Convert form state back into a DB-ready payload
function formStateToPayload(state: Record<string, string | boolean>, fields: FieldConfig[]) {
  const payload: Record<string, unknown> = {}
  for (const field of fields) {
    const raw = state[field.key]
    if (field.type === 'boolean') {
      payload[field.key] = Boolean(raw)
    } else if (field.type === 'tags') {
      payload[field.key] = String(raw)
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)
    } else if (field.type === 'lines') {
      payload[field.key] = String(raw)
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean)
    } else if (field.type === 'number') {
      payload[field.key] = Number(raw) || 0
    } else {
      payload[field.key] = raw
    }
  }
  return payload
}

export default function CollectionEditor({ table, fields, titleField, subtitleField, emptyLabel }: CollectionEditorProps) {
  const [rows, setRows] = useState<Record<string, unknown>[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [editingRow, setEditingRow] = useState<Record<string, unknown> | null | 'new'>(null)
  const [formState, setFormState] = useState<Record<string, string | boolean>>({})
  const [saving, setSaving] = useState(false)

  const load = async () => {
    setLoading(true)
    const { data, error: fetchError } = await supabase
      .from(table)
      .select('*')
      .order('sort_order', { ascending: true })
    if (fetchError) setError(fetchError.message)
    else setRows(data ?? [])
    setLoading(false)
  }

  useEffect(() => {
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table])

  const openNew = () => {
    const base: Record<string, unknown> = {}
    if (fields.some((f) => f.key === 'sort_order')) base.sort_order = rows.length + 1
    setFormState(rowToFormState(base, fields))
    setEditingRow('new')
  }

  const openEdit = (row: Record<string, unknown>) => {
    setFormState(rowToFormState(row, fields))
    setEditingRow(row)
  }

  const closeForm = () => {
    setEditingRow(null)
    setFormState({})
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError(null)
    const payload = formStateToPayload(formState, fields)

    let opError: string | null = null
    if (editingRow === 'new') {
      const { error: insertError } = await supabase.from(table).insert(payload)
      opError = insertError?.message ?? null
    } else if (editingRow) {
      const { error: updateError } = await supabase
        .from(table)
        .update(payload)
        .eq('id', editingRow.id as string)
      opError = updateError?.message ?? null
    }

    setSaving(false)
    if (opError) {
      setError(opError)
    } else {
      closeForm()
      load()
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this item? This cannot be undone.')) return
    const { error: deleteError } = await supabase.from(table).delete().eq('id', id)
    if (deleteError) setError(deleteError.message)
    else load()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
        <p className="text-sm text-text-secondary">{rows.length} item{rows.length === 1 ? '' : 's'}</p>
        <button onClick={openNew} className="btn-primary !px-5 !py-2.5 !text-sm">
          <span className="flex items-center gap-2">
            <Plus size={16} />
            Add New
          </span>
        </button>
      </div>

      {error && (
        <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 mb-4">{error}</p>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-16 text-text-secondary">
          <Loader2 className="animate-spin" size={22} />
        </div>
      ) : rows.length === 0 ? (
        <div className="text-center py-16 text-text-secondary text-sm">{emptyLabel}</div>
      ) : (
        <div className="flex flex-col gap-3">
          {rows.map((row) => (
            <div
              key={row.id as string}
              className="glass-card p-4 sm:p-5 flex items-start sm:items-center gap-3 sm:gap-4 flex-col sm:flex-row"
            >
              <GripVertical size={18} className="hidden sm:block text-text-secondary/40 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <h4 className="font-heading text-[15px] font-semibold text-text-primary truncate">
                  {String(row[titleField] ?? '')}
                </h4>
                {subtitleField && (
                  <p className="text-sm text-text-secondary line-clamp-1 mt-0.5">
                    {String(row[subtitleField] ?? '')}
                  </p>
                )}
              </div>
              <div className="flex gap-2 flex-shrink-0 self-end sm:self-auto">
                <button
                  onClick={() => openEdit(row)}
                  className="w-9 h-9 rounded-[10px] border border-white/[0.08] flex items-center justify-center text-text-secondary hover:text-accent hover:border-accent/30 transition-all"
                  aria-label="Edit"
                >
                  <Pencil size={15} />
                </button>
                <button
                  onClick={() => handleDelete(row.id as string)}
                  className="w-9 h-9 rounded-[10px] border border-white/[0.08] flex items-center justify-center text-text-secondary hover:text-red-400 hover:border-red-400/30 transition-all"
                  aria-label="Delete"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {editingRow !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-6"
            onClick={closeForm}
          >
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="w-full sm:max-w-[520px] max-h-[90vh] overflow-y-auto bg-surface border border-white/[0.08] rounded-t-[24px] sm:rounded-[24px] p-6 sm:p-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-heading text-xl font-semibold text-text-primary">
                  {editingRow === 'new' ? 'Add New' : 'Edit'}
                </h3>
                <button onClick={closeForm} className="text-text-secondary hover:text-text-primary" aria-label="Close">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {fields.map((field) => (
                  <div key={field.key} className="flex flex-col gap-2">
                    {field.type !== 'boolean' && field.type !== 'image' && (
                      <label className="text-sm font-medium text-text-primary">{field.label}</label>
                    )}
                    {field.type === 'image' ? (
                      <ImageUpload
                        label={field.label}
                        value={String(formState[field.key] ?? '')}
                        onChange={(url) => setFormState({ ...formState, [field.key]: url })}
                        folder={field.folder ?? table}
                      />
                    ) : field.type === 'textarea' || field.type === 'lines' ? (
                      <textarea
                        value={String(formState[field.key] ?? '')}
                        onChange={(e) => setFormState({ ...formState, [field.key]: e.target.value })}
                        placeholder={field.placeholder}
                        rows={field.type === 'lines' ? 5 : 3}
                        required={field.required}
                        className="px-4 py-3 rounded-[12px] border border-white/[0.08] bg-background text-text-primary text-[14px] outline-none transition-all focus:border-accent/40 resize-y"
                      />
                    ) : field.type === 'boolean' ? (
                      <label className="flex items-center gap-3 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={Boolean(formState[field.key])}
                          onChange={(e) => setFormState({ ...formState, [field.key]: e.target.checked })}
                          className="w-4 h-4 accent-accent"
                        />
                        <span className="text-sm font-medium text-text-primary">{field.label}</span>
                      </label>
                    ) : field.type === 'number' ? (
                      <input
                        type="number"
                        value={String(formState[field.key] ?? '')}
                        onChange={(e) => setFormState({ ...formState, [field.key]: e.target.value })}
                        placeholder={field.placeholder}
                        required={field.required}
                        className="px-4 py-3 rounded-[12px] border border-white/[0.08] bg-background text-text-primary text-[14px] outline-none transition-all focus:border-accent/40"
                      />
                    ) : (
                      <input
                        type="text"
                        value={String(formState[field.key] ?? '')}
                        onChange={(e) => setFormState({ ...formState, [field.key]: e.target.value })}
                        placeholder={field.placeholder}
                        required={field.required}
                        className="px-4 py-3 rounded-[12px] border border-white/[0.08] bg-background text-text-primary text-[14px] outline-none transition-all focus:border-accent/40"
                      />
                    )}
                    {(field.type === 'tags' || field.type === 'lines') && (
                      <p className="text-xs text-text-secondary/70">
                        {field.type === 'tags' ? 'Separate with commas' : 'One item per line'}
                      </p>
                    )}
                  </div>
                ))}

                <button type="submit" disabled={saving} className="btn-primary mt-2 disabled:opacity-60">
                  <span>{saving ? 'Saving…' : 'Save'}</span>
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
