import Link from 'next/link'
import Image from 'next/image'
import { getAllBrands } from '@/data/brands'
import { ThemeToggle } from '@/components/ui/ThemeToggle'

export default function HomePage() {
  const brands = getAllBrands()

  const totalTokens = brands.reduce((acc, b) => {
    return acc + b.colors.dark.length + b.colors.light.length + b.motion.tokens.length + b.spacing.scale.length
  }, 0)

  const avgCompleteness = Math.round(brands.reduce((a, b) => a + b.completeness, 0) / brands.length)

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-[1600px] px-8 py-10">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--bg-inverse)]">
                <span className="text-sm font-bold text-[var(--text-on-inverse)]">BE</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-[var(--text-primary)]">Brand Engine</h1>
                <p className="text-xs text-[var(--text-ghost)]">Design System Manager</p>
              </div>
            </div>
            <ThemeToggle />
          </div>
        </div>

        {/* Stats */}
        <div className="mb-10 grid grid-cols-3 gap-4">
          <div className="card p-5">
            <p className="section-label mb-1">Total Marcas</p>
            <p className="text-3xl font-bold text-[var(--text-primary)]">{brands.length}</p>
          </div>
          <div className="card p-5">
            <p className="section-label mb-1">Tokens Definidos</p>
            <p className="text-3xl font-bold text-[var(--text-primary)]">{totalTokens}</p>
          </div>
          <div className="card p-5">
            <p className="section-label mb-1">Completude Média</p>
            <p className="text-3xl font-bold text-[var(--text-primary)]">{avgCompleteness}%</p>
          </div>
        </div>

        {/* Brand Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {brands.map((brand) => (
            <Link key={brand.slug} href={`/brands/${brand.slug}`} className="group">
              <div className="card overflow-hidden transition-all group-hover:shadow-lg group-hover:-translate-y-0.5">
                {/* Gradient banner */}
                <div
                  className="relative flex h-28 items-center justify-center p-5"
                  style={{
                    background: `linear-gradient(135deg, ${brand.theme.bg}, ${brand.theme.surfaceHover || brand.theme.surface})`,
                  }}
                >
                  {(() => {
                    const logoSrc = brand.logo.file || brand.logo.variants.find(v => v.file)?.file
                    if (logoSrc) {
                      return (
                        <Image
                          src={logoSrc}
                          alt={brand.name}
                          width={180}
                          height={60}
                          className="h-auto max-h-14 w-auto max-w-[220px] object-contain drop-shadow-md"
                        />
                      )
                    }
                    return <span className="text-2xl font-bold text-white">{brand.name}</span>
                  })()}
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-base font-semibold text-[var(--text-primary)]">{brand.name}</h3>
                  <p className="mt-0.5 text-xs text-[var(--text-secondary)] line-clamp-1">{brand.tagline}</p>

                  {/* Badges */}
                  <div className="mt-3 flex gap-2">
                    <span className="rounded-md bg-[var(--bg-muted)] px-2 py-0.5 text-[10px] font-medium text-[var(--text-secondary)]">
                      {brand.niche}
                    </span>
                    <span className="rounded-md bg-[var(--bg-muted)] px-2 py-0.5 text-[10px] font-medium text-[var(--text-secondary)]">
                      {brand.personality.archetype}
                    </span>
                  </div>

                  {/* Mini palette */}
                  <div className="mt-3 flex h-2 overflow-hidden rounded-full">
                    {brand.colors.dark.slice(0, 6).map((c) => (
                      <div key={c.token} className="flex-1" style={{ backgroundColor: c.hex }} />
                    ))}
                  </div>

                  {/* Progress */}
                  <div className="mt-3 flex items-center gap-2">
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[var(--bg-muted)]">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${brand.completeness}%`,
                          backgroundColor: brand.theme.accent || brand.theme.primary,
                        }}
                      />
                    </div>
                    <span className="text-[10px] font-medium text-[var(--text-ghost)]">{brand.completeness}%</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
