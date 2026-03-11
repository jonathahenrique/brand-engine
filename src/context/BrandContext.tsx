'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { BrandConfig } from '@/types/brand'
import FontLoader from '@/components/ui/FontLoader'

interface BrandContextValue {
  brand: BrandConfig
  tokens: {
    heading: string
    body: string
    mono: string
  }
  accent: string
}

const BrandContext = createContext<BrandContextValue | null>(null)

function useSystemTheme() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    // Read initial
    setIsDark(document.documentElement.dataset.theme === 'dark')

    // Observe changes to data-theme attribute
    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.type === 'attributes' && m.attributeName === 'data-theme') {
          setIsDark(document.documentElement.dataset.theme === 'dark')
        }
      }
    })
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    return () => observer.disconnect()
  }, [])

  return isDark
}

export function BrandProvider({
  brand,
  children,
}: {
  brand: BrandConfig
  children: React.ReactNode
}) {
  const isDark = useSystemTheme()

  const tokens = useMemo(() => ({
    heading: brand.typography.stack.find(f => f.role === 'display')?.font ?? 'system-ui',
    body: brand.typography.stack.find(f => f.role === 'body')?.font ?? 'system-ui',
    mono: brand.typography.stack.find(f => f.role === 'mono')?.font ?? 'monospace',
  }), [brand])

  const accent = useMemo(() => {
    const t = brand.theme
    if (isDark) return t.accentOnDark || t.accent || t.primary
    return t.accent || t.primary
  }, [brand, isDark])

  const cssVars = useMemo(() => {
    const t = brand.theme
    const s = brand.shape
    return {
      '--brand-bg': t.bg,
      '--brand-surface': t.surface,
      '--brand-surface-hover': t.surfaceHover,
      '--brand-primary': t.primary,
      '--brand-primary-hover': t.primaryHover,
      '--brand-primary-deep': t.primaryDeep,
      '--brand-primary-muted': t.primaryMuted,
      '--brand-secondary': t.secondary,
      '--brand-secondary-hover': t.secondaryHover,
      '--brand-secondary-deep': t.secondaryDeep,
      '--brand-secondary-muted': t.secondaryMuted,
      '--brand-text': t.text,
      '--brand-text-secondary': t.textSecondary,
      '--brand-text-tertiary': t.textTertiary,
      '--brand-border': t.border,
      '--brand-border-subtle': t.borderSubtle,
      '--brand-accent': accent,
      '--brand-radius-sm': s.radiusSm,
      '--brand-radius-md': s.radiusMd,
      '--brand-radius-lg': s.radiusLg,
      '--brand-shadow-elevated': s.shadowElevated,
      '--brand-shadow-modal': s.shadowModal,
      '--brand-border-width': s.borderWidth,
    } as Record<string, string>
  }, [brand, accent])

  return (
    <BrandContext value={{ brand, tokens, accent }}>
      <FontLoader />
      <div style={cssVars}>
        {children}
      </div>
    </BrandContext>
  )
}

export function useBrand(): BrandContextValue {
  const ctx = useContext(BrandContext)
  if (!ctx) throw new Error('useBrand must be used within BrandProvider')
  return ctx
}
