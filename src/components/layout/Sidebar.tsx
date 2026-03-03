'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useBrand } from '@/context/BrandContext'
import { BrandLogo } from '@/components/ui/BrandLogo'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import {
  LayoutDashboard,
  Palette,
  Type,
  Hexagon,
  MessageSquare,
  Zap,
  Layers,
  Share2,
  ChevronLeft,
  Menu,
  X,
} from 'lucide-react'

const navItems = [
  { label: 'Overview', href: '', icon: LayoutDashboard },
  { label: 'Cores', href: '/cores', icon: Palette },
  { label: 'Tipografia', href: '/tipografia', icon: Type },
  { label: 'Logo', href: '/logo', icon: Hexagon },
  { label: 'Voz & Tom', href: '/voz', icon: MessageSquare },
  { label: 'Motion', href: '/motion', icon: Zap },
  { label: 'Tokens', href: '/tokens', icon: Layers },
  { label: 'Social Media', href: '/social-media', icon: Share2 },
]

export default function Sidebar() {
  const pathname = usePathname()
  const { brand } = useBrand()
  const base = `/brands/${brand.slug}`
  const [open, setOpen] = useState(false)

  const sidebarContent = (
    <>
      {/* Brand Header */}
      <div className="px-6 pt-6 pb-4">
        <div className="flex items-center gap-3">
          <BrandLogo
            slug={brand.slug}
            name={brand.name}
            logoFile={brand.logo.variants.find(v => v.file)?.file}
            variant="badge"
            theme={brand.theme}
            className="h-10 w-10"
          />
          <div>
            <p className="text-sm font-semibold text-[var(--text-primary)]">{brand.name}</p>
            <p className="text-[11px] text-[var(--text-ghost)]">Brand System</p>
          </div>
        </div>
      </div>

      {/* Separator */}
      <div className="mx-4 border-t border-[var(--border-default)]" />

      {/* Nav */}
      <nav className="flex-1 px-3 pt-5" aria-label="Páginas da marca">
        <p className="section-label mb-3 px-3">Páginas</p>
        <ul className="space-y-1" role="list">
          {navItems.map((item) => {
            const href = `${base}${item.href}`
            const isActive =
              item.href === ''
                ? pathname === base
                : pathname === href

            return (
              <li key={item.label}>
                <Link
                  href={href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`group relative flex items-center gap-3 rounded-lg px-3 py-2 text-[13px] font-medium transition-colors ${
                    isActive
                      ? ''
                      : 'text-[var(--text-secondary)] hover:bg-[var(--bg-subtle)] hover:text-[var(--text-muted)]'
                  }`}
                  style={
                    isActive
                      ? { backgroundColor: `${brand.theme.primary}08`, color: brand.theme.primary }
                      : undefined
                  }
                >
                  {isActive && (
                    <span
                      className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-full"
                      style={{ backgroundColor: brand.theme.primary }}
                    />
                  )}
                  <item.icon
                    size={16}
                    className={isActive ? '' : 'text-[var(--text-ghost)] group-hover:text-[var(--text-secondary)]'}
                    style={isActive ? { color: brand.theme.primary } : undefined}
                  />
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-[var(--border-faint)] px-4 py-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-[13px] text-[var(--text-ghost)] transition-colors hover:text-[var(--text-secondary)]"
        >
          <ChevronLeft size={14} />
          Todas as marcas
        </Link>
        <ThemeToggle />
      </div>
    </>
  )

  return (
    <>
      {/* Mobile hamburger */}
      <button
        onClick={() => setOpen(true)}
        className="fixed left-4 top-4 z-40 flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--bg-card)] shadow-md lg:hidden"
        aria-label="Abrir menu"
      >
        <Menu size={20} className="text-[var(--text-muted)]" />
      </button>

      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm lg:hidden"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile drawer */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[280px] flex-col bg-[var(--bg-card)] shadow-xl transition-transform duration-300 lg:hidden ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-label="Menu lateral"
      >
        <button
          onClick={() => setOpen(false)}
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-lg text-[var(--text-ghost)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-secondary)]"
          aria-label="Fechar menu"
        >
          <X size={18} />
        </button>
        {sidebarContent}
      </aside>

      {/* Desktop sidebar */}
      <aside
        className="sticky top-0 hidden h-screen w-[260px] shrink-0 flex-col overflow-y-auto border-r border-[var(--border-card)] bg-[var(--bg-card)] lg:flex"
        aria-label="Menu lateral"
      >
        {sidebarContent}
      </aside>
    </>
  )
}
