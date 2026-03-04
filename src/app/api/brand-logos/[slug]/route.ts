import { NextRequest, NextResponse } from 'next/server'
import { existsSync } from 'fs'
import path from 'path'

const VARIANT_TYPES = ['full-color', 'icon', 'mono-white', 'mono-black', 'grayscale'] as const

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const baseDir = path.join(process.cwd(), 'public', 'logos', slug)

  const result: Record<string, string | null> = {}

  for (const type of VARIANT_TYPES) {
    // Check common extensions
    const extensions = ['.png', '.webp', '.svg']
    let found: string | null = null

    for (const ext of extensions) {
      const filePath = path.join(baseDir, `${type}${ext}`)
      if (existsSync(filePath)) {
        found = `/logos/${slug}/${type}${ext}`
        break
      }
    }

    result[type] = found
  }

  return NextResponse.json(result)
}
