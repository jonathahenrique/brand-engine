import type { BrandConfig } from '@/types/brand'

/**
 * Detect if a brand logo is a wordmark (text-only) or has a separable icon.
 */
function isWordmarkLogo(brand: BrandConfig): boolean {
  if (brand.logo.icon) return false
  if (brand.logo.variants.some(v => v.type === 'icon' && v.file)) return false
  return true
}

/**
 * Build a prompt to generate a brand logo from scratch using AI.
 * Structure: Background → Subject → Details → Constraints → Output
 */
export function buildLogoGenerationPrompt(brand: BrandConfig): string {
  const headingFont = brand.typography.stack.find(f => f.role === 'display')?.font || 'geometric sans-serif'
  const traits = brand.personality.traits.map(t => t.trait).join(', ')
  const wordmark = isWordmarkLogo(brand)
  const logoStyle = wordmark
    ? 'wordmark (text-only logo, no icon or symbol)'
    : 'combination mark (icon/symbol + brand name text)'

  return [
    `Create a professional ${logoStyle} on a TRANSPARENT background.`,
    ``,
    `BRAND: "${brand.name}"`,
    `Tagline: "${brand.tagline}"`,
    `Industry: ${brand.niche}`,
    brand.logo.concept ? `Logo concept: ${brand.logo.concept}` : '',
    brand.logo.description ? `Visual reference: ${brand.logo.description}` : '',
    ``,
    `EXACT COLORS — use these hex values precisely:`,
    `- Primary: ${brand.theme.primary} (main logo element)`,
    `- Secondary: ${brand.theme.secondary} (accent or text)`,
    `- NO other colors allowed`,
    ``,
    `TYPOGRAPHY:`,
    `- Style direction: ${headingFont}`,
    `- Spell the brand name exactly: ${brand.name.split('').join(' - ')}`,
    `- Each character must be PERFECTLY legible and correctly formed`,
    `- Font weight: bold or semi-bold, clean kerning`,
    ``,
    `PERSONALITY:`,
    `- Archetype: ${brand.personality.archetype}`,
    `- Traits: ${traits}`,
    `- Design style: flat, modern, vector-style with crisp edges`,
    ``,
    `DO NOT INCLUDE:`,
    `- Mockups, device frames, or context scenes`,
    `- Drop shadows, bevels, or 3D effects`,
    `- Borders or decorative frames`,
    `- Colors outside the specified palette`,
    `- Watermarks or placeholder text`,
    `- Busy or cluttered compositions`,
    `- Photographic or photorealistic elements`,
    ``,
    `OUTPUT:`,
    `- Transparent background (RGBA PNG)`,
    `- 1024x1024 pixels`,
    `- Logo centered, occupying ~60-70% of canvas`,
    `- Clean, scalable, agency-quality design`,
    `- Must work at 32px (favicon) and 2000px+ (print)`,
  ].filter(Boolean).join('\n')
}

/**
 * Build a prompt to extract the icon/symbol from an existing logo.
 * Handles both icon-wordmark logos AND pure wordmarks (derives monogram).
 */
