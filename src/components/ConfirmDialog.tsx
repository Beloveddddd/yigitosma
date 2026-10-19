interface Props {
  title: string
  message: string
  confirmText: string
  onConfirm: () => void
  onCancel: () => void
}

export function ConfirmDialog({ title, message, confirmText, onConfirm, onCancel }: Props) {
  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/50 p-4" role="dialog" aria-modal="true">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        <h2 className="mb-2 text-xl font-bold text-slate-900">{title}</h2>
        <p className="mb-6 text-slate-600">{message}</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="rounded-lg bg-slate-200 px-4 py-2 font-semibold text-slate-800 hover:bg-slate-300"
          >
            Vazgeç
          </button>
          <button
            onClick={onConfirm}
            className="rounded-lg bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-700"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  )
}
