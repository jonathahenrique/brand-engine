import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import { existsSync } from 'fs'
import path from 'path'
import { brands } from '@/data/brands'

const PUBLIC_DIR = path.join(process.cwd(), 'public')

async function fileToBase64(filePath: string): Promise<string | null> {
  if (!existsSync(filePath)) return null
  const buffer = await fs.readFile(filePath)
  const ext = path.extname(filePath).toLowerCase()
  const mimeMap: Record<string, string> = {
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml',
  }
  const mime = mimeMap[ext] || 'image/png'
  return `data:${mime};base64,${buffer.toString('base64')}`
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const brand = brands[slug]

    if (!brand) {
      return NextResponse.json({ error: `Brand not found: ${slug}` }, { status: 404 })
    }

    // Collect logo files
    const logosDir = path.join(PUBLIC_DIR, 'logos', slug)
    const logoFiles: Record<string, string> = {}

    if (existsSync(logosDir)) {
      const files = await fs.readdir(logosDir)
      for (const file of files) {
        if (file === 'manifest.json') continue
        const filePath = path.join(logosDir, file)
        const base64 = await fileToBase64(filePath)
        if (base64) {
          logoFiles[file] = base64
        }
      }
    }

    // Collect generated images
    const generatedDir = path.join(PUBLIC_DIR, 'generated', slug)
    const generatedImages: Record<string, string> = {}

    if (existsSync(generatedDir)) {
      const files = await fs.readdir(generatedDir)
      for (const file of files) {
        const filePath = path.join(generatedDir, file)
        const base64 = await fileToBase64(filePath)
        if (base64) {
          generatedImages[file] = base64
        }
      }
    }

    const brandPackage = {
      exportedAt: new Date().toISOString(),
      brand,
      assets: {
        logos: logoFiles,
        generated: generatedImages,
      },
    }

    return NextResponse.json(brandPackage)
  } catch (error) {
    console.error('Brand package error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to export brand package' },
      { status: 500 }
    )
  }
}