export function buildIconExtractionPrompt(brand: BrandConfig): string {
  const wordmark = isWordmarkLogo(brand)

  if (wordmark) {
    return [
      `TASK: Create an ICONIC MONOGRAM derived from this text-only logo (wordmark).`,
      ``,
      `ANALYSIS STEP — examine the source image:`,
      `1. This logo is a WORDMARK — all text, no separate icon to extract`,
      `2. Study the distinctive characteristics: letter shapes, angles, custom forms`,
      `3. Note the EXACT colors used in the original`,
      ``,
      `DERIVATION APPROACH:`,
      `- Create a monogram using the first letter "${brand.name.charAt(0)}" in the EXACT typographic style`,
      `- Preserve the visual DNA: same angles, line weights, and character of the wordmark`,
      `- Use ONLY these colors: ${brand.theme.primary}, ${brand.theme.secondary}`,
      brand.logo.concept ? `- Visual reference: ${brand.logo.concept}` : '',
      ``,
      `STRICT CONSTRAINTS:`,
      `- The monogram must feel like it belongs to the same brand`,
      `- Use the same visual language (geometry, weight, style) as the wordmark`,
      `- Do NOT invent a random icon — derive from the typography`,
      `- Do NOT add shadows, glows, or effects`,
      ``,
      `OUTPUT:`,
      `- Square 1:1 aspect ratio`,
      `- Transparent background (RGBA PNG)`,
      `- Symbol centered, filling ~70% of frame`,
      `- Clean edges, professional quality`,
      `- Must work at 16x16 (favicon) and 512x512`,
    ].filter(Boolean).join('\n')
  }

  return [
    `TASK: Extract ONLY the icon/symbol from the attached logo image.`,
    ``,
    `ANALYSIS STEP — examine the source image carefully:`,
    `1. Identify the GRAPHIC SYMBOL (icon, emblem, mark — the non-text element)`,
    `2. Identify the TEXT (brand name, tagline, all lettering)`,
    `3. Note exact: colors (hex values), gradients, line weights, proportions`,
    ``,
    `WHAT TO KEEP — forensic fidelity:`,
    `- The graphic symbol/icon ONLY`,
    brand.logo.concept ? `- The element representing: ${brand.logo.concept}` : '',
    `- EXACT original colors — do not shift even by 1 shade`,
    `- EXACT proportions and stroke weights`,
    `- Any gradients exactly as they appear`,
    `- Transparency (alpha channel)`,
    ``,
    `WHAT TO REMOVE:`,
    `- ALL text characters (brand name, tagline, every letter)`,
    `- Decorative elements attached to text (underlines, brackets, chevrons)`,
    `- Compositional spacers or dividers between icon and text`,
    ``,
    `STRICT CONSTRAINTS:`,
    `- Do NOT add any element not in the original`,
    `- Do NOT change colors, even slightly`,
    `- Do NOT add shadows, glows, or effects not in the original`,
    `- Do NOT simplify or "clean up" — preserve exact detail level`,
    `- Do NOT invent — EXTRACT what exists`,
    ``,
    `OUTPUT:`,
    `- Square 1:1 aspect ratio`,
    `- Transparent background`,
    `- Icon centered, filling ~80% of frame`,
    `- Clean edges, no text-removal artifacts`,
  ].filter(Boolean).join('\n')
}

/**
 * Build a prompt to rearrange a logo into a stacked/vertical layout.
 * Handles both icon-wordmark and wordmark logos.
 */
export function buildStackedLayoutPrompt(brand: BrandConfig): string {
  const wordmark = isWordmarkLogo(brand)

  return [
    `TASK: Recreate this logo in a STACKED (vertical) arrangement.`,
    ``,
    `SOURCE ANALYSIS — examine the attached logo:`,
    `1. Identify every visual element: icon/symbol, text, decorative elements`,
    `2. Record exact typography: font style, weight, case, letter-spacing`,
    `3. Record exact colors: primary ${brand.theme.primary}, secondary ${brand.theme.secondary}`,
    `4. Record line weights and proportions of all elements`,
    ``,
    wordmark
      ? [
          `LAYOUT — This is a WORDMARK (text-only logo):`,
          `- Split the text into a natural two-line stack if single line`,
          `- Center-align both lines`,
          `- Maintain exact same font style, weight, and color`,
          `- Line spacing: ~130% of text height`,
        ].join('\n')
      : [
          `LAYOUT — Vertical stack:`,
          `- TOP: Icon/symbol, centered horizontally`,
          `- GAP: ~15-20% of icon height`,
          `- BOTTOM: Wordmark/text, centered horizontally`,
          `- Icon should be ~1.5x the cap-height of the text`,
        ].join('\n'),
    ``,
    `FIDELITY IS THE #1 PRIORITY:`,
    `- Reproduce the EXACT icon from the source — do not redraw or simplify`,
    `- Reproduce the EXACT text with identical font, weight, case, kerning`,
    `- Use ONLY colors from the original`,
    `- Preserve every detail: gradients, rounded corners, stroke widths`,
    `- This must look like the SAME logo, just rearranged`,
    brand.logo.concept ? `- Logo concept for reference: ${brand.logo.concept}` : '',
    ``,
    `DO NOT:`,
    `- Add new elements, shadows, or effects`,
    `- Change any color values`,
    `- Change font weight, style, or case`,
    `- Add a background color (must be transparent)`,
    `- Add borders or containing shapes`,
    ``,
    `OUTPUT:`,
    `- Transparent background (RGBA PNG)`,
    `- Slightly portrait aspect ratio (~3:4)`,
    `- All elements centered on canvas`,
    `- Clean vector-style rendering, crisp edges`,
  ].filter(Boolean).join('\n')
}
