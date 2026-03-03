'use client'

import Image from 'next/image'
import { useBrand } from '@/context/BrandContext'

export default function LogoGuidelines() {
  const { brand } = useBrand()
  const { logo } = brand

  const hasLogoFile = logo.variants.some(v => v.file)
  const logoFile = logo.variants.find(v => v.file)?.file

  // Determine correct filter/color for each variant
  function getVariantStyle(name: string): { bg: string; filter: string } {
    const lower = name.toLowerCase()
    if (lower.includes('full color') || lower.includes('green') || lower.includes('color')) {
      return { bg: '#000000', filter: 'none' }
    }
    if (lower.includes('white') || lower.includes('branco') || lower.includes('light')) {
      return { bg: brand.theme.bg, filter: 'brightness(0) invert(1)' }
    }
    if (lower.includes('black') || lower.includes('preto') || lower.includes('dark')) {
      return { bg: '#F5F5F5', filter: 'brightness(0)' }
    }
    if (lower.includes('mono')) {
      return { bg: '#E5E7EB', filter: 'brightness(0) invert(0.4)' }
    }
    return { bg: brand.theme.bg, filter: 'brightness(0) invert(1)' }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Logo</h1>
        <p className="mt-1 text-sm text-gray-500">
          Conceito, variantes e regras de uso do logotipo.
        </p>
      </div>

      {/* Concept */}
      <div
        className="card border-l-[3px] p-6"
        style={{ borderLeftColor: brand.theme.primary }}
      >
        <p className="section-label mb-2">Conceito</p>
        <p className="text-lg font-semibold text-gray-900">{logo.concept}</p>
        <p className="mt-2 text-sm leading-relaxed text-gray-600">{logo.description}</p>
      </div>

      {/* Logo Display — Main (Full Color) */}
      <div>
        <p className="section-label mb-4">Logo Principal</p>
        <div className="bento bento-2">
          {/* Full color on dark */}
          <div
            className="card flex items-center justify-center overflow-hidden p-12"
            style={{ backgroundColor: '#000000', minHeight: '260px' }}
          >
            {hasLogoFile && logoFile ? (
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
                style={{ color: brand.theme.primary, fontFamily: `'Space Grotesk', system-ui` }}
              >
                {brand.name}
              </p>
            )}
          </div>
          {/* Full color on light */}
          <div
            className="card flex items-center justify-center overflow-hidden p-12"
            style={{ backgroundColor: '#FFFFFF', minHeight: '260px' }}
          >
            {hasLogoFile && logoFile ? (
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
                style={{ color: brand.theme.primary, fontFamily: `'Space Grotesk', system-ui` }}
              >
                {brand.name}
              </p>
            )}
          </div>
        </div>
        <p className="mt-2 text-[11px] text-gray-400">
          Logo full color somente sobre fundo preto ou branco puro. Para outros fundos, usar versao monocromatica.
        </p>
      </div>

      {/* Mono versions */}
      {hasLogoFile && logoFile && (
        <div>
          <p className="section-label mb-4">Versões Monocromáticas</p>
          <div className="bento bento-2">
            <div className="card relative flex items-center justify-center overflow-hidden p-12" style={{ backgroundColor: brand.theme.bg, minHeight: '200px' }}>
              <Image
                src={logoFile}
                alt={`${brand.name} logo white on dark`}
                width={240}
                height={80}
                className="h-auto w-[240px]"
                style={{ filter: 'brightness(0) invert(1)' }}
              />
              <p className="absolute bottom-3 text-[10px] text-white/40">Branco sobre fundo escuro</p>
            </div>
            <div className="card relative flex items-center justify-center overflow-hidden p-12" style={{ backgroundColor: '#F5F5F5', minHeight: '200px' }}>
              <Image
                src={logoFile}
                alt={`${brand.name} logo black on light`}
                width={240}
                height={80}
                className="h-auto w-[240px]"
                style={{ filter: 'brightness(0)' }}
              />
              <p className="absolute bottom-3 text-[10px] text-gray-400">Preto sobre fundo claro</p>
            </div>
          </div>
          <p className="mt-2 text-[11px] text-gray-400">
            Versões monocromáticas para uso em fundos que não sejam preto ou branco puro.
          </p>
        </div>
      )}

      {/* Clearspace */}
      {hasLogoFile && logoFile && (
        <div>
          <p className="section-label mb-4">Zona de Exclusão (Clearspace)</p>
          <div className="card flex items-center justify-center overflow-hidden p-12" style={{ backgroundColor: '#FAFAFA', minHeight: '280px' }}>
            <div className="relative inline-flex items-center justify-center">
              {/* Clearspace guides */}
              <div className="absolute inset-0 -m-8 border-2 border-dashed border-blue-300 rounded-lg" />
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
                src={logoFile}
                alt={`${brand.name} clearspace`}
                width={200}
                height={70}
                className="h-auto w-[200px]"
                style={{ filter: 'brightness(0)' }}
              />
            </div>
          </div>
          <p className="mt-2 text-[11px] text-gray-400">
            Manter distância mínima de &quot;x&quot; (metade da altura do ícone) ao redor do logo. Nenhum elemento deve invadir essa zona.
          </p>
        </div>
      )}

      {/* Minimum Size */}
      {hasLogoFile && logoFile && (
        <div>
          <p className="section-label mb-4">Tamanho Mínimo</p>
          <div className="card p-8">
            <div className="flex items-end gap-12">
              {/* Full logo minimum */}
              <div className="flex flex-col items-center gap-3">
                <Image
                  src={logoFile}
                  alt="Logo mínimo"
                  width={70}
                  height={24}
                  className="h-auto w-[70px]"
                  style={{ filter: 'brightness(0)' }}
                />
                <div className="text-center">
                  <p className="text-[11px] font-semibold text-gray-700">70px</p>
                  <p className="text-[10px] text-gray-400">Digital mínimo</p>
                </div>
              </div>
              {/* Icon only minimum */}
              <div className="flex flex-col items-center gap-3">
                <Image
                  src={`/logos/${brand.slug}-icon.svg`}
                  alt="Ícone mínimo"
                  width={21}
                  height={21}
                  className="h-[21px] w-[21px]"
                  style={{ filter: 'brightness(0)' }}
                />
                <div className="text-center">
                  <p className="text-[11px] font-semibold text-gray-700">21px</p>
                  <p className="text-[10px] text-gray-400">Ícone mínimo</p>
                </div>
              </div>
              {/* Print minimum */}
              <div className="flex flex-col items-center gap-3">
                <Image
                  src={logoFile}
                  alt="Logo impresso mínimo"
                  width={100}
                  height={35}
                  className="h-auto w-[100px]"
                  style={{ filter: 'brightness(0)' }}
                />
                <div className="text-center">
                  <p className="text-[11px] font-semibold text-gray-700">20mm</p>
                  <p className="text-[10px] text-gray-400">Impresso mínimo</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Variants */}
      <div>
        <p className="section-label mb-4">Variantes</p>
        <div className="grid gap-4 md:grid-cols-2">
          {logo.variants.map((v) => {
            const style = getVariantStyle(v.name)
            return (
              <div key={v.name} className="card overflow-hidden">
                {v.file && (
                  <div
                    className="flex items-center justify-center p-8"
                    style={{
                      backgroundColor: style.bg,
                      minHeight: '140px',
                    }}
                  >
                    <Image
                      src={v.file}
                      alt={v.name}
                      width={180}
                      height={60}
                      className="h-auto w-[180px]"
                      style={{ filter: style.filter }}
                    />
                  </div>
                )}
                <div className="p-4">
                  <p className="text-sm font-semibold text-gray-900">{v.name}</p>
                  <p className="mt-1 text-xs text-gray-500">{v.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Rules & Misuse */}
      <div className="bento bento-2">
        <div className="card p-6">
          <p className="mb-3 text-sm font-semibold text-emerald-600">Regras de Uso</p>
          <ul className="space-y-2">
            {logo.rules.map((r) => (
              <li key={r} className="flex items-start gap-2 text-xs text-gray-600">
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
              <li key={m} className="flex items-start gap-2 text-xs text-gray-600">
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
