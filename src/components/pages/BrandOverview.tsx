'use client'

import { useBrand } from '@/context/BrandContext'
import { BrandLogo } from '@/components/ui/BrandLogo'

function Sparkline({ values, color }: { values: number[]; color: string }) {
  const max = Math.max(...values)
  return (
    <div className="flex items-end gap-[3px]">
      {values.map((v, i) => (
        <div
          key={i}
          className="w-[5px] rounded-sm"
          style={{
            height: `${(v / max) * 24}px`,
            backgroundColor: color,
            opacity: 0.15 + (i / values.length) * 0.85,
          }}
        />
      ))}
    </div>
  )
}

function KpiCard({
  label,
  value,
  sparkValues,
  color,
  trend,
}: {
  label: string
  value: string | number
  sparkValues: number[]
  color: string
  trend?: string
}) {
  return (
    <div className="card p-5">
      <p className="section-label mb-1">{label}</p>
      <div className="flex items-end justify-between">
        <p className="text-3xl font-bold text-[var(--text-primary)]">{value}</p>
        <Sparkline values={sparkValues} color={color} />
      </div>
      {trend && (
        <p className="mt-2 text-xs font-medium text-emerald-500">{trend}</p>
      )}
    </div>
  )
}

function CircularProgress({ value, color }: { value: number; color: string }) {
  const r = 40
  const circumference = 2 * Math.PI * r
  const offset = circumference - (value / 100) * circumference
  return (
    <svg width="100" height="100" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r={r} fill="none" stroke="var(--border-subtle)" strokeWidth="8" />
      <circle
        cx="50"
        cy="50"
        r={r}
        fill="none"
        stroke={color}
        strokeWidth="8"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        transform="rotate(-90 50 50)"
        className="transition-all duration-700"
      />
    </svg>
  )
}

