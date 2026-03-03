'use client'

import Image from 'next/image'

interface BrandLogoProps {
  slug: string
  name: string
  logoFile?: string
  variant: 'icon' | 'full' | 'badge'
  theme: { primary: string; secondary: string }
  className?: string
}

export function BrandLogo({ slug, name, logoFile, variant, theme, className }: BrandLogoProps) {
  const iconFile = logoFile ? `/logos/${slug}-icon.svg` : null

  if (variant === 'badge') {
    // For sidebar header and home page cards — shows icon in a gradient badge
    return (
      <div
        className={`flex items-center justify-center rounded-xl ${className || 'h-10 w-10'}`}
        style={{ background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})` }}
      >
        {logoFile ? (
          <Image
            src={iconFile || logoFile}
            alt={name}
            width={96}
            height={96}
            className="h-[60%] w-[60%] object-contain"
            style={{ filter: 'brightness(0) invert(1)' }}
          />
        ) : (
          <span className="text-sm font-bold text-white">{name.charAt(0)}</span>
        )}
      </div>
    )
  }

  if (variant === 'full' && logoFile) {
    return (
      <Image
        src={logoFile}
        alt={name}
        width={200}
        height={60}
        className={className || 'h-12 w-auto'}
        style={{ filter: 'brightness(0) invert(1)' }}
      />
    )
  }

  // Fallback text
  return <h1 className={className || 'text-4xl font-bold text-white'}>{name}</h1>
}
