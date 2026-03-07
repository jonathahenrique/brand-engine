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
  dimensions: string
  label: string
}

const FORMAT_MAP: Record<TemplateKind, FormatSpec> = {
  post: { size: '1024x1280', ratio: '4:5', dimensions: '1080 x 1350', label: 'Instagram feed post' },
  story: { size: '1024x1792', ratio: '9:16', dimensions: '1080 x 1920', label: 'Instagram story' },
  banner: { size: '1792x1024', ratio: '16:9', dimensions: '1920 x 1080', label: 'social media banner / cover' },
}

export function getImageSize(kind: TemplateKind): string {
  return FORMAT_MAP[kind].size
}

/* ── Layout descriptions per format ── */

function getLayoutSpec(kind: TemplateKind, postType?: string): string {
  if (kind === 'post') {
    if (postType === 'quote') {
      return `LAYOUT — Quote of Authority:
- Background: deep brand-colored gradient (dark to slightly lighter)
- Large opening quotation mark as decorative element (40% opacity, brand accent color)
- Quote text: bold thick sans-serif, centered, 2-4 lines max
- Attribution: smaller text below quote, lighter opacity
- Brand logo area: small, bottom-right corner
- No photography — pure typographic design`
    }
    if (postType === 'stats') {
      return `LAYOUT — Data/Statistic Highlight:
- Background: brand primary color as dominant
- Large number/statistic: massive bold sans-serif (takes 40% of vertical space)
- Supporting context text below the number: smaller, lighter
- Decorative accent line or shape separating number from text
- Brand logo: small, bottom-left
- Minimalist, data-forward composition`
    }
    // Default post layout (tip / cta / testimonial / carousel-cover)
    return `LAYOUT — Feed Post (4:5 vertical):
- TOP ZONE (30%): brand accent color strip or gradient. Small label/category badge (pill shape, semi-transparent white background).
- MIDDLE ZONE (45%): hero area. Can be a photorealistic photo, an abstract brand-colored composition, or a bold typographic layout. The headline text goes here — bold, thick clean sans-serif, high contrast against background.
- BOTTOM ZONE (25%): supporting text in lighter weight. Brand name or small logo area.
- Think in LAYERS: background (photo or color) → midground (overlay/gradient for text contrast) → foreground (text/badges/logo).
- Safe margins: nothing touches the edges — generous padding all around.`
  }

  if (kind === 'story') {
    return `LAYOUT — Story (9:16 vertical, full-screen):
- TOP ZONE (15%): profile avatar area (small circle) + brand name in small text. Semi-transparent background strip.
- CENTER ZONE (50%): hero area — bold headline text, large and impactful. Can include a photorealistic background image with gradient overlay for text readability.
- BOTTOM ZONE (35%): supporting text + CTA button (pill-shaped, brand accent color, bold sans-serif text inside). Swipe-up indicator or arrow.
- Full-bleed design — content fills the entire 9:16 frame.
- Think in LAYERS: immersive photo background → dark gradient overlay (60-80% opacity) → foreground text and UI elements.`
  }

  // banner
  return `LAYOUT — Banner (16:9 horizontal):
- LEFT ZONE (55%): text content area. Headline in bold thick sans-serif, large. Subtitle below in lighter weight. CTA button or brand pill at bottom.
- RIGHT ZONE (45%): visual area — photorealistic image, abstract brand pattern, or gradient composition.
- Horizontal divider or accent line between zones (brand accent color).
- Brand logo: small, top-left or bottom-left corner.
- Think in LAYERS: color/photo base → gradient transition between zones → foreground text on left.`
}

/* ── Typography description (NEVER include font names) ── */

function describeTypography(brand: BrandConfig): string {
  const headingFont = brand.typography.stack.find((f) => f.role === 'display')
  const bodyFont = brand.typography.stack.find((f) => f.role === 'body')

  // Describe visual characteristics, never the font name
  const headingSource = (headingFont?.source || '').toLowerCase()
  const headingStyle = headingSource.includes('serif') && !headingSource.includes('sans')
    ? 'elegant serif with high contrast strokes'
    : 'thick bold clean geometric sans-serif'

  const bodySource = (bodyFont?.source || '').toLowerCase()
  const bodyStyle = bodySource.includes('serif') && !bodySource.includes('sans')
    ? 'clean readable serif'
    : 'clean modern sans-serif'

  const headingWeight = headingFont?.weights?.split(',').pop()?.trim() || 'bold'

  return `TYPOGRAPHY (describe visually — NEVER mention font family names):
- Headlines: ${headingStyle}, weight ${headingWeight}, uppercase or Title Case. Thick strokes, high visual impact.
- Body/subtitle: ${bodyStyle}, lighter weight than headlines, highly readable.
- ALL text must be SHARP, LEGIBLE, and correctly spelled in Portuguese.
- Clear typographic hierarchy: headline dominant → subtitle secondary → brand tertiary.
- NEVER include font family names in the image — AI models render them as literal text.
- NEVER use serif or italic for headlines unless the brand explicitly requires it.
- Text must have HIGH CONTRAST against its background (use overlays/gradients if needed).`
}

/* ── Color palette section ── */

