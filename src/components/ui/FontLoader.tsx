'use client'
import { useEffect } from 'react'
import { useBrand } from '@/context/BrandContext'

export default function FontLoader() {
  const { brand } = useBrand()

  useEffect(() => {
    const id = `font-loader-${brand.slug}`
    if (document.getElementById(id)) return

    const params = brand.typography.stack
      .filter(f => f.source === 'Google Fonts')
      .map(f => {
        const w = f.weights.split(',').map((s: string) => s.trim()).join(';')
        return `family=${encodeURIComponent(f.font)}:wght@${w}`
      })
      .join('&')

    if (!params) return

    const link = document.createElement('link')
    link.id = id
    link.rel = 'stylesheet'
    link.href = `https://fonts.googleapis.com/css2?${params}&display=swap`
    document.head.appendChild(link)

    return () => { document.getElementById(id)?.remove() }
  }, [brand.slug, brand.typography.stack])

  return null
}
