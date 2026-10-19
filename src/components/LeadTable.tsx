import { LEAD_STATUSES } from '../interfaces/lead'
import type { ILead, LeadStatus } from '../interfaces/lead'
import { StatusBadge } from './StatusBadge'

interface Props {
  leads: ILead[]
  onStatusChange: (id: string, status: LeadStatus) => void
  onEdit: (lead: ILead) => void
  onDelete: (lead: ILead) => void
}

export function LeadTable({ leads, onStatusChange, onEdit, onDelete }: Props) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
      <table className="w-full min-w-[760px] border-collapse text-left">
        <thead className="bg-slate-100 text-sm text-slate-600">
          <tr>
            <th className="px-4 py-3 font-semibold">Şirket</th>
            <th className="px-4 py-3 font-semibold">Kişi</th>
            <th className="px-4 py-3 font-semibold">Durum</th>
            <th className="px-4 py-3 font-semibold">Not</th>
            <th className="px-4 py-3 font-semibold">İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead.id} className="border-t border-slate-200 align-top hover:bg-slate-50">
              <td className="px-4 py-3">
                <p className="font-semibold text-slate-900">{lead.company}</p>
                <p className="text-sm text-slate-500">
                  {new Date(lead.createdAt).toLocaleDateString('tr-TR')}
                </p>
              </td>
              <td className="px-4 py-3">
                <p className="text-slate-900">{lead.contact}</p>
                {lead.email && <p className="text-sm text-slate-500">{lead.email}</p>}
              </td>
              <td className="px-4 py-3">
                <div className="mb-2">
                  <StatusBadge status={lead.status} />
                </div>
                <select
                  aria-label={`${lead.company} durumunu değiştir`}
                  value={lead.status}
                  onChange={(e) => onStatusChange(lead.id, e.target.value as LeadStatus)}
                  className="rounded-lg border border-slate-300 bg-white px-2 py-1 text-sm"
                >
                  {LEAD_STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </td>
              <td className="max-w-xs px-4 py-3 text-slate-600">{lead.note || '...'}</td>
              <td className="px-4 py-3">
                <div className="flex gap-2">
                  <button
                    onClick={() => onEdit(lead)}
                    className="rounded-lg bg-amber-500 px-3 py-1 text-sm font-semibold text-white hover:bg-amber-600"
                  >
                    Düzenle
                  </button>
                  <button
                    onClick={() => onDelete(lead)}
                    className="rounded-lg bg-red-600 px-3 py-1 text-sm font-semibold text-white hover:bg-red-700"
                  >
                    Sil
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
