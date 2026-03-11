'use client'

import { useBrand } from '@/context/BrandContext'

export default function MotionSystem() {
  const { brand, accent } = useBrand()
  const { motion } = brand

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">Motion</h1>
        <p className="mt-1 text-sm text-[var(--text-secondary)]">
          Princípios de animação, tokens e micro-interactions.
        </p>
      </div>

      {/* Principle */}
      <div
        className="card border-l-[3px] p-6"
        style={{ borderLeftColor: accent }}
      >
        <p className="section-label mb-2">Princípio</p>
        <p className="text-xl font-bold text-[var(--text-primary)]">{motion.principle}</p>
        <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">{motion.description}</p>
        <span
          className="mt-3 inline-block rounded-md px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider"
          style={{
            backgroundColor: accent + '12',
            color: accent,
          }}
        >
          Profile: {motion.profile}
        </span>
      </div>

      {/* Tokens */}
      <div>
        <p className="section-label mb-4">Tokens</p>
        <div className="grid gap-3 md:grid-cols-2">
          {motion.tokens.map((t) => (
            <div key={t.name} className="card p-5">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-[var(--text-muted)]">{t.name}</span>
                <span
                  className="rounded-md px-2 py-0.5 font-mono text-[10px] font-semibold"
                  style={{
                    backgroundColor: accent + '12',
                    color: accent,
                  }}
                >
                  {t.value}
                </span>
              </div>
              <p className="mt-2 text-[11px] text-[var(--text-ghost)]">{t.usage}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Micro Animations */}
      <div>
        <p className="section-label mb-4">Micro Animations</p>
        <div className="space-y-3">
          {motion.microAnimations.map((a) => (
            <div key={a.element} className="card group p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-semibold text-[var(--text-primary)]">{a.element}</p>
                  <p className="mt-1 text-xs text-[var(--text-secondary)]">{a.behavior}</p>
                </div>
                <div className="text-right">
                  <span className="font-mono text-[11px] text-[var(--text-ghost)]">{a.duration}</span>
                  <p className="font-mono text-[10px] text-[var(--text-placeholder)]">{a.easing}</p>
                </div>
              </div>
              {/* Interactive demo bar */}
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[var(--bg-muted)]">
                <div
                  className="h-full w-0 rounded-full group-hover:w-full"
                  style={{
                    backgroundColor: accent,
                    transitionProperty: 'width',
                    transitionDuration: /^\d/.test(a.duration) ? a.duration : '300ms',
                    transitionTimingFunction: a.easing || 'ease-out',
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Rules */}
      <div>
        <p className="section-label mb-4">Regras</p>
        <div className="card p-6">
          <ul className="space-y-2">
            {motion.rules.map((r) => (
              <li key={r} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: accent }} />
                {r}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
