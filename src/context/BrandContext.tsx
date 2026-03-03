'use client'

import { createContext, useContext, useMemo } from 'react'
import type { BrandConfig } from '@/types/brand'

interface BrandContextValue {
  brand: BrandConfig
  tokens: {
    heading: string
    body: string
    mono: string
  }
}

const BrandContext = createContext<BrandContextValue | null>(null)

export function BrandProvider({
  brand,
  children,
}: {
  brand: BrandConfig
  children: React.ReactNode
}) {
  const tokens = useMemo(() => ({
    heading: brand.typography.stack.find(f => f.role === 'display')?.font ?? 'system-ui',
    body: brand.typography.stack.find(f => f.role === 'body')?.font ?? 'system-ui',
    mono: brand.typography.stack.find(f => f.role === 'mono')?.font ?? 'monospace',
  }), [brand])

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
      '--brand-radius-sm': s.radiusSm,
      '--brand-radius-md': s.radiusMd,
      '--brand-radius-lg': s.radiusLg,
      '--brand-shadow-elevated': s.shadowElevated,
      '--brand-shadow-modal': s.shadowModal,
      '--brand-border-width': s.borderWidth,
    } as Record<string, string>
  }, [brand])

  return (
    <BrandContext value={{ brand, tokens }}>
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
