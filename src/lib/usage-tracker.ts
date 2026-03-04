import { promises as fs } from 'fs'
import path from 'path'
import { randomUUID } from 'crypto'

export interface UsageRecord {
  id: string
  timestamp: string
  provider: 'google' | 'openai' | 'openrouter'
  model: string
  operation: 'image-gen' | 'logo-gen' | 'icon-extract' | 'logo-variants'
  brandSlug: string
  imageCount: number
  estimatedCostUSD: number
  status: 'success' | 'error'
  durationMs: number
}

export interface UsageSummary {
  totalCostUSD: number
  totalImages: number
  byProvider: Record<string, { costUSD: number; images: number; count: number }>
  byOperation: Record<string, { costUSD: number; count: number }>
  last30Days: { costUSD: number; images: number }
}

const PRICING: Record<string, Record<string, number>> = {
  google: { 'gemini-3.1-flash-image-preview': 0.067 },
  openai: { 'gpt-image-1': 0.040 },
  openrouter: { 'google/gemini-2.5-flash-image-preview': 0.067 },
}

export function getModelForProvider(provider: 'google' | 'openai' | 'openrouter'): string {
  return Object.keys(PRICING[provider])[0]
}

export function estimateCost(provider: 'google' | 'openai' | 'openrouter', imageCount = 1): number {
  const model = getModelForProvider(provider)
  return (PRICING[provider]?.[model] ?? 0) * imageCount
}

const DATA_DIR = path.join(process.cwd(), 'data')
const USAGE_FILE = path.join(DATA_DIR, 'usage.json')

async function readUsageFile(): Promise<UsageRecord[]> {
  try {
    const content = await fs.readFile(USAGE_FILE, 'utf-8')
    return JSON.parse(content)
  } catch {
    return []
  }
}

async function writeUsageFile(records: UsageRecord[]): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true })
  await fs.writeFile(USAGE_FILE, JSON.stringify(records, null, 2))
}

export async function trackUsage(
  record: Omit<UsageRecord, 'id' | 'timestamp'>
): Promise<void> {
  const records = await readUsageFile()
  records.push({
    id: randomUUID(),
    timestamp: new Date().toISOString(),
    ...record,
  })
  await writeUsageFile(records)
}

export async function getUsageHistory(filters?: {
  provider?: string
  brandSlug?: string
  limit?: number
}): Promise<UsageRecord[]> {
  let records = await readUsageFile()

  if (filters?.provider) {
    records = records.filter((r) => r.provider === filters.provider)
  }
  if (filters?.brandSlug) {
    records = records.filter((r) => r.brandSlug === filters.brandSlug)
  }

  // Most recent first
  records.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())

  if (filters?.limit) {
    records = records.slice(0, filters.limit)
  }

  return records
}

export async function getUsageSummary(): Promise<UsageSummary> {
  const records = await readUsageFile()

  const summary: UsageSummary = {
    totalCostUSD: 0,
    totalImages: 0,
    byProvider: {},
    byOperation: {},
    last30Days: { costUSD: 0, images: 0 },
  }

  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

  for (const r of records) {
    if (r.status !== 'success') continue

    summary.totalCostUSD += r.estimatedCostUSD
    summary.totalImages += r.imageCount

    // By provider
    if (!summary.byProvider[r.provider]) {
      summary.byProvider[r.provider] = { costUSD: 0, images: 0, count: 0 }
    }
    summary.byProvider[r.provider].costUSD += r.estimatedCostUSD
    summary.byProvider[r.provider].images += r.imageCount
    summary.byProvider[r.provider].count += 1

    // By operation
    if (!summary.byOperation[r.operation]) {
      summary.byOperation[r.operation] = { costUSD: 0, count: 0 }
    }
    summary.byOperation[r.operation].costUSD += r.estimatedCostUSD
    summary.byOperation[r.operation].count += 1

    // Last 30 days
    if (new Date(r.timestamp) >= thirtyDaysAgo) {
      summary.last30Days.costUSD += r.estimatedCostUSD
      summary.last30Days.images += r.imageCount
    }
  }

  return summary
}
