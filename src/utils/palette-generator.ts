/**
 * Palette Generator — OKLCH-based color derivation
 *
 * Generates complete brand palettes from primary + secondary hex colors.
 * All conversions inline (zero external dependencies).
 * Reuses hexToRgb, calculateContrast, getWcagRating from ./color.ts
 */

import { hexToRgb, calculateContrast, getWcagRating } from './color'

// ─── Types ───────────────────────────────────────────────────────────────────

export interface OklchColor {
  L: number // Lightness [0, 1]
  C: number // Chroma [0, ~0.4]
  H: number // Hue [0, 360)
}

export interface PaletteInput {
  primary: string   // hex
  secondary: string // hex
  accent?: string   // hex (optional)
  mode?: 'dark' | 'light'
}

export interface PaletteTheme {
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
}

export interface PaletteToken {
  token: string
  name: string
  hex: string
  usage: string
}

export interface ContrastCheck {
  pair: string
  ratio: number
  rating: string
  pass: boolean
}

export interface GeneratedPalette {
  theme: PaletteTheme
  dark: PaletteToken[]
  light: PaletteToken[]
  contrast: ContrastCheck[]
}

// ─── OKLCH ↔ HEX Conversion ─────────────────────────────────────────────────

// sRGB gamma decode: sRGB [0,1] → linear [0,1]
function gammaDecode(c: number): number {
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
}

// sRGB gamma encode: linear [0,1] → sRGB [0,1]
function gammaEncode(c: number): number {
  return c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055
}

function clamp01(v: number): number {
  return Math.max(0, Math.min(1, v))
}

/**
 * HEX → OKLCH
 *
 * Pipeline: HEX → sRGB → gamma decode → Linear RGB → LMS (matrix) → cbrt → OKLab (matrix) → OKLCH (polar)
 */
export function hexToOklch(hex: string): OklchColor {
  const rgb = hexToRgb(hex)
  if (!rgb) return { L: 0, C: 0, H: 0 }

  // sRGB [0,255] → linear [0,1]
  const lr = gammaDecode(rgb.r / 255)
  const lg = gammaDecode(rgb.g / 255)
  const lb = gammaDecode(rgb.b / 255)

  // Linear RGB → LMS (using OKLab M1 matrix)
  const l = 0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb
  const m = 0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb
  const s = 0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb

  // Cube root
  const lc = Math.cbrt(l)
  const mc = Math.cbrt(m)
  const sc = Math.cbrt(s)

  // LMS (cuberoot) → OKLab (M2 matrix)
  const L = 0.2104542553 * lc + 0.7936177850 * mc - 0.0040720468 * sc
  const a = 1.9779984951 * lc - 2.4285922050 * mc + 0.4505937099 * sc
  const b = 0.0259040371 * lc + 0.7827717662 * mc - 0.8086757660 * sc

  // OKLab → OKLCH (polar)
  const C = Math.sqrt(a * a + b * b)
  let H = (Math.atan2(b, a) * 180) / Math.PI
  if (H < 0) H += 360

  return { L, C, H }
}

/**
 * OKLCH → HEX
 *
 * Pipeline: OKLCH → OKLab → cube → LMS → Linear RGB → gamma encode → clamp → HEX
 */
export function oklchToHex(L: number, C: number, H: number): string {
  // OKLCH → OKLab
  const hRad = (H * Math.PI) / 180
  const a = C * Math.cos(hRad)
  const b = C * Math.sin(hRad)

  // OKLab → LMS (cuberoot) — inverse of M2
  const lc = L + 0.3963377774 * a + 0.2158037573 * b
  const mc = L - 0.1055613458 * a - 0.0638541728 * b
  const sc = L - 0.0894841775 * a - 1.2914855480 * b

  // Cube (undo cbrt)
  const l = lc * lc * lc
  const m = mc * mc * mc
  const s = sc * sc * sc

  // LMS → Linear RGB — inverse of M1
  const lr = +4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s
  const lg = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s
  const lb = -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s

  // Gamma encode + clamp to sRGB
  const r = Math.round(clamp01(gammaEncode(lr)) * 255)
  const g = Math.round(clamp01(gammaEncode(lg)) * 255)
  const bVal = Math.round(clamp01(gammaEncode(lb)) * 255)

  return '#' + [r, g, bVal].map(v => v.toString(16).padStart(2, '0')).join('').toUpperCase()
}

