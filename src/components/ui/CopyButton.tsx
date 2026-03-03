'use client'

import { useState } from 'react'

export function CopyButton({ text, label, className }: { text: string; label?: string; className?: string }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // Fallback silencioso
    }
  }

  return (
    <button
      onClick={copy}
      className={className || 'font-mono text-[11px] text-gray-400 hover:text-gray-600 transition-colors'}
      aria-label={`Copiar ${label || text}`}
      title={`Copiar ${label || text}`}
    >
      {copied ? '✓' : (label || text)}
    </button>
  )
}
