'use client'

import { useState, useEffect, useCallback } from 'react'
import { useBrand } from '@/context/BrandContext'
import { Loader2, DollarSign, ImageIcon, Zap, Clock } from 'lucide-react'

interface UsageRecord {
  id: string
  timestamp: string
  provider: string
  model: string
  operation: string
  brandSlug: string
  imageCount: number
  estimatedCostUSD: number
  status: string
  durationMs: number
}

interface UsageSummary {
  totalCostUSD: number
  totalImages: number
  byProvider: Record<string, { costUSD: number; images: number; count: number }>
  byOperation: Record<string, { costUSD: number; count: number }>
  last30Days: { costUSD: number; images: number }
}

const GOOGLE_CREDITS_BRL = 1904
const BRL_TO_USD = 0.17 // approximate
const GOOGLE_CREDITS_USD = GOOGLE_CREDITS_BRL * BRL_TO_USD

const PROVIDER_LABELS: Record<string, string> = {
  google: 'Google Nano Banana 2',
  openai: 'OpenAI GPT Image',
  openrouter: 'OpenRouter',
}

const OPERATION_LABELS: Record<string, string> = {
  'image-gen': 'Social Media',
  'logo-gen': 'Logo',
  'icon-extract': 'Ícone',
  'logo-variants': 'Variantes',
}

