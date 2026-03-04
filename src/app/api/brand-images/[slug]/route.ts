import { NextRequest, NextResponse } from 'next/server'
import { existsSync } from 'fs'
import path from 'path'

const IMAGE_TYPES = ['post', 'post2', 'story', 'banner'] as const

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const baseDir = path.join(process.cwd(), 'public', 'generated', slug)

  const result: Record<string, string | null> = {}

  for (const type of IMAGE_TYPES) {
    const filePath = path.join(baseDir, `${type}.png`)
    result[type] = existsSync(filePath) ? `/generated/${slug}/${type}.png` : null
  }

  return NextResponse.json(result)
}
