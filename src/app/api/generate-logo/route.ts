import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import { existsSync } from 'fs'
import path from 'path'
import { brands } from '@/data/brands'
import { buildLogoGenerationPrompt, buildIconExtractionPrompt } from '@/utils/buildLogoPrompt'
import { recolorPixels, grayscalePixels } from '@/lib/logo-processing'
import { callGoogleImageAPI } from '@/lib/google-image'
import { trackUsage, getModelForProvider, estimateCost } from '@/lib/usage-tracker'

export const maxDuration = 120

type Operation = 'process-variants' | 'extract-icon' | 'generate-full'
type Provider = 'openai' | 'openrouter' | 'google'

interface GenerateLogoRequest {
  operation: Operation
  slug: string
  provider?: Provider
  sourceFile?: string // relative to public/, e.g. "/logos/nova-nbr5419-logo.webp"
}

const PUBLIC_DIR = path.join(process.cwd(), 'public')

function getOutputDir(slug: string): string {
  return path.join(PUBLIC_DIR, 'logos', slug)
}

/**
 * Decode base64 data URL or raw base64 string to Buffer.
 */
function decodeBase64Image(dataUrl: string): Buffer | null {
  const match = dataUrl.match(/^data:image\/[^;]+;base64,(.+)$/)
  if (match) return Buffer.from(match[1], 'base64')
  if (/^[A-Za-z0-9+/=]+$/.test(dataUrl) && dataUrl.length > 100) {
    return Buffer.from(dataUrl, 'base64')
  }
  return null
}

/**
 * Download image from URL or decode base64, save to disk.
 */
async function saveImage(imageUrl: string, filePath: string): Promise<void> {
  const buffer = decodeBase64Image(imageUrl)
  if (buffer) {
    await fs.writeFile(filePath, buffer)
    return
  }
  const response = await fetch(imageUrl)
  if (!response.ok) throw new Error(`Failed to download image: ${response.status}`)
  const arrayBuffer = await response.arrayBuffer()
  await fs.writeFile(filePath, Buffer.from(arrayBuffer))
}

// ─── Sharp: process-variants ───────────────────────────────────────

