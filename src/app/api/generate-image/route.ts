import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

export const maxDuration = 60

type ImageType = 'post' | 'post2' | 'story' | 'banner'

interface GenerateRequest {
  prompt: string
  provider: 'openrouter' | 'openai'
  size?: string
  brandSlug?: string
  imageType?: ImageType
}

/**
 * OpenAI gpt-image-1 só aceita: 1024x1024, 1024x1536, 1536x1024, auto.
 * Mapeia tamanhos customizados (ex: 1024x1280 para 4:5) ao mais próximo suportado.
 */
function mapToOpenAISize(size: string): string {
  const supported = ['1024x1024', '1024x1536', '1536x1024']
  if (supported.includes(size)) return size

  const [w, h] = size.split('x').map(Number)
  if (!w || !h) return 'auto'

  const ratio = w / h
  if (ratio > 1.2) return '1536x1024' // landscape (16:9, etc)
  if (ratio < 0.9) return '1024x1536' // portrait (4:5, 9:16, etc)
  return '1024x1024' // near-square
}

/**
 * Extrai dados base64 de uma data URL ou string raw base64.
 * Retorna o Buffer do PNG.
 */
function decodeBase64Image(dataUrl: string): Buffer | null {
  // data:image/png;base64,xxxxx
  const match = dataUrl.match(/^data:image\/[^;]+;base64,(.+)$/)
  if (match) {
    return Buffer.from(match[1], 'base64')
  }
  // raw base64 (sem prefixo data:)
  if (/^[A-Za-z0-9+/=]+$/.test(dataUrl) && dataUrl.length > 100) {
    return Buffer.from(dataUrl, 'base64')
  }
  return null
}

/**
 * Salva a imagem em public/generated/{slug}/{type}.png
 * Retorna o caminho estático (ex: /generated/spotify/post.png)
 */
async function saveImageToDisk(
  imageUrl: string,
  brandSlug: string,
  imageType: ImageType
): Promise<string> {
  const publicDir = path.join(process.cwd(), 'public', 'generated', brandSlug)
  await fs.mkdir(publicDir, { recursive: true })

  const filePath = path.join(publicDir, `${imageType}.png`)
  const staticPath = `/generated/${brandSlug}/${imageType}.png`

  // Caso 1: data URL (base64)
  const buffer = decodeBase64Image(imageUrl)
  if (buffer) {
    await fs.writeFile(filePath, buffer)
    return staticPath
  }

  // Caso 2: URL remota — baixa o conteúdo
  const response = await fetch(imageUrl)
  if (!response.ok) {
    throw new Error(`Failed to download image: ${response.status}`)
  }
  const arrayBuffer = await response.arrayBuffer()
  await fs.writeFile(filePath, Buffer.from(arrayBuffer))
  return staticPath
}

export async function POST(request: NextRequest) {
  try {
    const body: GenerateRequest = await request.json()
    const { prompt, provider, size = '1024x1280', brandSlug, imageType } = body

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 })
    }

    let result: NextResponse

    if (provider === 'openai') {
      result = await generateWithOpenAI(prompt, size)
    } else {
      result = await generateWithOpenRouter(prompt, size)
    }

    // Se brandSlug e imageType foram fornecidos, salva em disco
    if (brandSlug && imageType) {
      const data = await result.json()
      if (data.url) {
        const staticPath = await saveImageToDisk(data.url, brandSlug, imageType)
        return NextResponse.json({ url: staticPath })
      }
      return NextResponse.json(data, { status: result.status })
    }

    return result
  } catch (error) {
    console.error('Image generation error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to generate image' },
      { status: 500 }
    )
  }
}

async function generateWithOpenAI(prompt: string, size: string) {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'OPENAI_API_KEY not configured' }, { status: 500 })
  }

  const mappedSize = mapToOpenAISize(size)

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
      size: mappedSize,
      quality: 'medium',
    }),
  })

  if (!response.ok) {
    const err = await response.json().catch(() => ({}))
    throw new Error(err.error?.message || `OpenAI API error: ${response.status}`)
  }

  const data = await response.json()
  const image = data.data?.[0]

  if (image?.b64_json) {
    return NextResponse.json({ url: `data:image/png;base64,${image.b64_json}` })
  }
  if (image?.url) {
    return NextResponse.json({ url: image.url })
  }

  throw new Error('No image data in response')
}

async function generateWithOpenRouter(prompt: string, size: string) {
  const apiKey = process.env.OPENROUTER_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'OPENROUTER_API_KEY not configured' }, { status: 500 })
  }

  const [w, h] = size.split('x').map(Number)

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
            `Generate an image with these exact specifications. Output ONLY the image, no text explanation.\n\n` +
            `Image dimensions: ${w}x${h} pixels (aspect ratio ${w > h ? '16:9' : w === h ? '1:1' : '4:5'})\n\n` +
            prompt,
        },
      ],
    }),
  })

  if (!response.ok) {
    const err = await response.json().catch(() => ({}))
    throw new Error(
      err.error?.message || `OpenRouter API error: ${response.status}`
    )
  }

  const data = await response.json()
  const message = data.choices?.[0]?.message

  if (!message?.content) {
    throw new Error('Empty response from OpenRouter')
  }

  // Gemini retorna content como array de parts (multimodal)
  if (Array.isArray(message.content)) {
    for (const part of message.content) {
      if (part.type === 'image_url' && part.image_url?.url) {
        return NextResponse.json({ url: part.image_url.url })
      }
      if (part.inline_data?.mime_type?.startsWith('image/')) {
        return NextResponse.json({
          url: `data:${part.inline_data.mime_type};base64,${part.inline_data.data}`,
        })
      }
    }
  }

  // Fallback: base64 data URL no texto
  if (typeof message.content === 'string') {
    const base64Match = message.content.match(
      /data:image\/[^;]+;base64,[A-Za-z0-9+/=]+/
    )
    if (base64Match) {
      return NextResponse.json({ url: base64Match[0] })
    }
  }

  throw new Error(
    'No image found in OpenRouter response. The model may not have generated an image for this prompt.'
  )
}
