import type { BrandConfig, LogoVariantType } from '@/types/brand'

/* ── Types ── */

export interface ResolvedVariant {
  type: LogoVariantType
  name: string
  description: string
  src: string | null
  cssFilter: string | null
  tileBg: string
  source: 'upload' | 'sharp' | 'ai' | 'css' | 'none'
  status: 'ready' | 'css-only' | 'missing'
  guidance: string | null
}

export interface CompletenessScore {
  ready: number
  cssOnly: number
  missing: number
  total: 5
}

/* ── Constants ── */

const VARIANT_ORDER: LogoVariantType[] = ['horizontal', 'stacked', 'icon', 'mono-light', 'mono-dark']

const DEFAULT_NAMES: Record<LogoVariantType, string> = {
  horizontal: 'Logo Horizontal',
  stacked: 'Logo Vertical',
  icon: 'Ícone',
  'mono-light': 'Mono Claro',
  'mono-dark': 'Mono Escuro',
}

const DEFAULT_DESCRIPTIONS: Record<LogoVariantType, string> = {
  horizontal: 'Logo principal em formato horizontal',
  stacked: 'Logo empilhado para formatos quadrados',
  icon: 'Somente o símbolo — favicon, app icon, perfil',
  'mono-light': 'Logo branco sobre fundos escuros',
  'mono-dark': 'Logo preto sobre fundos claros',
}

const GUIDANCE: Record<LogoVariantType, string> = {
  horizontal: 'Faça upload do logo principal em formato horizontal (SVG ou PNG transparente)',
  stacked: 'Versão empilhada (ícone sobre wordmark). Para social media, mobile e espaços quadrados',
  icon: 'Ícone/símbolo isolado. Para favicon, app icon e perfil de redes sociais',
  'mono-light': 'Versão monocromática branca. Para fundos escuros, fotografia e overlay',
  'mono-dark': 'Versão monocromática escura. Para impressão P&B, fundos claros e documentos',
}

/* ── Resolver ── */

export function resolveVariant(brand: BrandConfig, type: LogoVariantType): ResolvedVariant {
  const { logo } = brand
  const variant = logo.variants.find(v => v.type === type)
  const name = variant?.name || DEFAULT_NAMES[type]
  const description = variant?.description || DEFAULT_DESCRIPTIONS[type]

  // Base logo file (horizontal source or logo.file)
  const horizontalFile = logo.variants.find(v => v.type === 'horizontal')?.file || logo.file || null

  switch (type) {
    case 'horizontal': {
      const file = variant?.file || logo.file || null
      if (file) {
        return {
          type, name, description,
          src: file, cssFilter: null, tileBg: '#000000',
          source: variant?.source || 'upload', status: 'ready', guidance: null,
        }
      }
      return {
        type, name, description,
        src: null, cssFilter: null, tileBg: '#000000',
        source: 'none', status: 'missing', guidance: GUIDANCE.horizontal,
      }
    }

    case 'stacked': {
      if (variant?.file) {
        return {
          type, name, description,
          src: variant.file, cssFilter: null, tileBg: brand.theme.bg,
          source: variant.source || 'upload', status: 'ready', guidance: null,
        }
      }
      return {
        type, name, description,
        src: null, cssFilter: null, tileBg: brand.theme.bg,
        source: 'none', status: 'missing', guidance: GUIDANCE.stacked,
      }
    }

    case 'icon': {
      const file = variant?.file || logo.icon || null
      if (file) {
        return {
          type, name, description,
          src: file, cssFilter: null, tileBg: brand.theme.bg,
          source: variant?.source || (logo.icon ? 'upload' : 'upload'), status: 'ready', guidance: null,
        }
      }
      return {
        type, name, description,
        src: null, cssFilter: null, tileBg: brand.theme.bg,
        source: 'none', status: 'missing', guidance: GUIDANCE.icon,
      }
    }

    case 'mono-light': {
      // 1. Dedicated file
      if (variant?.file) {
        return {
          type, name, description,
          src: variant.file, cssFilter: null, tileBg: brand.theme.bg,
          source: variant.source || 'upload', status: 'ready', guidance: null,
        }
      }
      // 2. CSS fallback from base logo
      if (horizontalFile) {
        return {
          type, name, description,
          src: horizontalFile, cssFilter: 'brightness(0) invert(1)', tileBg: brand.theme.bg,
          source: 'css', status: 'css-only', guidance: null,
        }
      }
      return {
        type, name, description,
        src: null, cssFilter: null, tileBg: brand.theme.bg,
        source: 'none', status: 'missing', guidance: GUIDANCE['mono-light'],
      }
    }

    case 'mono-dark': {
      // 1. Dedicated file
      if (variant?.file) {
        return {
          type, name, description,
          src: variant.file, cssFilter: null, tileBg: '#F5F5F5',
          source: variant.source || 'upload', status: 'ready', guidance: null,
        }
      }
      // 2. CSS fallback — use variant filter or default brightness(0)
      if (horizontalFile) {
        const css = variant?.filter?.css || 'brightness(0)'
        return {
          type, name, description,
          src: horizontalFile, cssFilter: css, tileBg: '#F5F5F5',
          source: 'css', status: 'css-only', guidance: null,
        }
      }
      return {
        type, name, description,
        src: null, cssFilter: null, tileBg: '#F5F5F5',
        source: 'none', status: 'missing', guidance: GUIDANCE['mono-dark'],
      }
    }
  }
}

export function resolveAllVariants(brand: BrandConfig): ResolvedVariant[] {
  return VARIANT_ORDER.map(type => resolveVariant(brand, type))
}

export function getCompletenessScore(brand: BrandConfig): CompletenessScore {
  const all = resolveAllVariants(brand)
  return {
    ready: all.filter(v => v.status === 'ready').length,
    cssOnly: all.filter(v => v.status === 'css-only').length,
    missing: all.filter(v => v.status === 'missing').length,
    total: 5,
  }
}

export function getSourceLabel(source: ResolvedVariant['source']): string | null {
  switch (source) {
    case 'ai': return 'AI'
    case 'sharp': return 'Sharp'
    case 'css': return 'CSS'
    default: return null
  }
}
