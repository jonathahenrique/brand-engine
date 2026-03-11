'use client'

import Image from 'next/image'

interface BrandLogoProps {
  slug: string
  name: string
  logoFile?: string
  iconFile?: string
  transparent?: boolean
  variant: 'icon' | 'full' | 'badge'
  theme: { primary: string; secondary: string }
  filter?: string
  className?: string
}

export function BrandLogo({ slug, name, logoFile, iconFile, transparent, variant, theme, filter, className }: BrandLogoProps) {
  if (variant === 'badge') {
    const badgeSrc = iconFile || logoFile
    return (
      <div className={`flex items-center justify-center rounded-xl ${className || 'h-12 w-12'}`}>
        {badgeSrc ? (
          <Image
            src={badgeSrc}
            alt={name}
            width={96}
            height={96}
            className="h-[70%] w-[70%] object-contain"
            style={{ filter: 'brightness(0) invert(1)' }}
          />
        ) : (
          <span className="text-base font-bold text-white">{name.charAt(0)}</span>
        )}
      </div>
    )
  }

  if (variant === 'icon') {
    const src = iconFile || logoFile
    if (src) {
      return (
        <Image
          src={src}
          alt={name}
          width={100}
          height={100}
          className={className || 'h-auto max-h-[100px] w-auto max-w-[100px]'}
        />
      )
    }
  }

  if (variant === 'full' && logoFile) {
    return (
      <Image
        src={logoFile}
        alt={name}
        width={200}
        height={60}
        className={className || 'h-12 w-auto'}
        style={filter ? { filter } : undefined}
      />
    )
  }

  // Fallback text
  return <h1 className={className || 'text-4xl font-bold text-white'}>{name}</h1>
}
