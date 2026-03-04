'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Image from 'next/image'
import { useBrand } from '@/context/BrandContext'
import { Sparkles, Loader2, AlertCircle, Check, Upload } from 'lucide-react'

type Provider = 'openrouter' | 'openai' | 'google'
type PanelStep = 'idle' | 'uploading' | 'ready' | 'generating' | 'done'

interface GeneratedVariants {
  'mono-light'?: string
  'mono-dark'?: string
  'icon-ai'?: string
  'stacked-ai'?: string
}

export default function LogoGuidelines() {
  const { brand } = useBrand()
  const { logo } = brand

  const logoFile = logo.file || logo.variants.find(v => v.file)?.file
  const iconFile = logo.icon
  const headingFont = brand.typography.stack.find(f => f.role === 'display')?.font || 'system-ui'
  const hasTransparentLogo = logo.transparent === true

  // Find processed mono files for the mono sections
  const monoLightVariant = logo.variants.find(v => v.type === 'mono-light' && v.file)
  const monoDarkVariant = logo.variants.find(v => v.type === 'mono-dark' && v.file)
  const stackedVariant = logo.variants.find(v => v.type === 'stacked')
  const iconVariant = logo.variants.find(v => v.type === 'icon')

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

  // ── Process Sharp Mono ──
  const handleProcessMono = async () => {
    if (!sourceFile) return
    setPanelStep('generating')
    setGenErrors([])
    setGenProgress({ done: 0, total: 1 })
    setGenStep('Processando variantes mono (sharp)...')

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
        'mono-light': `${data.variants['mono-light']}?t=${ts}`,
        'mono-dark': `${data.variants['mono-dark']}?t=${ts}`,
      }))
      setGenProgress({ done: 1, total: 1 })
      setGenStep('')
      setPanelStep('done')
    } catch (err) {
      setGenErrors([`Mono: ${err instanceof Error ? err.message : 'Erro desconhecido'}`])
      setGenStep('')
      setPanelStep('ready')
    }
  }

  // ── Generate AI variants (icon + stacked) ──
  const handleGenerateAI = async () => {
    if (!sourceFile) return
    setPanelStep('generating')
    setGenErrors([])
    const errors: string[] = []
    setGenProgress({ done: 0, total: 2 })

    // 1. Extract icon with AI
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
    setGenProgress({ done: 1, total: 2 })

    // 2. Generate stacked layout with AI
    setGenStep('Gerando layout vertical com IA...')
    try {
      const res = await fetch('/api/generate-logo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ operation: 'generate-stacked', slug: brand.slug, provider, sourceFile }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setGenVariants(prev => ({ ...prev, 'stacked-ai': `${data.stacked}?t=${Date.now()}` }))
    } catch (err) {
      errors.push(`Vertical: ${err instanceof Error ? err.message : 'Erro desconhecido'}`)
    }
    setGenProgress({ done: 2, total: 2 })

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

      {/* ── Logo Variant Generator Panel ── */}
      <div className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)] p-5 space-y-4">
        <p className="text-sm font-semibold text-[var(--text-primary)]">Gerador de Variantes</p>

        {/* Hidden file input */}
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
            <p className="mt-1 text-xs text-[var(--text-ghost)]">PNG, WebP, SVG ou JPEG — max. 10MB</p>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="mt-4 rounded-lg border border-[var(--border-default)] px-4 py-2 text-xs font-medium text-[var(--text-muted)] transition-colors hover:bg-[var(--bg-muted)]"
            >
              Selecionar arquivo
            </button>
          </div>
        )}

        {/* Two operation buttons */}
        {sourceFile && (
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleProcessMono}
              disabled={panelStep === 'generating'}
              className="flex items-center gap-2 rounded-lg border border-[var(--border-default)] px-4 py-2 text-sm font-medium text-[var(--text-primary)] transition-colors hover:bg-[var(--bg-muted)] disabled:opacity-60"
            >
              {panelStep === 'generating' && genStep.includes('mono') ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Check size={16} />
              )}
              Processar Mono (Sharp)
            </button>

            <div className="flex items-center gap-2">
              <select
                value={provider}
                onChange={(e) => setProvider(e.target.value as Provider)}
                disabled={panelStep === 'generating'}
                className="rounded-lg border border-[var(--border-default)] bg-[var(--bg-page)] px-3 py-2 text-sm text-[var(--text-primary)] disabled:opacity-50"
              >
                <option value="google">Google — Nano Banana 2</option>
                <option value="openai">OpenAI — GPT Image 1</option>
                <option value="openrouter">OpenRouter — Gemini 2.5 Flash</option>
              </select>

              <button
                onClick={handleGenerateAI}
                disabled={panelStep === 'generating'}
                className="flex items-center gap-2 rounded-lg px-5 py-2 text-sm font-semibold text-white transition-opacity disabled:opacity-60"
                style={{ backgroundColor: brand.theme.primary }}
              >
                {panelStep === 'generating' && genStep.includes('IA') ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <Sparkles size={16} />
                )}
                Gerar com IA
              </button>
            </div>
          </div>
        )}

        {/* Progress bar */}
        {panelStep === 'generating' && (
          <div className="space-y-1">
            <p className="text-xs text-[var(--text-secondary)]">{genStep}</p>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-[var(--bg-muted)]">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${genProgress.total > 0 ? (genProgress.done / genProgress.total) * 100 : 0}%`,
                  backgroundColor: brand.theme.primary,
                }}
              />
            </div>
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
                alt={`${brand.name} logo on dark`}
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
          {/* Full color on light */}
          <div
            className="card flex items-center justify-center overflow-hidden p-12"
            style={{ backgroundColor: hasTransparentLogo ? '#E8E8E8' : '#FFFFFF', minHeight: '260px' }}
          >
            {logoFile ? (
              <Image
                src={logoFile}
                alt={`${brand.name} logo on light`}
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
          Logo horizontal sobre fundo escuro e fundo claro.{hasTransparentLogo ? ' Fundo cinza usado para preservar visibilidade de elementos brancos.' : ''}
        </p>
      </div>

      {/* Layout Variations — Stacked + Icon */}
      <div>
        <p className="section-label mb-4">Variações de Layout</p>
        <div className="bento bento-2">
          {/* Stacked / Vertical */}
          <div className="card overflow-hidden">
            <div
              className="relative flex items-center justify-center p-8"
              style={{ backgroundColor: brand.theme.bg, minHeight: '200px' }}
            >
              {stackedVariant?.file ? (
                <>
                  <Image
                    src={stackedVariant.file}
                    alt={`${brand.name} logo vertical`}
                    width={180}
                    height={200}
                    className="h-auto max-h-[160px] w-auto max-w-[180px]"
                  />
                  {stackedVariant.source && (
                    <span className={`absolute right-2 top-2 rounded px-1.5 py-0.5 text-[9px] font-medium backdrop-blur-sm ${
                      stackedVariant.source === 'ai' ? 'bg-purple-500/20 text-purple-400' : 'bg-emerald-500/20 text-emerald-400'
                    }`}>
                      {stackedVariant.source === 'ai' ? 'AI Generated' : 'Processed'}
                    </span>
                  )}
                </>
              ) : genVariants['stacked-ai'] ? (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={genVariants['stacked-ai']}
                    alt={`${brand.name} logo vertical`}
                    className="h-auto max-h-[160px] w-auto max-w-[180px]"
                  />
                  <span className="absolute right-2 top-2 rounded bg-purple-500/20 px-1.5 py-0.5 text-[9px] font-medium text-purple-400 backdrop-blur-sm">
                    AI Generated
                  </span>
                </>
              ) : (
                <div className="flex flex-col items-center gap-3">
                  <div
                    className="flex h-16 w-16 items-center justify-center rounded-xl"
                    style={{ backgroundColor: brand.theme.primary + '20' }}
                  >
                    <span
                      className="text-2xl font-bold"
                      style={{ color: brand.theme.primary, fontFamily: `'${headingFont}', system-ui` }}
                    >
                      {brand.name.charAt(0)}
                    </span>
                  </div>
                  <p
                    className="text-sm font-bold opacity-30"
                    style={{ color: '#FFFFFF', fontFamily: `'${headingFont}', system-ui` }}
                  >
                    {brand.name}
                  </p>
                  <span className="rounded bg-black/20 px-2 py-1 text-[9px] font-medium text-white/50 backdrop-blur-sm">
                    Gerar com IA
                  </span>
                </div>
              )}
            </div>
            <div className="p-4">
              <p className="text-sm font-semibold text-[var(--text-primary)]">
                {stackedVariant?.name || 'Logo Vertical'}
              </p>
              <p className="mt-1 text-xs text-[var(--text-secondary)]">
                {stackedVariant?.description || 'Logo empilhado — social media, mobile, espaços restritos'}
              </p>
            </div>
          </div>

          {/* Icon */}
          <div className="card overflow-hidden">
            <div
              className="relative flex items-center justify-center p-8"
              style={{ backgroundColor: brand.theme.bg, minHeight: '200px' }}
            >
              {iconVariant?.file || iconFile ? (
                <>
                  <Image
                    src={(iconVariant?.file || iconFile)!}
                    alt={`${brand.name} ícone`}
                    width={120}
                    height={120}
                    className="h-auto max-h-[120px] w-auto max-w-[120px]"
                  />
                  {iconVariant?.source && (
                    <span className={`absolute right-2 top-2 rounded px-1.5 py-0.5 text-[9px] font-medium backdrop-blur-sm ${
                      iconVariant.source === 'ai' ? 'bg-purple-500/20 text-purple-400' : 'bg-emerald-500/20 text-emerald-400'
                    }`}>
                      {iconVariant.source === 'ai' ? 'AI Generated' : 'Processed'}
                    </span>
                  )}
                </>
              ) : genVariants['icon-ai'] ? (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={genVariants['icon-ai']}
                    alt={`${brand.name} ícone`}
                    className="h-auto max-h-[120px] w-auto max-w-[120px]"
                  />
                  <span className="absolute right-2 top-2 rounded bg-purple-500/20 px-1.5 py-0.5 text-[9px] font-medium text-purple-400 backdrop-blur-sm">
                    AI Generated
                  </span>
                </>
              ) : (
                <div className="flex flex-col items-center gap-3">
                  <div
                    className="flex h-16 w-16 items-center justify-center rounded-xl"
                    style={{ backgroundColor: brand.theme.primary + '20' }}
                  >
                    <span
                      className="text-2xl font-bold"
                      style={{ color: brand.theme.primary, fontFamily: `'${headingFont}', system-ui` }}
                    >
                      {brand.name.charAt(0)}
                    </span>
                  </div>
                  <span className="rounded bg-black/20 px-2 py-1 text-[9px] font-medium text-white/50 backdrop-blur-sm">
                    Gerar com IA
                  </span>
                </div>
              )}
            </div>
            <div className="p-4">
              <p className="text-sm font-semibold text-[var(--text-primary)]">
                {iconVariant?.name || 'Ícone'}
              </p>
              <p className="mt-1 text-xs text-[var(--text-secondary)]">
                {iconVariant?.description || 'Somente o símbolo — favicon, app icon, perfil'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mono versions */}
      <div>
        <p className="section-label mb-4">Versoes Monocromaticas</p>
        <div className="bento bento-2">
          {/* Light on dark */}
          <div className="card relative flex items-center justify-center overflow-hidden p-12" style={{ backgroundColor: brand.theme.bg, minHeight: '200px' }}>
            {monoLightVariant ? (
              <Image
                src={monoLightVariant.file!}
                alt={`${brand.name} mono light`}
                width={240}
                height={80}
                className="h-auto w-[240px]"
              />
            ) : genVariants['mono-light'] ? (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={genVariants['mono-light']}
                  alt={`${brand.name} mono light`}
                  className="h-auto w-[240px]"
                />
                <span className="absolute right-2 top-2 rounded bg-emerald-500/20 px-1.5 py-0.5 text-[9px] font-medium text-emerald-400 backdrop-blur-sm">
                  Processed
                </span>
              </>
            ) : logoFile && !hasTransparentLogo ? (
              <>
                <Image
                  src={logoFile}
                  alt={`${brand.name} mono light`}
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
                    Upload + Processar Mono
                  </span>
                )}
              </div>
            )}
            <p className="absolute bottom-3 text-[10px] text-white/40">Mono claro sobre fundo escuro</p>
          </div>
          {/* Dark on light */}
          <div className="card relative flex items-center justify-center overflow-hidden p-12" style={{ backgroundColor: '#F5F5F5', minHeight: '200px' }}>
            {monoDarkVariant ? (
              <Image
                src={monoDarkVariant.file!}
                alt={`${brand.name} mono dark`}
                width={240}
                height={80}
                className="h-auto w-[240px]"
              />
            ) : genVariants['mono-dark'] ? (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={genVariants['mono-dark']}
                  alt={`${brand.name} mono dark`}
                  className="h-auto w-[240px]"
                />
                <span className="absolute right-2 top-2 rounded bg-emerald-500/20 px-1.5 py-0.5 text-[9px] font-medium text-emerald-400 backdrop-blur-sm">
                  Processed
                </span>
              </>
            ) : logoFile && !hasTransparentLogo ? (
              <>
                <Image
                  src={logoFile}
                  alt={`${brand.name} mono dark`}
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
                    Upload + Processar Mono
                  </span>
                )}
              </div>
            )}
            <p className="absolute bottom-3 text-[10px] text-[var(--text-ghost)]">Mono escuro sobre fundo claro</p>
          </div>
        </div>
      </div>

      {/* Clearspace */}
      <div>
        <p className="section-label mb-4">Zona de Exclusao (Clearspace)</p>
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
            {monoDarkVariant ? (
              <Image
                src={monoDarkVariant.file!}
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
          Manter distancia minima de &quot;x&quot; (metade da altura do icone) ao redor do logo. Nenhum elemento deve invadir essa zona.
        </p>
      </div>

      {/* Minimum Size */}
      <div>
        <p className="section-label mb-4">Tamanho Minimo</p>
        <div className="card p-8">
          <div className="flex items-end gap-12">
            {/* Full logo minimum */}
            <div className="flex flex-col items-center gap-3">
              {monoDarkVariant ? (
                <Image
                  src={monoDarkVariant.file!}
                  alt="Logo minimo"
                  width={70}
                  height={24}
                  className="h-auto w-[70px]"
                />
              ) : logoFile ? (
                <Image
                  src={logoFile}
                  alt="Logo minimo"
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
                <p className="text-[10px] text-[var(--text-ghost)]">Digital minimo</p>
              </div>
            </div>
            {/* Icon only minimum */}
            <div className="flex flex-col items-center gap-3">
              {iconFile ? (
                <Image
                  src={iconFile}
                  alt="Icone minimo"
                  width={21}
                  height={21}
                  className="h-[21px] w-[21px]"
                />
              ) : logoFile ? (
                <Image
                  src={logoFile}
                  alt="Icone minimo"
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
                <p className="text-[10px] text-[var(--text-ghost)]">Icone minimo</p>
              </div>
            </div>
            {/* Print minimum */}
            <div className="flex flex-col items-center gap-3">
              {monoDarkVariant ? (
                <Image
                  src={monoDarkVariant.file!}
                  alt="Logo impresso minimo"
                  width={100}
                  height={35}
                  className="h-auto w-[100px]"
                />
              ) : logoFile ? (
                <Image
                  src={logoFile}
                  alt="Logo impresso minimo"
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
                <p className="text-[10px] text-[var(--text-ghost)]">Impresso minimo</p>
              </div>
            </div>
          </div>
        </div>
      </div>

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
