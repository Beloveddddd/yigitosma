import type { LeadStatus } from '../interfaces/lead'

const STYLES: Record<LeadStatus, string> = {
  Yeni: 'bg-slate-200 text-slate-800',
  'İletişime geçildi': 'bg-blue-100 text-blue-800',
  Görüşme: 'bg-amber-100 text-amber-900',
  Kazanıldı: 'bg-green-100 text-green-800',
  Kaybedildi: 'bg-red-100 text-red-800',
}

export function StatusBadge({ status }: { status: LeadStatus }) {
  return (
    <span className={`inline-block rounded-full px-3 py-1 text-sm font-medium ${STYLES[status]}`}>
      {status}
    </span>
  )
}
