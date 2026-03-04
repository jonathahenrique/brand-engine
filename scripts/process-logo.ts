#!/usr/bin/env npx tsx
/**
 * Logo Processing Script — Tier 2 asset generation (alpha-aware)
 *
 * Usage:
 *   npx tsx scripts/process-logo.ts <slug> [--force] [--icon-crop x,y,w,h]
 *
 * Reads logo.file from the brand config and generates processed variants
 * in public/logos/<slug>/
 *
 * Variants generated:
 *   mono-light  — all opaque pixels → #FFFFFF, alpha preserved
 *   mono-dark   — all opaque pixels → #000000, alpha preserved
 *   icon        — left-square crop (shield region)
 */

import sharp from 'sharp'
import * as fs from 'fs'
import * as path from 'path'
import { recolorPixels, extractIconCrop } from '../src/lib/logo-processing'

const BRANDS_DIR = path.resolve(__dirname, '../src/data/brands')
const PUBLIC_DIR = path.resolve(__dirname, '../public')
const PUBLIC_LOGOS = path.resolve(PUBLIC_DIR, 'logos')

interface ProcessOptions {
  slug: string
  force: boolean
  iconCrop?: { x: number; y: number; w: number; h: number }
}

function parseArgs(): ProcessOptions {
  const args = process.argv.slice(2)
  const slug = args.find(a => !a.startsWith('--'))
  if (!slug) {
    console.error('Usage: npx tsx scripts/process-logo.ts <slug> [--force] [--icon-crop x,y,w,h]')
    process.exit(1)
  }

  let iconCrop: ProcessOptions['iconCrop']
  const cropIdx = args.indexOf('--icon-crop')
  if (cropIdx !== -1 && args[cropIdx + 1]) {
    const [x, y, w, h] = args[cropIdx + 1].split(',').map(Number)
    if ([x, y, w, h].every(n => !isNaN(n))) {
      iconCrop = { x, y, w, h }
    }
  }

  return {
    slug,
    force: args.includes('--force'),
    iconCrop,
  }
}

function getLogoFile(slug: string): string | null {
  const brandPath = path.join(BRANDS_DIR, `${slug}.ts`)
  if (!fs.existsSync(brandPath)) {
    console.error(`Brand file not found: ${brandPath}`)
    return null
  }

  const content = fs.readFileSync(brandPath, 'utf-8')
  const fileMatch = content.match(/logo:\s*\{[^}]*?file:\s*['"]([^'"]+)['"]/)
  if (!fileMatch) {
    console.error(`No logo.file found in ${slug} brand config`)
    return null
  }
  return fileMatch[1]
}

async function processLogo(opts: ProcessOptions) {
  const { slug, force, iconCrop } = opts

  const logoPath = getLogoFile(slug)
  if (!logoPath) return

  const inputFile = path.join(PUBLIC_DIR, logoPath.replace(/^\//, ''))
  if (!fs.existsSync(inputFile)) {
    console.error(`Logo file not found: ${inputFile}`)
    return
  }

  const outDir = path.join(PUBLIC_LOGOS, slug)
  fs.mkdirSync(outDir, { recursive: true })

  const ext = path.extname(inputFile).toLowerCase()
  const isSvg = ext === '.svg'

  if (isSvg) {
    console.error('SVG detected — this script handles raster logos only. Create SVG variants manually.')
    return
  }

  const metadata = await sharp(inputFile).metadata()
  console.log(`Processing ${slug} logo from ${logoPath}...`)
  console.log(`  Info: ${metadata.width}x${metadata.height}, ${metadata.format}, hasAlpha=${metadata.hasAlpha}`)

  // 1. Mono-light: all opaque pixels → #FFFFFF
  const monoLightOut = path.join(outDir, 'mono-light.png')
  if (force || !fs.existsSync(monoLightOut)) {
    await recolorPixels(inputFile, 255, 255, 255, monoLightOut)
    console.log(`  mono-light -> ${path.relative(PUBLIC_DIR, monoLightOut)}`)
  }

  // 2. Mono-dark: all opaque pixels → #000000
  const monoDarkOut = path.join(outDir, 'mono-dark.png')
  if (force || !fs.existsSync(monoDarkOut)) {
    await recolorPixels(inputFile, 0, 0, 0, monoDarkOut)
    console.log(`  mono-dark -> ${path.relative(PUBLIC_DIR, monoDarkOut)}`)
  }

  // 3. Icon: left-square crop
  const iconOut = path.join(outDir, 'icon.png')
  if (force || !fs.existsSync(iconOut)) {
    await extractIconCrop(inputFile, iconOut, iconCrop)
    console.log(`  icon -> ${path.relative(PUBLIC_DIR, iconOut)}`)
  }

  // Write manifest
  const outputs = fs.readdirSync(outDir).filter(f => f !== 'manifest.json')
  const manifest = {
    slug,
    source: logoPath,
    processedAt: new Date().toISOString(),
    variants: outputs.map(f => `/logos/${slug}/${f}`),
  }
  fs.writeFileSync(path.join(outDir, 'manifest.json'), JSON.stringify(manifest, null, 2))
  console.log(`  manifest.json written`)

  console.log(`\nDone! ${outputs.length} variants in public/logos/${slug}/`)
}

processLogo(parseArgs()).catch(console.error)
