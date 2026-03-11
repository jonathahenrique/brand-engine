'use client'

import { useState } from 'react'
import { useBrand } from '@/context/BrandContext'
import { calculateContrast, getWcagRating, isLightColor } from '@/utils/color'
import { Check, Copy } from 'lucide-react'

function CopyHex({ hex }: { hex: string }) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(hex)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // Clipboard API can fail due to permissions or insecure context
    }
  }
  return (
    <button onClick={copy} className="inline-flex items-center gap-1 text-[var(--text-ghost)] transition hover:text-[var(--text-secondary)]">
      {copied ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
      <span className="font-mono text-[11px]">{hex}</span>
    </button>
  )
}

function ContrastBadge({ fg, bg }: { fg: string; bg: string }) {
  const ratio = calculateContrast(fg, bg)
  const { level, pass } = getWcagRating(ratio)
  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-semibold ${
        pass ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-600'
      }`}
    >
      {ratio.toFixed(2)}:1 {level}
    </span>
  )
}

export default function ColorExplorer() {
  const { brand, accent } = useBrand()
  const [mode, setMode] = useState<'dark' | 'light'>('dark')
  const colors = mode === 'dark' ? brand.colors.dark : brand.colors.light

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">Cores</h1>
        <p className="mt-1 text-sm text-[var(--text-secondary)]">{brand.colors.philosophy}</p>
      </div>

      {/* Tricolor Banner */}
      <div className="flex h-16 overflow-hidden rounded-2xl">
        <div className="flex-1" style={{ backgroundColor: brand.theme.primary }} />
        <div className="flex-1" style={{ backgroundColor: brand.theme.secondary }} />
        <div className="flex-1" style={{ backgroundColor: brand.theme.bg }} />
      </div>

      {/* Hero Swatches */}
      <div className="bento bento-2">
        {/* Primary */}
        <div className="card overflow-hidden">
          <div
            className="flex h-32 items-end p-5"
            style={{ backgroundColor: brand.theme.primary }}
          >
            <p
              className="text-lg font-bold"
              style={{ color: isLightColor(brand.theme.primary) ? '#000' : '#fff' }}
            >
              Primary
            </p>
          </div>
          <div className="p-5">
            <p className="text-sm font-semibold text-[var(--text-primary)]">
              {brand.colors.dark.find(c => c.hex === brand.theme.primary)?.name || 'Primary'}
            </p>
            <div className="mt-2 flex items-center gap-3">
              <CopyHex hex={brand.theme.primary} />
              {brand.colors.dark.find(c => c.hex === brand.theme.primary)?.oklch && (
                <span className="font-mono text-[11px] text-[var(--text-placeholder)]">
                  {brand.colors.dark.find(c => c.hex === brand.theme.primary)?.oklch}
                </span>
              )}
            </div>
            <div className="mt-3">
              <ContrastBadge fg={brand.theme.primary} bg="#FFFFFF" />
              <span className="ml-2">
                <ContrastBadge fg={brand.theme.primary} bg="#000000" />
              </span>
            </div>
          </div>
        </div>

        {/* Secondary */}
        <div className="card overflow-hidden">
          <div
            className="flex h-32 items-end p-5"
            style={{ backgroundColor: brand.theme.secondary }}
          >
            <p
              className="text-lg font-bold"
              style={{ color: isLightColor(brand.theme.secondary) ? '#000' : '#fff' }}
            >
              Secondary
            </p>
          </div>
          <div className="p-5">
            <p className="text-sm font-semibold text-[var(--text-primary)]">
              {brand.colors.dark.find(c => c.hex === brand.theme.secondary)?.name || 'Secondary'}
            </p>
            <div className="mt-2 flex items-center gap-3">
              <CopyHex hex={brand.theme.secondary} />
            </div>
            <div className="mt-3">
              <ContrastBadge fg={brand.theme.secondary} bg="#FFFFFF" />
              <span className="ml-2">
                <ContrastBadge fg={brand.theme.secondary} bg="#000000" />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Mode Tabs */}
      <div>
        <div className="mb-4 flex gap-2">
          <button
            onClick={() => setMode('dark')}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
              mode === 'dark'
                ? 'bg-[var(--bg-inverse)] text-[var(--text-on-inverse)]'
                : 'bg-[var(--bg-muted)] text-[var(--text-secondary)] hover:bg-[var(--border-default)]'
            }`}
          >
            Dark Mode ({brand.colors.dark.length})
          </button>
          <button
            onClick={() => setMode('light')}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
              mode === 'light'
                ? 'bg-[var(--bg-inverse)] text-[var(--text-on-inverse)]'
                : 'bg-[var(--bg-muted)] text-[var(--text-secondary)] hover:bg-[var(--border-default)]'
            }`}
          >
            Light Mode ({brand.colors.light.length})
          </button>
        </div>

        {/* Color Grid */}
        <div className="bento bento-4">
          {colors.map((c) => (
            <div key={c.token} className="card overflow-hidden">
              <div className="h-24" style={{ backgroundColor: c.hex }} />
              <div className="p-4">
                <p className="text-xs font-semibold text-[var(--text-primary)]">{c.name}</p>
                <p className="mt-0.5 font-mono text-[10px] text-[var(--text-ghost)]">--color-{c.token}</p>
                <CopyHex hex={c.hex} />
                <p className="mt-1.5 text-[11px] text-[var(--text-ghost)] leading-snug">{c.usage}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contrast Checker — Light Mode */}
      <div className="card p-6">
        <p className="section-label mb-4">Contraste — Light Mode</p>
        <div className="grid grid-cols-2 gap-4">
          <div
            className="flex items-center justify-center rounded-xl p-6"
            style={{ backgroundColor: '#F8F9FC' }}
          >
            <span
              className="text-3xl font-bold"
              style={{ color: brand.theme.accent || brand.theme.primary }}
            >
              Aa
            </span>
          </div>
          <div className="flex flex-col justify-center space-y-2">
            <p className="text-sm text-[var(--text-muted)]">
              <span className="font-semibold">Accent sobre Page:</span>
            </p>
            <ContrastBadge fg={brand.theme.accent || brand.theme.primary} bg="#F8F9FC" />
            <p className="text-sm text-[var(--text-muted)]">
              <span className="font-semibold">Accent sobre Card:</span>
            </p>
            <ContrastBadge fg={brand.theme.accent || brand.theme.primary} bg="#FFFFFF" />
          </div>
        </div>
      </div>

      {/* Contrast Checker — Dark Mode */}
      <div className="card p-6">
        <p className="section-label mb-4">Contraste — Dark Mode</p>
        <div className="grid grid-cols-2 gap-4">
          <div
            className="flex items-center justify-center rounded-xl p-6"
            style={{ backgroundColor: '#0F1117' }}
          >
            <span
              className="text-3xl font-bold"
              style={{ color: brand.theme.accentOnDark || brand.theme.accent || brand.theme.primary }}
            >
              Aa
            </span>
          </div>
          <div className="flex flex-col justify-center space-y-2">
            <p className="text-sm text-[var(--text-muted)]">
              <span className="font-semibold">Accent sobre Page:</span>
            </p>
            <ContrastBadge fg={brand.theme.accentOnDark || brand.theme.accent || brand.theme.primary} bg="#0F1117" />
            <p className="text-sm text-[var(--text-muted)]">
              <span className="font-semibold">Accent sobre Card:</span>
            </p>
            <ContrastBadge fg={brand.theme.accentOnDark || brand.theme.accent || brand.theme.primary} bg="#1C1E26" />
          </div>
        </div>
      </div>

      {/* Do / Don't */}
      <div className="bento bento-2">
        <div className="card p-6">
          <p className="mb-3 text-sm font-semibold text-emerald-600">Primary — Do</p>
          <ul className="space-y-2">
            {brand.colors.primaryUsage.do.map((r) => (
              <li key={r} className="flex items-start gap-2 text-xs text-[var(--text-secondary)]">
                <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                {r}
              </li>
            ))}
          </ul>
        </div>
        <div className="card p-6">
          <p className="mb-3 text-sm font-semibold text-red-500">Primary — Don&apos;t</p>
          <ul className="space-y-2">
            {brand.colors.primaryUsage.dont.map((r) => (
              <li key={r} className="flex items-start gap-2 text-xs text-[var(--text-secondary)]">
                <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400" />
                {r}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
