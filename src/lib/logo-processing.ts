import sharp from 'sharp'

/**
 * Alpha-aware pixel recoloring.
 * For each pixel: if alpha > 0, set RGB to target color, preserve alpha.
 */
export async function recolorPixels(
  inputPath: string,
  r: number,
  g: number,
  b: number,
  outputPath: string,
): Promise<void> {
  const image = sharp(inputPath).ensureAlpha()
  const { data, info } = await image.raw().toBuffer({ resolveWithObject: true })

  const pixels = Buffer.from(data)
  for (let i = 0; i < pixels.length; i += 4) {
    if (pixels[i + 3] > 0) {
      pixels[i] = r
      pixels[i + 1] = g
      pixels[i + 2] = b
    }
  }

  await sharp(pixels, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .png()
    .toFile(outputPath)
}

/**
 * Extract icon by cropping a region from the image.
 * Default: left-square crop (width = height from left side).
 */
export async function extractIconCrop(
  inputPath: string,
  outputPath: string,
  crop?: { x: number; y: number; w: number; h: number },
): Promise<void> {
  const metadata = await sharp(inputPath).metadata()
  const { width, height } = metadata

  if (!width || !height) {
    throw new Error('Could not read image dimensions for icon crop')
  }

  const region = crop || {
    x: 0,
    y: 0,
    w: Math.min(height, width),
    h: height,
  }

  await sharp(inputPath)
    .extract({ left: region.x, top: region.y, width: region.w, height: region.h })
    .png()
    .toFile(outputPath)
}
