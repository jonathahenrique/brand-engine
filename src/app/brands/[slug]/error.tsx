'use client'

import Link from 'next/link'

export default function BrandError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F8F9FC]">
      <div className="card max-w-md p-8 text-center">
        <p className="text-sm font-semibold text-red-500">Algo deu errado</p>
        <p className="mt-2 text-xs text-gray-500">{error.message}</p>
        <div className="mt-4 flex items-center justify-center gap-3">
          <button
            onClick={reset}
            className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
          >
            Tentar novamente
          </button>
          <Link
            href="/"
            className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Voltar
          </Link>
        </div>
      </div>
    </div>
  )
}
