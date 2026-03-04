'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Image from 'next/image'
import { useBrand } from '@/context/BrandContext'
import type { LogoVariant, LogoVariantType } from '@/types/brand'
import { Sparkles, Loader2, AlertCircle, Check, Upload } from 'lucide-react'

type Provider = 'openrouter' | 'openai' | 'google'
type PanelStep = 'idle' | 'uploading' | 'ready' | 'generating' | 'done'

interface GeneratedVariants {
  'full-color'?: string
  'icon'?: string
  'mono-white'?: string
  'mono-black'?: string
  'grayscale'?: string
  'full-logo-ai'?: string
  'icon-ai'?: string
}

/* ── Types that are safe for CSS filter approximation ── */
const SAFE_FOR_CSS_FILTER: Set<LogoVariantType> = new Set(['full-color', 'icon'])

/* ── Tier 1: CSS filter map by variant type ── */
const TYPE_DISPLAY_MAP: Record<
  Exclude<LogoVariantType, 'custom'>,
  (brandBg: string) => { css: string; bg: string }
> = {
  'full-color': (brandBg) => ({ css: 'none', bg: brandBg }),
  'mono-white': (brandBg) => ({ css: 'brightness(0) invert(1)', bg: brandBg }),
  'mono-black': () => ({ css: 'brightness(0)', bg: '#F5F5F5' }),
  'grayscale': () => ({ css: 'grayscale(1)', bg: '#FAFAFA' }),
  'icon': (brandBg) => ({ css: 'none', bg: brandBg }),
}

function getVariantDisplay(
  variant: LogoVariant,
  brandBg: string,
): { css: string; bg: string } {
  // Processed files need no CSS filter
  if (variant.processed && variant.file) {
    const mapper = TYPE_DISPLAY_MAP[variant.type as Exclude<LogoVariantType, 'custom'>]
    const bg = mapper ? mapper(brandBg).bg : brandBg
    return { css: 'none', bg }
  }
  if (variant.type === 'custom' && variant.filter) {
    return variant.filter
  }
  const mapper = TYPE_DISPLAY_MAP[variant.type as Exclude<LogoVariantType, 'custom'>]
  return mapper ? mapper(brandBg) : { css: 'none', bg: brandBg }
}

/* ── Variant card with safe fallback ── */
function VariantCard({
  variant,
  logoFile,
  brandName,
  brandBg,
  headingFont,
  hasTransparentLogo,
}: {
  variant: LogoVariant
  logoFile?: string
  brandName: string
  brandBg: string
  headingFont: string
  hasTransparentLogo: boolean
}) {
  const display = getVariantDisplay(variant, brandBg)
  const hasProcessedFile = variant.processed && variant.file
  const hasVariantFile = !!variant.file

  // Determine what to render:
  // 1. Variant has its own file → show it (no filter if processed, with filter if not processed)
  // 2. No variant file + type is safe (full-color/icon) → show logoFile without filter
  // 3. No variant file + type is mono/grayscale + logo is multi-color → placeholder (NO destructive CSS)
  // 4. No variant file + type is mono/grayscale + logo is NOT multi-color → CSS filter approx
  const isSafeType = SAFE_FOR_CSS_FILTER.has(variant.type)
  const isDestructiveType = !isSafeType && variant.type !== 'custom'
  const shouldShowPlaceholder = !hasVariantFile && isDestructiveType && hasTransparentLogo && !variant.filter

  return (
    <div className="card overflow-hidden">
      <div
        className="relative flex items-center justify-center p-8"
        style={{ backgroundColor: display.bg, minHeight: '140px' }}
      >
        {shouldShowPlaceholder ? (
          /* Placeholder for mono variants without processed file on multi-color logos */
          <div className="flex flex-col items-center gap-2">
            <p
              className="text-2xl font-bold opacity-30"
              style={{
                color: variant.type === 'mono-black' ? '#1A1A1A' : '#FFFFFF',
                fontFamily: `'${headingFont}', system-ui`,
              }}
            >
              {brandName}
            </p>
            <span className="rounded bg-black/20 px-2 py-1 text-[9px] font-medium text-white/60 backdrop-blur-sm">
              Run process-logo.ts
            </span>
          </div>
        ) : hasVariantFile ? (
          <>
            <Image
              src={variant.file!}
              alt={variant.name}
              width={180}
              height={60}
              className="h-auto w-[180px]"
              style={hasProcessedFile ? undefined : { filter: display.css }}
            />
            {hasProcessedFile && (
              <span className="absolute right-2 top-2 rounded bg-emerald-500/20 px-1.5 py-0.5 text-[9px] font-medium text-emerald-400 backdrop-blur-sm">
                Processed
              </span>
            )}
          </>
        ) : logoFile && isSafeType ? (
          <Image
            src={logoFile}
            alt={variant.name}
            width={180}
            height={60}
            className="h-auto w-[180px]"
          />
        ) : logoFile ? (
          <>
            <Image
              src={logoFile}
              alt={variant.name}
              width={180}
              height={60}
              className="h-auto w-[180px]"
              style={{ filter: display.css }}
            />
            <span className="absolute right-2 top-2 rounded bg-black/40 px-1.5 py-0.5 text-[9px] font-medium text-white/70 backdrop-blur-sm">
              ≈ CSS approx.
            </span>
          </>
        ) : (
          <p
            className="text-3xl font-bold"
            style={{
              color: display.css === 'brightness(0)' ? '#1A1A1A' : '#FFFFFF',
              fontFamily: `'${headingFont}', system-ui`,
            }}
          >
            {brandName}
          </p>
        )}
      </div>
      <div className="p-4">
        <p className="text-sm font-semibold text-[var(--text-primary)]">{variant.name}</p>
        <p className="mt-1 text-xs text-[var(--text-secondary)]">{variant.description}</p>
      </div>
    </div>
  )
}

