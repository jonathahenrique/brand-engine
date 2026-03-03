'use client'

import { useBrand } from '@/context/BrandContext'
import { isLightColor } from '@/utils/color'

function PostTemplate({
  headline,
  body,
  brand,
  type,
}: {
  headline: string
  body?: string
  brand: { primary: string; secondary: string; name: string; headingFont: string; bodyFont: string }
  type: string
}) {
  const bgColor = type === 'cta' ? brand.secondary : brand.primary
  const textColor = isLightColor(bgColor) ? '#000' : '#fff'

  return (
    <div
      className="flex aspect-square w-full flex-col justify-between overflow-hidden rounded-2xl p-6"
      style={{ background: `linear-gradient(145deg, ${bgColor}, ${bgColor}dd)` }}
    >
      <div>
        <span
          className="inline-block rounded-md px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider"
          style={{ backgroundColor: 'rgba(255,255,255,0.2)', color: textColor }}
        >
          {type}
        </span>
      </div>
      <div>
        <p
          className="text-xl font-bold leading-tight"
          style={{ fontFamily: brand.headingFont, color: textColor }}
        >
          {headline}
        </p>
        {body && (
          <p
            className="mt-2 text-xs leading-relaxed opacity-80"
            style={{ fontFamily: brand.bodyFont, color: textColor }}
          >
            {body}
          </p>
        )}
      </div>
      <div className="flex items-center gap-2">
        <div
          className="flex h-6 w-6 items-center justify-center rounded-full text-[9px] font-bold"
          style={{ backgroundColor: 'rgba(255,255,255,0.2)', color: textColor }}
        >
          {brand.name.charAt(0)}
        </div>
        <span className="text-[10px] font-medium" style={{ color: textColor, opacity: 0.7 }}>
          {brand.name}
        </span>
      </div>
    </div>
  )
}

function StoryTemplate({
  headline,
  brand,
}: {
  headline: string
  brand: { primary: string; secondary: string; name: string; headingFont: string }
}) {
  return (
    <div
      className="flex aspect-[9/16] w-full flex-col justify-between overflow-hidden rounded-2xl p-5"
      style={{ background: `linear-gradient(180deg, ${brand.primary}, ${brand.secondary || brand.primary}cc)` }}
    >
      <div className="flex items-center gap-2">
        <div className="h-7 w-7 rounded-full bg-white/20" />
        <span className="text-[10px] font-medium text-white/70">{brand.name}</span>
      </div>
      <div>
        <p
          className="text-lg font-bold leading-tight text-white"
          style={{ fontFamily: brand.headingFont }}
        >
          {headline}
        </p>
        <div className="mt-3 flex items-center justify-center">
          <span className="rounded-full bg-white/20 px-4 py-1.5 text-[10px] font-semibold text-white backdrop-blur-sm">
            Saiba mais
          </span>
        </div>
      </div>
      <div />
    </div>
  )
}

function BannerTemplate({
  headline,
  body,
  brand,
}: {
  headline: string
  body?: string
  brand: { primary: string; name: string; headingFont: string; bodyFont: string }
}) {
  return (
    <div
      className="flex aspect-video w-full items-center overflow-hidden rounded-2xl p-8"
      style={{ background: `linear-gradient(135deg, ${brand.primary}, ${brand.primary}bb)` }}
    >
      <div className="max-w-[60%]">
        <p
          className="text-2xl font-bold leading-tight text-white"
          style={{ fontFamily: brand.headingFont }}
        >
          {headline}
        </p>
        {body && (
          <p
            className="mt-2 text-xs text-white/70"
            style={{ fontFamily: brand.bodyFont }}
          >
            {body}
          </p>
        )}
        <div className="mt-4">
          <span className="rounded-lg bg-white/20 px-4 py-2 text-xs font-semibold text-white backdrop-blur-sm">
            {brand.name}
          </span>
        </div>
      </div>
    </div>
  )
}

export default function SocialMedia() {
  const { brand, tokens } = useBrand()
  const brandInfo = {
    primary: brand.theme.primary,
    secondary: brand.theme.secondary,
    name: brand.name,
    headingFont: tokens.heading,
    bodyFont: tokens.body,
  }

  const posts = brand.mockups.instagramPosts
  const hero = brand.mockups.landingHero

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">Social Media</h1>
        <p className="mt-1 text-sm text-[var(--text-secondary)]">
          Templates de conteúdo com a identidade visual da marca aplicada.
        </p>
        <span className="mt-2 inline-block rounded-full bg-[var(--bg-muted)] px-3 py-1 text-xs font-medium text-[var(--text-secondary)]">
          {posts.length + 3} templates
        </span>
      </div>

      {/* Feed Posts (1:1) */}
      <div>
        <p className="section-label mb-4">Feed Posts (1:1)</p>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {posts.map((p, i) => (
            <PostTemplate
              key={i}
              headline={p.headline}
              body={p.body}
              brand={brandInfo}
              type={p.type}
            />
          ))}
        </div>
      </div>

      {/* Stories (9:16) */}
      <div>
        <p className="section-label mb-4">Stories (9:16)</p>
        <div className="grid grid-cols-3 gap-4 lg:grid-cols-5">
          {posts.slice(0, 3).map((p, i) => (
            <StoryTemplate key={i} headline={p.headline} brand={brandInfo} />
          ))}
        </div>
      </div>

      {/* Carousel Slides */}
      <div>
        <p className="section-label mb-4">Carousel Slides</p>
        <div className="grid grid-cols-3 gap-4">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="flex aspect-square flex-col items-center justify-center rounded-2xl"
              style={{ background: `linear-gradient(145deg, ${brand.theme.primary}18, ${brand.theme.primary}08)`, border: `1px solid ${brand.theme.primary}20` }}
            >
              <span
                className="text-5xl font-bold"
                style={{ color: brand.theme.primary, fontFamily: tokens.heading }}
              >
                {n}
              </span>
              <span className="mt-1 text-xs text-[var(--text-ghost)]">{n}/3</span>
            </div>
          ))}
        </div>
      </div>

      {/* Banner (16:9) */}
      <div>
        <p className="section-label mb-4">Banner (16:9)</p>
        <BannerTemplate
          headline={hero.headline}
          body={hero.subheadline}
          brand={brandInfo}
        />
      </div>
    </div>
  )
}
