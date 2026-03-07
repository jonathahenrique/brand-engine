import { notFound } from 'next/navigation'
import { getBrand, getAllSlugs } from '@/data/brands'
import { BrandProvider } from '@/context/BrandContext'
import Sidebar from '@/components/layout/Sidebar'

export async function generateStaticParams() {
  return getAllSlugs().map(slug => ({ slug }))
}

export default async function BrandLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const brand = getBrand(slug)
  if (!brand) notFound()

  return (
    <BrandProvider brand={brand}>
      <div className="flex min-h-screen bg-[var(--bg-page)]">
        <Sidebar />
        <main className="min-w-0 flex-1 overflow-y-auto px-4 pt-16 pb-8 lg:px-8 lg:pt-8">
          {children}
        </main>
      </div>
    </BrandProvider>
  )
}
