'use client'

import { useState } from 'react'
import { useBrand } from '@/context/BrandContext'
import { Copy, Check } from 'lucide-react'

type Tab = 'cores' | 'tipografia' | 'spacing' | 'radius' | 'shadows' | 'motion' | 'buttons'

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      onClick={async () => { try { await navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 1500) } catch { /* clipboard may fail */ } }}
      className="text-gray-300 transition hover:text-gray-500"
    >
      {copied ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
    </button>
  )
}

const tabs: { key: Tab; label: string }[] = [
  { key: 'cores', label: 'Cores' },
  { key: 'tipografia', label: 'Tipografia' },
  { key: 'spacing', label: 'Spacing' },
  { key: 'radius', label: 'Radius' },
  { key: 'shadows', label: 'Shadows' },
  { key: 'motion', label: 'Motion' },
  { key: 'buttons', label: 'Buttons' },
]

export default function TokenBrowser() {
  const { brand, tokens } = useBrand()
  const [tab, setTab] = useState<Tab>('cores')

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Tokens</h1>
        <p className="mt-1 text-sm text-gray-500">Design tokens completos do sistema visual.</p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
              tab === t.key
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div>
        {tab === 'cores' && (
          <div className="card divide-y divide-gray-100">
            {brand.colors.dark.map((c) => (
              <div key={c.token} className="flex items-center gap-4 px-5 py-3">
                <div className="h-8 w-8 shrink-0 rounded-lg" style={{ backgroundColor: c.hex }} />
                <span className="w-40 font-mono text-xs text-gray-700">--color-{c.token}</span>
                <span className="w-20 font-mono text-[11px] text-gray-400">{c.hex}</span>
                <CopyButton text={c.hex} />
                <span className="text-[11px] text-gray-400">{c.usage}</span>
              </div>
            ))}
          </div>
        )}

        {tab === 'tipografia' && (
          <div className="card divide-y divide-gray-100">
            {brand.typography.scale.map((level) => {
              const fontFamily = level.font === 'heading' ? tokens.heading : level.font === 'mono' ? tokens.mono : tokens.body
              const rawSize = parseInt(level.desktop)
              // Scale down proportionally: sizes up to 24px stay as-is, larger sizes compress gradually
              const displaySize = rawSize <= 24 ? rawSize : 24 + (rawSize - 24) * 0.4
              return (
                <div key={level.name} className="flex items-center gap-4 px-5 py-4">
                  <span className="w-16 text-xs font-semibold text-gray-900">{level.name}</span>
                  <span
                    className="flex-1 truncate text-gray-700"
                    style={{ fontFamily, fontSize: displaySize, fontWeight: level.weight, letterSpacing: level.letterSpacing }}
                  >
                    {brand.name}
                  </span>
                  <span className="font-mono text-[11px] text-gray-400">{level.desktop} / {level.weight}</span>
                </div>
              )
            })}
          </div>
        )}

        {tab === 'spacing' && (
          <div className="card divide-y divide-gray-100 p-5">
            {brand.spacing.scale.map((s) => (
              <div key={s.name} className="flex items-center gap-4 py-3">
                <span className="w-24 font-mono text-xs text-gray-700">--space-{s.name}</span>
                <div className="flex-1">
                  <div
                    className="h-5 rounded"
                    style={{
                      width: `${Math.min(s.px * 2, 100)}%`,
                      backgroundColor: brand.theme.primary + '20',
                    }}
                  />
                </div>
                <span className="w-14 text-right font-mono text-[11px] text-gray-400">{s.px}px</span>
                <span className="w-16 text-right font-mono text-[11px] text-gray-300">{s.value}</span>
              </div>
            ))}
          </div>
        )}

        {tab === 'radius' && (
          <div className="card p-6">
            <div className="flex flex-wrap gap-6">
              {[
                { name: 'sm', value: brand.shape.radiusSm },
                { name: 'md', value: brand.shape.radiusMd },
                { name: 'lg', value: brand.shape.radiusLg },
              ].map((r) => (
                <div key={r.name} className="flex flex-col items-center gap-2">
                  <div
                    className="h-14 w-14 bg-gray-200"
                    style={{ borderRadius: r.value }}
                  />
                  <span className="font-mono text-xs text-gray-700">--radius-{r.name}</span>
                  <span className="font-mono text-[11px] text-gray-400">{r.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'shadows' && (
          <div className="card p-6">
            <div className="flex flex-wrap gap-8">
              {[
                { name: 'elevated', value: brand.shape.shadowElevated },
                { name: 'modal', value: brand.shape.shadowModal },
              ].map((s) => (
                <div key={s.name} className="flex flex-col items-center gap-3">
                  <div
                    className="h-24 w-32 rounded-xl bg-white"
                    style={{ boxShadow: s.value }}
                  />
                  <span className="font-mono text-xs text-gray-700">--shadow-{s.name}</span>
                  <span className="max-w-[200px] text-center font-mono text-[10px] text-gray-400">{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'motion' && (
          <div className="card divide-y divide-gray-100">
            {brand.motion.tokens.map((t) => (
              <div key={t.name} className="flex items-center gap-4 px-5 py-3">
                <span className="w-44 font-mono text-xs text-gray-700">{t.name}</span>
                <span className="w-48 font-mono text-[11px] text-gray-500">{t.value}</span>
                <span className="text-[11px] text-gray-400">{t.usage}</span>
              </div>
            ))}
          </div>
        )}

        {tab === 'buttons' && (
          <div className="card overflow-x-auto p-6">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="pb-4 text-left text-[11px] font-semibold uppercase tracking-wider text-gray-400" />
                  <th className="pb-4 text-center text-[11px] font-semibold uppercase tracking-wider text-gray-400">Default</th>
                  <th className="pb-4 text-center text-[11px] font-semibold uppercase tracking-wider text-gray-400">Hover</th>
                  <th className="pb-4 text-center text-[11px] font-semibold uppercase tracking-wider text-gray-400">Active</th>
                  <th className="pb-4 text-center text-[11px] font-semibold uppercase tracking-wider text-gray-400">Disabled</th>
                </tr>
              </thead>
              <tbody className="space-y-4">
                {/* Primary */}
                <tr>
                  <td className="pr-6 py-3 text-xs font-semibold text-gray-700">Primary</td>
                  <td className="px-3 py-3 text-center">
                    <button className="rounded-lg px-4 py-2 text-xs font-semibold text-white" style={{ backgroundColor: brand.theme.primary }}>Button</button>
                  </td>
                  <td className="px-3 py-3 text-center">
                    <button className="rounded-lg px-4 py-2 text-xs font-semibold text-white" style={{ backgroundColor: brand.theme.primaryHover }}>Button</button>
                  </td>
                  <td className="px-3 py-3 text-center">
                    <button className="rounded-lg px-4 py-2 text-xs font-semibold text-white" style={{ backgroundColor: brand.theme.primaryDeep }}>Button</button>
                  </td>
                  <td className="px-3 py-3 text-center">
                    <button className="rounded-lg px-4 py-2 text-xs font-semibold text-white opacity-40" style={{ backgroundColor: brand.theme.primary }}>Button</button>
                  </td>
                </tr>
                {/* Secondary */}
                <tr>
                  <td className="pr-6 py-3 text-xs font-semibold text-gray-700">Secondary</td>
                  <td className="px-3 py-3 text-center">
                    <button className="rounded-lg px-4 py-2 text-xs font-semibold text-white" style={{ backgroundColor: brand.theme.secondary }}>Button</button>
                  </td>
                  <td className="px-3 py-3 text-center">
                    <button className="rounded-lg px-4 py-2 text-xs font-semibold text-white" style={{ backgroundColor: brand.theme.secondaryHover }}>Button</button>
                  </td>
                  <td className="px-3 py-3 text-center">
                    <button className="rounded-lg px-4 py-2 text-xs font-semibold text-white" style={{ backgroundColor: brand.theme.secondaryDeep }}>Button</button>
                  </td>
                  <td className="px-3 py-3 text-center">
                    <button className="rounded-lg px-4 py-2 text-xs font-semibold text-white opacity-40" style={{ backgroundColor: brand.theme.secondary }}>Button</button>
                  </td>
                </tr>
                {/* Ghost */}
                <tr>
                  <td className="pr-6 py-3 text-xs font-semibold text-gray-700">Ghost</td>
                  <td className="px-3 py-3 text-center">
                    <button className="rounded-lg border border-gray-200 bg-transparent px-4 py-2 text-xs font-semibold text-gray-700">Button</button>
                  </td>
                  <td className="px-3 py-3 text-center">
                    <button className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-xs font-semibold text-gray-700">Button</button>
                  </td>
                  <td className="px-3 py-3 text-center">
                    <button className="rounded-lg border border-gray-300 bg-gray-100 px-4 py-2 text-xs font-semibold text-gray-700">Button</button>
                  </td>
                  <td className="px-3 py-3 text-center">
                    <button className="rounded-lg border border-gray-100 bg-transparent px-4 py-2 text-xs font-semibold text-gray-300">Button</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
