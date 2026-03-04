'use client'

import { useState, useEffect, useCallback } from 'react'
import { useBrand } from '@/context/BrandContext'
import { isLightColor } from '@/utils/color'
import {
  buildImagePrompt,
  getImageSize,
  type TemplateKind,
} from '@/utils/buildImagePrompt'
import {
  Sparkles,
  Loader2,
  AlertCircle,
  ImageIcon,
} from 'lucide-react'

type Provider = 'openrouter' | 'openai'
type ImageType = 'post' | 'post2' | 'story' | 'banner'

interface BrandImages {
  post: string | null
  post2: string | null
  story: string | null
  banner: string | null
}

const FORMAT_LABELS: Record<ImageType, { label: string; ratio: string }> = {
  post: { label: 'Post', ratio: '4:5' },
  post2: { label: 'Post', ratio: '4:5' },
  story: { label: 'Story', ratio: '9:16' },
  banner: { label: 'Banner', ratio: '16:9' },
}

/* ── Static Mockup Templates ── */

function PostMockup({
  brand,
}: {
  brand: { primary: string; secondary: string; name: string; headingFont: string }
}) {
  const bgColor = brand.primary
  const textColor = isLightColor(bgColor) ? '#000' : '#fff'

  return (
    <div
      className="flex aspect-[4/5] w-full flex-col justify-between overflow-hidden rounded-2xl p-6"
      style={{ background: `linear-gradient(145deg, ${bgColor}, ${bgColor}dd)` }}
    >
      <span
        className="inline-block w-fit rounded-md px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider"
        style={{ backgroundColor: 'rgba(255,255,255,0.2)', color: textColor }}
      >
        Post 4:5
      </span>
      <div>
        <p
          className="text-xl font-bold leading-tight"
          style={{ fontFamily: brand.headingFont, color: textColor }}
        >
          {brand.name}
        </p>
        <p className="mt-1 text-xs opacity-60" style={{ color: textColor }}>
          Arte de feed gerada com IA
        </p>
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

function StoryMockup({
  brand,
}: {
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
          Story 9:16
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

function BannerMockup({
  brand,
}: {
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
          Banner 16:9
        </p>
        <p className="mt-2 text-xs text-white/70" style={{ fontFamily: brand.bodyFont }}>
          Banner social media gerado com IA
        </p>
        <div className="mt-4">
          <span className="rounded-lg bg-white/20 px-4 py-2 text-xs font-semibold text-white backdrop-blur-sm">
            {brand.name}
          </span>
        </div>
      </div>
    </div>
  )
}

/* ── Skeleton ── */

function ImageSkeleton({ ratio }: { ratio: string }) {
  const aspectClass =
    ratio === '4:5' ? 'aspect-[4/5]' : ratio === '9:16' ? 'aspect-[9/16]' : 'aspect-video'

  return (
    <div className={`${aspectClass} flex w-full items-center justify-center rounded-2xl bg-[var(--bg-subtle)]`}>
      <Loader2 className="animate-spin text-[var(--text-ghost)]" size={24} />
    </div>
  )
}

/* ── Main Component ── */

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

  // State
  const [images, setImages] = useState<BrandImages>({ post: null, post2: null, story: null, banner: null })
  const [loading, setLoading] = useState(true)
  const [provider, setProvider] = useState<Provider>('openai')
  const [generating, setGenerating] = useState(false)
  const [generatingTypes, setGeneratingTypes] = useState<Set<ImageType>>(new Set())
  const [progress, setProgress] = useState({ done: 0, total: 0 })
  const [errors, setErrors] = useState<string[]>([])

  // Buscar imagens existentes no mount
  const fetchExistingImages = useCallback(async () => {
    try {
      const res = await fetch(`/api/brand-images/${brand.slug}`)
      if (res.ok) {
        const data: BrandImages = await res.json()
        setImages(data)
      }
    } catch {
      // silently fail — mostra mockups
    } finally {
      setLoading(false)
    }
  }, [brand.slug])

  useEffect(() => {
    fetchExistingImages()
  }, [fetchExistingImages])

  const hasImages = images.post || images.post2 || images.story || images.banner
  const imageCount = [images.post, images.post2, images.story, images.banner].filter(Boolean).length

  // Gerar as 3 imagens
  const generateAll = async () => {
    setGenerating(true)
    setErrors([])
    setProgress({ done: 0, total: 4 })
    setGeneratingTypes(new Set(['post', 'post2', 'story', 'banner']))

    const tasks: { type: ImageType; kind: TemplateKind; headline: string; body?: string; postType?: string }[] = [
      {
        type: 'post',
        kind: 'post',
        headline: posts[0]?.headline || brand.tagline,
        body: posts[0]?.body,
        postType: posts[0]?.type,
      },
      {
        type: 'post2',
        kind: 'post',
        headline: posts[1]?.headline || posts[0]?.headline || brand.tagline,
        body: posts[1]?.body || posts[0]?.body,
        postType: posts[1]?.type || posts[0]?.type,
      },
      {
        type: 'story',
        kind: 'story',
        headline: posts[0]?.headline || brand.tagline,
      },
      {
        type: 'banner',
        kind: 'banner',
        headline: hero.headline,
        body: hero.subheadline,
      },
    ]

    const newErrors: string[] = []

    // Gerar sequencialmente para não sobrecarregar
    for (const task of tasks) {
      try {
        const prompt = buildImagePrompt(brand, {
          kind: task.kind,
          headline: task.headline,
          body: task.body,
          postType: task.postType,
        })
        const size = getImageSize(task.kind)
        const res = await fetch('/api/generate-image', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            prompt,
            provider,
            size,
            brandSlug: brand.slug,
            imageType: task.type,
          }),
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.error)

        // Cache-bust: adicionar timestamp na URL para forçar reload
        const url = `${data.url}?t=${Date.now()}`
        setImages((prev) => ({ ...prev, [task.type]: url }))
      } catch (err) {
        newErrors.push(
          `${task.type}: ${err instanceof Error ? err.message : 'Erro desconhecido'}`
        )
      } finally {
        setGeneratingTypes((prev) => {
          const next = new Set(prev)
          next.delete(task.type)
          return next
        })
        setProgress((prev) => ({ ...prev, done: prev.done + 1 }))
      }
    }

    setErrors(newErrors)
    setGenerating(false)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="animate-spin text-[var(--text-ghost)]" size={32} />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">Social Media</h1>
        <p className="mt-1 text-sm text-[var(--text-secondary)]">
          Artes de social media com a identidade visual da marca.
        </p>
        <div className="mt-2 flex items-center gap-2">
          <span className="inline-block rounded-full bg-[var(--bg-muted)] px-3 py-1 text-xs font-medium text-[var(--text-secondary)]">
            4 formatos
          </span>
          {hasImages && (
            <span
              className="inline-block rounded-full px-3 py-1 text-xs font-medium text-white"
              style={{ backgroundColor: brand.theme.primary }}
            >
              {imageCount} gerada{imageCount !== 1 ? 's' : ''} com IA
            </span>
          )}
        </div>
      </div>

      {/* Painel de Geração — só aparece quando faltam imagens */}
      {!hasImages && (
        <div className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)] p-5">
          <div className="flex flex-wrap items-center gap-3">
            <Sparkles size={18} className="text-[var(--text-secondary)]" />

            <select
              value={provider}
              onChange={(e) => setProvider(e.target.value as Provider)}
              disabled={generating}
              className="rounded-lg border border-[var(--border-default)] bg-[var(--bg-page)] px-3 py-2 text-sm text-[var(--text-primary)] disabled:opacity-50"
            >
              <option value="openai">OpenAI — GPT Image 1 (~$0.12 total)</option>
              <option value="openrouter">OpenRouter — Gemini 2.5 Flash</option>
            </select>

            <button
              onClick={generateAll}
              disabled={generating}
              className="flex items-center gap-2 rounded-lg px-5 py-2 text-sm font-semibold text-white transition-opacity disabled:opacity-60"
              style={{ backgroundColor: brand.theme.primary }}
            >
              {generating ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Gerando... ({progress.done}/{progress.total})
                </>
              ) : (
                <>
                  <Sparkles size={16} />
                  Gerar Artes com IA
                </>
              )}
            </button>
          </div>

          {generating && (
            <div className="mt-3">
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-[var(--bg-muted)]">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${progress.total > 0 ? (progress.done / progress.total) * 100 : 0}%`,
                    backgroundColor: brand.theme.primary,
                  }}
                />
              </div>
            </div>
          )}

          {errors.length > 0 && (
            <div className="mt-3 space-y-1">
              {errors.map((err, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 rounded-md bg-red-500/10 px-3 py-1.5 text-xs text-red-400"
                >
                  <AlertCircle size={12} />
                  {err}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Grid 4 Formatos */}
      <div className="flex items-start gap-5 overflow-x-auto pb-2">
        {(['post', 'post2', 'story', 'banner'] as ImageType[]).map((type) => (
          <div key={type} className="flex flex-shrink-0 flex-col items-center gap-2">
            {generatingTypes.has(type) ? (
              <ImageSkeleton ratio={FORMAT_LABELS[type].ratio} />
            ) : images[type] ? (
              <div className="relative overflow-hidden rounded-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={images[type]!}
                  alt={`${brand.name} ${FORMAT_LABELS[type].label}`}
                  className="h-[420px] w-auto rounded-2xl"
                />
                <span className="absolute right-2 top-2 rounded-md bg-black/60 px-2 py-0.5 text-[9px] font-medium text-white backdrop-blur-sm">
                  IA
                </span>
              </div>
            ) : type === 'story' ? (
              <div className="w-full max-w-[200px]">
                <StoryMockup brand={brandInfo} />
              </div>
            ) : type === 'banner' ? (
              <div className="w-full">
                <BannerMockup brand={brandInfo} />
              </div>
            ) : (
              <div className="w-full max-w-[280px]">
                <PostMockup brand={brandInfo} />
              </div>
            )}
            <span className="text-xs font-medium text-[var(--text-ghost)]">
              {FORMAT_LABELS[type].label} {FORMAT_LABELS[type].ratio}
            </span>
          </div>
        ))}
      </div>

      {/* Info quando não tem imagens */}
      {!hasImages && !generating && (
        <div className="flex items-center gap-3 rounded-xl border border-[var(--border-faint)] bg-[var(--bg-subtle)] p-4">
          <ImageIcon size={20} className="text-[var(--text-ghost)]" />
          <p className="text-sm text-[var(--text-muted)]">
            Clique em <strong>&quot;Gerar Artes com IA&quot;</strong> para criar as 3 artes.
            As imagens ficam salvas no projeto e persistem entre recarregamentos.
          </p>
        </div>
      )}
    </div>
  )
}
