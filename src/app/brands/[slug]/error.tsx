'use client'

import Link from 'next/link'

export default function BrandError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--bg-page)]">
      <div className="card max-w-md p-8 text-center">
        <p className="text-sm font-semibold text-red-500">Algo deu errado</p>
        <p className="mt-2 text-xs text-[var(--text-secondary)]">{error.message}</p>
        <div className="mt-4 flex items-center justify-center gap-3">
          <button
            onClick={reset}
            className="rounded-lg bg-[var(--bg-inverse)] px-4 py-2 text-sm font-medium text-[var(--text-on-inverse)] hover:opacity-90"
          >
            Tentar novamente
          </button>
          <Link
            href="/"
            className="rounded-lg border border-[var(--border-default)] px-4 py-2 text-sm font-medium text-[var(--text-muted)] hover:bg-[var(--bg-subtle)]"
          >
            Voltar
          </Link>
        </div>
      </div>
    </div>
  )
}
