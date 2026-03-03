import type { BrandConfig } from '@/types/brand'
import { rupta } from './rupta'
import { nr10Master } from './nr10-master'
import { spotify } from './spotify'

export const brands: Record<string, BrandConfig> = {
  spotify,
  rupta,
  'nr10-master': nr10Master,
}

export function getBrand(slug: string): BrandConfig | undefined {
  return brands[slug]
}

export function getAllBrands(): BrandConfig[] {
  return Object.values(brands)
}

export function getAllSlugs(): string[] {
  return Object.keys(brands)
}