async function processVariants(slug: string, sourceFile: string): Promise<Record<string, string>> {
  const inputFile = path.join(PUBLIC_DIR, sourceFile.replace(/^\//, ''))
  if (!existsSync(inputFile)) {
    throw new Error(`Source file not found: ${sourceFile}`)
  }

  const outDir = getOutputDir(slug)
  await fs.mkdir(outDir, { recursive: true })

  const results: Record<string, string> = {}

  // mono-white
  const monoWhiteOut = path.join(outDir, 'mono-white.png')
  await recolorPixels(inputFile, 255, 255, 255, monoWhiteOut)
  results['mono-white'] = `/logos/${slug}/mono-white.png`

  // mono-black
  const monoBlackOut = path.join(outDir, 'mono-black.png')
  await recolorPixels(inputFile, 0, 0, 0, monoBlackOut)
  results['mono-black'] = `/logos/${slug}/mono-black.png`

  // grayscale
  const grayscaleOut = path.join(outDir, 'grayscale.png')
  await grayscalePixels(inputFile, grayscaleOut)
  results.grayscale = `/logos/${slug}/grayscale.png`

  // full-color copy
  const ext = path.extname(inputFile).toLowerCase()
  const fullColorOut = path.join(outDir, `full-color${ext}`)
  await fs.copyFile(inputFile, fullColorOut)
  results['full-color'] = `/logos/${slug}/full-color${ext}`

  // Write manifest
  const manifest = {
    slug,
    source: sourceFile,
    processedAt: new Date().toISOString(),
    variants: Object.values(results),
  }
  await fs.writeFile(path.join(outDir, 'manifest.json'), JSON.stringify(manifest, null, 2))

  return results
}

// ─── AI: extract-icon ──────────────────────────────────────────────

async function extractIconWithAI(
  slug: string,
  sourceFile: string,
  provider: Provider,
): Promise<string> {
  const brand = brands[slug]
  if (!brand) throw new Error(`Brand not found: ${slug}`)

  const prompt = buildIconExtractionPrompt(brand)
  const inputFile = path.join(PUBLIC_DIR, sourceFile.replace(/^\//, ''))
  if (!existsSync(inputFile)) throw new Error(`Source file not found: ${sourceFile}`)

  const imageBuffer = await fs.readFile(inputFile)
  const base64Image = imageBuffer.toString('base64')
  const mimeType = sourceFile.endsWith('.webp') ? 'image/webp' : sourceFile.endsWith('.svg') ? 'image/svg+xml' : 'image/png'

  let imageUrl: string

  if (provider === 'google') {
    imageUrl = await extractIconGoogle(prompt, base64Image, mimeType)
  } else if (provider === 'openai') {
    imageUrl = await extractIconOpenAI(prompt, base64Image, mimeType)
  } else {
    imageUrl = await extractIconOpenRouter(prompt, base64Image, mimeType)
  }

  const outDir = getOutputDir(slug)
  await fs.mkdir(outDir, { recursive: true })
  const iconPath = path.join(outDir, 'icon-ai.png')
  await saveImage(imageUrl, iconPath)

  return `/logos/${slug}/icon-ai.png`
}

async function extractIconOpenAI(prompt: string, base64Image: string, mimeType: string): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) throw new Error('OPENAI_API_KEY not configured')

  // Use chat completions with vision + image generation
  const response = await fetch('https://api.openai.com/v1/images/edits', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}` },
    body: (() => {
      const formData = new FormData()
      const blob = new Blob([Buffer.from(base64Image, 'base64')], { type: mimeType })
      formData.append('image', blob, 'logo.png')
      formData.append('prompt', prompt)
      formData.append('model', 'gpt-image-1')
      formData.append('size', '1024x1024')
      return formData
    })(),
  })

  if (!response.ok) {
    const err = await response.json().catch(() => ({}))
    throw new Error(err.error?.message || `OpenAI edit error: ${response.status}`)
  }

  const data = await response.json()
  const image = data.data?.[0]
  if (image?.b64_json) return `data:image/png;base64,${image.b64_json}`
  if (image?.url) return image.url
  throw new Error('No image data in OpenAI edit response')
}

async function extractIconOpenRouter(prompt: string, base64Image: string, mimeType: string): Promise<string> {
  const apiKey = process.env.OPENROUTER_API_KEY
  if (!apiKey) throw new Error('OPENROUTER_API_KEY not configured')

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
      'HTTP-Referer': 'https://brand-engine-omega.vercel.app',
      'X-Title': 'Brand Engine',
    },
    body: JSON.stringify({
      model: 'google/gemini-2.5-flash-image-preview',
      modalities: ['image', 'text'],
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image_url',
              image_url: { url: `data:${mimeType};base64,${base64Image}` },
            },
            { type: 'text', text: prompt + '\n\nOutput ONLY the extracted icon image, no text explanation.' },
          ],
        },
      ],
    }),
  })

  if (!response.ok) {
    const err = await response.json().catch(() => ({}))
    throw new Error(err.error?.message || `OpenRouter error: ${response.status}`)
  }

  const data = await response.json()
  return extractImageFromOpenRouterResponse(data)
}

// ─── AI: generate-full ─────────────────────────────────────────────

async function generateFullLogo(slug: string, provider: Provider): Promise<string> {
  const brand = brands[slug]
  if (!brand) throw new Error(`Brand not found: ${slug}`)

  const prompt = buildLogoGenerationPrompt(brand)
  let imageUrl: string

  if (provider === 'google') {
    imageUrl = await generateLogoGoogle(prompt)
  } else if (provider === 'openai') {
    imageUrl = await generateLogoOpenAI(prompt)
  } else {
    imageUrl = await generateLogoOpenRouter(prompt)
  }

  const outDir = getOutputDir(slug)
  await fs.mkdir(outDir, { recursive: true })
  const logoPath = path.join(outDir, 'full-logo-ai.png')
  await saveImage(imageUrl, logoPath)

  return `/logos/${slug}/full-logo-ai.png`
}

async function generateLogoOpenAI(prompt: string): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) throw new Error('OPENAI_API_KEY not configured')

  const response = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-image-1',
      prompt,
      n: 1,
      size: '1024x1024',
      quality: 'high',
    }),
  })

  if (!response.ok) {
    const err = await response.json().catch(() => ({}))
    throw new Error(err.error?.message || `OpenAI error: ${response.status}`)
  }

  const data = await response.json()
  const image = data.data?.[0]
  if (image?.b64_json) return `data:image/png;base64,${image.b64_json}`
  if (image?.url) return image.url
  throw new Error('No image data in OpenAI response')
}

async function generateLogoOpenRouter(prompt: string): Promise<string> {
  const apiKey = process.env.OPENROUTER_API_KEY
  if (!apiKey) throw new Error('OPENROUTER_API_KEY not configured')

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
      'HTTP-Referer': 'https://brand-engine-omega.vercel.app',
      'X-Title': 'Brand Engine',
    },
    body: JSON.stringify({
      model: 'google/gemini-2.5-flash-image-preview',
      modalities: ['image', 'text'],
      messages: [
        {
          role: 'user',
          content:
            `Generate a logo image with these exact specifications. Output ONLY the image, no text explanation.\n\n` +
            `Image dimensions: 1024x1024 pixels (1:1 square)\n\n` +
            prompt,
        },
      ],
    }),
  })

  if (!response.ok) {
    const err = await response.json().catch(() => ({}))
    throw new Error(err.error?.message || `OpenRouter error: ${response.status}`)
  }

  const data = await response.json()
  return extractImageFromOpenRouterResponse(data)
}

// ─── Google: extract-icon & generate-full ─────────────────────────

async function extractIconGoogle(prompt: string, base64Image: string, mimeType: string): Promise<string> {
  const result = await callGoogleImageAPI({
    prompt: prompt + '\n\nOutput ONLY the extracted icon image, no text explanation.',
    referenceImage: { base64: base64Image, mimeType },
  })
  return `data:${result.mimeType};base64,${result.imageBase64}`
}

async function generateLogoGoogle(prompt: string): Promise<string> {
  const fullPrompt =
    `Generate a logo image with these exact specifications. Output ONLY the image, no text explanation.\n\n` +
    `Image dimensions: 1024x1024 pixels (1:1 square)\n\n` +
    prompt

  const result = await callGoogleImageAPI({ prompt: fullPrompt })
  return `data:${result.mimeType};base64,${result.imageBase64}`
}

// ─── Shared helpers ────────────────────────────────────────────────

function extractImageFromOpenRouterResponse(data: Record<string, unknown>): string {
  const message = (data.choices as Array<{ message: { content: unknown } }>)?.[0]?.message

  if (!message?.content) throw new Error('Empty response from OpenRouter')

  if (Array.isArray(message.content)) {
    for (const part of message.content as Array<Record<string, unknown>>) {
      if (part.type === 'image_url') {
        const imgUrl = (part.image_url as { url: string })?.url
        if (imgUrl) return imgUrl
      }
      const inlineData = part.inline_data as { mime_type?: string; data?: string } | undefined
      if (inlineData?.mime_type?.toString().startsWith('image/')) {
        return `data:${inlineData.mime_type};base64,${inlineData.data}`
      }
    }
  }

  if (typeof message.content === 'string') {
    const base64Match = (message.content as string).match(/data:image\/[^;]+;base64,[A-Za-z0-9+/=]+/)
    if (base64Match) return base64Match[0]
  }

  throw new Error('No image found in OpenRouter response')
}

// ─── Main handler ──────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  try {
    const body: GenerateLogoRequest = await request.json()
    const { operation, slug, provider = 'google', sourceFile } = body

    if (!slug) {
      return NextResponse.json({ error: 'slug is required' }, { status: 400 })
    }

    const start = Date.now()

    switch (operation) {
      case 'process-variants': {
        if (!sourceFile) {
          return NextResponse.json({ error: 'sourceFile is required for process-variants' }, { status: 400 })
        }
        const variants = await processVariants(slug, sourceFile)
        trackUsage({
          provider, model: 'sharp', operation: 'logo-variants',
          brandSlug: slug, imageCount: 4, estimatedCostUSD: 0,
          status: 'success', durationMs: Date.now() - start,
        }).catch(() => {})
        return NextResponse.json({ variants })
      }

      case 'extract-icon': {
        if (!sourceFile) {
          return NextResponse.json({ error: 'sourceFile is required for extract-icon' }, { status: 400 })
        }
        const iconPath = await extractIconWithAI(slug, sourceFile, provider)
        trackUsage({
          provider, model: getModelForProvider(provider),
          operation: 'icon-extract', brandSlug: slug, imageCount: 1,
          estimatedCostUSD: estimateCost(provider),
          status: 'success', durationMs: Date.now() - start,
        }).catch(() => {})
        return NextResponse.json({ icon: iconPath })
      }

      case 'generate-full': {
        const logoPath = await generateFullLogo(slug, provider)
        trackUsage({
          provider, model: getModelForProvider(provider),
          operation: 'logo-gen', brandSlug: slug, imageCount: 1,
          estimatedCostUSD: estimateCost(provider),
          status: 'success', durationMs: Date.now() - start,
        }).catch(() => {})
        return NextResponse.json({ logo: logoPath })
      }

      default:
        return NextResponse.json(
          { error: `Unknown operation: ${operation}. Use: process-variants, extract-icon, or generate-full` },
          { status: 400 }
        )
    }
  } catch (error) {
    console.error('Logo generation error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to process logo' },
      { status: 500 }
    )
  }
}