/**
 * Format as CSS oklch() string
 */
export function formatOklch(L: number, C: number, H: number): string {
  return `oklch(${L.toFixed(3)} ${C.toFixed(3)} ${H.toFixed(1)})`
}

// ─── Color Manipulation ─────────────────────────────────────────────────────

/**
 * Darken a hex color by reducing OKLCH lightness
 * @param amount - lightness reduction [0, 1] (e.g. 0.06 = 6% darker)
 */
export function darkenHex(hex: string, amount: number): string {
  const { L, C, H } = hexToOklch(hex)
  return oklchToHex(Math.max(0, L - amount), C, H)
}

/**
 * Lighten a hex color by increasing OKLCH lightness
 * @param amount - lightness increase [0, 1]
 */
export function lightenHex(hex: string, amount: number): string {
  const { L, C, H } = hexToOklch(hex)
  return oklchToHex(Math.min(1, L + amount), C, H)
}

/**
 * Desaturate a hex color by reducing OKLCH chroma
 * @param factor - chroma multiplier [0, 1] (e.g. 0.5 = half chroma)
 */
export function desaturateHex(hex: string, factor: number): string {
  const { L, C, H } = hexToOklch(hex)
  return oklchToHex(L, C * factor, H)
}

/**
 * Convert hex to rgba string with opacity
 */
export function toMutedRgba(hex: string, opacity: number): string {
  const rgb = hexToRgb(hex)
  if (!rgb) return `rgba(0,0,0,${opacity})`
  return `rgba(${rgb.r},${rgb.g},${rgb.b},${opacity})`
}

// ─── Palette Generator ──────────────────────────────────────────────────────

/**
 * Generate a complete brand palette from primary + secondary hex colors.
 *
 * Dark mode derivations use OKLCH perceptual lightness for accurate results.
 * Light mode inverts the relationship.
 */
