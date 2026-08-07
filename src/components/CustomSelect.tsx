import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Check } from 'lucide-react'

export interface SelectOption {
  value: string
  label: string
}

interface CustomSelectProps {
  value: string
  onChange: (value: string) => void
  options: SelectOption[]
  placeholder: string
  required?: boolean
}

export default function CustomSelect({ value, onChange, options, placeholder, required }: CustomSelectProps) {
  const [open, setOpen] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const selected = options.find((o) => o.value === value)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={wrapperRef} className="relative">
      {/* Hidden input keeps native "required" form validation working */}
      <input type="text" value={value} required={required} readOnly tabIndex={-1} className="sr-only" aria-hidden="true" />

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`w-full flex items-center justify-between px-[18px] py-3.5 rounded-[14px] border bg-surface/60 font-body text-[15px] text-left outline-none transition-all cursor-pointer ${
          open ? 'border-accent/40 shadow-[0_0_0_3px_rgba(16,185,129,0.1)]' : 'border-white/[0.08]'
        }`}
      >
        <span className={selected ? 'text-text-primary' : 'text-text-secondary/50'}>
          {selected ? selected.label : placeholder}
        </span>
        <ChevronDown
          size={18}
          className={`text-text-secondary flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] as const }}
            className="absolute z-30 top-[calc(100%+8px)] left-0 right-0 max-h-[280px] overflow-y-auto bg-surface border border-white/[0.08] rounded-[14px] shadow-[0_12px_40px_rgba(0,0,0,0.5)] p-1.5"
          >
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value)
                  setOpen(false)
                }}
                className={`w-full flex items-center justify-between gap-2 px-4 py-3 rounded-[10px] text-left text-[14px] transition-colors ${
                  option.value === value
                    ? 'bg-accent/10 text-accent'
                    : 'text-text-primary hover:bg-white/[0.04]'
                }`}
              >
                {option.label}
                {option.value === value && <Check size={15} className="flex-shrink-0" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
