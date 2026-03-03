'use client'

import { useState } from 'react'
import { useBrand } from '@/context/BrandContext'

export default function TypographyPlayground() {
  const { brand, tokens } = useBrand()
  const [preview, setPreview] = useState('The quick brown fox jumps over the lazy dog')

  const headingFont = brand.typography.stack.find(f => f.role === 'display')
  const bodyFont = brand.typography.stack.find(f => f.role === 'body')
  const monoFont = brand.typography.stack.find(f => f.role === 'mono')

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">Tipografia</h1>
        <p className="mt-1 text-sm text-[var(--text-secondary)]">
          Font stack, type scale e regras tipográficas da marca.
        </p>
      </div>

      {/* Font Specimens */}
      <div className="space-y-4">
        <p className="section-label">Font Stack</p>

        {[headingFont, bodyFont, monoFont].filter(Boolean).map((font) => (
          <div key={`${font!.role}-${font!.font}`} className="card overflow-hidden">
            <div className="bg-[var(--bg-subtle)] p-8">
              <p
                className="text-[80px] font-bold leading-none text-[var(--text-primary)]"
                style={{ fontFamily: font!.font }}
              >
                Aa
              </p>
            </div>
            <div className="flex items-center gap-4 px-6 py-4">
              <p className="text-sm font-semibold text-[var(--text-primary)]">{font!.font}</p>
              <span
                className="rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
                style={{
                  backgroundColor: brand.theme.primary + '12',
                  color: brand.theme.primary,
                }}
              >
                {font!.role}
              </span>
              <span className="rounded-md bg-[var(--bg-muted)] px-2 py-0.5 text-[10px] font-medium text-[var(--text-secondary)]">
                {font!.weights}
              </span>
              {font!.variable && (
                <span className="rounded-md bg-purple-50 px-2 py-0.5 text-[10px] font-medium text-purple-600">
                  Variable
                </span>
              )}
              <span className="text-[11px] text-[var(--text-ghost)]">{font!.source}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Type Scale */}
      <div>
        <p className="section-label mb-4">Type Scale</p>
        <div className="card divide-y divide-[var(--border-faint)]">
          <div className="flex items-center gap-6 px-6 py-3 border-b border-[var(--border-faint)]">
            <div className="w-[340px] shrink-0">
              <span className="text-[11px] font-medium uppercase tracking-wider text-[var(--text-ghost)]">Preview</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="w-12 text-[11px] font-medium uppercase tracking-wider text-[var(--text-ghost)]">Nome</span>
              <span className="w-14 text-[11px] font-medium uppercase tracking-wider text-[var(--text-ghost)]">Desktop</span>
              <span className="w-14 text-[11px] font-medium uppercase tracking-wider text-[var(--text-ghost)]">Mobile</span>
              <span className="w-10 text-[11px] font-medium uppercase tracking-wider text-[var(--text-ghost)]">LH</span>
              <span className="w-10 text-[11px] font-medium uppercase tracking-wider text-[var(--text-ghost)]">Weight</span>
            </div>
          </div>
          {brand.typography.scale.map((level) => {
            const fontFamily =
              level.font === 'heading' ? tokens.heading :
              level.font === 'mono' ? tokens.mono :
              tokens.body

            return (
              <div key={level.name} className="flex items-center gap-6 px-6 py-4">
                <div className="w-[340px] shrink-0 overflow-hidden">
                  <p
                    className="truncate text-[var(--text-primary)]"
                    style={{
                      fontFamily,
                      fontSize: level.desktop,
                      fontWeight: level.weight,
                      lineHeight: level.lineHeight,
                      letterSpacing: level.letterSpacing,
                    }}
                  >
                    {brand.name}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="w-12 text-xs font-semibold text-[var(--text-primary)]">{level.name}</span>
                  <span className="w-14 font-mono text-[11px] text-[var(--text-ghost)]">{level.desktop}</span>
                  <span className="w-14 font-mono text-[11px] text-[var(--text-placeholder)]">{level.mobile}</span>
                  <span className="w-10 font-mono text-[11px] text-[var(--text-placeholder)]">{level.lineHeight}</span>
                  <span className="w-10 font-mono text-[11px] text-[var(--text-placeholder)]">{level.weight}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Font Pairing Preview */}
      <div>
        <p className="section-label mb-4">Font Pairing</p>
        <div className="card p-8">
          <p
            className="text-4xl font-bold text-[var(--text-primary)]"
            style={{ fontFamily: tokens.heading }}
          >
            {brand.tagline}
          </p>
          <p
            className="mt-4 max-w-xl text-base leading-relaxed text-[var(--text-secondary)]"
            style={{ fontFamily: tokens.body }}
          >
            {brand.description}
          </p>
          <p
            className="mt-4 text-sm text-[var(--text-ghost)]"
            style={{ fontFamily: tokens.mono }}
          >
            font-family: {tokens.heading} + {tokens.body}
          </p>
        </div>
      </div>

      {/* Interactive Preview */}
      <div>
        <p className="section-label mb-4">Preview Interativo</p>
        <div className="card p-6">
          <input
            type="text"
            value={preview}
            onChange={(e) => setPreview(e.target.value)}
            className="mb-6 w-full rounded-lg border border-[var(--border-default)] bg-[var(--bg-card)] px-4 py-2.5 text-sm text-[var(--text-muted)] outline-none focus:border-[var(--text-tertiary)]"
            placeholder="Digite o texto para preview..."
          />
          <div className="space-y-4">
            <div>
              <p className="mb-1 text-[11px] text-[var(--text-ghost)]">Heading — {tokens.heading}</p>
              <p
                className="text-3xl font-bold text-[var(--text-primary)]"
                style={{ fontFamily: tokens.heading }}
              >
                {preview}
              </p>
            </div>
            <div>
              <p className="mb-1 text-[11px] text-[var(--text-ghost)]">Body — {tokens.body}</p>
              <p
                className="text-base text-[var(--text-muted)]"
                style={{ fontFamily: tokens.body }}
              >
                {preview}
              </p>
            </div>
            <div>
              <p className="mb-1 text-[11px] text-[var(--text-ghost)]">Mono — {tokens.mono}</p>
              <p
                className="text-sm text-[var(--text-secondary)]"
                style={{ fontFamily: tokens.mono }}
              >
                {preview}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Typography Rules */}
      <div>
        <p className="section-label mb-4">Regras</p>
        <div className="card p-6">
          <ul className="space-y-2">
            {brand.typography.rules.map((r) => (
              <li key={r} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--text-placeholder)]" />
                {r}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
