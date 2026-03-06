'use client'

import Image from 'next/image'
import { useBrand } from '@/context/BrandContext'
import {
  resolveVariant,
  resolveAllVariants,
  getCompletenessScore,
  getSourceLabel,
} from '@/utils/logo-variant-resolver'
import type { ResolvedVariant } from '@/utils/logo-variant-resolver'

function VariantTile({ resolved, brandName, headingFont }: {
  resolved: ResolvedVariant
  brandName: string
  headingFont: string
}) {
  const sourceLabel = getSourceLabel(resolved.source)

  return (
    <div className="card overflow-hidden">
      <div
        className="relative flex items-center justify-center p-8"
        style={{ backgroundColor: resolved.tileBg, minHeight: '180px' }}
      >
        {resolved.status === 'ready' && resolved.src && (
          <Image
            src={resolved.src}
            alt={`${brandName} ${resolved.name}`}
            width={resolved.type === 'icon' ? 100 : 200}
            height={resolved.type === 'icon' ? 100 : 70}
            className={
              resolved.type === 'icon'
                ? 'h-auto max-h-[100px] w-auto max-w-[100px]'
                : 'h-auto w-[200px]'
            }
          />
        )}
        {resolved.status === 'css-only' && resolved.src && (
          <Image
            src={resolved.src}
            alt={`${brandName} ${resolved.name}`}
            width={200}
            height={70}
            className="h-auto w-[200px]"
            style={{ filter: resolved.cssFilter || undefined }}
          />
        )}
        {resolved.status === 'missing' && (
          <div className="flex flex-col items-center gap-2 text-center">
            <div
              className="flex h-16 w-16 items-center justify-center rounded-xl border-2 border-dashed"
              style={{ borderColor: 'var(--text-ghost)' }}
            >
              <span
                className="text-xl font-bold"
                style={{ color: 'var(--text-ghost)', fontFamily: `'${headingFont}', system-ui` }}
              >
                {brandName.charAt(0)}
              </span>
            </div>
            {resolved.guidance && (
              <p className="max-w-[180px] text-[10px] leading-tight text-[var(--text-ghost)]">
                {resolved.guidance}
              </p>
            )}
          </div>
        )}
        {sourceLabel && (
          <span className="absolute right-2 top-2 rounded bg-black/40 px-1.5 py-0.5 text-[9px] font-medium text-white/80">
            {sourceLabel}
          </span>
        )}
      </div>
      <div className="p-4">
        <p className="text-sm font-semibold text-[var(--text-primary)]">{resolved.name}</p>
        <p className="mt-1 text-xs text-[var(--text-secondary)]">{resolved.description}</p>
      </div>
    </div>
  )
}

