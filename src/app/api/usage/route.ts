import { NextRequest, NextResponse } from 'next/server'
import { getUsageHistory, getUsageSummary } from '@/lib/usage-tracker'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const summary = searchParams.get('summary')

    if (summary === 'true') {
      const data = await getUsageSummary()
      return NextResponse.json(data)
    }

    const provider = searchParams.get('provider') || undefined
    const brandSlug = searchParams.get('brandSlug') || undefined
    const limit = searchParams.get('limit') ? Number(searchParams.get('limit')) : undefined

    const records = await getUsageHistory({ provider, brandSlug, limit })
    return NextResponse.json(records)
  } catch (error) {
    console.error('Usage API error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to get usage data' },
      { status: 500 }
    )
  }
}
