import type { BrandConfig } from '@/types/brand'

export type TemplateKind = 'post' | 'story' | 'banner'

export interface PromptContext {
  kind: TemplateKind
  headline: string
  body?: string
  postType?: string
}

interface FormatSpec {
  size: string
  ratio: string
  label: string
}

const FORMAT_MAP: Record<TemplateKind, FormatSpec> = {
  post: { size: '1024x1280', ratio: '4:5', label: 'Instagram feed post' },
  story: { size: '1024x1792', ratio: '9:16', label: 'Instagram story' },
  banner: { size: '1792x1024', ratio: '16:9', label: 'social media banner' },
}

export function getImageSize(kind: TemplateKind): string {
  return FORMAT_MAP[kind].size
}

/**
 * Constrói um prompt assertivo para geração de imagem usando TODOS os dados
 * disponíveis no BrandConfig: identidade, personalidade, voz, direção visual,
 * paleta de cores, tipografia, texturas e público-alvo.
 *
 * ~20 campos da marca usados para máxima fidelidade ao branding.
 */
export function buildImagePrompt(brand: BrandConfig, ctx: PromptContext): string {
  const format = FORMAT_MAP[ctx.kind]
  const traits = brand.personality.traits.map((t) => t.trait).join(', ')
  const voiceTraits = brand.voice.personality.is.map((t) => t.trait).join(', ')
  const headingFont = brand.typography.stack.find((f) => f.role === 'display')
  const bodyFont = brand.typography.stack.find((f) => f.role === 'body')
  const colorPhilosophy = brand.colors.philosophy.split('.')[0]

  return [
    // 1. MEDIUM & FORMAT
    `Create a professional ${format.label} design. ` +
      `Format: ${format.ratio} portrait (${format.size.replace('x', ' x ')} px). ` +
      `High-resolution, print-ready, polished social media graphic.`,

    // 2. BRAND IDENTITY
    `BRAND: "${brand.name}" — "${brand.tagline}"\n` +
      `Niche: ${brand.niche}. Brand archetype: ${brand.personality.archetype}.\n` +
      `Personality traits: ${traits}.\n` +
      `Voice & tone: ${brand.voice.tone} (${voiceTraits}).\n` +
      `Target audience: ${brand.audience.primary}.`,

    // 3. VISUAL DIRECTION (photography/art direction)
    `VISUAL DIRECTION:\n` +
      `- Overall style: ${brand.photography.style}\n` +
      `- Lighting: ${brand.photography.lighting}\n` +
      `- Composition: ${brand.photography.composition}\n` +
      `- Color treatment: ${brand.photography.colorTreatment}\n` +
      `- Visual subjects: ${brand.photography.subjects.join(', ')}` +
      (brand.textures.grain
        ? `\n- Apply subtle grain texture (opacity ${brand.textures.grainOpacity})`
        : '') +
      (brand.textures.style !== 'clean'
        ? `\n- Texture style: ${brand.textures.style}`
        : ''),

    // 4. COLOR PALETTE (exact values, mandatory)
    `COLOR PALETTE — USE THESE EXACT BRAND COLORS:\n` +
      `- Primary accent: ${brand.theme.primary}\n` +
      `- Secondary: ${brand.theme.secondary}\n` +
      `- Background base: ${brand.theme.bg}\n` +
      `- Text primary: ${brand.theme.text}\n` +
      `- Text secondary: ${brand.theme.textSecondary}\n` +
      `${colorPhilosophy}.\n` +
      `The primary color ${brand.theme.primary} must be the dominant accent. ` +
      `The secondary color ${brand.theme.secondary} is used sparingly as complement.`,

    // 5. TYPOGRAPHY DIRECTION
    `TYPOGRAPHY:\n` +
      `- Headlines: ${headingFont?.font || 'geometric sans-serif'} style, ` +
      `weight ${headingFont?.weights?.split(',')[headingFont.weights.split(',').length - 1]?.trim() || 'bold'}, modern\n` +
      `- Body text: ${bodyFont?.font || 'clean sans-serif'} style, clean and highly readable\n` +
      `- Text must have high contrast against the background\n` +
      `- Clear typographic hierarchy: headline large and bold, body smaller and lighter`,

    // 6. CONTENT TO RENDER
    `CONTENT TO DISPLAY IN THE DESIGN:\n` +
      `- Main headline: "${ctx.headline}"\n` +
      (ctx.body ? `- Supporting text: "${ctx.body}"\n` : '') +
      (ctx.postType ? `- Content category: ${ctx.postType}\n` : '') +
      `- Include the brand name "${brand.name}" subtly (small text or logo area)\n` +
      `- Text must be perfectly legible — never obscured by images or effects`,

    // 7. DESIGN REQUIREMENTS
    `DESIGN REQUIREMENTS:\n` +
      `- Professional, agency-quality social media design\n` +
      `- Clear visual hierarchy: headline → supporting text → brand\n` +
      `- Balanced composition with breathing room (whitespace)\n` +
      `- Modern ${brand.shape.radiusLg !== '0px' ? 'rounded corners' : 'sharp edges'} aesthetic\n` +
      `- Layout optimized for ${format.label} (${format.ratio})\n` +
      `- The design should feel like it belongs to the "${brand.name}" brand ecosystem`,

    // 8. NEGATIVE PROMPT (what to avoid)
    `DO NOT INCLUDE:\n` +
      `- ${brand.photography.avoid.join('\n- ')}\n` +
      `- ${brand.personality.isNot.join('\n- ')}\n` +
      `- Blurry, pixelated, or low-quality elements\n` +
      `- Cluttered or chaotic layouts\n` +
      `- Illegible or poorly contrasted text\n` +
      `- Watermarks, stock photo marks, or placeholder text\n` +
      `- Colors outside the brand palette specified above`,
  ].join('\n\n')
}