export default function LogoGuidelines() {
  const { brand } = useBrand()
  const { logo } = brand

  const horizontal = resolveVariant(brand, 'horizontal')
  const allVariants = resolveAllVariants(brand)
  const completeness = getCompletenessScore(brand)

  const headingFont = brand.typography.stack.find(f => f.role === 'display')?.font || 'system-ui'
  const hasTransparentLogo = logo.transparent === true

  // Variants for the bento grid (all except the first horizontal — the hero)
  const variantTiles = allVariants.filter((v, i) => !(v.type === 'horizontal' && i === 0))

  // For icon in minimum size section
  const iconResolved = resolveVariant(brand, 'icon')

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

      {/* Logo Display — Main */}
      <div>
        <p className="section-label mb-4">Logo Principal</p>
        <div className="bento bento-2">
          {/* Full color on dark */}
          <div
            className="card flex items-center justify-center overflow-hidden p-12"
            style={{ backgroundColor: '#000000', minHeight: '260px' }}
          >
            {horizontal.src ? (
              <Image
                src={horizontal.src}
                alt={`${brand.name} logo on dark`}
                width={280}
                height={100}
                className="h-auto w-[280px]"
                style={horizontal.cssFilter ? { filter: horizontal.cssFilter } : undefined}
              />
            ) : (
              <div className="flex flex-col items-center gap-3 text-center">
                <p
                  className="text-5xl font-bold"
                  style={{ color: brand.theme.primary, fontFamily: `'${headingFont}', system-ui` }}
                >
                  {brand.name}
                </p>
                {horizontal.guidance && (
                  <p className="max-w-[240px] text-[11px] text-white/40">{horizontal.guidance}</p>
                )}
              </div>
            )}
          </div>
          {/* Full color on light */}
          <div
            className="card flex items-center justify-center overflow-hidden p-12"
            style={{ backgroundColor: hasTransparentLogo ? '#E8E8E8' : '#FFFFFF', minHeight: '260px' }}
          >
            {horizontal.src ? (
              <Image
                src={horizontal.src}
                alt={`${brand.name} logo on light`}
                width={280}
                height={100}
                className="h-auto w-[280px]"
                style={horizontal.cssFilter ? { filter: horizontal.cssFilter } : undefined}
              />
            ) : (
              <div className="flex flex-col items-center gap-3 text-center">
                <p
                  className="text-5xl font-bold"
                  style={{ color: brand.theme.primary, fontFamily: `'${headingFont}', system-ui` }}
                >
                  {brand.name}
                </p>
                {horizontal.guidance && (
                  <p className="max-w-[240px] text-[11px] text-black/40">{horizontal.guidance}</p>
                )}
              </div>
            )}
          </div>
        </div>
        <p className="mt-2 text-[11px] text-[var(--text-ghost)]">
          Logo horizontal sobre fundo escuro e fundo claro.{hasTransparentLogo ? ' Fundo cinza usado para preservar visibilidade de elementos brancos.' : ''}
        </p>
      </div>

      {/* Variants — Stacked + Icon + Mono */}
      <div>
        <p className="section-label mb-4">Variantes</p>
        <div className="bento bento-2 lg:grid-cols-4">
          {variantTiles.map(v => (
            <VariantTile
              key={v.type}
              resolved={v}
              brandName={brand.name}
              headingFont={headingFont}
            />
          ))}
        </div>
      </div>

      {/* Completeness */}
      <div className="card p-6">
        <p className="section-label mb-3">
          Kit de Logo: {completeness.ready} de {completeness.total} variantes prontas
        </p>
        <div className="flex flex-wrap gap-4">
          {allVariants.map(v => {
            const dotColor =
              v.status === 'ready' ? '#22c55e' :
              v.status === 'css-only' ? '#eab308' :
              '#ef4444'
            return (
              <div key={v.type} className="flex items-center gap-1.5">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: dotColor }}
                />
                <span className="text-xs text-[var(--text-secondary)]">{v.name}</span>
              </div>
            )
          })}
        </div>
        <div className="mt-2 flex gap-4 text-[10px] text-[var(--text-ghost)]">
          <span className="flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-[#22c55e]" /> Arquivo pronto
          </span>
          <span className="flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-[#eab308]" /> Fallback CSS
          </span>
          <span className="flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-[#ef4444]" /> Faltando
          </span>
        </div>
      </div>

      {/* Clearspace */}
      <div>
        <p className="section-label mb-4">Zona de Exclusao (Clearspace)</p>
        {horizontal.src ? (
          <>
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
                <Image
                  src={horizontal.src}
                  alt={`${brand.name} clearspace`}
                  width={200}
                  height={70}
                  className="h-auto w-[200px]"
                  style={hasTransparentLogo ? undefined : { filter: 'brightness(0)' }}
                />
              </div>
            </div>
            <p className="mt-2 text-[11px] text-[var(--text-ghost)]">
              Manter distancia minima de &quot;x&quot; (metade da altura do icone) ao redor do logo. Nenhum elemento deve invadir essa zona.
            </p>
          </>
        ) : (
          <div className="card p-6">
            <p className="text-sm text-[var(--text-secondary)]">
              Adicione o logo horizontal para visualizar clearspace.
            </p>
          </div>
        )}
      </div>

      {/* Minimum Size */}
      <div>
        <p className="section-label mb-4">Tamanho Minimo</p>
        <div className="card p-8">
          <div className="flex items-end gap-12">
            {/* Full logo minimum */}
            <div className="flex flex-col items-center gap-3">
              {horizontal.src ? (
                <Image
                  src={horizontal.src}
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
              {iconResolved.src ? (
                <Image
                  src={iconResolved.src}
                  alt="Icone minimo"
                  width={21}
                  height={21}
                  className="h-[21px] w-[21px] object-contain"
                />
              ) : horizontal.src ? (
                <Image
                  src={horizontal.src}
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
              {horizontal.src ? (
                <Image
                  src={horizontal.src}
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