export default function BrandOverview() {
  const { brand } = useBrand()
  const colorsCount = brand.colors.dark.length + brand.colors.light.length
  const fontsCount = brand.typography.stack.length
  const tokensCount =
    brand.motion.tokens.length +
    brand.spacing.scale.length +
    colorsCount
  const motionCount = brand.motion.microAnimations.length

  return (
    <div className="space-y-6">
      {/* Row 1: Hero + Completude */}
      <div className="bento bento-4">
        {/* Hero Banner */}
        <div
          className="span-3 relative overflow-hidden rounded-2xl p-8"
          style={{
            background: `linear-gradient(135deg, ${brand.theme.primary}, ${brand.theme.secondary || brand.theme.primaryDeep})`,
          }}
        >
          <div className="relative z-10">
            <div className="mb-4 flex flex-wrap gap-2">
              <span className="rounded-full bg-white/20 px-3 py-1 text-[11px] font-medium text-white backdrop-blur-sm">
                {brand.niche}
              </span>
              <span className="rounded-full bg-white/20 px-3 py-1 text-[11px] font-medium text-white backdrop-blur-sm">
                {brand.personality.archetype}
              </span>
            </div>
            <BrandLogo
              slug={brand.slug}
              name={brand.name}
              logoFile={brand.logo.file || brand.logo.variants.find(v => v.file)?.file}
              iconFile={brand.logo.icon}
              transparent={brand.logo.transparent}
              variant="full"
              theme={brand.theme}
              filter="brightness(0) invert(1)"
            />
            <p className="mt-2 max-w-lg text-sm text-white/80">{brand.tagline}</p>
          </div>
          {/* Decorative element */}
          <div className="absolute -right-6 -top-6 opacity-10">
            <BrandLogo
              slug={brand.slug}
              name={brand.name}
              logoFile={brand.logo.file || brand.logo.variants.find(v => v.file)?.file}
              iconFile={brand.logo.icon}
              transparent={brand.logo.transparent}
              variant="badge"
              theme={brand.theme}
              className="h-48 w-48"
            />
          </div>
        </div>

        {/* Completude */}
        <div className="card flex flex-col items-center justify-center p-5">
          <CircularProgress value={brand.completeness} color={brand.theme.primary} />
          <p className="mt-3 text-3xl font-bold text-[var(--text-primary)]">{brand.completeness}%</p>
          <p className="section-label mt-1">Completude</p>
        </div>
      </div>

      {/* Row 2: KPIs */}
      <div className="bento bento-4">
        <KpiCard
          label="Cores"
          value={colorsCount}
          sparkValues={[3, 5, 4, 7, 6]}
          color={brand.theme.primary}
          trend={`${brand.colors.dark.length} dark · ${brand.colors.light.length} light`}
        />
        <KpiCard
          label="Fontes"
          value={fontsCount}
          sparkValues={[4, 6, 5, 7, 8]}
          color={brand.theme.primary}
          trend={brand.typography.stack.map(f => f.font).join(' · ')}
        />
        <KpiCard
          label="Tokens"
          value={tokensCount}
          sparkValues={[2, 4, 6, 5, 8]}
          color={brand.theme.primary}
        />
        <KpiCard
          label="Motion"
          value={motionCount}
          sparkValues={[3, 2, 5, 4, 6]}
          color={brand.theme.primary}
          trend={brand.motion.profile}
        />
      </div>

      {/* Row 3: Color Preview + Typography Preview */}
      <div className="bento bento-4">
        {/* Color Preview */}
        <div className="span-2 card p-6">
          <p className="section-label mb-4">Paleta Principal</p>
          <div className="mb-4 flex gap-3">
            <div className="flex-1">
              <div
                className="h-20 w-full rounded-xl"
                style={{ backgroundColor: brand.theme.primary }}
              />
              <p className="mt-2 text-xs font-medium text-[var(--text-primary)]">Primary</p>
              <p className="font-mono text-[11px] text-[var(--text-ghost)]">{brand.theme.primary}</p>
            </div>
            <div className="flex-1">
              <div
                className="h-20 w-full rounded-xl"
                style={{ backgroundColor: brand.theme.secondary }}
              />
              <p className="mt-2 text-xs font-medium text-[var(--text-primary)]">Secondary</p>
              <p className="font-mono text-[11px] text-[var(--text-ghost)]">{brand.theme.secondary}</p>
            </div>
          </div>
          <div className="flex h-3 overflow-hidden rounded-full">
            {brand.colors.dark.slice(0, 8).map((c) => (
              <div key={c.token} className="flex-1" style={{ backgroundColor: c.hex }} />
            ))}
          </div>
        </div>

        {/* Typography Preview */}
        <div className="span-2 card p-6">
          <p className="section-label mb-4">Tipografia</p>
          <div className="flex items-end gap-6">
            <p
              className="text-7xl font-bold leading-none text-[var(--text-primary)]"
              style={{ fontFamily: brand.typography.stack.find(f => f.role === 'display')?.font }}
            >
              Aa
            </p>
            <div className="pb-2">
              <p className="text-sm font-semibold text-[var(--text-primary)]">
                {brand.typography.stack.find(f => f.role === 'display')?.font}
              </p>
              <p className="text-xs text-[var(--text-ghost)]">Heading</p>
              <p
                className="mt-2 text-sm text-[var(--text-secondary)]"
                style={{ fontFamily: brand.typography.stack.find(f => f.role === 'body')?.font }}
              >
                {brand.typography.stack.find(f => f.role === 'body')?.font} — Body
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Row 4: Personality + Values + Motion */}
      <div className="bento bento-4">
        {/* Personality */}
        <div className="card p-5">
          <p className="section-label mb-3">Personalidade</p>
          <span
            className="inline-block rounded-lg px-3 py-1 text-xs font-semibold"
            style={{
              backgroundColor: `${brand.theme.primary}12`,
              color: brand.theme.primary,
            }}
          >
            {brand.personality.archetype}
          </span>
          <ul className="mt-3 space-y-1.5">
            {brand.personality.traits.slice(0, 3).map((t) => (
              <li key={t.trait} className="text-xs text-[var(--text-secondary)]">
                <span className="font-medium text-[var(--text-primary)]">{t.trait}</span> — {t.desc}
              </li>
            ))}
          </ul>
        </div>

        {/* Values */}
        <div className="card p-5">
          <p className="section-label mb-3">Valores</p>
          <ol className="space-y-2">
            {brand.values.slice(0, 4).map((v, i) => (
              <li key={v.title} className="flex items-start gap-2">
                <span
                  className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md text-[10px] font-bold text-white"
                  style={{ backgroundColor: brand.theme.primary }}
                >
                  {i + 1}
                </span>
                <span className="text-xs text-[var(--text-muted)]">{v.title}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Motion Preview */}
        <div className="span-2 card p-5">
          <p className="section-label mb-3">Motion</p>
          <p className="text-sm font-semibold text-[var(--text-primary)]">{brand.motion.principle}</p>
          <p className="mt-1 text-xs text-[var(--text-secondary)] leading-relaxed">{brand.motion.description.slice(0, 120)}...</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {brand.motion.tokens.slice(0, 4).map((t) => (
              <span
                key={t.name}
                className="rounded-full bg-[var(--bg-muted)] px-2.5 py-1 font-mono text-[10px] text-[var(--text-secondary)]"
              >
                {t.value}
              </span>
            ))}
          </div>
          <span
            className="mt-3 inline-block rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
            style={{
              backgroundColor: `${brand.theme.primary}12`,
              color: brand.theme.primary,
            }}
          >
            {brand.motion.profile}
          </span>
        </div>
      </div>
    </div>
  )
}