export default function UsageDashboard() {
  const { brand } = useBrand()
  const [summary, setSummary] = useState<UsageSummary | null>(null)
  const [records, setRecords] = useState<UsageRecord[]>([])
  const [loading, setLoading] = useState(true)

  const fetchData = useCallback(async () => {
    try {
      const [summaryRes, recordsRes] = await Promise.all([
        fetch('/api/usage?summary=true'),
        fetch(`/api/usage?brandSlug=${brand.slug}&limit=50`),
      ])
      if (summaryRes.ok) setSummary(await summaryRes.json())
      if (recordsRes.ok) setRecords(await recordsRes.json())
    } catch {
      // silently fail
    } finally {
      setLoading(false)
    }
  }, [brand.slug])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="animate-spin text-[var(--text-ghost)]" size={32} />
      </div>
    )
  }

  const googleCost = summary?.byProvider.google?.costUSD ?? 0
  const creditsRemaining = Math.max(0, GOOGLE_CREDITS_USD - googleCost)
  const creditsUsedPercent = Math.min(100, (googleCost / GOOGLE_CREDITS_USD) * 100)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">Usage & Custos</h1>
        <p className="mt-1 text-sm text-[var(--text-secondary)]">
          Tracking de uso e custos estimados de geração de imagens com IA.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Total Cost */}
        <div className="card p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10">
              <DollarSign size={20} className="text-emerald-400" />
            </div>
            <div>
              <p className="text-[11px] font-medium uppercase tracking-wider text-[var(--text-ghost)]">
                Custo Total
              </p>
              <p className="text-xl font-bold text-[var(--text-primary)]">
                ${(summary?.totalCostUSD ?? 0).toFixed(3)}
              </p>
            </div>
          </div>
        </div>

        {/* Total Images */}
        <div className="card p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
              <ImageIcon size={20} className="text-blue-400" />
            </div>
            <div>
              <p className="text-[11px] font-medium uppercase tracking-wider text-[var(--text-ghost)]">
                Imagens Geradas
              </p>
              <p className="text-xl font-bold text-[var(--text-primary)]">
                {summary?.totalImages ?? 0}
              </p>
            </div>
          </div>
        </div>

        {/* Last 30 Days */}
        <div className="card p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10">
              <Clock size={20} className="text-purple-400" />
            </div>
            <div>
              <p className="text-[11px] font-medium uppercase tracking-wider text-[var(--text-ghost)]">
                Últimos 30 dias
              </p>
              <p className="text-xl font-bold text-[var(--text-primary)]">
                ${(summary?.last30Days.costUSD ?? 0).toFixed(3)}
              </p>
            </div>
          </div>
        </div>

        {/* By Provider count */}
        <div className="card p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/10">
              <Zap size={20} className="text-orange-400" />
            </div>
            <div>
              <p className="text-[11px] font-medium uppercase tracking-wider text-[var(--text-ghost)]">
                Requisições
              </p>
              <p className="text-xl font-bold text-[var(--text-primary)]">
                {Object.values(summary?.byProvider ?? {}).reduce((s, p) => s + p.count, 0)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Google Credits Progress */}
      <div className="card p-5">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-sm font-semibold text-[var(--text-primary)]">Créditos Google AI</p>
          <p className="text-xs text-[var(--text-secondary)]">
            R$ {GOOGLE_CREDITS_BRL.toFixed(2)} (~${GOOGLE_CREDITS_USD.toFixed(2)} USD)
          </p>
        </div>
        <div className="h-3 w-full overflow-hidden rounded-full bg-[var(--bg-muted)]">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${creditsUsedPercent}%`,
              backgroundColor: creditsUsedPercent > 80 ? '#ef4444' : creditsUsedPercent > 50 ? '#f59e0b' : '#22c55e',
            }}
          />
        </div>
        <div className="mt-2 flex justify-between text-xs text-[var(--text-ghost)]">
          <span>Usado: ${googleCost.toFixed(3)}</span>
          <span>Restante: ~${creditsRemaining.toFixed(2)}</span>
        </div>
      </div>

      {/* By Provider */}
      {summary && Object.keys(summary.byProvider).length > 0 && (
        <div>
          <p className="section-label mb-4">Por Provider</p>
          <div className="grid gap-4 md:grid-cols-3">
            {Object.entries(summary.byProvider).map(([provider, data]) => (
              <div key={provider} className="card p-5">
                <p className="text-sm font-semibold text-[var(--text-primary)]">
                  {PROVIDER_LABELS[provider] || provider}
                </p>
                <div className="mt-3 space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-[var(--text-ghost)]">Custo</span>
                    <span className="font-medium text-[var(--text-primary)]">${data.costUSD.toFixed(3)}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-[var(--text-ghost)]">Imagens</span>
                    <span className="font-medium text-[var(--text-primary)]">{data.images}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-[var(--text-ghost)]">Requisições</span>
                    <span className="font-medium text-[var(--text-primary)]">{data.count}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent History */}
      <div>
        <p className="section-label mb-4">Histórico Recente</p>
        {records.length === 0 ? (
          <div className="card flex items-center justify-center p-8">
            <p className="text-sm text-[var(--text-ghost)]">Nenhum registro ainda. Gere imagens para ver o histórico.</p>
          </div>
        ) : (
          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[var(--border-faint)]">
                    <th className="px-4 py-3 font-medium text-[var(--text-ghost)]">Data</th>
                    <th className="px-4 py-3 font-medium text-[var(--text-ghost)]">Provider</th>
                    <th className="px-4 py-3 font-medium text-[var(--text-ghost)]">Operação</th>
                    <th className="px-4 py-3 font-medium text-[var(--text-ghost)]">Brand</th>
                    <th className="px-4 py-3 font-medium text-[var(--text-ghost)]">Custo</th>
                    <th className="px-4 py-3 font-medium text-[var(--text-ghost)]">Duração</th>
                    <th className="px-4 py-3 font-medium text-[var(--text-ghost)]">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((r) => (
                    <tr key={r.id} className="border-b border-[var(--border-faint)] last:border-0">
                      <td className="px-4 py-2.5 text-[var(--text-secondary)]">
                        {new Date(r.timestamp).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })}
                      </td>
                      <td className="px-4 py-2.5 text-[var(--text-primary)]">
                        {PROVIDER_LABELS[r.provider] || r.provider}
                      </td>
                      <td className="px-4 py-2.5 text-[var(--text-secondary)]">
                        {OPERATION_LABELS[r.operation] || r.operation}
                      </td>
                      <td className="px-4 py-2.5 font-mono text-[var(--text-secondary)]">{r.brandSlug}</td>
                      <td className="px-4 py-2.5 text-[var(--text-primary)]">${r.estimatedCostUSD.toFixed(3)}</td>
                      <td className="px-4 py-2.5 text-[var(--text-secondary)]">{(r.durationMs / 1000).toFixed(1)}s</td>
                      <td className="px-4 py-2.5">
                        <span
                          className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-medium ${
                            r.status === 'success'
                              ? 'bg-emerald-500/10 text-emerald-400'
                              : 'bg-red-500/10 text-red-400'
                          }`}
                        >
                          {r.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
