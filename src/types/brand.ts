/* ══════════════════════════════════════════════════════════
   Brand Engine — BrandConfig Schema
   Tipos completos para o sistema de criacao de identidade
   ══════════════════════════════════════════════════════════ */

/* ── Primitives ── */

export interface ColorToken {
  token: string
  name: string
  hex: string
  oklch?: string
  usage: string
}

export interface TypeLevel {
  name: string
  desktop: string
  mobile: string
  lineHeight: string
  font: 'heading' | 'body' | 'mono'
  weight: string
  letterSpacing?: string
  usage: string
}

export interface FontStack {
  role: 'display' | 'body' | 'mono'
  font: string
  source: string
  license: string
  weights: string
  variable?: boolean
}

export interface MotionToken {
  name: string
  value: string
  usage: string
}

export interface MicroAnimation {
  element: string
  behavior: string
  duration: string
  easing: string
}

export interface VoiceRule {
  rule: string
  example: string
  bad?: string
}

export interface Trait {
  trait: string
  desc: string
}

export interface BrandValue {
  title: string
  description: string
}

export type LogoVariantType =
  | 'horizontal'   // Logo completo horizontal (principal)
  | 'stacked'      // Logo empilhado/vertical
  | 'icon'         // Somente ícone/símbolo
  | 'mono-light'   // Monocromático claro (branco) — para fundos escuros
  | 'mono-dark'    // Monocromático escuro (preto) — para fundos claros

export interface LogoVariant {
  name: string
  type: LogoVariantType
  description: string
  file?: string
  lightFile?: string
  filter?: { css: string; bg: string }
  source?: 'upload' | 'sharp' | 'ai'
}

export interface DosAndDonts {
  do: string[]
  dont: string[]
}

export interface SpacingToken {
  name: string
  value: string
  px: number
}

/* ── Niche ── */

export type NicheCategory =
  | 'educacao'
  | 'saude'
  | 'servicos'
  | 'tech'
  | 'gastronomia'
  | 'fitness'
  | 'moda'
  | 'imobiliario'
  | 'pet'
  | 'beleza'
  | 'financas'
  | 'criativo'
  | 'varejo'
  | 'outro'

/* ── Motion Profile ── */

export type MotionProfile = 'calm' | 'precise' | 'energetic' | 'organic' | 'minimal'

/* ── Texture Style ── */

export type TextureStyle = 'clean' | 'textured' | 'editorial' | 'organic'

/* ── Brand Archetype ── */

export type BrandArchetype =
  | 'O Especialista'
  | 'O Rebelde'
  | 'O Cuidador'
  | 'O Criador'
  | 'O Explorador'
  | 'O Heroi'
  | 'O Mago'
  | 'O Amante'
  | 'O Bobo'
  | 'O Inocente'
  | 'O Sabio'
  | 'O Governante'

/* ── Mockup Types ── */

export interface MockupPost {
  type: 'quote' | 'tip' | 'stats' | 'testimonial' | 'cta' | 'carousel-cover'
  headline: string
  body?: string
  accent?: string
}

export interface MockupThumb {
  headline: string
  style: 'face-text' | 'before-after' | 'numbered' | 'dramatic' | 'tutorial'
}

export interface MockupNewsletter {
  subject: string
  headline: string
  body: string[]
  ctaText: string
}

export interface MockupHero {
  headline: string
  subheadline: string
  ctaText: string
  ctaSecondary?: string
}

/* ══════════════════════════════════════════════════════════
   BrandConfig — O tipo principal
   ══════════════════════════════════════════════════════════ */

export interface BrandConfig {
  // --- Identidade ---
  slug: string
  name: string
  tagline: string
  purpose: string
  niche: NicheCategory
  description: string

  // --- Audiencia ---
  audience: {
    primary: string
    pain: string
    desire: string
  }

  // --- Estrategia ---
  positioning: {
    category: string
    differentiator: string
    promise: string
  }

  personality: {
    archetype: BrandArchetype
    traits: Trait[]
    isNot: string[]
  }

  values: BrandValue[]

  // --- Voz & Tom ---
  voice: {
    archetype: string
    tone: string
    personality: {
      is: Trait[]
      isNot: string[]
    }
    rules: VoiceRule[]
    references: string[]
  }

  // --- Design System ---
  shape: {
    radiusSm: string
    radiusMd: string
    radiusLg: string
    shadowElevated: string
    shadowModal: string
    borderWidth: string
  }

  theme: {
    bg: string
    surface: string
    surfaceHover: string
    primary: string
    primaryHover: string
    primaryDeep: string
    primaryMuted: string
    secondary: string
    secondaryHover: string
    secondaryDeep: string
    secondaryMuted: string
    text: string
    textSecondary: string
    textTertiary: string
    border: string
    borderSubtle: string
    accent?: string
    accentOnDark?: string
  }

  colors: {
    philosophy: string
    dark: ColorToken[]
    light: ColorToken[]
    primaryUsage: DosAndDonts
    secondaryUsage: DosAndDonts
  }

  typography: {
    stack: FontStack[]
    scale: TypeLevel[]
    rules: string[]
  }

  spacing: {
    base: number
    scale: SpacingToken[]
    rules: string[]
  }

  motion: {
    principle: string
    description: string
    profile: MotionProfile
    tokens: MotionToken[]
    microAnimations: MicroAnimation[]
    rules: string[]
  }

  textures: {
    style: TextureStyle
    grain: boolean
    grainOpacity: number
    overlays: string[]
  }

  // --- Logo ---
  logo: {
    concept: string
    description: string
    file?: string
    icon?: string
    transparent?: boolean
    variants: LogoVariant[]
    rules: string[]
    misuse: string[]
  }

  // --- Direcao Visual ---
  photography: {
    style: string
    lighting: string
    composition: string
    colorTreatment: string
    subjects: string[]
    avoid: string[]
  }

  iconography: {
    style: string
    grid: string
    strokeWidth: string
  }

  // --- Mockups de Apresentacao ---
  mockups: {
    instagramPosts: MockupPost[]
    youtubeThumbnails: MockupThumb[]
    newsletter: MockupNewsletter
    landingHero: MockupHero
  }

  // --- Meta ---
  createdAt: string
  updatedAt: string
  completeness: number
  status?: 'draft' | 'published'
  publishedAt?: string
}