export default function LogoGuidelines() {
  const { brand } = useBrand()
  const { logo } = brand

  const logoFile = logo.file || logo.variants.find(v => v.file)?.file
  const iconFile = logo.icon
  const headingFont = brand.typography.stack.find(f => f.role === 'display')?.font || 'system-ui'
  const hasProcessedVariants = logo.variants.some(v => v.processed)
  const hasTransparentLogo = logo.transparent === true

  // Find processed mono files for the mono sections
  const monoWhiteVariant = logo.variants.find(v => v.type === 'mono-white' && v.file && v.processed)
  const monoBlackVariant = logo.variants.find(v => v.type === 'mono-black' && v.file && v.processed)

  // ── AI Generation state ──
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [panelStep, setPanelStep] = useState<PanelStep>('idle')
  const [provider, setProvider] = useState<Provider>('google')
  const [sourceFile, setSourceFile] = useState<string | null>(logoFile || null)
  const [uploadPreview, setUploadPreview] = useState<string | null>(null)
  const [genStep, setGenStep] = useState('')
  const [genProgress, setGenProgress] = useState({ done: 0, total: 0 })
  const [genErrors, setGenErrors] = useState<string[]>([])
  const [genVariants, setGenVariants] = useState<GeneratedVariants>({})
  const [dragOver, setDragOver] = useState(false)

  // Check existing generated variants on mount
  const fetchExistingVariants = useCallback(async () => {
    try {
      const res = await fetch(`/api/brand-logos/${brand.slug}`)
      if (res.ok) {
        const data = await res.json()
        const existing: GeneratedVariants = {}
        for (const [key, val] of Object.entries(data)) {
          if (val) existing[key as keyof GeneratedVariants] = val as string
        }
        if (Object.keys(existing).length > 0) setGenVariants(existing)
      }
    } catch { /* silently fail */ }
  }, [brand.slug])

  useEffect(() => { fetchExistingVariants() }, [fetchExistingVariants])

  // ── Upload handler ──
  const handleUpload = async (file: File) => {
    setPanelStep('uploading')
    setGenErrors([])

    // Local preview
    const previewUrl = URL.createObjectURL(file)
    setUploadPreview(previewUrl)

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('slug', brand.slug)

      const res = await fetch('/api/upload-logo', { method: 'POST', body: formData })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)

      setSourceFile(data.path)
      setPanelStep('ready')
    } catch (err) {
      setGenErrors([err instanceof Error ? err.message : 'Erro no upload'])
      setPanelStep('idle')
      setUploadPreview(null)
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleUpload(file)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files?.[0]
    if (file) handleUpload(file)
  }

  // ── Generation handler ──
  const handleGenerate = async () => {
    if (!sourceFile) return
    setPanelStep('generating')
    setGenErrors([])
    const errors: string[] = []
    setGenProgress({ done: 0, total: 2 })

    // Step 1: Process sharp variants (mono-white, mono-black, grayscale)
    setGenStep('Processando variantes (sharp)...')
    try {
      const res = await fetch('/api/generate-logo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ operation: 'process-variants', slug: brand.slug, sourceFile }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      const ts = Date.now()
      setGenVariants(prev => ({
        ...prev,
        'mono-white': `${data.variants['mono-white']}?t=${ts}`,
        'mono-black': `${data.variants['mono-black']}?t=${ts}`,
        'grayscale': `${data.variants.grayscale}?t=${ts}`,
        'full-color': `${data.variants['full-color']}?t=${ts}`,
      }))
    } catch (err) {
      errors.push(`Variantes: ${err instanceof Error ? err.message : 'Erro desconhecido'}`)
    }
    setGenProgress(prev => ({ ...prev, done: prev.done + 1 }))

    // Step 2: Extract icon with AI
    setGenStep('Extraindo ícone com IA...')
    try {
      const res = await fetch('/api/generate-logo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ operation: 'extract-icon', slug: brand.slug, provider, sourceFile }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setGenVariants(prev => ({ ...prev, 'icon-ai': `${data.icon}?t=${Date.now()}` }))
    } catch (err) {
      errors.push(`Ícone: ${err instanceof Error ? err.message : 'Erro desconhecido'}`)
    }
    setGenProgress(prev => ({ ...prev, done: prev.done + 1 }))

    setGenErrors(errors)
    setGenStep('')
    setPanelStep('done')
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">Logo</h1>
        <p className="mt-1 text-sm text-[var(--text-secondary)]">
          Conceito, variantes e regras de uso do logotipo.
        </p>
      </div>

      {/* Concept */}
      <div
        className="card border-l-[3px] p-6"
        style={{ borderLeftColor: brand.theme.primary }}
      >
        <p className="section-label mb-2">Conceito</p>
        <p className="text-lg font-semibold text-[var(--text-primary)]">{logo.concept}</p>
        <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">{logo.description}</p>
      </div>

      {/* Processing hint banner */}
      {logoFile && !hasProcessedVariants && panelStep === 'idle' && Object.keys(genVariants).length === 0 && (
        <div className="rounded-lg border border-blue-500/20 bg-blue-500/5 p-4">
          <p className="text-xs text-blue-400">
            <span className="font-semibold">Tier 1 ativo:</span> variantes usam CSS filters como aproximação.
            Para arquivos dedicados, execute:{' '}
            <code className="rounded bg-blue-500/10 px-1.5 py-0.5 font-mono text-[11px]">
              npx tsx scripts/process-logo.ts {brand.slug}
            </code>
          </p>
        </div>
      )}

      {/* ── Logo Variant Generator Panel ── */}
      <div className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)] p-5 space-y-4">
        <p className="text-sm font-semibold text-[var(--text-primary)]">Gerador de Variantes</p>

        {/* Hidden file input — outside drag zone */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/webp,image/svg+xml,image/jpeg"
          onChange={handleFileInput}
          className="hidden"
        />

        {/* Source display / upload */}
        {panelStep === 'uploading' ? (
          <div className="flex items-center gap-3 rounded-lg border border-[var(--border-default)] p-4">
            <Loader2 size={18} className="animate-spin text-[var(--text-secondary)]" />
            <span className="text-sm text-[var(--text-secondary)]">Enviando...</span>
          </div>
        ) : sourceFile ? (
          <div className="flex items-center gap-4 rounded-lg border border-[var(--border-default)] p-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[var(--bg-subtle)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={uploadPreview || sourceFile}
                alt="Logo fonte"
                className="h-full w-full object-contain"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-[var(--text-primary)]">Logo selecionado</p>
              <p className="truncate text-xs text-[var(--text-ghost)] font-mono">{sourceFile}</p>
            </div>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="shrink-0 rounded-lg border border-[var(--border-default)] px-3 py-1.5 text-xs font-medium text-[var(--text-muted)] transition-colors hover:bg-[var(--bg-muted)]"
            >
              Trocar
            </button>
          </div>
        ) : (
          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            className={`flex flex-col items-center rounded-lg border-2 border-dashed p-8 transition-colors ${
              dragOver
                ? 'border-[var(--text-secondary)] bg-[var(--bg-muted)]'
                : 'border-[var(--border-default)]'
            }`}
          >
            <Upload size={28} className="mb-3 text-[var(--text-ghost)]" />
            <p className="text-sm text-[var(--text-secondary)]">Arraste o logo principal aqui</p>
            <p className="mt-1 text-xs text-[var(--text-ghost)]">PNG, WebP, SVG ou JPEG — máx. 10MB</p>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="mt-4 rounded-lg border border-[var(--border-default)] px-4 py-2 text-xs font-medium text-[var(--text-muted)] transition-colors hover:bg-[var(--bg-muted)]"
            >
              Selecionar arquivo
            </button>
          </div>
        )}

        {/* Provider + Generate button */}
        {sourceFile && (
          <div className="flex flex-wrap items-center gap-3">
            <select
              value={provider}
              onChange={(e) => setProvider(e.target.value as Provider)}
              disabled={panelStep === 'generating'}
              className="rounded-lg border border-[var(--border-default)] bg-[var(--bg-page)] px-3 py-2 text-sm text-[var(--text-primary)] disabled:opacity-50"
            >
              <option value="google">Google — Nano Banana 2 (créditos gratuitos)</option>
              <option value="openai">OpenAI — GPT Image 1</option>
              <option value="openrouter">OpenRouter — Gemini 2.5 Flash</option>
            </select>

            <button
              onClick={handleGenerate}
              disabled={panelStep === 'generating'}
              className="flex items-center gap-2 rounded-lg px-5 py-2 text-sm font-semibold text-white transition-opacity disabled:opacity-60"
              style={{ backgroundColor: brand.theme.primary }}
            >
              {panelStep === 'generating' ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  {genStep} ({genProgress.done}/{genProgress.total})
                </>
              ) : (
                <>
                  <Sparkles size={16} />
                  {panelStep === 'done' ? 'Regenerar Variantes' : 'Gerar Variantes'}
                </>
              )}
            </button>
          </div>
        )}

        {/* Progress bar */}
        {panelStep === 'generating' && (
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-[var(--bg-muted)]">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${genProgress.total > 0 ? (genProgress.done / genProgress.total) * 100 : 0}%`,
                backgroundColor: brand.theme.primary,
              }}
            />
          </div>
        )}

        {/* Success */}
        {panelStep === 'done' && genErrors.length === 0 && (
          <div className="flex items-center gap-2 text-xs text-emerald-400">
            <Check size={14} />
            Variantes geradas com sucesso.
          </div>
        )}

        {/* Errors */}
        {genErrors.length > 0 && (
          <div className="space-y-1">
            {genErrors.map((err, i) => (
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

      {/* Logo Display — Main */}
      <div>
        <p className="section-label mb-4">Logo Principal</p>
        <div className="bento bento-2">
          {/* Full color on dark */}
          <div
            className="card flex items-center justify-center overflow-hidden p-12"
            style={{ backgroundColor: '#000000', minHeight: '260px' }}
          >
            {logoFile ? (
              <Image
                src={logoFile}
                alt={`${brand.name} logo full color on dark`}
                width={280}
                height={100}
                className="h-auto w-[280px]"
              />
            ) : (
              <p
                className="text-5xl font-bold"
                style={{ color: brand.theme.primary, fontFamily: `'${headingFont}', system-ui` }}
              >
                {brand.name}
              </p>
            )}
          </div>
          {/* Full color on light — use gray bg if logo has white parts */}
          <div
            className="card flex items-center justify-center overflow-hidden p-12"
            style={{ backgroundColor: hasTransparentLogo ? '#E8E8E8' : '#FFFFFF', minHeight: '260px' }}
          >
            {logoFile ? (
              <Image
                src={logoFile}
                alt={`${brand.name} logo full color on light`}
                width={280}
                height={100}
                className="h-auto w-[280px]"
              />
            ) : (
              <p
                className="text-5xl font-bold"
                style={{ color: brand.theme.primary, fontFamily: `'${headingFont}', system-ui` }}
              >
                {brand.name}
              </p>
            )}
          </div>
        </div>
        <p className="mt-2 text-[11px] text-[var(--text-ghost)]">
          Logo full color sobre fundo escuro e fundo claro.{hasTransparentLogo ? ' Fundo cinza usado para preservar visibilidade de elementos brancos.' : ''}
        </p>
      </div>

      {/* Mono versions */}
      <div>
        <p className="section-label mb-4">Versões Monocromáticas</p>
        <div className="bento bento-2">
          {/* White on dark */}
          <div className="card relative flex items-center justify-center overflow-hidden p-12" style={{ backgroundColor: brand.theme.bg, minHeight: '200px' }}>
            {monoWhiteVariant ? (
              <Image
                src={monoWhiteVariant.file!}
                alt={`${brand.name} logo white on dark`}
                width={240}
                height={80}
                className="h-auto w-[240px]"
              />
            ) : logoFile && !hasTransparentLogo ? (
              <>
                <Image
                  src={logoFile}
                  alt={`${brand.name} logo white on dark`}
                  width={240}
                  height={80}
                  className="h-auto w-[240px]"
                  style={{ filter: 'brightness(0) invert(1)' }}
                />
                <span className="absolute right-2 top-2 rounded bg-black/40 px-1.5 py-0.5 text-[9px] font-medium text-white/70 backdrop-blur-sm">
                  ≈ CSS approx.
                </span>
              </>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <p
                  className="text-4xl font-bold text-white opacity-30"
                  style={{ fontFamily: `'${headingFont}', system-ui` }}
                >
                  {brand.name}
                </p>
                {logoFile && (
                  <span className="rounded bg-black/30 px-2 py-1 text-[9px] text-white/50">
                    Run process-logo.ts for accurate mono
                  </span>
                )}
              </div>
            )}
            <p className="absolute bottom-3 text-[10px] text-white/40">Branco sobre fundo escuro</p>
          </div>
          {/* Black on light */}
          <div className="card relative flex items-center justify-center overflow-hidden p-12" style={{ backgroundColor: '#F5F5F5', minHeight: '200px' }}>
            {monoBlackVariant ? (
              <Image
                src={monoBlackVariant.file!}
                alt={`${brand.name} logo black on light`}
                width={240}
                height={80}
                className="h-auto w-[240px]"
              />
            ) : logoFile && !hasTransparentLogo ? (
              <>
                <Image
                  src={logoFile}
                  alt={`${brand.name} logo black on light`}
                  width={240}
                  height={80}
                  className="h-auto w-[240px]"
                  style={{ filter: 'brightness(0)' }}
                />
                <span className="absolute right-2 top-2 rounded bg-white/60 px-1.5 py-0.5 text-[9px] font-medium text-black/50">
                  ≈ CSS approx.
                </span>
              </>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <p
                  className="text-4xl font-bold text-gray-900 opacity-30"
                  style={{ fontFamily: `'${headingFont}', system-ui` }}
                >
                  {brand.name}
                </p>
                {logoFile && (
                  <span className="rounded bg-white/60 px-2 py-1 text-[9px] text-black/50">
                    Run process-logo.ts for accurate mono
                  </span>
                )}
              </div>
            )}
            <p className="absolute bottom-3 text-[10px] text-[var(--text-ghost)]">Preto sobre fundo claro</p>
          </div>
        </div>
        <p className="mt-2 text-[11px] text-[var(--text-ghost)]">
          Versões monocromáticas para uso em fundos que não sejam preto ou branco puro.
        </p>
      </div>

      {/* Clearspace */}
      <div>
        <p className="section-label mb-4">Zona de Exclusão (Clearspace)</p>
        <div className="card flex items-center justify-center overflow-hidden p-12" style={{ backgroundColor: '#FAFAFA', minHeight: '280px' }}>
          <div className="relative inline-flex items-center justify-center">
            {/* Clearspace guides */}
            <div className="absolute inset-0 -m-8 rounded-lg border-2 border-dashed border-blue-300" />
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex flex-col items-center">
              <span className="text-[9px] font-medium text-blue-400">x</span>
              <div className="h-6 w-px bg-blue-300" />
            </div>
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center">
              <div className="h-6 w-px bg-blue-300" />
              <span className="text-[9px] font-medium text-blue-400">x</span>
            </div>
            <div className="absolute -left-8 top-1/2 -translate-y-1/2 flex items-center">
              <span className="text-[9px] font-medium text-blue-400">x</span>
              <div className="h-px w-6 bg-blue-300" />
            </div>
            <div className="absolute -right-8 top-1/2 -translate-y-1/2 flex items-center">
              <div className="h-px w-6 bg-blue-300" />
              <span className="text-[9px] font-medium text-blue-400">x</span>
            </div>
            {monoBlackVariant ? (
              <Image
                src={monoBlackVariant.file!}
                alt={`${brand.name} clearspace`}
                width={200}
                height={70}
                className="h-auto w-[200px]"
              />
            ) : logoFile ? (
              <Image
                src={logoFile}
                alt={`${brand.name} clearspace`}
                width={200}
                height={70}
                className="h-auto w-[200px]"
                style={hasTransparentLogo ? undefined : { filter: 'brightness(0)' }}
              />
            ) : (
              <p
                className="text-3xl font-bold text-gray-900"
                style={{ fontFamily: `'${headingFont}', system-ui` }}
              >
                {brand.name}
              </p>
            )}
          </div>
        </div>
        <p className="mt-2 text-[11px] text-[var(--text-ghost)]">
          Manter distância mínima de &quot;x&quot; (metade da altura do ícone) ao redor do logo. Nenhum elemento deve invadir essa zona.
        </p>
      </div>

      {/* Minimum Size */}
      <div>
        <p className="section-label mb-4">Tamanho Mínimo</p>
        <div className="card p-8">
          <div className="flex items-end gap-12">
            {/* Full logo minimum */}
            <div className="flex flex-col items-center gap-3">
              {monoBlackVariant ? (
                <Image
                  src={monoBlackVariant.file!}
                  alt="Logo mínimo"
                  width={70}
                  height={24}
                  className="h-auto w-[70px]"
                />
              ) : logoFile ? (
                <Image
                  src={logoFile}
                  alt="Logo mínimo"
                  width={70}
                  height={24}
                  className="h-auto w-[70px]"
                  style={hasTransparentLogo ? undefined : { filter: 'brightness(0)' }}
                />
              ) : (
                <p
                  className="text-sm font-bold text-gray-900"
                  style={{ fontFamily: `'${headingFont}', system-ui` }}
                >
                  {brand.name}
                </p>
              )}
              <div className="text-center">
                <p className="text-[11px] font-semibold text-[var(--text-muted)]">70px</p>
                <p className="text-[10px] text-[var(--text-ghost)]">Digital mínimo</p>
              </div>
            </div>
            {/* Icon only minimum */}
            <div className="flex flex-col items-center gap-3">
              {iconFile ? (
                <Image
                  src={iconFile}
                  alt="Ícone mínimo"
                  width={21}
                  height={21}
                  className="h-[21px] w-[21px]"
                />
              ) : logoFile ? (
                <Image
                  src={logoFile}
                  alt="Ícone mínimo"
                  width={21}
                  height={21}
                  className="h-[21px] w-[21px] object-contain"
                  style={hasTransparentLogo ? undefined : { filter: 'brightness(0)' }}
                />
              ) : (
                <div
                  className="flex h-[21px] w-[21px] items-center justify-center rounded bg-gray-200"
                >
                  <span
                    className="text-[9px] font-bold text-gray-600"
                    style={{ fontFamily: `'${headingFont}', system-ui` }}
                  >
                    {brand.name.charAt(0)}
                  </span>
                </div>
              )}
              <div className="text-center">
                <p className="text-[11px] font-semibold text-[var(--text-muted)]">21px</p>
                <p className="text-[10px] text-[var(--text-ghost)]">Ícone mínimo</p>
              </div>
            </div>
            {/* Print minimum */}
            <div className="flex flex-col items-center gap-3">
              {monoBlackVariant ? (
                <Image
                  src={monoBlackVariant.file!}
                  alt="Logo impresso mínimo"
                  width={100}
                  height={35}
                  className="h-auto w-[100px]"
                />
              ) : logoFile ? (
                <Image
                  src={logoFile}
                  alt="Logo impresso mínimo"
                  width={100}
                  height={35}
                  className="h-auto w-[100px]"
                  style={hasTransparentLogo ? undefined : { filter: 'brightness(0)' }}
                />
              ) : (
                <p
                  className="text-base font-bold text-gray-900"
                  style={{ fontFamily: `'${headingFont}', system-ui` }}
                >
                  {brand.name}
                </p>
              )}
              <div className="text-center">
                <p className="text-[11px] font-semibold text-[var(--text-muted)]">20mm</p>
                <p className="text-[10px] text-[var(--text-ghost)]">Impresso mínimo</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Variants */}
      <div>
        <p className="section-label mb-4">Variantes</p>
        <div className="grid gap-4 md:grid-cols-2">
          {logo.variants.map((v) => (
            <VariantCard
              key={v.name}
              variant={v}
              logoFile={logoFile}
              brandName={brand.name}
              brandBg={brand.theme.bg}
              headingFont={headingFont}
              hasTransparentLogo={hasTransparentLogo}
            />
          ))}
        </div>
      </div>

      {/* AI Generated Variants (if any) */}
      {Object.keys(genVariants).length > 0 && (
        <div>
          <p className="section-label mb-4">Variantes Geradas</p>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Object.entries(genVariants).map(([type, url]) => {
              const isAI = type.endsWith('-ai')
              const bgMap: Record<string, string> = {
                'full-color': brand.theme.bg,
                'full-logo-ai': brand.theme.bg,
                'mono-white': brand.theme.bg,
                'mono-black': '#F5F5F5',
                'grayscale': '#FAFAFA',
                'icon': brand.theme.bg,
                'icon-ai': brand.theme.bg,
              }
              const labelMap: Record<string, string> = {
                'full-color': 'Full Color',
                'full-logo-ai': 'Logo (AI)',
                'mono-white': 'Mono White',
                'mono-black': 'Mono Black',
                'grayscale': 'Grayscale',
                'icon': 'Icon',
                'icon-ai': 'Icon (AI)',
              }
              return (
                <div key={type} className="card overflow-hidden">
                  <div
                    className="relative flex items-center justify-center p-8"
                    style={{ backgroundColor: bgMap[type] || brand.theme.bg, minHeight: '140px' }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={url}
                      alt={labelMap[type] || type}
                      className="h-auto max-h-[120px] w-auto max-w-[180px]"
                    />
                    <span
                      className={`absolute right-2 top-2 rounded px-1.5 py-0.5 text-[9px] font-medium backdrop-blur-sm ${
                        isAI
                          ? 'bg-purple-500/20 text-purple-400'
                          : 'bg-emerald-500/20 text-emerald-400'
                      }`}
                    >
                      {isAI ? 'AI Generated' : 'Processed'}
                    </span>
                  </div>
                  <div className="p-4">
                    <p className="text-sm font-semibold text-[var(--text-primary)]">{labelMap[type] || type}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Rules & Misuse */}
      <div className="bento bento-2">
        <div className="card p-6">
          <p className="mb-3 text-sm font-semibold text-emerald-600">Regras de Uso</p>
          <ul className="space-y-2">
            {logo.rules.map((r) => (
              <li key={r} className="flex items-start gap-2 text-xs text-[var(--text-secondary)]">
                <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                {r}
              </li>
            ))}
          </ul>
        </div>
        <div className="card p-6">
          <p className="mb-3 text-sm font-semibold text-red-500">Uso Incorreto</p>
          <ul className="space-y-2">
            {logo.misuse.map((m) => (
              <li key={m} className="flex items-start gap-2 text-xs text-[var(--text-secondary)]">
                <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400" />
                {m}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
