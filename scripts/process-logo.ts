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
 *   full-color  — copy of the original
 *   mono-white  — all opaque pixels → #FFFFFF, alpha preserved
 *   mono-black  — all opaque pixels → #000000, alpha preserved
 *   grayscale   — luminance desaturation, alpha preserved
 *   icon        — left-square crop (shield region)
 */

import sharp from 'sharp'
import * as fs from 'fs'
import * as path from 'path'
import { recolorPixels, grayscalePixels, extractIconCrop } from '../src/lib/logo-processing'

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

  // 1. Full-color copy
  const fullColorOut = path.join(outDir, `full-color${ext}`)
  if (force || !fs.existsSync(fullColorOut)) {
    fs.copyFileSync(inputFile, fullColorOut)
    console.log(`  full-color -> ${path.relative(PUBLIC_DIR, fullColorOut)}`)
  }

  // 2. Mono-white: all opaque pixels → #FFFFFF
  const monoWhiteOut = path.join(outDir, 'mono-white.png')
  if (force || !fs.existsSync(monoWhiteOut)) {
    await recolorPixels(inputFile, 255, 255, 255, monoWhiteOut)
    console.log(`  mono-white -> ${path.relative(PUBLIC_DIR, monoWhiteOut)}`)
  }

  // 3. Mono-black: all opaque pixels → #000000
  const monoBlackOut = path.join(outDir, 'mono-black.png')
  if (force || !fs.existsSync(monoBlackOut)) {
    await recolorPixels(inputFile, 0, 0, 0, monoBlackOut)
    console.log(`  mono-black -> ${path.relative(PUBLIC_DIR, monoBlackOut)}`)
  }

  // 4. Grayscale: luminance desaturation, alpha preserved
  const grayscaleOut = path.join(outDir, 'grayscale.png')
  if (force || !fs.existsSync(grayscaleOut)) {
    await grayscalePixels(inputFile, grayscaleOut)
    console.log(`  grayscale -> ${path.relative(PUBLIC_DIR, grayscaleOut)}`)
  }

  // 5. Icon: left-square crop
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
