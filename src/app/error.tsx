'use client'

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F8F9FC]">
      <div className="card max-w-md p-8 text-center">
        <p className="text-sm font-semibold text-red-500">Algo deu errado</p>
        <p className="mt-2 text-xs text-gray-500">{error.message}</p>
        <button
          onClick={reset}
          className="mt-4 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
        >
          Tentar novamente
        </button>
      </div>
    </div>
  )
}
