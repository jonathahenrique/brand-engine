import Link from 'next/link'
import { getAllBrands } from '@/data/brands'
import { BrandLogo } from '@/components/ui/BrandLogo'

export default function HomePage() {
  const brands = getAllBrands()

  const totalTokens = brands.reduce((acc, b) => {
    return acc + b.colors.dark.length + b.colors.light.length + b.motion.tokens.length + b.spacing.scale.length
  }, 0)

  const avgCompleteness = Math.round(brands.reduce((a, b) => a + b.completeness, 0) / brands.length)

  return (
    <div className="min-h-screen bg-[#F8F9FC]">
      <div className="mx-auto max-w-[1600px] px-8 py-10">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-900">
              <span className="text-sm font-bold text-white">BE</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Brand Engine</h1>
              <p className="text-xs text-gray-400">Design System Manager</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mb-10 grid grid-cols-3 gap-4">
          <div className="card p-5">
            <p className="section-label mb-1">Total Marcas</p>
            <p className="text-3xl font-bold text-gray-900">{brands.length}</p>
          </div>
          <div className="card p-5">
            <p className="section-label mb-1">Tokens Definidos</p>
            <p className="text-3xl font-bold text-gray-900">{totalTokens}</p>
          </div>
          <div className="card p-5">
            <p className="section-label mb-1">Completude Média</p>
            <p className="text-3xl font-bold text-gray-900">{avgCompleteness}%</p>
          </div>
        </div>

        {/* Brand Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {brands.map((brand) => (
            <Link key={brand.slug} href={`/brands/${brand.slug}`} className="group">
              <div className="card overflow-hidden transition-all group-hover:shadow-lg group-hover:-translate-y-0.5">
                {/* Gradient banner */}
                <div
                  className="relative h-28 flex items-end p-5"
                  style={{
                    background: `linear-gradient(135deg, ${brand.theme.primary}, ${brand.theme.secondary || brand.theme.primaryDeep})`,
                  }}
                >
                  <BrandLogo
                    slug={brand.slug}
                    name={brand.name}
                    logoFile={brand.logo.variants.find(v => v.file)?.file}
                    variant="badge"
                    theme={brand.theme}
                    className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-lg bg-white/20 backdrop-blur-sm"
                  />
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-base font-semibold text-gray-900">{brand.name}</h3>
                  <p className="mt-0.5 text-xs text-gray-500 line-clamp-1">{brand.tagline}</p>

                  {/* Badges */}
                  <div className="mt-3 flex gap-2">
                    <span className="rounded-md bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-500">
                      {brand.niche}
                    </span>
                    <span className="rounded-md bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-500">
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
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-gray-100">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${brand.completeness}%`,
                          backgroundColor: brand.theme.primary,
                        }}
                      />
                    </div>
                    <span className="text-[10px] font-medium text-gray-400">{brand.completeness}%</span>
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
