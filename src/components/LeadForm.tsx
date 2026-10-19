import { useState } from 'react'
import type { FormEvent } from 'react'
import { LEAD_STATUSES } from '../interfaces/lead'
import type { ILead, LeadInput, LeadStatus } from '../interfaces/lead'

interface Props {
  initial?: ILead
  onSubmit: (input: LeadInput) => void
  onCancel: () => void
}

const inputClass =
  'w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200'

export function LeadForm({ initial, onSubmit, onCancel }: Props) {
  const [company, setCompany] = useState(initial?.company ?? '')
  const [contact, setContact] = useState(initial?.contact ?? '')
  const [email, setEmail] = useState(initial?.email ?? '')
  const [status, setStatus] = useState<LeadStatus>(initial?.status ?? 'Yeni')
  const [note, setNote] = useState(initial?.note ?? '')
  const [error, setError] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!company.trim() || !contact.trim()) {
      setError('Şirket ve kişi adı zorunludur.')
      return
    }
    if (email.trim() && !/^\S+@\S+\.\S+$/.test(email.trim())) {
      setError('E posta adresi geçerli görünmüyor.')
      return
    }
    onSubmit({
      company: company.trim(),
      contact: contact.trim(),
      email: email.trim(),
      status,
      note: note.trim(),
    })
  }

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/50 p-4" role="dialog" aria-modal="true">
      <form onSubmit={handleSubmit} className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
        <h2 className="mb-4 text-xl font-bold text-slate-900">
          {initial ? 'Lead Düzenle' : 'Yeni Lead Ekle'}
        </h2>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm font-medium text-slate-700">
            Şirket *
            <input className={`${inputClass} mt-1`} value={company} onChange={(e) => setCompany(e.target.value)} />
          </label>
          <label className="block text-sm font-medium text-slate-700">
            Kişi *
            <input className={`${inputClass} mt-1`} value={contact} onChange={(e) => setContact(e.target.value)} />
          </label>
          <label className="block text-sm font-medium text-slate-700">
            E posta
            <input className={`${inputClass} mt-1`} value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <label className="block text-sm font-medium text-slate-700">
            Durum
            <select
              className={`${inputClass} mt-1`}
              value={status}
              onChange={(e) => setStatus(e.target.value as LeadStatus)}
            >
              {LEAD_STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>
        </div>

        <label className="mt-4 block text-sm font-medium text-slate-700">
          Not
          <textarea
            className={`${inputClass} mt-1`}
            rows={3}
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </label>

        {error && <p className="mt-3 text-sm font-medium text-red-600">{error}</p>}

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg bg-slate-200 px-4 py-2 font-semibold text-slate-800 hover:bg-slate-300"
          >
            İptal
          </button>
          <button
            type="submit"
            className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
          >
            {initial ? 'Kaydet' : 'Ekle'}
          </button>
        </div>
      </form>
    </div>
  )
}
