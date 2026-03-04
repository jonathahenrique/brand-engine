import type { BrandConfig } from '@/types/brand'

/**
 * Build a prompt to generate a brand logo from scratch using AI.
 * Uses brand identity, colors, typography, personality and niche.
 */
export function buildLogoGenerationPrompt(brand: BrandConfig): string {
  const headingFont = brand.typography.stack.find(f => f.role === 'display')?.font || 'geometric sans-serif'
  const traits = brand.personality.traits.map(t => t.trait).join(', ')

  return [
    `Create a professional logo for the brand "${brand.name}".`,

    `BRAND IDENTITY:`,
    `- Tagline: "${brand.tagline}"`,
    `- Niche: ${brand.niche}`,
    `- Archetype: ${brand.personality.archetype}`,
    `- Personality: ${traits}`,
    brand.logo.concept ? `- Logo concept: ${brand.logo.concept}` : '',
    brand.logo.description ? `- Description: ${brand.logo.description}` : '',

    `COLOR PALETTE — USE THESE EXACT COLORS:`,
    `- Primary: ${brand.theme.primary}`,
    `- Secondary: ${brand.theme.secondary}`,
    `- Background: ${brand.theme.bg}`,

    `TYPOGRAPHY DIRECTION:`,
    `- Style: ${headingFont}, modern, clean`,

    `REQUIREMENTS:`,
    `- Transparent background (PNG with alpha)`,
    `- 1024x1024 pixels`,
    `- Clean vector-style design, crisp edges`,
    `- Render the brand name "${brand.name}" with PERFECT letter accuracy`,
    `- Each character must be clearly legible and correctly formed`,
    `- Professional, agency-quality result`,
    `- Suitable for web, print, and social media`,

    `DO NOT INCLUDE:`,
    `- Mockups, device frames, or context scenes`,
    `- Drop shadows, bevels, or 3D effects`,
    `- Borders or decorative frames around the logo`,
    `- Colors outside the brand palette`,
    `- Watermarks or placeholder text`,
    `- Busy or cluttered compositions`,
  ].filter(Boolean).join('\n')
}

/**
 * Build a prompt to extract the icon/symbol from an existing logo.
 * Instructs AI to remove text and keep only the graphic symbol.
 */
export function buildIconExtractionPrompt(brand: BrandConfig): string {
  return [
    `Extract ONLY the icon/symbol from this logo image. Remove ALL text, wordmarks, and typographic elements.`,

    `WHAT TO KEEP:`,
    `- The graphic symbol, icon, or emblem only`,
    brand.logo.concept ? `- The element representing: ${brand.logo.concept}` : '',
    `- Exact original colors and gradients`,
    `- Transparency (alpha channel)`,

    `WHAT TO REMOVE:`,
    `- ALL text (brand name, tagline, any letters)`,
    `- Decorative text elements (chevrons, brackets around text)`,
    `- Any non-symbol elements`,

    `OUTPUT REQUIREMENTS:`,
    `- Square aspect ratio (1:1)`,
    `- Transparent background`,
    `- Symbol centered and filling the frame`,
    `- Clean edges, no artifacts from text removal`,
    `- Ready for use as favicon, app icon, or profile picture`,
  ].filter(Boolean).join('\n')
}
