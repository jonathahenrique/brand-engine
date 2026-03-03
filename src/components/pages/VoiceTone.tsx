'use client'

import { useBrand } from '@/context/BrandContext'

export default function VoiceTone() {
  const { brand } = useBrand()
  const { voice } = brand

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Voz & Tom</h1>
        <p className="mt-1 text-sm text-gray-500">
          Personalidade verbal, regras de escrita e referências da marca.
        </p>
      </div>

      {/* KPI-style cards */}
      <div className="bento bento-3">
        <div className="card p-5">
          <p className="section-label mb-1">Arquétipo</p>
          <p className="text-2xl font-bold text-gray-900">{voice.archetype}</p>
        </div>
        <div className="card p-5">
          <p className="section-label mb-1">Tom</p>
          <p className="text-2xl font-bold text-gray-900">{voice.tone}</p>
        </div>
        <div className="card p-5">
          <p className="section-label mb-1">Regras</p>
          <p className="text-2xl font-bold text-gray-900">{voice.rules.length}</p>
        </div>
      </div>

      {/* A Voz É / Não É */}
      <div className="bento bento-2">
        <div className="card p-6">
          <p className="mb-4 text-sm font-semibold text-emerald-600">A Voz É</p>
          <div className="space-y-3">
            {voice.personality.is.map((t) => (
              <div key={t.trait}>
                <p className="text-sm font-semibold text-gray-900">{t.trait}</p>
                <p className="text-xs text-gray-500">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="card p-6">
          <p className="mb-4 text-sm font-semibold text-red-500">A Voz NÃO É</p>
          <ul className="space-y-2">
            {voice.personality.isNot.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Writing Rules */}
      <div>
        <p className="section-label mb-4">Regras de Escrita</p>
        <div className="card divide-y divide-gray-100">
          {voice.rules.map((r, i) => (
            <div key={r.rule} className="p-5">
              <div className="flex items-start gap-3">
                <span
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-[10px] font-bold text-white"
                  style={{ backgroundColor: brand.theme.primary }}
                >
                  {i + 1}
                </span>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{r.rule}</p>
                  <div className="mt-2 rounded-lg bg-gray-50 px-3 py-2">
                    <p className="text-xs text-emerald-600">
                      <span className="font-semibold">Do:</span> {r.example}
                    </p>
                    {r.bad && (
                      <p className="mt-1 text-xs text-red-500">
                        <span className="font-semibold">Don&apos;t:</span> {r.bad}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* References */}
      <div>
        <p className="section-label mb-4">Referências</p>
        <div className="flex flex-wrap gap-2">
          {voice.references.map((ref) => (
            <span
              key={ref}
              className="rounded-full bg-gray-100 px-4 py-1.5 text-xs font-medium text-gray-600"
            >
              {ref}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
