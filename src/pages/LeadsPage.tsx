import { useMemo, useState } from 'react'
import { ConfirmDialog } from '../components/ConfirmDialog'
import { LeadForm } from '../components/LeadForm'
import { LeadTable } from '../components/LeadTable'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { LEAD_STATUSES } from '../interfaces/lead'
import type { ILead, LeadInput, LeadStatus } from '../interfaces/lead'

const SAMPLE_LEADS: ILead[] = [
  {
    id: 'ornek-1',
    company: 'Örnek Yazılım A.Ş.',
    contact: 'Ayşe Demir',
    email: 'ayse@ornekyazilim.com',
    status: 'Görüşme',
    note: 'Demo için cuma günü saat 14:00.',
    createdAt: '2026-10-01T09:00:00.000Z',
  },
  {
    id: 'ornek-2',
    company: 'Deneme Lojistik',
    contact: 'Mehmet Kaya',
    email: 'mehmet@denemelojistik.com',
    status: 'İletişime geçildi',
    note: 'İlk e posta gönderildi, yanıt bekleniyor.',
    createdAt: '2026-10-05T09:00:00.000Z',
  },
  {
    id: 'ornek-3',
    company: 'Mavi Danışmanlık',
    contact: 'Elif Arslan',
    email: '',
    status: 'Yeni',
    note: 'LinkedIn üzerinden bulundu.',
    createdAt: '2026-10-10T09:00:00.000Z',
  },
  {
    id: 'ornek-4',
    company: 'Kuzey Tarım',
    contact: 'Can Öztürk',
    email: 'can@kuzeytarim.com',
    status: 'Kazanıldı',
    note: 'Sözleşme imzalandı.',
    createdAt: '2026-09-20T09:00:00.000Z',
  },
]

export function LeadsPage() {
  const [leads, setLeads] = useLocalStorage<ILead[]>('lead-takip:leads', SAMPLE_LEADS)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<LeadStatus | 'Hepsi'>('Hepsi')
  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState<ILead | undefined>(undefined)
  const [deleting, setDeleting] = useState<ILead | undefined>(undefined)

  // EKLE
  const addLead = (input: LeadInput) => {
    const lead: ILead = { ...input, id: crypto.randomUUID(), createdAt: new Date().toISOString() }
    setLeads([lead, ...leads])
    setFormOpen(false)
  }

  // GÜNCELLE
  const updateLead = (input: LeadInput) => {
    if (!editing) return
    setLeads(leads.map((l) => (l.id === editing.id ? { ...l, ...input } : l)))
    setEditing(undefined)
  }

  const changeStatus = (id: string, status: LeadStatus) => {
    setLeads(leads.map((l) => (l.id === id ? { ...l, status } : l)))
  }

  // SİL
  const deleteLead = () => {
    if (!deleting) return
    setLeads(leads.filter((l) => l.id !== deleting.id))
    setDeleting(undefined)
  }

  // LİSTELE (arama ve filtre ile)
  const visible = useMemo(() => {
    const q = search.trim().toLocaleLowerCase('tr-TR')
    return leads.filter((l) => {
      const statusOk = statusFilter === 'Hepsi' || l.status === statusFilter
      const textOk =
        !q ||
        l.company.toLocaleLowerCase('tr-TR').includes(q) ||
        l.contact.toLocaleLowerCase('tr-TR').includes(q)
      return statusOk && textOk
    })
  }, [leads, search, statusFilter])

  const count = (s: LeadStatus) => leads.filter((l) => l.status === s).length

  return (
    <div className="mx-auto min-h-screen max-w-5xl px-4 py-8">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900">Lead Takip Paneli</h1>
        <p className="mt-1 text-slate-600">Potansiyel müşterilerini ekle, takip et, durumunu güncelle.</p>
      </header>

      <section className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-xl bg-white p-4 shadow-sm">
          <p className="text-3xl font-bold text-slate-900">{leads.length}</p>
          <p className="text-sm text-slate-600">Toplam lead</p>
        </div>
        <div className="rounded-xl bg-white p-4 shadow-sm">
          <p className="text-3xl font-bold text-blue-700">{count('İletişime geçildi')}</p>
          <p className="text-sm text-slate-600">İletişime geçildi</p>
        </div>
        <div className="rounded-xl bg-white p-4 shadow-sm">
          <p className="text-3xl font-bold text-amber-700">{count('Görüşme')}</p>
          <p className="text-sm text-slate-600">Görüşmede</p>
        </div>
        <div className="rounded-xl bg-white p-4 shadow-sm">
          <p className="text-3xl font-bold text-green-700">{count('Kazanıldı')}</p>
          <p className="text-sm text-slate-600">Kazanıldı</p>
        </div>
      </section>

      <section className="mb-4 flex flex-col gap-3 sm:flex-row">
        <input
          type="search"
          placeholder="Şirket veya kişi ara"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
        <select
          aria-label="Duruma göre filtrele"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as LeadStatus | 'Hepsi')}
          className="rounded-lg border border-slate-300 bg-white px-3 py-2"
        >
          <option value="Hepsi">Tüm durumlar</option>
          {LEAD_STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <button
          onClick={() => setFormOpen(true)}
          className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
        >
          Yeni Lead Ekle
        </button>
      </section>

      {visible.length > 0 ? (
        <LeadTable leads={visible} onStatusChange={changeStatus} onEdit={setEditing} onDelete={setDeleting} />
      ) : (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-600">
          {leads.length === 0 ? 'Henüz lead yok. İlkini ekleyerek başla.' : 'Aramana uyan lead bulunamadı.'}
        </div>
      )}

      {formOpen && <LeadForm onSubmit={addLead} onCancel={() => setFormOpen(false)} />}
      {editing && <LeadForm initial={editing} onSubmit={updateLead} onCancel={() => setEditing(undefined)} />}
      {deleting && (
        <ConfirmDialog
          title="Lead silinsin mi?"
          message={`${deleting.company} kaydı kalıcı olarak silinecek.`}
          confirmText="Sil"
          onConfirm={deleteLead}
          onCancel={() => setDeleting(undefined)}
        />
      )}
    </div>
  )
}
