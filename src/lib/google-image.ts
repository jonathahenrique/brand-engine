/**
 * Google Generative Language API client for image generation.
 * Uses Nano Banana 2 (gemini-3.1-flash-image-preview) — Google's latest image model.
 * Direct API with free credits.
 */

export interface GoogleImageRequest {
  prompt: string
  referenceImage?: { base64: string; mimeType: string }
}

export interface GoogleImageResponse {
  imageBase64: string
  mimeType: string
  textResponse?: string
}

const MODEL = 'gemini-3.1-flash-image-preview'
const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`

export async function callGoogleImageAPI(req: GoogleImageRequest): Promise<GoogleImageResponse> {
  const apiKey = process.env.GOOGLE_AI_API_KEY
  if (!apiKey) throw new Error('GOOGLE_AI_API_KEY not configured')

  const parts: Record<string, unknown>[] = [{ text: req.prompt }]

  if (req.referenceImage) {
    parts.push({
      inlineData: {
        data: req.referenceImage.base64,
        mimeType: req.referenceImage.mimeType,
      },
    })
  }

  const response = await fetch(`${ENDPOINT}?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts }],
      generationConfig: {
        responseModalities: ['TEXT', 'IMAGE'],
      },
    }),
  })

  if (!response.ok) {
    const err = await response.json().catch(() => ({}))
    const msg = err.error?.message || `Google API error: ${response.status}`
    throw new Error(msg)
  }

  const data = await response.json()
  const candidateParts = data.candidates?.[0]?.content?.parts

  if (!candidateParts || !Array.isArray(candidateParts)) {
    throw new Error('No content in Google API response')
  }

  let imageBase64 = ''
  let mimeType = 'image/png'
  let textResponse: string | undefined

  for (const part of candidateParts) {
    if (part.inlineData?.data) {
      imageBase64 = part.inlineData.data
      mimeType = part.inlineData.mimeType || 'image/png'
    }
    if (part.text) {
      textResponse = part.text
    }
  }

  if (!imageBase64) {
    throw new Error('No image data in Google API response. The model may not have generated an image for this prompt.')
  }

  return { imageBase64, mimeType, textResponse }
}