export function generatePalette(input: PaletteInput): GeneratedPalette {
  const { primary, secondary, mode = 'dark' } = input

  const pri = hexToOklch(primary)
  const sec = hexToOklch(secondary)

  let theme: PaletteTheme
  let dark: PaletteToken[]
  let light: PaletteToken[]

  if (mode === 'dark') {
    // ── Dark mode derivations ──
    const bgL = Math.min(sec.L, 0.15)
    const bgC = sec.C * 0.6
    const bgHex = oklchToHex(bgL, bgC, sec.H)
    const surfaceHex = oklchToHex(bgL + 0.05, bgC, sec.H)
    const surfaceHoverHex = oklchToHex(bgL + 0.10, bgC, sec.H)

    const primaryHoverHex = oklchToHex(Math.max(0, pri.L - 0.06), pri.C, pri.H)
    const primaryDeepHex = oklchToHex(Math.max(0, pri.L - 0.12), pri.C, pri.H)
    const primaryMutedRgba = toMutedRgba(primary, 0.12)

    const secondaryHoverHex = oklchToHex(Math.min(1, sec.L + 0.06), sec.C, sec.H)
    const secondaryDeepHex = oklchToHex(Math.max(0, sec.L - 0.06), sec.C, sec.H)
    const secondaryMutedRgba = toMutedRgba(secondary, 0.12)

    const textHex = '#F5F5F5'
    const textSecondaryHex = oklchToHex(0.70, sec.C * 0.3, sec.H)
    const textTertiaryHex = oklchToHex(0.55, sec.C * 0.3, sec.H)

    const borderRgba = toMutedRgba(secondary, 0.22)
    const borderSubtleRgba = toMutedRgba(secondary, 0.10)

    theme = {
      bg: bgHex,
      surface: surfaceHex,
      surfaceHover: surfaceHoverHex,
      primary,
      primaryHover: primaryHoverHex,
      primaryDeep: primaryDeepHex,
      primaryMuted: primaryMutedRgba,
      secondary,
      secondaryHover: secondaryHoverHex,
      secondaryDeep: secondaryDeepHex,
      secondaryMuted: secondaryMutedRgba,
      text: textHex,
      textSecondary: textSecondaryHex,
      textTertiary: textTertiaryHex,
      border: borderRgba,
      borderSubtle: borderSubtleRgba,
    }

    dark = [
      { token: 'bg-deep', name: 'Background', hex: bgHex, usage: 'Background principal' },
      { token: 'bg-surface', name: 'Surface', hex: surfaceHex, usage: 'Cards, superfícies' },
      { token: 'bg-elevated', name: 'Elevated', hex: surfaceHoverHex, usage: 'Hover de card, dropdowns' },
      { token: 'primary-base', name: 'Primary', hex: primary, usage: 'CTA, highlights' },
      { token: 'primary-hover', name: 'Primary Hover', hex: primaryHoverHex, usage: 'Hover do primary' },
      { token: 'primary-deep', name: 'Primary Deep', hex: primaryDeepHex, usage: 'Pressed state' },
      { token: 'secondary-base', name: 'Secondary', hex: secondary, usage: 'Secondary actions, accents' },
      { token: 'secondary-hover', name: 'Secondary Hover', hex: secondaryHoverHex, usage: 'Hover do secondary' },
      { token: 'secondary-deep', name: 'Secondary Deep', hex: secondaryDeepHex, usage: 'Pressed state' },
      { token: 'text-primary', name: 'Text', hex: textHex, usage: 'Texto principal' },
      { token: 'text-secondary', name: 'Text Secondary', hex: textSecondaryHex, usage: 'Texto secundário' },
      { token: 'text-tertiary', name: 'Text Tertiary', hex: textTertiaryHex, usage: 'Placeholders, disabled' },
    ]

    light = [
      { token: 'bg-light', name: 'Light BG', hex: '#FAFAFA', usage: 'Background seções claras' },
      { token: 'surface-light', name: 'Light Surface', hex: '#F0F0F0', usage: 'Cards em seções claras' },
      { token: 'primary-light', name: 'Primary Light', hex: primaryDeepHex, usage: 'Primary em contexto claro' },
      { token: 'secondary-light', name: 'Secondary Light', hex: secondary, usage: 'Secondary em contexto claro' },
      { token: 'text-light', name: 'Dark Text', hex: surfaceHex, usage: 'Texto em fundo claro' },
      { token: 'text-secondary-light', name: 'Dark Text Secondary', hex: secondary, usage: 'Texto secundário em fundo claro' },
      { token: 'border-light', name: 'Light Border', hex: toMutedRgba(secondary, 0.12), usage: 'Bordas em fundo claro' },
    ]
  } else {
    // ── Light mode derivations ──
    const bgHex = '#FAFAFA'
    const surfaceHex = '#FFFFFF'
    const surfaceHoverHex = '#F5F5F5'

    const primaryHoverHex = oklchToHex(Math.min(1, pri.L + 0.06), pri.C, pri.H)
    const primaryDeepHex = oklchToHex(Math.max(0, pri.L - 0.06), pri.C, pri.H)
    const primaryMutedRgba = toMutedRgba(primary, 0.08)

    const secondaryHoverHex = oklchToHex(Math.min(1, sec.L + 0.06), sec.C, sec.H)
    const secondaryDeepHex = oklchToHex(Math.max(0, sec.L - 0.06), sec.C, sec.H)
    const secondaryMutedRgba = toMutedRgba(secondary, 0.08)

    const textHex = '#1A1A1A'
    const textSecondaryHex = oklchToHex(0.40, sec.C * 0.3, sec.H)
    const textTertiaryHex = oklchToHex(0.55, sec.C * 0.3, sec.H)

    const borderRgba = toMutedRgba(secondary, 0.15)
    const borderSubtleRgba = toMutedRgba(secondary, 0.08)

    theme = {
      bg: bgHex,
      surface: surfaceHex,
      surfaceHover: surfaceHoverHex,
      primary,
      primaryHover: primaryHoverHex,
      primaryDeep: primaryDeepHex,
      primaryMuted: primaryMutedRgba,
      secondary,
      secondaryHover: secondaryHoverHex,
      secondaryDeep: secondaryDeepHex,
      secondaryMuted: secondaryMutedRgba,
      text: textHex,
      textSecondary: textSecondaryHex,
      textTertiary: textTertiaryHex,
      border: borderRgba,
      borderSubtle: borderSubtleRgba,
    }

    dark = [
      { token: 'bg-dark', name: 'Dark BG', hex: oklchToHex(Math.min(sec.L, 0.15), sec.C * 0.6, sec.H), usage: 'Background dark sections' },
      { token: 'surface-dark', name: 'Dark Surface', hex: oklchToHex(Math.min(sec.L, 0.15) + 0.05, sec.C * 0.6, sec.H), usage: 'Cards dark' },
      { token: 'primary-base', name: 'Primary', hex: primary, usage: 'CTA, highlights' },
      { token: 'secondary-base', name: 'Secondary', hex: secondary, usage: 'Secondary actions' },
      { token: 'text-dark', name: 'Dark Text', hex: '#F5F5F5', usage: 'Texto em dark sections' },
    ]

    light = [
      { token: 'bg-light', name: 'Background', hex: bgHex, usage: 'Background principal' },
      { token: 'surface-light', name: 'Surface', hex: surfaceHex, usage: 'Cards, superfícies' },
      { token: 'bg-elevated', name: 'Elevated', hex: surfaceHoverHex, usage: 'Hover de card' },
      { token: 'primary-base', name: 'Primary', hex: primary, usage: 'CTA, highlights' },
      { token: 'primary-hover', name: 'Primary Hover', hex: primaryHoverHex, usage: 'Hover do primary' },
      { token: 'primary-deep', name: 'Primary Deep', hex: primaryDeepHex, usage: 'Pressed state' },
      { token: 'secondary-base', name: 'Secondary', hex: secondary, usage: 'Secondary actions' },
      { token: 'secondary-hover', name: 'Secondary Hover', hex: secondaryHoverHex, usage: 'Hover do secondary' },
      { token: 'secondary-deep', name: 'Secondary Deep', hex: secondaryDeepHex, usage: 'Pressed state' },
      { token: 'text-primary', name: 'Text', hex: textHex, usage: 'Texto principal' },
      { token: 'text-secondary', name: 'Text Secondary', hex: textSecondaryHex, usage: 'Texto secundário' },
      { token: 'text-tertiary', name: 'Text Tertiary', hex: textTertiaryHex, usage: 'Placeholders' },
    ]
  }

  // ── WCAG Contrast checks ──
  const contrast: ContrastCheck[] = [
    (() => {
      const ratio = calculateContrast(primary, theme.bg)
      const { level, pass } = getWcagRating(ratio)
      return { pair: `primary (${primary}) on bg (${theme.bg})`, ratio: Math.round(ratio * 100) / 100, rating: level, pass }
    })(),
    (() => {
      const ratio = calculateContrast(theme.text, theme.bg)
      const { level, pass } = getWcagRating(ratio)
      return { pair: `text (${theme.text}) on bg (${theme.bg})`, ratio: Math.round(ratio * 100) / 100, rating: level, pass }
    })(),
    (() => {
      const ratio = calculateContrast(primary, theme.surface)
      const { level, pass } = getWcagRating(ratio)
      return { pair: `primary (${primary}) on surface (${theme.surface})`, ratio: Math.round(ratio * 100) / 100, rating: level, pass }
    })(),
  ]

  return { theme, dark, light, contrast }
}
