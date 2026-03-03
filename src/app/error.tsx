'use client'

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--bg-page)]">
      <div className="card max-w-md p-8 text-center">
        <p className="text-sm font-semibold text-red-500">Algo deu errado</p>
        <p className="mt-2 text-xs text-[var(--text-secondary)]">{error.message}</p>
        <button
          onClick={reset}
          className="mt-4 rounded-lg bg-[var(--bg-inverse)] px-4 py-2 text-sm font-medium text-[var(--text-on-inverse)] hover:opacity-90"
        >
          Tentar novamente
        </button>
      </div>
    </div>
  )
}