function describeColors(brand: BrandConfig): string {
  const brandColors = [...brand.colors.dark, ...brand.colors.light]
    .filter(c =>
      !c.token.startsWith('text-') && !c.token.startsWith('bg-') &&
      !c.token.startsWith('border-') && !c.token.startsWith('surface-')
    )
  const unique = brandColors.filter((c, i, arr) => arr.findIndex(x => x.hex === c.hex) === i)
  const extraColors = unique.slice(0, 6).map(c => `  - ${c.token}: ${c.hex}`).join('\n')

  return `COLOR PALETTE — USE THESE EXACT HEX CODES:
Primary accent: ${brand.theme.primary}
Secondary: ${brand.theme.secondary}
Background base: ${brand.theme.bg}
Text primary: ${brand.theme.text}
${brand.theme.primaryDeep ? `Primary deep: ${brand.theme.primaryDeep}` : ''}
${brand.colors.philosophy.split('.')[0]}.

Brand palette extended:
${extraColors}

RULES:
- The primary color ${brand.theme.primary} MUST be the dominant accent in every design.
- The secondary ${brand.theme.secondary} is used sparingly as complement.
- NEVER use colors outside this palette.
- Always specify colors by hex code, not by name.`
}

/* ── Visual direction ── */

function describeVisualDirection(brand: BrandConfig): string {
  const subjects = brand.photography.subjects.join(', ')

  return `VISUAL DIRECTION & PHOTOGRAPHY:
- Style: ${brand.photography.style}
- Composition: ${brand.photography.composition}
- Color treatment: ${brand.photography.colorTreatment}
- Subjects: ${subjects}
${brand.textures.grain ? `- Texture: subtle grain (opacity ${brand.textures.grainOpacity})` : '- Texture: clean, no grain'}
${brand.textures.style !== 'clean' ? `- Texture style: ${brand.textures.style}` : ''}

LIGHTING (apply to ALL designs):
- ${brand.photography.lighting}
- Primary: soft diffused light creating depth and dimension
- Fill: ambient light reducing harsh shadows
- Accent: subtle rim/edge light using brand accent color tones
- Background: soft bokeh or gradient, never flat
- NEVER: harsh direct flash, flat lighting, or color tones outside the brand palette

STYLE LOCK (maintain across ALL generations):
- Color temperature: ${brand.photography.colorTreatment}
- Mood: ${brand.personality.traits.map(t => t.trait.toLowerCase()).slice(0, 3).join(', ')} — matching the "${brand.personality.archetype}" archetype
- Photography: photorealistic, never illustrated or cartoonish
- Composition: clean, uncluttered, generous spacing
- This style MUST NOT drift between generations.`
}

/* ── Main prompt builder ── */

/**
 * Builds a production-ready image generation prompt following a 5-layer system:
 * L1: Brand Identity (colors, typography, visual DNA)
 * L2: Format Layer (platform, aspect ratio, dimensions)
 * L3: Layout Layer (zone-based composition per format)
 * L4: Content Layer (copy, topic, category)
 * L5: Quality Rules (exclusions, generation rules)
 *
 * Based on the Potência Educação design-social-media prompt system.
 * Key principles: no font names, layer-based thinking, hex codes mandatory,
 * photorealistic photography, detailed lighting, specific layout zones.
 */
export function buildImagePrompt(brand: BrandConfig, ctx: PromptContext): string {
  const format = FORMAT_MAP[ctx.kind]

  return `Generate a professional social media graphic image based on the design specification below.

## FORMAT
${format.label} — aspect ratio ${format.ratio} (${format.dimensions} px).
Create a COMPLETE, FINISHED image — not a mockup, wireframe, or template preview.

## BRAND: "${brand.name}"
"${brand.tagline}"
Niche: ${brand.niche}. Archetype: ${brand.personality.archetype}.
Target audience: ${brand.audience.primary}.

## ${describeColors(brand)}

## ${describeTypography(brand)}

## ${describeVisualDirection(brand)}

## ${getLayoutSpec(ctx.kind, ctx.postType)}

## CONTENT TO DISPLAY
- Main headline (render EXACTLY as written, letter by letter): "${ctx.headline}"
${ctx.body ? `- Supporting text: "${ctx.body}"` : ''}
${ctx.postType ? `- Content category: ${ctx.postType}` : ''}
- Include the brand name "${brand.name}" subtly (small text or logo area, not dominant).
- All visible text MUST be in Portuguese, exactly as provided above.

## IMAGE GENERATION RULES (follow strictly)
- Create a COMPLETE, POLISHED image — professional agency quality.
- Think in LAYERS: background (photo/color) → midground (overlays/gradients) → foreground (text/UI elements).
- ALL text must be SHARP, LEGIBLE, and correctly spelled in Portuguese.
- Render the headline "${ctx.headline}" with pixel-perfect accuracy — every letter correct.
- All elements must fit WITHIN the frame with safe margins (nothing touching edges).
- VARY composition — do not always default to centered or diagonal split layouts.
- Photos should look photorealistic, not cartoonish or illustrated.
- People (if any) must be shown FULLY visible — never crop heads, faces, or upper bodies.
- Aspect ratio: ${format.ratio}. Dimensions: ${format.dimensions}.

## DO NOT INCLUDE (mandatory exclusions)
${brand.photography.avoid.map(a => `- ${a}`).join('\n')}
- Blurry, pixelated, or low-quality elements
- Cluttered or chaotic layouts — keep it clean and professional
- Illegible or poorly contrasted text
- Watermarks, stock photo marks, or placeholder text ("Lorem ipsum", "Your text here")
- Colors outside the brand palette specified above
- Font family names rendered as text on the image
- HTML tags (<b>, </b>, <br>) or markdown syntax (**, ##) as visible text
- Technical diagrams, schematics, or flat illustrations
- Mockup frames, phone frames, or browser chrome — output the design itself`
}
