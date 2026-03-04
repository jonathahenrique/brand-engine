import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

export const maxDuration = 30

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null
    const slug = formData.get('slug') as string | null

    if (!file || !slug) {
      return NextResponse.json({ error: 'file and slug are required' }, { status: 400 })
    }

    // Validate file type
    const validTypes = ['image/png', 'image/webp', 'image/svg+xml', 'image/jpeg']
    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { error: `Tipo não suportado: ${file.type}. Use PNG, WebP, SVG ou JPEG.` },
        { status: 400 }
      )
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: 'Arquivo muito grande. Máximo 10MB.' }, { status: 400 })
    }

    // Determine extension
    const extMap: Record<string, string> = {
      'image/png': '.png',
      'image/webp': '.webp',
      'image/svg+xml': '.svg',
      'image/jpeg': '.jpg',
    }
    const ext = extMap[file.type] || '.png'

    // Save to public/logos/{slug}/
    const outDir = path.join(process.cwd(), 'public', 'logos', slug)
    await fs.mkdir(outDir, { recursive: true })

    const fileName = `source${ext}`
    const filePath = path.join(outDir, fileName)
    const staticPath = `/logos/${slug}/${fileName}`

    const buffer = Buffer.from(await file.arrayBuffer())
    await fs.writeFile(filePath, buffer)

    return NextResponse.json({ path: staticPath, size: file.size, type: file.type })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Upload failed' },
      { status: 500 }
    )
  }
}
