import { useRef, useState } from 'react'
import { Upload, X, Loader2, ImageIcon } from 'lucide-react'
import { supabase } from '../lib/supabase'

interface ImageUploadProps {
  value: string
  onChange: (url: string) => void
  folder: string
  shape?: 'circle' | 'square'
  label?: string
}

const MAX_SIZE_BYTES = 5 * 1024 * 1024 // 5MB

export default function ImageUpload({ value, onChange, folder, shape = 'square', label }: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFile = async (file: File) => {
    setError(null)

    if (!file.type.startsWith('image/')) {
      setError('Please choose an image file.')
      return
    }
    if (file.size > MAX_SIZE_BYTES) {
      setError('Image must be under 5MB.')
      return
    }

    setUploading(true)
    const ext = file.name.split('.').pop() || 'jpg'
    const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`

    const { error: uploadError } = await supabase.storage.from('site-images').upload(path, file, {
      cacheControl: '3600',
      upsert: false,
    })

    if (uploadError) {
      setError(uploadError.message)
      setUploading(false)
      return
    }

    const { data } = supabase.storage.from('site-images').getPublicUrl(path)
    onChange(data.publicUrl)
    setUploading(false)
  }

  const previewClasses =
    shape === 'circle'
      ? 'w-28 h-28 rounded-full'
      : 'w-full h-36 rounded-[14px]'

  return (
    <div className="flex flex-col gap-2">
      {label && <label className="text-sm font-medium text-text-primary">{label}</label>}

      <div className={shape === 'circle' ? 'flex items-center gap-4' : 'flex flex-col gap-3'}>
        <div
          className={`${previewClasses} bg-background border border-white/[0.08] flex items-center justify-center overflow-hidden flex-shrink-0 relative`}
        >
          {uploading ? (
            <Loader2 size={22} className="animate-spin text-accent" />
          ) : value ? (
            <img src={value} alt="Uploaded" className="w-full h-full object-cover" />
          ) : (
            <ImageIcon size={22} className="text-text-secondary/40" />
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="btn-secondary !px-4 !py-2 !text-[13px] disabled:opacity-60"
          >
            <span className="flex items-center gap-1.5">
              <Upload size={14} />
              {value ? 'Replace' : 'Upload'} Image
            </span>
          </button>
          {value && !uploading && (
            <button
              type="button"
              onClick={() => onChange('')}
              className="w-9 h-9 rounded-[10px] border border-white/[0.08] flex items-center justify-center text-text-secondary hover:text-red-400 hover:border-red-400/30 transition-all"
              aria-label="Remove image"
            >
              <X size={15} />
            </button>
          )}
        </div>

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) handleFile(file)
            e.target.value = ''
          }}
        />
      </div>

      {error && <p className="text-xs text-red-400">{error}</p>}
      <p className="text-xs text-text-secondary/60">JPG, PNG or WebP, up to 5MB.</p>
    </div>
  )
}
