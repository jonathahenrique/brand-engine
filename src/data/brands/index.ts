import type { BrandConfig } from '@/types/brand'
import { spotify } from './spotify'
import { novaNbr5419 } from './nova-nbr5419'
import { expoEletrica } from './expo-eletrica'

export const brands: Record<string, BrandConfig> = {
  spotify,
  'nova-nbr5419': novaNbr5419,
  'expo-eletrica': expoEletrica,
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
